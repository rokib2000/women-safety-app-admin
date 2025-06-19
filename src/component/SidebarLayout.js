import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          height: "100vh",
          backgroundColor: "#1a202c",
          color: "#fff",
          padding: "20px",
          position: "fixed",
        }}
      >
        <h2>Admin Panel</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              marginBottom: "15px",
              cursor: "pointer",
              padding: "10px",
              backgroundColor: "#2d3748",
              borderRadius: "5px",
              textAlign: "center",
            }}
            onClick={() => navigate("/training-videos")}
          >
            Training Videos
          </li>
          <li
            style={{
              marginBottom: "15px",
              cursor: "pointer",
              padding: "10px",
              backgroundColor: "#2d3748",
              borderRadius: "5px",
              textAlign: "center",
            }}
            onClick={() => navigate("/reports")}
          >
            Reports
          </li>
          <li
            style={{
              marginBottom: "15px",
              cursor: "pointer",
              padding: "10px",
              backgroundColor: "#2d3748",
              borderRadius: "5px",
              textAlign: "center",
            }}
            onClick={() => navigate("/helplines")}
          >
            Helplines
          </li>
          <li
            style={{
              marginBottom: "15px",
              cursor: "pointer",
              padding: "10px",
              backgroundColor: "#2d3748",
              borderRadius: "5px",
              textAlign: "center",
            }}
            onClick={() => navigate("/UserDataPage")}
          >
            User Data
          </li>
        </ul>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px",
            backgroundColor: "#e53e3e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            textAlign: "center",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "250px", padding: "20px" }}>{children}</div>
    </div>
  );
};

export default SidebarLayout;
