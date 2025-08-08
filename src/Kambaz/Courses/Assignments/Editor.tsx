import { Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editing = aid !== "new";

  const [assignment, setAssignment] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const handleUpdateAssignment = async (assignment: any) => {
    const updated = await assignmentsClient.updateAssignment(assignment._id, assignment);
    dispatch(updateAssignment(updated));
  };

  const addNewAssignment = async (assignment: any) => {
    const newAssignment = await assignmentsClient.createAssignment(assignment);
    dispatch(addAssignment(newAssignment));
  };

  const fetchAssignment = async () => {
    if (editing && aid) {
      const data = await assignmentsClient.findAssignmentById(aid);
      setAssignment(data);
      setTitle(data?.title || "");
      setDescription(data?.description || "");
      setPoints(data?.points || 100);
      setDueDate(data?.dueDate || "");
      setAvailableDate(data?.availableDate || "");
      setAvailableUntil(data?.availableUntil || "");
    } else {
      const now = new Date().toISOString().slice(0, 16);
      setDueDate(now);
      setAvailableDate(now);
      setAvailableUntil(now);
    }
  };

  const handleSaveAssignment = async () => {
    const newAssignment = {
      title,
      description,
      points,
      dueDate,
      availableDate,
      availableUntil,
      course: cid,
    };

    if (editing && assignment?._id) {
      await handleUpdateAssignment({ ...assignment, ...newAssignment });
    } else {
      await addNewAssignment(newAssignment);
    }

    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  useEffect(() => {
    fetchAssignment();
  }, [aid]);

  if (editing && !assignment) {
    return <div className="p-4">Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form.Group className="mb-3" controlId="wd-name">
        <Col xs={6}>
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3" controlId="wd-description">
        <Col xs={6}>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label htmlFor="wd-points" className="d-flex justify-content-start">
            Points
          </Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label htmlFor="wd-due-date" className="d-flex justify-content-start">
            Due:
          </Form.Label>
          <Form.Control
            type="datetime-local"
            id="wd-due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label htmlFor="wd-available-from" className="d-flex justify-content-start">
            Available from
          </Form.Label>
          <Form.Control
            type="datetime-local"
            id="wd-available-from"
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label htmlFor="wd-available-until" className="d-flex justify-content-start">
            Until
          </Form.Label>
          <Form.Control
            type="datetime-local"
            id="wd-available-until"
            value={availableUntil}
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </Col>
      </Row>

      <hr />
      <Row>
        <Col xs={{ span: 4 }} className="d-flex justify-content-end">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <button onClick={handleSaveAssignment} className="btn btn-danger">
            Save
          </button>
        </Col>
      </Row>
    </div>
  );
}
