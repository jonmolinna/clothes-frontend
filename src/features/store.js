import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer';
import colorReducer from './color/colorReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        color: colorReducer,
    },
});