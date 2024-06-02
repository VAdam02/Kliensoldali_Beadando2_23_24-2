import * as React from "react";
import { useLoginMutation } from "@/store/reducers/userApiSlice";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
    const [apiLogin] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSubmit = (e) => {
        setError(""); // Reset error state
        e.preventDefault();
        apiLogin({ body: { email, password } })
            .unwrap()
            .then(data => {
                dispatch(login(data));
                setEmail("");
                setPassword("");
                navigate("/");
            })
            .catch(err => {
                if (err.status === 401) {
                    setError("Hibás jelszó vagy email cím.");
                } else {
                    setError("Hiba történt. Próbálja újra később.");
                    console.error("Login failed: ", err);
                }
            });
    };

    return (
        <>
            <h1>Bejelentkezés</h1>
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
                {error && <div className="error">{error}</div>}
                <Button type="submit">Bejelentkezés</Button>
            </form>
        </>
    );
}

export default LoginPage;
