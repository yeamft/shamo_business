import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as Play, B as BellRing, T as ThumbsUp, E as Eye, S as Share2, D as Download, a as ExternalLink, b as Send, C as CircleCheck, c as Briefcase, M as MapPin, d as Phone, e as Mail, L as LayoutDashboard, V as Video, U as Upload, f as Users, g as ChartColumn, h as Settings, i as Search, j as Bell, Y as Youtube, k as Music2, I as Instagram, F as Facebook, l as Save, m as Calendar, n as EllipsisVertical, o as Target, H as Heart, A as ArrowRight, p as TrendingUp, q as Lightbulb, r as Building2, G as Globe, X, s as Menu, t as ChevronLeft, u as ChevronRight } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-DTodIfQw.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const dict = {
  brand: { en: "Shamo Business Portal", am: "ሻሞ ቢዝነስ ፖርታል" },
  tagline: {
    en: "Ethiopia's premier hub for business opportunities, ideas & investment",
    am: "የኢትዮጵያ የቢዝነስ እድሎች፣ ሃሳቦች እና ኢንቨስትመንት ማዕከል"
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
    am: "ለምዝገባ ይህን ሊንክ ጠቅ ያድርጉ"
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
  footer_rights: { en: "All rights reserved.", am: "መብቱ የተጠበቀ ነው።" }
};
const LangCtx = reactExports.createContext(null);
function LanguageProvider({ children }) {
  const [lang, setLangState] = reactExports.useState("en");
  reactExports.useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("shamo-lang") : null;
    if (saved === "en" || saved === "am") setLangState(saved);
  }, []);
  const setLang = (l) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("shamo-lang", l);
  };
  const t = (k) => dict[k][lang];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LangCtx.Provider, { value: { lang, setLang, t }, children });
}
function useLang() {
  const ctx = reactExports.useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
function Bi({ en, am, className }) {
  const { lang } = useLang();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: lang === "am" ? am : en });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shamo Business Portal · ሻሞ ቢዝነስ ፖርታል" },
      { name: "description", content: "Ethiopia's premier video portal for business opportunities, ideas, investment, industrial zones and organizations." },
      { property: "og:title", content: "Shamo Business Portal · ሻሞ ቢዝነስ ፖርታል" },
      { property: "og:description", content: "Ethiopia's premier video portal for business opportunities, ideas, investment, industrial zones and organizations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Ethiopic:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const nav = [
    { to: "/", labelEn: "Home", labelAm: "መነሻ" },
    { to: "/about", labelEn: "About Us", labelAm: "ስለ እኛ" },
    { to: "/categories", labelEn: "Categories", labelAm: "ምድቦች" },
    { to: "/contact", labelEn: "Contact Us", labelAm: "ያግኙን" }
  ];
  const handleSearch = (event) => {
    event.preventDefault();
    const q = searchTerm.trim();
    void navigate({
      to: "/categories",
      search: q ? { q } : {}
    });
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg gradient-brand text-white shadow-lg shadow-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-current" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-bold text-foreground", children: "Shamo Business" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] font-medium text-muted-foreground font-ethiopic", children: "ሻሞ ቢዝነስ ፖርታል" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "ml-6 hidden items-center gap-1 lg:flex", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:bg-accent [&.active]:text-foreground",
          activeOptions: { exact: n.to === "/" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: n.labelEn, am: n.labelAm })
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "relative hidden md:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              placeholder: t("searchPlaceholder"),
              className: "h-9 w-64 rounded-full border border-border bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setLang(lang === "en" ? "am" : "en"),
            className: "flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-semibold transition-colors hover:bg-accent",
            "aria-label": "Toggle language",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: lang === "en" ? "text-foreground" : "text-muted-foreground", children: "EN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "/" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: lang === "am" ? "text-foreground font-ethiopic" : "text-muted-foreground font-ethiopic", children: "አማ" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            className: "hidden h-9 items-center rounded-full gradient-brand px-4 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] sm:flex",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Register", am: "ይመዝገቡ" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen((o) => !o),
            className: "grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden",
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSearch, className: "mb-3 md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: t("searchPlaceholder"),
            className: "h-10 w-full rounded-full border border-border bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          }
        )
      ] }) }),
      nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          onClick: () => setOpen(false),
          className: "block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: n.labelEn, am: n.labelAm })
        },
        n.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin",
          search: { section: "dashboard" },
          onClick: () => setOpen(false),
          className: "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Admin Dashboard", am: "የአስተዳዳሪ ዳሽቦርድ" })
        }
      )
    ] }) })
  ] });
}
function SiteFooter() {
  const { t } = useLang();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-20 border-t border-border bg-card/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg gradient-brand text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-current" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: "Shamo Business Portal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground font-ethiopic", children: "ሻሞ ቢዝነስ ፖርታል" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: t("tagline") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Explore", am: "ያስሱ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Home", am: "መነሻ" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/categories", className: "hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Categories", am: "ምድቦች" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "About Us", am: "ስለ እኛ" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "For Users", am: "ለተጠቃሚዎች" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Job Registration", am: "የሥራ ምዝገባ" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Contact", am: "ያግኙን" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", search: { section: "dashboard" }, className: "hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Admin", am: "አስተዳዳሪ" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Contact", am: "አድራሻ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Addis Ababa, Ethiopia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "+251 911 000 000" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "info@shamobusiness.et" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8", children: [
      "© 2026 Shamo Business Portal · ሻሞ ቢዝነስ ፖርታል — ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "All rights reserved.", am: "መብቱ የተጠበቀ ነው።" })
    ] }) })
  ] });
}
const Route$6 = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Job Registration · ለሥራ እድል ምዝገባ — Shamo Business Portal" },
      { name: "description", content: "Register for job opportunities through the Shamo Business Portal. ለሥራ እድል ምዝገባ።" }
    ]
  }),
  component: Register
});
const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const autoId = `SBP-${Math.floor(1e5 + Math.random() * 9e5)}`;
function Field({
  labelEn,
  labelAm,
  children,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-baseline justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground", children: [
        labelEn,
        " ",
        required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground font-ethiopic", children: labelAm })
    ] }),
    children
  ] });
}
const inputCls$2 = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-ring";
function Register() {
  const [hasJob, setHasJob] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-2xl font-extrabold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Registration submitted!", am: "ምዝገባዎ ተልኳል!" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "We will contact you when a matching opportunity becomes available.", am: "ተስማሚ የሥራ እድል ሲገኝ እናገኝዎታለን።" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex rounded-full border border-border bg-card px-4 py-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Your ID", am: "የእርስዎ መለያ" }),
          ": ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 font-mono font-bold", children: autoId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSubmitted(false), className: "text-sm font-semibold text-primary hover:underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "← Register another", am: "← ሌላ ይመዝግቡ" }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl gradient-brand p-6 text-white shadow-xl sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-white/15 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-extrabold sm:text-2xl", children: "Registration for Job Opportunity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/85 font-ethiopic", children: "ለሥራ እድል ምዝገባ" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            setSubmitted(true);
          },
          className: "mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Date", labelAm: "ቀን", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", defaultValue: today, readOnly: true, className: `${inputCls$2} bg-secondary/60` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "ID (Auto)", labelAm: "መለያ ቁጥር", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { readOnly: true, value: autoId, className: `${inputCls$2} bg-secondary/60 font-mono` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "First Name", labelAm: "የመጀመሪያ ስም", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, className: inputCls$2, placeholder: "Abebe" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Last Name", labelAm: "የአባት ስም", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, className: inputCls$2, placeholder: "Kebede" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Gender", labelAm: "ጾታ", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, className: inputCls$2, defaultValue: "", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "male", children: "Male / ወንድ" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "female", children: "Female / ሴት" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Age", labelAm: "ዕድሜ", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", min: 16, max: 75, className: inputCls$2, placeholder: "25" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Last Worked In", labelAm: "የመጨረሻ የሥራ ቦታ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls$2, placeholder: "e.g. Ethio Telecom" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Profession", labelAm: "ሙያ", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, className: inputCls$2, placeholder: "Software Engineer" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Sub City", labelAm: "ክፍለ ከተማ", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, className: inputCls$2, defaultValue: "", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "—" }),
                ["Bole", "Yeka", "Kirkos", "Arada", "Lideta", "Addis Ketema", "Gulele", "Kolfe Keranio", "Nifas Silk-Lafto", "Akaky Kaliti", "Lemi Kura"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Mobile 1", labelAm: "ስልክ 1", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "tel", className: inputCls$2, placeholder: "+251 9.." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { labelEn: "Mobile 2", labelAm: "ስልክ 2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", className: inputCls$2, placeholder: "+251 9.." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-baseline justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold", children: [
                    "Do you have a work now? ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground font-ethiopic", children: "አሁን ሥራ አለዎት?" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                  { v: "yes", en: "Yes", am: "አዎ" },
                  { v: "no", en: "No", am: "የለም" }
                ].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setHasJob(o.v),
                    className: `flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition-colors ${hasJob === o.v ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-accent"}`,
                    children: [
                      o.en,
                      " / ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-ethiopic", children: o.am })
                    ]
                  },
                  o.v
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "reset", className: "rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Clear", am: "አጽዳ" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "rounded-full gradient-brand px-8 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Submit", am: "አስገባ / ላክ" })
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
const Route$5 = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us · ያግኙን — Shamo Business Portal" },
      { name: "description", content: "Get in touch with Shamo Business Portal." }
    ]
  }),
  component: Contact
});
const inputCls$1 = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-[1fr_1.2fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold sm:text-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Contact Us", am: "ያግኙን" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Have a story, idea, or partnership in mind? We'd love to hear from you.", am: "ታሪክ፣ ሃሳብ ወይም ሽርክና አለዎት? እንዲሰሙን እንፈልጋለን።" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-5", children: [
          { Icon: MapPin, en: "Addis Ababa, Ethiopia", am: "አዲስ አበባ፣ ኢትዮጵያ" },
          { Icon: Phone, en: "+251 911 000 000", am: "+251 911 000 000" },
          { Icon: Mail, en: "info@shamobusiness.et", am: "info@shamobusiness.et" }
        ].map(({ Icon, en, am }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: en }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-ethiopic", children: am })
          ] })
        ] }, en)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => e.preventDefault(),
          className: "rounded-2xl border border-border bg-card p-6 sm:p-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Send us a message", am: "መልዕክት ይላኩልን" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Name", am: "ስም" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls$1, required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Email", am: "ኢሜይል" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", className: inputCls$1, required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Subject", am: "ርዕሰ ጉዳይ" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls$1 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Message", am: "መልዕክት" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, className: "w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring", required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-5 inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-2.5 text-sm font-bold text-white shadow-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Send", am: "ላክ" })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
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
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
];
const seeds = {
  cat_opp: [
    { titleEn: "Coffee Export Opportunities in 2026", titleAm: "የቡና ኤክስፖርት እድሎች በ2026", duration: "12:45", views: 24300, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 2 },
    { titleEn: "Textile Manufacturing in Hawassa", titleAm: "በሐዋሳ የጨርቃጨርቅ ምርት", duration: "08:21", views: 15820, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 4 },
    { titleEn: "Agribusiness Growth Sectors", titleAm: "የእርሻ ቢዝነስ የእድገት ዘርፎች", duration: "15:02", views: 31290, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 6 },
    { titleEn: "Tourism Investment Hotspots", titleAm: "የቱሪዝም ኢንቨስትመንት ቦታዎች", duration: "10:18", views: 9870, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 9 },
    { titleEn: "Renewable Energy Projects", titleAm: "የተተኪ ኃይል ፕሮጀክቶች", duration: "14:33", views: 42100, channel: "Shamo Business", channelAm: "ሻሞ ቢዝነስ", category: "cat_opp", postedDays: 11 }
  ],
  cat_idea: [
    { titleEn: "Starting a Cloud Kitchen in Addis", titleAm: "በአዲስ አበባ የክላውድ ኪችን ጅማሬ", duration: "07:52", views: 18450, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 1 },
    { titleEn: "E-commerce for Local Artisans", titleAm: "ለአገር ውስጥ አርቲስቶች ኢ-ኮሜርስ", duration: "09:14", views: 12200, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 3 },
    { titleEn: "Urban Farming Business Models", titleAm: "የከተማ ግብርና የቢዝነስ ሞዴሎች", duration: "11:40", views: 8900, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 5 },
    { titleEn: "Mobile Money & Fintech Ideas", titleAm: "የሞባይል ገንዘብ እና ፊንቴክ ሃሳቦች", duration: "13:25", views: 27330, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 8 },
    { titleEn: "Sustainable Fashion Brands", titleAm: "ዘላቂ የፋሽን ብራንዶች", duration: "08:48", views: 6420, channel: "Shamo Ideas", channelAm: "ሻሞ ሃሳቦች", category: "cat_idea", postedDays: 10 }
  ],
  cat_sol: [
    { titleEn: "Solving Supply Chain Bottlenecks", titleAm: "የአቅርቦት ሰንሰለት ችግሮችን መፍታት", duration: "16:11", views: 14800, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 2 },
    { titleEn: "Affordable Logistics for SMEs", titleAm: "ለአነስተኛ ድርጅቶች ተመጣጣኝ ሎጂስቲክስ", duration: "10:55", views: 9210, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 4 },
    { titleEn: "Digital Payments Adoption", titleAm: "የዲጂታል ክፍያ መቀበል", duration: "12:09", views: 21450, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 7 },
    { titleEn: "Energy Saving for Factories", titleAm: "ለፋብሪካዎች የኃይል ቁጠባ", duration: "09:36", views: 7340, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 9 },
    { titleEn: "Cold Chain Logistics", titleAm: "የቀዝቃዛ ሰንሰለት ሎጂስቲክስ", duration: "11:02", views: 5980, channel: "Shamo Solutions", channelAm: "ሻሞ መፍትሄዎች", category: "cat_sol", postedDays: 12 }
  ],
  cat_invest: [
    { titleEn: "Why Invest in Ethiopia Now", titleAm: "ለምን አሁን በኢትዮጵያ ኢንቨስት ማድረግ", duration: "18:24", views: 53200, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 1 },
    { titleEn: "Foreign Direct Investment Guide", titleAm: "የውጭ ቀጥተኛ ኢንቨስትመንት መመሪያ", duration: "14:58", views: 33890, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 3 },
    { titleEn: "Tax Incentives & Free Zones", titleAm: "የግብር ማበረታቻ እና ነጻ ዞኖች", duration: "12:30", views: 19400, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 6 },
    { titleEn: "Real Estate Market Outlook", titleAm: "የንግድ ቤት ገበያ እይታ", duration: "10:14", views: 16700, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 8 },
    { titleEn: "Capital Markets in Ethiopia", titleAm: "በኢትዮጵያ የካፒታል ገበያ", duration: "15:47", views: 28210, channel: "Invest ET", channelAm: "ኢንቨስት ET", category: "cat_invest", postedDays: 11 }
  ],
  cat_zones: [
    { titleEn: "Hawassa Industrial Park Tour", titleAm: "የሐዋሳ ኢንዱስትሪ ፓርክ ጉብኝት", duration: "20:13", views: 47800, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 2 },
    { titleEn: "Bole Lemi Industrial Park", titleAm: "የቦሌ ለሚ ኢንዱስትሪ ፓርክ", duration: "13:46", views: 22130, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 5 },
    { titleEn: "Kombolcha Industrial Zone", titleAm: "የኮምቦልቻ ኢንዱስትሪ ዞን", duration: "11:22", views: 11890, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 7 },
    { titleEn: "Adama Industrial Park", titleAm: "የአዳማ ኢንዱስትሪ ፓርክ", duration: "14:05", views: 18760, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 9 },
    { titleEn: "Mekelle Industrial Park", titleAm: "የመቐለ ኢንዱስትሪ ፓርክ", duration: "10:51", views: 9420, channel: "ET Zones", channelAm: "ET ዞኖች", category: "cat_zones", postedDays: 13 }
  ],
  cat_orgs: [
    { titleEn: "Ethiopian Investment Commission", titleAm: "የኢትዮጵያ ኢንቨስትመንት ኮሚሽን", duration: "09:27", views: 12300, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 1 },
    { titleEn: "Ministry of Trade & Industry", titleAm: "የንግድ እና ኢንዱስትሪ ሚኒስቴር", duration: "11:18", views: 8870, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 4 },
    { titleEn: "Addis Chamber of Commerce", titleAm: "የአዲስ አበባ ምክር ቤት", duration: "08:42", views: 6540, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 6 },
    { titleEn: "Development Bank of Ethiopia", titleAm: "የኢትዮጵያ ልማት ባንክ", duration: "13:09", views: 17890, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 8 },
    { titleEn: "Public Private Partnership Office", titleAm: "የመንግስት ግል አጋርነት ቢሮ", duration: "10:31", views: 5210, channel: "ET Gov", channelAm: "ET ጎቨ", category: "cat_orgs", postedDays: 12 }
  ]
};
let thumbIdx = 0;
const videos = Object.entries(seeds).flatMap(
  ([cat, list]) => list.map((s, i) => ({
    ...s,
    id: `${cat}-${i}`,
    thumb: thumbs[thumbIdx++ % thumbs.length]
  }))
);
const categories = ["cat_opp", "cat_idea", "cat_sol", "cat_invest", "cat_zones", "cat_orgs"];
const getVideo = (id) => videos.find((v) => v.id === id) ?? videos[0];
const getByCategory = (cat) => videos.filter((v) => v.category === cat);
const formatViews = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : `${n}`;
const Route$4 = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories · ምድቦች — Shamo Business Portal" },
      { name: "description", content: "Browse all business video categories on Shamo Business Portal." }
    ]
  }),
  component: Categories
});
function Categories() {
  const { lang } = useLang();
  const [active, setActive] = reactExports.useState("all");
  const list = active === "all" ? categories.flatMap(getByCategory) : getByCategory(active);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-card/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold sm:text-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "All Categories", am: "ሁሉም ምድቦች" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Explore Ethiopian business content by topic.", am: "በርዕስ የኢትዮጵያን የቢዝነስ ይዘት ያስሱ።" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActive("all"),
            className: `rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${active === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "All", am: "ሁሉም" })
          }
        ),
        categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActive(c),
            className: `rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${active === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`,
            children: dict[c][lang]
          },
          c
        ))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: list.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/video/$videoId",
        params: { videoId: v.id },
        className: "group block",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden rounded-xl bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.thumb, alt: "", className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white", children: v.duration }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-14 w-14 place-items-center rounded-full bg-white/95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-6 w-6 translate-x-0.5 fill-primary text-primary" }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary", children: lang === "am" ? v.titleAm : v.titleEn }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 line-clamp-1 text-xs text-muted-foreground font-ethiopic", children: lang === "am" ? v.titleEn : v.titleAm }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang === "am" ? v.channelAm : v.channel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
              " ",
              formatViews(v.views)
            ] })
          ] })
        ]
      },
      v.id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
const Route$3 = createFileRoute("/admin")({
  validateSearch: (search) => ({
    section: typeof search.section === "string" && ["dashboard", "videos", "post", "registrations", "analytics", "settings"].includes(search.section) ? search.section : "dashboard"
  }),
  head: () => ({
    meta: [
      { title: "Admin Dashboard · Shamo Business Portal" },
      { name: "description", content: "Manage videos, categories and posts on Shamo Business Portal." }
    ]
  }),
  component: Admin
});
const inputCls = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const navItems = [
  { key: "dashboard", Icon: LayoutDashboard, en: "Dashboard", am: "ዳሽቦርድ" },
  { key: "videos", Icon: Video, en: "Videos", am: "ቪዲዮዎች" },
  { key: "post", Icon: Upload, en: "Post Video", am: "ቪዲዮ ይለጥፉ" },
  { key: "registrations", Icon: Users, en: "Registrations", am: "ምዝገባዎች" },
  { key: "analytics", Icon: ChartColumn, en: "Analytics", am: "ትንታኔዎች" },
  { key: "settings", Icon: Settings, en: "Settings", am: "ቅንብሮች" }
];
const basePosts = videos.slice(0, 12).map((video, index) => ({
  ...video,
  status: ["Draft", "Published", "Scheduled", "Review"][index % 4],
  createdAtLabel: `${video.postedDays}d ago`,
  keywords: `${video.category}, ethiopia, business`,
  descriptionEn: video.titleEn,
  descriptionAm: video.titleAm,
  shareTo: index % 2 === 0 ? ["YouTube", "Facebook"] : ["Instagram"]
}));
const emptyForm = {
  category: "",
  titleEn: "",
  titleAm: "",
  keywords: "",
  descriptionEn: "",
  descriptionAm: "",
  fileName: "",
  shareTo: []
};
function getStatusClasses(status) {
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
function Admin() {
  const navigate = useNavigate({ from: "/admin" });
  const { section: activeSection } = Route$3.useSearch();
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [posts, setPosts] = reactExports.useState(basePosts);
  const [selectedCategory, setSelectedCategory] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [notifications, setNotifications] = reactExports.useState(3);
  const [form, setForm] = reactExports.useState(emptyForm);
  const filteredPosts = reactExports.useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const haystack = [post.titleEn, post.titleAm, post.channel, post.channelAm, post.keywords, post.status].join(" ").toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchTerm, selectedCategory]);
  const totalViews = reactExports.useMemo(() => posts.reduce((sum, post) => sum + post.views, 0), [posts]);
  const publishedCount = reactExports.useMemo(() => posts.filter((post) => post.status === "Published").length, [posts]);
  const scheduledCount = reactExports.useMemo(() => posts.filter((post) => post.status === "Scheduled").length, [posts]);
  const draftCount = reactExports.useMemo(() => posts.filter((post) => post.status === "Draft").length, [posts]);
  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };
  const toggleShareTo = (platform) => {
    setForm((current) => ({
      ...current,
      shareTo: current.shareTo.includes(platform) ? current.shareTo.filter((item) => item !== platform) : [...current.shareTo, platform]
    }));
  };
  const submitPost = (status) => {
    if (!form.category || !form.titleEn || !form.titleAm) {
      setMessage("Please fill category, English title, and Amharic title before saving.");
      return;
    }
    const newPost = {
      id: `admin-${Date.now()}`,
      titleEn: form.titleEn,
      titleAm: form.titleAm,
      thumb: videos[0]?.thumb ?? "",
      duration: "00:00",
      views: 0,
      channel: "Shamo Admin",
      channelAm: "ሻሞ አስተዳዳሪ",
      category: form.category,
      postedDays: 0,
      status,
      createdAtLabel: "Just now",
      keywords: form.keywords,
      descriptionEn: form.descriptionEn,
      descriptionAm: form.descriptionAm,
      shareTo: form.shareTo
    };
    setPosts((current) => [newPost, ...current]);
    setForm(emptyForm);
    void navigate({ search: (prev) => ({ ...prev, section: "videos" }) });
    setNotifications((count) => count + 1);
    setMessage(
      status === "Published" ? "Video posted successfully and added to the recent posts table." : status === "Scheduled" ? "Video saved with scheduled status." : "Draft saved successfully."
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-[260px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden border-r border-border bg-card lg:block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center gap-2 border-b border-border px-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg gradient-brand text-white text-sm font-bold", children: "SB" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: "Admin Portal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground font-ethiopic", children: "የአስተዳዳሪ ፖርታል" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1 p-3", children: navItems.map(({ key, Icon, en, am }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin",
          search: { section: key },
          className: `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeSection === key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en, am }) })
          ]
        },
        key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block rounded-lg border border-border bg-background px-3 py-2 text-center text-xs font-semibold hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "← Back to Site", am: "← ወደ ድረ-ገጹ ይመለሱ" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bi,
          {
            en: navItems.find((item) => item.key === activeSection)?.en ?? "Dashboard",
            am: navItems.find((item) => item.key === activeSection)?.am ?? "ዳሽቦርድ"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden sm:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search posts…", className: "h-9 w-64 rounded-full border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setNotifications(0), className: "relative grid h-9 w-9 place-items-center rounded-full border border-border bg-background", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
            notifications > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] text-white", children: notifications })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full gradient-brand text-xs font-bold text-white", children: "AB" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-6 p-4 sm:p-6", children: [
        message && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
          { en: "Total Videos", am: "ጠቅላላ ቪዲዮዎች", value: `${posts.length}`, note: `${publishedCount} published` },
          { en: "Total Views", am: "ጠቅላላ እይታዎች", value: formatViews(totalViews), note: `${scheduledCount} scheduled` },
          { en: "Drafts", am: "ድራፍቶች", value: `${draftCount}`, note: `${notifications} new alerts` },
          { en: "Categories", am: "ምድቦች", value: `${categories.length}`, note: `${filteredPosts.length} visible posts` }
        ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: card.en, am: card.am }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-extrabold", children: card.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs font-medium text-success", children: card.note })
        ] }, card.en)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.2fr_1fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Post a New Video", am: "አዲስ ቪዲዮ ይለጥፉ" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Bilingual: fill English & Amharic fields", am: "ሁለት ቋንቋ: እንግሊዘኛ እና አማርኛ ይሙሉ" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setForm(emptyForm);
                    setMessage("Form cleared.");
                  },
                  className: "rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-accent",
                  children: "Reset"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold", children: [
                  "Category / ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-ethiopic", children: "ምድብ" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: `mt-1.5 ${inputCls}`, value: form.category, onChange: (e) => updateForm("category", e.target.value), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select category" }),
                  categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c, children: [
                    dict[c].en,
                    " · ",
                    dict[c].am
                  ] }, c))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold", children: "Title (EN)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.titleEn, onChange: (e) => updateForm("titleEn", e.target.value), className: `mt-1.5 ${inputCls}`, placeholder: "Video title in English" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold font-ethiopic", children: "ርዕስ (አማ)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.titleAm, onChange: (e) => updateForm("titleAm", e.target.value), className: `mt-1.5 ${inputCls} font-ethiopic`, placeholder: "የቪዲዮ ርዕስ በአማርኛ" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold", children: [
                  "Keywords / ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-ethiopic", children: "ቁልፍ ቃላት" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.keywords, onChange: (e) => updateForm("keywords", e.target.value), className: `mt-1.5 ${inputCls}`, placeholder: "investment, ethiopia, manufacturing, ኢንቨስት" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold", children: "Description (EN)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.descriptionEn, onChange: (e) => updateForm("descriptionEn", e.target.value), rows: 4, className: `mt-1.5 w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring`, placeholder: "Describe the video…" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold font-ethiopic", children: "መግለጫ (አማ)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.descriptionAm, onChange: (e) => updateForm("descriptionAm", e.target.value), rows: 4, className: `mt-1.5 w-full rounded-lg border border-input bg-background p-3 text-sm font-ethiopic focus:outline-none focus:ring-2 focus:ring-ring`, placeholder: "ቪዲዮውን ይግለጹ…" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold", children: [
                  "Video file / ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-ethiopic", children: "የቪዲዮ ፋይል" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-1.5 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-8 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "video/*", className: "hidden", onChange: (e) => updateForm("fileName", e.target.files?.[0]?.name ?? "") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mx-auto h-7 w-7 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Drag & drop or click to upload", am: "ይጎትቱ ወይም ይጫኑ" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: form.fileName || "MP4, MOV up to 2GB" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Cross-post to", am: "በተጨማሪ ይለጥፉ" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: [
                  { Icon: Youtube, name: "YouTube" },
                  { Icon: Music2, name: "TikTok" },
                  { Icon: Instagram, name: "Instagram" },
                  { Icon: Facebook, name: "Facebook" }
                ].map(({ Icon, name }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleShareTo(name),
                    className: `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${form.shareTo.includes(name) ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-accent"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
                      name
                    ]
                  },
                  name
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => submitPost("Draft"), className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-accent", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Save as Draft", am: "ድራፍት አስቀምጥ" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => submitPost("Scheduled"), className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-accent", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Schedule", am: "ጊዜ ቀጥር" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => submitPost("Published"), className: "ml-auto inline-flex items-center gap-1.5 rounded-full gradient-brand px-5 py-2 text-xs font-bold text-white shadow-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Post Now", am: "አሁን ይለጥፉ" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Recent Posts", am: "የቅርብ ልጥፎች" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold", value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All categories" }),
                categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: category, children: dict[category].en }, category))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[520px] text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left text-xs uppercase text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Title", am: "ርዕስ" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Views", am: "እይታዎች" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Status", am: "ሁኔታ" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Shared", am: "የተጋራ" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                filteredPosts.slice(0, 10).map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 last:border-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.thumb, alt: "", className: "h-10 w-16 shrink-0 rounded object-cover" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-semibold", children: post.titleEn }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] text-muted-foreground font-ethiopic", children: post.titleAm }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: post.createdAtLabel })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2 text-sm", children: formatViews(post.views) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusClasses(post.status)}`, children: post.status }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-2 text-xs text-muted-foreground", children: post.shareTo.length ? post.shareTo.join(", ") : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMessage(`Selected: ${post.titleEn}`), className: "grid h-7 w-7 place-items-center rounded-full hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) })
                ] }, post.id)),
                filteredPosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "py-8 text-center text-sm text-muted-foreground", children: "No posts matched your current search or category filter." }) })
              ] })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const Route$2 = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us · ስለ እኛ — Shamo Business Portal" },
      { name: "description", content: "About Shamo Business Portal — Ethiopia's bilingual business video platform." }
    ]
  }),
  component: About
});
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gradient-hero py-16 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-extrabold sm:text-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "About Shamo Business Portal", am: "ስለ ሻሞ ቢዝነስ ፖርታል" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-white/85", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Connecting entrepreneurs, investors, and institutions across Ethiopia through video.", am: "ሥራ ፈጣሪዎችን፣ ኢንቨስተሮችን እና ተቋማትን በቪዲዮ የምናገናኝ።" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: [
        { Icon: Target, en: "Our Mission", am: "ተልዕኳችን", desc_en: "Democratize access to business knowledge in Ethiopia through bilingual video content.", desc_am: "በኢትዮጵያ የቢዝነስ እውቀትን በሁለት ቋንቋ ቪዲዮ ማድረስ።" },
        { Icon: Eye, en: "Our Vision", am: "ራዕያችን", desc_en: "Become the leading business media platform for the Horn of Africa.", desc_am: "የቀንድ አፍሪካ ግንባር ቀደም የቢዝነስ ሚዲያ መድረክ መሆን።" },
        { Icon: Heart, en: "Our Values", am: "እሴቶቻችን", desc_en: "Authenticity, accessibility, and community impact.", desc_am: "እውነተኝነት፣ ተደራሽነት እና የማህበረሰብ ተጽዕኖ።" }
      ].map(({ Icon, en, am, desc_en, desc_am }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en, am }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: desc_en, am: desc_am }) })
      ] }, en)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Our Story", am: "ታሪካችን" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bi,
          {
            en: "Shamo Business Portal was founded with the belief that great ideas deserve to reach every corner of Ethiopia. We produce, curate, and distribute high-quality video content about business opportunities, investment frameworks, industrial zones, and the organizations powering the country's economic growth.",
            am: "ሻሞ ቢዝነስ ፖርታል የተመሰረተው ጥሩ ሃሳቦች በመላው ኢትዮጵያ ሊደርሱ ይገባል በሚል እምነት ነው። ስለ ቢዝነስ እድሎች፣ የኢንቨስትመንት ማዕቀፎች፣ ኢንዱስትሪያል ዞኖች እና የአገሪቱን ኢኮኖሚያዊ እድገት ስለሚያንቀሳቅሱ ድርጅቶች ከፍተኛ ጥራት ያላቸውን ቪዲዮዎች እናመርታለን።"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function VideoCard({ v }) {
  const { lang } = useLang();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/video/$videoId",
      params: { videoId: v.id },
      className: "group block w-[260px] shrink-0 sm:w-[280px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden rounded-xl bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: v.thumb,
              alt: lang === "am" ? v.titleAm : v.titleEn,
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white", children: v.duration }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-full bg-white/95 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-6 w-6 translate-x-0.5 fill-primary text-primary" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary", children: lang === "am" ? v.titleAm : v.titleEn }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-xs text-muted-foreground font-ethiopic", children: lang === "am" ? v.titleEn : v.titleAm }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: lang === "am" ? v.channelAm : v.channel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
              " ",
              formatViews(v.views)
            ] })
          ] })
        ] })
      ]
    }
  );
}
function VideoCarousel({ category, titleEn, titleAm }) {
  const ref = reactExports.useRef(null);
  const items = getByCategory(category);
  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * 600, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate text-lg font-bold text-foreground sm:text-xl", children: titleEn }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-muted-foreground font-ethiopic", children: titleAm })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/categories",
            className: "hidden text-sm font-semibold text-primary hover:underline sm:inline",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "View More →", am: "ተጨማሪ →" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => scroll(-1),
            className: "grid h-9 w-9 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-accent",
            "aria-label": "Previous",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => scroll(1),
            className: "grid h-9 w-9 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-accent",
            "aria-label": "Next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: "mt-4 flex gap-4 overflow-x-auto scroll-smooth px-4 pb-3 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        children: items.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { v }, v.id))
      }
    )
  ] });
}
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shamo Business Portal · ሻሞ ቢዝነስ ፖርታል" },
      { name: "description", content: "Discover Ethiopian business opportunities, investment insights, industrial zones, and organizations in video format — bilingual English & Amharic." }
    ]
  }),
  component: Home
});
const stats = [
  { en: "Videos", am: "ቪዲዮዎች", v: "1,240+" },
  { en: "Categories", am: "ምድቦች", v: "6" },
  { en: "Monthly Viewers", am: "ወርሃዊ ተመልካቾች", v: "85K" },
  { en: "Industrial Zones", am: "ኢንዱስትሪ ዞኖች", v: "12" }
];
const highlights = [
  { Icon: TrendingUp, en: "Business Opportunities", am: "የቢዝነስ እድሎች", desc_en: "Real, vetted sectors with growth potential.", desc_am: "ትክክለኛ የእድገት ዘርፎች።" },
  { Icon: Lightbulb, en: "Fresh Ideas", am: "አዳዲስ ሃሳቦች", desc_en: "From cloud kitchens to fintech.", desc_am: "ከክላውድ ኪችን እስከ ፊንቴክ።" },
  { Icon: Building2, en: "Industrial Zones", am: "ኢንዱስትሪ ዞኖች", desc_en: "Inside tours of Ethiopia's parks.", desc_am: "የኢትዮጵያ ፓርኮች ጉብኝት።" },
  { Icon: Briefcase, en: "Job Registration", am: "የሥራ ምዝገባ", desc_en: "Get matched with employers.", desc_am: "ከቀጣሪዎች ጋር ይገናኙ።" }
];
const featuredVideo = getVideo("cat_invest-0");
const featuredVideoEmbed = "https://www.youtube.com/embed/NMYWBOTeg1I";
function Home() {
  const { lang, t } = useLang();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-hero" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.7_0.18_180/0.25),transparent_50%),radial-gradient(circle_at_80%_60%,oklch(0.6_0.2_150/0.3),transparent_60%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,transparent,oklch(0.18_0.03_250/0.4))]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "New videos every week", am: "ሳምንታዊ አዳዲስ ቪዲዮዎች" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Ethiopia's Business Video Portal", am: "የኢትዮጵያ የቢዝነስ ቪዲዮ ፖርታል" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-base text-white/85 sm:text-lg", children: t("tagline") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm text-white/70 font-ethiopic", children: lang === "en" ? dict.tagline.am : dict.tagline.en }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/categories",
                className: "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-[1.02]",
                children: [
                  t("heroCta"),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/video/$videoId",
                params: { videoId: "cat_invest-0" },
                className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-current" }),
                  " ",
                  t("heroCta2")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] uppercase tracking-wide text-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: s.en, am: s.am }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-xl font-bold", children: s.v })
          ] }, s.en)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              className: "h-full w-full",
              src: featuredVideoEmbed,
              title: featuredVideo.titleEn,
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              referrerPolicy: "strict-origin-when-cross-origin",
              allowFullScreen: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/45 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold uppercase tracking-wider text-emerald-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Featured · Invest in Ethiopia", am: "ተመራጭ · በኢትዮጵያ ኢንቨስት" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-bold leading-tight", children: lang === "am" ? featuredVideo.titleAm : featuredVideo.titleEn }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-white/80", children: [
              (featuredVideo.views / 1e3).toFixed(1),
              "K ",
              t("views"),
              " · ",
              featuredVideo.duration
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: highlights.map(({ Icon, en, am, desc_en, desc_am }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-sm font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en, am }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: desc_en, am: desc_am }) })
    ] }, en)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 border-b border-border pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold tracking-tight", children: t("recently") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-ethiopic", children: lang === "en" ? dict.recently.am : dict.recently.en })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/categories", className: "text-sm font-semibold text-primary hover:underline", children: [
        t("viewMore"),
        " →"
      ] })
    ] }) }),
    categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCarousel, { category: c, titleEn: dict[c].en, titleAm: dict[c].am }, c)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl gradient-brand p-8 text-white sm:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-extrabold sm:text-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Looking for a job opportunity?", am: "የሥራ እድል እየፈለጉ ነው?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/85", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Register your profile and get matched with verified employers across Ethiopia.", am: "መገለጫዎን ያስመዝግቡ እና ከተረጋገጡ ቀጣሪዎች ጋር ይገናኙ።" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/register",
            className: "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-primary shadow-xl transition-transform hover:scale-[1.02]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Register for Job Opportunity", am: "ለሥራ እድል ይመዝገቡ" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
