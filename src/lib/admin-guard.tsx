import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useAdminAuth } from "@/lib/admin-auth";

export function useRequireAdmin() {
  const navigate = useNavigate();
  const { isAuthenticated, isReady } = useAdminAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      void navigate({ to: "/admin" });
    }
  }, [isAuthenticated, isReady, navigate]);

  return { isAuthenticated, isReady };
}