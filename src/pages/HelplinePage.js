// import React, { useState, useEffect } from "react";
// import SidebarLayout from "../component/SidebarLayout";

// const HelplinePage = () => {
//   const API_URL = "https://women-sepia-two.vercel.app/api/hr";

//   const [helplines, setHelplines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Modal visibility
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);

//   // Form state for Add/Edit
//   const [form, setForm] = useState({
//     title: "",
//     contactNumber: "",
//     description: "",
//     address: "",
//   });

//   // For editing
//   const [editingId, setEditingId] = useState(null);

//   // Fetch helplines
//   const fetchHelplines = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error(`Error: ${res.status}`);
//       const data = await res.json();

//       // Adjust if data is inside a key like `data`
//       const list = Array.isArray(data) ? data : data.data || [];
//       setHelplines(list);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHelplines();
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   // Open Add Modal & reset form
//   const openAddModal = () => {
//     setForm({
//       title: "",
//       contactNumber: "",
//       description: "",
//       address: "",
//     });
//     setShowAddModal(true);
//   };

//   // Open Edit Modal & fill form
//   const openEditModal = (helpline) => {
//     setForm({
//       title: helpline.title || "",
//       contactNumber: helpline.contactNumber || "",
//       description: helpline.description || "",
//       address: helpline.address || "",
//     });
//     setEditingId(helpline._id || helpline.id);
//     setShowEditModal(true);
//   };

//   // Close modals
//   const closeAddModal = () => setShowAddModal(false);
//   const closeEditModal = () => setShowEditModal(false);

//   // Submit Add form
//   const handleAddSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API_URL}/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) throw new Error(`Error: ${res.status}`);

//       alert("Helpline added successfully!");
//       closeAddModal();
//       fetchHelplines();
//     } catch (err) {
//       alert("Failed to add helpline: " + err.message);
//     }
//   };

//   // Submit Edit form
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API_URL}/edit/${editingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) throw new Error(`Error: ${res.status}`);

//       alert("Helpline updated successfully!");
//       closeEditModal();
//       fetchHelplines();
//     } catch (err) {
//       alert("Failed to update helpline: " + err.message);
//     }
//   };

//   // Delete helpline
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this helpline?")) return;

//     try {
//       const res = await fetch(`${API_URL}/delete/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error(`Error: ${res.status}`);

//       alert("Helpline deleted successfully!");
//       fetchHelplines();
//     } catch (err) {
//       alert("Failed to delete helpline: " + err.message);
//     }
//   };

//   return (
//     <SidebarLayout>
//       <div className="container mt-5">
//         <h1 className="mb-4 text-center">Helpline Directory</h1>

//         {/* Button to open Add Modal */}
//         <div className=" mb-4">
//           <button className="btn btn-primary" onClick={openAddModal}>
//             Add New Helpline
//           </button>
//         </div>

//         {/* Loading & Error */}
//         {loading && <p>Loading helplines...</p>}
//         {error && <p className="text-danger">Error: {error}</p>}

//         {/* Helpline List */}
//         {!loading && !error && (
//           <>
//             {helplines.length === 0 ? (
//               <p>No helplines found.</p>
//             ) : (
//               <ul className="list-group">
//                 {helplines.map((h) => (
//                   <li key={h._id || h.id} className="list-group-item d-flex justify-content-between align-items-start">
//                     <div>
//                       <h5>{h.title || "No Title"}</h5>
//                       <p>Contact: {h.contactNumber || "N/A"}</p>
//                       {h.description && <p>{h.description}</p>}
//                       {h.address && <p>Address: {h.address}</p>}
//                     </div>
//                     <div>
//                       <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(h)}>
//                         Edit
//                       </button>
//                       <button className="btn btn-danger btn-sm" onClick={() => handleDelete(h._id || h.id)}>
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </>
//         )}

