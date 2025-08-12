import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form } from "react-bootstrap";

export default function Signup() {
	const [user, setUser] = useState<any>({});
	const [verifyPassword, setVerifyPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const signup = async () => {
		setError("");
		if (user.password !== verifyPassword) {
			setError("Passwords do not match");
			return;
		}
		if (!user.username || !user.password) {
			setError("Username and password are required");
			return;
		}
		try {
			const currentUser = await client.signup(user);
			dispatch(setCurrentUser(currentUser));
			navigate("/Kambaz/Account/Profile");
		} catch (error: any) {
			setError(error.message || "Signup failed. Please try again.");
		}
	};

	return (
		<div id="wd-signup-screen">
			<h1>Sign up</h1>
			{error && (
				<div className="alert alert-danger mb-2" role="alert">
					{error}
				</div>
			)}
			<Form.Control
				value={user.username || ""}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
				placeholder="username"
				className="wd-username mb-2"
			/>
			<Form.Control
				value={user.password || ""}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
				placeholder="password"
				type="password"
				className="wd-password mb-2"
			/>
			<Form.Control
				value={verifyPassword}
				onChange={(e) => setVerifyPassword(e.target.value)}
				placeholder="verify password"
				type="password"
				className="wd-password-verify mb-2"
			/>
			<button
				onClick={signup}
				className="btn btn-primary w-100 mb-2 wd-signup-btn"
			>
				Sign up
			</button>
			<Link
				to="/Kambaz/Account/Signin"
				id="wd-signin-link"
			>
				Sign in
			</Link>
		</div>
	);
}