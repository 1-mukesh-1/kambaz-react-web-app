import Modules from "./Modules";
import Home from "./Home";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa6";
import { Route, Routes, useParams, useLocation } from "react-router";
import CourseNavigation from "./Navigation";
import Assignments from "./Assignments";

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
                        <Route path="Quizzes" element={<h2>Quizzes</h2>} />
                        <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
