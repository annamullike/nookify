import { configureStore } from "@reduxjs/toolkit";
import recommendationsReducer from "./recommendationsReducer";
export default configureStore({
    reducer: {
        recommendations: recommendationsReducer,
    }
})