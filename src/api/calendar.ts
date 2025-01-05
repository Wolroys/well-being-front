import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUser} from '../model/IUser';

type getAllEventsBody = {
    params?: {
        page?: number,
        size?: number,
        title?: string,
    }
};

type getEventBody = {
    params: {
        eventId: number,
    }
};

export type EventType = {
    id?: number,
    title: string,
    description?: string,
    startDate: string,
    endDate: string,
    speaker?: IUser,
    url: string,
    status: string,
};

export type CreateEventBody = {
    params?: any;
    data: EventType;
}

export const calendarApi = createApi({
    reducerPath: 'calendarAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/event',
    }),
    tagTypes: ['getAllEvents', 'getEvent'],
    endpoints: build => ({
        getAllEvents: build.query<any, getAllEventsBody>({
            query: body => {
                const token = localStorage.getItem("token");
                return {
                    url: '',
                    params: body.params,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                };
            },
            providesTags: ['getAllEvents']
        }),

        getEvent: build.query<any, getEventBody>({
            query: body => {
                const token = localStorage.getItem("token");
                return {
                    url: '/info',
                    params: body.params,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            providesTags: ['getEvent'],
        }),

        createEvent: build.mutation<any, CreateEventBody>({
            query: body => ({
                url: '/add',
                method: 'POST',
                body: body.data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['getAllEvents'],
        }),

        deleteEvent: build.mutation<any, getEventBody>({
            query: body => ({
                url: '/delete',
                params: body.params,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }),
            invalidatesTags: ['getAllEvents', 'getEvent']
        })
    })
})

export const {
    useGetAllEventsQuery
} = calendarApi