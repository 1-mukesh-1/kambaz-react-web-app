import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <span className="badge bg-light text-dark border rounded-pill me-2">40% of Total</span>
            <BsPlus className="fs-4 me-1" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}