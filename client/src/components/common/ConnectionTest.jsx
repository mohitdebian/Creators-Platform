import React, { useState } from "react";

const ConnectionTest = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/health", { credentials: "include" });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setStatus({ success: true, message: data.status || "Success: Server is running!" });
    } catch (err) {
      setStatus({ success: false, message: "Failed to connect to server: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, marginTop: 32 }}>
      <h2>Backend Connection Test</h2>
      <button onClick={testConnection} disabled={loading} style={{ padding: "8px 16px", fontSize: 16 }}>
        {loading ? "Testing..." : "Test Connection"}
      </button>
      {status && (
        <div style={{ marginTop: 16, color: status.success ? "green" : "red" }}>
          {status.success ? "✅ " : "❌ "}{status.message}
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;
