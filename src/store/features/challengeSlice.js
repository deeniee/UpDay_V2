import { createSlice } from '@reduxjs/toolkit';
import { userChallengeList } from '../../assets/data/userChallengeData';
import { getChallenges } from '../../utils/localStorage';

// 챌린지 데이터를 localStorage에 저장
const saveChallengeToLocalStorage = (challenge) =>
    localStorage.setItem('clgList', JSON.stringify(challenge));

const getInitialList = () => {
    // 로컬 스토리지에서 챌린지 가져오기
    const savedChallenges = localStorage.getItem('clgList');

    // 로컬 스토리지에 clglist가 없으면
    if (!savedChallenges) {
        localStorage.setItem('clgList', JSON.stringify(userChallengeList));
        return userChallengeList;
    }

    // 로컬 스토리지 데이터 파싱
    const parsedChallenges = JSON.parse(savedChallenges);

    // 1. 더미데이터 상태 업데이트
    const updatedList = userChallengeList.map((challenge) => {
        const savedChallenge = parsedChallenges.find(
            (saved) => saved.id === challenge.id
        );
        return savedChallenge || challenge;
    });

    // 2. 사용자가 작성한 챌린지 추가
    const userWrittenChallenges = parsedChallenges.filter(
        (challenge) =>
            !userChallengeList.some((data) => data.id === challenge.id)
    );

    // 3. 업데이트 된 더미데이터 + 사용자가 작성한 챌린지
    const mergedChallenges = [...updatedList, ...userWrittenChallenges];

    // 병합된 데이터로 로컬 스토리지 업데이트
    localStorage.setItem('clgList', JSON.stringify(mergedChallenges));

    return mergedChallenges;
};

const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
        list: getInitialList(), // 초기 데이터, 전체 챌린지
        selectedChallenge: null, // 현재 선택된 챌린지
        myPosts: [], // 테스트 계정이 작성한 챌린지 목록
        joinedChallenges: getInitialList().filter(
            (challenge) => challenge.clgJoin
        ), // 테스트 계정이 참여한 챌린지 목록
        ongoingChallenges: getInitialList().filter(
            (challenge) => challenge.clgJoin && challenge.clgDoing
        ), // 테스트 계정이 진행 중인 챌린지 목록
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
                        clgJoin: true,
                        clgDoing: true,
                        joinDate: joinDate,
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
                        clgJoin: true,
                        clgDoing: true,
                        joinDate: joinDate,
                    };
                }
                return challenge;
            });
            saveChallengeToLocalStorage(updatedChallenges);
        },

        // #3. 내 챌린지 (테스트 계정)
        // 작성한 챌린지 가져오는 액션
        setMyPosts: (state) => {
            const loggedInUser = localStorage.getItem('loggedInUser');
            const currentChallenges = getChallenges();

            state.myPosts = currentChallenges.filter(
                (post) => post.authorId === loggedInUser
            );

            saveChallengeToLocalStorage(currentChallenges);
        },

        // 참여한 챌린지 가져오는 액션
        getJoinedChallenge: (state) => {
            const currentChallenges = getChallenges();
            state.joinedChallenges = currentChallenges.filter(
                (challenge) => challenge.clgJoin
            );

            saveChallengeToLocalStorage(currentChallenges);
        },

        // 참여한 챌린지 상태 변경 및 저장하는 액션
        toggleChallengeState: (state, action) => {
            const { id, type } = action.payload;
            const currentChallenges = getChallenges();

            const updatedChallenges = currentChallenges.map((challenge) => {
                if (challenge.id === id) {
                    if (type === 'doing') {
                        return {
                            ...challenge,
                            clgDoing: !challenge.clgDoing,
                            clgDone: challenge.clgDoing ? true : false,
                        };
                    } else if (type === 'done') {
                        return {
                            ...challenge,
                            clgDone: !challenge.clgDone,
                            clgDoing: false,
                        };
                    }
                }
                return challenge;
            });

            saveChallengeToLocalStorage(currentChallenges);

            state.list = updatedChallenges;
            state.myPosts = updatedChallenges.filter(
                (post) => post.authorId === localStorage.getItem('loggedInUser')
            );
            state.joinedChallenges = updatedChallenges.filter(
                (challenge) => challenge.clgJoin
            );
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
