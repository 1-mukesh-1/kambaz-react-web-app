import { ListGroup, Form, Row, Col, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown, FaCheckCircle, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
	deleteAssignment,
	setAssignments,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect } from "react";

export default function Assignments() {
	const { cid } = useParams();
	const dispatch = useDispatch();
	const { assignments } = useSelector((state: any) => state.assignmentsReducer);

	const fetchAssignments = async () => {
		try {
			const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
			dispatch(setAssignments(assignments));
		} catch (error) {
			console.error("Error fetching assignments:", error);
		}
	};

	const removeModule = async (moduleId: string) => {
		try {
			await assignmentsClient.deleteAssignment(moduleId);
			dispatch(deleteAssignment(moduleId));
		} catch (error) {
			console.error("Error deleting assignment:", error);
		}
	};

	useEffect(() => {
		fetchAssignments();
	}, [cid]);

	const formatDate = (dateStr: string) => {
		if (!dateStr) return "Not set";
		try {
			return new Date(dateStr).toLocaleString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			});
		} catch (error) {
			return "Invalid date";
		}
	};

	return (
		<div id="wd-assignments">
			<Row className="mb-4 w-100">
				<Col>
					<Form.Control
						id="wd-password"
						placeholder="🔍 Search..."
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

			<ListGroup id="wd-assignment-lists" className="rounded-0">
				<ListGroup.Item className="wd-assignment-list p-0 mb-5 fs-5 border-gray">
					<div className="wd-title d-flex py-2 bg-secondary justify-content-between align-items-center">
						<div className="d-flex align-items-center">
							<BsGripVertical className="fs-3" />
							<FaCaretDown className="fs-6 me-1" />
							<h5 className="mt-2">ASSIGNMENTS</h5>
						</div>
						<div className="d-flex align-items-center">
							<h5 className="border border-dark rounded-5 p-1 px-2 mt-1 fs-6">
								40% of Total
							</h5>
							<button className="btn btn-lg">+</button>
							<IoEllipsisVertical className="fs-3" />
						</div>
					</div>

					<ListGroup>
						{assignments
							.filter((assignment: any) => assignment.course === cid)
							.map((assignment: any) => (
								<ListGroup.Item
									key={assignment._id}
									className="wd-assignment d-flex p-3 ps-1 align-items-center justify-content-between"
								>
									<div className="d-flex align-items-center">
										<BsGripVertical className="fs-3" />
										<GiNotebook className="fs-4 text-success me-2" />
										<div className="wd-assignment-details">
											<Link
												to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
												className="wd-assignment-link text-black fs-5 text-decoration-none"
											>
												{assignment.title}
											</Link>

											<div>
												<span className="mb-1 fs-6 text-danger">
													Multiple Modules
												</span>{" "}
												<span className="mb-1 fs-6">
													| <b>Not available until</b>{" "}
													{formatDate(assignment.available)}{" "}
													|
												</span>
												<span className="mb-1 fs-6">
													{" "}
													<b>Closes</b>{" "}
													{formatDate(assignment.until)}{" "}
													|
												</span>
											</div>
											<p className="mb-0 fs-6">
												<b>Due</b>{" "}
												{formatDate(assignment.due)}{" "}
												| {assignment.points} points
											</p>
										</div>
									</div>
									<div className="flex float-end align-items-center">
										<FaTrash
											className="mx-3 text text-danger"
											onClick={() => removeModule(assignment._id)}
											style={{ cursor: "pointer" }}
										/>
										<FaCheckCircle className="text-success" />
										<IoEllipsisVertical className="fs-3" />
									</div>
								</ListGroup.Item>
							))}
					</ListGroup>
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
}