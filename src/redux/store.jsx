import { configureStore } from "@reduxjs/toolkit";
import recommendationsReducer from "./recommendationsReducer";
import recQueriesReducer from "./recQueriesReducer";
import tokenReducer from "./tokenReducer";
import genreReducer from "./genreReducer";
import songReducer from "./songReducer";
export default configureStore({
    reducer: {
        recommendations: recommendationsReducer,
        token: tokenReducer,
        recQueries: recQueriesReducer,
        genres: genreReducer,
        song: songReducer
    }
})