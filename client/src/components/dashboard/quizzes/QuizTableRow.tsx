'use client';

import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface QuizData {
  id: string;
  title: string;
  dueDate: string;
  topic: string;
  type: 'quiz' | 'assignment' | 'exam';
  status: 'Due' | 'Completed' | 'Overdue';
}

interface QuizTableRowProps {
  quiz: QuizData;
}

const QuizTableRow: React.FC<QuizTableRowProps> = ({ quiz }) => {
  const t = useTranslations('DashboardPage');

  return (
    <TableRow
      key={quiz.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {quiz.title}
      </TableCell>
      <TableCell align="right">{quiz.dueDate}</TableCell>
      <TableCell align="right">{quiz.topic}</TableCell>
      <TableCell align="right">{quiz.type}</TableCell>
      <TableCell align="right">{quiz.status}</TableCell>
      <TableCell align="right">
        {quiz.status === 'Due' && (
          <Button
            variant="contained"
            size="small"
            component={Link}
            href={`/dashboard/quizzes/${quiz.id}`}
          >
            {quiz.type === 'quiz' || quiz.type === 'exam' ? t('startQuiz') : t('solveAssignment')}
          </Button>
        )}
        {quiz.status === 'Overdue' && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            component={Link}
            href={`/dashboard/quizzes/${quiz.id}`}
          >
            {quiz.type === 'quiz' || quiz.type === 'exam' ? t('startQuiz') : t('solveAssignment')}
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default QuizTableRow;
