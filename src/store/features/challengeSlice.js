import { createSlice } from '@reduxjs/toolkit';
import { dummyChallenges } from '../../assets/data/dummyChallenges';
import { getChallenges } from '../../utils/localStorage';

// 챌린지 데이터를 localStorage에 저장
const saveChallengeToLocalStorage = (challenges) => {
    localStorage.setItem('clgList', JSON.stringify(challenges));
};

const getInitialList = () => {
    const savedChallenges = JSON.parse(localStorage.getItem('clgList')) || [];
    const savedIds = new Set(savedChallenges.map((c) => c.id));

    // 기존 데이터에 없는 dummyChallenges만 추가
    const newChallenges = dummyChallenges.filter((c) => !savedIds.has(c.id));
    const mergedChallenges = [...savedChallenges, ...newChallenges];

    localStorage.setItem('clgList', JSON.stringify(mergedChallenges));
    return mergedChallenges;
};

const initialChallenges = getInitialList();

const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
        list: JSON.parse(localStorage.getItem('clgList')) || [],
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
            // 불변성 유지하며 새로운 상태 업데이트
            state.list = [...state.list, action.payload];

            // 로컬스토리지에 새로운 챌린지 반영
            const currentChallenges = getChallenges();
            const updatedChallenges = [...currentChallenges, action.payload];
            saveChallengeToLocalStorage(updatedChallenges);
        },

        // 변경된 챌린지 정보를 처리하는 액션
        updateChallenge: (state, action) => {
            const updatedChallenge = action.payload;

            // 리스트에서 해당 챌린지 ID에 맞는 항목을 업데이트
            state.list = state.list.map((challenge) =>
                challenge.id === updatedChallenge.id
                    ? updatedChallenge
                    : challenge
            );

            // 선택된 챌린지가 있으면 업데이트
            if (state.selectedChallenge?.id === updatedChallenge.id) {
                state.selectedChallenge = updatedChallenge;
            }

            // 로컬스토리지에 변경된 챌린지 반영
            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.map((challenge) =>
                challenge.id === updatedChallenge.id
                    ? updatedChallenge
                    : challenge
            );
            saveChallengeToLocalStorage(updatedChallenges);
        },

        // 챌린지 삭제하는 액션
        deleteChallenge: (state, action) => {
            const challengeId = action.payload;

            // 상태에서 해당 챌린지 삭제
            state.list = state.list.filter(
                (challenge) => challenge.id !== challengeId
            );

            // 삭제하려는 챌린지가 선택된 챌린지라면 초기화
            if (state.selectedChallenge?.id === challengeId) {
                state.selectedChallenge = null;
            }

            // 로컬스토리지에서 삭제된 챌린지 반영
            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.filter(
                (challenge) => challenge.id !== challengeId
            );
            saveChallengeToLocalStorage(updatedChallenges);
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
