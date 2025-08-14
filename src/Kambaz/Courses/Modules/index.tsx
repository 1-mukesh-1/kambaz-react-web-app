import { Form, ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
    setModules,
    addModule,
    editModule,
    updateModule,
    deleteModule
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as courseClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const [moduleName, setModuleName] = useState("");

    const fetchModules = async () => {
        if (!cid) return;
        const modules = await courseClient.findModulesForCourse(cid);
        dispatch(setModules(modules));
    };

    const addModuleHandler = async () => {
        if (!cid) return;
        const newModule = await courseClient.createModuleForCourse(cid, {
            name: moduleName,
            course: cid,
        });
        dispatch(addModule(newModule));
        setModuleName("");
    };

    const deleteModuleHandler = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };

    const updateModuleHandler = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };

    useEffect(() => {
        fetchModules();
    }, [cid]);

    return (
        <div>
            <ModulesControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={addModuleHandler}
            />
            <br />
            <br />
            <br />
            <br />
            <ListGroup id="wd-modules" className="rounded-0">
                {modules.map((module: any) => (
                    <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            {!module.editing && module.name}
                            {module.editing && (
                                <Form.Control
                                    className="w-50 d-inline-block"
                                    value={module.name}
                                    onChange={(e) =>
                                        updateModuleHandler({ ...module, name: e.target.value })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            updateModuleHandler({ ...module, editing: false });
                                        }
                                    }}
                                />
                            )}
                            <ModuleControlButtons
                                moduleId={module._id}
                                editModule={(moduleId) => dispatch(editModule(moduleId))}
                                deleteModule={deleteModuleHandler}
                            />
                        </div>
                        {module.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {module.lessons.map((lesson: any) => (
                                    <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1">
                                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}
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