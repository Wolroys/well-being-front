import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../model/IUser';

type getAllEventsBody = {
    params?: {
        page?: number,
        size?: number,
        title?: string,
    }
}

type getEventBody = {
    params: {
        eventId: number,
    }
}

export type EventType = {
    id?: number,
    title: string,
    description?: string,
    startDate: string,
    endDate: string,
    speaker?: IUser,
    url: string,
    status: "PLANNED" | "IN_PROGRESS" | "FINISHED",
}