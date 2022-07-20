import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    colors: null,
    isLoading: false,
    error: null,
    isEditing: false,
    colorEditing: null,
    isDeleting: false,
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

// UPDATE COLOR
export const updateColor = createAsyncThunk('put/color', async (colorData, thunkApi) => {
    const { id, color, token } = colorData;
    try {
        let options = {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            },
            data: JSON.stringify({
                name: color
            })
        };
        const res = await axios(`/color/${id}`, options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// DELETE COLOR
export const deleteColor = createAsyncThunk('delete/color', async (colorData, thunkApi) => {
    const { id, token } = colorData;
    try {
        let options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            }
        };

        const res = await axios(`/color/${id}`, options);
        if (res.data.statusCode === 200) {
            return id;
        }
        return 0;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        editColor: (state, action) => {
            state.isEditing = true;
            state.colorEditing = action.payload;
        },
        isDeleteColor: (state) => {
            state.isDeleting = true;
        },
        resetColor: (state) => {
            state.colors = null;
            state.isLoading = false;
            state.error = null;
            state.isEditing = false;
            state.colorEditing = null;
            state.isDeleting = false;
        }
    },
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
            .addCase(updateColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isEditing = false;
                state.colorEditing = null;
                state.error = null;
                state.colors = state.colors.map(item => item.id === action.payload.id ? action.payload : item)
            })
            .addCase(updateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isEditing = false;
                state.colorEditing = null;
            })
            .addCase(deleteColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.isDeleting = false;
                state.colors = state.colors.filter(item => item.id !== action.payload);
            })
            .addCase(deleteColor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isDeleting = false;
            })
    }
});

export const { editColor, isDeleteColor, resetColor } = colorSlice.actions;

export default colorSlice.reducer;