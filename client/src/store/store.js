import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "@/store/reducers/userSlice";
import { userApiSlice } from "@/store/reducers/userApiSlice";

const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(userApiSlice.middleware)
    )
})

export default store