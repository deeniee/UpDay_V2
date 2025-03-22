import { createSlice } from '@reduxjs/toolkit';
import { dummyChallenges } from '../../assets/data/dummyChallenges';
import { getChallenges } from '../../utils/localStorage';

// 챌린지 데이터를 localStorage에 저장
const saveChallengeToLocalStorage = (challenges) => {
    localStorage.setItem('clgList', JSON.stringify(challenges));
};

const getInitialList = () => {
    const savedChallenges = JSON.parse(localStorage.getItem('clgList')) || [];

    // dummyChallenges를 Map으로 변환하여 빠르게 병합
    const challengeMap = new Map(savedChallenges.map((c) => [c.id, c]));

    dummyChallenges.forEach((challenge) => {
        if (!challengeMap.has(challenge.id)) {
            challengeMap.set(challenge.id, challenge);
        }
    });

    const mergedChallenges = Array.from(challengeMap.values());

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
            const updatedChallenge = action.payload;

            state.list = state.list.map((challenge) =>
                challenge.id === updatedChallenge.id
                    ? updatedChallenge
                    : challenge
            );

            if (state.selectedChallenge?.id === updatedChallenge.id) {
                state.selectedChallenge = updatedChallenge;
            }

            saveChallengeToLocalStorage(state.list);
        },

        // 챌린지 삭제하는 액션
        deleteChallenge: (state, action) => {
            const challengeId = action.payload;

            state.list = state.list.filter(
                (challenge) => challenge.id !== challengeId
            );

            // 삭제하려는 챌린지가 선택된 챌린지라면 초기화
            state.selectedChallenge =
                state.selectedChallenge?.id === challengeId
                    ? null
                    : state.selectedChallenge;

            saveChallengeToLocalStorage(state.list);
        },

        // #2. 챌린지 속성 값 설정
        // 챌린지 참여 액션
        joinChallenge: (state, action) => {
            const { id } = action.payload;
            const userId = localStorage.getItem('loggedInUser');
            const joinDate = new Date().toISOString().split('T')[0];

            // 챌린지 목록에서 해당 챌린지 찾기
            const updatedChallenges = state.list.map((challenge) => {
                if (challenge.id === id) {
                    return {
                        ...challenge,
                        participants: [
                            ...challenge.participants,
                            {
                                userId,
                                clgJoin: true,
                                clgDoing: true,
                                clgDone: false,
                                joinDate,
                            },
                        ],
                    };
                }
                return challenge;
            });

            // 선택된 챌린지 업데이트
            if (state.selectedChallenge?.id === id) {
                state.selectedChallenge = {
                    ...state.selectedChallenge,
                    clgJoin: true,
                };
            }

            // 상태 업데이트
            state.list = updatedChallenges;

            // 중복 코드 방지: 챌린지 목록이 변경된 경우만 로컬 스토리지에 저장
            const updatedChallenge = updatedChallenges.find(
                (challenge) => challenge.id === id
            );
            if (updatedChallenge) {
                saveChallengeToLocalStorage(updatedChallenges);
            }
        },
    },
});

export const {
    setSelectedChallenge,
    updateChallenge,
    addChallenge,
    deleteChallenge,
    joinChallenge,
} = challengeSlice.actions;
export default challengeSlice.reducer;
