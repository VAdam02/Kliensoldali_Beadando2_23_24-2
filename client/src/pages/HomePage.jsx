import * as React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useGetJobsQuery } from "../store/reducers/jobApiSlice";
import { setJobs } from "@/store/reducers/jobSlice";

const HomePage = () => {
    const { data: jobs, error, isLoading } = useGetJobsQuery();
    const dispatch = useDispatch();
    const jobsState = useSelector(state => state.job.jobs);
    const jobCount = useSelector(state => state.job.total);

    React.useEffect(() => {
        if(jobs) {
            dispatch(setJobs(jobs));
        }
    }, [jobs]);

    return (
        <div>
            <h1>Home Page</h1>//TODO
            {error && <div>Error: {JSON.stringify(error)}</div>}
            {isLoading && <div>Loading...</div>}
            {jobCount > 0 && (
                <ul>
                    {jobsState.map(job => (
                        <li key={job.id}>{JSON.stringify(job)}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HomePage;