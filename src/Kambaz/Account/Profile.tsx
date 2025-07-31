import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";

export default function Profile() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/Kambaz/Account/Signin");
        }
    }, [currentUser, navigate]);

    const handleSignout = () => {
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };

    if (!currentUser) {
        return null;
    }

    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            <Form.Control
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                placeholder="username"
                className="wd-username mb-2" />
            <Form.Control
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                placeholder="password"
                type="password"
                className="wd-password mb-2" />
            <Form.Control
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                placeholder="First Name"
                id="wd-firstname"
                className="mb-2" />
            <Form.Control
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                placeholder="Last Name"
                id="wd-lastname"
                className="mb-2" />
            <Form.Control
                value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                type="date"
                id="wd-dob"
                className="mb-2" />
            <Form.Control
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                type="email"
                id="wd-email"
                className="mb-2" />
            <Form.Select
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                id="wd-role"
                className="mb-2">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </Form.Select>
            <div className="d-grid gap-2">
                <Button
                    onClick={handleSignout}
                    className="btn btn-danger btn-lg text-white">
                    Sign out
                </Button>
            </div>
        </div>
    );
}