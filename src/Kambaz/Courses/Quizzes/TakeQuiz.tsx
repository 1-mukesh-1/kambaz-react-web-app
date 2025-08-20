import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, Form, ProgressBar, Alert, Modal } from "react-bootstrap";
import * as client from "./client";

export default function TakeQuiz() {
    const { cid, qid, attemptId } = useParams();
    const navigate = useNavigate();
    useSelector((state: any) => state.accountReducer);
    const [quiz, setQuiz] = useState<any>(null);
    const [attempt, setAttempt] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
    const [accessCode, setAccessCode] = useState("");
    const [accessCodeError, setAccessCodeError] = useState("");

    useEffect(() => {
        loadQuizAndAttempt();
    }, [qid, attemptId]);

    useEffect(() => {
        if (timeRemaining === null || timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev === null || prev <= 1) {
                    handleSubmit(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    const loadQuizAndAttempt = async () => {
        try {
            setLoading(true);
            const [quizData, attemptData] = await Promise.all([
                client.findQuizById(qid!),
                client.getAttemptById(attemptId!)
            ]);

            if (quizData.accessCode && !attemptData.accessCodeVerified) {
                setQuiz(quizData);
                setAttempt(attemptData);
                setShowAccessCodeModal(true);
                setLoading(false);
                return;
            }

            setQuiz(quizData);
            setAttempt(attemptData);

            if (quizData.timeLimit) {
                const startTime = new Date(attemptData.startedAt).getTime();
                const now = new Date().getTime();
                const elapsed = Math.floor((now - startTime) / 1000);
                const totalTime = quizData.timeLimit * 60;
                const remaining = Math.max(0, totalTime - elapsed);
                setTimeRemaining(remaining);
            }

            if (attemptData.answers && attemptData.answers.length > 0) {
                const existingAnswers: any = {};
                attemptData.answers.forEach((ans: any) => {
                    existingAnswers[ans.questionId] = ans.answer;
                });
                setAnswers(existingAnswers);
            }
        } catch (error) {
            console.error("Error loading quiz:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccessCodeSubmit = async () => {
        if (accessCode !== quiz.accessCode) {
            setAccessCodeError("Incorrect access code");
            return;
        }

        setShowAccessCodeModal(false);
        setAccessCodeError("");
        
        if (quiz.timeLimit) {
            setTimeRemaining(quiz.timeLimit * 60);
        }
    };

    const handleAnswerChange = (questionId: string, answer: any) => {
        if (quiz.lockQuestionsAfterAnswering && answers[questionId] !== undefined) {
            return;
        }
        
        setAnswers((prev: any) => ({
            ...prev,
            [questionId]: answer
        }));

        saveAnswerToServer(questionId, answer);
    };

    const saveAnswerToServer = async (questionId: string, answer: any) => {
        try {
            await client.saveAnswer(attemptId!, questionId, answer);
        } catch (error) {
            console.error("Error saving answer:", error);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0 && !quiz.lockQuestionsAfterAnswering) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async (autoSubmit = false) => {
        if (!autoSubmit && !window.confirm("Are you sure you want to submit the quiz? You cannot change your answers after submission.")) {
            return;
        }

        try {            
            if (autoSubmit) {
                alert("Time's up! Your quiz has been automatically submitted.");
            }
            
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/review/${attemptId}`);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Failed to submit quiz. Please try again.");
        }
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const renderQuestion = (question: any) => {
        const answer = answers[question._id];
        const isLocked = quiz.lockQuestionsAfterAnswering && answer !== undefined;

        switch (question.type) {
            case "MULTIPLE_CHOICE":
                return (
                    <div>
                        <h5>{question.question}</h5>
                        {isLocked && (
                            <Alert variant="info" className="mb-2">
                                <small>This question is locked. You cannot change your answer.</small>
                            </Alert>
                        )}
                        {question.choices.map((choice: any) => (
                            <Form.Check
                                key={choice._id}
                                type="radio"
                                name={`question-${question._id}`}
                                label={choice.text}
                                checked={answer === choice._id}
                                onChange={() => handleAnswerChange(question._id, choice._id)}
                                disabled={isLocked}
                                className="mb-2"
                            />
                        ))}
                    </div>
                );

            case "TRUE_FALSE":
                return (
                    <div>
                        <h5>{question.question}</h5>
                        {isLocked && (
                            <Alert variant="info" className="mb-2">
                                <small>This question is locked. You cannot change your answer.</small>
                            </Alert>
                        )}
                        <Form.Check
                            type="radio"
                            name={`question-${question._id}`}
                            label="True"
                            checked={answer === true}
                            onChange={() => handleAnswerChange(question._id, true)}
                            disabled={isLocked}
                            className="mb-2"
                        />
                        <Form.Check
                            type="radio"
                            name={`question-${question._id}`}
                            label="False"
                            checked={answer === false}
                            onChange={() => handleAnswerChange(question._id, false)}
                            disabled={isLocked}
                        />
                    </div>
                );

            case "FILL_BLANK":
                return (
                    <div>
                        <h5>{question.question}</h5>
                        {isLocked && (
                            <Alert variant="info" className="mb-2">
                                <small>This question is locked. You cannot change your answer.</small>
                            </Alert>
                        )}
                        <Form.Control
                            type="text"
                            value={answer || ""}
                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                            disabled={isLocked}
                            placeholder="Enter your answer"
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    if (showAccessCodeModal) {
        return (
            <Modal show={true} centered>
                <Modal.Header>
                    <Modal.Title>Access Code Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This quiz requires an access code. Please enter it below:</p>
                    <Form.Control
                        type="text"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        placeholder="Enter access code"
                        isInvalid={!!accessCodeError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {accessCodeError}
                    </Form.Control.Feedback>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAccessCodeSubmit}>
                        Start Quiz
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    if (loading || !quiz || !attempt) {
        return <div className="p-4">Loading quiz...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / quiz.questions.length) * 100;

    return (
        <div className="container p-4">
            <Card>
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>{quiz.title}</h3>
                        {timeRemaining !== null && (
                            <Alert 
                                variant={timeRemaining < 300 ? "danger" : timeRemaining < 600 ? "warning" : "info"} 
                                className="mb-0"
                            >
                                Time Remaining: {formatTime(timeRemaining)}
                            </Alert>
                        )}
                    </div>
                    <ProgressBar 
                        now={progress} 
                        label={`${answeredCount}/${quiz.questions.length} Answered`}
                        className="mt-2"
                    />
                </Card.Header>

                <Card.Body>
                    {quiz.oneQuestionAtATime ? (
                        <div>
                            <div className="mb-3">
                                <strong>
                                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                    {' '}({currentQuestion.points} points)
                                </strong>
                            </div>
                            {renderQuestion(currentQuestion)}
                            <div className="mt-4 d-flex justify-content-between">
                                <Button
                                    variant="secondary"
                                    onClick={handlePreviousQuestion}
                                    disabled={currentQuestionIndex === 0 || quiz.lockQuestionsAfterAnswering}
                                >
                                    Previous
                                </Button>
                                {currentQuestionIndex === quiz.questions.length - 1 ? (
                                    <Button variant="danger" onClick={() => handleSubmit(false)}>
                                        Submit Quiz
                                    </Button>
                                ) : (
                                    <Button variant="primary" onClick={handleNextQuestion}>
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            {quiz.questions.map((question: any, index: number) => (
                                <Card key={question._id} className="mb-3">
                                    <Card.Body>
                                        <div className="mb-2">
                                            <strong>
                                                Question {index + 1} ({question.points} points)
                                            </strong>
                                        </div>
                                        {renderQuestion(question)}
                                    </Card.Body>
                                </Card>
                            ))}
                            <div className="mt-4 text-center">
                                <Button variant="danger" size="lg" onClick={() => handleSubmit(false)}>
                                    Submit Quiz
                                </Button>
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}