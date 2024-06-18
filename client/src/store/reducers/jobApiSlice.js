import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "http://localhost:3030/jobs";

export const jobApiSlice = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: url,
    }),
    endpoints: (build) => ({
        getJobsWithFilter: build.query({
            query: ({ salaryFrom, type, city, homeOffice }) => {
                const params = {};
                if (salaryFrom > 0) params["salaryFrom[$gte]"] = salaryFrom;
                if (type !== undefined && type != "any") params.type = type;
                if (city !== undefined && city != "") params["city"] = city;
                if (homeOffice) params.homeOffice = homeOffice;

                return {
                    method: "GET",
                    params,
                    url: url
                };
            }
        })
    })
})

export const {
    useGetJobsWithFilterQuery
} = jobApiSlice;