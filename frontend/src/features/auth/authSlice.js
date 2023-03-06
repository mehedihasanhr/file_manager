import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: null,
    loading: true,
    error: null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.auth = action.payload;
        },

        logout: (state) => {
            state.auth = null;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }

    }
});


export const { setCredentials, logout, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;