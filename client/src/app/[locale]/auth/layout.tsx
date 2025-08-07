import AuthLayoutClient from "@/components/layout/AuthLayoutClient";
import PublicRoute from "@/components/auth/PublicRoute";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicRoute>
      <AuthLayoutClient>
        {children}
      </AuthLayoutClient>
    </PublicRoute>
  );
}