const Route = createFileRoute("/video/$videoId")({
  loader: ({ params }) => {
    const v = getVideo(params.videoId);
    if (!v) throw notFound();
    return { video: v };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.video.titleEn} · Shamo Business Portal` },
      { name: "description", content: `${loaderData?.video.titleEn} — ${loaderData?.video.titleAm}` },
      { property: "og:image", content: loaderData?.video.thumb }
    ]
  }),
  component: VideoPage
});
const sampleComments = [
  { name: "Hanna A.", nameAm: "ሃና አ.", text: "Very informative, thank you!", textAm: "በጣም ጠቃሚ ነው፣ አመሰግናለሁ!", time: "2h" },
  { name: "Yonas T.", nameAm: "ዮናስ ት.", text: "Where can I find more about the registration process?", textAm: "ስለ ምዝገባ ሂደት የበለጠ የት ማግኘት እችላለሁ?", time: "5h" },
  { name: "Selam B.", nameAm: "ሰላም ብ.", text: "Excellent video — please post more on industrial parks.", textAm: "በጣም ጥሩ ቪዲዮ — ስለ ኢንዱስትሪያል ፓርኮች ተጨማሪ ይለጥፉ።", time: "1d" }
];
function VideoPage() {
  const { video } = Route.useLoaderData();
  const { lang, t } = useLang();
  const [liked, setLiked] = reactExports.useState(false);
  const [subscribed, setSubscribed] = reactExports.useState(false);
  const related = videos.filter((v) => v.id !== video.id).slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: video.thumb, alt: "", className: "h-full w-full object-cover opacity-80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-20 w-20 place-items-center rounded-full bg-white/95 shadow-2xl transition-transform hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-9 w-9 translate-x-1 fill-primary text-primary" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full rounded-full bg-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-1/3 rounded-full bg-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between text-xs text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "04:12 / ",
                video.duration
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "HD" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1x" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl", children: lang === "am" ? video.titleAm : video.titleEn }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground font-ethiopic", children: lang === "am" ? video.titleEn : video.titleAm })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 shrink-0 place-items-center rounded-full gradient-brand text-sm font-bold text-white", children: "SB" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-semibold", children: lang === "am" ? video.channelAm : video.channel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "124K subscribers", am: "124ሺ ተመዝጋቢዎች" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setSubscribed((s) => !s),
                className: `ml-2 shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${subscribed ? "border border-border bg-secondary text-foreground" : "bg-foreground text-background hover:bg-foreground/90"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "mr-1 inline h-3.5 w-3.5" }),
                  subscribed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Subscribed", am: "ተመዝግቧል" }) : t("subscribe")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex flex-wrap items-center gap-2 sm:col-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center rounded-full border border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setLiked((l) => !l),
                  className: `inline-flex items-center gap-1.5 rounded-l-full px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent ${liked ? "text-primary" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: `h-3.5 w-3.5 ${liked ? "fill-primary" : ""}` }),
                    " ",
                    formatViews(video.views / 12),
                    " ",
                    t("like")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 text-xs text-muted-foreground inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
                " ",
                formatViews(video.views),
                " ",
                t("views")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" }),
              " ",
              t("share")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
              " ",
              t("download")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/register",
            className: "mt-5 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold text-success hover:bg-success/15",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: t("regLink") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success px-3 py-1 text-xs font-bold text-success-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Register", am: "ይመዝገቡ" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-muted-foreground", children: [
            formatViews(video.views),
            " ",
            t("views"),
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: `${video.postedDays} days ago`, am: `ከ ${video.postedDays} ቀናት በፊት` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bi,
            {
              en: "In this episode we explore the latest developments, opportunities and practical paths for entrepreneurs and investors interested in Ethiopia's growing economy.",
              am: "በዚህ ክፍል የቅርብ ጊዜ እድገቶችን፣ እድሎችን እና ለሥራ ፈጣሪዎች እና በኢትዮጵያ ኢኮኖሚ ላይ ፍላጎት ላላቸው ኢንቨስተሮች ተግባራዊ መንገዶችን እንመለከታለን።"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold", children: [
            t("comments"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-sm font-normal text-muted-foreground", children: [
              "(",
              sampleComments.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold", children: "You" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  placeholder: t("addComment"),
                  className: "h-10 w-full rounded-full border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-full gradient-brand px-4 py-2 text-xs font-semibold text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
                " ",
                t("post")
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-5", children: sampleComments.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary", children: c.name.slice(0, 2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: lang === "am" ? c.nameAm : c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "· ",
                  c.time
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm", children: lang === "am" ? c.textAm : c.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-3 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "hover:text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "inline h-3 w-3" }),
                  " 12"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Reply", am: "ምላሽ" }) })
              ] })
            ] })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bi, { en: "Up Next", am: "ቀጣይ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-3", children: related.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/video/$videoId",
            params: { videoId: v.id },
            className: "group flex gap-3 rounded-lg p-1 transition-colors hover:bg-accent",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video w-40 shrink-0 overflow-hidden rounded-md bg-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.thumb, alt: "", className: "h-full w-full object-cover" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[10px] font-semibold text-white", children: v.duration })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary", children: lang === "am" ? v.titleAm : v.titleEn }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                  lang === "am" ? v.channelAm : v.channel,
                  " · ",
                  formatViews(v.views),
                  " ",
                  t("views")
                ] })
              ] })
            ]
          },
          v.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
const RegisterRoute = Route$6.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$7
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$7
});
const CategoriesRoute = Route$4.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => Route$7
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$7
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const VideoVideoIdRoute = Route.update({
  id: "/video/$videoId",
  path: "/video/$videoId",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  CategoriesRoute,
  ContactRoute,
  RegisterRoute,
  VideoVideoIdRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
