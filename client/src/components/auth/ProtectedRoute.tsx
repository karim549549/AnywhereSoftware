"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/useAppHooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { CircularProgress, Box } from "@mui/material";
import { getMe, refreshToken } from "@/apis/api"; // Import API functions
import { setUser } from "@/store/userSlice"; // Import setUser action
import { SessionExpiredError } from "@/utils/fetcher";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch(); // Get dispatch
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        // User already in Redux store, no need to fetch
        setLoading(false);
        return;
      }

      try {
        // Try to get user from session (via cookie)
        const meResponse = await getMe();
        dispatch(setUser(meResponse)); // Set user in Redux store
        setLoading(false);
      } catch (meError: unknown) {
        console.error("Failed to get user from /auth/me:", meError);
        // If /auth/me fails, try to refresh token
        try {
          await refreshToken(); // This will set new cookies if successful
          const meAfterRefreshResponse = await getMe(); // Try /auth/me again with new tokens
          dispatch(setUser(meAfterRefreshResponse));
          setLoading(false);
        } catch (refreshError: unknown) {
          console.error("Failed to refresh token or get user after refresh:", refreshError);
          if (refreshError instanceof SessionExpiredError) {
            router.push(`/${locale}/auth/login`);
          } else {
            // Handle other errors, maybe show a generic error message
            router.push(`/${locale}/auth/login`);
          }
        }
      }
    };

    checkAuth();
  }, [user, dispatch, router, locale]); // Add dispatch to dependencies

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
