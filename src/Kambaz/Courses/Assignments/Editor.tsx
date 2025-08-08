import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
	const { cid, aid } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const editing = aid !== "new";

	const [assignment, setAssignment] = useState<any>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [points, setPoints] = useState(100);
	const [group, setGroup] = useState("ASSIGNMENTS");
	const [displayGradeAs, setDisplayGradeAs] = useState("Percentage");
	const [submissionType, setSubmissionType] = useState("Online");
	const [onlineEntryOptions, setOnlineEntryOptions] = useState({
		textEntry: false,
		websiteUrl: true,
		mediaRecordings: false,
		studentAnnotation: false,
		fileUploads: false,
	});
	const [assignTo, setAssignTo] = useState("Everyone");
	const [due, setDue] = useState("");
	const [available, setAvailable] = useState("");
	const [until, setUntil] = useState("");

	const handleUpdateAssignment = async (assignment: any) => {
		const updated = await assignmentsClient.updateAssignment(assignment._id, assignment);
		dispatch(updateAssignment(updated));
	};

	const addNewAssignment = async (assignment: any) => {
		const newAssignment = await assignmentsClient.createAssignment(assignment);
		dispatch(addAssignment(newAssignment));
	};

	const fetchAssignment = async () => {
		if (editing && aid) {
			try {
				const data = await assignmentsClient.findAssignmentById(aid);
				setAssignment(data);
				setTitle(data?.title || "");
				setDescription(data?.description || "");
				setPoints(data?.points || 100);
				setGroup(data?.group || "ASSIGNMENTS");
				setDisplayGradeAs(data?.displayGradeAs || "Percentage");
				setSubmissionType(data?.submissionType || "Online");
				setOnlineEntryOptions(data?.onlineEntryOptions || {
					textEntry: false,
					websiteUrl: true,
					mediaRecordings: false,
					studentAnnotation: false,
					fileUploads: false,
				});
				setAssignTo(data?.assignTo || "Everyone");

				setDue(data?.due || "");
				setAvailable(data?.available || "");
				setUntil(data?.until || "");
			} catch (error) {
				console.error("Error fetching assignment:", error);
			}
		} else {
			const now = new Date().toISOString().slice(0, 16);
			setTitle("New Assignment");
			setDescription("New Description");
			setDue(now);
			setAvailable(now);
			setUntil(now);
		}
	};

	const handleSaveAssignment = async () => {
		const newAssignment = {
			title,
			description,
			points,
			group,
			displayGradeAs,
			submissionType,
			onlineEntryOptions,
			assignTo,
			due,
			available,
			until,
			course: cid,
		};

		try {
			if (editing && assignment?._id) {
				await handleUpdateAssignment({ ...assignment, ...newAssignment });
			} else {
				await addNewAssignment(newAssignment);
			}
			navigate(`/Kambaz/Courses/${cid}/Assignments`);
		} catch (error) {
			console.error("Error saving assignment:", error);
		}
	};

	const handleCancel = () => {
		navigate(`/Kambaz/Courses/${cid}/Assignments`);
	};

	const handleOnlineOptionChange = (option: string, checked: boolean) => {
		setOnlineEntryOptions(prev => ({
			...prev,
			[option]: checked
		}));
	};

	useEffect(() => {
		fetchAssignment();
	}, [aid]);

	if (editing && !assignment && aid !== "new") {
		return <div className="p-4">Loading assignment...</div>;
	}

	return (
		<div id="wd-assignments-editor" className="container-fluid">
			<Form.Group className="mb-3">
				<Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
				<Form.Control
					id="wd-name"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-4">
				<Form.Control
					as="textarea"
					rows={3}
					id="wd-description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</Form.Group>

			<Row className="mb-3 align-items-center">
				<Col md={3} className="text-end">
					<Form.Label htmlFor="wd-points">Points</Form.Label>
				</Col>
				<Col md={9}>
					<Form.Control
						id="wd-points"
						type="number"
						value={points}
						onChange={(e) => setPoints(Number(e.target.value))}
					/>
				</Col>
			</Row>

			<Row className="mb-3 align-items-center">
				<Col md={3} className="text-end">
					<Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
				</Col>
				<Col md={9}>
					<Form.Select
						id="wd-group"
						value={group}
						onChange={(e) => setGroup(e.target.value)}
					>
						<option value="ASSIGNMENTS">ASSIGNMENTS</option>
						<option value="QUIZZES">QUIZZES</option>
						<option value="EXAMS">EXAMS</option>
						<option value="PROJECT">PROJECT</option>
					</Form.Select>
				</Col>
			</Row>

			<Row className="mb-3 align-items-center">
				<Col md={3} className="text-end">
					<Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
				</Col>
				<Col md={9}>
					<Form.Select
						id="wd-display-grade-as"
						value={displayGradeAs}
						onChange={(e) => setDisplayGradeAs(e.target.value)}
					>
						<option value="Percentage">Percentage</option>
						<option value="Points">Points</option>
					</Form.Select>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col md={3} className="text-end">
					<Form.Label>Submission Type</Form.Label>
				</Col>
				<Col md={9}>
					<div className="border p-3 rounded">
						<Form.Select
							id="wd-submission-type"
							value={submissionType}
							className="mb-3"
							onChange={(e) => setSubmissionType(e.target.value)}
						>
							<option value="Online">Online</option>
							<option value="On Paper">On Paper</option>
						</Form.Select>
						{submissionType === 'Online' && (
							<div>
								<strong>Online Entry Options</strong>
								<div className="mt-2">
									<Form.Check
										type="checkbox"
										id="wd-text-entry"
										label="Text Entry"
										checked={onlineEntryOptions.textEntry}
										onChange={(e) => handleOnlineOptionChange('textEntry', e.target.checked)}
									/>
									<Form.Check
										type="checkbox"
										id="wd-website-url"
										label="Website URL"
										checked={onlineEntryOptions.websiteUrl}
										onChange={(e) => handleOnlineOptionChange('websiteUrl', e.target.checked)}
									/>
									<Form.Check
										type="checkbox"
										id="wd-media-recordings"
										label="Media Recordings"
										checked={onlineEntryOptions.mediaRecordings}
										onChange={(e) => handleOnlineOptionChange('mediaRecordings', e.target.checked)}
									/>
									<Form.Check
										type="checkbox"
										id="wd-student-annotation"
										label="Student Annotation"
										checked={onlineEntryOptions.studentAnnotation}
										onChange={(e) => handleOnlineOptionChange('studentAnnotation', e.target.checked)}
									/>
									<Form.Check
										type="checkbox"
										id="wd-file-upload"
										label="File Uploads"
										checked={onlineEntryOptions.fileUploads}
										onChange={(e) => handleOnlineOptionChange('fileUploads', e.target.checked)}
									/>
								</div>
							</div>
						)}
					</div>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col md={3} className="text-end">
					<Form.Label>Assign</Form.Label>
				</Col>
				<Col md={9}>
					<div className="border p-3 rounded">
						<Form.Group className="mb-3">
							<Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
							<Form.Control
								id="wd-assign-to"
								value={assignTo}
								onChange={(e) => setAssignTo(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="wd-due-date">Due</Form.Label>
							<Form.Control
								type="datetime-local"
								id="wd-due-date"
								value={due}
								onChange={(e) => setDue(e.target.value)}
							/>
						</Form.Group>
						<Row>
							<Col>
								<Form.Label htmlFor="wd-available-from">Available from</Form.Label>
								<Form.Control
									type="datetime-local"
									id="wd-available-from"
									value={available}
									onChange={(e) => setAvailable(e.target.value)}
								/>
							</Col>
							<Col>
								<Form.Label htmlFor="wd-available-until">Until</Form.Label>
								<Form.Control
									type="datetime-local"
									id="wd-available-until"
									value={until}
									onChange={(e) => setUntil(e.target.value)}
								/>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>

			<hr />
			<div className="d-flex justify-content-end mb-3">
				<Button variant="outline-secondary" className="me-2" onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant="danger" onClick={handleSaveAssignment}>
					Save
				</Button>
			</div>
		</div>
	);
}