import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCourse, deleteCourse, updateCourse, setCourse } from "./Courses/reducer";
import { enrollCourse, unenrollCourse } from "./Courses/enrollmentsReducer";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
    const { courses, course } = useSelector((state: any) => state.coursesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const dispatch = useDispatch();
    const [showAllCourses, setShowAllCourses] = useState(false);

    const handleEnroll = (e: any, courseId: string) => {
        e.preventDefault();
        dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    };

    const handleUnenroll = (e: any, courseId: string) => {
        e.preventDefault();
        dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    };

    const isEnrolled = (courseId: string) => {
        return enrollments.some((e: any) => e.course === courseId && e.user === currentUser._id);
    };

    const displayedCourses = showAllCourses ? courses : courses.filter((c: any) => isEnrolled(c._id));

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            {currentUser.role === "FACULTY" && (
                <div className="mb-4">
                    <h5>New Course</h5>
                    <input value={course.name} className="form-control mb-2" placeholder="Course Name"
                           onChange={(e) => dispatch(setCourse({ ...course, name: e.target.value }))} />
                    <textarea value={course.description} className="form-control mb-2" placeholder="Course Description"
                              onChange={(e) => dispatch(setCourse({ ...course, description: e.target.value }))} />
                    <Button onClick={() => dispatch(addCourse({ ...course, _id: uuidv4() }))} id="wd-add-new-course-click" className="btn btn-primary me-2">Add</Button>
                    <Button onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click" className="btn btn-warning">Update</Button>
                    <hr />
                </div>
            )}

            <Button onClick={() => setShowAllCourses(!showAllCourses)} className="btn btn-primary float-end" style={{width: "200px"}}>
                {showAllCourses ? "Show Enrolled" : "Show All Courses"}
            </Button>
            <h2 id="wd-dashboard-published">{showAllCourses ? "All Courses" : "Enrolled Courses"} ({displayedCourses.length})</h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {displayedCourses.map((c: any) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }} key={c._id}>
                            <Card>
                                <Link to={`/Kambaz/Courses/${c._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <Card.Img src={`/images/${c._id}.jpg`} variant="top" width="100%" height={160} onError={(e: any) => e.target.src = '/images/default.jpg'}/>
                                    <Card.Body className="card-body">
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">{c.name}</Card.Title>
                                        <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "50px" }}>{c.description}</Card.Text>
                                        <Button variant="primary">Go</Button>
                                    </Card.Body>
                                </Link>
                                <Card.Footer>
                                    {currentUser.role === "FACULTY" && (
                                        <>
                                            <Button onClick={(e) => { e.preventDefault(); dispatch(setCourse(c)); }} className="btn btn-warning me-2" id="wd-edit-course-click">Edit</Button>
                                            <Button onClick={(e) => { e.preventDefault(); dispatch(deleteCourse(c._id)); }} className="btn btn-danger" id="wd-delete-course-click">Delete</Button>
                                        </>
                                    )}
                                    {isEnrolled(c._id)
                                        ? <Button variant="danger" className="float-end" onClick={(e) => handleUnenroll(e, c._id)}>Unenroll</Button>
                                        : <Button variant="success" className="float-end" onClick={(e) => handleEnroll(e, c._id)}>Enroll</Button>
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