import { createSlice } from "@reduxjs/toolkit";

export interface Question {
    _id: string;
    type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
    title: string;
    question: string;
    points: number;
    choices?: Array<{
        _id: string;
        text: string;
        isCorrect?: boolean;
    }>;
    trueFalseAnswer?: boolean;
    blanks?: string[];
}

export interface Quiz {
    _id: string;
    title: string;
    course: string;
    description: string;
    quizType: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
    points: number;
    assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    howManyAttempts: number;
    showCorrectAnswers: boolean;
    accessCode?: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate?: string;
    availableDate?: string;
    untilDate?: string;
    published: boolean;
    questions: Question[];
    lastScore?: number;
    attemptsTaken?: number;
    lastAttemptStatus?: string;
}

interface QuizzesState {
    quizzes: Quiz[];
    currentQuiz: Quiz | null;
    currentAttempt: any | null;
}

const initialState: QuizzesState = {
    quizzes: [],
    currentQuiz: null,
    currentAttempt: null
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        setCurrentQuiz: (state, action) => {
            state.currentQuiz = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes = [action.payload, ...state.quizzes];
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map(quiz =>
                quiz._id === action.payload._id ? action.payload : quiz
            );
            if (state.currentQuiz?._id === action.payload._id) {
                state.currentQuiz = action.payload;
            }
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
        },
        publishQuiz: (state, action) => {
            const { quizId, published } = action.payload;
            state.quizzes = state.quizzes.map(quiz =>
                quiz._id === quizId ? { ...quiz, published } : quiz
            );
            
            if (state.currentQuiz && state.currentQuiz._id === quizId) {
                state.currentQuiz.published = published;
            }
        },
        setCurrentAttempt: (state, action) => {
            state.currentAttempt = action.payload;
        },
        addQuestion: (state, action) => {
            const { quizId, question } = action.payload;
            state.quizzes = state.quizzes.map(quiz => {
                if (quiz._id === quizId) {
                    const updatedQuiz = {
                        ...quiz,
                        questions: [...quiz.questions, question],
                        points: quiz.points + (question.points || 0)
                    };
                    if (state.currentQuiz?._id === quizId) {
                        state.currentQuiz = updatedQuiz;
                    }
                    return updatedQuiz;
                }
                return quiz;
            });
        },
        updateQuestion: (state, action) => {
            const { quizId, questionId, updates } = action.payload;
            state.quizzes = state.quizzes.map(quiz => {
                if (quiz._id === quizId) {
                    const updatedQuestions = quiz.questions.map(q =>
                        q._id === questionId ? { ...q, ...updates } : q
                    );
                    const updatedQuiz = {
                        ...quiz,
                        questions: updatedQuestions,
                        points: updatedQuestions.reduce((sum, q) => sum + (q.points || 0), 0)
                    };
                    if (state.currentQuiz?._id === quizId) {
                        state.currentQuiz = updatedQuiz;
                    }
                    return updatedQuiz;
                }
                return quiz;
            });
        },
        deleteQuestion: (state, action) => {
            const { quizId, questionId } = action.payload;
            state.quizzes = state.quizzes.map(quiz => {
                if (quiz._id === quizId) {
                    const updatedQuestions = quiz.questions.filter(q => q._id !== questionId);
                    const updatedQuiz = {
                        ...quiz,
                        questions: updatedQuestions,
                        points: updatedQuestions.reduce((sum, q) => sum + (q.points || 0), 0)
                    };
                    if (state.currentQuiz?._id === quizId) {
                        state.currentQuiz = updatedQuiz;
                    }
                    return updatedQuiz;
                }
                return quiz;
            });
        }
    }
});

export const {
    setQuizzes,
    setCurrentQuiz,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    publishQuiz,
    setCurrentAttempt,
    addQuestion,
    updateQuestion,
    deleteQuestion
} = quizzesSlice.actions;

export default quizzesSlice.reducer;