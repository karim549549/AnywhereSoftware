"use client";
import {
  Box,
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
import LoginForm from "@/components/auth/LoginForm";
import { TLoginSchema } from "@/validation/login.validation";

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();

  const handleLogin = (data: TLoginSchema) => {
    // Simulate a successful login
    console.log(data);
    router.push("/en/dashboard");
  };

  return (
    <>
      <Logo />
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Sign in
      </Typography>
      <LoginForm onSubmit={handleLogin} />
      <Box sx={{ mt: 2, width: "100%" }}>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Box>
      <Divider sx={{ my: 2, width: "100%" }}>OR</Divider>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        sx={{ mb: 1 }}
      >
        Sign in with Google
      </Button>
      <Button fullWidth variant="outlined" startIcon={<GitHubIcon />}>
        Sign in with GitHub
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don&apos;t have an account?{" "}
        <Link href={`/${locale}/auth/register`} variant="body2">
          Sign Up
        </Link>
      </Typography>
    </>
  );
}

