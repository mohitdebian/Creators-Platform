


import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Dashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [fetching, setFetching] = useState(false);
  const limit = 10;

  useEffect(() => {
    if (!isAuthenticated()) return;
    const fetchPosts = async () => {
      setFetching(true);
      try {
        const res = await api.get(`/api/posts?page=${page}&limit=${limit}`);
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
        setTotal(res.data.total);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch posts.");
      } finally {
        setFetching(false);
      }
    };
    fetchPosts();
  }, [page, isAuthenticated]);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }
  if (!isAuthenticated()) {
    window.location.href = "/login";
    return null;
  }

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const prevPosts = [...posts];
      setPosts(posts.filter((post) => post._id !== postId));

      try {
        await api.delete(`/api/posts/${postId}`);
        toast.success("Post deleted successfully");
      } catch (err) {
        setPosts(prevPosts);
        toast.error(err.response?.data?.message || "Failed to delete post");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <div style={styles.infoBox}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={logout} style={styles.logoutButton}>Logout</button>
      </div>
      <div style={{ margin: "24px 0", textAlign: "center" }}>
        <Link to="/create" style={styles.createBtn}>+ Create New Post</Link>
      </div>
      <h2 style={{ textAlign: "center", marginBottom: 12 }}>Your Posts</h2>
      {fetching ? (
        <div style={{ textAlign: "center" }}>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>No posts found.</div>
      ) : (
        <>
          <div style={styles.postsList}>
            {posts.map((post) => (
              <div key={post._id} style={styles.postCard}>
                <h3 style={{ margin: 0 }}>{post.title}</h3>
                <p style={{ margin: "8px 0 0 0", color: "#444" }}>{post.content}</p>
                <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                  {new Date(post.createdAt).toLocaleString()}
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: "8px" }}>
                  <Link to={`/edit/${post._id}`} style={styles.editBtn}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.pagination}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={styles.pageBtn}
            >
              Previous
            </button>
            <span style={{ margin: "0 12px" }}>
              Page {page} of {totalPages} ({total} posts)
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={styles.pageBtn}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
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
  createBtn: {
    display: "inline-block",
    padding: "8px 18px",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: 5,
    fontWeight: 600,
    textDecoration: "none",
    fontSize: 16,
    marginBottom: 8,
  },
  postsList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
  },
  postCard: {
    border: "1px solid #bbb",
    borderRadius: 6,
    padding: 16,
    background: "#fafbfc",
    boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  pageBtn: {
    padding: "6px 14px",
    fontSize: 15,
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 500,
    transition: "background 0.2s",
    opacity: 1,
    margin: 0,
    minWidth: 80,
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  error: {
    color: "#e11d48",
    fontWeight: 500,
    marginTop: 8,
    textAlign: "center",
  },
  editBtn: {
    padding: "6px 14px",
    fontSize: 13,
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 500,
    textDecoration: "none",
  },
  deleteBtn: {
    padding: "6px 14px",
    fontSize: 13,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 500,
  },
};

export default Dashboard;
