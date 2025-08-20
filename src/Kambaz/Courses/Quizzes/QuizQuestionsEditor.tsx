import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import * as client from "./client";
import { addQuestion as addQuestionAction, updateQuestion as updateQuestionAction, deleteQuestion as deleteQuestionAction } from "./reducer";

export default function QuizQuestionsEditor() {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const { currentQuiz } = useSelector((state: any) => state.quizzesReducer);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [newQuestion, setNewQuestion] = useState<any>(null);

    const createNewQuestion = () => {
        setNewQuestion({
            type: "MULTIPLE_CHOICE",
            title: "Question " + ((currentQuiz?.questions?.length || 0) + 1),
            question: "",
            points: 1,
            choices: [
                { _id: "1", text: "", isCorrect: true },
                { _id: "2", text: "", isCorrect: false }
            ],
            trueFalseAnswer: true,
            blanks: [""]
        });
    };

    const handleSaveQuestion = async () => {
        if (!newQuestion) return;

        try {
            const questionToSave = { ...newQuestion };
            
            if (questionToSave.type === "MULTIPLE_CHOICE") {
                delete questionToSave.trueFalseAnswer;
                delete questionToSave.blanks;
            } else if (questionToSave.type === "TRUE_FALSE") {
                delete questionToSave.choices;
                delete questionToSave.blanks;
            } else if (questionToSave.type === "FILL_BLANK") {
                delete questionToSave.choices;
                delete questionToSave.trueFalseAnswer;
            }

            const savedQuestion = await client.addQuestion(qid!, questionToSave);
            dispatch(addQuestionAction({ quizId: qid, question: savedQuestion }));
            setNewQuestion(null);
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    const handleUpdateQuestion = async () => {
        if (!editingQuestion) return;

        try {
            const questionToUpdate = { ...editingQuestion };
            
            if (questionToUpdate.type === "MULTIPLE_CHOICE") {
                delete questionToUpdate.trueFalseAnswer;
                delete questionToUpdate.blanks;
            } else if (questionToUpdate.type === "TRUE_FALSE") {
                delete questionToUpdate.choices;
                delete questionToUpdate.blanks;
            } else if (questionToUpdate.type === "FILL_BLANK") {
                delete questionToUpdate.choices;
                delete questionToUpdate.trueFalseAnswer;
            }

            await client.updateQuestion(qid!, editingQuestion._id, questionToUpdate);
            dispatch(updateQuestionAction({ 
                quizId: qid, 
                questionId: editingQuestion._id, 
                updates: questionToUpdate 
            }));
            setEditingQuestion(null);
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    const handleDeleteQuestion = async (questionId: string) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;

        try {
            await client.deleteQuestion(qid!, questionId);
            dispatch(deleteQuestionAction({ quizId: qid, questionId }));
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    const addChoice = (question: any) => {
        const newChoice = {
            _id: Date.now().toString(),
            text: "",
            isCorrect: false
        };
        return {
            ...question,
            choices: [...question.choices, newChoice]
        };
    };

    const updateChoice = (question: any, choiceId: string, field: string, value: any) => {
        return {
            ...question,
            choices: question.choices.map((choice: any) => {
                if (choice._id === choiceId) {
                    if (field === "isCorrect" && value === true) {
                        return { ...choice, [field]: value };
                    }
                    return { ...choice, [field]: value };
                } else if (field === "isCorrect" && value === true) {
                    return { ...choice, isCorrect: false };
                }
                return choice;
            })
        };
    };

    const removeChoice = (question: any, choiceId: string) => {
        return {
            ...question,
            choices: question.choices.filter((choice: any) => choice._id !== choiceId)
        };
    };

    const addBlank = (question: any) => {
        return {
            ...question,
            blanks: [...question.blanks, ""]
        };
    };

    const updateBlank = (question: any, index: number, value: string) => {
        const newBlanks = [...question.blanks];
        newBlanks[index] = value;
        return {
            ...question,
            blanks: newBlanks
        };
    };

    const removeBlank = (question: any, index: number) => {
        return {
            ...question,
            blanks: question.blanks.filter((_: any, i: number) => i !== index)
        };
    };

    const renderQuestionEditor = (question: any, isNew: boolean = false) => {
        const setQuestion = isNew ? setNewQuestion : setEditingQuestion;

        return (
            <Card className="mb-3">
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Question Type</Form.Label>
                            <Form.Select
                                value={question.type}
                                onChange={(e) => setQuestion({ ...question, type: e.target.value })}
                            >
                                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                                <option value="TRUE_FALSE">True/False</option>
                                <option value="FILL_BLANK">Fill in the Blank</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={question.title}
                                onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                type="number"
                                value={question.points}
                                onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) })}
                                min="0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={question.question}
                                onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                            />
                        </Form.Group>

                        {question.type === "MULTIPLE_CHOICE" && (
                            <div>
                                <Form.Label>Choices</Form.Label>
                                {question.choices.map((choice: any) => (
                                    <div key={choice._id} className="d-flex mb-2">
                                        <Form.Check
                                            type="radio"
                                            name={`correct-${question._id}`}
                                            checked={choice.isCorrect}
                                            onChange={(e) => setQuestion(updateChoice(question, choice._id, "isCorrect", e.target.checked))}
                                            className="me-2"
                                        />
                                        <Form.Control
                                            type="text"
                                            value={choice.text}
                                            onChange={(e) => setQuestion(updateChoice(question, choice._id, "text", e.target.value))}
                                            placeholder="Enter choice text"
                                            className="me-2"
                                        />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => setQuestion(removeChoice(question, choice._id))}
                                            disabled={question.choices.length <= 2}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setQuestion(addChoice(question))}
                                >
                                    <FaPlus className="me-2" /> Add Choice
                                </Button>
                            </div>
                        )}

                        {question.type === "TRUE_FALSE" && (
                            <Form.Group className="mb-3">
                                <Form.Label>Correct Answer</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        label="True"
                                        name={`tf-${question._id}`}
                                        checked={question.trueFalseAnswer === true}
                                        onChange={() => setQuestion({ ...question, trueFalseAnswer: true })}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="False"
                                        name={`tf-${question._id}`}
                                        checked={question.trueFalseAnswer === false}
                                        onChange={() => setQuestion({ ...question, trueFalseAnswer: false })}
                                    />
                                </div>
                            </Form.Group>
                        )}

                        {question.type === "FILL_BLANK" && (
                            <div>
                                <Form.Label>Acceptable Answers</Form.Label>
                                {question.blanks.map((blank: string, index: number) => (
                                    <div key={index} className="d-flex mb-2">
                                        <Form.Control
                                            type="text"
                                            value={blank}
                                            onChange={(e) => setQuestion(updateBlank(question, index, e.target.value))}
                                            placeholder="Enter acceptable answer"
                                            className="me-2"
                                        />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => setQuestion(removeBlank(question, index))}
                                            disabled={question.blanks.length <= 1}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setQuestion(addBlank(question))}
                                >
                                    <FaPlus className="me-2" /> Add Answer
                                </Button>
                            </div>
                        )}

                        <div className="mt-3 d-flex gap-2">
                            <Button
                                variant="primary"
                                onClick={isNew ? handleSaveQuestion : handleUpdateQuestion}
                            >
                                <FaSave className="me-2" /> {isNew ? "Save Question" : "Update Question"}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => isNew ? setNewQuestion(null) : setEditingQuestion(null)}
                            >
                                <FaTimes className="me-2" /> Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        );
    };

    const totalPoints = currentQuiz?.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || 0;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Questions (Total Points: {totalPoints})</h4>
                {!newQuestion && (
                    <Button variant="primary" onClick={createNewQuestion}>
                        <FaPlus className="me-2" /> New Question
                    </Button>
                )}
            </div>

            {newQuestion && renderQuestionEditor(newQuestion, true)}

            {currentQuiz?.questions?.length === 0 && !newQuestion && (
                <Card>
                    <Card.Body className="text-center p-5">
                        <p>No questions yet. Click "New Question" to add your first question.</p>
                    </Card.Body>
                </Card>
            )}

            <ListGroup>
                {currentQuiz?.questions?.map((question: any, index: number) => (
                    <ListGroup.Item key={question._id} className="mb-2">
                        {editingQuestion?._id === question._id ? (
                            renderQuestionEditor(editingQuestion, false)
                        ) : (
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                    <h6>
                                        {index + 1}. {question.title} 
                                        <span className="ms-2 badge bg-secondary">{question.points} pts</span>
                                        <span className="ms-2 badge bg-info">{question.type.replace(/_/g, " ")}</span>
                                    </h6>
                                    <p className="mb-0">{question.question}</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => setEditingQuestion(question)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDeleteQuestion(question._id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}