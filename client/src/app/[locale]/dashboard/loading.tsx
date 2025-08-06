'use client';

import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

export default function DashboardLoading() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        <Skeleton width="60%" />
      </Typography>
      <Skeleton variant="rectangular" height={100} sx={{ my: 2 }} />
      <Skeleton />
      <Skeleton width="80%" />
      <Skeleton height={60} sx={{ my: 2 }} />
      <Skeleton />
      <Skeleton width="70%" />
    </Box>
  );
}
