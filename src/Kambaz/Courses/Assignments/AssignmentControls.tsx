import { FaPlus, FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";

export default function AssignmentControls() {
    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="position-relative" style={{ width: "300px" }}>
                    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    <input
                        type="text"
                        className="form-control ps-5"
                        placeholder="Search..."
                        style={{ 
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #dee2e6",
                            borderRadius: "0.375rem"
                        }}
                    />
                </div>
                <div>
                    <Button variant="secondary" className="me-2" size="lg">
                        <FaPlus className="me-1" /> Group
                    </Button>
                    <Button variant="danger" size="lg">
                        <FaPlus className="me-1" /> Assignment
                    </Button>
                </div>
            </div>
        </div>
    );
}