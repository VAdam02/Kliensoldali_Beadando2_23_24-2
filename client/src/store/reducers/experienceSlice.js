import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    newExperiences: [],
    experiences: [],
    limit: 0,
    skip: 0,
    total: 0
}

export const experienceSlice = createSlice({
    name: "experiences",
    initialState,
    reducers : {
        setExperiences: (state, {payload}) => {
            state.newExperiences = payload.new || state.newExperiences
            state.experiences = payload.data || state.experiences
            state.limit = payload.limit || state.limit
            state.skip = payload.skip || state.skip
            state.total = payload.total || state.total
        },
    }
})

export const {setExperiences} = experienceSlice.actions