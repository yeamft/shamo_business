import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { formatViews, videos } from "./videos";
import type { AdminPost, PostStatus, SocialPlatform, Video } from "./video-types";

const videoCategories = ["cat_opp", "cat_idea", "cat_sol", "cat_invest", "cat_zones", "cat_orgs"] as const;

export type FormState = {
  category: string;
  titleEn: string;
  titleAm: string;
  keywords: string;
  descriptionEn: string;
  descriptionAm: string;
  fileName: string;
  shareTo: SocialPlatform[];
};

export type RegistrationRecord = {
  id: string;
  name: string;
  profession: string;
  phone: string;
  subCity: string;
  status: "New" | "Reviewed";
};

type AdminDataContextValue = {
  posts: AdminPost[];
  notifications: number;
  registrations: RegistrationRecord[];
  createPost: (form: FormState, status: PostStatus) => { ok: true; message: string } | { ok: false; message: string };
  clearNotifications: () => void;
};

const ADMIN_POSTS_KEY = "shamo-admin-posts";

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

const defaultRegistrations: RegistrationRecord[] = [
  { id: "SBP-100204", name: "Abebe Kebede", profession: "Sales Officer", phone: "+251911000001", subCity: "Bole", status: "New" },
  { id: "SBP-100205", name: "Selam Tesfaye", profession: "Accountant", phone: "+251911000002", subCity: "Yeka", status: "Reviewed" },
  { id: "SBP-100206", name: "Hanna Alemu", profession: "Project Coordinator", phone: "+251911000003", subCity: "Lideta", status: "New" },
];

const basePosts: AdminPost[] = videos
  .filter((video): video is Video => videoCategories.includes(video.category as (typeof videoCategories)[number]))
  .slice(0, 12)
  .map((video, index) => ({
  ...video,
  status: (["Draft", "Published", "Scheduled", "Review"] as PostStatus[])[index % 4],
  createdAtLabel: `${video.postedDays}d ago`,
  keywords: `${video.category}, ethiopia, business`,
  descriptionEn: video.titleEn,
  descriptionAm: video.titleAm,
  shareTo: index % 2 === 0 ? ["YouTube", "Facebook"] : ["Instagram"],
  source: "seed",
}));

export const emptyAdminForm: FormState = {
  category: "",
  titleEn: "",
  titleAm: "",
  keywords: "",
  descriptionEn: "",
  descriptionAm: "",
  fileName: "",
  shareTo: [],
};

export function getStatusClasses(status: PostStatus) {
  switch (status) {
    case "Draft":
      return "bg-amber-500/15 text-amber-700";
    case "Published":
      return "bg-success/15 text-success";
    case "Scheduled":
      return "bg-primary/15 text-primary";
    default:
      return "bg-secondary text-foreground";
  }
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<AdminPost[]>(basePosts);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(ADMIN_POSTS_KEY);
    if (!raw) return;

    try {
      setPosts(JSON.parse(raw) as AdminPost[]);
    } catch {
      localStorage.removeItem(ADMIN_POSTS_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(ADMIN_POSTS_KEY, JSON.stringify(posts));
  }, [posts]);

  const value = useMemo<AdminDataContextValue>(
    () => ({
      posts,
      notifications,
      registrations: defaultRegistrations,
      createPost: (form, status) => {
        if (!form.category || !form.titleEn || !form.titleAm) {
          return { ok: false, message: "Please fill category, English title, and Amharic title before saving." };
        }

        const newPost: AdminPost = {
          id: `admin-${Date.now()}`,
          titleEn: form.titleEn,
          titleAm: form.titleAm,
          thumb: videos[0]?.thumb ?? "",
          duration: "00:00",
          views: 0,
          channel: "Shamo Admin",
          channelAm: "ሻሞ አስተዳዳሪ",
          category: form.category as Video["category"],
          postedDays: 0,
          status,
          createdAtLabel: "Just now",
          keywords: form.keywords,
          descriptionEn: form.descriptionEn,
          descriptionAm: form.descriptionAm,
          shareTo: form.shareTo,
          source: "admin",
        };

        setPosts((current) => [newPost, ...current]);
        setNotifications((count) => count + 1);

        return {
          ok: true,
          message:
            status === "Published"
              ? "Video posted successfully and added to the recent posts table."
              : status === "Scheduled"
                ? "Video saved with scheduled status."
                : "Draft saved successfully.",
        };
      },
      clearNotifications: () => setNotifications(0),
    }),
    [notifications, posts],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error("useAdminData must be used within AdminDataProvider");
  return context;
}

export function getDashboardSummary(posts: AdminPost[]) {
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const publishedCount = posts.filter((post) => post.status === "Published").length;
  const scheduledCount = posts.filter((post) => post.status === "Scheduled").length;
  const draftCount = posts.filter((post) => post.status === "Draft").length;

  return {
    totalViews,
    publishedCount,
    scheduledCount,
    draftCount,
    totalVideos: posts.length,
    categoryCount: videoCategories.length,
    formattedTotalViews: formatViews(totalViews),
  };
}

export const categories = [...videoCategories];