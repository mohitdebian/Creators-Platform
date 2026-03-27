import React from "react";
import ConnectionTest from "../components/common/ConnectionTest";
function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to My Platform</h1>
      <p>This is a platform where creators can share their content.</p>

      <h3>Features:</h3>
      <ul>
        <li>Create and share content</li>
        <li>Connect with others</li>
        <li>Grow your audience</li>
      </ul>

      {/* Backend Connection Test */}
      <ConnectionTest />
    </div>
  );
}

export default Home;
