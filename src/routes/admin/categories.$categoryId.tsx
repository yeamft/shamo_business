import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { useAdminData, type CategoryFormState } from "@/lib/admin-data";
import { slugifyCategoryName } from "@/lib/categories";

export const Route = createFileRoute("/admin/categories/$categoryId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isReady } = useRequireAdmin();
  const { categories, posts, updateCategory } = useAdminData();
  const category = useMemo(() => categories.find((item) => item.id === categoryId), [categories, categoryId]);
  const [form, setForm] = useState<CategoryFormState>({
    id: "",
    slug: "",
    nameEn: "",
    nameAm: "",
    descriptionEn: "",
    descriptionAm: "",
  });
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (!category) return;
    setForm({
      id: category.id,
      slug: category.slug,
      nameEn: category.nameEn,
      nameAm: category.nameAm,
      descriptionEn: category.descriptionEn ?? "",
      descriptionAm: category.descriptionAm ?? "",
    });
  }, [category]);

  if (!isReady || !isAuthenticated) return null;
  if (!category) return <AdminShell><div className="rounded-2xl border border-border bg-card p-6">Category not found.</div></AdminShell>;

  const linkedVideos = posts.filter((post) => post.category === categoryId).length;

  const handleSave = async () => {
    const result = await updateCategory(categoryId, {
      ...form,
      slug: form.slug.trim() || slugifyCategoryName(form.nameEn),
    });

    if (!result.ok) {
      setFeedback({ type: "error", message: result.message });
      return;
    }

    setFeedback({ type: "success", message: "Category updated successfully." });
    if (categoryId !== result.category.id) {
      void navigate({ to: "/admin/categories/$categoryId", params: { categoryId: result.category.id } });
    }
  };

  return (
    <AdminShell>
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold">Edit category</h2>
          <p className="mt-2 text-sm text-muted-foreground">Update category details and keep linked videos aligned if you change the category id.</p>
          <div className="mt-2 text-xs text-muted-foreground">Linked videos: {linkedVideos}</div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Category ID"><input value={form.id} onChange={(e) => setForm((current) => ({ ...current, id: e.target.value }))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" /></Field>
          <Field label="Slug"><input value={form.slug} onChange={(e) => setForm((current) => ({ ...current, slug: e.target.value }))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" /></Field>
          <Field label="English name"><input value={form.nameEn} onChange={(e) => setForm((current) => ({ ...current, nameEn: e.target.value }))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" /></Field>
          <Field label="Amharic name"><input value={form.nameAm} onChange={(e) => setForm((current) => ({ ...current, nameAm: e.target.value }))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" /></Field>
          <div className="md:col-span-2"><Field label="English description"><textarea value={form.descriptionEn} onChange={(e) => setForm((current) => ({ ...current, descriptionEn: e.target.value }))} rows={4} className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm" /></Field></div>
          <div className="md:col-span-2"><Field label="Amharic description"><textarea value={form.descriptionAm} onChange={(e) => setForm((current) => ({ ...current, descriptionAm: e.target.value }))} rows={4} className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm" /></Field></div>
        </div>

        {feedback && <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${feedback.type === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-destructive/30 bg-destructive/10 text-destructive"}`}>{feedback.message}</div>}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => void handleSave()} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Save changes</button>
          <button type="button" onClick={() => void navigate({ to: "/admin/categories" })} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Back to categories</button>
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