'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, CircularProgress, Alert  } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import AnnouncementTableRow from '@/components/dashboard/announcements/AnnouncementTableRow';
import CreatedAnnouncementCard from '@/components/dashboard/announcements/CreatedAnnouncementCard';
import { getAllAnnouncements, getUserAnnouncements, deleteAnnouncement } from '@/apis/announcement.api';
import { Announcement } from '@/types/announcement.type';
import { useAppSelector } from '@/hooks/useAppHooks';

export default function AnnouncementsPage() {
  const t = useTranslations('DashboardPage');
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([]);
  const [userAnnouncements, setUserAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useAppSelector((state) => state.user.user);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allResponse = await getAllAnnouncements();
      setAllAnnouncements(allResponse.data);

      const userResponse = await getUserAnnouncements();
      setUserAnnouncements(userResponse.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to fetch announcements');
      } else {
        setError("Failed to fetch announcements");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return;
    }
    try {
      await deleteAnnouncement(id);
      fetchAnnouncements(); // Re-fetch announcements after deletion
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to delete announcement');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          {t('announcements')}
        </Typography>
        <Link href="/dashboard/announcements/create" passHref>
          <Button variant="contained" color="primary">
            {t('createNewAnnouncement')}
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="announcements table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAnnouncements.map((announcement) => (
              <AnnouncementTableRow key={announcement.id} announcement={announcement} isOwner={announcement.userId === currentUser?.id} onDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {t('yourCreatedAnnouncements')}
      </Typography>
      <Grid container spacing={2}>
        {userAnnouncements.map((item) => (
          <Grid size={{ xs: 12, sm: 6 , md: 4}} key={item.id}>
            <CreatedAnnouncementCard item={item} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
  