//         {/* Add Modal */}
//         {showAddModal && (
//           <div
//             className="modal fade show d-block"
//             tabIndex="-1"
//             role="dialog"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//           >
//             <div className="modal-dialog" role="document">
//               <div className="modal-content">
//                 <form onSubmit={handleAddSubmit}>
//                   <div className="modal-header">
//                     <h5 className="modal-title">Add New Helpline</h5>
//                     <button type="button" className="btn-close" onClick={closeAddModal}></button>
//                   </div>
//                   <div className="modal-body">
//                     <div className="mb-3">
//                       <label className="form-label">Title</label>
//                       <input
//                         type="text"
//                         name="title"
//                         className="form-control"
//                         value={form.title}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Contact Number</label>
//                       <input
//                         type="text"
//                         name="contactNumber"
//                         className="form-control"
//                         value={form.contactNumber}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Description</label>
//                       <textarea
//                         name="description"
//                         className="form-control"
//                         value={form.description}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Address</label>
//                       <textarea name="address" className="form-control" value={form.address} onChange={handleChange} />
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" onClick={closeAddModal}>
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn btn-primary">
//                       Add Helpline
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Modal */}
//         {showEditModal && (
//           <div
//             className="modal fade show d-block"
//             tabIndex="-1"
//             role="dialog"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//           >
//             <div className="modal-dialog" role="document">
//               <div className="modal-content">
//                 <form onSubmit={handleEditSubmit}>
//                   <div className="modal-header">
//                     <h5 className="modal-title">Edit Helpline</h5>
//                     <button type="button" className="btn-close" onClick={closeEditModal}></button>
//                   </div>
//                   <div className="modal-body">
//                     <div className="mb-3">
//                       <label className="form-label">Title</label>
//                       <input
//                         type="text"
//                         name="title"
//                         className="form-control"
//                         value={form.title}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Contact Number</label>
//                       <input
//                         type="text"
//                         name="contactNumber"
//                         className="form-control"
//                         value={form.contactNumber}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Description</label>
//                       <textarea
//                         name="description"
//                         className="form-control"
//                         value={form.description}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Address</label>
//                       <textarea name="address" className="form-control" value={form.address} onChange={handleChange} />
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn btn-primary">
//                       Update Helpline
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </SidebarLayout>
//   );
// };

// export default HelplinePage;

//
//
//
//
//
//
//
//

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Form, Alert, Container, Row, Col } from "react-bootstrap";
import SidebarLayout from "../component/SidebarLayout"; // নিশ্চিত করো export default

const HelplinePage = () => {
  const [helplines, setHelplines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contactNumber: "",
    category: "",
    location: {
      geo: { lat: "", lng: "" },
      addressLine: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const userId = "684755e0698aef046897e7f4";

  const fetchHelplines = async () => {
    try {
      const res = await axios.get("https://women-sepia-two.vercel.app/api/hr");
      setHelplines(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch helplines", err);
    }
  };

  useEffect(() => {
    fetchHelplines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lat" || name === "lng") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          geo: {
            ...prev.location.geo,
            [name]: value,
          },
        },
      }));
    } else if (["addressLine", "city", "state", "country", "pincode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const payload = {
        ...formData,
        contactNumber: Number(formData.contactNumber),
        createdBy: userId,
      };

      if (editData) {
        await axios.put(`https://women-sepia-two.vercel.app/api/hr/${editData._id}`, payload);
      } else {
        await axios.post("https://women-sepia-two.vercel.app/api/hr/add", payload);
      }
      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        contactNumber: "",
        category: "",
        location: {
          geo: { lat: "", lng: "" },
          addressLine: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        },
      });
      setEditData(null);
      fetchHelplines();
      setSuccess("Data saved successfully!");
    } catch (err) {
      setError("Failed to save data!");
      console.error(err);
    }
  };

  const handleEdit = (data) => {
    setFormData({
      title: data.title,
      description: data.description,
      contactNumber: data.contactNumber,
      category: data.category,
      location: {
        geo: {
          lat: data.location.geo.lat,
          lng: data.location.geo.lng,
        },
        addressLine: data.location.addressLine,
        city: data.location.city,
        state: data.location.state,
        country: data.location.country,
        pincode: data.location.pincode,
      },
    });
    setEditData(data);
    setShowModal(true);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://women-sepia-two.vercel.app/api/hr/${_id}`);
      fetchHelplines();
      setSuccess("Data deleted successfully!");
    } catch (err) {
      setError("Failed to delete data!");
      console.error(err);
    }
  };

  return (
    <SidebarLayout>
      <Container>
        <h2 className="my-4 text-center">Helpline List</h2>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Button className="mb-3" onClick={() => setShowModal(true)}>
          Add Helpline
        </Button>

        <Row>
          {helplines.map((helpline) => (
            <Col key={helpline._id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{helpline.title}</Card.Title>
                  <Card.Text>{helpline.description}</Card.Text>
                  <Card.Text>
                    <strong>Contact: </strong> {helpline.contactNumber}
                  </Card.Text>
                  <Card.Text>
                    <strong>Category: </strong> {helpline.category}
                  </Card.Text>
                  <Card.Text>
                    <strong>Address: </strong>
                    {helpline.location.addressLine}, {helpline.location.city}, {helpline.location.state},{" "}
                    {helpline.location.country} - {helpline.location.pincode}
                  </Card.Text>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(helpline)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(helpline._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for Add/Edit */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{editData ? "Edit Helpline" : "Add Helpline"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="number"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5>Location Details</h5>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      step="any"
                      name="lat"
                      value={formData.location.geo.lat}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      step="any"
                      name="lng"
                      value={formData.location.geo.lng}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address Line</Form.Label>
                    <Form.Control
                      type="text"
                      name="addressLine"
                      value={formData.location.addressLine}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.location.city}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.location.state}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={formData.location.country}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="text"
                      name="pincode"
                      value={formData.location.pincode}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="primary">
                {editData ? "Update" : "Add"} Helpline
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </SidebarLayout>
  );
};

export default HelplinePage;
