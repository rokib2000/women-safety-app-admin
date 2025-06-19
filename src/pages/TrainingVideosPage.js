import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Form, Alert, Container, Row, Col } from "react-bootstrap";
import SidebarLayout from "../component/SidebarLayout";

const TrainingVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    videoURL: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    try {
      const response = await axios.get("https://women-sepia-two.vercel.app/api/tv");
      setVideos(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        createdBy: "684755e0698aef046897e7f4", // Replace with the logged-in user's ID dynamically
      };

      if (editData) {
        await axios.put(`https://women-sepia-two.vercel.app/api/tv/${editData._id}`, payload);
      } else {
        await axios.post("https://women-sepia-two.vercel.app/api/tv/add", payload);
      }
      setFormData({ title: "", videoURL: "" });
      setEditData(null);
      setShowModal(false);
      fetchVideos();
      setSuccess("Video saved successfully!");
    } catch (err) {
      setError("Failed to save video!");
    }
  };

  const handleEdit = (video) => {
    setFormData({ title: video.title, videoURL: video.videoURL });
    setEditData(video);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://women-sepia-two.vercel.app/api/tv/${id}`);
      fetchVideos();
      setSuccess("Video deleted successfully!");
    } catch (err) {
      setError("Failed to delete video!");
    }
  };

  return (
    <>
      <SidebarLayout>
        <h2 className="text-center mb-4">Training Videos</h2>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
          Add Video
        </Button>
        <Container>
          <Row>
            {videos.map((video) => (
              <Col key={video._id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{video.title}</Card.Title>
                    <Card.Text>
                      <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                        Watch Video
                      </a>
                    </Card.Text>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(video)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(video._id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editData ? "Edit Video" : "Add Video"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Video URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter video URL"
                  value={formData.videoURL}
                  onChange={(e) => setFormData({ ...formData, videoURL: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </SidebarLayout>
    </>
  );
};

export default TrainingVideosPage;
