import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, Dropdown } from "react-bootstrap";
import { 
    FaPlus, FaCheckCircle, FaTimesCircle, FaEllipsisV, 
    FaEdit, FaTrash} from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import * as client from "./client";
import { setQuizzes, deleteQuiz as deleteQuizAction, publishQuiz } from "./reducer";

export default function Quizzes() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [loading, setLoading] = useState(true);
    
    const isFaculty = currentUser?.role === "FACULTY";
    const isStudent = currentUser?.role === "STUDENT";

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const courseQuizzes = await client.findQuizzesForCourse(cid!);
            const sortedQuizzes = courseQuizzes.sort((a: any, b: any) => {
                if (!a.availableDate && !b.availableDate) return 0;
                if (!a.availableDate) return 1;
                if (!b.availableDate) return -1;
                return new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime();
            });
            dispatch(setQuizzes(sortedQuizzes));
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cid) {
            fetchQuizzes();
        }
    }, [cid]);

    const handleCreateQuiz = async () => {
        const newQuiz = {
            title: `Quiz ${quizzes.length + 1}`,
            course: cid,
            description: "New quiz description",
            quizType: "GRADED_QUIZ",
            points: 0,
            assignmentGroup: "QUIZZES",
            shuffleAnswers: true,
            timeLimit: 20,
            multipleAttempts: false,
            howManyAttempts: 1,
            showCorrectAnswers: true,
            oneQuestionAtATime: true,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            published: false,
            questions: []
        };
        
        const created = await client.createQuiz(newQuiz);
        window.location.href = `#/Kambaz/Courses/${cid}/Quizzes/${created._id}`;
    };

    const handleDeleteQuiz = async (quizId: string) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            await client.deleteQuiz(quizId);
            dispatch(deleteQuizAction(quizId));
        }
    };

    const handlePublishToggle = async (quizId: string, currentStatus: boolean) => {
        await client.publishQuiz(quizId, !currentStatus);
        dispatch(publishQuiz({ quizId, published: !currentStatus }));
    };

    const getAvailabilityStatus = (quiz: any) => {
        const now = new Date();
        const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
        const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

        if (!availableDate && !untilDate) return "Available";
        
        if (availableDate && now < availableDate) {
            return `Not available until ${availableDate.toLocaleDateString()}`;
        }
        
        if (untilDate && now > untilDate) {
            return "Closed";
        }
        
        return "Available";
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "No due date";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (loading) {
        return <div className="p-4">Loading quizzes...</div>;
    }

    const sortedQuizzes = quizzes
        .filter((quiz: any) => quiz.course === cid)
        .filter((quiz: any) => isFaculty || quiz.published)
        .sort((a: any, b: any) => {
            if (!a.availableDate && !b.availableDate) return 0;
            if (!a.availableDate) return 1;
            if (!b.availableDate) return -1;
            return new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime();
        });

    return (
        <div id="wd-quizzes">
            {isFaculty && (
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search for Quiz"
                    />
                    <Button 
                        variant="danger"
                        onClick={handleCreateQuiz}
                    >
                        <FaPlus className="me-2" /> Quiz
                    </Button>
                </div>
            )}

            {sortedQuizzes.length === 0 ? (
                <div className="text-center p-5">
                    <h4>No quizzes available</h4>
                    {isFaculty && (
                        <p>Click the "+ Quiz" button to create your first quiz</p>
                    )}
                </div>
            ) : (
                <ListGroup className="rounded-0">
                    {sortedQuizzes.map((quiz: any) => (
                        <ListGroup.Item 
                            key={quiz._id} 
                            className="p-3 mb-2 border"
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="d-flex align-items-start">
                                    <BsGripVertical className="me-2 fs-3 text-muted" />
                                    <div>
                                        <Link 
                                            to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                                            className="text-decoration-none"
                                        >
                                            <h5 className="mb-1">{quiz.title}</h5>
                                        </Link>
                                        <div className="text-muted small">
                                            <span className="me-3">
                                                <strong>{getAvailabilityStatus(quiz)}</strong>
                                            </span>
                                            <span className="me-3">
                                                <strong>Due:</strong> {formatDate(quiz.dueDate)}
                                            </span>
                                            <span className="me-3">
                                                <strong>{quiz.points} pts</strong>
                                            </span>
                                            <span className="me-3">
                                                <strong>{quiz.questions?.length || 0} Questions</strong>
                                            </span>
                                            {isStudent && quiz.lastScore !== undefined && (
                                                <span>
                                                    <strong>Score:</strong> {quiz.lastScore}/{quiz.points}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    {isFaculty && (
                                        <>
                                            <Button
                                                variant="link"
                                                className="p-0 me-3"
                                                onClick={() => handlePublishToggle(quiz._id, quiz.published)}
                                            >
                                                {quiz.published ? (
                                                    <FaCheckCircle className="text-success fs-5" />
                                                ) : (
                                                    <FaTimesCircle className="text-danger fs-5" />
                                                )}
                                            </Button>
                                            <Dropdown>
                                                <Dropdown.Toggle 
                                                    variant="link" 
                                                    className="p-0 text-dark"
                                                    id={`dropdown-${quiz._id}`}
                                                >
                                                    <FaEllipsisV />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item 
                                                        as={Link} 
                                                        to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                                                    >
                                                        <FaEdit className="me-2" /> Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item 
                                                        onClick={() => handleDeleteQuiz(quiz._id)}
                                                    >
                                                        <FaTrash className="me-2" /> Delete
                                                    </Dropdown.Item>
                                                    <Dropdown.Item 
                                                        onClick={() => handlePublishToggle(quiz._id, quiz.published)}
                                                    >
                                                        {quiz.published ? "Unpublish" : "Publish"}
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </>
                                    )}
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}