import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDeleteExperienceMutation, useAddExperiencesMutation, useGetExperiencesQuery, useUpdateExperienceMutation } from "@/store/reducers/experienceApiSlice";
import { setExperiences } from "@/store/reducers/experienceSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { data: experiencesData, error, isLoading, refetch } = useGetExperiencesQuery();
    const [addExperiences] = useAddExperiencesMutation()
    const [updateExperience] = useUpdateExperienceMutation()
    const [deleteExperience] = useDeleteExperienceMutation()

    const userState = useSelector(state => state.user.user);

    const [name, setName] = React.useState(userState.fullname || "");
    const [email, setEmail] = React.useState(userState.email || "");
    const newExperiencesState = useSelector(state => state.experiences.newExperiences);
    const experiencesState = useSelector(state => state.experiences.experiences);

    const [editExperience, setEditExperience] = React.useState(null);

    React.useEffect(() => {
        if (userState) {
            setName(userState.fullname || "");
            setEmail(userState.email || "");
        }
    }, [userState]);


    React.useEffect(() => {
        if (experiencesData) {
            dispatch(setExperiences(experiencesData))
        }
    }, [experiencesData])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newExperiences = newExperiencesState.map(exp => {
            const split = exp.split(";")
            return {
                company: split[0],
                title: split[1],
                interval: split[2],
            }
        })
        addExperiences({ body: newExperiences })
            .unwrap()
            .then((data) => {
                dispatch(setExperiences({new: []}))
                refetch();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleEdit = (experience) => {
        updateExperience({body: experience})
            .unwrap()
            .then((data) => {
                refetch()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = (id) => {
        deleteExperience(id)
            .unwrap()
            .then((data) => {
                refetch()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="profile-page">
            <h1>Profilom</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Név</label>
                    <Input 
                        type="text" 
                        value={name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <Input 
                        type="email" 
                        value={email}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Korábbi Munkatapasztalatok hozzáadása</label>
                    <Textarea 
                        value={newExperiencesState.join("\n")}
                        onChange={(e) => dispatch(setExperiences({new: e.target.value.split("\n")}))}
                        placeholder="Cég;Pozíció;Évszámok"
                    />
                </div>
                <Button type="submit">Mentés</Button>
            </form>
            <h2>Korábbi Munkahelyek</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading experiences: {error.message}</div>}
            {experiencesState && (
                <div>
                    {experiencesState.map((exp, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{exp.company}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{exp.title} ({exp.interval})</CardDescription>
                                <Button onClick={() => handleDelete(exp.id)}>Delete</Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setEditExperience(exp)}>Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Tapasztalat szerkesztése</DialogTitle>
                                        </DialogHeader>
                                        {editExperience && (
                                            <>
                                            <div>
                                                <label>Cég</label>
                                                <Input
                                                    type="text" 
                                                    value={editExperience.company || ""}
                                                    onChange={(e) => setEditExperience({ ...editExperience, company: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label>Pozíció</label>
                                                <Input
                                                    type="text" 
                                                    value={editExperience.title || ""}
                                                    onChange={(e) => setEditExperience({ ...editExperience, title: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label>Évszámok</label>
                                                <Input
                                                    type="text" 
                                                    value={editExperience.interval || ""}
                                                    onChange={(e) => setEditExperience({ ...editExperience, interval: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                            </div>
                                            </>
                                        )}
                                        <DialogFooter className="sm:justify-start">
                                            <DialogClose asChild>
                                                <Button type="button" onClick={() => handleEdit(editExperience)}>
                                                    Save
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
