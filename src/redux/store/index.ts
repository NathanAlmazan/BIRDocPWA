import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../slice"

const store = configureStore({
    reducer: combineReducers({
      auth: authSlice
    })
  });

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export default store