import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import GoogleTranslate from "../googletranslate/GoogleTranslate";
import { useNavigate } from "react-router-dom";
import AuthSystem from "../authentication/AuthSystem";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: "#ffffff",
        color: "#000",
        fontFamily: "'Poppins', sans-serif",
        width: "100%",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          px: 3,
          minHeight: "80px !important",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              letterSpacing: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            AgroVihan
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flex: 1,
            justifyContent: "flex-end",
            flexWrap: "wrap",
            rowGap: 1,
            minWidth: 0,
          }}
        >
          <Button
            sx={{
              color: "#000",
              fontWeight: "bold",
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            sx={{
              color: "#000",
              fontWeight: "bold",
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/about")}
          >
            About
          </Button>
          <Button
            sx={{
              color: "#000",
              fontWeight: "bold",
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/features")}
          >
            Features
          </Button>
          {/* google translate and auth system */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // vertical alignment
              justifyContent: "flex-end", // or "center" if you want it centered
              gap: 2, // spacing between children
              height: "100%",
            }}
          >
            <GoogleTranslate compact />
            <AuthSystem compact />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
