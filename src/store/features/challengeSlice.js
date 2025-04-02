import { createSlice } from '@reduxjs/toolkit';
import { dummyChallenges } from '../../assets/data/dummyChallenges';
import { getChallenges } from '../../utils/localStorage';

// 챌린지 데이터를 localStorage에 저장
const saveChallengeToLocalStorage = (challenges) => {
    localStorage.setItem('clgList', JSON.stringify(challenges));
};

const getInitialList = () => {
    const savedChallenges = getChallenges() || [];
    const savedIds = new Set(savedChallenges.map((c) => c.id));

    // 삭제된 챌린지 목록 가져오기
    const deletedChallenges = new Set(
        JSON.parse(localStorage.getItem('deletedChallenges')) || []
    );

    // 기존 데이터에 없는 dummyChallenges만 추가하되, 삭제된 챌린지는 제외
    const newChallenges = dummyChallenges.filter(
        (c) => !savedIds.has(c.id) && !deletedChallenges.has(c.id)
    );

    const mergedChallenges = [...savedChallenges, ...newChallenges];

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
            // 불변성 유지하며 새로운 상태 업데이트
            state.list = [...state.list, action.payload];

            // 로컬스토리지에 새로운 챌린지 반영
            const updatedChallenges = [...state.list, action.payload];
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

            // 삭제된 챌린지 ID를 로컬스토리지에 저장
            const deletedChallenges =
                JSON.parse(localStorage.getItem('deletedChallenges')) || [];
            localStorage.setItem(
                'deletedChallenges',
                JSON.stringify([...deletedChallenges, challengeId])
            );

            // 삭제된 챌린지를 상태에서 제거
            state.list = state.list.filter(
                (challenge) => challenge.id !== challengeId
            );

            if (state.selectedChallenge?.id === challengeId) {
                state.selectedChallenge = null;
            }

            saveChallengeToLocalStorage(state.list);
        },

        // #2. 챌린지 속성 값 설정
        // 챌린지 참여 액션
        joinChallenge: (state, action) => {
            const { id } = action.payload;
            const userId = localStorage.getItem('loggedInUser');
            const joinDate = new Date().toISOString().split('T')[0];

            // 챌린지 목록 업데이트
            state.list = state.list.map((challenge) =>
                challenge.id === id
                    ? {
                          ...challenge,
                          participants: [
                              ...(challenge.participants || []),
                              {
                                  userId,
                                  clgJoin: true,
                                  clgDoing: true,
                                  clgDone: false,
                                  joinDate,
                              },
                          ],
                      }
                    : challenge
            );

            // 선택된 챌린지 업데이트
            if (state.selectedChallenge?.id === id) {
                state.selectedChallenge.clgJoin = true;
            }

            saveChallengeToLocalStorage(state.list);
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
