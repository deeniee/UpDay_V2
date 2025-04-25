import { createSlice } from '@reduxjs/toolkit';
import { getChallenges } from '../../utils/localStorage';
import { getUserSavedData } from '../../utils/getUserData';

// mySavedClg를 로드
const loadSavedData = () => {
    const savedData = JSON.parse(localStorage.getItem('mySavedClg')) || {};
    return savedData;
};
// mySavedClg 저장
const saveSavedData = (data) => {
    localStorage.setItem('mySavedClg', JSON.stringify(data));
};

const initialState = getUserSavedData();

const userSavedSlice = createSlice({
    name: 'userSaved',
    initialState,
    reducers: {
        toggleLike: (state, action) => {
            const { id, isLiked } = action.payload;

            const allChallenges = getChallenges();
            const challenge = allChallenges.find((c) => c.id === id);
            if (!challenge) return;

            challenge.likesCount += isLiked ? -1 : 1;
            localStorage.setItem('clgList', JSON.stringify(allChallenges));

            const currentUserId = localStorage.getItem('loggedInUser');
            const savedData = loadSavedData();

            if (isLiked) {
                state.likedIds = state.likedIds.filter((cid) => cid !== id);
            } else {
                state.likedIds.push(id);
            }

            savedData[currentUserId].likedIds = state.likedIds;
            saveSavedData(savedData);
        },

        toggleScrap: (state, action) => {
            const { id, isScrapped } = action.payload;

            const allChallenges = getChallenges();
            const challenge = allChallenges.find((c) => c.id === id);
            if (!challenge) return;

            challenge.scrapCount += isScrapped ? -1 : 1;
            localStorage.setItem('clgList', JSON.stringify(allChallenges));

            const currentUserId = localStorage.getItem('loggedInUser');
            const savedData = loadSavedData();

            if (isScrapped) {
                state.scrappedIds = state.scrappedIds.filter(
                    (cid) => cid !== id
                );
            } else {
                state.scrappedIds.push(id);
            }

            savedData[currentUserId].scrappedIds = state.scrappedIds;
            saveSavedData(savedData);
        },
    },
});

export const selectLikedIds = (state) => state.userSaved.likedIds;
export const selectScrappedIds = (state) => state.userSaved.scrappedIds;

export const { toggleLike, toggleScrap } = userSavedSlice.actions;
export default userSavedSlice.reducer;
