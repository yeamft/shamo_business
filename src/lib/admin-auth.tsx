import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AdminUser = {
  username: string;
  displayName: string;
};

type AdminAuthContextValue = {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { ok: true } | { ok: false; message: string };
  logout: () => void;
};

const ADMIN_STORAGE_KEY = "shamo-admin-user";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return;

    try {
      setUser(JSON.parse(raw) as AdminUser);
    } catch {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login: (username, password) => {
        if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
          return { ok: false, message: "Invalid username or password." };
        }

        const nextUser = { username, displayName: "Admin User" };
        setUser(nextUser);
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
    [user],
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