"use client";
import {
  Button,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Logo from "@/components/common/Logo";
import RegisterForm from "@/components/auth/RegisterForm";
import { TRegisterSchema } from "@/validation/register.validation";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("Auth");
  const locale = useLocale();

  const handleRegister = (data: TRegisterSchema) => {
    // Simulate a successful registration
    console.log(data);
    router.push("/en/dashboard");
  };

  return (
    <>
      <Logo />
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        {t("register")}
      </Typography>
      <RegisterForm onSubmit={handleRegister} />
      <Divider sx={{ my: 2, width: "100%" }}>OR</Divider>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        sx={{ mb: 1 }}
      >
        {t("registerWithGoogle")}
      </Button>
      <Button fullWidth variant="outlined" startIcon={<GitHubIcon />}>
        {t("registerWithGitHub")}
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t("alreadyHaveAccount")}{" "}
        <Link href={`/${locale}/auth/login`} variant="body2">
          {t("login")}
        </Link>
      </Typography>
    </>
  );
}