import * as React from "react";
import { useRegisterMutation } from "@/store/reducers/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { login } from "@/store/reducers/userSlice";

const RegisterPage = () => {
    const [apiRegister] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [fullname, setFullname] = React.useState("");
    const [profileType, setProfileType] = React.useState("jobseeker");
    const [experience, setExperience] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSubmit = (e) => {
        setError(""); // Reset error state
        e.preventDefault();
        const payload = {
            email,
            password,
            fullname,
            profileType,
            ...(profileType == "jobseeker" && { experience }),
        };

        apiRegister({ body: payload })
            .unwrap()
            .then(data => {
                dispatch(login(data));
                setEmail("");
                setPassword("");
                setFullname("");
                setProfileType("jobseeker");
                setExperience("");
                navigate("/");
            })
            .catch(err => {
                setError("Hiba történt. Próbálja újra később.");
                console.error("Registration failed: ", err);
            });
    };

    return (
        <>
            <h1>Regisztráció</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Jelszó</label>
                <Input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Teljes Név</label>
                <Input
                    type="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                />
                <label>Profil Típus</label>
                <Select value={profileType} onValueChange={(e) => setProfileType(e)}>
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
                {profileType == "jobseeker" && (
                    <div className="form-group">
                        <label>Korábbi Munkatapasztalatok</label>
                        <Textarea 
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="Cég;Pozíció;Évszámok"
                        />
                    </div>
                )}
                {error && <div className="error">{error}</div>}
                <Button type="submit">Regisztráció</Button>
            </form>
        </>
    );
}

export default RegisterPage;
