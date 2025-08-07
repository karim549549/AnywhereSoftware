'use client';

import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import Link from 'next/link';
import { Announcement } from '@/types/announcement.type';

interface AnnouncementTableRowProps {
  announcement: Announcement;
  isOwner?: boolean; // New prop to determine ownership
  onDelete?: (id: string) => void;
}

const AnnouncementTableRow: React.FC<AnnouncementTableRowProps> = ({ announcement, isOwner = false, onDelete }) => {
  return (
    <TableRow
      key={announcement.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {announcement.title}
      </TableCell>
      <TableCell>{announcement.content.substring(0, 50)}...</TableCell>
      <TableCell align="right">{new Date(announcement.createdAt).toLocaleDateString()}</TableCell>
      <TableCell align="right">
        {isOwner && (
          <>
            <Button variant="outlined" size="small" sx={{ mr: 1 }} component={Link} href={`/dashboard/announcements/edit/${announcement.id}`}>Edit</Button>
            <Button variant="outlined" color="error" size="small" onClick={() => onDelete && onDelete(announcement.id)}>Delete</Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AnnouncementTableRow;