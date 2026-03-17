import React from "react";
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";

const HeroPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/assets/Hero_Page.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          px: { xs: 2, sm: 6, md: 8 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h3"}
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Empowering India’s Small Scale Farmers to Grow Confidently and Profitably
        </Typography>
        <Typography
  variant={isMobile ? "body1" : "h5"}
  textAlign="center"
  sx={{ lineHeight: 1.6, color: "#fff" }} // base white for readability
>
  Guided by{" "}
  <Box component="span" sx={{ fontWeight: "bold", color: "#FFD700" }}>
    science
  </Box>
  ,{" "}
  <Box component="span" sx={{ fontWeight: "bold", color: "#FFA500" }}>
    mentorship
  </Box>
  , and{" "}
  <Box component="span" sx={{ fontWeight: "bold", color: "#00BFFF" }}>
    data-driven insights
  </Box>
  , every farm can reach its{" "}
  <Box component="span" sx={{ fontWeight: "bold", color: "#FFD700" }}>
    full potential
  </Box>
  .
</Typography>
      </Box>
    </Box>
  );
};

export default HeroPage;
