import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { uploadAdminThumbnailFile, uploadAdminVideoFile } from "@/lib/api/admin.functions";
import { useRequireAdmin } from "@/lib/admin-guard";
import { categories, emptyAdminForm, useAdminData, type FormState } from "@/lib/admin-data";
import { dict } from "@/lib/i18n";
import type { SocialPlatform } from "@/lib/video-types";

export const Route = createFileRoute("/admin/post")({
  component: RouteComponent,
});

type VideoSourceMode = "youtube" | "upload";

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Failed to read file"));
        return;
      }

      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Invalid file encoding"));
        return;
      }

      resolve(base64);
    };
    reader.onerror = () => reject(reader.error ?? new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });
}

function RouteComponent() {
  const { isAuthenticated } = useRequireAdmin();
  const { createPost, settings } = useAdminData();
  const [form, setForm] = useState<FormState>(emptyAdminForm);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [videoSourceMode, setVideoSourceMode] = useState<VideoSourceMode>("youtube");

  if (!isAuthenticated) return null;

  const handleFileSelect = async (file?: File) => {
    if (!file) return;

    setIsUploadingFile(true);
    setFeedback(null);
    setVideoSourceMode("upload");

    try {
      const base64 = await fileToBase64(file);
      const uploaded = await uploadAdminVideoFile({
        data: {
          fileName: file.name,
          contentType: file.type || "video/mp4",
          base64,
        },
      });

      setForm((current) => ({
        ...current,
        fileName: uploaded.fileName,
        youtubeUrl: uploaded.publicUrl,
      }));
      setFeedback({ type: "success", message: "Video uploaded successfully. You can now publish it as a local video post." });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? `Unable to upload the selected video file: ${error.message}` : "Unable to upload the selected video file. Please try again.",
      });
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleThumbnailSelect = async (file?: File) => {
    if (!file) return;

    setIsUploadingThumbnail(true);
    setFeedback(null);

    try {
      const base64 = await fileToBase64(file);
      const uploaded = await uploadAdminThumbnailFile({
        data: {
          fileName: file.name,
          contentType: file.type || "image/png",
          base64,
        },
      });

      setForm((current) => ({
        ...current,
        thumbnailFileName: uploaded.fileName,
        thumbnailUrl: uploaded.publicUrl,
      }));
      setFeedback({ type: "success", message: "Thumbnail uploaded successfully for the local video post." });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? `Unable to upload the selected thumbnail: ${error.message}` : "Unable to upload the selected thumbnail. Please try again.",
      });
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  const submitPost = () => {
    void (async () => {
      if (videoSourceMode === "youtube" && !form.youtubeUrl.trim()) {
        setFeedback({ type: "error", message: "Please provide a YouTube link before publishing." });
        return;
      }

      if (videoSourceMode === "upload" && !form.fileName.trim()) {
        setFeedback({ type: "error", message: "Please upload a local video file before publishing." });
        return;
      }

      if (videoSourceMode === "upload" && !form.thumbnailUrl.trim()) {
        setFeedback({ type: "error", message: "Please upload a thumbnail for the local video before publishing." });
        return;
      }

      const result = await createPost(form, "Published");

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
          <div className="md:col-span-2">
            <div className="text-sm font-semibold">Video source</div>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setVideoSourceMode("youtube");
                  setForm((current) => ({ ...current, fileName: "", thumbnailFileName: "", thumbnailUrl: "" }));
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  videoSourceMode === "youtube"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background hover:bg-accent"
                }`}
              >
                Use YouTube link
              </button>
              <button
                type="button"
                onClick={() => {
                  setVideoSourceMode("upload");
                  setForm((current) => ({ ...current, youtubeUrl: "" }));
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  videoSourceMode === "upload"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background hover:bg-accent"
                }`}
              >
                Upload local video
              </button>
            </div>
          </div>

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
            <div className="space-y-3">
              <input
                value={form.fileName}
                onChange={(e) => setForm((current) => ({ ...current, fileName: e.target.value }))}
                placeholder="example-video.mp4"
                disabled={videoSourceMode !== "upload"}
                className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
              />
              <div className="flex flex-wrap items-center gap-3">
                <label className={`inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold ${videoSourceMode !== "upload" ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-accent"}`}>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    className="hidden"
                    disabled={videoSourceMode !== "upload"}
                    onChange={(e) => void handleFileSelect(e.target.files?.[0])}
                  />
                  {isUploadingFile ? "Uploading video..." : "Choose local video"}
                </label>
                {form.fileName && <span className="text-xs text-muted-foreground">Selected: {form.fileName}</span>}
              </div>
            </div>
          </Field>

          <Field label="Thumbnail image">
            <div className="space-y-3">
              <input
                value={form.thumbnailFileName}
                onChange={(e) => setForm((current) => ({ ...current, thumbnailFileName: e.target.value }))}
                placeholder="example-thumbnail.jpg"
                disabled={videoSourceMode !== "upload"}
                className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
              />
              <div className="flex flex-wrap items-center gap-3">
                <label className={`inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold ${videoSourceMode !== "upload" ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-accent"}`}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    disabled={videoSourceMode !== "upload"}
                    onChange={(e) => void handleThumbnailSelect(e.target.files?.[0])}
                  />
                  {isUploadingThumbnail ? "Uploading thumbnail..." : "Choose thumbnail"}
                </label>
                {form.thumbnailFileName && <span className="text-xs text-muted-foreground">Selected: {form.thumbnailFileName}</span>}
              </div>
            </div>
          </Field>

          <Field label="YouTube embed link">
            <input
              value={form.youtubeUrl}
              onChange={(e) => {
                setVideoSourceMode("youtube");
                setForm((current) => ({ ...current, youtubeUrl: e.target.value, fileName: "" }));
              }}
              placeholder="https://www.youtube.com/embed/... or uploaded video URL"
              disabled={videoSourceMode !== "youtube"}
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
          <button type="button" onClick={() => submitPost()} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
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
