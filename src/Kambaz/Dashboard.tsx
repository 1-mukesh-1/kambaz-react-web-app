import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS1234 React JS
                                    </Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Full Stack software developer
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/2345/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/nodejs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS2345 Node JS
                                    </Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Backend Development with JavaScript
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/3456/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/python.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS3456 Python Programming
                                    </Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Data Science and Machine Learning
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/4567/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/java.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS4567 Java Enterprise
                                    </Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Object-Oriented Programming & Spring Framework
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/5678/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/database.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS5678 Database Systems
                                    </Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        SQL, NoSQL, and Database Design
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/6789/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/angular.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS6789 Angular Framework
                                    </Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Modern Frontend Development
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/7890/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/cybersecurity.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS7890 Cybersecurity
                                    </Card.Title>
                                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                        Network Security and Ethical Hacking
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>

                {/* <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/2345/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/nodejs.jpg" width={200} />
                        <div>
                            <h5> CS2345 Node JS </h5>
                            <p className="wd-dashboard-course-title">
                                Backend Development with JavaScript </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/3456/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/python.jpg" width={200} />
                        <div>
                            <h5> CS3456 Python Programming </h5>
                            <p className="wd-dashboard-course-title">
                                Data Science and Machine Learning </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/4567/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/java.jpg" width={200} />
                        <div>
                            <h5> CS4567 Java Enterprise </h5>
                            <p className="wd-dashboard-course-title">
                                Object-Oriented Programming & Spring Framework </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5678/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/database.jpg" width={200} />
                        <div>
                            <h5> CS5678 Database Systems </h5>
                            <p className="wd-dashboard-course-title">
                                SQL, NoSQL, and Database Design </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/6789/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/angular.jpg" width={200} />
                        <div>
                            <h5> CS6789 Angular Framework </h5>
                            <p className="wd-dashboard-course-title">
                                Modern Frontend Development </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/7890/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/cybersecurity.jpg" width={200} />
                        <div>
                            <h5> CS7890 Cybersecurity </h5>
                            <p className="wd-dashboard-course-title">
                                Network Security and Ethical Hacking </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div> */}
            </div>
        </div>
    );
}

