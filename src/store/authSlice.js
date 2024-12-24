import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentStatus: false,
    currentUserData: null
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentStatus = true,
                state.currentStatus = action.payload.currentUserData
        },
        logout: (state) => {
            state.currentStatus = false,
                state.currentUserData = null
        }
    }
})
export const { logout, login } = authSlice.actions;

export default authSlice.reducer;


