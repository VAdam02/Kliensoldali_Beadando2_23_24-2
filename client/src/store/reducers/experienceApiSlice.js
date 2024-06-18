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
        updateExperience: build.mutation({
            query: ({ body }) => ({
                url: `/${body.id}`,
                method: "PATCH",
                body: {company: body.company,
                       title: body.title,
                       interval: body.interval},
            })
        }),
        deleteExperience: build.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            })
        }),
    })
})

export const { useGetExperiencesQuery, useAddExperiencesMutation, useUpdateExperienceMutation, useDeleteExperienceMutation } = experienceApiSlice;