import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    categories: null,
    isLoading: false,
    error: null,
    isDeleting: false,
    isEditing: false,
    categoryEditing: null,
};

// GET ALL CATEGORY
export const getAllCategories = createAsyncThunk('get/category', async (token, thunkApi) => {
    try {
        let options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            }
        };
        const res = await axios('/category', options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// DELETE CATEGORY
export const deleteCategory = createAsyncThunk('delete/category', async (categoryData, thunkApi) => {
    const { id, token } = categoryData;
    try {
        let options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            }
        };

        const res = await axios(`/category/${id}`, options);
        if (res.data.statusCode === 200) {
            return id;
        }
        return 0;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// ADD CATEGORY
export const addCategory = createAsyncThunk('post/category', async (categoryData, thunkApi) => {
    const { category, token } = categoryData;
    try {
        let options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            },
            data: JSON.stringify({
                name: category
            })
        }
        const res = await axios('/category', options);
        return res.data
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// UPDATE CATEGORY
export const updateCategory = createAsyncThunk('put/category', async (categoryData, thunkApi) => {
    const { id, category, token } = categoryData;
    try {
        let options = {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            },
            data: JSON.stringify({
                name: category
            })
        };
        const res = await axios(`/category/${id}`, options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        isDeleteCategory: (state) => {
            state.isDeleting = true;
        },
        editCategory: (state, action) => {
            state.isEditing = true;
            state.categoryEditing = action.payload;
        },
        resetCategory: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.categories = null;
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.isDeleting = false;
                state.categories = state.categories.filter(item => item.id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isDeleting = false;
            })
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.categories = [action.payload, ...state.categories];
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isEditing = false;
                state.categoryEditing = null;
                state.error = null;
                state.categories = state.categories.map(item => item.id === action.payload.id ? action.payload : item);
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isEditing = false;
                state.categoryEditing = null;
            })
    }
});

export const { isDeleteCategory, editCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;