import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    genders: null,
    isLoading: false,
    error: null,
    isDeleting: false,
    isEditing: false,
    genderEditing: null,
};

// GET ALL GENDERS
export const getAllGenders = createAsyncThunk('get/gender', async (token, thunkApi) => {
    try {
        let options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            }
        };

        const res = await axios('/gender', options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// DELETE GENDER
export const deleteGender = createAsyncThunk('delete/gender', async (genderData, thunkApi) => {
    const { id, token } = genderData;
    try {
        let options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            }
        };

        const res = await axios(`/gender/${id}`, options);
        if (res.data.statusCode === 200) {
            return id;
        }
        return 0;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// ADD GENDER
export const addGender = createAsyncThunk('post/gender', async (genderData, thunkApi) => {
    const { gender, token } = genderData;
    try {
        let options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            },
            data: JSON.stringify({
                name: gender
            })
        };
        const res = await axios('/gender', options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

// UPDATE GENDER
export const updateGender = createAsyncThunk('put/gender', async (genderData, thunkApi) => {
    const { id, gender, token } = genderData;
    try {
        let options = {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "authorization": `Bearer ${token}`,
            },
            data: JSON.stringify({
                name: gender
            })
        };
        const res = await axios(`/gender/${id}`, options);
        return res.data;
    } catch (err) {
        const error = err.response.data.message;
        return thunkApi.rejectWithValue(error);
    }
});

export const genderSlice = createSlice({
    name: 'gender',
    initialState,
    reducers: {
        isDeleteGender: (state) => {
            state.isDeleting = true;
        },
        editGender: (state, action) => {
            state.isEditing = true;
            state.genderEditing = action.payload;
        },
        resetGender: (state) => {
            state.genders = null;
            state.isLoading = false;
            state.error = null;
            state.isDeleting = false;
            state.isEditing = false;
            state.genderEditing = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllGenders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllGenders.fulfilled, (state, action) => {
                state.genders = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getAllGenders.rejected, (state, action) => {
                state.genders = null;
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteGender.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGender.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.isDeleting = false;
                state.genders = state.genders.filter(item => item.id !== action.payload);
            })
            .addCase(deleteGender.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isDeleting = false;
            })
            .addCase(addGender.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addGender.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.genders = [action.payload, ...state.genders];
            })
            .addCase(addGender.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateGender.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGender.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isEditing = false;
                state.genderEditing = null;
                state.error = null;
                state.genders = state.genders.map(item => item.id === action.payload.id ? action.payload : item)
            })
            .addCase(updateGender.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isEditing = false;
                state.genderEditing = null;
            })
    },
});

export const { isDeleteGender, editGender, resetGender } = genderSlice.actions;

export default genderSlice.reducer;