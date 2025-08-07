'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import Logo from '@/components/common/Logo';
import LanguageSwitcher from '@/components/common/LanguageSwitcher'; // Import LanguageSwitcher
import ThemeSwitch from '@/components/common/ThemeSwitch'; // Import ThemeSwitch
import SearchDialog from '@/components/common/SearchDialog'; // Import SearchDialog
import { useAppDispatch, useAppSelector } from '@/hooks/useAppHooks';
import { clearAuth } from '@/store/userSlice';
import { logout } from '@/apis/api';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const Navbar: React.FC = () => {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const locale = useLocale();

  const handleSearchClick = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearAuth());
      router.push(`/${locale}/auth/login`);
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, handle error more gracefully
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo className="mr-4" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* This can be a dynamic title or removed if Logo is sufficient */}
        </Typography>

        {/* Search Button */}
        <IconButton color="inherit" onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>

        {/* Theme Switch */}
        <ThemeSwitch />

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Auth Links */}
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} href={`/${locale}/auth/login`}>
              Login
            </Button>
            <Button color="inherit" component={Link} href={`/${locale}/auth/register`}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
      <SearchDialog open={isSearchDialogOpen} onClose={handleSearchDialogClose} />
    </AppBar>
  );
};

export default Navbar;
