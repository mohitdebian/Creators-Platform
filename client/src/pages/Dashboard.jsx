

import React from "react";
import { useAuth } from "../context/AuthContext";


function Dashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }
  if (!isAuthenticated()) {
    // Optionally, you could use Navigate from react-router-dom for redirect
    window.location.href = "/login";
    return null;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <div style={styles.infoBox}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={logout} style={styles.logoutButton}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 24,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#222",
  },
  infoBox: {
    padding: 16,
    borderRadius: 8,
    background: "#f3f4f6",
    marginBottom: 16,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 16,
    padding: "8px 16px",
    fontSize: 16,
    background: "#e11d48",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s",
  },
};

export default Dashboard;
