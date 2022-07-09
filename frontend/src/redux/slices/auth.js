import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';


export const fetchUserData = createAsyncThunk('posts/fetchUserData', async (params) => {
    const { data } = await instance.post('/auth/login', params);
    return data;
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducer: { },
    extraReducers: {
        [fetchUserData.pending] : (state) => {
            state.status = 'loading';
            state.data = null
        },
        [fetchUserData.fulfilled] : (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUserData.rejected] : (state, action) => {
            state.status = 'error';
            state.data = null;
        }
    }
})


export const authReducer = authSlice.reducer;