import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
	const [assignment, setAssignment] = useState({
		id: 1,
		title: "NodeJS Assignment",
		description: "Create a NodeJS server with ExpressJS",
		due: "2021-10-10",
		completed: false,
		score: 0,
	});

	const [module, setModule] = useState({
		id: "Test_Module",
		name: "Testing Module",
		description: "Abc123",
		course: "GVFDR",
	});

	const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
	const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

	return (
		<div id="wd-working-with-objects">
			<h4>Modifying Properties</h4>
			<a
				id="wd-update-assignment-title"
				className="btn btn-primary float-end mb-2"
				href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
			>
				Update Title
			</a>
			<FormControl
				className="w-75 mb-3"
				id="wd-assignment-title"
				onChange={(e) =>
					setAssignment({ ...assignment, title: e.target.value })
				}
			/>

			<a
				className="btn btn-success float-end mb-2"
				href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
			>
				Update Score
			</a>
			<FormControl
				type="number"
				className="w-25 mb-3"
				id="wd-assignment-score"
				onChange={(e) =>
					setAssignment({ ...assignment, score: Number(e.target.value) })
				}
			/>

			<a
				className="btn btn-warning float-end mb-2"
				href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
			>
				Update Completed
			</a>
			<FormCheck
				className="mb-3"
				label="Completed"
				onChange={(e) =>
					setAssignment({ ...assignment, completed: e.target.checked })
				}
			/>

			<hr />
			<h3>Working With Module</h3>

			<a
				className="btn btn-primary float-end mb-2"
				href={`${MODULE_API_URL}/name/${module.name}`}
			>
				Update Module Name
			</a>
			<FormControl
				className="w-75 mb-3"
				onChange={(e) => setModule({ ...module, name: e.target.value })}
			/>

			<a
				className="btn btn-secondary float-end mb-2"
				href={`${MODULE_API_URL}/description/${module.description}`}
			>
				Update Description
			</a>
			<FormControl
				className="w-75 mb-3"
				onChange={(e) =>
					setModule({ ...module, description: e.target.value })
				}
			/>

			<hr />

			<h4>Retrieving Objects</h4>
			<a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}`}>
				Get Assignment
			</a>
			<hr />

			<h4>Retrieving Properties</h4>
			<a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/title`}>
				Get Title
			</a>
			<hr />
		</div>
	);
}
