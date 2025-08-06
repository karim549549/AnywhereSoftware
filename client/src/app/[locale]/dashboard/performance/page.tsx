import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function PerformancePage() {
  const t = useTranslations('DashboardPage');
  return (
    <Box>
      <Typography variant="h4" gutterBottom>{t('performance')}</Typography>
      <Typography variant="body1">Content for the Performance page.</Typography>
    </Box>
  );
}
