import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApiSlice = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/jobs",
    }),
    endpoints: (build) => ({
        getJobs: build.query({
            query: () => ({
                method: "GET",
            })
        })
    })
})

export const {
    useGetJobsQuery
} = jobApiSlice;