import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, editModule } from "./reducer";
import { v4 as uuidv4 } from "uuid";

export default function Modules() {
    const { cid } = useParams();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();

    const handleAddModule = (name: string) => {
        dispatch(addModule({ name, course: cid, _id: uuidv4(), lessons: [] }));
    };

    return (
        <div>
            <ModulesControls addModule={handleAddModule} />
            <br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                {modules
                    .filter((module: any) => module.course === cid)
                    .map((module: any) => (
                        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray" key={module._id}>
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {!module.editing ? (
                                    module.name
                                ) : (
                                    <input
                                        className="form-control w-50 d-inline-block"
                                        defaultValue={module.name}
                                        onChange={(e) =>
                                            dispatch(updateModule({ ...module, name: e.target.value }))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                dispatch(updateModule({ ...module, editing: false }));
                                            }
                                        }}
                                    />
                                )}
                                <ModuleControlButtons
                                    moduleId={module._id}
                                    deleteModule={(moduleId: string) => dispatch(deleteModule(moduleId))}
                                    editModule={() => dispatch(editModule(module._id))}
                                />
                            </div>
                            {module.lessons && (
                                <ListGroup className="wd-lessons rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <ListGroup.Item className="wd-lesson p-3 ps-1" key={lesson._id}>
                                            <BsGripVertical className="me-2 fs-3" />
                                            {lesson.name}
                                            <LessonControlButtons />
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
}