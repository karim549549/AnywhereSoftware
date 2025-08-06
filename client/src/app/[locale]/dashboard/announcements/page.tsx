'use client';

import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid  } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import AnnouncementTableRow from '@/components/dashboard/announcements/AnnouncementTableRow';
import CreatedAnnouncementCard from '@/components/dashboard/announcements/CreatedAnnouncementCard';

interface AnnouncementData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface CreatedAnnouncementData {
  id: string;
  title: string;
  content: string;
  status: 'Draft' | 'Published';
}

const mockAnnouncements: AnnouncementData[] = [
  {
    id: 'a1',
    title: 'School Holiday Announcement',
    content: 'The school will be closed on November 20th for a national holiday. Enjoy your day off!',
    createdAt: '2025-11-10',
  },
  {
    id: 'a2',
    title: 'Parent-Teacher Conference',
    content: 'Parent-Teacher conferences will be held on December 5th and 6th. Please sign up for a slot online.',
    createdAt: '2025-11-05',
  },
  {
    id: 'a3',
    title: 'New Library Hours',
    content: 'Starting next week, the library will extend its hours until 8 PM on weekdays.',
    createdAt: '2025-11-01',
  },
];

const mockCreatedAnnouncements: CreatedAnnouncementData[] = [
  {
    id: 'ca1',
    title: 'My Draft Announcement',
    content: 'This is a draft announcement that I am working on.',
    status: 'Draft',
  },
  {
    id: 'ca2',
    title: 'Published Event Notice',
    content: 'Details about the upcoming school event.',
    status: 'Published',
  },
];

export default function AnnouncementsPage() {
  const t = useTranslations('DashboardPage');

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
            {mockAnnouncements.map((announcement) => (
              <AnnouncementTableRow key={announcement.id} announcement={announcement} isOwner={false} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {t('yourCreatedAnnouncements')}
      </Typography>
      <Grid container spacing={2}>
        {mockCreatedAnnouncements.map((item) => (
          <Grid size={{ xs: 12, sm: 6 , md: 4}} key={item.id}>
            <CreatedAnnouncementCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
  