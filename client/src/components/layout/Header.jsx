
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function Header() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  return (
    <header style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <h2>My Platform</h2>
      <nav style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link to="/" style={{ color: "#fff" }}>Home</Link>
        {!loading && !isAuthenticated() && (
          <>
            <Link to="/login" style={{ color: "#fff" }}>Login</Link>
            <Link to="/register" style={{ color: "#fff" }}>Register</Link>
          </>
        )}
        {!loading && isAuthenticated() && (
          <>
            <span style={{ color: "#a5b4fc", fontWeight: 500 }}>
              Welcome, {user?.name || user?.email}!
            </span>
            <button onClick={logout} style={{ marginLeft: 8, background: "#e11d48", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", cursor: "pointer" }}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
