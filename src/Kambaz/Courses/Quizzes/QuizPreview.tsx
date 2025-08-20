import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Form, ProgressBar, Alert } from "react-bootstrap";
import * as client from "./client";

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuiz();
    }, [qid]);

    const loadQuiz = async () => {
        try {
            setLoading(true);
            const quizData = await client.findQuizById(qid!);
            setQuiz(quizData);
        } catch (error) {
            console.error("Error loading quiz:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId: string, answer: any) => {
        if (quiz.lockQuestionsAfterAnswering && answers[questionId]) {
            return;
        }
        
        setAnswers((prev: any) => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let totalScore = 0;
        quiz.questions.forEach((question: any) => {
            const userAnswer = answers[question._id];
            let isCorrect = false;

            switch (question.type) {
                case "MULTIPLE_CHOICE":
                    const correctChoice = question.choices.find((c: any) => c.isCorrect);
                    isCorrect = correctChoice && correctChoice._id === userAnswer;
                    break;
                case "TRUE_FALSE":
                    isCorrect = question.trueFalseAnswer === userAnswer;
                    break;
                case "FILL_BLANK":
                    if (question.blanks && question.blanks.length > 0) {
                        isCorrect = question.blanks.some((blank: string) => 
                            blank.toLowerCase() === (userAnswer || "").toLowerCase()
                        );
                    }
                    break;
            }

            if (isCorrect) {
                totalScore += question.points || 0;
            }
        });
        return totalScore;
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setSubmitted(true);
    };

    const renderQuestion = (question: any) => {
        const answer = answers[question._id];
        const isLocked = quiz.lockQuestionsAfterAnswering && answer !== undefined;

        switch (question.type) {
            case "MULTIPLE_CHOICE":
                return (
                    <div>
                        <h5>{question.question}</h5>
                        {question.choices.map((choice: any) => (
                            <Form.Check
                                key={choice._id}
                                type="radio"
                                name={`question-${question._id}`}
                                label={choice.text}
                                checked={answer === choice._id}
                                onChange={() => handleAnswerChange(question._id, choice._id)}
                                disabled={isLocked || submitted}
                                className="mb-2"
                            />
                        ))}
                    </div>
                );

            case "TRUE_FALSE":
                return (
                    <div>
                        <h5>{question.question}</h5>
                        <Form.Check
                            type="radio"
                            name={`question-${question._id}`}
                            label="True"
                            checked={answer === true}
                            onChange={() => handleAnswerChange(question._id, true)}
                            disabled={isLocked || submitted}
                            className="mb-2"
                        />
                        <Form.Check
                            type="radio"
                            name={`question-${question._id}`}
                            label="False"
                            checked={answer === false}
                            onChange={() => handleAnswerChange(question._id, false)}
                            disabled={isLocked || submitted}
                        />
                    </div>
                );

            case "FILL_BLANK":
                return (
                    <div>
                        <h5>{question.question}</h5>
                        <Form.Control
                            type="text"
                            value={answer || ""}
                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                            disabled={isLocked || submitted}
                            placeholder="Enter your answer"
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    const renderResults = () => {
        return (
            <div>
                <Alert variant="info">
                    <h4>Preview Score: {score} / {quiz.points} ({Math.round((score / quiz.points) * 100)}%)</h4>
                    <p className="mb-0">This is a preview only. Your answers were not saved.</p>
                </Alert>

                {quiz.questions.map((question: any, index: number) => {
                    const userAnswer = answers[question._id];
                    let isCorrect = false;
                    let correctAnswer: any = null;

                    switch (question.type) {
                        case "MULTIPLE_CHOICE":
                            const correctChoice = question.choices.find((c: any) => c.isCorrect);
                            isCorrect = correctChoice && correctChoice._id === userAnswer;
                            correctAnswer = correctChoice?.text;
                            break;
                        case "TRUE_FALSE":
                            isCorrect = question.trueFalseAnswer === userAnswer;
                            correctAnswer = question.trueFalseAnswer ? "True" : "False";
                            break;
                        case "FILL_BLANK":
                            if (question.blanks && question.blanks.length > 0) {
                                isCorrect = question.blanks.some((blank: string) => 
                                    blank.toLowerCase() === (userAnswer || "").toLowerCase()
                                );
                                correctAnswer = question.blanks.join(", ");
                            }
                            break;
                    }

                    return (
                        <Card key={question._id} className={`mb-3 ${isCorrect ? 'border-success' : 'border-danger'}`}>
                            <Card.Body>
                                <h6>Question {index + 1}: {question.title}</h6>
                                <p>{question.question}</p>
                                <p>Your Answer: <strong>{
                                    question.type === "MULTIPLE_CHOICE" 
                                        ? question.choices.find((c: any) => c._id === userAnswer)?.text || "No answer"
                                        : question.type === "TRUE_FALSE"
                                        ? userAnswer !== undefined ? (userAnswer ? "True" : "False") : "No answer"
                                        : userAnswer || "No answer"
                                }</strong></p>
                                {!isCorrect && <p className="text-danger">Correct Answer: {correctAnswer}</p>}
                                <p className={isCorrect ? "text-success" : "text-danger"}>
                                    {isCorrect ? `✓ Correct (+${question.points} points)` : `✗ Incorrect (0 points)`}
                                </p>
                            </Card.Body>
                        </Card>
                    );
                })}

                <div className="mt-4 d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                    <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}>
                        <Button variant="primary">Edit Quiz</Button>
                    </Link>
                </div>
            </div>
        );
    };

    if (loading || !quiz) {
        return <div className="p-4">Loading quiz preview...</div>;
    }

    if (submitted) {
        return (
            <div className="container p-4">
                <h2>{quiz.title} - Preview Results</h2>
                {renderResults()}
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / quiz.questions.length) * 100;

    return (
        <div className="container p-4">
            <Alert variant="warning">
                <strong>Preview Mode:</strong> This is a preview of the quiz. Your answers will not be saved.
            </Alert>

            <Card>
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>{quiz.title}</h3>
                        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}>
                            <Button variant="outline-primary" size="sm">Edit Quiz</Button>
                        </Link>
                    </div>
                    <ProgressBar 
                        now={progress} 
                        label={`${answeredCount}/${quiz.questions.length} Answered`}
                        className="mt-2"
                    />
                </Card.Header>

                <Card.Body>
                    {quiz.questions.length === 0 ? (
                        <div className="text-center p-5">
                            <h5>No questions in this quiz</h5>
                            <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}>
                                <Button variant="primary">Add Questions</Button>
                            </Link>
                        </div>
                    ) : quiz.oneQuestionAtATime ? (
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
                                    disabled={currentQuestionIndex === 0}
                                >
                                    Previous
                                </Button>
                                {currentQuestionIndex === quiz.questions.length - 1 ? (
                                    <Button variant="danger" onClick={handleSubmit}>
                                        Submit Preview
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
                                <Button variant="danger" size="lg" onClick={handleSubmit}>
                                    Submit Preview
                                </Button>
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}