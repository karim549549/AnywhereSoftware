'use client';

import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import Link from 'next/link';

interface CreatedAnnouncementData {
  id: string;
  title: string;
  content: string;
  status: 'Draft' | 'Published';
}

interface CreatedAnnouncementCardProps {
  item: CreatedAnnouncementData;
}

const CreatedAnnouncementCard: React.FC<CreatedAnnouncementCardProps> = ({ item }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.content.substring(0, 100)}...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {item.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/dashboard/announcements/edit/${item.id}`}>Edit</Button>
        <Button size="small" color="error">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default CreatedAnnouncementCard;
