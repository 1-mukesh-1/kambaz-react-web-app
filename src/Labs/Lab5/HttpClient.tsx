import { useEffect, useState } from "react";
import * as client from "./client";
import axios from "axios";

export default function HttpClient() {
    const [welcomeOnClick, setWelcomeOnClick] = useState("");
    const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
    const fetchWelcomeOnClick = async () => {
        const message = await client.fetchWelcomeMessage();
        setWelcomeOnClick(message);
    };
    

    const fetchWelcomeOnLoad = async () => {
        try {
            setWelcomeOnLoad("Loading...");
            console.log("Starting to fetch welcome message...");
            
            const welcome = await client.fetchWelcomeMessage();
            console.log("Response received:", welcome);
            
            if (!welcome) {
                throw new Error("Empty response received");
            }
            
            setWelcomeOnLoad(welcome);
        } catch (error) {
            console.error("Full error object:", error);
            
            let errorMessage = "Unknown error occurred";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response 
                    ? `Server Error: ${error.response.status} - ${error.response.statusText}`
                    : `Network Error: ${error.message}`;
                console.error("Request config:", error.config);
            }
            
            setWelcomeOnLoad(`Error: ${errorMessage}`);
        }
    };


    useEffect(() => {
        fetchWelcomeOnLoad();
    }, []);

    return (
        <div>
            <h3>HTTP Client</h3>
            <h4>Requesting on Click</h4>
            <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
                Fetch Welcome
            </button>{" "}
            <br />
            Response from server: <b>{welcomeOnClick}</b>
            <hr />
            <h4>Requesting on Load</h4>
            Response from server: <b>{welcomeOnLoad}</b>
            <hr />
        </div>
    );
}
