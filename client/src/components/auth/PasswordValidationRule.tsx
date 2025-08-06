"use client";
import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface PasswordValidationRuleProps {
  isValid: boolean;
  text: string;
}

const PasswordValidationRule: React.FC<PasswordValidationRuleProps> = ({ isValid, text }) => (
  <ListItem disablePadding>
    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
      {isValid ? (
        <CheckCircleIcon fontSize="small" color="success" />
      ) : (
        <CancelIcon fontSize="small" color="error" />
      )}
    </ListItemIcon>
    <ListItemText
      primary={text}
      primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
    />
  </ListItem>
);

export default PasswordValidationRule;
