import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${id}`);
        setForm({
          title: res.data.post.title,
          content: res.data.post.content,
        });
      } catch (err) {
        toast.error("Failed to fetch post or unauthorized.");
      } finally {
        setFetching(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setLoading(true);
    try {
      await api.put(`/api/posts/${id}`, form);
      toast.success("Post updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div style={{ padding: 20 }}>Loading post data...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Post</h2>
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
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={() => navigate("/dashboard")} style={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Updating..." : "Update Post"}
          </button>
        </div>
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
    flex: 1,
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
  cancelBtn: {
    flex: 1,
    padding: "10px 0",
    fontSize: 18,
    background: "#9ca3af",
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

export default EditPost;
