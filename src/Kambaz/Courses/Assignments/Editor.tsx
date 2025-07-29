import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();

    const assignment = db.assignments.find((a) => a._id === aid);

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };
    
    const handleSave = () => {
        console.log("Saving assignment...");
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    if (!assignment) {
        return <div>Assignment not found.</div>;
    }

    return (
        <div id="wd-assignments-editor" className="container-fluid">
            <div className="mb-4">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                    <Form.Control
                        id="wd-name"
                        type="text"
                        defaultValue={assignment.title}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Control
                        as="textarea"
                        rows={8}
                        id="wd-description"
                        defaultValue={assignment.description}
                        className="form-control"
                        style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <Form.Label htmlFor="wd-points" className="col-form-label">Points</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Control
                            id="wd-points"
                            type="number"
                            defaultValue={assignment.points}
                            className="form-control"
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <Form.Label htmlFor="wd-group" className="col-form-label">Assignment Group</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <Form.Label htmlFor="wd-display-grade-as" className="col-form-label">Display Grade as</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
                            <option value="Percentage">Percentage</option>
                            <option value="Points">Points</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <Form.Label className="col-form-label">Submission Type</Form.Label>
                    </Col>
                    <Col md={9}>
                        <div className="border p-3 rounded">
                            <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3">
                                <option value="Online">Online</option>
                                <option value="On Paper">On Paper</option>
                            </Form.Select>
                            
                            <div>
                                <strong>Online Entry Options</strong>
                                <div className="mt-2">
                                    <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-1" />
                                    <Form.Check type="checkbox" id="wd-website-url" label="Website URL" className="mb-1" defaultChecked />
                                    <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-1" />
                                    <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-1" />
                                    <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" className="mb-1" />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <Form.Label className="col-form-label">Assign</Form.Label>
                    </Col>
                    <Col md={9}>
                        <div className="border p-3 rounded">
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
                                <Form.Control id="wd-assign-to" defaultValue="Everyone" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                                <Form.Control type="date" id="wd-due-date" defaultValue={assignment.due} />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                                        <Form.Control type="date" id="wd-available-from" defaultValue={assignment.available} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                                        <Form.Control type="date" id="wd-available-until" defaultValue={assignment.until} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

            <hr />
            <div className="d-flex justify-content-end mb-3">
                <Button variant="outline-secondary" className="me-2" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    );
}

// import { Form, Button, Row, Col } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";

// export default function AssignmentEditor() {
//     return (
//         <div id="wd-assignments-editor" className="container-fluid">
//             <div className="mb-4">
//                 <Form.Group className="mb-3">
//                     <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
//                     <Form.Control 
//                         id="wd-name" 
//                         type="text" 
//                         defaultValue="A1" 
//                         className="form-control"
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                     <Form.Control
//                         as="textarea"
//                         rows={8}
//                         id="wd-description"
//                         defaultValue={`The assignment is available online

// Submit a link to the landing page of your Web application running on Netlify.

// The landing page should include the following:
// • Your full name and section
// • Links to each of the lab assignments
// • Link to the Kanbas application
// • Links to all relevant source code repositories

// The Kanbas application should include a link to navigate back to the landing page.`}
//                         className="form-control"
//                         style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}
//                     />
//                 </Form.Group>

//                 <Row className="mb-3">
//                     <Col md={3}>
//                         <Form.Label htmlFor="wd-points" className="col-form-label">Points</Form.Label>
//                     </Col>
//                     <Col md={9}>
//                         <Form.Control
//                             id="wd-points"
//                             type="number"
//                             defaultValue={100}
//                             className="form-control"
//                         />
//                     </Col>
//                 </Row>

//                 <Row className="mb-3">
//                     <Col md={3}>
//                         <Form.Label htmlFor="wd-group" className="col-form-label">Assignment Group</Form.Label>
//                     </Col>
//                     <Col md={9}>
//                         <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
//                             <option value="ASSIGNMENTS">ASSIGNMENTS</option>
//                         </Form.Select>
//                     </Col>
//                 </Row>

