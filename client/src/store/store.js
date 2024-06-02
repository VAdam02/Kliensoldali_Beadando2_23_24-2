import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "@/store/reducers/userSlice";
import { userApiSlice } from "@/store/reducers/userApiSlice";
import { jobSlice } from "@/store/reducers/jobSlice";
import { jobApiSlice } from "@/store/reducers/jobApiSlice";

const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [jobSlice.name]: jobSlice.reducer,
        [jobApiSlice.reducerPath]: jobApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(userApiSlice.middleware).concat(jobApiSlice.middleware)
    )
})

export default store