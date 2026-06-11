import { createFileRoute, Link } from "@tanstack/react-router";
import { Bi, dict } from "@/lib/i18n";
import { videos, categories, formatViews, type Video } from "@/lib/videos";
import {
  LayoutDashboard,
  Video as VideoIcon,
  Users,
  BarChart3,
  Settings,
  Upload,
  Save,
  Calendar,
  Send,
  MoreVertical,
  Search,
  Bell,
  Youtube,
  Music2,
  Instagram,
  Facebook,
  CheckCircle2,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard · Shamo Business Portal" },
      { name: "description", content: "Manage videos, categories and posts on Shamo Business Portal." },
    ],
  }),
  component: Admin,
});

const inputCls =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

type AdminSection = "dashboard" | "videos" | "post" | "registrations" | "analytics" | "settings";
type PostStatus = "Draft" | "Published" | "Scheduled" | "Review";
type SocialPlatform = "YouTube" | "TikTok" | "Instagram" | "Facebook";

type AdminPost = Video & {
  status: PostStatus;
  createdAtLabel: string;
  keywords: string;
  descriptionEn: string;
  descriptionAm: string;
  shareTo: SocialPlatform[];
};

type FormState = {
  category: string;
  titleEn: string;
  titleAm: string;
  keywords: string;
  descriptionEn: string;
  descriptionAm: string;
  fileName: string;
  shareTo: SocialPlatform[];
};

const navItems: Array<{ key: AdminSection; Icon: typeof LayoutDashboard; en: string; am: string }> = [
  { key: "dashboard", Icon: LayoutDashboard, en: "Dashboard", am: "ዳሽቦርድ" },
  { key: "videos", Icon: VideoIcon, en: "Videos", am: "ቪዲዮዎች" },
  { key: "post", Icon: Upload, en: "Post Video", am: "ቪዲዮ ይለጥፉ" },
  { key: "registrations", Icon: Users, en: "Registrations", am: "ምዝገባዎች" },
  { key: "analytics", Icon: BarChart3, en: "Analytics", am: "ትንታኔዎች" },
  { key: "settings", Icon: Settings, en: "Settings", am: "ቅንብሮች" },
];

const socialPlatforms: SocialPlatform[] = ["YouTube", "TikTok", "Instagram", "Facebook"];

const basePosts: AdminPost[] = videos.slice(0, 12).map((video, index) => ({
  ...video,
  status: (["Draft", "Published", "Scheduled", "Review"] as PostStatus[])[index % 4],
  createdAtLabel: `${video.postedDays}d ago`,
  keywords: `${video.category}, ethiopia, business`,
  descriptionEn: video.titleEn,
  descriptionAm: video.titleAm,
  shareTo: index % 2 === 0 ? ["YouTube", "Facebook"] : ["Instagram"],
}));

const emptyForm: FormState = {
  category: "",
  titleEn: "",
  titleAm: "",
  keywords: "",
  descriptionEn: "",
  descriptionAm: "",
  fileName: "",
  shareTo: [],
};

