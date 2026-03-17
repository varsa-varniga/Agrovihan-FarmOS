import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  Container,
  GlobalStyles,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram, Pinterest } from "@mui/icons-material";
import footerBg from "../assets/Footerbg.png";

const Footer = () => {
  const socialLinks = ["#", "#", "#", "#", "#"]; // placeholders

  return (
    <>
      <GlobalStyles styles={{ body: { overflowX: "hidden" } }} />
      <Box
        sx={{
          backgroundImage: `url(${footerBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          color: "white",
          mt: 8,
          pt: { xs: 10, md: 14 },
          pb: { xs: 4, md: 6 },
          "& .MuiTypography-root, & .MuiLink-root": {
            color: "white",
            textShadow:
              "0 2px 6px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.9)",
            WebkitTextStroke: "0.4px rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            alignItems="flex-start"
            sx={{
              "& .MuiTypography-root, & .MuiLink-root": {
                color: "black",
                textShadow: "none",
                WebkitTextStroke: "0px transparent",
              },
              "& .MuiIconButton-root": {
                color: "black",
              },
            }}
          >
            {/* Contact Us */}
            <Grid item xs={12} sm={6} md={4} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={800}
                gutterBottom
                sx={{ letterSpacing: 0.6 }}
              >
                Contact Us
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" fontWeight={700}>
                  Call us: Mon - Fri, 9:30 AM - 5:50 PM
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  Contact No: 8989641010
                </Typography>
                <Stack spacing={0.5}>
                  <Typography variant="body2" fontWeight={700}>
                    Email us at:
                  </Typography>
                  <Link
                    href="mailto:varsavarniga05@gmail.com"
                    underline="hover"
                    sx={{ fontWeight: 700 }}
                  >
                    varsavarniga05@gmail.com
                  </Link>
                  <Link
                    href="mailto:naveenkumar728224@gmail.com"
                    underline="hover"
                    sx={{ fontWeight: 700 }}
                  >
                    naveenkumar728224@gmail.com
                  </Link>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1} mt={2}>
                {[Facebook, LinkedIn, Twitter, Instagram, Pinterest].map(
                  (Icon, idx) => (
                    <IconButton
                      key={idx}
                      sx={{ color: "white" }}
                      component="a"
                      href={socialLinks[idx]}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  )
                )}
              </Stack>
            </Grid>
            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                fontWeight={800}
                gutterBottom
                sx={{ letterSpacing: 0.6 }}
              >
                QUICK LINKS
              </Typography>
              <Stack spacing={0.5}>
                <Link href="#" underline="hover" sx={{ fontWeight: 700 }}>
                  About us
                </Link>
                <Link href="#" underline="hover" sx={{ fontWeight: 700 }}>
                  Features
                </Link>
                <Link href="#" underline="hover" sx={{ fontWeight: 700 }}>
                  FAQ
                </Link>
                <Link href="#" underline="hover" sx={{ fontWeight: 700 }}>
                  Terms & Conditions
                </Link>
                <Link href="#" underline="hover" sx={{ fontWeight: 700 }}>
                  Privacy Policy
                </Link>
              </Stack>
            </Grid>

            {/* Mission */}
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant="h6"
                fontWeight={800}
                gutterBottom
                sx={{ letterSpacing: 0.6 }}
              >
                OUR MISSION
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }} fontWeight={700}>
                "Empowering farmers across India with AI-driven guidance, mentorship, and end-to-end support to increase yields, reduce losses, and make farming profitable and sustainable."
              </Typography>
            </Grid>
          </Grid>

          {/* Footer Bottom Bar */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            mt={5}
            px={2}
            py={2}
            sx={{
              borderTop: "1px solid rgba(255, 255, 255, 0.35)",
              backgroundColor: "transparent",
            }}
          >
            <Typography variant="body2" sx={{ color: "white" }} fontWeight={700}>
              Designed and Developed by Visionary Minds
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }} fontWeight={700}>
              © 2024 AgroVihan. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;

