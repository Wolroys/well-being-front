import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UserData {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<void, UserData>({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: builder.mutation<void, UserData>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
