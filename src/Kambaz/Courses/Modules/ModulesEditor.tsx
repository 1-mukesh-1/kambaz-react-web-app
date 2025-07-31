import { Modal, FormControl, Button } from "react-bootstrap";

export default function ModuleEditor({
    show,
    handleClose,
    dialogTitle,
    moduleName,
    setModuleName,
    onSave,
}: {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    moduleName: string;
    setModuleName: (name: string) => void;
    onSave: () => void;
}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    placeholder="New Module Name"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Add Module
                </Button>
            </Modal.Footer>
        </Modal>
    );
}