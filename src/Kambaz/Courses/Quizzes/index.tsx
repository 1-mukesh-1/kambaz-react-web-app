import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaSearch, FaRocket, FaBan } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Button, Dropdown } from "react-bootstrap";
import * as client from "./client";
import { setQuizzes, deleteQuiz as deleteQuizFromReducer, updateQuiz } from "./reducer";
import type { RootState } from "../../store";

export default function Quizzes() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quizzes = useSelector((state: RootState) => state.quizzesReducer.quizzes);

    const fetchQuizzes = async () => {
        if (cid) {
            const quizzes = await client.findQuizzesForCourse(cid);
            dispatch(setQuizzes(quizzes));
        }
    };

    const handleAddQuiz = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/new/edit`);
    };

    const handleDeleteQuiz = async (quizId: string) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            await client.deleteQuiz(quizId);
            dispatch(deleteQuizFromReducer(quizId));
        }
    };

    const handlePublishToggle = async (quiz: any) => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
    };

    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    const getAvailabilityText = (quiz: any) => {
        const now = new Date();
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);

        if (now > untilDate) return `Closed`;
        if (now < availableDate) return `Not available until ${availableDate.toLocaleString()}`;
        return `Available`;
    }


    return (
        <div id="wd-quizzes-list">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="position-relative" style={{ width: "300px" }}>
                    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    <input type="text" className="form-control ps-5" placeholder="Search for Quiz" />
                </div>
                <div>
                    <Button variant="danger" size="lg" onClick={handleAddQuiz}>
                        <FaPlus className="me-1" /> Quiz
                    </Button>
                </div>
            </div>

            <ul className="list-group">
                <li className="list-group-item list-group-item-secondary">
                    <strong>Assignment Quizzes</strong>
                </li>
                {quizzes.length === 0 ? (
                     <li className="list-group-item">
                        No quizzes available yet. Click the "+ Quiz" button to add one.
                    </li>
                ) : (quizzes.map((quiz: any) => (
                    <li key={quiz._id} className="list-group-item d-flex align-items-center">
                        <FaRocket className="text-success me-3" />
                        <div className="flex-grow-1">
                            <Link to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`} className="text-dark text-decoration-none fw-bold">
                                {quiz.title}
                            </Link>
                            <div className="text-muted small">
                                {getAvailabilityText(quiz)}
                                {' | '} <strong>Due</strong> {new Date(quiz.dueDate).toLocaleString()}
                                {' | '} {quiz.points} pts
                                {' | '} {quiz.questions?.length || 0} Questions
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <Button variant="link" onClick={() => handlePublishToggle(quiz)} className="p-0 me-2" title={quiz.published ? "Unpublish" : "Publish"}>
                                {quiz.published ? <FaRocket className="text-success fs-5" /> : <FaBan className="text-muted fs-5" />}
                            </Button>
                            <Dropdown>
                                <Dropdown.Toggle as="button" variant="light" className="btn-icon bg-transparent border-0">
                                    <IoEllipsisVertical />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDeleteQuiz(quiz._id)}>Delete</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePublishToggle(quiz)}>{quiz.published ? "Unpublish" : "Publish"}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </li>
                )))}
            </ul>
        </div>
    );
}