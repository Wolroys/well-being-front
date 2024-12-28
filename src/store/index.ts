import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

import {userApi} from "../api/user";
import {accountSlice} from "./accountSlice"

const reducers = {
    [userApi.reducerPath]: userApi.reducer,
    account: accountSlice.reducer,
}

const store = configureStore({
    reducer: combineReducers(reducers),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).concat(
            userApi.middleware,
        ),
});

setupListeners(store.dispatch);

export default store;
