import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const experienceApiSlice = createApi({
    reducerPath: "experiencesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/experiences",
        prepareHeaders: (headers, { getState }) => {
            headers.set("Authorization", `Bearer ${getState().user.token}`);
            return headers;
        },
    }),
    endpoints: (build) => ({
        getExperiences: build.query({
            query: () => ({
                method: "GET",
            })
        }),
        addExperiences: build.mutation({
            query: ({body}) => ({
                method: "POST",
                body,
            })
        }),
    })
})

export const { useGetExperiencesQuery, useAddExperiencesMutation } = experienceApiSlice;