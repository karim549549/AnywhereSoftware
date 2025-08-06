"use client";
import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import LatestAnnouncements from '@/components/dashboard/LatestAnnouncements';
import DueQuizzesAssignments from '@/components/dashboard/DueQuizzesAssignments';

export default function DashboardHomePage() {
  const t = useTranslations('HomePage'); // Using HomePage translations for this section

  return (
    <div className="bg-neutral-200">
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "calc(100vh - 64px)", // Adjust for AppBar height
          p: 4, // Added padding to the container
        }}
      >
        {/* First Row: Exam Time / Image */}
        <Box sx={{ flexGrow: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 4 }}>
          {/* Left Section: Text Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('examTimeTitle')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('examTimeText1')}
            </Typography>
            <Typography variant="body2" fontStyle="italic" gutterBottom>
              {t('examTimeQuote')}
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  color: 'white',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                }}
              >
                {t('viewExamTips')}
              </Button>
            </Box>
          </Box>

          {/* Right Section: Image Placeholder */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                minHeight: { xs: '200px', md: '400px' }, // Ensure image placeholder has height
                backgroundColor: 'grey.300', // Placeholder background
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'grey.600',
                fontSize: 'h4.fontSize',
              }}
            >
              Image Placeholder
            </Box>
          </Box>
        </Box>

        {/* Second Row: Announcements and Due Quizzes/Assignments */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {/* Announcements Section (3/4 width) */}
          <Grid size={{ xs: 12, md: 9 }} >
            <LatestAnnouncements />
          </Grid>

          {/* Due Quizzes & Assignments Section (1/4 width) */}
          <Grid size={{ xs: 12, md: 3}}>
            <DueQuizzesAssignments />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}