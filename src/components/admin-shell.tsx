import { Link, useLocation } from "@tanstack/react-router";
import { BarChart3, Bell, LayoutDashboard, LogOut, Search, Settings, Upload, Users, Video as VideoIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useAdminAuth } from "@/lib/admin-auth";
import { useAdminData } from "@/lib/admin-data";
import { Bi } from "@/lib/i18n";

const navItems = [
  { to: "/admin/dashboard", Icon: LayoutDashboard, en: "Dashboard", am: "ዳሽቦርድ" },
  { to: "/admin/videos", Icon: VideoIcon, en: "Videos", am: "ቪዲዮዎች" },
  { to: "/admin/post", Icon: Upload, en: "Post Video", am: "ቪዲዮ ይለጥፉ" },
  { to: "/admin/registrations", Icon: Users, en: "Registrations", am: "ምዝገባዎች" },
  { to: "/admin/analytics", Icon: BarChart3, en: "Analytics", am: "ትንታኔዎች" },
  { to: "/admin/settings", Icon: Settings, en: "Settings", am: "ቅንብሮች" },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user, logout } = useAdminAuth();
  const { notifications, clearNotifications } = useAdminData();
  const activeItem = navItems.find((item) => location.pathname === item.to) ?? navItems[0];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-border bg-card lg:block">
          <div className="flex h-16 items-center gap-2 border-b border-border px-5">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand text-sm font-bold text-white">SB</div>
            <div className="leading-tight">
              <div className="text-sm font-bold">Admin Portal</div>
              <div className="text-[11px] text-muted-foreground font-ethiopic">የአስተዳዳሪ ፖርታል</div>
            </div>
          </div>

          <nav className="space-y-1 p-3">
            {navItems.map(({ to, Icon, en, am }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-left"><Bi en={en} am={am} /></span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 p-3">
            <Link to="/" className="block rounded-lg border border-border bg-background px-3 py-2 text-center text-xs font-semibold hover:bg-accent">
              <Bi en="← Back to Site" am="← ወደ ድረ-ገጹ ይመለሱ" />
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                window.location.href = "/admin";
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold hover:bg-accent"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </aside>

        <div>
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur sm:px-6">
            <h1 className="text-lg font-bold"><Bi en={activeItem.en} am={activeItem.am} /></h1>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Search admin pages…" className="h-9 w-64 rounded-full border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button onClick={clearNotifications} className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-background">
                <Bell className="h-4 w-4" />
                {notifications > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] text-white">{notifications}</span>}
              </button>
              <div className="rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold">{user?.displayName ?? "Admin"}</div>
            </div>
          </header>

          <main className="space-y-6 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}