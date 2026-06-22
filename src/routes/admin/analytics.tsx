import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin-shell";
import { getCategoryLabel } from "@/lib/categories";
import { useRequireAdmin } from "@/lib/admin-guard";
import { getCategoryBreakdown, getDashboardSummary, useAdminData } from "@/lib/admin-data";
import { Bi } from "@/lib/i18n";
import { formatViews } from "@/lib/videos";

export const Route = createFileRoute("/admin/analytics")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, isReady } = useRequireAdmin();
  const { posts, registrations, categories } = useAdminData();

  if (!isReady || !isAuthenticated) return null;

  const summary = getDashboardSummary(posts, categories);
  const breakdown = getCategoryBreakdown(posts, categories);
  const topPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
  const reviewedRate = registrations.length
    ? Math.round((registrations.filter((registration) => registration.status === "Reviewed").length / registrations.length) * 100)
    : 0;

  return (
    <AdminShell>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Performance overview</h2>
          <div className="mt-5 space-y-4 text-sm">
            <Metric label="Total views" value={summary.formattedTotalViews} />
            <Metric label="Published content" value={`${summary.publishedCount} / ${summary.totalVideos}`} />
            <Metric label="Scheduled queue" value={`${summary.scheduledCount} videos`} />
            <Metric label="Application review rate" value={`${reviewedRate}%`} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Content by category</h2>
          <div className="mt-5 space-y-4">
            {breakdown.map((item) => (
              <div key={item.category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span><Bi en={item.labelEn} am={item.labelAm} /></span>
                  <span className="font-semibold">{item.total} videos</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${summary.totalVideos ? (item.total / summary.totalVideos) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">Top performing posts</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <th className="py-2">Title</th>
                <th className="py-2">Category</th>
                <th className="py-2">Views</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post) => (
                <tr key={post.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3 font-semibold">{post.titleEn}</td>
                  <td className="py-3">{getCategoryLabel(post.category, categories, "en")}</td>
                  <td className="py-3">{formatViews(post.views)}</td>
                  <td className="py-3">{post.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-base font-bold">{value}</span>
    </div>
  );
}
