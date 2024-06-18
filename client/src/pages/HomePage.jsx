import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetJobsWithFilterQuery } from "@/store/reducers/jobApiSlice";
import { setJobs } from "@/store/reducers/jobSlice";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [ salaryFrom, setSalaryFrom ] = React.useState(0);
    const [ type, setType ] = React.useState("any");
    const [ city, setCity ] = React.useState(undefined);
    const [ homeOffice, setHomeOffice ] = React.useState(false);
    const { data: jobs, error, isLoading } = useGetJobsWithFilterQuery({ salaryFrom, type, city, homeOffice });

    const dispatch = useDispatch();
    const jobsState = useSelector(state => state.job.jobs);
    const jobCount = useSelector(state => state.job.total);

    React.useEffect(() => {
        if (jobs) {
            dispatch(setJobs(jobs));
        }
    }, [jobs]);

    const handleSalaryChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setSalaryFrom(value);
        } else {
            setSalaryFrom(0);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Home Page</h1>
            <div className="filters grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Minimum Fizetés</label>
                    <Input 
                        placeholder="Minimum fizetés" 
                        type="number" 
                        value={salaryFrom || ""}
                        onChange={handleSalaryChange}
                        className="mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Foglalkoztatás típusa</label>
                    <Select
                        value={type}
                        onValueChange={(e) => setType(e)}
                        className="mt-1"
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
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Város</label>
                    <Input 
                        placeholder="Város" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        className="mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Home Office</label>
                    <Switch 
                        checked={homeOffice}
                        onCheckedChange={(e) => setHomeOffice(e)}
                        className="mt-1"
                    />
                </div>
            </div>
            {error && <div className="text-red-500">Error: {JSON.stringify(error)}</div>}
            {isLoading && <div>Loading...</div>}
            {jobCount} jobs found
            {jobCount > 0 && (
                <div className="job-list grid grid-cols-1 gap-4">
                    {jobsState.map(job => (
                        <Link to={`/job/${job.id}`} key={job.id} className="block mb-4 transition-shadow shadow-lg hover:shadow-xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{job.company}</CardTitle>
                                    <CardDescription>{job.position}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div><strong>Location:</strong> {job.city}</div>
                                        <div>
                                            <strong>Salary:</strong> 
                                            {new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(job.salaryFrom)}-
                                            {new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(job.salaryTo)}
                                        </div>
                                        <div><strong>Type:</strong> <Badge>{job.type}</Badge></div>
                                        <div><strong>Home Office:</strong> {job.homeOffice ? "Available" : "Not Available"}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;
