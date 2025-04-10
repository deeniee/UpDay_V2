import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: '',
        password: '',
        userNickname: '',
        userImg: '',
        userIntroduction: '',
    },
    reducers: {
        setUser: (state, action) => {
            // 전체 사용자 정보를 초기화하는 객체를 전달받아서 상태를 업데이트
            const {
                userId,
                password,
                userNickname,
                userImg,
                userIntroduction,
            } = action.payload;
            state.userId = userId;
            state.password = password;
            state.userNickname = userNickname;
            state.userImg = userImg;
            state.userIntroduction = userIntroduction;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setUserNickname: (state, action) => {
            state.userNickname = action.payload;
        },
        setUserImg: (state, action) => {
            state.userImg = action.payload;
        },
    },
});

export const { setUser, setPassword, setUserNickname, setUserImg } =
    userSlice.actions;

export default userSlice.reducer;
