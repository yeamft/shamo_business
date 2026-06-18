import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { adminLogin } from "@/lib/api/admin.functions";

type AdminUser = {
  username: string;
  displayName: string;
};

type AdminAuthContextValue = {
  user: AdminUser | null;
  isReady: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => void;
};

const ADMIN_STORAGE_KEY = "shamo-admin-user";
const ADMIN_USERNAME = "shamo_admin_portal";
const ADMIN_PASSWORD = "Shamo@2026#Secure!Portal";

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function getStoredAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    return null;
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUser(getStoredAdminUser());
    setIsReady(true);
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: !!user,
      login: async (username, password) => {
        const result = await adminLogin({ data: { username, password } });

        if (!result.ok) {
          return { ok: false, message: result.message };
        }

        const nextUser = result.user;
        setUser(nextUser);
        setIsReady(true);
        if (typeof window !== "undefined") {
          localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(nextUser));
        }
        return { ok: true };
      },
      logout: () => {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem(ADMIN_STORAGE_KEY);
        }
      },
    }),
    [isReady, user],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return context;
}

export const adminCredentials = {
  username: ADMIN_USERNAME,
  password: ADMIN_PASSWORD,
};