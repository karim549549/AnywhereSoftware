'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography,TableCell ,   Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CreatedQuizCard from '@/components/dashboard/quizzes/CreatedQuizCard';
import QuizTableRow from '@/components/dashboard/quizzes/QuizTableRow';
import { getAllQuizzes, deleteQuiz } from '@/apis/quiz.api';
import { Quiz } from '@/types/quiz.type';

export default function QuizzesPage() {
  const t = useTranslations('DashboardPage');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllQuizzes();
      setQuizzes(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch quizzes');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) {
      return;
    }
    try {
      await deleteQuiz(id);
      fetchQuizzes(); // Re-fetch quizzes after deletion
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete quiz');
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t("quizzes")}
        </Typography>
        <Link href="/dashboard/quizzes/create" passHref>
          <Button variant="contained" color="primary">
            {t("createNewQuizAssignment")}
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((quiz) => (
              <QuizTableRow key={quiz.id} quiz={quiz} onDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {t("yourCreatedQuizzesAssignments")}
      </Typography>
      <Grid container spacing={2}>
        {quizzes.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <CreatedQuizCard item={item} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}