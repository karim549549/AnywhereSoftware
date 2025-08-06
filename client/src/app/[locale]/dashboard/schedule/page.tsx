import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function SchedulePage() {
  const t = useTranslations('DashboardPage');
  return (
    <Box>
      <Typography variant="h4" gutterBottom>{t('schedule')}</Typography>
      <Typography variant="body1">Content for the Schedule page.</Typography>
    </Box>
  );
}
