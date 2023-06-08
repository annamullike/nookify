import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "setReduxToken",
    initialState: {
        token: ""
    },
    reducers: {
        setReduxToken: (state, action) => {
            state.token = action.payload.token
        }
    }
})

export const {setReduxToken} = tokenSlice.actions
export default tokenSlice.reducer;