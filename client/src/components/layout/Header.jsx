import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <h2>My Platform</h2>

      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/" style={{ color: "#fff" }}>
          Home
        </Link>
        <Link to="/login" style={{ color: "#fff" }}>
          Login
        </Link>
        <Link to="/register" style={{ color: "#fff" }}>
          Register
        </Link>
      </nav>
    </header>
  );
}

export default Header;
