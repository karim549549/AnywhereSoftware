'use client';

import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import Link from 'next/link';

interface CreatedQuizAssignmentData {
  id: string;
  title: string;
  type: 'quiz' | 'assignment' | 'exam';
  status: 'Draft' | 'Published';
}

interface CreatedQuizCardProps {
  item: CreatedQuizAssignmentData;
}

const CreatedQuizCard: React.FC<CreatedQuizCardProps> = ({ item }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {item.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {item.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/dashboard/quizzes/edit/${item.id}`}>Edit</Button>
        <Button size="small" color="error">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default CreatedQuizCard;
