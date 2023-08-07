import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OfficeSections } from "../../api/threads/types";

export interface Authentication {
    uid: string | null;
    username: string | null;
    position: string | null;
    office: OfficeSections | null;
}

const initialState: Authentication = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : {
    uid: null,
    username: null,
    position: null,
    office: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Authentication>) => {
            state.uid = action.payload.uid
            state.position = action.payload.position
            state.username = action.payload.username
            state.office = action.payload.office

            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.uid = null
            state.position = null
            state.username = null
            state.office = null

            localStorage.removeItem('user')
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer