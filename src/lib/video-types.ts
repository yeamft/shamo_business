import type { DictKey } from "./i18n";

export type VideoCategory = Extract<
  DictKey,
  "cat_opp" | "cat_idea" | "cat_sol" | "cat_invest" | "cat_zones" | "cat_orgs"
>;

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