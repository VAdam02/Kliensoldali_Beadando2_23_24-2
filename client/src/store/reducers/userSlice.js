import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        login : (state, {payload}) => {
            state.user = payload.user
            state.token = payload.token
        },
        logout : (state) => {
            state.user = null
            state.token = null
        }
    }
})

export const {login, logout} = userSlice.actions