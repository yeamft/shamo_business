import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getPublicVideoById, getPublicVideos } from "@/lib/api/admin.functions";
import { Bi, useLang } from "@/lib/i18n";
import { getVideo, formatViews } from "@/lib/videos";
import { ThumbsUp, Eye, Send, Play } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/video/$videoId")({
  loader: async ({ params }) => {
    const v = (await getPublicVideoById({ data: { id: params.videoId } })) ?? getVideo(params.videoId);
    if (!v) throw notFound();
    return { video: v, allVideos: await getPublicVideos() };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.video.titleEn} · Shamo Business Portal` },
      { name: "description", content: `${loaderData?.video.titleEn} — ${loaderData?.video.titleAm}` },
      { property: "og:image", content: loaderData?.video.thumb },
    ],
  }),
  component: VideoPage,
});

const sampleComments = [
  { name: "Hanna A.", nameAm: "ሃና አ.", text: "Very informative, thank you!", textAm: "በጣም ጠቃሚ ነው፣ አመሰግናለሁ!", time: "2h" },
  { name: "Yonas T.", nameAm: "ዮናስ ት.", text: "Where can I find more about the registration process?", textAm: "ስለ ምዝገባ ሂደት የበለጠ የት ማግኘት እችላለሁ?", time: "5h" },
  { name: "Selam B.", nameAm: "ሰላም ብ.", text: "Excellent video — please post more on industrial parks.", textAm: "በጣም ጥሩ ቪዲዮ — ስለ ኢንዱስትሪያል ፓርኮች ተጨማሪ ይለጥፉ።", time: "1d" },
];

function VideoPage() {
  const { video, allVideos } = Route.useLoaderData();
  const { lang, t } = useLang();
  const [liked, setLiked] = useState(false);

  const related = allVideos.filter((v) => v.id !== video.id).slice(0, 8);
  const playerEmbedUrl = video.youtubeUrl ?? "https://www.youtube.com/embed/NMYWBOTeg1I";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          {/* Player */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
            <iframe
              className="h-full w-full"
              src={playerEmbedUrl}
              title={lang === "am" ? video.titleAm : video.titleEn}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Title */}
          <div className="mt-5">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              {lang === "am" ? video.titleAm : video.titleEn}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground font-ethiopic">
              {lang === "am" ? video.titleEn : video.titleAm}
            </p>
          </div>

          {/* Action bar */}
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full gradient-brand text-sm font-bold text-white">
                SB
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{lang === "am" ? video.channelAm : video.channel}</div>
                <div className="text-xs text-muted-foreground"><Bi en="124K subscribers" am="124ሺ ተመዝጋቢዎች" /></div>
              </div>
            </div>

            <div className="col-span-2 flex flex-wrap items-center gap-2 sm:col-auto">
              <div className="inline-flex items-center rounded-full border border-border bg-card">
                <button
                  onClick={() => setLiked((l) => !l)}
                  className={`inline-flex items-center gap-1.5 rounded-l-full px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent ${liked ? "text-primary" : ""}`}
                >
                  <ThumbsUp className={`h-3.5 w-3.5 ${liked ? "fill-primary" : ""}`} /> {formatViews(video.views / 12)} {t("like")}
                </button>
                <div className="h-5 w-px bg-border" />
                <span className="px-3 text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> {formatViews(video.views)} {t("views")}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5 rounded-xl border border-border bg-card p-4">
            <div className="text-xs font-semibold text-muted-foreground">
              {formatViews(video.views)} {t("views")} · <Bi en={`${video.postedDays} days ago`} am={`ከ ${video.postedDays} ቀናት በፊት`} />
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              <Bi
                en="In this episode we explore the latest developments, opportunities and practical paths for entrepreneurs and investors interested in Ethiopia's growing economy."
                am="በዚህ ክፍል የቅርብ ጊዜ እድገቶችን፣ እድሎችን እና ለሥራ ፈጣሪዎች እና በኢትዮጵያ ኢኮኖሚ ላይ ፍላጎት ላላቸው ኢንቨስተሮች ተግባራዊ መንገዶችን እንመለከታለን።"
              />
            </p>
          </div>

          {/* Comments */}
          <section className="mt-8">
            <h2 className="text-lg font-bold">{t("comments")} <span className="ml-2 text-sm font-normal text-muted-foreground">({sampleComments.length})</span></h2>
            <div className="mt-4 flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold">You</div>
              <div className="min-w-0 flex-1">
                <input
                  placeholder={t("addComment")}
                  className="h-10 w-full rounded-full border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="mt-2 flex justify-end">
                  <button className="inline-flex items-center gap-1.5 rounded-full gradient-brand px-4 py-2 text-xs font-semibold text-white">
                    <Send className="h-3.5 w-3.5" /> {t("post")}
                  </button>
                </div>
              </div>
            </div>
            <ul className="mt-6 space-y-5">
              {sampleComments.map((c, i) => (
                <li key={i} className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {c.name.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{lang === "am" ? c.nameAm : c.name}</span>
                      <span className="text-xs text-muted-foreground">· {c.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm">{lang === "am" ? c.textAm : c.text}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <button className="hover:text-foreground"><ThumbsUp className="inline h-3 w-3" /> 12</button>
                      <button className="hover:text-foreground"><Bi en="Reply" am="ምላሽ" /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Related sidebar */}
        <aside>
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            <Bi en="Up Next" am="ቀጣይ" />
          </h3>
          <div className="mt-3 space-y-3">
            {related.map((v) => (
              <Link
                key={v.id}
                to="/video/$videoId"
                params={{ videoId: v.id }}
                className="group flex gap-3 rounded-lg p-1 transition-colors hover:bg-accent"
              >
                <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-md bg-muted">
                  <img src={v.thumb} alt="" className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[10px] font-semibold text-white">{v.duration}</span>
                </div>
                <div className="min-w-0">
                  <h4 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">
                    {lang === "am" ? v.titleAm : v.titleEn}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {lang === "am" ? v.channelAm : v.channel} · {formatViews(v.views)} {t("views")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}
