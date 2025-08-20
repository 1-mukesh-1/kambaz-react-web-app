import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Alert } from "react-bootstrap";
import * as client from "./client";
import { setCurrentQuiz, setCurrentAttempt } from "./reducer";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { currentQuiz } = useSelector((state: any) => state.quizzesReducer);
    const [loading, setLoading] = useState(true);
    const [attempts, setAttempts] = useState<any[]>([]);
    const [canTakeQuiz, setCanTakeQuiz] = useState(false);

    const isFaculty = currentUser?.role === "FACULTY";
    const isStudent = currentUser?.role === "STUDENT";

    useEffect(() => {
        fetchQuizDetails();
    }, [qid]);

    const fetchQuizDetails = async () => {
        if (!qid) return;
        
        try {
            setLoading(true);
            const quiz = await client.findQuizById(qid);
            dispatch(setCurrentQuiz(quiz));

            if (isStudent) {
                try {
                    const userAttempts = await client.getAttempts(qid);
                    setAttempts(userAttempts || []);
                    
                    const attemptCount = userAttempts?.length || 0;
                    const hasInProgressAttempt = userAttempts?.some((a: any) => a.status === "IN_PROGRESS") || false;
                    
                    if (hasInProgressAttempt) {
                        setCanTakeQuiz(true);
                    } else if (!quiz.multipleAttempts && attemptCount === 0) {
                        setCanTakeQuiz(true);
                    } else if (quiz.multipleAttempts && attemptCount < (quiz.howManyAttempts || 1)) {
                        setCanTakeQuiz(true);
                    } else {
                        setCanTakeQuiz(false);
                    }
                } catch (error) {
                    console.error("Error fetching attempts:", error);
                    setAttempts([]);
                    setCanTakeQuiz(true);
                }
            }
        } catch (error) {
            console.error("Error fetching quiz details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartQuiz = async () => {
        try {
            const existingInProgress = attempts.find(a => a.status === "IN_PROGRESS");
            
            if (existingInProgress) {
                dispatch(setCurrentAttempt(existingInProgress));
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt/${existingInProgress._id}`);
            } else {
                const attempt = await client.createAttempt(qid!);
                dispatch(setCurrentAttempt(attempt));
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt/${attempt._id}`);
            }
        } catch (error: any) {
            alert(error.response?.data?.error || "Failed to start quiz. Please try again.");
        }
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "Not set";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const isQuizAvailable = () => {
        if (!currentQuiz) return false;
        
        const now = new Date();
        const available = currentQuiz.availableDate ? new Date(currentQuiz.availableDate) : null;
        const until = currentQuiz.untilDate ? new Date(currentQuiz.untilDate) : null;

        if (available && now < available) {
            return false;
        }
        if (until && now > until) {
            return false;
        }
        
        return true;
    };

    const getAvailabilityMessage = () => {
        if (!currentQuiz) return "";
        
        const now = new Date();
        const available = currentQuiz.availableDate ? new Date(currentQuiz.availableDate) : null;
        const until = currentQuiz.untilDate ? new Date(currentQuiz.untilDate) : null;

        if (available && now < available) {
            return `This quiz will be available on ${formatDate(currentQuiz.availableDate)}`;
        }
        if (until && now > until) {
            return "This quiz is no longer available (past due date)";
        }
        
        return "";
    };

    if (loading || !currentQuiz) {
        return <div className="p-4">Loading quiz details...</div>;
    }

    if (isStudent && !currentQuiz.published) {
        return (
            <div className="container-fluid p-4">
                <Alert variant="warning">
                    This quiz is not available yet.
                </Alert>
                <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                    ← Back to Quizzes
                </Link>
            </div>
        );
    }

    return (
        <div id="wd-quiz-details" className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{currentQuiz.title}</h2>
                <div>
                    {isFaculty && (
                        <>
                            <Link 
                                to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`}
                                className="btn btn-secondary me-2"
                            >
                                Preview
                            </Link>
                            <Link 
                                to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                        </>
                    )}
                    {isStudent && (
                        <>
                            {!isQuizAvailable() && (
                                <Alert variant="info" className="mb-0">
                                    {getAvailabilityMessage()}
                                </Alert>
                            )}
                            {isQuizAvailable() && canTakeQuiz && (
                                <Button 
                                    variant="danger"
                                    onClick={handleStartQuiz}
                                    size="lg"
                                >
                                    {attempts.some((a: any) => a.status === "IN_PROGRESS") 
                                        ? "Resume Quiz" 
                                        : "Start Quiz"}
                                </Button>
                            )}
                            {isQuizAvailable() && !canTakeQuiz && attempts.length > 0 && (
                                <Alert variant="warning" className="mb-0">
                                    You have used all available attempts for this quiz.
                                </Alert>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Table striped bordered>
                <tbody>
                    <tr>
                        <td><strong>Quiz Type</strong></td>
                        <td>{currentQuiz.quizType.replace(/_/g, " ")}</td>
                    </tr>
                    <tr>
                        <td><strong>Points</strong></td>
                        <td>{currentQuiz.points}</td>
                    </tr>
                    <tr>
                        <td><strong>Assignment Group</strong></td>
                        <td>{currentQuiz.assignmentGroup}</td>
                    </tr>
                    <tr>
                        <td><strong>Shuffle Answers</strong></td>
                        <td>{currentQuiz.shuffleAnswers ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td><strong>Time Limit</strong></td>
                        <td>{currentQuiz.timeLimit} Minutes</td>
                    </tr>
                    <tr>
                        <td><strong>Multiple Attempts</strong></td>
                        <td>{currentQuiz.multipleAttempts ? "Yes" : "No"}</td>
                    </tr>
                    {currentQuiz.multipleAttempts && (
                        <tr>
                            <td><strong>Allowed Attempts</strong></td>
                            <td>{currentQuiz.howManyAttempts}</td>
                        </tr>
                    )}
                    {isFaculty && (
                        <>
                            <tr>
                                <td><strong>Show Correct Answers</strong></td>
                                <td>{currentQuiz.showCorrectAnswers ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td><strong>Access Code</strong></td>
                                <td>{currentQuiz.accessCode || "None"}</td>
                            </tr>
                            <tr>
                                <td><strong>One Question at a Time</strong></td>
                                <td>{currentQuiz.oneQuestionAtATime ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td><strong>Webcam Required</strong></td>
                                <td>{currentQuiz.webcamRequired ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td><strong>Lock Questions After Answering</strong></td>
                                <td>{currentQuiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td><strong>Published</strong></td>
                                <td>{currentQuiz.published ? "Yes" : "No"}</td>
                            </tr>
                        </>
                    )}
                    <tr>
                        <td><strong>Due</strong></td>
                        <td>{formatDate(currentQuiz.dueDate)}</td>
                    </tr>
                    <tr>
                        <td><strong>Available from</strong></td>
                        <td>{formatDate(currentQuiz.availableDate)}</td>
                    </tr>
                    <tr>
                        <td><strong>Until</strong></td>
                        <td>{formatDate(currentQuiz.untilDate)}</td>
                    </tr>
                </tbody>
            </Table>

            {isStudent && attempts.length > 0 && (
                <div className="mt-4">
                    <h3>Your Attempts</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Attempt</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th>Submitted At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attempts.map((attempt: any) => (
                                <tr key={attempt._id}>
                                    <td>{attempt.attemptNumber}</td>
                                    <td>
                                        {attempt.status === "SUBMITTED" 
                                            ? `${attempt.score}/${attempt.totalPoints}` 
                                            : "-"}
                                    </td>
                                    <td>{attempt.status}</td>
                                    <td>{attempt.submittedAt ? formatDate(attempt.submittedAt) : "-"}</td>
                                    <td>
                                        {attempt.status === "SUBMITTED" ? (
                                            <Link 
                                                to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/review/${attempt._id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Review
                                            </Link>
                                        ) : (
                                            <Button 
                                                size="sm"
                                                variant="warning"
                                                onClick={() => {
                                                    dispatch(setCurrentAttempt(attempt));
                                                    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt/${attempt._id}`);
                                                }}
                                            >
                                                Continue
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}