import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Nav, Tab, Row, Col } from "react-bootstrap";
import * as client from "./client";
import { setCurrentQuiz, updateQuiz } from "./reducer";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentQuiz } = useSelector((state: any) => state.quizzesReducer);
    const [activeTab, setActiveTab] = useState("details");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        quizType: "GRADED_QUIZ",
        assignmentGroup: "QUIZZES",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableDate: "",
        untilDate: ""
    });

    useEffect(() => {
        if (qid) {
            fetchQuiz();
        }
    }, [qid]);

    const fetchQuiz = async () => {
        try {
            const quiz = await client.findQuizById(qid!);
            dispatch(setCurrentQuiz(quiz));
            setFormData({
                title: quiz.title || "",
                description: quiz.description || "",
                quizType: quiz.quizType || "GRADED_QUIZ",
                assignmentGroup: quiz.assignmentGroup || "QUIZZES",
                shuffleAnswers: quiz.shuffleAnswers !== undefined ? quiz.shuffleAnswers : true,
                timeLimit: quiz.timeLimit || 20,
                multipleAttempts: quiz.multipleAttempts || false,
                howManyAttempts: quiz.howManyAttempts || 1,
                showCorrectAnswers: quiz.showCorrectAnswers !== undefined ? quiz.showCorrectAnswers : true,
                accessCode: quiz.accessCode || "",
                oneQuestionAtATime: quiz.oneQuestionAtATime !== undefined ? quiz.oneQuestionAtATime : true,
                webcamRequired: quiz.webcamRequired || false,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
                dueDate: quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : "",
                availableDate: quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : "",
                untilDate: quiz.untilDate ? new Date(quiz.untilDate).toISOString().slice(0, 16) : ""
            });
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSave = async () => {
        try {
            const updatedQuiz = {
                ...currentQuiz,
                ...formData,
                course: cid
            };
            
            await client.updateQuiz(qid!, updatedQuiz);
            dispatch(updateQuiz(updatedQuiz));
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    const handleSaveAndPublish = async () => {
        try {
            const updatedQuiz = {
                ...currentQuiz,
                ...formData,
                published: true,
                course: cid
            };
            
            await client.updateQuiz(qid!, updatedQuiz);
            await client.publishQuiz(qid!, true);
            dispatch(updateQuiz(updatedQuiz));
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        } catch (error) {
            console.error("Error saving and publishing quiz:", error);
        }
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    return (
        <div id="wd-quiz-editor" className="container-fluid p-4">
            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")}>
                <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                        <Nav.Link eventKey="details">Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="questions">Questions</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="details">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Quiz Instructions</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Quiz Type</Form.Label>
                                        <Form.Select
                                            name="quizType"
                                            value={formData.quizType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="GRADED_QUIZ">Graded Quiz</option>
                                            <option value="PRACTICE_QUIZ">Practice Quiz</option>
                                            <option value="GRADED_SURVEY">Graded Survey</option>
                                            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Assignment Group</Form.Label>
                                        <Form.Select
                                            name="assignmentGroup"
                                            value={formData.assignmentGroup}
                                            onChange={handleInputChange}
                                        >
                                            <option value="QUIZZES">Quizzes</option>
                                            <option value="EXAMS">Exams</option>
                                            <option value="ASSIGNMENTS">Assignments</option>
                                            <option value="PROJECT">Project</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Time Limit (Minutes)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="timeLimit"
                                            value={formData.timeLimit}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Access Code (Optional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="accessCode"
                                            value={formData.accessCode}
                                            onChange={handleInputChange}
                                            placeholder="Leave blank for no access code"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Check
                                        className="mb-3"
                                        type="checkbox"
                                        name="shuffleAnswers"
                                        label="Shuffle Answers"
                                        checked={formData.shuffleAnswers}
                                        onChange={handleInputChange}
                                    />

                                    <Form.Check
                                        className="mb-3"
                                        type="checkbox"
                                        name="multipleAttempts"
                                        label="Allow Multiple Attempts"
                                        checked={formData.multipleAttempts}
                                        onChange={handleInputChange}
                                    />

                                    {formData.multipleAttempts && (
                                        <Form.Group className="mb-3 ms-4">
                                            <Form.Label>Number of Attempts</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="howManyAttempts"
                                                value={formData.howManyAttempts}
                                                onChange={handleInputChange}
                                                min="1"
                                            />
                                        </Form.Group>
                                    )}

                                    <Form.Check
                                        className="mb-3"
                                        type="checkbox"
                                        name="showCorrectAnswers"
                                        label="Show Correct Answers"
                                        checked={formData.showCorrectAnswers}
                                        onChange={handleInputChange}
                                    />
                                </Col>

                                <Col md={6}>
                                    <Form.Check
                                        className="mb-3"
                                        type="checkbox"
                                        name="oneQuestionAtATime"
                                        label="One Question at a Time"
                                        checked={formData.oneQuestionAtATime}
                                        onChange={handleInputChange}
                                    />

                                    <Form.Check
                                        className="mb-3"
                                        type="checkbox"
                                        name="webcamRequired"
                                        label="Webcam Required"
                                        checked={formData.webcamRequired}
                                        onChange={handleInputChange}
                                    />

                                    <Form.Check
                                        className="mb-3"
                                        type="checkbox"
                                        name="lockQuestionsAfterAnswering"
                                        label="Lock Questions After Answering"
                                        checked={formData.lockQuestionsAfterAnswering}
                                        onChange={handleInputChange}
                                    />
                                </Col>
                            </Row>

                            <hr />

                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            name="dueDate"
                                            value={formData.dueDate}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Available From</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            name="availableDate"
                                            value={formData.availableDate}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Available Until</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            name="untilDate"
                                            value={formData.untilDate}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Button variant="secondary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button variant="danger" onClick={handleSaveAndPublish}>
                                    Save and Publish
                                </Button>
                            </div>
                        </Form>
                    </Tab.Pane>

                    <Tab.Pane eventKey="questions">
                        <QuizQuestionsEditor />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
}