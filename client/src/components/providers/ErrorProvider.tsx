"use client";

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppHooks';
import { hideGlobalError } from '@/store/errorSlice';

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { message, show } = useAppSelector((state) => state.error);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideGlobalError());
  };

  return (
    <>
      {children}
      <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};