import { createSlice } from "@reduxjs/toolkit";

export const recQueriesSlice = createSlice({
  name: "updateRecQuery",
  initialState: {
    danceability: undefined,
    instrumentalness: undefined,
    speechiness: undefined,
    popularity: undefined,
    valence: undefined,
    market: "ES"
  },
  reducers: {
    updateRecQuery: (state, action) => {
      const { danceability, instrumentalness, popularity, speechiness, market, valence } =
        action.payload;
      if (danceability !== undefined) state.danceability = danceability;
      if (instrumentalness !== undefined)
        state.instrumentalness = instrumentalness;
      if (speechiness !== undefined) state.speechiness = speechiness;
      if (popularity !== undefined) state.popularity = popularity;
      if (market !== undefined) state.market = market;
      if (valence !== undefined) state.valence = valence;
    },
  },
});

export const { updateRecQuery } = recQueriesSlice.actions;
export default recQueriesSlice.reducer;
