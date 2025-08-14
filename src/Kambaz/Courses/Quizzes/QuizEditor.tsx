import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Row, Col, Nav } from "react-bootstrap";
import * as client from "./client";
import { addQuiz, updateQuiz, setQuiz } from "./reducer";
import type { RootState } from "../../store";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quiz = useSelector((state: RootState) => state.quizzesReducer.quiz); // Corrected type usage

    const isNewQuiz = qid === "new";

    const fetchQuiz = async () => {
        if (!isNewQuiz && qid) {
            const fetchedQuiz = await client.findQuizById(qid);
            dispatch(setQuiz(fetchedQuiz));
        } else {
            dispatch(setQuiz({
                title: "New Quiz", points: 0, description: "New Quiz Description",
                published: false, quizType: "Graded Quiz", assignmentGroup: "Quizzes",
                shuffleAnswers: true, timeLimit: 20, multipleAttempts: false, howManyAttempts: 1,
                showCorrectAnswers: "Immediately", accessCode: "", oneQuestionAtATime: true,
                webcamRequired: false, lockQuestionsAfterAnswering: false,
                dueDate: new Date().toISOString().slice(0, 16),
                availableDate: new Date().toISOString().slice(0, 16),
                untilDate: new Date().toISOString().slice(0, 16),
                questions: []
            }));
        }
    };

    const handleSave = async (publish: boolean) => {
        const quizToSave = { ...quiz, published: publish };

        if (isNewQuiz) {
            const newQuiz = await client.createQuiz(cid!, quizToSave);
            dispatch(addQuiz(newQuiz));
        } else {
            await client.updateQuiz(quizToSave);
            dispatch(updateQuiz(quizToSave));
        }
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue: any = value;
        if (type === 'checkbox') {
            finalValue = (e.target as HTMLInputElement).checked;
        }
        if (type === 'number') {
            finalValue = Number(value);
        }
        dispatch(setQuiz({ ...quiz, [name]: finalValue }));
    };

    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };
    
    // Convert date-time local string to the format API expects if needed, or ensure component state is correct
    const formatDateForInput = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        // This format works for datetime-local input
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    };


    return (
        <div id="wd-quiz-editor">
             <Nav variant="tabs" defaultActiveKey="details" className="mb-3">
                <Nav.Item>
                    <Nav.Link eventKey="details">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="questions" disabled>Questions</Nav.Link>
                </Nav.Item>
            </Nav>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="title" value={quiz.title} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quiz Instructions</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={quiz.description} onChange={handleInputChange} />
                </Form.Group>
                
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Quiz Type</Form.Label>
                            <Form.Select name="quizType" value={quiz.quizType} onChange={handleInputChange}>
                                <option>Graded Quiz</option>
                                <option>Practice Quiz</option>
                                <option>Graded Survey</option>
                                <option>Ungraded Survey</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Assignment Group</Form.Label>
                            <Form.Select name="assignmentGroup" value={quiz.assignmentGroup} onChange={handleInputChange}>
                                <option>Quizzes</option>
                                <option>Exams</option>
                                <option>Assignments</option>
                                <option>Project</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                 <hr/>
                <h5>Options</h5>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Shuffle Answers" name="shuffleAnswers" checked={quiz.shuffleAnswers} onChange={handleInputChange} />
                </Form.Group>

                <Row className="mb-3 align-items-center">
                    <Col xs="auto">
                        <Form.Label>Time Limit</Form.Label>
                    </Col>
                     <Col xs="auto">
                        <Form.Control style={{width: "100px"}} type="number" name="timeLimit" value={quiz.timeLimit} onChange={handleInputChange} />
                    </Col>
                     <Col>
                        <Form.Label>Minutes</Form.Label>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Allow Multiple Attempts" name="multipleAttempts" checked={quiz.multipleAttempts} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                     <Form.Check type="checkbox" label="One Question at a Time" name="oneQuestionAtATime" checked={quiz.oneQuestionAtATime} onChange={handleInputChange} />
                </Form.Group>

                <hr />
                <h5>Assign</h5>
                <div className="border p-3 rounded">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}><b>Assign to</b></Form.Label>
                        <Col sm={10}><Form.Control type="text" defaultValue="Everyone" readOnly /></Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}><b>Due</b></Form.Label>
                        <Col sm={10}><Form.Control type="datetime-local" name="dueDate" value={formatDateForInput(quiz.dueDate)} onChange={handleInputChange} /></Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Label><b>Available from</b></Form.Label>
                            <Form.Control type="datetime-local" name="availableDate" value={formatDateForInput(quiz.availableDate)} onChange={handleInputChange} />
                        </Col>
                        <Col>
                            <Form.Label><b>Until</b></Form.Label>
                            <Form.Control type="datetime-local" name="untilDate" value={formatDateForInput(quiz.untilDate)} onChange={handleInputChange} />
                        </Col>
                    </Row>
                </div>
            </Form>
            <hr />
            <div className="d-flex justify-content-end mb-4">
                <Button variant="light" className="me-2" onClick={handleCancel}>Cancel</Button>
                <Button variant="secondary" className="me-2" onClick={() => handleSave(true)}>Save & Publish</Button>
                <Button variant="danger" onClick={() => handleSave(false)}>Save</Button>
            </div>
        </div>
    );
}