import Modules from "./Modules";
import Home from "./Home";
import { FaAlignJustify } from "react-icons/fa6";
import { Route, Routes, useParams, useLocation } from "react-router";
import CourseNavigation from "./Navigation";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursePeople from "./People";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import TakeQuiz from "./Quizzes/TakeQuiz";
import ReviewQuiz from "./Quizzes/ReviewQuiz";

export default function Courses({ courses }: { courses: any[] }) {
	const { cid } = useParams();
	const course = courses.find((course: any) => course._id === cid);
	const { pathname } = useLocation();

	return (
		<div id="wd-courses">
			<h2 className="text-danger">
				<FaAlignJustify className="me-4 fs-4 mb-1" />
				{course && course.name + " > " + pathname.split("/")[4]}
			</h2>

			<div className="d-flex">
				<div className="d-none d-md-block">
					<CourseNavigation />
				</div>
				<div className="flex-fill">
					<Routes>
						<Route path="Home" element={<Home />} />
						<Route path="Modules" element={<Modules />} />
						<Route path="Piazza" element={<h2>Piazza</h2>} />
						<Route path="Zoom" element={<h2>Zoom</h2>} />
						<Route path="Assignments" element={<Assignments />} />
						<Route path="Assignments/:aid/*" element={<AssignmentEditor />} />
						<Route path="Quizzes" element={<Quizzes />} />
						<Route path="Quizzes/:qid" element={<QuizDetails />} />
						<Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
						<Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
						<Route path="Quizzes/:qid/attempt/:attemptId" element={<TakeQuiz />} />
						<Route path="Quizzes/:qid/review/:attemptId" element={<ReviewQuiz />} />
						<Route path="Grades" element={<h2>Grades</h2>} />
						<Route path="People" element={<CoursePeople />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}