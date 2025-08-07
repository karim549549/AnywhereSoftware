"use client";
import {
  Box,
  Button,
  TextField,
  List,
  CircularProgress,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, TRegisterSchema } from "@/validation/register.validation";
import PasswordValidationRule from "./PasswordValidationRule";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { register as registerUser } from "@/apis/api";
import { useAppDispatch } from '@/hooks/useAppHooks';
import { setUser } from '@/store/userSlice';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const t = useTranslations("Auth.RegisterForm");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
  });

  const password = useWatch({ control, name: "password" });

  const passwordValidation = {
    length: (password || "").length >= 8,
    lowercase: /[a-z]/.test(password || ""),
    uppercase: /[A-Z]/.test(password || ""),
    number: /[0-9]/.test(password || ""),
  };

  const onSubmit = async (data: TRegisterSchema) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
      dispatch(setUser(response));
      router.push(`/${locale}/dashboard`);
    } finally {
      setLoading(false);
    }
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
        id="username"
        label={t("username")}
        autoComplete="username"
        autoFocus
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message || ' '}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label={t("email")}
        autoComplete="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message || ' '}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label={t("password")}
        type="password"
        id="password"
        autoComplete="new-password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message || ' '}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label={t("confirmPassword")}
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message || ' '}
        disabled={loading}
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
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : t("signUp")}
      </Button>
    </Box>
  );
}