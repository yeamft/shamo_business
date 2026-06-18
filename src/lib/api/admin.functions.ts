import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { AdminSettings, FormState } from "@/lib/admin-data";
import { getSupabaseServerClient } from "@/lib/supabase.server";
import type { AdminPost, PostStatus, SocialPlatform, Video, VideoCategory } from "@/lib/video-types";

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
  youtubeUrl: z.string().url(),
  shareTo: z.array(z.enum(["YouTube", "TikTok", "Instagram", "Facebook"])),
});

const fallbackThumb = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80";

function normalizeYouTubeEmbedUrl(youtubeUrl?: string) {
  if (!youtubeUrl) return "https://www.youtube.com/embed/NMYWBOTeg1I";

  const embedMatch = youtubeUrl.match(/youtube\.com\/embed\/([^?&/]+)/i);
  if (embedMatch?.[1]) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`;
  }

  const watchMatch = youtubeUrl.match(/[?&]v=([^?&/]+)/i);
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  const shortMatch = youtubeUrl.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  return youtubeUrl;
}

function getYouTubeThumbnail(youtubeUrl?: string) {
  if (!youtubeUrl) return fallbackThumb;

  const embedMatch = youtubeUrl.match(/youtube\.com\/embed\/([^?&/]+)/i);
  if (embedMatch?.[1]) {
    return `https://img.youtube.com/vi/${embedMatch[1]}/hqdefault.jpg`;
  }

  const watchMatch = youtubeUrl.match(/[?&]v=([^?&/]+)/i);
  if (watchMatch?.[1]) {
    return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`;
  }

  const shortMatch = youtubeUrl.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch?.[1]) {
    return `https://img.youtube.com/vi/${shortMatch[1]}/hqdefault.jpg`;
  }

  return fallbackThumb;
}

function mapVideoRow(post: Record<string, any>): AdminPost {
  return {
    id: post.id,
    titleEn: post.title_en,
    titleAm: post.title_am,
    thumb: post.thumb || getYouTubeThumbnail(post.youtube_url),
    youtubeUrl: normalizeYouTubeEmbedUrl(post.youtube_url),
    duration: post.duration,
    views: post.views,
    channel: post.channel,
    channelAm: post.channel_am,
    category: post.category,
    postedDays: post.posted_days,
    status: post.status,
    createdAtLabel: post.created_at_label,
    keywords: post.keywords,
    descriptionEn: post.description_en,
    descriptionAm: post.description_am,
    shareTo: post.share_to,
    source: post.source,
  } satisfies AdminPost;
}

export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ username: z.string(), password: z.string() }))
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
  const supabase = getSupabaseServerClient();

  const [{ data: posts }, { data: registrations }, { data: settingsRow }] = await Promise.all([
    supabase.from("admin_videos").select("*").order("inserted_at", { ascending: false }),
    supabase.from("job_registrations").select("*").order("created_at", { ascending: false }),
    supabase.from("admin_settings").select("*").eq("id", 1).single(),
  ]);

  return {
    posts: posts?.map(mapVideoRow) ?? [],
    registrations:
      registrations?.map((item) => ({
        id: item.id,
        name: item.name,
        profession: item.profession,
        phone: item.phone,
        subCity: item.sub_city,
        status: item.status,
      })) ?? [],
    settings: {
      siteTitle: settingsRow?.site_title ?? "Shamo Business Portal",
      supportEmail: settingsRow?.support_email ?? "admin@shamobusiness.com",
      defaultLanguage: settingsRow?.default_language ?? "en",
      autoPublish: settingsRow?.auto_publish ?? false,
      notifyOnRegistration: settingsRow?.notify_on_registration ?? true,
    },
    notifications: registrations?.filter((item) => item.status === "New").length ?? 0,
  };
});

export const createAdminPost = createServerFn({ method: "POST" })
  .validator(z.object({ form: formSchema, status: z.enum(["Draft", "Published", "Scheduled", "Review"]) }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const form = data.form as FormState;

    const newPost: AdminPost = {
      id: `admin-${Date.now()}`,
      titleEn: form.titleEn,
      titleAm: form.titleAm,
      thumb: getYouTubeThumbnail(form.youtubeUrl),
      youtubeUrl: normalizeYouTubeEmbedUrl(form.youtubeUrl),
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

    await supabase.from("admin_videos").insert({
      id: newPost.id,
      title_en: newPost.titleEn,
      title_am: newPost.titleAm,
      thumb: newPost.thumb,
      youtube_url: newPost.youtubeUrl,
      duration: newPost.duration,
      views: newPost.views,
      channel: newPost.channel,
      channel_am: newPost.channelAm,
      category: newPost.category,
      posted_days: newPost.postedDays,
      status: newPost.status,
      created_at_label: newPost.createdAtLabel,
      keywords: newPost.keywords,
      description_en: newPost.descriptionEn,
      description_am: newPost.descriptionAm,
      share_to: newPost.shareTo,
      source: newPost.source,
    });

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

export const getPublicVideos = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("admin_videos")
    .select("*")
    .eq("status", "Published")
    .order("inserted_at", { ascending: false });

  return (data?.map(mapVideoRow) ?? []) as Video[];
});

export const getPublicVideoById = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { data: post } = await supabase
      .from("admin_videos")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();

    return post ? (mapVideoRow(post) as Video) : null;
  });

export const updateAdminPostStatus = createServerFn({ method: "POST" })
  .validator(z.object({ postId: z.string(), status: z.enum(["Draft", "Published", "Scheduled", "Review"]) }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    await supabase.from("admin_videos").update({ status: data.status }).eq("id", data.postId);
    return { ok: true as const };
  });

export const deleteAdminPost = createServerFn({ method: "POST" })
  .validator(z.object({ postId: z.string() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    await supabase.from("admin_videos").delete().eq("id", data.postId);
    return { ok: true as const };
  });

export const markAdminRegistrationReviewed = createServerFn({ method: "POST" })
  .validator(z.object({ registrationId: z.string() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    await supabase.from("job_registrations").update({ status: "Reviewed" }).eq("id", data.registrationId);
    return { ok: true as const };
  });

export const saveAdminSettings = createServerFn({ method: "POST" })
  .validator(settingsSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    await supabase.from("admin_settings").upsert({
      id: 1,
      site_title: data.siteTitle,
      support_email: data.supportEmail,
      default_language: data.defaultLanguage,
      auto_publish: data.autoPublish,
      notify_on_registration: data.notifyOnRegistration,
    });
    return { ok: true as const, settings: data as AdminSettings };
  });

export const submitJobRegistration = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      gender: z.string(),
      age: z.number(),
      lastWorkedIn: z.string(),
      profession: z.string(),
      subCity: z.string(),
      mobile1: z.string(),
      mobile2: z.string(),
      hasJob: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    await supabase.from("job_registrations").insert({
      id: data.id,
      first_name: data.firstName,
      last_name: data.lastName,
      gender: data.gender,
      age: data.age,
      last_worked_in: data.lastWorkedIn,
      profession: data.profession,
      sub_city: data.subCity,
      mobile1: data.mobile1,
      mobile2: data.mobile2,
      has_job: data.hasJob,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.mobile1,
      status: "New",
    });
    return { ok: true as const };
  });