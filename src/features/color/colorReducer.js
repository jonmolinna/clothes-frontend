import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    colors: null,
    isLoading: false,
    error: null,
};

// GET ALL COLORS
export const getAllColor = createAsyncThunk('get/color', async (token, thunkApi) => {
    try {
        let options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            }
        }
        const res = await axios('/color', options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// ADD ONE COLOR
export const addColor = createAsyncThunk('post/color', async (colorData, thunkApi) => {
    const { color, token } = colorData;
    try {
        let options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            },
            data: JSON.stringify({
                name: color
            })
        }
        const res = await axios('/color', options);
        return res.data
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllColor.fulfilled, (state, action) => {
                state.colors = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getAllColor.rejected, (state, action) => {
                state.colors = null;
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.colors = [action.payload, ...state.colors]
            })
            .addCase(addColor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default colorSlice.reducer;