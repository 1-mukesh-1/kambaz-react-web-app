import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { BsGripVertical, BsCaretDownFill } from "react-icons/bs";
import { FaFileAlt, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import GreenCheckmark from "../GreenCheckmark";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();

    return (
        <div>
            <AssignmentControls />
            <br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-assignments">
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
                                <ListGroup.Item className="wd-assignment-list-item p-3 ps-1 wd-lesson" key={assignment._id}>
                                    <BsGripVertical className="me-2 fs-3" />
                                    <FaFileAlt className="me-2 fs-4 text-success" />
                                    <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="text-decoration-none text-dark">
                                        <strong>{assignment.title}</strong>
                                    </Link>
                                    <div className="float-end">
                                        <FaTrash className="text-danger me-2 mb-1" onClick={() => dispatch(deleteAssignment(assignment._id))} />
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
