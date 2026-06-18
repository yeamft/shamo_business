import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { createVideoComment, getPublicVideoById, getPublicVideos, getVideoComments, incrementVideoViews, likeVideoComment } from "@/lib/api/admin.functions";
import { Bi, useLang } from "@/lib/i18n";
import { getVideo, formatViews } from "@/lib/videos";
import { ThumbsUp, Eye, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { VideoComment } from "@/lib/video-types";

function getStoredCommentsKey(videoId: string) {
  return `shamo-video-comments:${videoId}`;
}

export const Route = createFileRoute("/video/$videoId")({
  loader: async ({ params }) => {
    const v = (await getPublicVideoById({ data: { id: params.videoId } })) ?? getVideo(params.videoId);
    if (!v) throw notFound();

    const [allVideos, comments] = await Promise.all([getPublicVideos(), getVideoComments({ data: { videoId: params.videoId } })]);

    return { video: v, allVideos, comments };
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

function VideoPage() {
  const { video, allVideos, comments: initialComments } = Route.useLoaderData();
  const { lang, t } = useLang();
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [viewCount, setViewCount] = useState(video.views);
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");
  const storageKey = useMemo(() => getStoredCommentsKey(video.id), [video.id]);

  const related = allVideos.filter((v) => v.id !== video.id).slice(0, 8);
  const playerEmbedUrl = video.youtubeUrl ?? "https://www.youtube.com/embed/NMYWBOTeg1I";
  const topLevelComments = comments.filter((comment) => !comment.parentId);
  const displayedLikeCount = Math.max(1, Math.round(viewCount / 12));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const storedComments = JSON.parse(raw) as VideoComment[];
      if (Array.isArray(storedComments) && storedComments.length > 0) {
        setComments((current) => {
          const existingIds = new Set(current.map((comment) => comment.id));
          const mergedStoredComments = storedComments.filter((comment) => !existingIds.has(comment.id));
          return [...mergedStoredComments, ...current];
        });
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const viewKey = `shamo-video-viewed:${video.id}`;
    if (window.localStorage.getItem(viewKey)) return;

    const timer = window.setTimeout(() => {
      window.localStorage.setItem(viewKey, "1");
      setViewCount((current) => current + 1);
      void incrementVideoViews({ data: { videoId: video.id } }).catch(() => undefined);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [video.id]);

  const handleCommentSubmit = async () => {
    const trimmedAuthor = authorName.trim();
    const trimmedMessage = commentText.trim();

    if (!trimmedAuthor || !trimmedMessage) {
      setCommentError("Please enter your name and comment.");
      return;
    }

    setIsSubmittingComment(true);
    setCommentError("");

    const fallbackComment: VideoComment = {
      id: `local-comment-${Date.now()}`,
      videoId: video.id,
      authorName: trimmedAuthor,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
      createdAtLabel: "Just now",
      likes: 0,
      parentId: replyingToId,
    };

    try {
      const createdComment = await createVideoComment({
        data: {
          videoId: video.id,
          authorName: trimmedAuthor,
          message: trimmedMessage,
          parentId: replyingToId ?? undefined,
        },
      });

      setComments((current) => [createdComment, ...current]);
    } catch {
      setComments((current) => [fallbackComment, ...current]);
      setCommentError("Saved locally. Run the Supabase SQL update to enable shared comment storage.");
    } finally {
      setCommentText("");
      setAuthorName("");
      setReplyingToId(null);
      setIsSubmittingComment(false);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    setComments((current) => current.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)));

    try {
      const updatedComment = await likeVideoComment({ data: { commentId } });
      setComments((current) => current.map((comment) => (comment.id === commentId ? updatedComment : comment)));
    } catch {
      // Keep the optimistic local like if the backend is unavailable.
    }
  };

  const getReplies = (parentId: string) => comments.filter((comment) => comment.parentId === parentId);

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
                  <ThumbsUp className={`h-3.5 w-3.5 ${liked ? "fill-primary" : ""}`} /> {formatViews(displayedLikeCount)} {t("like")}
                </button>
                <div className="h-5 w-px bg-border" />
                <span className="px-3 text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> {formatViews(viewCount)} {t("views")}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5 rounded-xl border border-border bg-card p-4">
            <div className="text-xs font-semibold text-muted-foreground">
              {formatViews(viewCount)} {t("views")} · <Bi en={`${video.postedDays} days ago`} am={`ከ ${video.postedDays} ቀናት በፊት`} />
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
            <h2 className="text-lg font-bold">{t("comments")} <span className="ml-2 text-sm font-normal text-muted-foreground">({comments.length})</span></h2>
            <div className="mt-4 flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold">You</div>
              <div className="min-w-0 flex-1">
                <div className="grid gap-3">
                  <input
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={replyingToId ? "Your name for reply" : "Your name"}
                    className="h-10 w-full rounded-full border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t("addComment")}
                    rows={3}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                {replyingToId && (
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Replying to a comment</span>
                    <button type="button" onClick={() => setReplyingToId(null)} className="font-semibold hover:text-foreground">
                      Cancel reply
                    </button>
                  </div>
                )}
                {commentError && <div className="mt-2 text-sm text-destructive">{commentError}</div>}
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={isSubmittingComment}
                    onClick={() => void handleCommentSubmit()}
                    className="inline-flex items-center gap-1.5 rounded-full gradient-brand px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send className="h-3.5 w-3.5" /> {t("post")}
                  </button>
                </div>
              </div>
            </div>
            <ul className="mt-6 space-y-5">
              {topLevelComments.map((comment) => (
                <li key={comment.id} className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {comment.authorName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{comment.authorName}</span>
                      <span className="text-xs text-muted-foreground">· {comment.createdAtLabel}</span>
                    </div>
                    <p className="mt-0.5 text-sm">{comment.message}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <button type="button" onClick={() => void handleCommentLike(comment.id)} className="hover:text-foreground"><ThumbsUp className="inline h-3 w-3" /> {comment.likes}</button>
                      <button type="button" onClick={() => setReplyingToId(comment.id)} className="hover:text-foreground"><Bi en="Reply" am="ምላሽ" /></button>
                    </div>
                    {getReplies(comment.id).length > 0 && (
                      <div className="mt-4 space-y-3 border-l border-border pl-4">
                        {getReplies(comment.id).map((reply) => (
                          <div key={reply.id} className="rounded-xl border border-border/70 p-3">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-semibold">{reply.authorName}</span>
                              <span className="text-xs text-muted-foreground">· {reply.createdAtLabel}</span>
                            </div>
                            <p className="mt-1 text-sm">{reply.message}</p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                              <button type="button" onClick={() => void handleCommentLike(reply.id)} className="hover:text-foreground"><ThumbsUp className="inline h-3 w-3" /> {reply.likes}</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
