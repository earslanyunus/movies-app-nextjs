
//create redux store
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
}
)

export default store