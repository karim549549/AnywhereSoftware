import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function GradebookPage() {
  const t = useTranslations('DashboardPage');
  return (
    <Box>
      <Typography variant="h4" gutterBottom>{t('gradebook')}</Typography>
      <Typography variant="body1">Content for the Gradebook page.</Typography>
    </Box>
  );
}
