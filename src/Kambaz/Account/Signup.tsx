import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <Form.Control 
                defaultValue="user1" 
                placeholder="username" 
                className="wd-username mb-2" />
            <Form.Control 
                placeholder="password" 
                type="password" 
                className="wd-password mb-2" />
            <Form.Control 
                placeholder="verify password"
                type="password" 
                className="wd-password-verify mb-2" />
            <Link 
                to="/Kambaz/Account/Profile" 
                className="btn btn-primary w-100 mb-2">
                Sign up
            </Link>
            <Link 
                to="/Kambaz/Account/Signin" 
                id="wd-signin-link">
                Sign in
            </Link>
        </div>
    );
}