'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, TextField, CircularProgress, Alert } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { announcementSchema, AnnouncementFormValues } from '@/validation/announcement.validation';
import { createAnnouncement } from '@/apis/announcement.api';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function CreateAnnouncementPage() {
  const t = useTranslations('DashboardPage');
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: AnnouncementFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await createAnnouncement(data);
      router.push(`/${locale}/dashboard/announcements`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, maxWidth: 600, mx: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {t('createNewAnnouncement')}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Title"
        {...register('title')}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title?.message}
        disabled={loading}
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
        disabled={loading}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : t('createAnnouncement')}
      </Button>
    </Box>
  );
}
