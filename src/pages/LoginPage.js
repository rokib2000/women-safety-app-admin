import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("https://women-sepia-two.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <img src="https://i.ibb.co/wFTTQXLv/logo.png" alt="Logo" style={{ width: "100px", marginBottom: "20px" }} />
        <h2 style={{ marginBottom: "24px", color: "#333" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "16px",
              borderRadius: "6px",
              border: "1.8px solid #ccc",
              fontSize: "16px",
              transition: "border-color 0.3s",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "24px",
              borderRadius: "6px",
              border: "1.8px solid #ccc",
              fontSize: "16px",
              transition: "border-color 0.3s",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: isLoading ? "#ccc" : "#667eea",
              color: "white",
              fontWeight: "600",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  className="spinner"
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid transparent",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
