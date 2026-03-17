import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Typography, Button, Alert, CircularProgress } from "@mui/material";

export default function GLogin() {
  const navigate = useNavigate();
  const { signInWithGoogle, pendingRedirect } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRedirectOption, setShowRedirectOption] = useState(false);

  useEffect(() => {
    if (pendingRedirect) {
      setLoading(true);
      setError("Completing login... Please wait.");
    }
  }, [pendingRedirect]);

  const handleGoogleLogin = async (useRedirect = false) => {
    setError("");
    setLoading(true);
    setShowRedirectOption(false);

    try {
      const user = await signInWithGoogle(useRedirect);
      if (!useRedirect && user) {
        navigate("/select-role");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "popup-blocked") {
        setError(err.message);
        setShowRedirectOption(true);
      } else {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  const handleRedirectLogin = () => handleGoogleLogin(true);
  const clearError = () => {
    setError("");
    setShowRedirectOption(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, rgba(237,247,238,0.9) 0%, rgba(222,237,230,0.9) 100%)",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "400px" },
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "700",
            mb: 3,
            color: "#2e7d32", // Agrovihan green
          }}
        >
          Welcome to Agrovihan
        </Typography>

        {error && (
          <Alert
            severity="error"
            onClose={clearError}
            sx={{ mb: 2, textAlign: "left", fontSize: "14px" }}
          >
            {error}
          </Alert>
        )}

        <Button
          onClick={() => handleGoogleLogin(false)}
          disabled={loading}
          fullWidth
          startIcon={
            loading ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : null
          }
          sx={{
            backgroundColor: "#2e7d32",
            color: "#fff",
            fontWeight: "600",
            py: 1.5,
            mb: 2,
            "&:hover": { backgroundColor: "#1b5e20" },
            textTransform: "none",
          }}
        >
          {loading ? "Signing in..." : "Login with Google"}
        </Button>

        {showRedirectOption && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography sx={{ fontSize: 13, mb: 1, color: "#555" }}>
              Popup blocked? Try this:
            </Typography>
            <Button
              onClick={handleRedirectLogin}
              fullWidth
              sx={{
                backgroundColor: "#558b2f",
                color: "#fff",
                fontWeight: "600",
                py: 1.2,
                "&:hover": { backgroundColor: "#33691e" },
                textTransform: "none",
              }}
            >
              Login with Redirect
            </Button>
          </Box>
        )}

        <Typography
          sx={{
            fontSize: 12,
            mt: 3,
            color: "#666",
            textAlign: "left",
            lineHeight: 1.5,
          }}
        >
          Tip: Use redirect login if popups are blocked. Make sure your browser
          allows popups for a smooth experience.
        </Typography>
      </Box>
    </Box>
  );
}