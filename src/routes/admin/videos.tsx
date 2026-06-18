import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquareMore, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { categories, getStatusClasses, useAdminData } from "@/lib/admin-data";
import { dict, useLang } from "@/lib/i18n";
import { formatViews } from "@/lib/videos";

export const Route = createFileRoute("/admin/videos")({
  component: RouteComponent,
});

function getCommentCount(postId: string) {
  const numeric = postId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (numeric % 24) + 3;
}

function getComments(postTitle: string, postId: string) {
  const total = getCommentCount(postId);
  return Array.from({ length: Math.min(total, 4) }, (_, index) => ({
    id: `${postId}-comment-${index + 1}`,
    author: ["Hanna A.", "Yonas T.", "Selam B.", "Meron K."][index % 4],
    message: `Comment ${index + 1} on ${postTitle}`,
    time: `${index + 1}h ago`,
  }));
}

function RouteComponent() {
  const { isAuthenticated } = useRequireAdmin();
  const { posts, updatePostStatus, deletePost } = useAdminData();
  const { lang } = useLang();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const categoryMatch = categoryFilter === "all" || post.category === categoryFilter;
        return categoryMatch;
      }),
    [categoryFilter, posts],
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const paginatedPosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

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

        <div className="mt-5 grid gap-3 md:grid-cols-1">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 text-sm">
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {dict[category].en}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filteredPosts.length)} of {filteredPosts.length} videos
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[920px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <th className="py-3 pr-3">Video</th>
                <th className="py-3 pr-3">Category</th>
                <th className="py-3 pr-3">Views</th>
                <th className="py-3 pr-3">Comments</th>
                <th className="py-3 pr-3">Status</th>
                <th className="py-3 pr-3">Visibility</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post) => (
                <>
                  <tr key={post.id} className="border-b border-border/60 align-top">
                    <td className="py-4 pr-3">
                      <div className="flex gap-3">
                        <img src={post.thumb} alt={post.titleEn} className="h-16 w-24 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <div className="line-clamp-2 font-bold">{lang === "am" ? post.titleAm : post.titleEn}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{post.createdAtLabel}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-3">{dict[post.category].en}</td>
                    <td className="py-4 pr-3">{formatViews(post.views)}</td>
                    <td className="py-4 pr-3">
                      <button
                        type="button"
                        onClick={() => setExpandedCommentsPostId((current) => (current === post.id ? null : post.id))}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-accent"
                      >
                        <MessageSquareMore className="h-3.5 w-3.5" /> {getCommentCount(post.id)}
                      </button>
                    </td>
                    <td className="py-4 pr-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 pr-3">
                      <button
                        type="button"
                        onClick={() => updatePostStatus(post.id, post.status === "Published" ? "Draft" : "Published")}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          post.status === "Published"
                            ? "border border-amber-300 bg-amber-50 text-amber-700"
                            : "border border-emerald-300 bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {post.status === "Published" ? "Unpublish" : "Publish"}
                      </button>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        onClick={() => deletePost(post.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm font-semibold text-destructive"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </td>
                  </tr>
                  {expandedCommentsPostId === post.id && (
                    <tr className="border-b border-border/60 bg-muted/20 last:border-0">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="rounded-2xl border border-border bg-background p-4">
                          <div className="mb-3 text-sm font-bold">Recent comments</div>
                          <div className="space-y-3">
                            {getComments(lang === "am" ? post.titleAm : post.titleEn, post.id).map((comment) => (
                              <div key={comment.id} className="rounded-xl border border-border/70 p-3">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-sm font-semibold">{comment.author}</span>
                                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{comment.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </AdminShell>
  );
}
