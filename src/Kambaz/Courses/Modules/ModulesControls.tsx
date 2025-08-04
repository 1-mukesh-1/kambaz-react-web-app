import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import { useState } from "react";
import ModuleEditor from "./ModulesEditor";

export default function ModulesControls({ addModule }: { addModule: (name: string) => void; }) {
    const [showEditor, setShowEditor] = useState(false);
    const [moduleName, setModuleName] = useState("");

    const handleShowEditor = () => setShowEditor(true);
    const handleCloseEditor = () => setShowEditor(false);

    const handleSaveModule = () => {
        addModule(moduleName);
        setModuleName("");
        handleCloseEditor();
    };

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn" onClick={handleShowEditor}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>
            <Dropdown className="float-end me-2">
                <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
                    <GreenCheckmark /> Publish All
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item id="wd-publish-all">
                        <GreenCheckmark /> Publish All
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-all-modules-and-items">
                        <GreenCheckmark /> Publish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-modules-only">
                        <GreenCheckmark /> Publish modules only
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                        Unpublish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-modules-only">
                        Unpublish modules only
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-view-progress">
                View Progress
            </Button>
            <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-collapse-all">
                Collapse All
            </Button>
            
            <ModuleEditor
                show={showEditor}
                handleClose={handleCloseEditor}
                dialogTitle="Add Module"
                moduleName={moduleName}
                setModuleName={setModuleName}
                onSave={handleSaveModule}
            />
        </div>
    );
}