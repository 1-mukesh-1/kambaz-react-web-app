import { ListGroup, Form, Row, Col, Button } from "react-bootstrap";
import { BsGripVertical, BsCaretDownFill } from "react-icons/bs";
import { FaFileAlt, FaPlus, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import {
	deleteAssignment,
	setAssignments,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect } from "react";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import GreenCheckmark from "./GreenCheckmark";

export default function Assignments() {
	const { cid } = useParams();
	const dispatch = useDispatch();
	const { assignments } = useSelector((state: any) => state.assignmentsReducer);

	const fetchAssignments = async () => {
		const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
		dispatch(setAssignments(assignments));
	};

	const removeModule = async (moduleId: string) => {
		await assignmentsClient.deleteAssignment(moduleId);
		dispatch(deleteAssignment(moduleId));
	};

	useEffect(() => {
		fetchAssignments();
	}, []);

	return (
		<div id="wd-assignments">
			<div style={{ display: 'none' }}>
				<Row className="mb-4 w-100">
					<Col>
						<Form.Control
							id="wd-password"
							placeholder="Search"
							type="text"
							className="col mb-2"
						/>
					</Col>
					<Col className="flex text-end align-items-start">
						<button
							id="wd-add-assignment-group"
							className="btn btn-secondary mx-2"
						>
							+ Group
						</button>
						<Link
							to={`/Kambaz/Courses/${cid}/Assignments/new`}
							style={{ textDecoration: "none" }}
						>
							<Button variant="danger">
								<FaPlus
									className="position-relative me-2"
									style={{ bottom: "1px" }}
								/>
								Assignment
							</Button>
						</Link>
					</Col>
				</Row>
			</div>

			<AssignmentControls />
			<br /><br /><br /><br />

			<ListGroup className="rounded-0" id="wd-assignment-lists">
				<ListGroup.Item className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
					<div className="wd-title p-3 ps-2 bg-secondary">
						<BsGripVertical className="me-2 fs-3" />
						<BsCaretDownFill className="me-2" />
						ASSIGNMENTS
						<AssignmentControlButtons />
					</div>

					<ListGroup className="wd-assignment-list rounded-0">
						{assignments
							.filter((assignment: any) => assignment.course === cid)
							.map((assignment: any) => (
								<ListGroup.Item
									key={assignment._id}
									className="wd-assignment-list-item p-3 ps-1 wd-lesson"
								>
									<BsGripVertical className="me-2 fs-3" />
									<FaFileAlt className="me-2 fs-4 text-success" />
									<Link
										to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
										className="text-decoration-none text-dark"
									>
										<strong>{assignment.title}</strong>
									</Link>
									<div className="float-end">
										<FaTrash
											className="text-danger me-2 mb-1"
											onClick={() => removeModule(assignment._id)}
										/>
										<GreenCheckmark />
										<IoEllipsisVertical className="fs-4" />
									</div>
									<br />
									<span className="text-danger">Multiple Modules</span>
									<span className="text-muted">
										{" "}
										| <strong>Not available until</strong>{" "}
										{new Date(assignment.available).toLocaleString(
											"en-US",
											{
												month: "short",
												day: "numeric",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
												hour12: true,
											}
										)}{" "}
										|{" "}
									</span>
									<span className="text-muted">
										<strong>Closes</strong>{" "}
										{new Date(assignment.until).toLocaleString(
											"en-US",
											{
												month: "short",
												day: "numeric",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
												hour12: true,
											}
										)}
									</span>
									<br />
									<span className="text-muted">
										<strong>Due</strong>{" "}
										{new Date(assignment.due).toLocaleString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										})}{" "}
										| {assignment.points} pts
									</span>
								</ListGroup.Item>
							))}
					</ListGroup>
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
}