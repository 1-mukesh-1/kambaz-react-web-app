import Modules from "./Modules";
import Home from "./Home";
import { FaAlignJustify } from "react-icons/fa6";
import { Route, Routes, useParams, useLocation, Navigate } from "react-router";
import CourseNavigation from "./Navigation";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";

export default function Courses({ courses }: { courses: any[] }) {
	const { cid } = useParams();
	const course = courses.find((course: any) => course._id === cid);
	const { pathname } = useLocation();

	const pathParts = pathname.split("/");
	const breadcrumb = pathParts[pathParts.length - 1];

	return (
		<div id="wd-courses">
			<h2 className="text-danger">
				<FaAlignJustify className="me-4 fs-4 mb-1" />
				{course && course.name}
				<span className="text-muted"> &gt; {breadcrumb}</span>
			</h2>

			<div className="d-flex">
				<div className="d-none d-md-block">
					<CourseNavigation />
				</div>
				<div className="flex-fill ps-4">
					<Routes>
						<Route path="/" element={<Navigate to="Home" />} />
						<Route path="Home" element={<Home />} />
						<Route path="Modules" element={<Modules />} />
						<Route path="Piazza" element={<h2>Piazza</h2>} />
						<Route path="Zoom" element={<h2>Zoom</h2>} />
						<Route path="Assignments" element={<Assignments />} />
						<Route path="Assignments/:aid/*" element={<AssignmentEditor />} />
						<Route path="Quizzes" element={<Quizzes />} />
						<Route path="Quizzes/:qid" element={<h2>Quiz Details Placeholder</h2>} />
                        <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
						<Route path="Grades" element={<h2>Grades</h2>} />
						<Route path="People" element={<PeopleTable />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}