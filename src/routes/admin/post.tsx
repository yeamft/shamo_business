import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { categories, emptyAdminForm, useAdminData, type FormState } from "@/lib/admin-data";
import { dict } from "@/lib/i18n";
import type { PostStatus, SocialPlatform } from "@/lib/video-types";

export const Route = createFileRoute("/admin/post")({
  component: RouteComponent,
});

const platforms: SocialPlatform[] = ["YouTube", "Facebook", "Instagram", "TikTok"];

function RouteComponent() {
  const { isAuthenticated } = useRequireAdmin();
  const { createPost, settings } = useAdminData();
  const [form, setForm] = useState<FormState>(emptyAdminForm);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  if (!isAuthenticated) return null;
  const submitPost = (status: PostStatus) => {
    void (async () => {
      const result = await createPost(form, settings.autoPublish && status === "Published" ? "Published" : status);

      if (!result.ok) {
        setFeedback({ type: "error", message: result.message });
        return;
      }

      setFeedback({ type: "success", message: result.message });
      setForm({ ...emptyAdminForm });
    })();
  };

  return (
    <AdminShell>
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold">Create a new video post</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in the publishing details, then save as draft, schedule it, or publish immediately.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {dict[category].en}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Uploaded file name">
            <input
              value={form.fileName}
              onChange={(e) => setForm((current) => ({ ...current, fileName: e.target.value }))}
              placeholder="example-video.mp4"
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
            />
          </Field>

          <Field label="YouTube embed link">
            <input
              value={form.youtubeUrl}
              onChange={(e) => setForm((current) => ({ ...current, youtubeUrl: e.target.value }))}
              placeholder="https://www.youtube.com/embed/..."
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
            />
          </Field>

          <Field label="English title">
            <input
              value={form.titleEn}
              onChange={(e) => setForm((current) => ({ ...current, titleEn: e.target.value }))}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
            />
          </Field>

          <Field label="Amharic title">
            <input
              value={form.titleAm}
              onChange={(e) => setForm((current) => ({ ...current, titleAm: e.target.value }))}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Keywords">
              <input
                value={form.keywords}
                onChange={(e) => setForm((current) => ({ ...current, keywords: e.target.value }))}
                placeholder="coffee, export, ethiopia"
                className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="English description">
              <textarea
                value={form.descriptionEn}
                onChange={(e) => setForm((current) => ({ ...current, descriptionEn: e.target.value }))}
                rows={4}
                className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Amharic description">
              <textarea
                value={form.descriptionAm}
                onChange={(e) => setForm((current) => ({ ...current, descriptionAm: e.target.value }))}
                rows={4}
                className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-semibold">Share to platforms</div>
            <div className="mt-3 flex flex-wrap gap-3">
              {platforms.map((platform) => {
                const checked = form.shareTo.includes(platform);
                return (
                  <label key={platform} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setForm((current) => ({
                          ...current,
                          shareTo: checked
                            ? current.shareTo.filter((item) => item !== platform)
                            : [...current.shareTo, platform],
                        }))
                      }
                    />
                    {platform}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {feedback && (
          <div
            className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-destructive/30 bg-destructive/10 text-destructive"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => submitPost("Draft")} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">
            Save draft
          </button>
          <button type="button" onClick={() => submitPost("Scheduled")} className="rounded-full border border-sky-300 bg-sky-50 px-5 py-2.5 text-sm font-semibold text-sky-700">
            Schedule
          </button>
          <button type="button" onClick={() => submitPost("Published")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Publish now
          </button>
        </div>
      </section>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
