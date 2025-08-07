'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getAllAnnouncements } from '@/apis/announcement.api';
import { Announcement } from '@/types/announcement.type';

const LatestAnnouncements: React.FC = () => {
  const tDashboard = useTranslations('DashboardPage');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllAnnouncements({ limit: 4, sortBy: 'createdAt', orderBy: 'desc' }); // Fetch latest 4 announcements
        setAnnouncements(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold">
            {tDashboard('latestAnnouncements')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tDashboard('announcementsDescription')}
          </Typography>
        </Box>
        <Link href="/dashboard/announcements" passHref>
          <Button variant="outlined" size="small">
            {tDashboard('viewAll')}
          </Button>
        </Link>
      </Box>
      <Box>
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Box key={announcement.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, p: 1, borderBottom: '1px solid #f0f0f0' }}>
              <Typography variant="body1" sx={{ mt: 1 }}>{announcement.title}: {announcement.content.substring(0, 100)}...</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No announcements available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LatestAnnouncements;