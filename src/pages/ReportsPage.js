import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import SidebarLayout from "../component/SidebarLayout";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    address: "",
    evidence: "",
    status: "pending",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchReports = async () => {
    try {
      const response = await axios.get("https://women-sepia-two.vercel.app/api/rcm");
      if (response.data && Array.isArray(response.data.data)) {
        setReports(response.data.data);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error("Failed to fetch reports", err);
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await axios.put(`https://women-sepia-two.vercel.app/api/rcm/${editData._id}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await axios.post("https://women-sepia-two.vercel.app/api/rcm/add", formData, {
          headers: { "Content-Type": "application/json" },
        });
      }
      setFormData({
        description: "",
        address: "",
        evidence: "",
        status: "pending",
      });
      setEditData(null);
      setShowModal(false);
      fetchReports();
      setSuccess("Report saved successfully!");
      setError("");
    } catch (err) {
      console.error("Failed to save report:", err.response || err.message);
      setError("Failed to save report!");
      setSuccess("");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      description: item.description,
      address: item.address,
      evidence: item.evidence,
      status: item.status,
    });
    setEditData(item);
    setShowModal(true);
    setSuccess("");
    setError("");
  };

  // Open delete confirmation modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Delete after confirmation
  const handleDelete = async () => {
    try {
      await axios.delete(`https://women-sepia-two.vercel.app/api/rcm/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchReports();
      setSuccess("Report deleted successfully!");
      setError("");
    } catch (err) {
      setError("Failed to delete report!");
      setSuccess("");
    }
  };

  return (
    <SidebarLayout>
      <h2 className="text-center mb-4">Reports</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* <Button
        variant="primary"
        onClick={() => {
          setShowModal(true);
          setEditData(null);
          setFormData({ description: "", address: "", evidence: "", status: "pending" });
          setSuccess("");
          setError("");
        }}
        className="mb-3"
      >
        Add Report
      </Button> */}

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Address</th>
            <th>Evidence</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.description}</td>
                <td>{item.address}</td>
                <td>
                  <a href={item.evidence} target="_blank" rel="noopener noreferrer">
                    View Evidence
                  </a>
                </td>
                <td>{item.status}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(item)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => confirmDelete(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No reports available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit Report" : "Add Report"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                rows={3}
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEvidence">
              <Form.Label>Evidence URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter evidence URL"
                value={formData.evidence}
                onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                disabled
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this report?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </SidebarLayout>
  );
};

export default ReportsPage;
