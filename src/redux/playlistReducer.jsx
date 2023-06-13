import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
    name: "setPlaylist",
    initialState: {
        playlist: [],
    },
    reducers: {
        setPlaylist: (state, action) => {
            state.playlist = action.payload.playlist;
        }
    }
})

export const {setPlaylist} = playlistSlice.actions;
export default playlistSlice.reducer;