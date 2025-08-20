import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const saveAnswer = async (attemptId: string, questionId: string, answer: any) => {
    const { data } = await axiosWithCredentials.put(
        `${ATTEMPTS_API}/${attemptId}/answer`,
        { questionId, answer }
    );
    return data;
};

export const createQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
    return data;
};

export const findQuizById = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return data;
};

export const updateQuiz = async (quizId: string, updates: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, updates);
    return data;
};

export const deleteQuiz = async (quizId: string) => {
    await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
};

export const publishQuiz = async (quizId: string, published: boolean) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`, { published });
    return data;
};

export const findQuizzesForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return data;
};

export const addQuestion = async (quizId: string, question: any) => {
    const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return data;
};

export const updateQuestion = async (quizId: string, questionId: string, updates: any) => {
    const { data } = await axiosWithCredentials.put(
        `${QUIZZES_API}/${quizId}/questions/${questionId}`, 
        updates
    );
    return data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
    await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
};

export const createAttempt = async (quizId: string) => {
    const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`);
    return data;
};

export const getAttempts = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
    return data;
};

export const getLatestAttempt = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/latest`);
    return data;
};

export const submitAttempt = async (attemptId: string, answers: any[]) => {
    const { data } = await axiosWithCredentials.post(`${ATTEMPTS_API}/${attemptId}/submit`, { answers });
    return data;
};

export const getAttemptById = async (attemptId: string) => {
    const { data } = await axiosWithCredentials.get(`${ATTEMPTS_API}/${attemptId}`);
    return data;
};