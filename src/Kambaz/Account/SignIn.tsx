import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as db from "../Database";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";


export default function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignin = () => {
        const user = db.users.find(
            (user) => user.username === credentials.username && user.password === credentials.password
        );
        if (user) {
            dispatch(setCurrentUser(user));
            navigate("/Kambaz/Dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>
            <Form.Control
                id="wd-username"
                placeholder="username"
                className="mb-2"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <Form.Control
                id="wd-password"
                placeholder="password"
                type="password"
                className="mb-2"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <Button id="wd-signin-btn" onClick={handleSignin} className="btn btn-primary w-100 mb-2">
                Sign in
            </Button>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Sign up</Link>
        </div>
    );
}
