import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
    const { cid } = useParams();
    const modules = db.modules;
    return (
        <div>
            <ModulesControls /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                {modules
                    .filter((module) => module.course === cid)
                    .map((module) => (
                        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray" key={module._id}>
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {module.name}
                                <ModuleControlButtons />
                            </div>
                            {module.lessons && (
                                <ListGroup className="wd-lessons rounded-0">
                                    {module.lessons.map((lesson) => (
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

// import { ListGroup } from "react-bootstrap";
// import ModulesControls from "./ModulesControls";
// import { BsGripVertical } from "react-icons/bs";
// import ModuleControlButtons from "./ModuleControlButtons";
// import LessonControlButtons from "./LessonControlButtons";

// export default function Modules() {
//     return (
//         <div>
//             <ModulesControls /><br /><br /><br /><br />
//             <ListGroup className="rounded-0" id="wd-modules">
//                 <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//                     <div className="wd-title p-3 ps-2 bg-secondary">
//                         <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
//                     </div>
//                     <ListGroup className="wd-lessons rounded-0">
//                         <ListGroup.Item className="wd-lesson p-3 ps-1">
//                             <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="wd-lesson p-3 ps-1">
//                             <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="wd-lesson p-3 ps-1">
//                             <BsGripVertical className="me-2 fs-3" /> Learn what is Web Development <LessonControlButtons />
//                         </ListGroup.Item>
//                     </ListGroup>
//                 </ListGroup.Item>
//                 <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//                     <div className="wd-title p-3 ps-2 bg-secondary">
//                         <BsGripVertical className="me-2 fs-3" /> Week 2 <ModuleControlButtons />
//                     </div>
//                     <ListGroup className="wd-lessons rounded-0">
//                         <ListGroup.Item className="wd-lesson p-3 ps-1">
//                             <BsGripVertical className="me-2 fs-3" /> LESSON 1 <LessonControlButtons />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="wd-lesson p-3 ps-1">
//                             <BsGripVertical className="me-2 fs-3" /> LESSON 2 <LessonControlButtons />
//                         </ListGroup.Item>
//                     </ListGroup>
//                 </ListGroup.Item>
//             </ListGroup>
//         </div>
//     );
// }
