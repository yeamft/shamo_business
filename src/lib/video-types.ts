export type VideoCategory = string;

export type AdminCategory = {
  id: string;
  slug: string;
  nameEn: string;
  nameAm: string;
  descriptionEn?: string;
  descriptionAm?: string;
  createdAt?: string;
  videoCount?: number;
  source?: "seed" | "admin";
};

export type Video = {
  id: string;
  titleEn: string;
  titleAm: string;
  thumb: string;
  youtubeUrl?: string;
  duration: string;
  views: number;
  channel: string;
  channelAm: string;
  category: VideoCategory;
  postedDays: number;
};

export type PostStatus = "Draft" | "Published" | "Scheduled" | "Review";
export type SocialPlatform = "YouTube" | "TikTok" | "Instagram" | "Facebook";

export type AdminPost = Video & {
  status: PostStatus;
  createdAtLabel: string;
  keywords: string;
  descriptionEn: string;
  descriptionAm: string;
  shareTo: SocialPlatform[];
  source: "seed" | "admin";
};

export type VideoComment = {
  id: string;
  videoId: string;
  authorName: string;
  message: string;
  createdAt: string;
  createdAtLabel: string;
  likes: number;
  parentId?: string | null;
};

export type Registration = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  age: number;
  lastWorkedIn: string;
  profession: string;
  subCity: string;
  mobile1: string;
  mobile2: string;
  hasJob: "yes" | "no";
};