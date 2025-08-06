'use client';

import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface AnnouncementUser {
  name: string;
  avatar: string;
}

interface Announcement {
  id: string;
  user: AnnouncementUser;
  role: string;
  content: string;
}

// Placeholder for latest announcements - will be replaced by API fetch
const latestAnnouncements: Announcement[] = [
  {
    id: '1',
    user: { name: 'John Doe', avatar: '/path/to/avatar1.jpg' },
    role: 'Teacher for Course 401 Math',
    content: 'Reminder: Midterm exam for Math 401 will be held on Friday, November 10th at 10:00 AM in Room 305.',
  },
  {
    id: '2',
    user: { name: 'Jane Smith', avatar: '/path/to/avatar2.jpg' },
    role: 'School Management',
    content: 'Important: School will be closed on Monday, November 13th for a professional development day.',
  },
  {
    id: '3',
    user: { name: 'Alice Johnson', avatar: '/path/to/avatar3.jpg' },
    role: 'Teacher for Physics 201',
    content: 'Physics 201 lab reports are due by end of day, November 9th. Please submit via the online portal.',
  },
  {
    id: '4',
    user: { name: 'Bob Williams', avatar: '/path/to/avatar4.jpg' },
    role: 'Student Affairs',
    content: 'New scholarship opportunities are now available. Check the student portal for details and application deadlines.',
  },
];

const LatestAnnouncements: React.FC = () => {
  const tDashboard = useTranslations('DashboardPage');

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
        {latestAnnouncements.map((announcement) => (
          <Box key={announcement.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, p: 1, borderBottom: '1px solid #f0f0f0' }}>
            <Avatar sx={{ mr: 2 }}>{announcement.user.name[0]}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">{announcement.user.name}</Typography>
              <Typography variant="body2" color="text.secondary">{announcement.role}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>{announcement.content}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LatestAnnouncements;