import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/auth/',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            } else if (localStorage.getItem('token')) {
                headers.set('authorization', `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
            }
            return headers;
        }
    }),
    endpoints:(builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation({
            query: (credentials) => ({
                url: 'logout',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials
            })
        }),
    })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation, useCurrentUserMutation} = authApi;
