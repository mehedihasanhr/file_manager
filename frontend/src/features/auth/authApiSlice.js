import { apiSlice } from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        refresh: builder.query({
            query: () => '/auth/me',
        }),

        signup: builder.mutation({
            query: (paylaod) => ({
                url: '/auth/register',
                method: 'POST',
                body: paylaod,
            }),
        }),

        // login
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),

            async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                if (result.data) {
                    dispatch(setCredentials(result.data.data));
                }
            }
        }),

        // logout
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                if (result.data) {
                    dispatch(logout());
                }
            }
        }),



    })
});


export const { useRefreshQuery, useLoginMutation, useLogoutMutation, useSignupMutation } = authApiSlice;