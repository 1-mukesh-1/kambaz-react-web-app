import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as coursesClient from "../client";
import PeopleTable from "./Table";

export default function CoursePeople() {
    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);

    const fetchCourseUsers = async () => {
        if (cid) {
            try {
                const courseUsers = await coursesClient.findUsersForCourse(cid);
                setUsers(courseUsers);
            } catch (error) {
                console.error("Failed to fetch users for course:", error);
            }
        }
    };

    useEffect(() => {
        fetchCourseUsers();
    }, [cid]);

    return <PeopleTable users={users} />;
}