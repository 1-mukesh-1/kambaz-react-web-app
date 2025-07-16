import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsGripVertical, BsCaretDownFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import GreenCheckmark from "../GreenCheckmark";

export default function Assignments() {
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
                        <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 wd-lesson">
                            <BsGripVertical className="me-2 fs-3" />
                            <FaFileAlt className="me-2 fs-4 text-success" />
                            <Link to="/Kambaz/Courses/1234/Assignments/123" className="text-decoration-none text-dark">
                                <strong>A1</strong>
                            </Link>
                            <div className="float-end">
                                <GreenCheckmark />
                                <IoEllipsisVertical className="fs-4" />
                            </div>
                            <br />
                            <span className="text-danger">Multiple Modules</span>
                            <span className="text-muted"> | <strong>Not available until</strong> May 6 at 12:00am | </span>
                            <br />
                            <span className="text-muted"><strong>Due</strong> May 13 at 11:59pm | 100 pts</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 wd-lesson">
                            <BsGripVertical className="me-2 fs-3" />
                            <FaFileAlt className="me-2 fs-4 text-success" />
                            <Link to="/Kambaz/Courses/1234/Assignments/124" className="text-decoration-none text-dark">
                                <strong>A2</strong>
                            </Link>
                            <div className="float-end">
                                <GreenCheckmark />
                                <IoEllipsisVertical className="fs-4" />
                            </div>
                            <br />
                            <span className="text-danger">Multiple Modules</span>
                            <span className="text-muted"> | <strong>Not available until</strong> May 13 at 12:00am | </span>
                            <br />
                            <span className="text-muted"><strong>Due</strong> May 20 at 11:59pm | 100 pts</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 wd-lesson">
                            <BsGripVertical className="me-2 fs-3" />
                            <FaFileAlt className="me-2 fs-4 text-success" />
                            <Link to="/Kambaz/Courses/1234/Assignments/125" className="text-decoration-none text-dark">
                                <strong>A3</strong>
                            </Link>
                            <div className="float-end">
                                <GreenCheckmark />
                                <IoEllipsisVertical className="fs-4" />
                            </div>
                            <br />
                            <span className="text-danger">Multiple Modules</span>
                            <span className="text-muted"> | <strong>Not available until</strong> May 20 at 12:00am | </span>
                            <br />
                            <span className="text-muted"><strong>Due</strong> May 27 at 11:59pm | 100 pts</span>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}


// import { Link } from "react-router-dom";

// export default function Assignments() {
//     return (
//         <div>
//             <input placeholder="Search for Assignments"></input>
//             <button>+ Group</button>
//             <button>+ Assignment</button>
//             <h3>Assignments 40% of Total</h3> <button>+</button>
//             <ul id="wd-assignment-list">
//                 <li className="wd-assignment-list-item">
//                     <Link to="/Kambaz/Courses/1234/Assignments/123">A1 - ENV + HTML</Link>
//                     <br />
//                     Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
//                 </li>
//                 <li className="wd-assignment-list-item">
//                     <Link to="/Kambaz/Courses/1234/Assignments/123">A2 - CSS + BOOTSTRAP</Link>
//                     <br />
//                     Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts
//                 </li>
//                 <li className="wd-assignment-list-item">
//                     <Link to="/Kambaz/Courses/1234/Assignments/123">A3 - JAVASCRIPT + REACT</Link>
//                     <br />
//                     Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts
//                 </li>
//             </ul>

//             <h3>Quizes 10% of Total</h3>
//             <ul id="wd-quizzes-list">
//                 <li className="wd-assignment-list-item">
//                     <a href="#">Q1 - HTML</a>
//                 </li>
//             </ul>

//             <h3>Exams 20% of Total</h3>
//             <ul id="wd-exams-list">
//                 <li className="wd-assignment-list-item">
//                     <a href="#">Midterm</a>
//                 </li>
//             </ul>

//             <h3>Project 30% of Total</h3>
//             <ul id="wd-project-list">
//                 <li className="wd-assignment-list-item">
//                     <a href="#">Project</a>
//                 </li>
//             </ul>
//         </div>
//     );
// }