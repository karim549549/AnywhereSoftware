'use client';

import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import Link from 'next/link';

interface AnnouncementData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface AnnouncementTableRowProps {
  announcement: AnnouncementData;
  isOwner?: boolean; // New prop to determine ownership
}

const AnnouncementTableRow: React.FC<AnnouncementTableRowProps> = ({ announcement, isOwner = false }) => {
  return (
    <TableRow
      key={announcement.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {announcement.title}
      </TableCell>
      <TableCell>{announcement.content.substring(0, 50)}...</TableCell>
      <TableCell align="right">{announcement.createdAt}</TableCell>
      <TableCell align="right">
        {isOwner && (
          <>
            <Button variant="outlined" size="small" sx={{ mr: 1 }} component={Link} href={`/dashboard/announcements/edit/${announcement.id}`}>Edit</Button>
            <Button variant="outlined" color="error" size="small">Delete</Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AnnouncementTableRow;