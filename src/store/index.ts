import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

import {authApi} from "../api/auth";
import {accountSlice} from "./accountSlice"

const reducers = {
    [authApi.reducerPath]: authApi.reducer,
    account: accountSlice.reducer,
}

const store = configureStore({
    reducer: combineReducers(reducers),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).concat(
            authApi.middleware,
        ),
});

setupListeners(store.dispatch);

export default store;
