"use client";

import { useAppSelector } from "@/hooks/useAppHooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { CircularProgress, Box } from "@mui/material";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // User is authenticated, redirect to dashboard
      router.push(`/${locale}/dashboard`);
    } else {
      setLoading(false);
    }
  }, [user, router, locale]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
