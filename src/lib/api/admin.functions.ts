import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { AdminSettings, FormState } from "@/lib/admin-data";
import { readAdminDatabase, writeAdminDatabase } from "@/lib/admin-store.server";
import type { AdminPost, PostStatus, SocialPlatform, VideoCategory } from "@/lib/video-types";

const settingsSchema = z.object({
  siteTitle: z.string().min(1),
  supportEmail: z.string().email(),
  defaultLanguage: z.enum(["en", "am"]),
  autoPublish: z.boolean(),
  notifyOnRegistration: z.boolean(),
});

const formSchema = z.object({
  category: z.string().min(1),
  titleEn: z.string().min(1),
  titleAm: z.string().min(1),
  keywords: z.string(),
  descriptionEn: z.string(),
  descriptionAm: z.string(),
  fileName: z.string(),
  shareTo: z.array(z.enum(["YouTube", "TikTok", "Instagram", "Facebook"])),
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ username: z.string(), password: z.string() }))
  .handler(async ({ data }) => {
    if (data.username !== "admin" || data.password !== "admin123") {
      return { ok: false as const, message: "Invalid username or password." };
    }

    return {
      ok: true as const,
      user: { username: data.username, displayName: "Admin User" },
    };
  });

export const getAdminSnapshot = createServerFn({ method: "GET" }).handler(async () => {
  const database = await readAdminDatabase();
  return {
    posts: database.posts,
    registrations: database.registrations,
    settings: database.settings,
    notifications: database.registrations.filter((item) => item.status === "New").length,
  };
});

export const createAdminPost = createServerFn({ method: "POST" })
  .inputValidator(z.object({ form: formSchema, status: z.enum(["Draft", "Published", "Scheduled", "Review"]) }))
  .handler(async ({ data }) => {
    const database = await readAdminDatabase();
    const form = data.form as FormState;

    const newPost: AdminPost = {
      id: `admin-${Date.now()}`,
      titleEn: form.titleEn,
      titleAm: form.titleAm,
      thumb: database.posts[0]?.thumb ?? "",
      duration: "00:00",
      views: 0,
      channel: "Shamo Admin",
      channelAm: "ሻሞ አስተዳዳሪ",
      category: form.category as VideoCategory,
      postedDays: 0,
      status: data.status,
      createdAtLabel: "Just now",
      keywords: form.keywords,
      descriptionEn: form.descriptionEn,
      descriptionAm: form.descriptionAm,
      shareTo: form.shareTo as SocialPlatform[],
      source: "admin",
    };

    database.posts = [newPost, ...database.posts];
    await writeAdminDatabase(database);

    return {
      ok: true as const,
      post: newPost,
      message:
        data.status === "Published"
          ? "Video posted successfully and added to the recent posts table."
          : data.status === "Scheduled"
            ? "Video saved with scheduled status."
            : "Draft saved successfully.",
    };
  });

export const updateAdminPostStatus = createServerFn({ method: "POST" })
  .inputValidator(z.object({ postId: z.string(), status: z.enum(["Draft", "Published", "Scheduled", "Review"]) }))
  .handler(async ({ data }) => {
    const database = await readAdminDatabase();
    database.posts = database.posts.map((post) => (post.id === data.postId ? { ...post, status: data.status as PostStatus } : post));
    await writeAdminDatabase(database);
    return { ok: true as const };
  });

export const deleteAdminPost = createServerFn({ method: "POST" })
  .inputValidator(z.object({ postId: z.string() }))
  .handler(async ({ data }) => {
    const database = await readAdminDatabase();
    database.posts = database.posts.filter((post) => post.id !== data.postId);
    await writeAdminDatabase(database);
    return { ok: true as const };
  });

export const markAdminRegistrationReviewed = createServerFn({ method: "POST" })
  .inputValidator(z.object({ registrationId: z.string() }))
  .handler(async ({ data }) => {
    const database = await readAdminDatabase();
    database.registrations = database.registrations.map((registration) =>
      registration.id === data.registrationId ? { ...registration, status: "Reviewed" } : registration,
    );
    await writeAdminDatabase(database);
    return { ok: true as const };
  });

export const saveAdminSettings = createServerFn({ method: "POST" })
  .inputValidator(settingsSchema)
  .handler(async ({ data }) => {
    const database = await readAdminDatabase();
    database.settings = data as AdminSettings;
    await writeAdminDatabase(database);
    return { ok: true as const, settings: database.settings };
  });