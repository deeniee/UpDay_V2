import { configureStore } from '@reduxjs/toolkit';
import userChallengeReducer from './features/userChallengeSlice';
import challengeReducer from './features/challengeSlice';
import userReducer from './features/UserSlice';
import themeSlice from './features/themeSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        challenge: challengeReducer,
        userChallenge: userChallengeReducer,
        theme: themeSlice,
    },
});
