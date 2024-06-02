import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: [],
    limit: 0,
    skip: 0,
    total: 0
}

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setJobs: (state, {payload}) => {
            state.jobs = payload.data
            state.limit = payload.limit
            state.skip = payload.skip
            state.total = payload.total
        }
    }
})

export const { setJobs } = jobSlice.actions