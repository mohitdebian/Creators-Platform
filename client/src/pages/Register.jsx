import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Account</h1>
      <p>Registration form will be added here later.</p>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
