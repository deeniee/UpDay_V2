import { createSlice } from '@reduxjs/toolkit';
import { dummyChallenges } from '../../assets/data/dummyChallenges';
import { getChallenges } from '../../utils/localStorage';

// 챌린지 데이터를 localStorage에 저장
const saveChallengeToLocalStorage = (challenge) =>
    localStorage.setItem('clgList', JSON.stringify(challenge));

const getInitialList = () => {
    const savedChallenges = localStorage.getItem('clgList');

    // 로컬 스토리지에 clglist가 없으면
    if (!savedChallenges) {
        localStorage.setItem('clgList', JSON.stringify(dummyChallenges));
        return dummyChallenges;
    }

    // 로컬 스토리지 데이터 파싱
    const parsedChallenges = JSON.parse(savedChallenges);

    // 1. 더미데이터 상태 업데이트
    const updatedList = dummyChallenges.map((challenge) => {
        const savedChallenge = parsedChallenges.find(
            (saved) => saved.id === challenge.id
        );
        return savedChallenge || challenge;
    });

    // 2. 사용자가 작성한 챌린지 추가
    const userWrittenChallenges = parsedChallenges.filter(
        (challenge) => !dummyChallenges.some((data) => data.id === challenge.id)
    );

    // 3. 업데이트 된 더미데이터 + 사용자가 작성한 챌린지
    const mergedChallenges = [...updatedList, ...userWrittenChallenges];

    // 병합된 데이터로 로컬 스토리지 업데이트
    localStorage.setItem('clgList', JSON.stringify(mergedChallenges));

    return mergedChallenges;
};

const initialChallenges = getInitialList();

