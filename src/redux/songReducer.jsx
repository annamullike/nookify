import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name: "setReduxSong",
    initialState: {
        song: ""
    },
    reducers: {
        setReduxSong: (state, action) => {
            state.song = action.payload.song
        }
    }
})

export const {setReduxSong} = songSlice.actions;
export default songSlice.reducer