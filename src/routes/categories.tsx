import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Bi, useLang, dict } from "@/lib/i18n";
import { categories, getByCategory, formatViews } from "@/lib/videos";
import { Eye, Play } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories · ምድቦች — Shamo Business Portal" },
      { name: "description", content: "Browse all business video categories on Shamo Business Portal." },
    ],
  }),
  component: Categories,
});

function Categories() {
  const { lang } = useLang();
  const [active, setActive] = useState<(typeof categories)[number] | "all">("all");
  const list = active === "all" ? categories.flatMap(getByCategory) : getByCategory(active);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl"><Bi en="All Categories" am="ሁሉም ምድቦች" /></h1>
          <p className="mt-2 text-muted-foreground"><Bi en="Explore Ethiopian business content by topic." am="በርዕስ የኢትዮጵያን የቢዝነስ ይዘት ያስሱ።" /></p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActive("all")}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                active === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"
              }`}
            >
              <Bi en="All" am="ሁሉም" />
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                  active === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"
                }`}
              >
                {dict[c][lang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((v) => (
            <Link
              key={v.id}
              to="/video/$videoId"
              params={{ videoId: v.id }}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <img src={v.thumb} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">{v.duration}</span>
                <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95">
                    <Play className="h-6 w-6 translate-x-0.5 fill-primary text-primary" />
                  </span>
                </div>
              </div>
              <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">
                {lang === "am" ? v.titleAm : v.titleEn}
              </h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground font-ethiopic">{lang === "am" ? v.titleEn : v.titleAm}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{lang === "am" ? v.channelAm : v.channel}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" /> {formatViews(v.views)}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
