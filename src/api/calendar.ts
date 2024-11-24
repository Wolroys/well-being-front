import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../model/IUser';

type getAllEventsBody = {
    params?: {
        page?: number,
        size?: number,
        title?: string,
    }
}