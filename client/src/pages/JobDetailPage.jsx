import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const JobDetailPage = () => {
    const { id } = useParams();
    const job = useSelector(state => state.job.jobs.find(job => job.id === parseInt(id)));

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{job.company}</CardTitle>
                    <CardDescription>{job.position}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p><strong>Description:</strong> {job.description}</p>
                        <p><strong>Location:</strong> {job.city}</p>
                        <p>
                            <strong>Salary:</strong> 
                            {new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(job.salaryFrom)}-
                            {new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(job.salaryTo)}
                        </p>
                        <p><strong>Type:</strong> <Badge>{job.type}</Badge></p>
                        <p><strong>Home Office:</strong> {job.homeOffice ? "Available" : "Not Available"}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default JobDetailPage;
