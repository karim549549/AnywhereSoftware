"use client";
import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import AuthNavbar from "@/components/layout/AuthNavbar";

interface AuthLayoutClientProps {
  children: React.ReactNode;
}

export default function AuthLayoutClient({ children }: AuthLayoutClientProps) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AuthNavbar />
      <Grid container component="main" sx={{ height: "calc(100vh - 64px)" }}>
        <Grid
        size={{ xs:12 , sm: 8, md: 5 }}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
        size={{ xs:12 , sm: 8, md: 5 }}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%", // Ensure Box takes full width of its parent Grid
              maxWidth: 400, // Set a consistent max-width for the content
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
