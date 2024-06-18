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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Bejelentkezés</h2>
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Jelszó"
                            />
                        </div>
                    </div>

                    {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

                    <div>
                        <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Bejelentkezés
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
