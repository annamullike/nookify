import { createSlice } from "@reduxjs/toolkit";

export const genresSlice = createSlice({
    name: "setReduxGenre",
    initialState: {
        genres: []
    },
    reducers: {
        setReduxGenre: (state, action) => {
            state.genres = action.payload.genres
        }
    }
})

export const {setReduxGenre} = genresSlice.actions;
export default genresSlice.reducer;