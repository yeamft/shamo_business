import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { VideoCarousel } from "@/components/video-carousel";
import { Bi, useLang, dict } from "@/lib/i18n";
import { categories } from "@/lib/videos";
import { ArrowRight, Play, TrendingUp, Building2, Lightbulb, Briefcase } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shamo Business Portal · ሻሞ ቢዝነስ ፖርታል" },
      { name: "description", content: "Discover Ethiopian business opportunities, investment insights, industrial zones, and organizations in video format — bilingual English & Amharic." },
    ],
  }),
  component: Home,
});

const stats = [
  { en: "Videos", am: "ቪዲዮዎች", v: "1,240+" },
  { en: "Categories", am: "ምድቦች", v: "6" },
  { en: "Monthly Viewers", am: "ወርሃዊ ተመልካቾች", v: "85K" },
  { en: "Industrial Zones", am: "ኢንዱስትሪ ዞኖች", v: "12" },
];

const highlights = [
  { Icon: TrendingUp, en: "Business Opportunities", am: "የቢዝነስ እድሎች", desc_en: "Real, vetted sectors with growth potential.", desc_am: "ትክክለኛ የእድገት ዘርፎች።" },
  { Icon: Lightbulb, en: "Fresh Ideas", am: "አዳዲስ ሃሳቦች", desc_en: "From cloud kitchens to fintech.", desc_am: "ከክላውድ ኪችን እስከ ፊንቴክ።" },
  { Icon: Building2, en: "Industrial Zones", am: "ኢንዱስትሪ ዞኖች", desc_en: "Inside tours of Ethiopia's parks.", desc_am: "የኢትዮጵያ ፓርኮች ጉብኝት።" },
  { Icon: Briefcase, en: "Job Registration", am: "የሥራ ምዝገባ", desc_en: "Get matched with employers.", desc_am: "ከቀጣሪዎች ጋር ይገናኙ።" },
];

function Home() {
  const { lang, t } = useLang();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.7_0.18_180/0.25),transparent_50%),radial-gradient(circle_at_80%_60%,oklch(0.6_0.2_150/0.3),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,oklch(0.18_0.03_250/0.4))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <Bi en="New videos every week" am="ሳምንታዊ አዳዲስ ቪዲዮዎች" />
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <Bi en="Ethiopia's Business Video Portal" am="የኢትዮጵያ የቢዝነስ ቪዲዮ ፖርታል" />
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              {t("tagline")}
            </p>
            <p className="mt-2 max-w-xl text-sm text-white/70 font-ethiopic">
              {lang === "en" ? dict.tagline.am : dict.tagline.en}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-[1.02]"
              >
                {t("heroCta")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/video/$videoId"
                params={{ videoId: "cat_invest-0" }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <Play className="h-4 w-4 fill-current" /> {t("heroCta2")}
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.en} className="rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur">
                  <dt className="text-[11px] uppercase tracking-wide text-white/70"><Bi en={s.en} am={s.am} /></dt>
                  <dd className="mt-1 text-xl font-bold">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Featured video card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1604754742629-3e0498a8ec88?w=1200&q=80"
                alt="Featured"
                className="aspect-video w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-2xl transition-transform hover:scale-110">
                  <Play className="h-7 w-7 translate-x-0.5 fill-primary text-primary" />
                </span>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                  <Bi en="Featured · Invest in Ethiopia" am="ተመራጭ · በኢትዮጵያ ኢንቨስት" />
                </div>
                <h3 className="mt-1 text-lg font-bold leading-tight">
                  <Bi en="Why Invest in Ethiopia Now" am="ለምን አሁን በኢትዮጵያ ኢንቨስት ማድረግ" />
                </h3>
                <div className="mt-2 text-xs text-white/80">53.2K {t("views")} · 18:24</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ Icon, en, am, desc_en, desc_am }) => (
            <div key={en} className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold"><Bi en={en} am={am} /></h3>
              <p className="mt-1 text-xs text-muted-foreground"><Bi en={desc_en} am={desc_am} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently posted section header */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">{t("recently")}</h2>
            <p className="text-sm text-muted-foreground font-ethiopic">
              {lang === "en" ? dict.recently.am : dict.recently.en}
            </p>
          </div>
          <Link to="/categories" className="text-sm font-semibold text-primary hover:underline">
            {t("viewMore")} →
          </Link>
        </div>
      </section>

      {/* Carousels */}
      {categories.map((c) => (
        <VideoCarousel key={c} category={c} titleEn={dict[c].en} titleAm={dict[c].am} />
      ))}

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-8 text-white sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-extrabold sm:text-3xl">
                <Bi en="Looking for a job opportunity?" am="የሥራ እድል እየፈለጉ ነው?" />
              </h3>
              <p className="mt-2 text-white/85">
                <Bi en="Register your profile and get matched with verified employers across Ethiopia." am="መገለጫዎን ያስመዝግቡ እና ከተረጋገጡ ቀጣሪዎች ጋር ይገናኙ።" />
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-primary shadow-xl transition-transform hover:scale-[1.02]"
            >
              <Bi en="Register for Job Opportunity" am="ለሥራ እድል ይመዝገቡ" /> <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
