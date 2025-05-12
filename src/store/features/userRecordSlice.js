import { createSlice } from '@reduxjs/toolkit';

// 모든 사용자의 mySavedClg를 불러옴
const loadRecordedData = () => {
    try {
        const rawData = localStorage.getItem('myClgRecord');
        const parsed = rawData ? JSON.parse(rawData) : {};
        return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch (error) {
        console.error('Failed to load recorded data:', error);
        return {};
    }
};

// mySavedClg 저장
const saveRecordedData = (data) => {
    try {
        const serialized = JSON.stringify(data);
        localStorage.setItem('myClgRecord', serialized);
    } catch (error) {
        console.error('Failed to save recorded data:', error);
    }
};

const initialState = loadRecordedData();

const userRecordSlice = createSlice({
    name: 'userRecord',
    initialState,
    reducers: {
        setClgRecord: (state, action) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            const {
                date,
                challengeId,
                note = '',
                done = false,
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
                done: note !== '' ? true : done,
                note,
            };

            // 로컬스토리지에도 동기화
            saveRecordedData(state);
        },
        toggleClgRecord: (state, action) => {
            const currentUserId = localStorage.getItem('loggedInUser');
            const { date, challengeId } = action.payload;

            if (!currentUserId || !date || !challengeId) return;

            // 초기화
            if (!state[currentUserId]) {
                state[currentUserId] = {};
            }
            if (!state[currentUserId][date]) {
                state[currentUserId][date] = {};
            }

            const prev = state[currentUserId][date][challengeId] || {
                done: false,
            };

            // toggle 처리
            state[currentUserId][date][challengeId] = {
                ...prev,
                done: !prev.done,
            };

            // 로컬스토리지 동기화
            saveRecordedData(state);
        },
    },
});

export const { setClgRecord, toggleClgRecord } = userRecordSlice.actions;
export default userRecordSlice.reducer;
