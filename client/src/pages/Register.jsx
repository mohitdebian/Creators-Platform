
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    if (!name) newErrors.name = "Name is required";
    else if (name.length < 2) newErrors.name = "Name must be at least 2 characters";
    else if (name.length > 50) newErrors.name = "Name must be at most 50 characters";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Registration successful! Redirecting to login...");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      toast.error("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign Up for Creator's Platform</h1>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <div style={styles.fieldGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your name"
            autoComplete="name"
          />
          {errors.name && <div style={styles.error}>{errors.name}</div>}
        </div>
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
            placeholder="Create a password"
            autoComplete="new-password"
          />
          {errors.password && <div style={styles.error}>{errors.password}</div>}
        </div>
        <div style={styles.fieldGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            placeholder="Re-enter your password"
            autoComplete="new-password"
          />
          {errors.confirmPassword && <div style={styles.error}>{errors.confirmPassword}</div>}
        </div>
        <button
          type="submit"
          style={{ ...styles.button, ...(isLoading ? styles.buttonDisabled : {}) }}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <p style={{ marginTop: 24 }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

// CSS-in-JS styles
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
  success: {
    color: "#059669",
    fontWeight: 500,
    marginTop: 14,
    textAlign: "center",
  },
};

export default Register;
