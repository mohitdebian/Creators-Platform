import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/posts", form);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          style={styles.textarea}
        />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
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
  input: {
    padding: 10,
    fontSize: 16,
    border: "1px solid #bbb",
    borderRadius: 5,
    outline: "none",
    background: "#fafbfc",
  },
  textarea: {
    minHeight: 80,
    padding: 10,
    fontSize: 16,
    border: "1px solid #bbb",
    borderRadius: 5,
    outline: "none",
    background: "#fafbfc",
  },
  button: {
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
  error: {
    color: "#e11d48",
    fontWeight: 500,
    marginTop: 8,
    textAlign: "center",
  },
};

export default CreatePost;
