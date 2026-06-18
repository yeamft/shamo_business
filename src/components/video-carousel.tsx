import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
import { Bi, useLang, type DictKey } from "@/lib/i18n";
import { getByCategory, formatViews, type Video } from "@/lib/videos";

function VideoCard({ v }: { v: Video }) {
  const { lang } = useLang();
  return (
    <Link
      to="/video/$videoId"
      params={{ videoId: v.id }}
      className="group block w-[260px] shrink-0 sm:w-[280px]"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <img
          src={v.thumb}
          alt={lang === "am" ? v.titleAm : v.titleEn}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {v.duration}
        </div>
        <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white/95 shadow-2xl">
            <Play className="h-6 w-6 translate-x-0.5 fill-primary text-primary" />
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          {lang === "am" ? v.titleAm : v.titleEn}
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground font-ethiopic">
          {lang === "am" ? v.titleEn : v.titleAm}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">{lang === "am" ? v.channelAm : v.channel}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" /> {formatViews(v.views)}</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/50" >
        <span className="absolute inset-0 rounded-xl border-2 border-primary/50" >
        <ChevronLeft className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        <ChevronRight className="absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
    
      </div>
    </Link>
  );
}

export function VideoCarousel({ category, titleEn, titleAm, items }: { category: DictKey; titleEn: string; titleAm: string; items?: Video[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const resolvedItems = items ?? getByCategory(category);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 600, behavior: "smooth" });
  };

  return (
    <section className="mt-12">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-foreground sm:text-xl">{titleEn}</h2>
          <p className="truncate text-sm text-muted-foreground font-ethiopic">{titleAm}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/categories"
            className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
          >
            <Bi en="View More →" am="ተጨማሪ →" />
          </Link>
          <button
            onClick={() => scroll(-1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-accent"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-accent"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="mt-4 flex gap-4 overflow-x-auto scroll-smooth px-4 pb-3 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {resolvedItems.map((v) => (
          <VideoCard key={v.id} v={v} />
        ))}
      </div>
    </section>
  );
}
