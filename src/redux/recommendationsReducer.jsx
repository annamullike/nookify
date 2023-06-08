import { createSlice } from "@reduxjs/toolkit";

export const recommendationsSlice = createSlice({
  name: "updateRecs",
  initialState: {
    recNames: [],
    recIds: [],
    recSrc: [],
    recArtist: [],
    recGenres: [],
  },
  reducers: {
    updateRecommendations: (state, action) => {
      state.recNames = action.payload.recNames;
      state.recIds = action.payload.recIds;
      state.recSrc = action.payload.recSrc;
      state.recArtist = action.payload.recArtist;
      state.recGenres = action.payload.recGenres;
    },
  },
});

export const { updateRecommendations } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
