import * as React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useGetJobsWithFilterQuery } from "@/store/reducers/jobApiSlice";
import { setJobs } from "@/store/reducers/jobSlice";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [ salaryFrom, setSalaryFrom ] = React.useState(0);
    const [ type, setType ] = React.useState("any");
    const [ city, setCity ] = React.useState(undefined);
    const [ homeOffice, setHomeOffice ] = React.useState(undefined);
    const { data: jobs, error, isLoading } = useGetJobsWithFilterQuery({ salaryFrom, type, city, homeOffice});

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
            <div>
                <Input 
                    placeholder="Minimum fizetés" 
                    type="number" 
                    value={salaryFrom || ""}
                    onChange={(e) => setSalaryFrom(e.target.value)} 
                />
                <Select
                    value={type}
                    onValueChange={(e) => setType(e)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Foglalkoztatás típusa" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Foglalkoztatás típusa</SelectLabel>
                        <SelectItem value="any">---</SelectItem>
                        <SelectItem value="full-time">Teljes munkaidő</SelectItem>
                        <SelectItem value="part-time">Rész munkaidő</SelectItem>
                        <SelectItem value="contract">Szerződéses</SelectItem>
                        <SelectItem value="internship">Gyakornok</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input 
                    placeholder="Város" 
                    value={city || ''} 
                    onChange={(e) => setCity(e.target.value)} 
                />
                <Switch 
                    value={homeOffice}
                    onCheckedChange={(e) => setHomeOffice(e)}
                />
            </div>
            {error && <div>Error: {JSON.stringify(error)}</div>}
            {isLoading && <div>Loading...</div>}
            {jobCount} jobs found
            {jobCount > 0 && (
                <ul>
                    {jobsState.map(job => (
                        <Link to={`/job/${job.id}`} key={job.id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{job.company}</CardTitle>
                                    <CardDescription>{job.position}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div><strong>Location:</strong> {job.city}</div>
                                        <div><strong>Salary:</strong> {new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(job.salaryFrom)} - {new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(job.salaryTo)}</div>
                                        <div><strong>Type:</strong> <Badge>{job.type}</Badge></div>
                                        <div><strong>Home Office:</strong> {job.homeOffice ? "Available" : "Not Available"}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HomePage;