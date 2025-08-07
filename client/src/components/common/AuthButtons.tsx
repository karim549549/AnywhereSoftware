"use client";

import { Button, Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/hooks/useAppHooks";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function AuthButtons() {
  const t = useTranslations("HomePage");
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const locale = useLocale();

  const handleGetStartedClick = () => {
    if (user) {
      router.push(`/${locale}/dashboard`);
    } else {
      router.push(`/${locale}/auth/login`);
    }
  };

  const handleLearnMoreClick = () => {
    if (user) {
      router.push(`/${locale}/dashboard`);
    } else {
      router.push(`/${locale}/auth/register`);
    }
  };

  return (
    <Box mt={4} display="flex" justifyContent="center" gap={2}>
      <Button variant="contained" size="large" onClick={handleGetStartedClick}>
        {t("getStarted")}
      </Button>
      <Button variant="outlined" size="large" onClick={handleLearnMoreClick}>
        {t("learnMore")}
      </Button>
    </Box>
  );
}
