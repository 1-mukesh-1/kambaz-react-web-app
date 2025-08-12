import { Link, useParams, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function CourseNavigation() {
	const { cid } = useParams();
	const { pathname } = useLocation();
	const links = [
		{ label: "Home", path: "Home" },
		{ label: "Modules", path: "Modules" },
		{ label: "Piazza", path: "Piazza" },
		{ label: "Zoom", path: "Zoom" },
		{ label: "Assignments", path: "Assignments" },
		{ label: "Quizzes", path: "Quizzes" },
		{ label: "Grades", path: "Grades" },
		{ label: "People", path: "People" },
	];
	return (
		<ListGroup className="rounded-0 wd fs-5">
			{links.map((link) => {
				const isActive = pathname.includes(link.path);
				return (
					<ListGroup.Item
						key={link.path}
						as={Link}
						to={`/Kambaz/Courses/${cid}/${link.path}`}
						className={`border border-0 ${isActive ? "active" : "text-danger"
							}`}
					>
						{link.label}
					</ListGroup.Item>
				);
			})}
		</ListGroup>
	);
}