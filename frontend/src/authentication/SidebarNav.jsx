import React from "react";
import { Sprout, ChevronRight, X, LogOut } from "lucide-react";

const SidebarNav = ({
  title,
  subtitle,
  sidebarOpen,
  onClose,
  features,
  activeFeature,
  onFeatureClick,
  showDescriptions = true,
  onLogout,
  logoutHover = false,
}) => {
  return (
    <div
      style={{
        width: sidebarOpen ? "320px" : "0",
        transition: "width 0.3s",
        backgroundColor: "white",
        borderRight: "1px solid #e5e7eb",
        overflowX: "hidden",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          padding: "24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background:
                    "linear-gradient(to bottom right, #4ade80, #16a34a)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sprout size={24} color="white" />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  {title}
                </h1>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                  {subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                padding: "4px",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: sidebarOpen ? "block" : "none",
              }}
            >
              <X size={16} color="#6b7280" />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;
              return (
                <button
                  key={idx}
                  onClick={() => onFeatureClick(feature.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: isActive ? "#f3f4f6" : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = "#f8fafc";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: feature.color,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color="white" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#1f2937",
                        fontSize: "14px",
                        margin: 0,
                      }}
                    >
                      {feature.label}
                    </p>
                    {showDescriptions && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        {feature.desc}
                      </p>
                    )}
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            marginTop: "auto",
            color: "#dc2626",
            fontWeight: "500",
            fontSize: "14px",
            transition: logoutHover ? "all 0.2s" : undefined,
          }}
          onMouseEnter={(e) => {
            if (logoutHover) {
              e.target.style.backgroundColor = "#fef2f2";
            }
          }}
          onMouseLeave={(e) => {
            if (logoutHover) {
              e.target.style.backgroundColor = "transparent";
            }
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarNav;
