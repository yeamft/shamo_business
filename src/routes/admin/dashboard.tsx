import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, Clock3, Eye, FileText, FolderKanban, Users } from "lucide-react";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { getCategoryBreakdown, getDashboardSummary, getStatusClasses, useAdminData } from "@/lib/admin-data";
import { Bi, dict, useLang } from "@/lib/i18n";
import { formatViews } from "@/lib/videos";

export const Route = createFileRoute("/admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, isReady } = useRequireAdmin();
  const { posts, registrations } = useAdminData();
  const { lang } = useLang();

  if (!isReady || !isAuthenticated) return null;

  const summary = getDashboardSummary(posts);
  const latestPosts = posts.slice(0, 5);
  const categoryBreakdown = getCategoryBreakdown(posts);
  const newRegistrations = registrations.filter((registration) => registration.status === "New").length;

  const stats = [
    { label: "Total Videos", value: summary.totalVideos, Icon: FileText, tone: "text-primary" },
    { label: "Published", value: summary.publishedCount, Icon: CheckCircle2, tone: "text-emerald-600" },
    { label: "Scheduled", value: summary.scheduledCount, Icon: Clock3, tone: "text-sky-600" },
    { label: "Drafts", value: summary.draftCount, Icon: FolderKanban, tone: "text-amber-600" },
    { label: "Total Views", value: summary.formattedTotalViews, Icon: Eye, tone: "text-violet-600" },
    { label: "New Applications", value: newRegistrations, Icon: Users, tone: "text-rose-600" },
  ];

  return (
    <AdminShell>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, Icon, tone }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="mt-2 text-3xl font-extrabold">{value}</div>
              </div>
              <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-muted ${tone}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Recent posts</h2>
              <p className="text-sm text-muted-foreground">Latest content added to the admin catalogue.</p>
            </div>
            <Link to="/admin/post" className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
              Create post
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {latestPosts.map((post) => (
              <div key={post.id} className="flex flex-col gap-3 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-center">
                <img src={post.thumb} alt={post.titleEn} className="h-20 w-full rounded-xl object-cover sm:w-32" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold">{lang === "am" ? post.titleAm : post.titleEn}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {dict[post.category].en} · {post.createdAtLabel} · {formatViews(post.views)} views
                  </div>
                </div>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(post.status)}`}>
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-lg font-bold">
              <BarChart3 className="h-5 w-5 text-primary" /> Category breakdown
            </div>
            <div className="mt-5 space-y-4">
              {categoryBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span><Bi en={dict[item.category].en} am={dict[item.category].am} /></span>
                    <span className="font-semibold">{item.total}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${summary.totalVideos ? (item.total / summary.totalVideos) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Quick actions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link to="/admin/videos" className="rounded-2xl border border-border bg-background p-4 text-sm font-semibold hover:bg-accent">
                Manage videos
              </Link>
              <Link to="/admin/registrations" className="rounded-2xl border border-border bg-background p-4 text-sm font-semibold hover:bg-accent">
                Review registrations
              </Link>
              <Link to="/admin/analytics" className="rounded-2xl border border-border bg-background p-4 text-sm font-semibold hover:bg-accent">
                View analytics
              </Link>
              <Link to="/admin/settings" className="rounded-2xl border border-border bg-background p-4 text-sm font-semibold hover:bg-accent">
                Update settings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
