import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OfficeSections, Roles } from "../../api/threads/types";

export interface Authentication {
    uid: string | null;
    username: string | null;
    role: Roles | null;
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
            state.role = action.payload.role
            state.username = action.payload.username
            state.office = action.payload.office

            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.uid = null
            state.role = null
            state.username = null
            state.office = null

            localStorage.removeItem('user')
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer