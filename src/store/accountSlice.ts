import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from '../model/IUser';

export interface AccountState {
    token: string | null;
    data: IUser | null;
    isLoading: boolean;
    error: boolean;
}

const initialState: AccountState = {
    token: localStorage.getItem("token"),
    data: null,
    isLoading: true,
    error: false,
};

export const accountSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{token: string; data: IUser}>) {
            const {token, data} = action.payload;
            state.data = data;
            state.token = token;
            localStorage.setItem("token", token);
            localStorage.setItem("id", String(data.id));
        },

        getUser(
            state,
            action: PayloadAction<{data: IUser; isLoading: boolean}>,
        ) {
            if (state.token) {
                state.data = action.payload.data;
                state.isLoading = action.payload.isLoading;
            }
        },

        editUser(state, action: PayloadAction<IUser>) {
            if (state.token) {
                state.data = action.payload;
            }
        },

        logout(state) {
            state.token = null;
            state.data = null;
            localStorage.removeItem("token");
        },
    },
});

export const {login, getUser, editUser, logout} = accountSlice.actions;