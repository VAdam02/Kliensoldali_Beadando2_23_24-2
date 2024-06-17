import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGetExperiencesQuery } from "@/store/reducers/experienceApiSlice";
import { useAddExperiencesMutation } from "@/store/reducers/experienceApiSlice";
import { setExperiences } from "@/store/reducers/experienceSlice";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { data: experiencesData, error, isLoading, refetch } = useGetExperiencesQuery();
    const [addExperiences] = useAddExperiencesMutation()

    const userState = useSelector(state => state.user.user);

    const [name, setName] = React.useState(userState.name || "");
    const [email, setEmail] = React.useState(userState.email || "");
    const newExperiencesState = useSelector(state => state.experiences.newExperiences);
    const experiencesState = useSelector(state => state.experiences.experiences);

    React.useEffect(() => {
        if (userState) {
            setName(userState.name || "");
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
            {experiencesState && (
                <ul>
                    {experiencesState.concat(newExperiencesState).map((exp, index) => (
                        <li key={index}>{JSON.stringify(exp)}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProfilePage;
