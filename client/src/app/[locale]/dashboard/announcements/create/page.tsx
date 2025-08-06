'use client';

import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { announcementSchema, AnnouncementFormValues } from '@/validation/announcement.validation';

export default function CreateAnnouncementPage() {
  const t = useTranslations('DashboardPage');

  const { register, handleSubmit, formState: { errors } } = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: AnnouncementFormValues) => {
    console.log(data);
    // Here you would typically send the data to your backend API
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, maxWidth: 600, mx: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {t('createNewAnnouncement')}
      </Typography>

      <TextField
        label="Title"
        {...register('title')}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        label="Content"
        {...register('content')}
        fullWidth
        margin="normal"
        multiline
        rows={6}
        error={!!errors.content}
        helperText={errors.content?.message}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Create Announcement
      </Button>
    </Box>
  );
}
