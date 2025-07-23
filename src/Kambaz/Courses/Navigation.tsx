import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const { pathname } = useLocation();
    const { cid } = useParams();

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => {
                const isActive = pathname.includes(link);
                return (
                    <Link
                        key={link}
                        to={`/Kambaz/Courses/${cid}/${link}`}
                        id={`wd-course-${link}-link`}
                        className={`list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>
    );
}