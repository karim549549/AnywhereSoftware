"use client";
import {
  Box,
  Button,
  TextField,
  List,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, TLoginSchema } from "@/validation/login.validation";
import { useTranslations } from "next-intl";

import PasswordValidationRule from "./PasswordValidationRule";

interface LoginFormProps {
  onSubmit: (data: TLoginSchema) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const t = useTranslations("Auth.LoginForm");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });

  const password = useWatch({ control, name: "password" });

  const passwordValidation = {
    length: (password || "").length >= 8,
    lowercase: /[a-z]/.test(password || ""),
    uppercase: /[A-Z]/.test(password || ""),
    number: /[0-9]/.test(password || ""),
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label={t("email")}
        autoComplete="email"
        autoFocus
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message || ' '}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label={t("password")}
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message || ' '}
      />
      <Box sx={{ my: 2 }}>
        <List dense>
          <PasswordValidationRule
            isValid={passwordValidation.length}
            text={t("passwordRules.length")}
          />
          <PasswordValidationRule
            isValid={passwordValidation.lowercase}
            text={t("passwordRules.lowercase")}
          />
          <PasswordValidationRule
            isValid={passwordValidation.uppercase}
            text={t("passwordRules.uppercase")}
          />
          <PasswordValidationRule
            isValid={passwordValidation.number}
            text={t("passwordRules.number")}
          />
        </List>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 2 }}
      >
        {t("signIn")}
      </Button>
    </Box>
  );
}
