import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
	_id: string;
	title: string;
	description: string;
	points: number;
	due: string;
	available: string;
	until: string;
	group: string;
	displayGradeAs: string;
	submissionType: string;
	onlineEntryOptions: {
		textEntry: boolean;
		websiteUrl: boolean;
		mediaRecordings: boolean;
		studentAnnotation: boolean;
		fileUploads: boolean;
	};
	assignTo: string;
	course?: string;
}

interface AssignmentsState {
	assignments: Assignment[];
	assignment: Assignment;
}

const initialState: AssignmentsState = {
	assignments: [],
	assignment: {
		_id: "",
		title: "New Assignment",
		description: "New Description",
		points: 100,
		due: "2025-01-01",
		available: "2025-01-01",
		until: "2025-01-01",
		group: "ASSIGNMENTS",
		displayGradeAs: "Percentage",
		submissionType: "Online",
		onlineEntryOptions: {
			textEntry: false,
			websiteUrl: true,
			mediaRecordings: false,
			studentAnnotation: false,
			fileUploads: false,
		},
		assignTo: "Everyone"
	},
};

const assignmentsSlice = createSlice({
	name: "assignments",
	initialState,
	reducers: {
		setAssignments: (state, action) => {
			state.assignments = action.payload;
		},
		addAssignment: (state, action) => {
			state.assignments = [action.payload, ...state.assignments];
		},
		deleteAssignment: (state, action) => {
			state.assignments = state.assignments.filter(
				(assignment) => assignment._id !== action.payload
			);
		},
		updateAssignment: (state, action) => {
			state.assignments = state.assignments.map((assignment) => {
				if (assignment._id === action.payload._id) {
					return action.payload;
				} else {
					return assignment;
				}
			});
		},
		setAssignment: (state, action) => {
			state.assignment = action.payload;
		},
	},
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
