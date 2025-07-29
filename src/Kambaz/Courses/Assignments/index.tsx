import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { BsGripVertical, BsCaretDownFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import GreenCheckmark from "../GreenCheckmark";
import * as db from "../../Database";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;
    return (
        <div>
            <AssignmentControls /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-assignments">
                <ListGroup.Item className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <BsCaretDownFill className="me-2" />
                        ASSIGNMENTS <AssignmentControlButtons />
                    </div>
                    <ListGroup className="wd-assignment-list rounded-0">
                        {assignments
                            .filter((assignment) => assignment.course === cid)
                            .map((assignment) => (
                                <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 wd-lesson" key={assignment._id}>
                                    <BsGripVertical className="me-2 fs-3" />
                                    <FaFileAlt className="me-2 fs-4 text-success" />
                                    <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="text-decoration-none text-dark">
                                        <strong>{assignment.title}</strong>
                                    </Link>
                                    <div className="float-end">
                                        <GreenCheckmark />
                                        <IoEllipsisVertical className="fs-4" />
                                    </div>
                                    <br />
                                    <span className="text-danger">Multiple Modules</span>
                                    <span className="text-muted"> | <strong>Not available until</strong> {assignment.availability_date} | </span>
                                    <br />
                                    <span className="text-muted">
                                        Due {assignment.due} | {assignment.points} pts
                                    </span>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

// import { ListGroup } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { BsGripVertical, BsCaretDownFill } from "react-icons/bs";
// import { FaFileAlt } from "react-icons/fa";
// import { IoEllipsisVertical } from "react-icons/io5";
// import AssignmentControls from "./AssignmentControls";
// import AssignmentControlButtons from "./AssignmentControlButtons";
// import GreenCheckmark from "../GreenCheckmark";

// export default function Assignments() {
//     return (
//         <div>
//             <AssignmentControls /><br /><br /><br /><br />
//             <ListGroup className="rounded-0" id="wd-assignments">
//                 <ListGroup.Item className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
//                     <div className="wd-title p-3 ps-2 bg-secondary">
//                         <BsGripVertical className="me-2 fs-3" /> 
//                         <BsCaretDownFill className="me-2" />
//                         ASSIGNMENTS <AssignmentControlButtons />
//                     </div>
//                     <ListGroup className="wd-assignment-list rounded-0">
//                         <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 wd-lesson">
//                             <BsGripVertical className="me-2 fs-3" />
//                             <FaFileAlt className="me-2 fs-4 text-success" />
//                             <Link to="/Kambaz/Courses/1234/Assignments/123" className="text-decoration-none text-dark">
//                                 <strong>A1</strong>
//                             </Link>
//                             <div className="float-end">
//                                 <GreenCheckmark />
//                                 <IoEllipsisVertical className="fs-4" />
//                             </div>
//                             <br />
//                             <span className="text-danger">Multiple Modules</span>
//                             <span className="text-muted"> | <strong>Not available until</strong> May 6 at 12:00am | </span>
//                             <br />
//                             <span className="text-muted"><strong>Due</strong> May 13 at 11:59pm | 100 pts</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 wd-lesson">
//                             <BsGripVertical className="me-2 fs-3" />
//                             <FaFileAlt className="me-2 fs-4 text-success" />
//                             <Link to="/Kambaz/Courses/1234/Assignments/124" className="text-decoration-none text-dark">
//                                 <strong>A2</strong>
//                             </Link>
//                             <div className="float-end">
//                                 <GreenCheckmark />
//                                 <IoEllipsisVertical className="fs-4" />
//                             </div>
//                             <br />
//                             <span className="text-danger">Multiple Modules</span>
//                             <span className="text-muted"> | <strong>Not available until</strong> May 13 at 12:00am | </span>
//                             <br />
//                             <span className="text-muted"><strong>Due</strong> May 20 at 11:59pm | 100 pts</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 wd-lesson">
//                             <BsGripVertical className="me-2 fs-3" />
//                             <FaFileAlt className="me-2 fs-4 text-success" />
//                             <Link to="/Kambaz/Courses/1234/Assignments/125" className="text-decoration-none text-dark">
//                                 <strong>A3</strong>
//                             </Link>
//                             <div className="float-end">
//                                 <GreenCheckmark />
//                                 <IoEllipsisVertical className="fs-4" />
//                             </div>
//                             <br />
//                             <span className="text-danger">Multiple Modules</span>
//                             <span className="text-muted"> | <strong>Not available until</strong> May 20 at 12:00am | </span>
//                             <br />
//                             <span className="text-muted"><strong>Due</strong> May 27 at 11:59pm | 100 pts</span>
//                         </ListGroup.Item>
//                     </ListGroup>
//                 </ListGroup.Item>
//             </ListGroup>
//         </div>
//     );
// }
