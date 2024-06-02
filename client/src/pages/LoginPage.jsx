import * as React from "react"
import {useLoginMutation} from "@/store/reducers/userApiSlice.js";
import {useDispatch} from "react-redux";
import {login} from "@/store/reducers/userSlice.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [apiLogin] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (<>
        //TODO
        <button onClick={() => {
            apiLogin({
                body: {
                    "email": "user1@jobhunter.hu",
                    "password": "user1"
                }
            })
            .unwrap().then(data => {
                dispatch(login(data))
            })
            .then(() => navigate("/"))
        }}>Login as company</button><br />
        <button onClick={() => {
            apiLogin({
                body: {
                    "email": "user2@jobhunter.hu",
                    "password": "user2"
                }
            })
            .unwrap().then(data => {
                dispatch(login(data))
            })
            .then(() => navigate("/"))
        }}>Login as user</button>
    </>);
}

export default LoginPage;