'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import SearchDialog from '@/components/common/SearchDialog';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const drawerWidth = 240;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  const t = useTranslations('DashboardPage');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchClick = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {t('dashboard')}
      </Typography>
      <List>
        <ListItem component={Link} href="/dashboard">
          <ListItemText primary={t('dashboard')} />
        </ListItem>
        <ListItem component={Link} href="/dashboard/schedule">
          <ListItemText primary={t('schedule')} />
        </ListItem>
        <ListItem component={Link} href="/dashboard/courses">
          <ListItemText primary={t('courses')} />
        </ListItem>
        <ListItem component={Link} href="/dashboard/gradebook">
          <ListItemText primary={t('gradebook')} />
        </ListItem>
        <ListItem component={Link} href="/dashboard/performance">
          <ListItemText primary={t('performance')} />
        </ListItem>
        <ListItem component={Link} href="/dashboard/announcements">
          <ListItemText primary={t('announcements')} />
        </ListItem>
        <ListItem component={Link} href="/dashboard/quizzes">
          <ListItemText primary={t('quizzes')} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ProtectedRoute>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Welcome, Karim
            </Typography>
            <IconButton color="inherit" onClick={handleSearchClick}>
              <SearchIcon /> {/* Search Dialog Placeholder */}
            </IconButton>
            <IconButton color="inherit">
              <NotificationsIcon /> {/* Notification Bell */}
            </IconButton>
            <IconButton color="inherit">
              <MailIcon /> {/* Messaging Icon */}
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle /> {/* User Avatar */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar /> {/* This is to offset the AppBar */}
          {children}
        </Box>
        <SearchDialog open={isSearchDialogOpen} onClose={handleSearchDialogClose} />
      </Box>
    </ProtectedRoute>
  );
}
