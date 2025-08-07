import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import { getTranslations } from 'next-intl/server';
import AuthButtons from '@/components/common/AuthButtons';


export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <Container
        maxWidth="md"
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box textAlign="center">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {t("welcome")}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {t("tagline")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t("description")}
          </Typography>
          <AuthButtons />
        </Box>
      </Container>
    </div>
  );
}
