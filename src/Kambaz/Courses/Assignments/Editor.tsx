import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addAssignment, setAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { assignments, assignment } = useSelector((state: any) => state.assignmentsReducer);

    useEffect(() => {
        if (aid !== "new") {
            const existingAssignment = assignments.find((a: any) => a._id === aid);
            dispatch(setAssignment(existingAssignment));
        } else {
            dispatch(setAssignment({
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
                    textEntry: false, websiteUrl: true, mediaRecordings: false,
                    studentAnnotation: false, fileUploads: false,
                },
                assignTo: "Everyone",
            }));
        }
    }, [aid, assignments, dispatch]);


    const handleSave = () => {
        if (aid === "new") {
            dispatch(addAssignment({ ...assignment, course: cid, _id: uuidv4() }));
        } else {
            dispatch(updateAssignment(assignment));
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="container-fluid">
            <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                <Form.Control id="wd-name" value={assignment.title || ''}
                    onChange={(e) => dispatch(setAssignment({ ...assignment, title: e.target.value }))} />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Control as="textarea" rows={3} id="wd-description" value={assignment.description || ''}
                    onChange={(e) => dispatch(setAssignment({ ...assignment, description: e.target.value }))} />
            </Form.Group>

            <Row className="mb-3 align-items-center">
                <Col md={3} className="text-end">
                    <Form.Label htmlFor="wd-points">Points</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Control id="wd-points" type="number" value={assignment.points || 100}
                        onChange={(e) => dispatch(setAssignment({ ...assignment, points: parseInt(e.target.value) }))} />
                </Col>
            </Row>

            <Row className="mb-3 align-items-center">
                <Col md={3} className="text-end">
                    <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Select id="wd-group" value={assignment.group || 'ASSIGNMENTS'}
                        onChange={(e) => dispatch(setAssignment({ ...assignment, group: e.target.value }))}>
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
                    <Form.Select id="wd-display-grade-as" value={assignment.displayGradeAs || 'Percentage'}
                        onChange={(e) => dispatch(setAssignment({ ...assignment, displayGradeAs: e.target.value }))}>
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
                        <Form.Select id="wd-submission-type" value={assignment.submissionType || 'Online'} className="mb-3"
                            onChange={(e) => dispatch(setAssignment({ ...assignment, submissionType: e.target.value }))}>
                            <option value="Online">Online</option>
                            <option value="On Paper">On Paper</option>
                        </Form.Select>
                        {assignment.submissionType === 'Online' && (
                            <div>
                                <strong>Online Entry Options</strong>
                                <div className="mt-2">
                                    <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry"
                                        checked={assignment.onlineEntryOptions?.textEntry || false}
                                        onChange={(e) => dispatch(setAssignment({ ...assignment, onlineEntryOptions: { ...assignment.onlineEntryOptions, textEntry: e.target.checked } }))} />
                                    <Form.Check type="checkbox" id="wd-website-url" label="Website URL"
                                        checked={assignment.onlineEntryOptions?.websiteUrl || false}
                                        onChange={(e) => dispatch(setAssignment({ ...assignment, onlineEntryOptions: { ...assignment.onlineEntryOptions, websiteUrl: e.target.checked } }))} />
                                    <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings"
                                        checked={assignment.onlineEntryOptions?.mediaRecordings || false}
                                        onChange={(e) => dispatch(setAssignment({ ...assignment, onlineEntryOptions: { ...assignment.onlineEntryOptions, mediaRecordings: e.target.checked } }))} />
                                    <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation"
                                        checked={assignment.onlineEntryOptions?.studentAnnotation || false}
                                        onChange={(e) => dispatch(setAssignment({ ...assignment, onlineEntryOptions: { ...assignment.onlineEntryOptions, studentAnnotation: e.target.checked } }))} />
                                    <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads"
                                        checked={assignment.onlineEntryOptions?.fileUploads || false}
                                        onChange={(e) => dispatch(setAssignment({ ...assignment, onlineEntryOptions: { ...assignment.onlineEntryOptions, fileUploads: e.target.checked } }))} />
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
                            <Form.Control id="wd-assign-to" value={assignment.assignTo || 'Everyone'}
                                onChange={(e) => dispatch(setAssignment({ ...assignment, assignTo: e.target.value }))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                            <Form.Control type="date" id="wd-due-date" value={assignment.due || ''}
                                onChange={(e) => dispatch(setAssignment({ ...assignment, due: e.target.value }))} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                                <Form.Control type="date" id="wd-available-from" value={assignment.available || ''}
                                    onChange={(e) => dispatch(setAssignment({ ...assignment, available: e.target.value }))} />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                                <Form.Control type="date" id="wd-available-until" value={assignment.until || ''}
                                    onChange={(e) => dispatch(setAssignment({ ...assignment, until: e.target.value }))} />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <hr />
            <div className="d-flex justify-content-end mb-3">
                <Button variant="outline-secondary" className="me-2" onClick={handleCancel}>Cancel</Button>
                <Button variant="danger" onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
}