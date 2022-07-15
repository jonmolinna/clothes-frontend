import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem("mvidia_jwt");

const initialState = {
    auth: null,
    isLoading: false,
    error: null
};

if (token) {
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);
    if (new Date() > expiresAt) {
        localStorage.removeItem("mvidia_jwt");
    } else {
        initialState.auth = decodedToken;
    }
};

// Login User
export const login = createAsyncThunk('auth', async (userData, thunkApi) => {
    try {
        const res = await axios.post('/auth', userData);
        if (res?.data?.token) {
            localStorage.setItem("mvidia_jwt", res.data.token);
        }
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.auth = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.auth = null;
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default authSlice.reducer;
