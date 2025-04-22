import { createSlice } from '@reduxjs/toolkit';
import { getChallenges, setChallenges } from '../../utils/localStorage';
import { userSavedChallenges } from '../../assets/data/userSavedChallenges';

// 사용자 저장 챌린지를 중복 없이 저장
const saveLikedToLocalStorage = (challengeIds) => {
    const uniqueIds = [...new Set(challengeIds)];
    localStorage.setItem('myLikedClg', JSON.stringify(uniqueIds));
};

const saveScrappedToLocalStorage = (challengeIds) => {
    const uniqueIds = [...new Set(challengeIds)];
    localStorage.setItem('myScrappedClg', JSON.stringify(uniqueIds));
};

const initUserSavedData = () => {
    const currentUserId = localStorage.getItem('loggedInUser');
    if (!currentUserId)
        return {
            likedIds: [],
            scrappedIds: [],
        };

    // localStorage에 최초 병합 여부 확인
    const hasInitialized = localStorage.getItem('hasInitializedUserData');
    const localLiked = JSON.parse(localStorage.getItem('myLikedClg')) || [];
    const localScrapped =
        JSON.parse(localStorage.getItem('myScrappedClg')) || [];

    if (!hasInitialized) {
        const defaultUser = {
            userId: 'daymaker@naver.com',
            likedIds: [1, 3, 7, 16, 18],
            scrappedIds: [6, 8, 10],
        };

        const mergedLiked = [
            ...new Set([...defaultUser.likedIds, ...localLiked]),
        ];
        const mergedScrapped = [
            ...new Set([...defaultUser.scrappedIds, ...localScrapped]),
        ];

        localStorage.setItem('myLikedClg', JSON.stringify(mergedLiked));
        localStorage.setItem('myScrappedClg', JSON.stringify(mergedScrapped));
        localStorage.setItem('hasInitializedUserData', 'true'); // 플래그 설정

        return {
            likedIds: mergedLiked,
            scrappedIds: mergedScrapped,
        };
    }

    // 초기화 이후에는 localStorage 값만 사용
    return {
        likedIds: localLiked,
        scrappedIds: localScrapped,
    };
};

const initialState = initUserSavedData();

const userSavedSlice = createSlice({
    name: 'userSaved',
    initialState,
    reducers: {
        // 좋아요 버튼 토글
        toggleLike: (state, action) => {
            const { id, isLiked } = action.payload;

            // 챌린지 좋아요 수 업데이트
            const allChallenges = getChallenges();
            const challenge = allChallenges.find((c) => c.id === id);
            if (!challenge) return;
            challenge.likesCount += isLiked ? -1 : 1;
            localStorage.setItem('clgList', JSON.stringify(allChallenges));

            // likedIds 배열 업데이트
            if (isLiked) {
                state.likedIds = state.likedIds.filter((cid) => cid !== id);
            } else {
                state.likedIds.push(id);
            }

            saveLikedToLocalStorage(state.likedIds);
        },

        // 스크랩 버튼 토글
        toggleScrap: (state, action) => {
            const { id, isScrapped } = action.payload;
            const allChallenges = getChallenges();
            const challenge = allChallenges.find((c) => c.id === id);
            if (!challenge) return;
            challenge.scrapCount += isScrapped ? -1 : 1;
            localStorage.setItem('clgList', JSON.stringify(allChallenges));

            // scrappedIds 배열 업데이트
            if (isScrapped) {
                state.scrappedIds = state.scrappedIds.filter(
                    (cid) => cid !== id
                );
            } else {
                state.scrappedIds.push(id);
            }

            saveScrappedToLocalStorage(state.scrappedIds);
        },
    },
});

// liked/scrapped ID 목록
export const selectLikedIds = (state) => state.userSaved.likedIds;
export const selectScrappedIds = (state) => state.userSaved.scrappedIds;

export const { toggleLike, toggleScrap } = userSavedSlice.actions;
export default userSavedSlice.reducer;
