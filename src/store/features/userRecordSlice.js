import { createSlice } from '@reduxjs/toolkit';
import { getUserRecordData } from '../../utils/getUserData';

// mySavedClg를 로드
const loadRecordedData = () => {
    const savedData = JSON.parse(localStorage.getItem('myClgRecord')) || {};
    return savedData;
};
// mySavedClg 저장
const saveRecordedData = (data) => {
    localStorage.setItem('myClgRecord', JSON.stringify(data));
};

const initialState = getUserRecordData();

const userRecordSlice = createSlice({
    name: 'userRecord',
    initialState,
    reducers: {
        setClgRecord: (state, action) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            const {
                date,
                challengeId,
                done = false,
                note = '',
            } = action.payload;

            if (!currentUserId || !date || !challengeId) return;

            // 초기화
            if (!state[currentUserId]) {
                state[currentUserId] = {};
            }
            if (!state[currentUserId][date]) {
                state[currentUserId][date] = {};
            }

            // 기록 추가 또는 업데이트
            state[currentUserId][date][challengeId] = {
                done,
                note,
            };

            // 로컬스토리지에도 동기화
            saveRecordedData(state);
        },
    },
});

export const { setClgRecord } = userRecordSlice.actions;
export default userRecordSlice.reducer;
