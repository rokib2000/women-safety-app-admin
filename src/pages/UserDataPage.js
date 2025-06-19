import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Alert, Spinner, Container } from "react-bootstrap";
import SidebarLayout from "../component/SidebarLayout";

const UserDataPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://women-sepia-two.vercel.app/api/auth/users");
      if (response.data && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to fetch users data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SidebarLayout>
      <Container className="mt-4">
        <h3 className="text-center mb-4">User Data</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Table bordered hover responsive="sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </SidebarLayout>
  );
};

export default UserDataPage;
