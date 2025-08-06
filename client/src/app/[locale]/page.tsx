import React from 'react'
import { Container, Box, Typography, Button } from '@mui/material'
import Link from "next/link";
import Navbar from '@/components/layout/Navbar';

import { getTranslations } from 'next-intl/server';

export default async  function Home() {
  const t  = await getTranslations('HomePage');
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <Navbar />
      <Container maxWidth="md" sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box textAlign="center">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {t('welcome')}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {t('tagline')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t('description')}
          </Typography>
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Link href="/login">
              <Button variant="contained" size="large">{t('getStarted')}</Button>
            </Link>
            <Link href="/register">
              <Button variant="outlined" size="large">{t('learnMore')}</Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  )
}