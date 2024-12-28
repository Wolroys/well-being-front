import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UserData {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
}

export const userApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/user',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<void, UserData>({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: builder.mutation<void, UserData>({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData,
            }),
        }),
        getSpeakers: builder.query({
            query: ({ name }) => ({
                url: '/speakers',
                params: { name },
            }),
        })
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetSpeakersQuery } = userApi;
