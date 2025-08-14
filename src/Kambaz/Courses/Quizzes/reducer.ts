import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    quiz: {
        title: "New Quiz",
        points: 0,
        description: "New Quiz Description",
        published: false,
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: "Immediately",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: new Date().toISOString().slice(0, 16),
        availableDate: new Date().toISOString().slice(0, 16),
        untilDate: new Date().toISOString().slice(0, 16),
        questions: []
    },
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes = [action.payload, ...state.quizzes] as any;
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz: any) => quiz._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz: any) => {
                if (quiz._id === action.payload._id) {
                    return action.payload;
                } else {
                    return quiz;
                }
            }) as any;
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
    },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, setQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;