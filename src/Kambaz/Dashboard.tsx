import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    enrollCourse,
    unenrollCourse,
    toggleViewAllCourses,
} from "./reducer";
import { useEffect } from "react";
import { setEnrollments } from "./reducer";
import * as coursesClient from "./Courses/client";
import * as userClient from "./Account/client";
import type { RootState } from "./store";

export default function Dashboard({
    courses,
    course,
    setCourse,
    addCourse,
    deleteCourse,
    updateCourse,
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
}) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
    const showAllCourses = useSelector(
        (state: RootState) => state.enrollmentReducer.showAllCourses
    );

    const fetchEnrollments = async () => {
        if (!currentUser?._id) return;
        
        try {
            console.log("Fetching enrollments for user:", currentUser._id);
            const enrollments = await userClient.findCoursesForEnrolledUser(
                currentUser._id
            );
            console.log("Fetched enrollments:", enrollments);
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error("Failed to fetch enrollments", error);
        }
    };

    const isEnrolled = (courseId: string) => {
        const enrolled = enrollments.some((e: any) => e._id === courseId);
        console.log(`Course ${courseId} enrolled:`, enrolled);
        return enrolled;
    };

    const isFaculty = () => currentUser?.role === "FACULTY";

    const enrollCourseHandler = async (courseId: string) => {
        try {
            console.log("Enrolling in course:", courseId);
            await coursesClient.enrollUserInCourse(currentUser._id, courseId);
            
            dispatch(
                enrollCourse({
                    userId: currentUser._id,
                    courseId: courseId,
                })
            );
            
            await fetchEnrollments();
        } catch (error) {
            console.error("Failed to enroll in course:", error);
        }
    };

    const unenrollCourseHandler = async (courseId: string) => {
        try {
            console.log("Unenrolling from course:", courseId);
            await coursesClient.unenrollUserFromCourse(currentUser._id, courseId);
            
            dispatch(
                unenrollCourse({
                    userId: currentUser._id,
                    courseId: courseId,
                })
            );
            
            await fetchEnrollments();
        } catch (error) {
            console.error("Failed to unenroll from course:", error);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, [currentUser._id]);

    const displayedCourses = courses.filter((course) =>
        showAllCourses
            ? true
            : enrollments.some((e: any) => e._id === course._id)
    );

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            {isFaculty() && (
                <div className="mb-4">
                    <h5>New Course</h5>
                    <Form.Control
                        value={course.name}
                        className="form-control mb-2"
                        placeholder="Course Name"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <Form.Control
                        as="textarea"
                        value={course.description}
                        className="form-control mb-2"
                        placeholder="Course Description"
                        onChange={(e) =>
                            setCourse({ ...course, description: e.target.value })
                        }
                    />
                    <Button onClick={addCourse} id="wd-add-new-course-click" className="btn btn-primary me-2">Add</Button>
                    <Button onClick={updateCourse} id="wd-update-course-click" className="btn btn-warning">Update</Button>
                    <hr />
                </div>
            )}

            <Button
                onClick={() => dispatch(toggleViewAllCourses())}
                className="btn btn-primary float-end"
                style={{ width: "200px" }}
            >
                {showAllCourses ? "Show Enrolled" : "Show All Courses"}
            </Button>
            <h2 id="wd-dashboard-published">{showAllCourses ? "All Courses" : "Enrolled Courses"} ({displayedCourses.length})</h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {displayedCourses.map((course: any) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
                            <Card>
                                <Link
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <Card.Img
                                        src={`/images/${course._id}.jpg`}
                                        variant="top"
                                        width="100%"
                                        height={160}
                                        onError={(e: any) => e.target.src = '/images/default.jpg'}
                                    />
                                    <Card.Body className="card-body">
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {course.name}
                                        </Card.Title>
                                        <Card.Text
                                            className="wd-dashboard-course-description overflow-hidden"
                                            style={{ height: "50px" }}
                                        >
                                            {course.description}
                                        </Card.Text>
                                        <Button variant="primary">Go</Button>
                                    </Card.Body>
                                </Link>
                                <Card.Footer>
                                    {isFaculty() && (
                                        <>
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCourse(course);
                                                }}
                                                className="btn btn-warning me-2"
                                                id="wd-edit-course-click"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    deleteCourse(course._id);
                                                }}
                                                className="btn btn-danger"
                                                id="wd-delete-course-click"
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                    {isEnrolled(course._id)
                                        ? <Button
                                            variant="danger"
                                            className="float-end"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                unenrollCourseHandler(course._id);
                                            }}
                                        >
                                            Unenroll
                                        </Button>
                                        : <Button
                                            variant="success"
                                            className="float-end"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                enrollCourseHandler(course._id);
                                            }}
                                        >
                                            Enroll
                                        </Button>
                                    }
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}