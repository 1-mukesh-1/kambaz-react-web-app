import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Dashboard({
    courses,
    course,
    setCourse,
    addCourse,
    deleteCourse,
    updateCourse,
    enrolling,
    setEnrolling,
    updateEnrollment,
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = () => currentUser?.role === "FACULTY";

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">
                Dashboard
                <Button
                    onClick={() => setEnrolling(!enrolling)}
                    className="float-end btn btn-primary"
                    style={{ width: "200px" }}
                >
                    {enrolling ? "My Courses" : "All Courses"}
                </Button>
            </h1>
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

            <h2 id="wd-dashboard-published">{enrolling ? "All Courses" : "My Courses"} ({courses.length})</h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={4} className="g-4">
                    {courses.map((c: any) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }} key={c._id}>
                            <Card>
                                <Link
                                    to={`/Kambaz/Courses/${c._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <Card.Img
                                        src={`/images/${c._id}.jpg`}
                                        variant="top"
                                        width="100%"
                                        height={160}
                                        onError={(e: any) => e.target.src = '/images/default.jpg'}
                                    />
                                    <Card.Body>
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {enrolling && (
                                                <Button
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        updateEnrollment(c._id, !c.enrolled);
                                                    }}
                                                    variant={c.enrolled ? "danger" : "success"}
                                                    className="float-end"
                                                >
                                                    {c.enrolled ? "Unenroll" : "Enroll"}
                                                </Button>
                                            )}
                                            {c.name}
                                        </Card.Title>
                                        <Card.Text
                                            className="wd-dashboard-course-description overflow-hidden"
                                            style={{ height: "50px" }}
                                        >
                                            {c.description}
                                        </Card.Text>
                                        <Button variant="primary">Go</Button>
                                    </Card.Body>
                                </Link>
                                {isFaculty() && (
                                    <Card.Footer>
                                        <Button
                                            onClick={() => setCourse(c)}
                                            className="btn btn-warning me-2"
                                            id="wd-edit-course-click"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => deleteCourse(c._id)}
                                            className="btn btn-danger"
                                            id="wd-delete-course-click"
                                        >
                                            Delete
                                        </Button>
                                    </Card.Footer>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}