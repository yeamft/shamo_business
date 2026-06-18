import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  createAdminPost,
  deleteAdminPost,
  getAdminSnapshot,
  markAdminRegistrationReviewed,
  saveAdminSettings as saveAdminSettingsMutation,
  updateAdminPostStatus,
} from "@/lib/api/admin.functions";

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
  youtubeUrl: string;
  shareTo: SocialPlatform[];
};

export type RegistrationRecord = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  age?: number;
  lastWorkedIn?: string;
  profession: string;
  phone: string;
  mobile1?: string;
  mobile2?: string;
  subCity: string;
  hasJob?: string;
  createdAt?: string;
  status: "New" | "Reviewed";
};

export type AdminSettings = {
  siteTitle: string;
  supportEmail: string;
  defaultLanguage: "en" | "am";
  autoPublish: boolean;
  notifyOnRegistration: boolean;
};

type AdminDataContextValue = {
  posts: AdminPost[];
  notifications: number;
  registrations: RegistrationRecord[];
  settings: AdminSettings;
  isLoading: boolean;
  createPost: (form: FormState, status: PostStatus) => Promise<{ ok: true; message: string } | { ok: false; message: string }>;
  updatePostStatus: (postId: string, status: PostStatus) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  markRegistrationReviewed: (registrationId: string) => Promise<void>;
  saveSettings: (settings: AdminSettings) => Promise<void>;
  clearNotifications: () => void;
};

const AdminDataContext = createContext<AdminDataContextValue | null>(null);


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
  youtubeUrl: "",
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
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    siteTitle: "Shamo Business Portal",
    supportEmail: "admin@shamobusiness.com",
    defaultLanguage: "en",
    autoPublish: false,
    notifyOnRegistration: true,
  });
  const [notifications, setNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const snapshot = await getAdminSnapshot();
      setPosts(snapshot.posts);
      setRegistrations(snapshot.registrations);
      setSettings(snapshot.settings);
      setNotifications(snapshot.notifications);
      setIsLoading(false);
    })();
  }, []);

  const value = useMemo<AdminDataContextValue>(
    () => ({
      posts,
      notifications,
      registrations,
      settings,
      isLoading,
      createPost: async (form, status) => {
        if (!form.category || !form.titleEn || !form.titleAm) {
          return { ok: false, message: "Please fill category, English title, and Amharic title before saving." };
        }

        const result = await createAdminPost({ data: { form, status } });
        setPosts((current) => [result.post, ...current]);
        setNotifications((count) => count + 1);
        return { ok: true, message: result.message };
      },
      updatePostStatus: async (postId, status) => {
        await updateAdminPostStatus({ data: { postId, status } });
        setPosts((current) => current.map((post) => (post.id === postId ? { ...post, status } : post)));
      },
      deletePost: async (postId) => {
        await deleteAdminPost({ data: { postId } });
        setPosts((current) => current.filter((post) => post.id !== postId));
      },
      markRegistrationReviewed: async (registrationId) => {
        await markAdminRegistrationReviewed({ data: { registrationId } });
        setRegistrations((current) =>
          current.map((registration) =>
            registration.id === registrationId ? { ...registration, status: "Reviewed" } : registration,
          ),
        );
      },
      saveSettings: async (nextSettings) => {
        await saveAdminSettingsMutation({ data: nextSettings });
        setSettings(nextSettings);
      },
      clearNotifications: () => setNotifications(0),
    }),
    [isLoading, notifications, posts, registrations, settings],
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

export function getCategoryBreakdown(posts: AdminPost[]) {
  return categories.map((category) => ({
    category,
    total: posts.filter((post) => post.category === category).length,
    published: posts.filter((post) => post.category === category && post.status === "Published").length,
  }));
}