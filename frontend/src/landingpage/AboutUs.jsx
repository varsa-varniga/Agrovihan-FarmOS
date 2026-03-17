import React from "react";
import { Container, Typography, Box, Grid, Divider } from "@mui/material";
import backgroundImage from "../assets/AboutUsBg.jpg";

const TelescopeIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="4"/><path d="M5.05 10.9A7 7 0 0 1 19 9"/><path d="m19 9 2-4.5"/><path d="m5 10-3 1"/><path d="m21 4.5-8.5 3"/><path d="M10 17v4"/><path d="M14 17v4"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M2 15h2M2 9h2M22 15h-2M22 9h-2M9 22v-2M15 22v-2"/>
  </svg>
);

const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);

const RouteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>
  </svg>
);

const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const RecycleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-2.766l2.1-3.5m7.655-8.234L8.615 2.768A1.83 1.83 0 0 0 6.102 4H4M4 4v4h4"/><path d="M17 19h2.185a1.83 1.83 0 0 0 1.57-2.766l-2.1-3.5m-7.655-8.234 4.38-1.506A1.83 1.83 0 0 1 17.9 4H20M20 4v4h-4"/><path d="m8.578 15.5.937-1.5H14.5l.937 1.5"/>
  </svg>
);

const visionPillars = [
  { Icon: UsersIcon,     label: "Farmer Inclusivity",      desc: "Empowering small, marginal, and first-generation farmers across India." },
  { Icon: CpuIcon,       label: "Science & AI",            desc: "Data-driven decisions powered by artificial intelligence and agronomic research." },
  { Icon: LeafIcon,      label: "Sustainability",          desc: "Farming practices that restore land health and dignify the profession." },
  { Icon: GlobeIcon,     label: "Societal Impact",         desc: "Long-term, measurable change at community, regional, and national scale." },
];

const missionPillars = [
  { Icon: RouteIcon,      label: "End-to-End Ecosystem",   desc: "Seamless guidance from learning to production to market access." },
  { Icon: LayersIcon,     label: "Full-Stack Support",     desc: "Technology, mentorship, financial assistance, and logistics under one roof." },
  { Icon: TrendingUpIcon, label: "Measurable Outcomes",    desc: "Higher yields, increased income, and significantly reduced post-harvest losses." },
  { Icon: ShieldIcon,     label: "Accessible to All",      desc: "Purpose-built for first-generation and low-tech farmers with no prior exposure." },
  { Icon: RecycleIcon,    label: "Income Diversification", desc: "Sustainable livelihood models that reduce dependency on a single crop or cycle." },
];

const PillarCard = ({ Icon, label, desc }) => (
  <Box
    sx={{
      display: "flex",
      gap: 2.5,
      alignItems: "flex-start",
      p: 3,
      borderRadius: 2,
      border: "1px solid #daecd0",
      bgcolor: "#fff",
      transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      "&:hover": {
        boxShadow: "0 6px 24px rgba(44,90,27,0.12)",
        borderColor: "#a8d48c",
      },
    }}
  >
    <Box
      sx={{
        minWidth: 50,
        height: 50,
        borderRadius: "12px",
        bgcolor: "#e8f5e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#2d6010",
        flexShrink: 0,
      }}
    >
      <Icon />
    </Box>
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1rem",
          color: "#162d08",
          mb: 0.5,
          letterSpacing: "0.01em",
          fontFamily: "'Georgia', serif",
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.92rem", color: "#4a6e38", lineHeight: 1.7 }}>
        {desc}
      </Typography>
    </Box>
  </Box>
);

