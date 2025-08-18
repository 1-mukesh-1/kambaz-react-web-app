import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string>("");
    const [retryCount, setRetryCount] = useState(0);
    const dispatch = useDispatch();
    
    const fetchProfile = async () => {
        try {
            console.log("Fetching user profile...");
            const currentUser = await client.profile();
            console.log("Profile fetched successfully:", currentUser);
            dispatch(setCurrentUser(currentUser));
            setError("");
            setRetryCount(0);
        } catch (err: any) {
            console.error("Profile fetch error:", err);
            if (err.response?.status === 401) {
                console.log("User not authenticated, proceeding without login");
                dispatch(setCurrentUser(null));
                setError("");
            } else if (err.response?.status >= 500) {
                setError(`Server error: ${err.message}`);
            } else {
                console.log("Authentication error (non-401):", err.message);
                dispatch(setCurrentUser(null));
                setError("");
            }
        } finally {
            setPending(false);
        }
    };

    useEffect(() => {
        if (retryCount === 0) {
            fetchProfile();
            setRetryCount(1);
        }
    }, []);

    if (pending) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-3">
                <h4>Connection Error</h4>
                <p>{error}</p>
                <button 
                    className="btn btn-primary" 
                    onClick={() => {
                        setError("");
                        setPending(true);
                        setRetryCount(0);
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