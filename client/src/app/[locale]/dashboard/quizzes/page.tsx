'use client';

import React from 'react';
import { Box, Typography,TableCell ,   Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CreatedQuizCard from '@/components/dashboard/quizzes/CreatedQuizCard';
import QuizTableRow from '@/components/dashboard/quizzes/QuizTableRow';

interface QuizData {
  id: string;
  title: string;
  dueDate: string;
  topic: string;
  type: 'quiz' | 'assignment' | 'exam';
  status: 'Due' | 'Completed' | 'Overdue';
}

interface CreatedQuizAssignmentData {
  id: string;
  title: string;
  type: 'quiz' | 'assignment' | 'exam';
  status: 'Draft' | 'Published';
}

const mockQuizzes: QuizData[] = [
  {
    id: 'q1',
    title: 'Algebra I - Chapter 3 Quiz',
    dueDate: 'Nov 15, 2025',
    topic: 'Equations and Inequalities',
    type: 'quiz',
    status: 'Due',
  },
  {
    id: 'a1',
    title: 'History - Essay on World War II',
    dueDate: 'Nov 18, 2025',
    topic: 'Historical Analysis',
    type: 'assignment',
    status: 'Due',
  },
  {
    id: 'q2',
    title: 'Chemistry - Stoichiometry Exam',
    dueDate: 'Nov 20, 2025',
    topic: 'Chemical Reactions',
    type: 'exam',
    status: 'Due',
  },
  {
    id: 'q3',
    title: 'Biology - Cell Structure Quiz',
    dueDate: 'Oct 25, 2025',
    topic: 'Cell Biology',
    type: 'quiz',
    status: 'Completed',
  },
  {
    id: 'a2',
    title: 'Literature - Poetry Analysis',
    dueDate: 'Oct 30, 2025',
    topic: 'Literary Criticism',
    type: 'assignment',
    status: 'Overdue',
  },
];

const mockCreatedQuizzes: CreatedQuizAssignmentData[] = [
  {
    id: 'c1',
    title: 'My First Created Quiz',
    type: 'quiz',
    status: 'Draft',
  },
  {
    id: 'c2',
    title: 'History Assignment - Chapter 1',
    type: 'assignment',
    status: 'Published',
  },
  {
    id: 'c3',
    title: 'Physics Exam - Electromagnetism',
    type: 'exam',
    status: 'Draft',
  },
];

export default function QuizzesPage() {
  const t = useTranslations('DashboardPage');

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
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Topic</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockQuizzes.map((quiz) => (
              <QuizTableRow key={quiz.id} quiz={quiz} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {t("yourCreatedQuizzesAssignments")}
      </Typography>
      <Grid container spacing={2}>
        {mockCreatedQuizzes.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <CreatedQuizCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}