const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
        list: initialChallenges,
        selectedChallenge: null,
        myPosts: [],
        joinedChallenges: initialChallenges.filter((challenge) =>
            challenge.participants?.some(
                (participant) =>
                    participant.userId === 'daymaker@naver.com' &&
                    participant.clgJoin === true // 참가한 챌린지인지 확인
            )
        ),
        ongoingChallenges: initialChallenges.filter((challenge) =>
            challenge.participants?.some(
                (participant) =>
                    participant.userId === 'daymaker@naver.com' &&
                    participant.clgJoin === true && // 참가한 챌린지인지 확인
                    participant.clgDoing === true // 진행 중인 상태일 경우
            )
        ),
    },
    reducers: {
        // #1. 챌린지 CRUD
        // 선택된 챌린지 정보를 저장하는 액션
        setSelectedChallenge: (state, action) => {
            state.selectedChallenge = action.payload;
        },

        // 새로운 챌린지 생성하는 액션
        addChallenge: (state, action) => {
            state.list.push(action.payload);
            const currentChallenges = getChallenges();
            const updatedChallenges = [...currentChallenges, action.payload];
            saveChallengeToLocalStorage(updatedChallenges);
        },

        // 변경된 챌린지 정보를 처리하는 액션
        updateChallenge: (state, action) => {
            const updatedChallenge = action.payload; // 수정된 새로운 데이터 값
            state.list = state.list.map((challenge) =>
                challenge.id === updatedChallenge.id
                    ? updatedChallenge
                    : challenge
            ); // 전체 목록에서 해당 챌린지 정보 업데이트

            state.selectedChallenge = updatedChallenge; // 선택된 챌린지의 상태 업데이트

            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.map((challenge) =>
                challenge.id === updatedChallenge.id
                    ? updatedChallenge
                    : challenge
            );
            saveChallengeToLocalStorage(updatedChallenges);
        },

        // 챌린지 삭제하는 액션
        // 전체 목록에서 id가 일치하지 않는 챌린지만 남겨 새 배열에 담는 로직
        // redux toolkit의 immer 라이브러리가 원본 보존을 해주기 때문에 원본을 직접 수정하는 것이 아닌 새 배열에 담게 된다
        deleteChallenge: (state, action) => {
            state.list = state.list.filter(
                (challenge) => challenge.id !== action.payload
            );

            if (state.selectedChallenge?.id === action.payload) {
                state.selectedChallenge = null;
            } // 삭제된 챌린지를 null로 변경

            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.filter(
                (challenge) => challenge.id !== action.payload
            );
            saveChallengeToLocalStorage(updatedChallenges);
        },

        // #2. 챌린지 속성 값 설정
        // 챌린지 참여 액션
        joinChallenge: (state, action) => {
            const { id } = action.payload;
            const joinDate = new Date().toISOString().split('T')[0]; // 현재 날짜

            state.list = state.list.map((challenge) => {
                if (challenge.id === id) {
                    return {
                        ...challenge,
                        participants: [
                            ...challenge.participants, // 기존 참가자들 추가
                            {
                                userId: localStorage.getItem('loggedInUser'),
                                clgJoin: true,
                                clgDoing: true,
                                joinDate: joinDate,
                            },
                        ],
                    };
                }
                return challenge;
            }); // redux 스토어의 list 업데이트

            if (state.selectedChallenge && state.selectedChallenge.id === id) {
                state.selectedChallenge = {
                    ...state.selectedChallenge,
                    clgJoin: true,
                };
            } // selectedChallenge 업데이트

            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.map((challenge) => {
                if (challenge.id === id) {
                    return {
                        ...challenge,
                        participants: [
                            ...challenge.participants, // 기존 참가자들 추가
                            {
                                userId: localStorage.getItem('loggedInUser'),
                                clgJoin: true,
                                clgDoing: true,
                                joinDate: joinDate,
                            },
                        ],
                    };
                }
                return challenge;
            });
            saveChallengeToLocalStorage(updatedChallenges);
        },

        // #3. 내 챌린지 (테스트 계정)
        // 작성한 챌린지 가져오는 액션
        setMyPosts: (state) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            const currentChallenges = getChallenges();

            state.myPosts = currentChallenges.filter(
                (post) => post.authorId === currentUserId
            );

            saveChallengeToLocalStorage(currentChallenges);
        },

        // 참여한 챌린지 가져오는 액션
        getJoinedChallenge: (state) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            const currentChallenges = getChallenges();

            // 각 챌린지에 대해 참여한 사람을 필터링
            state.joinedChallenges = currentChallenges.filter((challenge) =>
                challenge.participants?.some(
                    (participant) =>
                        participant.userId === currentUserId &&
                        participant.clgJoin === true
                )
            );

            saveChallengeToLocalStorage(currentChallenges);
        },

        // 참여한 챌린지 상태 변경 및 저장하는 액션
        toggleChallengeState: (state, action) => {
            const { id, type } = action.payload;
            const currentUserId = localStorage.getItem('loggedInUser');
            const updatedChallenges = state.list.map((challenge) => {
                if (challenge.participants) {
                    challenge.participants = challenge.participants.map(
                        (participant) => {
                            if (participant.userId === currentUserId) {
                                if (type === 'doing') {
                                    participant.clgDoing =
                                        !participant.clgDoing;
                                    participant.clgDone = participant.clgDoing
                                        ? true
                                        : false;
                                } else if (type === 'done') {
                                    participant.clgDone = !participant.clgDone;
                                    participant.clgDoing = false;
                                }
                            }
                            return participant;
                        }
                    );
                }
                return challenge;
            });

            // 상태 업데이트
            state.list = updatedChallenges;

            // ongoingChallenges 업데이트
            state.ongoingChallenges = updatedChallenges.filter((challenge) =>
                challenge.participants?.some(
                    (participant) =>
                        participant.userId === currentUserId &&
                        participant.clgJoin === true &&
                        participant.clgDoing === true // 진행 중인 상태만 필터링
                )
            );

            // joinedChallenges 업데이트
            state.joinedChallenges = updatedChallenges.filter((challenge) =>
                challenge.participants?.some(
                    (participant) =>
                        participant.userId === currentUserId &&
                        participant.clgJoin === true
                )
            );

            saveChallengeToLocalStorage(updatedChallenges);
        },
    },
});

export const {
    setSelectedChallenge,
    updateChallenge,
    addChallenge,
    deleteChallenge,
    joinChallenge,
    setMyPosts,
    getJoinedChallenge,
    toggleChallengeState,
} = challengeSlice.actions;
export default challengeSlice.reducer;
