import type { DictKey } from "./i18n";

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
  category: DictKey;
  postedDays: number;
};

const thumbs = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
  "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=800&q=80",
  "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
  "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80",
  "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&q=80",
  "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80",
  "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=800&q=80",
  "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=800&q=80",
  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
  "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=800&q=80",
  "https://images.unsplash.com/photo-1571867424488-4565932edb41?w=800&q=80",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
  "https://images.unsplash.com/photo-1604754742629-3e0498a8ec88?w=800&q=80",
  "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
  "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
];

type Seed = Omit<Video, "id" | "thumb">;

const seeds: Record<Exclude<DictKey, "brand" | "tagline" | "home" | "about" | "categories" | "contact" | "admin" | "register" | "recently" | "viewMore" | "views" | "like" | "share" | "subscribe" | "download" | "regLink" | "comments" | "addComment" | "post" | "searchPlaceholder" | "heroCta" | "heroCta2" | "footer_rights">, Seed[]> = {
  cat_opp: [
    { titleEn: "Coffee Export Opportunities in 2026", titleAm: "የቡና ኤክስፖርት እድሎች በ2026", duration: "12:45", views: 24300, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 2 },
    { titleEn: "Textile Manufacturing in Hawassa", titleAm: "በሐዋሳ የጨርቃጨርቅ ምርት", duration: "08:21", views: 15820, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 4 },
    { titleEn: "Agribusiness Growth Sectors", titleAm: "የእርሻ ቢዝነስ የእድገት ዘርፎች", duration: "15:02", views: 31290, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 6 },
    { titleEn: "Tourism Investment Hotspots", titleAm: "የቱሪዝም ኢንቨስትመንት ቦታዎች", duration: "10:18", views: 9870, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 9 },
    { titleEn: "Renewable Energy Projects", titleAm: "የተተኪ ኃይል ፕሮጀክቶች", duration: "14:33", views: 42100, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 11 },
  ],
  cat_idea: [
    { titleEn: "Starting a Cloud Kitchen in Addis", titleAm: "በአዲስ አበባ የክላውድ ኪችን ጅማሬ", duration: "07:52", views: 18450, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 1 },
    { titleEn: "E-commerce for Local Artisans", titleAm: "ለአገር ውስጥ አርቲስቶች ኢ-ኮሜርስ", duration: "09:14", views: 12200, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 3 },
    { titleEn: "Urban Farming Business Models", titleAm: "የከተማ ግብርና የቢዝነስ ሞዴሎች", duration: "11:40", views: 8900, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 5 },
    { titleEn: "Mobile Money & Fintech Ideas", titleAm: "የሞባይል ገንዘብ እና ፊንቴክ ሃሳቦች", duration: "13:25", views: 27330, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 8 },
    { titleEn: "Sustainable Fashion Brands", titleAm: "ዘላቂ የፋሽን ብራንዶች", duration: "08:48", views: 6420, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 10 },
  ],
  cat_sol: [
    { titleEn: "Solving Supply Chain Bottlenecks", titleAm: "የአቅርቦት ሰንሰለት ችግሮችን መፍታት", duration: "16:11", views: 14800, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 2 },
    { titleEn: "Affordable Logistics for SMEs", titleAm: "ለአነስተኛ ድርጅቶች ተመጣጣኝ ሎጂስቲክስ", duration: "10:55", views: 9210, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 4 },
    { titleEn: "Digital Payments Adoption", titleAm: "የዲጂታል ክፍያ መቀበል", duration: "12:09", views: 21450, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 7 },
    { titleEn: "Energy Saving for Factories", titleAm: "ለፋብሪካዎች የኃይል ቁጠባ", duration: "09:36", views: 7340, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 9 },
    { titleEn: "Cold Chain Logistics", titleAm: "የቀዝቃዛ ሰንሰለት ሎጂስቲክስ", duration: "11:02", views: 5980, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 12 },
  ],
  cat_invest: [
    { titleEn: "Why Invest in Ethiopia Now", titleAm: "ለምን አሁን በኢትዮጵያ ኢንቨስት ማድረግ", duration: "18:24", views: 53200, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 1 },
    { titleEn: "Foreign Direct Investment Guide", titleAm: "የውጭ ቀጥተኛ ኢንቨስትመንት መመሪያ", duration: "14:58", views: 33890, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 3 },
    { titleEn: "Tax Incentives & Free Zones", titleAm: "የግብር ማበረታቻ እና ነጻ ዞኖች", duration: "12:30", views: 19400, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 6 },
    { titleEn: "Real Estate Market Outlook", titleAm: "የንግድ ቤት ገበያ እይታ", duration: "10:14", views: 16700, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 8 },
    { titleEn: "Capital Markets in Ethiopia", titleAm: "በኢትዮጵያ የካፒታል ገበያ", duration: "15:47", views: 28210, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 11 },
  ],
  cat_zones: [
    { titleEn: "Hawassa Industrial Park Tour", titleAm: "የሐዋሳ ኢንዱስትሪ ፓርክ ጉብኝት", duration: "20:13", views: 47800, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 2 },
    { titleEn: "Bole Lemi Industrial Park", titleAm: "የቦሌ ለሚ ኢንዱስትሪ ፓርክ", duration: "13:46", views: 22130, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 5 },
    { titleEn: "Kombolcha Industrial Zone", titleAm: "የኮምቦልቻ ኢንዱስትሪ ዞን", duration: "11:22", views: 11890, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 7 },
    { titleEn: "Adama Industrial Park", titleAm: "የአዳማ ኢንዱስትሪ ፓርክ", duration: "14:05", views: 18760, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 9 },
    { titleEn: "Mekelle Industrial Park", titleAm: "የመቐለ ኢንዱስትሪ ፓርክ", duration: "10:51", views: 9420, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 13 },
  ],
  cat_orgs: [
    { titleEn: "Ethiopian Investment Commission", titleAm: "የኢትዮጵያ ኢንቨስትመንት ኮሚሽን", duration: "09:27", views: 12300, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 1 },
    { titleEn: "Ministry of Trade & Industry", titleAm: "የንግድ እና ኢንዱስትሪ ሚኒስቴር", duration: "11:18", views: 8870, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 4 },
    { titleEn: "Addis Chamber of Commerce", titleAm: "የአዲስ አበባ ምክር ቤት", duration: "08:42", views: 6540, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 6 },
    { titleEn: "Development Bank of Ethiopia", titleAm: "የኢትዮጵያ ልማት ባንክ", duration: "13:09", views: 17890, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 8 },
    { titleEn: "Public Private Partnership Office", titleAm: "የመንግስት ግል አጋርነት ቢሮ", duration: "10:31", views: 5210, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 12 },
  ],
};

let thumbIdx = 0;
export const videos: Video[] = Object.entries(seeds).flatMap(([cat, list]) =>
  list.map((s, i) => ({
    ...s,
    id: `${cat}-${i}`,
    thumb: thumbs[thumbIdx++ % thumbs.length],
  })),
);

export const categories: DictKey[] = ["cat_opp", "cat_idea", "cat_sol", "cat_invest", "cat_zones", "cat_orgs"];

export const getVideo = (id: string) => videos.find((v) => v.id === id) ?? videos[0];
export const getByCategory = (cat: DictKey) => videos.filter((v) => v.category === cat);

export const formatViews = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
