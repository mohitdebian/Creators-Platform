import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <p>Login form will be added here later.</p>

      <p>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
