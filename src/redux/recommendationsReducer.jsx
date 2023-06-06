import { createSlice } from "@reduxjs/toolkit";

export const recommendationsSlice = createSlice({
    name: "updateRecs",
    initialState: {
        recNames: [],
        recIds: [],
        recSrc: [],
    },
    reducers: {
        updateRecommendations: (state, action) => {
            state.recNames = action.payload.recNames;
            state.recIds = action.payload.recIds;
            state.recSrc = action.payload.recSrc;
        }
    }
})

export const {updateRecommendations} = recommendationsSlice.actions;
export default recommendationsSlice.reducer;