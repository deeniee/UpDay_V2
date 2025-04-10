import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import challengeReducer from './features/challengeSlice';
import userChallengeReducer from './features/userChallengeSlice';
import themeSlice from './features/themeSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        userChallenge: userChallengeReducer,
        challenge: challengeReducer,
        theme: themeSlice,
    },
});
