'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface QuizAssignment {
  id: string;
  title: string;
  dueDate: string;
  topic: string;
  type: 'quiz' | 'assignment' | 'exam';
}

// Placeholder for due quizzes and assignments - will be replaced by API fetch
const dueQuizzes: QuizAssignment[] = [
  {
    id: 'q1',
    title: 'Algebra I - Chapter 3 Quiz',
    dueDate: 'Nov 15, 2025',
    topic: 'Equations and Inequalities',
    type: 'quiz',
  },
  {
    id: 'a1',
    title: 'History - Essay on World War II',
    dueDate: 'Nov 18, 2025',
    topic: 'Historical Analysis',
    type: 'assignment',
  },
  {
    id: 'q2',
    title: 'Chemistry - Stoichiometry Exam',
    dueDate: 'Nov 20, 2025',
    topic: 'Chemical Reactions',
    type: 'exam',
  },
];

const DueQuizzesAssignments: React.FC = () => {
  const tDashboard = useTranslations('DashboardPage');

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
        {dueQuizzes.map((item) => (
          <Box key={item.id} sx={{ mb: 2, p: 1, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">Due: {item.dueDate} | Topic: {item.topic}</Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              component={Link}
              href={`/dashboard/quizzes/${item.id}`}
            >
              {item.type === 'quiz' || item.type === 'exam' ? tDashboard('startQuiz') : tDashboard('solveAssignment')}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DueQuizzesAssignments;