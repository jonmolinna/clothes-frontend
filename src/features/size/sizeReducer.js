import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    sizes: null,
    isLoading: false,
    error: null,
    isDeleting: false,
    isEditing: false,
    sizeEditing: null,
};

// GET ALL SIZES
export const getAllSizes = createAsyncThunk('get/size', async (token, thunkApi) => {
    try {
        let options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            }
        };
        const res = await axios('/size', options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// DELETE SIZE
export const deleteSize = createAsyncThunk('delete/size', async (sizeData, thunkApi) => {
    const { id, token } = sizeData;
    try {
        let options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            }
        };

        const res = await axios(`/size/${id}`, options);
        if (res.data.statusCode === 200) {
            return id;
        }
        return 0;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// ADD SIZE
export const addSize = createAsyncThunk('post/size', async (sizeData, thunkApi) => {
    const { size, token } = sizeData;
    try {
        let options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            },
            data: JSON.stringify({
                name: size
            })
        };
        const res = await axios('/size', options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// UPDATE SIZE
export const updateSize = createAsyncThunk('put/size', async (sizeData, thunkApi) => {
    const { id, size, token } = sizeData;
    try {
        let options = {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            },
            data: JSON.stringify({
                name: size
            })
        };
        const res = await axios(`/size/${id}`, options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
})

export const sizeSlice = createSlice({
    name: 'size',
    initialState,
    reducers: {
        isDeleteSize: (state) => {
            state.isDeleting = true;
        },
        editSize: (state, action) => {
            state.isEditing = true;
            state.sizeEditing = action.payload;
        },
        resetSize: (state) => {
            state.sizes = null;
            state.isLoading = false;
            state.error = null;
            state.isDeleting = false;
            state.isEditing = false;
            state.sizeEditing = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSizes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSizes.fulfilled, (state, action) => {
                state.sizes = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getAllSizes.rejected, (state, action) => {
                state.colors = null;
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteSize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.isDeleting = false;
                state.sizes = state.sizes.filter(item => item.id !== action.payload);
            })
            .addCase(deleteSize.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isDeleting = false;
            })
            .addCase(addSize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addSize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.sizes = [action.payload, ...state.sizes];
            })
            .addCase(addSize.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateSize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isEditing = false;
                state.sizeEditing = null;
                state.error = null;
                state.sizes = state.sizes.map(item => item.id === action.payload.id ? action.payload : item)
            })
            .addCase(updateSize.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isEditing = false;
                state.sizeEditing = null;
            })
    },
});

export const { isDeleteSize, editSize, resetSize } = sizeSlice.actions;

export default sizeSlice.reducer;