function getStatusClasses(status: PostStatus) {
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
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<AdminPost[]>(basePosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [form, setForm] = useState<FormState>(emptyForm);

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const haystack = [post.titleEn, post.titleAm, post.channel, post.channelAm, post.keywords, post.status].join(" ").toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchTerm, selectedCategory]);

  const totalViews = useMemo(() => posts.reduce((sum, post) => sum + post.views, 0), [posts]);
  const publishedCount = useMemo(() => posts.filter((post) => post.status === "Published").length, [posts]);
  const scheduledCount = useMemo(() => posts.filter((post) => post.status === "Scheduled").length, [posts]);
  const draftCount = useMemo(() => posts.filter((post) => post.status === "Draft").length, [posts]);

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleShareTo = (platform: SocialPlatform) => {
    setForm((current) => ({
      ...current,
      shareTo: current.shareTo.includes(platform)
        ? current.shareTo.filter((item) => item !== platform)
        : [...current.shareTo, platform],
    }));
  };

  const submitPost = (status: PostStatus) => {
    if (!form.category || !form.titleEn || !form.titleAm) {
      setMessage("Please fill category, English title, and Amharic title before saving.");
      return;
    }

    const newPost: AdminPost = {
      id: `admin-${Date.now()}`,
      titleEn: form.titleEn,
      titleAm: form.titleAm,
      thumb: videos[0]?.thumb ?? "",
      duration: "00:00",
      views: 0,
      channel: "Shamo Admin",
      channelAm: "ሻሞ አስተዳዳሪ",
      category: form.category as Video["category"],
      postedDays: 0,
      status,
      createdAtLabel: "Just now",
      keywords: form.keywords,
      descriptionEn: form.descriptionEn,
      descriptionAm: form.descriptionAm,
      shareTo: form.shareTo,
    };

    setPosts((current) => [newPost, ...current]);
    setForm(emptyForm);
    setActiveSection("videos");
    setNotifications((count) => count + 1);
    setMessage(
      status === "Published"
        ? "Video posted successfully and added to the recent posts table."
        : status === "Scheduled"
          ? "Video saved with scheduled status."
          : "Draft saved successfully.",
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-border bg-card lg:block">
          <div className="flex h-16 items-center gap-2 border-b border-border px-5">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand text-sm font-bold text-white">SB</div>
            <div className="leading-tight">
              <div className="text-sm font-bold">Admin Portal</div>
              <div className="text-[11px] text-muted-foreground font-ethiopic">የአስተዳዳሪ ፖርታል</div>
            </div>
          </div>

          <nav className="space-y-1 p-3">
            {navItems.map(({ key, Icon, en, am }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left"><Bi en={en} am={am} /></span>
              </button>
            ))}
          </nav>

          <div className="p-3">
            <Link to="/" className="block rounded-lg border border-border bg-background px-3 py-2 text-center text-xs font-semibold hover:bg-accent">
              <Bi en="← Back to Site" am="← ወደ ድረ-ገጹ ይመለሱ" />
            </Link>
          </div>
        </aside>

        <div>
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur sm:px-6">
            <h1 className="text-lg font-bold">
              <Bi
                en={navItems.find((item) => item.key === activeSection)?.en ?? "Dashboard"}
                am={navItems.find((item) => item.key === activeSection)?.am ?? "ዳሽቦርድ"}
              />
            </h1>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search posts…" className="h-9 w-64 rounded-full border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button onClick={() => setNotifications(0)} className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-background">
                <Bell className="h-4 w-4" />
                {notifications > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] text-white">{notifications}</span>}
              </button>
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-xs font-bold text-white">AB</div>
            </div>
          </header>

          <main className="space-y-6 p-4 sm:p-6">
            {message && (
              <div className="flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { en: "Total Videos", am: "ጠቅላላ ቪዲዮዎች", value: `${posts.length}`, note: `${publishedCount} published` },
                { en: "Total Views", am: "ጠቅላላ እይታዎች", value: formatViews(totalViews), note: `${scheduledCount} scheduled` },
                { en: "Drafts", am: "ድራፍቶች", value: `${draftCount}`, note: `${notifications} new alerts` },
                { en: "Categories", am: "ምድቦች", value: `${categories.length}`, note: `${filteredPosts.length} visible posts` },
              ].map((card) => (
                <div key={card.en} className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-xs font-semibold text-muted-foreground"><Bi en={card.en} am={card.am} /></div>
                  <div className="mt-1 text-2xl font-extrabold">{card.value}</div>
                  <div className="mt-1 text-xs font-medium text-success">{card.note}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <section className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold"><Bi en="Post a New Video" am="አዲስ ቪዲዮ ይለጥፉ" /></h2>
                    <p className="text-xs text-muted-foreground"><Bi en="Bilingual: fill English & Amharic fields" am="ሁለት ቋንቋ: እንግሊዘኛ እና አማርኛ ይሙሉ" /></p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(emptyForm);
                      setMessage("Form cleared.");
                    }}
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-accent"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-5 grid gap-4">
                  <div>
                    <label className="text-xs font-semibold">Category / <span className="font-ethiopic">ምድብ</span></label>
                    <select className={`mt-1.5 ${inputCls}`} value={form.category} onChange={(e) => updateForm("category", e.target.value)}>
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{dict[c].en} · {dict[c].am}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold">Title (EN)</label>
                      <input value={form.titleEn} onChange={(e) => updateForm("titleEn", e.target.value)} className={`mt-1.5 ${inputCls}`} placeholder="Video title in English" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold font-ethiopic">ርዕስ (አማ)</label>
                      <input value={form.titleAm} onChange={(e) => updateForm("titleAm", e.target.value)} className={`mt-1.5 ${inputCls} font-ethiopic`} placeholder="የቪዲዮ ርዕስ በአማርኛ" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold">Keywords / <span className="font-ethiopic">ቁልፍ ቃላት</span></label>
                    <input value={form.keywords} onChange={(e) => updateForm("keywords", e.target.value)} className={`mt-1.5 ${inputCls}`} placeholder="investment, ethiopia, manufacturing, ኢንቨስት" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold">Description (EN)</label>
                      <textarea value={form.descriptionEn} onChange={(e) => updateForm("descriptionEn", e.target.value)} rows={4} className="mt-1.5 w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Describe the video…" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold font-ethiopic">መግለጫ (አማ)</label>
                      <textarea value={form.descriptionAm} onChange={(e) => updateForm("descriptionAm", e.target.value)} rows={4} className="mt-1.5 w-full rounded-lg border border-input bg-background p-3 text-sm font-ethiopic focus:outline-none focus:ring-2 focus:ring-ring" placeholder="ቪዲዮውን ይግለጹ…" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold">Video file / <span className="font-ethiopic">የቪዲዮ ፋይል</span></label>
                    <label className="mt-1.5 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-8 text-center">
                      <input type="file" accept="video/*" className="hidden" onChange={(e) => updateForm("fileName", e.target.files?.[0]?.name ?? "")} />
                      <div>
                        <Upload className="mx-auto h-7 w-7 text-muted-foreground" />
                        <p className="mt-2 text-sm font-semibold"><Bi en="Drag & drop or click to upload" am="ይጎትቱ ወይም ይጫኑ" /></p>
                        <p className="text-xs text-muted-foreground">{form.fileName || "MP4, MOV up to 2GB"}</p>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="text-xs font-semibold"><Bi en="Cross-post to" am="በተጨማሪ ይለጥፉ" /></label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        { Icon: Youtube, name: "YouTube" as SocialPlatform },
                        { Icon: Music2, name: "TikTok" as SocialPlatform },
                        { Icon: Instagram, name: "Instagram" as SocialPlatform },
                        { Icon: Facebook, name: "Facebook" as SocialPlatform },
                      ].map(({ Icon, name }) => (
                        <button
                          type="button"
                          key={name}
                          onClick={() => toggleShareTo(name)}
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            form.shareTo.includes(name) ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-accent"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button type="button" onClick={() => submitPost("Draft")} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-accent">
                      <Save className="h-3.5 w-3.5" /> <Bi en="Save as Draft" am="ድራፍት አስቀምጥ" />
                    </button>
                    <button type="button" onClick={() => submitPost("Scheduled")} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-accent">
                      <Calendar className="h-3.5 w-3.5" /> <Bi en="Schedule" am="ጊዜ ቀጥር" />
                    </button>
                    <button type="button" onClick={() => submitPost("Published")} className="ml-auto inline-flex items-center gap-1.5 rounded-full gradient-brand px-5 py-2 text-xs font-bold text-white shadow-md">
                      <Send className="h-3.5 w-3.5" /> <Bi en="Post Now" am="አሁን ይለጥፉ" />
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold"><Bi en="Recent Posts" am="የቅርብ ልጥፎች" /></h2>
                  <select className="rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{dict[category].en}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                        <th className="py-2 font-semibold"><Bi en="Title" am="ርዕስ" /></th>
                        <th className="py-2 font-semibold"><Bi en="Views" am="እይታዎች" /></th>
                        <th className="py-2 font-semibold"><Bi en="Status" am="ሁኔታ" /></th>
                        <th className="py-2 font-semibold"><Bi en="Shared" am="የተጋራ" /></th>
                        <th className="py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPosts.slice(0, 10).map((post) => (
                        <tr key={post.id} className="border-b border-border/60 last:border-0">
                          <td className="py-3 pr-2">
                            <div className="flex items-center gap-2">
                              <img src={post.thumb} alt="" className="h-10 w-16 shrink-0 rounded object-cover" />
                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold">{post.titleEn}</div>
                                <div className="truncate text-[11px] text-muted-foreground font-ethiopic">{post.titleAm}</div>
                                <div className="text-[11px] text-muted-foreground">{post.createdAtLabel}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 pr-2 text-sm">{formatViews(post.views)}</td>
                          <td className="py-3 pr-2">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusClasses(post.status)}`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="py-3 pr-2 text-xs text-muted-foreground">{post.shareTo.length ? post.shareTo.join(", ") : "—"}</td>
                          <td className="py-3 text-right">
                            <button type="button" onClick={() => setMessage(`Selected: ${post.titleEn}`)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-accent">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredPosts.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                            No posts matched your current search or category filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
