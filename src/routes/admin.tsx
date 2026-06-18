import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { useAdminAuth } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Login · Shamo Business Portal" },
      { name: "description", content: "Sign in to access the Shamo admin dashboard." },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (location.pathname !== "/admin") {
    return <Outlet />;
  }

  const handleLogin = () => {
    void (async () => {
      const result = await login(username.trim(), password);
      if (!result.ok) {
        setError(result.message);
        return;
      }

      setError("");

      if (typeof window !== "undefined") {
        window.location.assign("/admin/dashboard");
        return;
      }

      void navigate({ to: "/admin/dashboard" });
    })();
  };

  useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,oklch(0.75_0.15_170/.18),transparent_30%),radial-gradient(circle_at_bottom_right,oklch(0.65_0.22_260/.16),transparent_30%)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white shadow-lg">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-center text-2xl font-extrabold">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to access dashboard pages, video management, registrations, analytics, and settings.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label className="mb-1.5 block text-xs font-semibold">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter username" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold">Password</label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter password" />
            </div>
          </div>

          {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

          <button type="submit" className="w-full rounded-xl gradient-brand px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.01]">
            Login to Admin Dashboard
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link to="/" className="font-semibold text-primary hover:underline">← Back to main site</Link>
        </div>
      </div>
    </div>
  );
}
