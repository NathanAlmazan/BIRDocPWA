import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Authentication {
    uid: string | null,
    username: string | null,
    position: string | null,
    office: string | null,
    section: string | null
}

const initialState: Authentication = {
    uid: "88f4b611-cfcf-4033-a675-73cc7b3d7a75",
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