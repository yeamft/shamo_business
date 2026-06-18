import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { categories, getStatusClasses, useAdminData } from "@/lib/admin-data";
import { dict, useLang } from "@/lib/i18n";
import type { PostStatus } from "@/lib/video-types";
import { formatViews } from "@/lib/videos";

export const Route = createFileRoute("/admin/videos")({
  component: RouteComponent,
});

const statusOptions: PostStatus[] = ["Draft", "Review", "Scheduled", "Published"];

function RouteComponent() {
  const { isAuthenticated } = useRequireAdmin();
  const { posts, updatePostStatus, deletePost } = useAdminData();
  const { lang } = useLang();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const categoryMatch = categoryFilter === "all" || post.category === categoryFilter;
        const statusMatch = statusFilter === "all" || post.status === statusFilter;
        return categoryMatch && statusMatch;
      }),
    [categoryFilter, posts, statusFilter],
  );

  if (!isAuthenticated) return null;

  return (
    <AdminShell>
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold">Manage videos</h2>
            <p className="text-sm text-muted-foreground">Filter videos, change their status, or remove items from the admin list.</p>
          </div>
          <Link to="/admin/post" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Add new video
          </Link>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 text-sm">
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {dict[category].en}
              </option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 text-sm">
            <option value="all">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="grid gap-4 rounded-2xl border border-border p-4 lg:grid-cols-[140px_1fr_auto] lg:items-center">
              <img src={post.thumb} alt={post.titleEn} className="h-24 w-full rounded-xl object-cover" />
              <div>
                <div className="text-base font-bold">{lang === "am" ? post.titleAm : post.titleEn}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {dict[post.category].en} · {formatViews(post.views)} views · {post.createdAtLabel}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(post.status)}`}>
                    {post.status}
                  </span>
                  <select
                    value={post.status}
                    onChange={(e) => updatePostStatus(post.id, e.target.value as PostStatus)}
                    className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={() => deletePost(post.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm font-semibold text-destructive"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
