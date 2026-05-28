import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  return (
    <div style={{ padding: 40 }}>
      <h2>Bug Tracking System</h2>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={() => onLogin(username)}>
        Login
      </button>
    </div>
  );
}