
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setApiError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setApiError("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login to Creator's Platform</h1>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <div style={styles.fieldGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your email"
            autoComplete="email"
          />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </div>
        <div style={styles.fieldGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          {errors.password && <div style={styles.error}>{errors.password}</div>}
        </div>
        <button
          type="submit"
          style={{ ...styles.button, ...(isLoading ? styles.buttonDisabled : {}) }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {apiError && <div style={styles.apiError}>{apiError}</div>}
      </form>
      <p style={{ marginTop: 24 }}>
        Dont have an account? <Link to="/register">Register here</Link>
      </p>
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  fieldGroup: {
    marginBottom: 8,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: 500,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    fontSize: 16,
    border: "1px solid #bbb",
    borderRadius: 5,
    outline: "none",
    marginBottom: 2,
    background: "#fafbfc",
  },
  button: {
    marginTop: 12,
    padding: "10px 0",
    fontSize: 18,
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s",
  },
  buttonDisabled: {
    background: "#a5b4fc",
    cursor: "not-allowed",
  },
  error: {
    color: "#e11d48",
    fontSize: 14,
    marginTop: 2,
  },
  apiError: {
    color: "#e11d48",
    fontWeight: 500,
    marginTop: 14,
    textAlign: "center",
  },
};

export default Login;
