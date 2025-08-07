'use client';

import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import Link from 'next/link';
import { Quiz } from '@/types/quiz.type';

interface QuizTableRowProps {
  quiz: Quiz;
  onDelete?: (id: string) => void;
}

const QuizTableRow: React.FC<QuizTableRowProps> = ({ quiz, onDelete }) => {
  return (
    <TableRow
      key={quiz.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {quiz.title}
      </TableCell>
      <TableCell align="right">{quiz.description}</TableCell>
      <TableCell align="right">{new Date(quiz.createdAt).toLocaleDateString()}</TableCell>
      <TableCell align="right">
        <Button variant="outlined" size="small" sx={{ mr: 1 }} component={Link} href={`/dashboard/quizzes/edit/${quiz.id}`}>Edit</Button>
        <Button variant="outlined" color="error" size="small" onClick={() => onDelete && onDelete(quiz.id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};

export default QuizTableRow;
