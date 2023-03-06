import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../../features/auth/authSlice';


const baseUrl = process.env.NODE_ENV === 'production' ?
    process.env.REACT_APP_API_URL
    : 'http://localhost:5000/api';




const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.auth?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        if (refreshResult?.data) {
            const auth = api.getState().auth.auth;
            api.dispatch(setCredentials({
                ...auth,
                ...refreshResult.data.data
            }))
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};



export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Folder'],
    endpoints: (builder) => ({}),
})