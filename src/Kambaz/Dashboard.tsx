import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    enrollCourse,
    unenrollCourse,
    toggleViewAllCourses,
} from "./enrollmentReducer";
import { useEffect } from "react";
import { setEnrollments } from "./enrollmentReducer";
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
        try {
            const enrollments = await userClient.findCoursesForEnrolledUser(
                currentUser._id
            );
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error("Failed to fetch enrollments", error);
        }
    };
    const isEnrolled = (courseId: string) =>
        enrollments.some((e: any) => e._id === courseId);
    const isFaculty = () => currentUser?.role === "FACULTY";
    const enrollCourseHandler = async (courseId: string) => {
        await coursesClient.enrollUserInCourse(currentUser._id, courseId);
        dispatch(
            enrollCourse({
                userId: currentUser._id,
                courseId: courseId,
            })
        );
    };
    const unenrollCourseHandler = async (courseId: string) => {
        await coursesClient.unenrollUserFromCourse(currentUser._id, courseId);
        dispatch(
            unenrollCourse({
                userId: currentUser._id,
                courseId: courseId,
            })
        );
    };

    useEffect(() => {
        fetchEnrollments();
    }, [enrollments]);

    return (
        <div id="wd-dashboard">
            <div className="d-flex align-items-center justify-content-between">
                <h1 id="wd-dashboard-title">Dashboard {currentUser?.username}</h1>
                <button
                    className="btn btn-primary float-end"
                    id="wd-toggle-all-courses"
                    onClick={() => dispatch(toggleViewAllCourses())}
                >
                    Enrollments
                </button>
            </div>
            <hr />
            {isFaculty() && (
                <>
                    <h5>
                        New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addCourse}
                        >
                            Add
                        </button>
                        <button
                            className="btn btn-warning float-end me-2"
                            onClick={updateCourse}
                            id="wd-update-course-click"
                        >
                            Update
                        </button>
                    </h5>
                    <br />
                    <Form.Control
                        value={course.name}
                        className="mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <Form.Control
                        as="textarea"
                        value={course.description}
                        rows={3}
                        onChange={(e) =>
                            setCourse({ ...course, description: e.target.value })
                        }
                    />
                    <hr />
                </>
            )}

            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses
                        .filter((course) =>
                            showAllCourses
                                ? true
                                : enrollments.some((e: any) => e._id === course._id)
                        )
                        .map((course: any) => (
                            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                                <Card>
                                    <Link
                                        to={`/Kambaz/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                    >
                                        <div className="position-relative d-inline-block">
                                            <Card.Img
                                                src="/images/reactjs.jpg"
                                                variant="top"
                                                width="100%"
                                                height={160}
                                            />
                                            <button
                                                className={`btn ${isEnrolled(course._id) ? "btn-danger" : "btn-success"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (isEnrolled(course._id)) {
                                                        unenrollCourseHandler(course._id);
                                                    } else {
                                                        enrollCourseHandler(course._id);
                                                    }
                                                }}
                                                style={{
                                                    position: "absolute",
                                                    top: "8px",
                                                    left: "8px",
                                                    zIndex: 1,
                                                }}
                                            >
                                                {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                                            </button>
                                        </div>
                                        <Card.Body className="card-body">
                                            <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                                {course.name}
                                            </Card.Title>

                                            <Card.Text
                                                className="wd-dashboard-course-description overflow-hidden"
                                                style={{ height: "100px" }}
                                            >
                                                {course.description}
                                            </Card.Text>
                                            <Button variant="primary"> Go </Button>
                                            {isFaculty() && (
                                                <>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteCourse(course._id);
                                                        }}
                                                        className="btn btn-danger float-end"
                                                        id="wd-delete-course-click"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                        className="btn btn-warning me-2 float-end"
                                                    >
                                                        Edit
                                                    </button>
                                                </>
                                            )}
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
}