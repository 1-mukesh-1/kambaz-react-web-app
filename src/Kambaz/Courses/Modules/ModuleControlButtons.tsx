import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

export default function ModuleControlButtons({
	moduleId,
	deleteModule,
	editModule,
}: {
	moduleId: string;
	deleteModule: (moduleId: string) => void;
	editModule: (moduleId: string) => void;
}) {
	return (
		<div className="float-end">
			<FaPencilAlt
				onClick={() => editModule(moduleId)}
				className="text-primary me-3"
				style={{ cursor: "pointer" }}
			/>
			<FaTrash
				onClick={() => deleteModule(moduleId)}
				className="text-danger me-2 mb-1"
				style={{ cursor: "pointer" }}
			/>
			<GreenCheckmark />
			<BsPlus className="fs-4" />
			<IoEllipsisVertical className="fs-4" />
		</div>
	);
}