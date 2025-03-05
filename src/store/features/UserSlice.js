import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    userNickname: '',
    userImg: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
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
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.userNickname = action.payload.userNickname;
            state.userImg = action.payload.userImg;
        },
    },
});

export const { setEmail, setPassword, setUserNickname, setUserImg, setUser } =
    userSlice.actions;

export default userSlice.reducer;
