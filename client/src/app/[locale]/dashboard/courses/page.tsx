import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function CoursesPage() {
  const t = useTranslations('DashboardPage');
  return (
    <Box>
      <Typography variant="h4" gutterBottom>{t('courses')}</Typography>
      <Typography variant="body1">Content for the Courses page.</Typography>
    </Box>
  );
}
