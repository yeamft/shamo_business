import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  createAdminPost,
  createAdminCategory,
  deleteAdminPost,
  deleteAdminCategory,
  deleteAdminRegistration,
  getAdminSnapshot,
  markAdminRegistrationReviewed,
  saveAdminSettings as saveAdminSettingsMutation,
  updateAdminCategory,
  updateAdminPostStatus,
} from "@/lib/api/admin.functions";

import { mergeCategories, withCategoryCounts } from "./categories";
import { formatViews, videos } from "./videos";
import type { AdminCategory, AdminPost, PostStatus, SocialPlatform, Video } from "./video-types";

const videoCategories = ["cat_opp", "cat_idea", "cat_sol", "cat_invest", "cat_zones", "cat_orgs"] as const;

export type FormState = {
  category: string;
  titleEn: string;
  titleAm: string;
  keywords: string;
  descriptionEn: string;
  descriptionAm: string;
  fileName: string;
  thumbnailFileName: string;
  thumbnailUrl: string;
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

export type CategoryFormState = {
  id: string;
  slug: string;
  nameEn: string;
  nameAm: string;
  descriptionEn: string;
  descriptionAm: string;
};

type AdminDataContextValue = {
  posts: AdminPost[];
  categories: AdminCategory[];
  notifications: number;
  registrations: RegistrationRecord[];
  settings: AdminSettings;
  isLoading: boolean;
  createPost: (form: FormState, status: PostStatus) => Promise<{ ok: true; message: string } | { ok: false; message: string }>;
  createCategory: (form: CategoryFormState) => Promise<{ ok: true; category: AdminCategory } | { ok: false; message: string }>;
  updateCategory: (categoryId: string, form: CategoryFormState) => Promise<{ ok: true; category: AdminCategory } | { ok: false; message: string }>;
  deleteCategory: (categoryId: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  updatePostStatus: (postId: string, status: PostStatus) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  markRegistrationReviewed: (registrationId: string) => Promise<void>;
  deleteRegistration: (registrationId: string) => Promise<void>;
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
  thumbnailFileName: "",
  thumbnailUrl: "",
  shareTo: [],
};

export const emptyCategoryForm: CategoryFormState = {
  id: "",
  slug: "",
  nameEn: "",
  nameAm: "",
  descriptionEn: "",
  descriptionAm: "",
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
  const [categories, setCategories] = useState<AdminCategory[]>(mergeCategories());
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
      setCategories(withCategoryCounts(snapshot.categories ?? [], snapshot.posts));
      setRegistrations(snapshot.registrations);
      setSettings(snapshot.settings);
      setNotifications(snapshot.notifications);
      setIsLoading(false);
    })();
  }, []);

  const value = useMemo<AdminDataContextValue>(
    () => ({
      posts,
      categories,
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
      createCategory: async (form) => {
        if (!form.id || !form.nameEn || !form.nameAm) {
          return { ok: false, message: "Please provide a category id, English name, and Amharic name." };
        }

        try {
          const result = await createAdminCategory({ data: form });
          setCategories((current) => withCategoryCounts([...current.filter((item) => item.id !== result.category.id), result.category], posts));
          return { ok: true, category: result.category };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : "Unable to create category right now." };
        }
      },
      updateCategory: async (categoryId, form) => {
        if (!form.nameEn || !form.nameAm) {
          return { ok: false, message: "Please provide both English and Amharic names." };
        }

        try {
          const result = await updateAdminCategory({ data: { categoryId, ...form } });
          const nextPosts = posts.map((post) =>
            post.category === categoryId && categoryId !== result.category.id ? { ...post, category: result.category.id } : post,
          );

          setPosts(nextPosts);
          setCategories((current) =>
            withCategoryCounts(
              [
                ...current.filter((item) => item.id !== categoryId && item.id !== result.category.id),
                result.category,
              ],
              nextPosts,
            ),
          );
          return { ok: true, category: result.category };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : "Unable to update category right now." };
        }
      },
      deleteCategory: async (categoryId) => {
        const usedCount = posts.filter((post) => post.category === categoryId).length;
        if (usedCount > 0) {
          return { ok: false, message: "This category is still used by videos. Reassign or delete those videos first." };
        }

        try {
          await deleteAdminCategory({ data: { categoryId } });
          setCategories((current) => current.filter((item) => item.id !== categoryId));
          return { ok: true };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : "Unable to delete category right now." };
        }
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
      deleteRegistration: async (registrationId) => {
        await deleteAdminRegistration({ data: { registrationId } });
        setRegistrations((current) => current.filter((registration) => registration.id !== registrationId));
      },
      saveSettings: async (nextSettings) => {
        await saveAdminSettingsMutation({ data: nextSettings });
        setSettings(nextSettings);
      },
      clearNotifications: () => setNotifications(0),
    }),
    [categories, isLoading, notifications, posts, registrations, settings],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error("useAdminData must be used within AdminDataProvider");
  return context;
}

export function getDashboardSummary(posts: AdminPost[], categoryList: AdminCategory[] = []) {
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
    categoryCount: mergeCategories(categoryList, posts).length,
    formattedTotalViews: formatViews(totalViews),
  };
}

export const categories = [...videoCategories];

export function getCategoryBreakdown(posts: AdminPost[], categoryList: AdminCategory[] = []) {
  return mergeCategories(categoryList, posts).map((category) => ({
    category: category.id,
    labelEn: category.nameEn,
    labelAm: category.nameAm,
    total: posts.filter((post) => post.category === category.id).length,
    published: posts.filter((post) => post.category === category.id && post.status === "Published").length,
  }));
}