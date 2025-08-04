import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";

const initialState = {
    courses: courses,
    course: { name: "New Course", number: "New Number", description: "New Description" },
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addCourse: (state, action) => {
            state.courses = [action.payload, ...state.courses];
        },
        deleteCourse: (state, action) => {
            state.courses = state.courses.filter(
                (course) => course._id !== action.payload
            );
        },
        updateCourse: (state, action) => {
            state.courses = state.courses.map((course) => {
                if (course._id === action.payload._id) {
                    return action.payload;
                } else {
                    return course;
                }
            });
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
    },
});

export const { addCourse, deleteCourse, updateCourse, setCourse } = coursesSlice.actions;
export default coursesSlice.reducer;