import type { AdminCategory } from "./video-types";

export const seedCategories: AdminCategory[] = [
  {
    id: "cat_opp",
    slug: "shamo-business-opportunities",
    nameEn: "Shamo Business Opportunities",
    nameAm: "ሻሞ የቢዝነስ እድሎች",
    descriptionEn: "Business growth opportunities and market openings.",
    descriptionAm: "የቢዝነስ እድገት እድሎች እና የገበያ ክፍተቶች።",
    source: "seed",
  },
  {
    id: "cat_idea",
    slug: "shamo-business-idea",
    nameEn: "Shamo Business Idea",
    nameAm: "ሻሞ የቢዝነስ ሃሳብ",
    descriptionEn: "Startup ideas and practical concepts for founders.",
    descriptionAm: "ለጀማሪ ስራ ፈጣሪዎች ሃሳቦች እና ተግባራዊ ምክሮች።",
    source: "seed",
  },
  {
    id: "cat_sol",
    slug: "shamo-business-solution-idea",
    nameEn: "Shamo Business Solution Idea",
    nameAm: "ሻሞ የቢዝነስ መፍትሄ ሃሳብ",
    descriptionEn: "Solutions to common operational and growth challenges.",
    descriptionAm: "ለተለመዱ የስራ እና የእድገት ችግሮች መፍትሄዎች።",
    source: "seed",
  },
  {
    id: "cat_invest",
    slug: "invest-in-ethiopia",
    nameEn: "Invest in Ethiopia",
    nameAm: "በኢትዮጵያ ኢንቨስት ያድርጉ",
    descriptionEn: "Investment updates, incentives, and sector outlooks.",
    descriptionAm: "የኢንቨስትመንት ዝማኔዎች፣ ማበረታቻዎች እና የዘርፍ እይታዎች።",
    source: "seed",
  },
  {
    id: "cat_zones",
    slug: "ethiopian-industrial-zones",
    nameEn: "Ethiopian Industrial Zones",
    nameAm: "የኢትዮጵያ ኢንዱስትሪያል ዞኖች",
    descriptionEn: "Industrial parks, zones, and infrastructure features.",
    descriptionAm: "የኢንዱስትሪ ፓርኮች፣ ዞኖች እና የመሠረተ ልማት ገጽታዎች።",
    source: "seed",
  },
  {
    id: "cat_orgs",
    slug: "ethiopian-organizations-and-institutions",
    nameEn: "Ethiopian Organizations & Institutions",
    nameAm: "የኢትዮጵያ ድርጅቶች እና ተቋማት",
    descriptionEn: "Institutions, agencies, and organizations shaping business.",
    descriptionAm: "ቢዝነስን የሚቀርጹ ተቋማት፣ ኤጀንሲዎች እና ድርጅቶች።",
    source: "seed",
  },
];

export function slugifyCategoryName(value: string) {
  if (!value) return "uncategorized";
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatCategoryFallbackLabel(categoryId: string) {
  return categoryId
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function mergeCategories(categories: AdminCategory[] = [], videos: Array<{ category: string }> = []) {
  const map = new Map<string, AdminCategory>();
  const hasCustomCategories = categories.length > 0;

  if (!hasCustomCategories) {
    for (const category of seedCategories) {
      map.set(category.id, category);
    }
  }

  for (const category of categories) {
    map.set(category.id, {
      ...map.get(category.id),
      ...category,
      source: category.source ?? "admin",
    });
  }

  for (const video of videos) {
    if (!map.has(video.category)) {
      map.set(video.category, {
        id: video.category,
        slug: slugifyCategoryName(video.category),
        nameEn: formatCategoryFallbackLabel(video.category),
        nameAm: formatCategoryFallbackLabel(video.category),
        source: "admin",
      });
    }
  }

  return Array.from(map.values());
}

export function getCategoryById(categoryId: string, categories: AdminCategory[] = []) {
  return mergeCategories(categories).find((category) => category.id === categoryId);
}

export function getCategoryLabel(categoryId: string, categories: AdminCategory[] = [], lang: "en" | "am" = "en") {
  const category = getCategoryById(categoryId, categories);
  if (!category) return formatCategoryFallbackLabel(categoryId);
  return lang === "am" ? category.nameAm || category.nameEn : category.nameEn || category.nameAm;
}

export function withCategoryCounts(categories: AdminCategory[] = [], posts: Array<{ category: string }> = []) {
  return mergeCategories(categories, posts).map((category) => ({
    ...category,
    videoCount: posts.filter((post) => post.category === category.id).length,
  }));
}