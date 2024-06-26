import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/authentication",
    }),
    endpoints: (build) => ({
        login: build.mutation({
            query: ({body}) => ({
                method: "POST",
                body: {
                    ...body,
                    strategy: "local",
                },
            })
        }),
        register: build.mutation({
            query: ({body}) => ({
                method: "POST",
                body: {
                    ...body,
                },
                url: "http://localhost:3030/users"
            })
        }),
    })
})

export const { useLoginMutation, useRegisterMutation } = userApiSlice;