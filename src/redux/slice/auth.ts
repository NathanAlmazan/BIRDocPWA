import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Authentication {
    uid: string | null,
    username: string | null,
    position: string | null,
    office: string | null,
    section: string | null
}

const initialState: Authentication = {
    uid: "622dd38a-c25f-49a6-8443-bad4493db47b",
    username: "John Doe",
    position: "Regional Director",
    office: "Office of the Regional Director",
    section: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Authentication>) => {
            
        },
        logout: (state) => {
            
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer