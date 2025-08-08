import { Container } from "react-bootstrap";
import EnvironmentVariables from "./EnvironmentVariables";
import HttpClient from "./HttpClient";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithStrings from "./Module";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import PathParameters from "./PathParameters";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function Lab5() {
    return (
        <Container>
            <h2>Lab 5</h2>
            <div className="list-group">
                <a href={`${REMOTE_SERVER}/lab5/welcome`} className="list-group-item">
                    Welcome
                </a>
            </div>
            <hr />
            <EnvironmentVariables />
            <PathParameters />
            <QueryParameters />
            <WorkingWithObjects />
            <WorkingWithStrings />
            <WorkingWithArrays />
            <HttpClient />
            <WorkingWithObjectsAsynchronously />
            <WorkingWithArraysAsynchronously />
        </Container>
    );
}
