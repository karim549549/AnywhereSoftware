'use client';

import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { Quiz } from '@/types/quiz.type';

interface CreatedQuizCardProps {
  item: Quiz;
  onDelete?: (id: string) => void;
}

const CreatedQuizCard: React.FC<CreatedQuizCardProps> = ({ item, onDelete }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {item.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created At: {new Date(item.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/dashboard/quizzes/edit/${item.id}`}>Edit</Button>
        <Button size="small" color="error" onClick={() => onDelete && onDelete(item.id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default CreatedQuizCard;
