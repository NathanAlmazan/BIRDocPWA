import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OfficeSections } from "../../api/threads/types";

export interface Authentication {
    uid: string | null;
    username: string | null;
    position: string | null;
    office: OfficeSections | null;
}

const initialState: Authentication = {
    uid: "622dd38a-c25f-49a6-8443-bad4493db47b",
    username: "John Doe",
    position: "Regional Director",
    office: {
        sectionId: 29,
        sectionName: "sample",
        officers: [],
        sectionOffice: {
            officeId: 8,
            officeName: "Collection Division",
            officeSections: []
        }
    }
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