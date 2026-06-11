import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "am";

type Dict = Record<string, { en: string; am: string }>;

export const dict = {
  brand: { en: "Shamo Business Portal", am: "ሻሞ ቢዝነስ ፖርታል" },
  tagline: {
    en: "Ethiopia's premier hub for business opportunities, ideas & investment",
    am: "የኢትዮጵያ የቢዝነስ እድሎች፣ ሃሳቦች እና ኢንቨስትመንት ማዕከል",
  },
  home: { en: "Home", am: "መነሻ" },
  about: { en: "About Us", am: "ስለ እኛ" },
  categories: { en: "Categories", am: "ምድቦች" },
  contact: { en: "Contact Us", am: "ያግኙን" },
  admin: { en: "Admin", am: "አስተዳዳሪ" },
  register: { en: "Register for Jobs", am: "ለሥራ ይመዝገቡ" },
  recently: { en: "Recently Posted Videos", am: "በቅርቡ የተለጠፉ ቪዲዮዎች" },
  viewMore: { en: "View More", am: "ተጨማሪ ይመልከቱ" },
  views: { en: "views", am: "እይታዎች" },
  like: { en: "Like", am: "ይውደዱ" },
  share: { en: "Share", am: "ያጋሩ" },
  subscribe: { en: "Subscribe", am: "ይመዝገቡ" },
  download: { en: "Download", am: "ያውርዱ" },
  regLink: {
    en: "Click this link for registration",
    am: "ለምዝገባ ይህን ሊንክ ጠቅ ያድርጉ",
  },
  comments: { en: "Comments", am: "አስተያየቶች" },
  addComment: { en: "Add a comment...", am: "አስተያየት ያክሉ..." },
  post: { en: "Post", am: "ይለጥፉ" },
  searchPlaceholder: { en: "Search videos, topics, organizations…", am: "ቪዲዮዎችን፣ ርዕሶችን ይፈልጉ…" },
  heroCta: { en: "Explore Opportunities", am: "እድሎችን ያስሱ" },
  heroCta2: { en: "Watch Latest Videos", am: "የቅርብ ቪዲዮዎችን ይመልከቱ" },
  cat_opp: { en: "Shamo Business Opportunities", am: "ሻሞ የቢዝነስ እድሎች" },
  cat_idea: { en: "Shamo Business Idea", am: "ሻሞ የቢዝነስ ሃሳብ" },
  cat_sol: { en: "Shamo Business Solution Idea", am: "ሻሞ የቢዝነስ መፍትሄ ሃሳብ" },
  cat_invest: { en: "Invest in Ethiopia", am: "በኢትዮጵያ ኢንቨስት ያድርጉ" },
  cat_zones: { en: "Ethiopian Industrial Zones", am: "የኢትዮጵያ ኢንዱስትሪያል ዞኖች" },
  cat_orgs: { en: "Ethiopian Organizations & Institutions", am: "የኢትዮጵያ ድርጅቶች እና ተቋማት" },
  footer_rights: { en: "All rights reserved.", am: "መብቱ የተጠበቀ ነው።" },
} satisfies Dict;

export type DictKey = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string };
const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("shamo-lang") as Lang | null) : null;
    if (saved === "en" || saved === "am") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("shamo-lang", l);
  };

  const t = (k: DictKey) => dict[k][lang];

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

/** Render text in both languages for bilingual layout */
export function Bi({ en, am, className }: { en: string; am: string; className?: string }) {
  const { lang } = useLang();
  return <span className={className}>{lang === "am" ? am : en}</span>;
}
