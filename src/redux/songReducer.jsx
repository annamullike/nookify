import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "setReduxSong",
  initialState: {
    song: "",
    artist: "",
  },
  reducers: {
    setReduxSong: (state, action) => {
      const { song, artist } = action.payload;
      if (song !== undefined) {
        state.song = song;
      }
      if (artist !== undefined) {
        state.artist = artist;
      }
    },
  },
});

export const { setReduxSong } = songSlice.actions;
export default songSlice.reducer;
