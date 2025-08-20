import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Alert, Badge } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as client from "./client";

export default function ReviewQuiz() {
    const { cid, qid, attemptId } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [quiz, setQuiz] = useState<any>(null);
    const [attempt, setAttempt] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const isFaculty = currentUser?.role === "FACULTY";

    useEffect(() => {
        loadQuizAndAttempt();
    }, [qid, attemptId]);

    const loadQuizAndAttempt = async () => {
        try {
            setLoading(true);
            const [quizData, attemptData] = await Promise.all([
                client.findQuizById(qid!),
                client.getAttemptById(attemptId!)
            ]);

            setQuiz(quizData);
            setAttempt(attemptData);
        } catch (error) {
            console.error("Error loading quiz review:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAnswer = (questionId: string) => {
        return attempt?.answers?.find((a: any) => a.questionId === questionId);
    };

    const renderQuestionReview = (question: any, index: number) => {
        const userAnswer = getAnswer(question._id);
        const isCorrect = userAnswer?.isCorrect || false;
        const earnedPoints = userAnswer?.points || 0;

        return (
            <Card key={question._id} className="mb-3">
                <Card.Header className={isCorrect ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Question {index + 1}</strong>
                            {isCorrect ? (
                                <FaCheckCircle className="ms-2 text-success" />
                            ) : (
                                <FaTimesCircle className="ms-2 text-danger" />
                            )}
                        </div>
                        <Badge bg={isCorrect ? "success" : "danger"}>
                            {earnedPoints} / {question.points} points
                        </Badge>
                    </div>
                </Card.Header>
                <Card.Body>
                    <h5>{question.question}</h5>

                    {question.type === "MULTIPLE_CHOICE" && (
                        <div className="mt-3">
                            {question.choices?.map((choice: any) => {
                                const isUserChoice = userAnswer?.answer === choice._id;
                                const isCorrectChoice = choice.isCorrect;
                                
                                return (
                                    <div 
                                        key={choice._id} 
                                        className={`p-2 mb-2 rounded ${
                                            isUserChoice && isCorrectChoice ? "bg-success bg-opacity-10 border border-success" :
                                            isUserChoice && !isCorrectChoice ? "bg-danger bg-opacity-10 border border-danger" :
                                            !isUserChoice && isCorrectChoice && quiz.showCorrectAnswers ? "bg-success bg-opacity-10" :
                                            ""
                                        }`}
                                    >
                                        {isUserChoice && (
                                            <span className="me-2">
                                                {isCorrectChoice ? "✓" : "✗"}
                                            </span>
                                        )}
                                        {choice.text}
                                        {!isUserChoice && isCorrectChoice && quiz.showCorrectAnswers && (
                                            <span className="ms-2 text-success">(Correct Answer)</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {question.type === "TRUE_FALSE" && (
                        <div className="mt-3">
                            <p>
                                Your Answer: <strong>{userAnswer?.answer ? "True" : "False"}</strong>
                                {!isCorrect && quiz.showCorrectAnswers && (
                                    <span className="ms-3 text-success">
                                        Correct Answer: <strong>{question.trueFalseAnswer ? "True" : "False"}</strong>
                                    </span>
                                )}
                            </p>
                        </div>
                    )}

                    {question.type === "FILL_BLANK" && (
                        <div className="mt-3">
                            <p>
                                Your Answer: <strong>{userAnswer?.answer || "(No answer)"}</strong>
                            </p>
                            {!isCorrect && quiz.showCorrectAnswers && question.blanks && (
                                <p className="text-success">
                                    Acceptable Answers: {question.blanks.join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </Card.Body>
            </Card>
        );
    };

    if (loading || !quiz || !attempt) {
        return <div className="p-4">Loading quiz review...</div>;
    }

    const percentage = Math.round((attempt.score / attempt.totalPoints) * 100);

    return (
        <div className="container p-4">
            <div className="mb-4">
                <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
                    ← Back to Quiz Details
                </Link>
            </div>

            <h2>{quiz.title} - Review</h2>

            <Alert variant={percentage >= 70 ? "success" : percentage >= 50 ? "warning" : "danger"}>
                <h4>Your Score: {attempt.score} / {attempt.totalPoints} ({percentage}%)</h4>
                <p className="mb-0">
                    Attempt #{attempt.attemptNumber} • 
                    Submitted: {new Date(attempt.submittedAt).toLocaleString()} • 
                    Time Spent: {attempt.timeSpent} minutes
                </p>
            </Alert>

            {(!quiz.showCorrectAnswers && !isFaculty) && (
                <Alert variant="info">
                    Correct answers are not shown for this quiz.
                </Alert>
            )}

            <div>
                {quiz.questions.map((question: any, index: number) => 
                    renderQuestionReview(question, index)
                )}
            </div>
        </div>
    );
}