//                 <Row className="mb-3">
//                     <Col md={3}>
//                         <Form.Label htmlFor="wd-display-grade-as" className="col-form-label">Display Grade as</Form.Label>
//                     </Col>
//                     <Col md={9}>
//                         <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
//                             <option value="Percentage">Percentage</option>
//                         </Form.Select>
//                     </Col>
//                 </Row>

//                 <Row className="mb-3">
//                     <Col md={3}>
//                         <Form.Label htmlFor="wd-submission-type" className="col-form-label">Submission Type</Form.Label>
//                     </Col>
//                     <Col md={9}>
//                         <div className="border p-3 rounded">
//                             <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3">
//                                 <option value="Online">Online</option>
//                             </Form.Select>
                            
//                             <div>
//                                 <strong>Online Entry Options</strong>
//                                 <div className="mt-2">
//                                     <Form.Check
//                                         type="checkbox"
//                                         id="wd-text-entry"
//                                         label="Text Entry"
//                                         className="mb-1"
//                                     />
//                                     <Form.Check
//                                         type="checkbox"
//                                         id="wd-website-url"
//                                         label="Website URL"
//                                         className="mb-1"
//                                         defaultChecked
//                                     />
//                                     <Form.Check
//                                         type="checkbox"
//                                         id="wd-media-recordings"
//                                         label="Media Recordings"
//                                         className="mb-1"
//                                     />
//                                     <Form.Check
//                                         type="checkbox"
//                                         id="wd-student-annotation"
//                                         label="Student Annotation"
//                                         className="mb-1"
//                                     />
//                                     <Form.Check
//                                         type="checkbox"
//                                         id="wd-file-upload"
//                                         label="File Uploads"
//                                         className="mb-1"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>

//                 <Row className="mb-3">
//                     <Col md={3}>
//                         <Form.Label className="col-form-label">Assign</Form.Label>
//                     </Col>
//                     <Col md={9}>
//                         <div className="border p-3 rounded">
//                             <Form.Group className="mb-3">
//                                 <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
//                                 <div className="form-control d-flex align-items-center" style={{ minHeight: "38px", padding: "4px 8px" }}>
//                                     <span className="badge bg-light text-dark me-2 d-flex align-items-center">
//                                         Everyone
//                                         <FaTimes className="ms-2" style={{ cursor: "pointer", fontSize: "12px" }} />
//                                     </span>
//                                     <Form.Control
//                                         type="text"
//                                         id="wd-assign-to"
//                                         placeholder=""
//                                         style={{ 
//                                             border: "none", 
//                                             outline: "none", 
//                                             boxShadow: "none",
//                                             backgroundColor: "transparent",
//                                             padding: "0"
//                                         }}
//                                     />
//                                 </div>
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label htmlFor="wd-due-date">Due</Form.Label>
//                                 <Form.Control
//                                     type="datetime-local"
//                                     id="wd-due-date"
//                                     defaultValue="2024-05-13T23:59"
//                                     className="form-control"
//                                 />
//                             </Form.Group>

//                             <Row>
//                                 <Col md={6}>
//                                     <Form.Group className="mb-3">
//                                         <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
//                                         <Form.Control
//                                             type="datetime-local"
//                                             id="wd-available-from"
//                                             defaultValue="2024-05-06T12:00"
//                                             className="form-control"
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col md={6}>
//                                     <Form.Group className="mb-3">
//                                         <Form.Label htmlFor="wd-available-until">Until</Form.Label>
//                                         <Form.Control
//                                             type="datetime-local"
//                                             id="wd-available-until"
//                                             defaultValue="2024-05-20T23:59"
//                                             className="form-control"
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         </div>
//                     </Col>
//                 </Row>
//             </div>

//             <hr />
//             <div className="d-flex justify-content-end">
//                 <Button variant="outline-secondary" className="me-2">
//                     Cancel
//                 </Button>
//                 <Button variant="danger">
//                     Save
//                 </Button>
//             </div>
//         </div>
//     );
// }

