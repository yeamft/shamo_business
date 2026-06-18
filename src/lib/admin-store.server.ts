import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { AdminSettings, RegistrationRecord } from "./admin-data";
import type { AdminPost, PostStatus, SocialPlatform, Video } from "./video-types";
import { videos } from "./videos";

const videoCategories = ["cat_opp", "cat_idea", "cat_sol", "cat_invest", "cat_zones", "cat_orgs"] as const;

export type AdminSessionUser = {
  username: string;
  displayName: string;
};

export type AdminDatabase = {
  posts: AdminPost[];
  registrations: RegistrationRecord[];
  settings: AdminSettings;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_PATH = path.join(DATA_DIR, "admin-db.json");

const defaultRegistrations: RegistrationRecord[] = [
  { id: "SBP-100204", name: "Abebe Kebede", profession: "Sales Officer", phone: "+251911000001", subCity: "Bole", status: "New" },
  { id: "SBP-100205", name: "Selam Tesfaye", profession: "Accountant", phone: "+251911000002", subCity: "Yeka", status: "Reviewed" },
  { id: "SBP-100206", name: "Hanna Alemu", profession: "Project Coordinator", phone: "+251911000003", subCity: "Lideta", status: "New" },
];

const defaultSettings: AdminSettings = {
  siteTitle: "Shamo Business Portal",
  supportEmail: "admin@shamobusiness.com",
  defaultLanguage: "en",
  autoPublish: false,
  notifyOnRegistration: true,
};

function seedPosts(): AdminPost[] {
  return videos
    .filter((video): video is Video => videoCategories.includes(video.category as (typeof videoCategories)[number]))
    .slice(0, 12)
    .map((video, index) => ({
      ...video,
      status: (["Draft", "Published", "Scheduled", "Review"] as PostStatus[])[index % 4],
      createdAtLabel: `${video.postedDays}d ago`,
      keywords: `${video.category}, ethiopia, business`,
      descriptionEn: video.titleEn,
      descriptionAm: video.titleAm,
      shareTo: index % 2 === 0 ? (["YouTube", "Facebook"] as SocialPlatform[]) : (["Instagram"] as SocialPlatform[]),
      source: "seed",
    }));
}

function createDefaultDatabase(): AdminDatabase {
  return {
    posts: seedPosts(),
    registrations: defaultRegistrations,
    settings: defaultSettings,
  };
}

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function readAdminDatabase(): Promise<AdminDatabase> {
  await ensureDataDir();

  try {
    const raw = await readFile(DB_PATH, "utf8");
    return JSON.parse(raw) as AdminDatabase;
  } catch {
    const initial = createDefaultDatabase();
    await writeAdminDatabase(initial);
    return initial;
  }
}

export async function writeAdminDatabase(database: AdminDatabase) {
  await ensureDataDir();
  await writeFile(DB_PATH, JSON.stringify(database, null, 2), "utf8");
}
