import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();
    
    const fetchProfile = async () => {
        try {
            console.log("Fetching user profile...");
            const currentUser = await client.profile();
            console.log("Profile fetched successfully:", currentUser);
            dispatch(setCurrentUser(currentUser));
            setError("");
        } catch (err: any) {
            console.error("Profile fetch error:", err);
            if (err.response?.status !== 401) {
                setError(`Session error: ${err.message}`);
            }
            dispatch(setCurrentUser(null));
        } finally {
            setPending(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (pending) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading session...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-3">
                <h4>Session Error</h4>
                <p>{error}</p>
                <button 
                    className="btn btn-primary" 
                    onClick={() => {
                        setError("");
                        setPending(true);
                        fetchProfile();
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    return <>{children}</>;
}