// // export default function AssignmentEditor() {
// //     return (
// //         <div id="wd-assignments-editor">
// //             <label htmlFor="wd-name">Assignment Name</label>
// //             <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
// //             <textarea id="wd-description">
// //                 The assignment is available online Submit a link to the landing page of
// //             </textarea>
// //             <br />
// //             <table>
// //                 <tr>
// //                     <td align="right" valign="top">
// //                         <label htmlFor="wd-points">Points</label>
// //                     </td>
// //                     <td>
// //                         <input id="wd-points" value={100} type="number"/>
// //                     </td>
// //                 </tr>
// //                 <tr>
// //                     <td align="right" valign="top">
// //                         <label htmlFor="wd-group">Assignment Group</label>
// //                     </td>
// //                     <td>
// //                         <select id="wd-group">
// //                             <option value="ASSIGNMENTS">ASSIGNMENTS</option>
// //                         </select>
// //                     </td>
// //                 </tr>
// //                 <tr>
// //                     <td align="right" valign="top">
// //                         <label htmlFor="wd-display-grade-as">Display Grade as</label>
// //                     </td>
// //                     <td>
// //                         <select id="wd-display-grade-as">
// //                             <option value="Percentage">Percentage</option>
// //                         </select>
// //                     </td>
// //                 </tr>
// //                 <tr>
// //                     <td align="right" valign="top">
// //                         <label htmlFor="wd-submission-type">Submission Type</label>
// //                     </td>
// //                     <td>
// //                         <select id="wd-submission-type">
// //                             <option value="Online">Online</option>
// //                         </select>
// //                     </td>
// //                 </tr>
// //                 <tr>
// //                     <td></td>
// //                     <td>
// //                         <label>Online Entry Options</label><br />

// //                         <input type="checkbox" id="wd-text-entry" />
// //                         <label htmlFor="wd-text-entry">Text Entry</label><br />

// //                         <input type="checkbox" id="wd-website-url" />
// //                         <label htmlFor="wd-website-url">Website URL</label><br />

// //                         <input type="checkbox" id="wd-media-recordings" />
// //                         <label htmlFor="wd-media-recordings">Media Recordings</label><br />

// //                         <input type="checkbox" id="wd-student-annotation" />
// //                         <label htmlFor="wd-student-annotation">Student Annotation</label><br />

// //                         <input type="checkbox" id="wd-file-upload" />
// //                         <label htmlFor="wd-file-upload">File Uploads</label><br />
// //                     </td>
// //                 </tr>
// //                 <tr>
// //                     <td align="right" valign="top">
// //                         <label htmlFor="wd-assign-to">Assign</label>
// //                     </td>
// //                     <td>
// //                         <label htmlFor="wd-assign-to">Assign to</label><br />
// //                         <input type="text" id="wd-assign-to" value="Everyone" />
// //                     </td>
// //                 </tr>
// //                 <tr>
// //                     <td></td>
// //                     <td>
// //                         <label htmlFor="wd-due-date">Due</label><br />
// //                         <input type="date" id="wd-due-date" defaultValue="2024-08-07"/>
// //                     </td>
// //                 </tr>
// //                 <tr>
// //                     <td></td>
// //                     <td>
// //                         <label htmlFor="wd-available-from">Available from</label>
// //                         <label htmlFor="wd-available-until" style={{ marginLeft: '50px' }}>Until</label><br />
// //                         <input type="date" id="wd-available-from" defaultValue="2024-08-07"/>
// //                         <input type="date" id="wd-available-until" defaultValue="2024-08-07" style={{marginLeft: '30px'}} />
// //                     </td>
// //                 </tr>
// //             </table>
// //             <hr />
// //             <div style={{ textAlign: 'right' }}>
// //                 <button>Cancel</button>
// //                 <button>Save</button>
// //             </div>
// //         </div>
// //     );
// // }