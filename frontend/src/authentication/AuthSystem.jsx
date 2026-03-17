// src/authentication/AuthSystem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSystem({ compact = false }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: compact ? 0 : 30,
        textAlign: compact ? "left" : "center",
      }}
    >
      <button
        style={{
          background: "green",
          color: "white",
          padding: compact ? "8px 16px" : "12px 25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: compact ? "14px" : "18px",
          marginTop: compact ? 0 : "1px",
          lineHeight: 1.2,
        }}
        onClick={() => navigate("/glogin")}
      >
        Login / Sign Up
      </button>
    </div>
  );
}
