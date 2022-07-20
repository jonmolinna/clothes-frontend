import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer';
import colorReducer from './color/colorReducer';
import sizeReducer from './size/sizeReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        color: colorReducer,
        size: sizeReducer,
    },
});