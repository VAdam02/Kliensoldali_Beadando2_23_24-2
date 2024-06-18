import * as React from "react";
import { useRegisterMutation } from "@/store/reducers/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoginMutation } from "@/store/reducers/userApiSlice";
import { login } from "@/store/reducers/userSlice";
import { useAddExperiencesMutation } from "@/store/reducers/experienceApiSlice";

const RegisterPage = () => {
    const [apiRegister] = useRegisterMutation();
    const [apiLogin] = useLoginMutation();
    const [addExperiences] = useAddExperiencesMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [fullname, setFullname] = React.useState("");
    const [role, setRole] = React.useState("jobseeker");
    const [experiences, setExperiences] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Reset error state

        const payload = {
            email,
            password,
            fullname,
            role
        };

        apiRegister({ body: payload })
            .unwrap()
            .then(data => {
                setFullname("");
                setRole("jobseeker");

                apiLogin({ body: { email, password } })
                    .unwrap()
                    .then(data => {
                        dispatch(login(data));
                        setEmail("");
                        setPassword("");

                        const preparedExperiences = experiences.split("\n").map(exp => {
                            const split = exp.split(";");
                            return {
                                company: split[0],
                                title: split[1],
                                interval: split[2],
                            };
                        });

                        addExperiences({ body: preparedExperiences })
                            .unwrap()
                            .then(() => {
                                setExperiences("");
                                navigate("/");
                            })
                            .catch(error => {
                                console.error("Failed to add experiences:", error);
                            });
                    })
                    .catch(err => {
                        if (err.status === 401) {
                            setError("Hibás jelszó vagy email cím.");
                        } else {
                            setError("Hiba történt. Próbálja újra később.");
                            console.error("Login failed: ", err);
                        }
                    });
            })
            .catch(err => {
                setError("Hiba történt. Próbálja újra később.");
                console.error("Registration failed: ", err);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Regisztráció</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email">Email</label>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email cím"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Jelszó</label>
                            <Input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Jelszó"
                            />
                        </div>
                        <div>
                            <label htmlFor="fullname">Teljes Név</label>
                            <Input 
                                id="fullname" 
                                name="fullname" 
                                type="text" 
                                required 
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Teljes Név"
                            />
                        </div>
                        <div>
                            <label htmlFor="role">Profil Típus</label>
                            <Select value={role} onValueChange={(e) => setRole(e)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Profil Típus" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Profil Típus</SelectLabel>
                                        <SelectItem value="jobseeker">Munkavállaló</SelectItem>
                                        <SelectItem value="company">Munkáltató</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {role === "jobseeker" && (
                            <div>
                                <label htmlFor="experience">Korábbi Munkatapasztalatok</label>
                                <Textarea 
                                    id="experience" 
                                    value={experiences}
                                    onChange={(e) => setExperiences(e.target.value)}
                                    placeholder="Cég;Pozíció;Évszámok"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        )}
                    </div>

                    {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

                    <div>
                        <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Regisztráció
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