const OurStory = () => {
  return (
    <>
      {/* ── Original section — untouched ── */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "black",
          p: 3,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 3,
            py: 4,
            px: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            🌿 Our Story: Rooted in Nature, Grown with Purpose
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 2 }}>
            We started with a simple idea: reconnect with nature and grow food the way it was meant to be—pure, honest, and full of life.
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 2 }}>
            Inspired by childhood memories of fresh harvests and earthy flavors, we turned away from chemicals and shortcuts.
          </Typography>
          <Typography variant="h6" component="blockquote" sx={{ fontStyle: "italic", my: 2 }}>
            "What if going back to the roots is the way forward?"
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 2 }}>
            Our journey began to grow more than just crops—we're growing trust, sustainability, and healthier communities.
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 2 }}>
            Working with farmers, we nurture both land and livelihoods using mindful, eco-friendly methods.
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 2 }}>
            To us, organic isn't a trend—it's a tribute to the land, the farmer, and to you.
          </Typography>
          <Typography variant="h6" component="p" sx={{ mt: 3, fontWeight: "bold" }}>
            This is more than farming. It's a movement. Grow with us.
          </Typography>
        </Container>
      </Box>

      {/* ── Vision & Mission ── */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #f2f8ee 0%, #ffffff 55%, #f2f8ee 100%)",
          py: { xs: 10, md: 14 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 8, md: 11 } }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                border: "1.5px solid #b0d898",
                borderRadius: "100px",
                px: 3,
                py: 1,
                mb: 3.5,
                bgcolor: "#eaf5e2",
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#3a7a18" }} />
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.28em", color: "#3a7a18", textTransform: "uppercase" }}>
                Our Purpose
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Georgia', serif",
                fontWeight: 800,
                color: "#0e2005",
                fontSize: { xs: "2.6rem", md: "3.4rem" },
                lineHeight: 1.15,
                mb: 2.5,
                letterSpacing: "-0.02em",
              }}
            >
              Vision & Mission
            </Typography>

            <Typography
              sx={{
                color: "#4a6e38",
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.8,
                fontWeight: 400,
              }}
            >
              Rooted in purpose, driven by science — here is what guides every decision we make at Agrovihan.
            </Typography>
          </Box>

          {/* Cards */}
          <Grid container spacing={{ xs: 5, md: 7 }} alignItems="flex-start">

            {/* Vision */}
            <Grid item xs={12} md={6}>
              <Box sx={{ borderTop: "4px solid #2d6010", pt: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "16px",
                      bgcolor: "#2d6010",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      boxShadow: "0 4px 16px rgba(45,96,16,0.3)",
                    }}
                  >
                    <TelescopeIcon />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.3em", color: "#6aaa40", textTransform: "uppercase", mb: 0.3 }}>
                      Agrovihan
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Georgia', serif",
                        fontWeight: 800,
                        fontSize: "1.9rem",
                        color: "#0e2005",
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Vision
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    bgcolor: "#f0f9e8",
                    border: "1.5px solid #cce8b4",
                    borderRadius: 3,
                    p: 3.5,
                    mb: 5,
                    position: "relative",
                  }}
                >
                  <Box sx={{ position: "absolute", top: -2, left: 28, width: 48, height: 4, bgcolor: "#2d6010", borderRadius: "0 0 4px 4px" }} />
                  <Typography
                    sx={{
                      fontFamily: "'Georgia', serif",
                      fontStyle: "italic",
                      fontSize: { xs: "1.05rem", md: "1.12rem" },
                      color: "#172e09",
                      lineHeight: 1.9,
                      fontWeight: 500,
                    }}
                  >
                    "To empower every farmer in India with science, technology, and community support, transforming agriculture into a profitable, sustainable, and dignified livelihood for all."
                  </Typography>
                </Box>

                <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.28em", color: "#6aaa40", textTransform: "uppercase", mb: 2.5 }}>
                  Key Pillars
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {visionPillars.map((p) => <PillarCard key={p.label} {...p} />)}
                </Box>
              </Box>
            </Grid>

            {/* Mission */}
            <Grid item xs={12} md={6}>
              <Box sx={{ borderTop: "4px solid #5a9e28", pt: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "16px",
                      bgcolor: "#5a9e28",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      boxShadow: "0 4px 16px rgba(90,158,40,0.3)",
                    }}
                  >
                    <TargetIcon />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.3em", color: "#6aaa40", textTransform: "uppercase", mb: 0.3 }}>
                      Agrovihan
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Georgia', serif",
                        fontWeight: 800,
                        fontSize: "1.9rem",
                        color: "#0e2005",
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Mission
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    bgcolor: "#f0f9e8",
                    border: "1.5px solid #cce8b4",
                    borderRadius: 3,
                    p: 3.5,
                    mb: 5,
                    position: "relative",
                  }}
                >
                  <Box sx={{ position: "absolute", top: -2, left: 28, width: 48, height: 4, bgcolor: "#5a9e28", borderRadius: "0 0 4px 4px" }} />
                  <Typography
                    sx={{
                      fontFamily: "'Georgia', serif",
                      fontStyle: "italic",
                      fontSize: { xs: "1.05rem", md: "1.12rem" },
                      color: "#172e09",
                      lineHeight: 1.9,
                      fontWeight: 500,
                    }}
                  >
                    "Agrovihan's mission is to restore trust and confidence in farming by providing a full-stack ecosystem that guides farmers from learning to production to market. We combine AI-driven crop intelligence, personalized mentorship, financial and logistical support, and post-harvest solutions to increase yields, reduce losses, diversify incomes, and make farming accessible, profitable, and sustainable for everyone."
                  </Typography>
                </Box>

                <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.28em", color: "#6aaa40", textTransform: "uppercase", mb: 2.5 }}>
                  Key Elements
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {missionPillars.map((p) => <PillarCard key={p.label} {...p} />)}
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Footer rule */}
          <Divider sx={{ mt: { xs: 10, md: 12 }, borderColor: "#cce8b4", borderBottomWidth: 2 }} />
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography sx={{ fontSize: "0.85rem", color: "#6aaa40", letterSpacing: "0.18em", fontWeight: 700, textTransform: "uppercase" }}>
              Agrovihan — Empowering Farmers. Sustaining India.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OurStory;