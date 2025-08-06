
"use client";
import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Logo from '@/components/common/Logo';
import ThemeSwitch from '@/components/common/ThemeSwitch';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const AuthNavbar: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }} elevation={1}>
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />
        <LanguageSwitcher />
        <ThemeSwitch />
        <Button color="inherit" onClick={() => router.push(`/${locale}/auth/register`)}>
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AuthNavbar;
