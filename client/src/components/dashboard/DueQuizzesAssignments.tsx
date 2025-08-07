'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getAllQuizzes } from '@/apis/quiz.api';
import { Quiz } from '@/types/quiz.type';

const DueQuizzesAssignments: React.FC = () => {
  const tDashboard = useTranslations('DashboardPage');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllQuizzes({ limit: 3, sortBy: 'createdAt', orderBy: 'desc' }); // Fetch latest 3 quizzes
        setQuizzes(response.data);
      }  finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', minHeight: '300px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold">
            {tDashboard('dueQuizzes')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tDashboard('dueQuizzesDescription')}
          </Typography>
        </Box>
        <Link href="/dashboard/quizzes" passHref>
          <Button variant="outlined" size="small">
            {tDashboard('viewAll')}
          </Button>
        </Link>
      </Box>
      <Box>
        {quizzes.length > 0 ? (
          quizzes.map((item) => (
            <Box key={item.id} sx={{ mb: 2, p: 1, borderBottom: '1px solid #f0f0f0' }}>
              <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">Description: {item.description} | Created: {new Date(item.createdAt).toLocaleDateString()}</Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 1 }}
                component={Link}
                href={`/dashboard/quizzes/${item.id}`}
              >
                View Quiz
              </Button>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No quizzes or assignments available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default DueQuizzesAssignments;