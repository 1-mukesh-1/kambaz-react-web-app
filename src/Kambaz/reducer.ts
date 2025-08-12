import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = {
    _id: string;
    user: string;
    course: string;
};

export type Course = {
    _id: string;
    username: string;
    isFaculty?: boolean;
};

const initialState: {
    enrollments: Enrollment[];
    showAllCourses: boolean;
} = {
    enrollments: [],
    showAllCourses: false,
};

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        enrollCourse: (
            state,
            action: PayloadAction<{ userId: string; courseId: string }>
        ) => {
            const { userId, courseId } = action.payload;
            const alreadyEnrolled = state.enrollments.some(
                (e) => e.user === userId && e.course === courseId
            );

            if (!alreadyEnrolled) {
                const newId = (
                    Math.max(0, ...state.enrollments.map((e) => parseInt(e._id))) + 1
                ).toString();
                state.enrollments.push({ _id: newId, user: userId, course: courseId });
            }
        },

        unenrollCourse: (
            state,
            action: PayloadAction<{ userId: string; courseId: string }>
        ) => {
            const { userId, courseId } = action.payload;
            state.enrollments = state.enrollments.filter(
                (e) => !(e.user === userId && e.course === courseId)
            );
        },

        toggleViewAllCourses: (state) => {
            state.showAllCourses = !state.showAllCourses;
        },
    },
});

export const { enrollCourse, unenrollCourse, toggleViewAllCourses, setEnrollments } =
    enrollmentSlice.actions;

export default enrollmentSlice.reducer;