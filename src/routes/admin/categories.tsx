import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { emptyCategoryForm, useAdminData, type CategoryFormState } from "@/lib/admin-data";
import { getCategoryLabel, slugifyCategoryName } from "@/lib/categories";

export const Route = createFileRoute("/admin/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const { isAuthenticated, isReady } = useRequireAdmin();
  const { categories, posts, createCategory, deleteCategory } = useAdminData();
  const [form, setForm] = useState<CategoryFormState>(emptyCategoryForm);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const sortedCategories = useMemo(() => [...categories].sort((a, b) => a.nameEn.localeCompare(b.nameEn)), [categories]);

  if (!isReady || !isAuthenticated) return null;

  if (location.pathname !== "/admin/categories") {
    return <Outlet />;
  }

  const handleCreate = async () => {
    const resolvedId = form.id.trim() || slugifyCategoryName(form.nameEn).replace(/-/g, "_");
    const result = await createCategory({
      ...form,
      id: resolvedId,
      slug: form.slug.trim() || slugifyCategoryName(form.nameEn),
    });

    if (!result.ok) {
      setFeedback({ type: "error", message: result.message });
      return;
    }

    setForm(emptyCategoryForm);
    setFeedback({ type: "success", message: "Category created successfully." });
  };

  return (
    <AdminShell>
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold">Create category</h2>
          <p className="text-sm text-muted-foreground">Add a new category for admin and public video filtering.</p>

          <div className="mt-6 grid gap-4">
            <Field label="Category ID"><input value={form.id} onChange={(e) => setForm((current) => ({ ...current, id: e.target.value }))} placeholder="cat_new_topic" className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" /></Field>
            <Field label="Slug"><input value={form.slug} onChange={(e) => setForm((current) => ({ ...current, slug: e.target.value }))} placeholder="new-topic" className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" /></Field>
            <Field label="English name"><input value={form.nameEn} onChange={(e) => setForm((current) => ({ ...current, nameEn: e.target.value }))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" /></Field>
            <Field label="Amharic name"><input value={form.nameAm} onChange={(e) => setForm((current) => ({ ...current, nameAm: e.target.value }))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" /></Field>
            <Field label="English description"><textarea value={form.descriptionEn} onChange={(e) => setForm((current) => ({ ...current, descriptionEn: e.target.value }))} rows={3} className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm" /></Field>
            <Field label="Amharic description"><textarea value={form.descriptionAm} onChange={(e) => setForm((current) => ({ ...current, descriptionAm: e.target.value }))} rows={3} className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm" /></Field>
          </div>

          {feedback && <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${feedback.type === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-destructive/30 bg-destructive/10 text-destructive"}`}>{feedback.message}</div>}

          <button type="button" onClick={() => void handleCreate()} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> Create category
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Manage categories</h2>
              <p className="text-sm text-muted-foreground">Edit category details on its own page or remove unused categories.</p>
            </div>
            <div className="text-sm text-muted-foreground">{sortedCategories.length} total</div>
          </div>

          <div className="mt-6 space-y-3">
            {sortedCategories.map((category) => {
              const usageCount = posts.filter((post) => post.category === category.id).length;
              return (
                <div key={category.id} className="rounded-2xl border border-border p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-base font-bold">{getCategoryLabel(category.id, categories, "en")}</div>
                      <div className="font-ethiopic text-sm text-muted-foreground">{getCategoryLabel(category.id, categories, "am")}</div>
                      <div className="mt-2 text-xs text-muted-foreground">ID: {category.id} · Slug: {category.slug} · Videos: {usageCount}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link to="/admin/categories/$categoryId" params={{ categoryId: category.id }} className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
                        <Pencil className="h-4 w-4" /> Edit
                      </Link>
                      <button
                        type="button"
                        disabled={usageCount > 0}
                        onClick={() => {
                          void (async () => {
                            const result = await deleteCategory(category.id);
                            setFeedback(result.ok ? { type: "success", message: "Category deleted successfully." } : { type: "error", message: result.message });
                          })();
                        }}
                        className="inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm font-semibold text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}