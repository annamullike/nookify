import { configureStore } from "@reduxjs/toolkit";
import recommendationsReducer from "./recommendationsReducer";
import recQueriesReducer from "./recQueriesReducer";
export default configureStore({
    reducer: {
        recommendations: recommendationsReducer,
        recQueries: recQueriesReducer,
    }
})