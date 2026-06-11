import { createFileRoute, Link } from "@tanstack/react-router";
import { Bi } from "@/lib/i18n";
import { videos, categories, formatViews } from "@/lib/videos";
import { dict } from "@/lib/i18n";
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
} from "lucide-react";

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

function Admin() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-border bg-card lg:block">
          <div className="flex h-16 items-center gap-2 border-b border-border px-5">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand text-white text-sm font-bold">SB</div>
            <div className="leading-tight">
              <div className="text-sm font-bold">Admin Portal</div>
              <div className="text-[11px] text-muted-foreground font-ethiopic">የአስተዳዳሪ ፖርታል</div>
            </div>
          </div>
          <nav className="space-y-1 p-3">
            {[
              { Icon: LayoutDashboard, en: "Dashboard", am: "ዳሽቦርድ", active: true },
              { Icon: VideoIcon, en: "Videos", am: "ቪዲዮዎች" },
              { Icon: Upload, en: "Post Video", am: "ቪዲዮ ይለጥፉ" },
              { Icon: Users, en: "Registrations", am: "ምዝገባዎች" },
              { Icon: BarChart3, en: "Analytics", am: "ትንታኔዎች" },
              { Icon: Settings, en: "Settings", am: "ቅንብሮች" },
            ].map(({ Icon, en, am, active }) => (
              <button
                key={en}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
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

        {/* Main */}
        <div>
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur sm:px-6">
            <h1 className="text-lg font-bold">
              <Bi en="Dashboard" am="ዳሽቦርድ" />
            </h1>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Search posts…" className="h-9 w-64 rounded-full border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-background">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
              </button>
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-xs font-bold text-white">AB</div>
            </div>
          </header>

          <main className="space-y-6 p-4 sm:p-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { en: "Total Videos", am: "ጠቅላላ ቪዲዮዎች", v: "1,248", d: "+24 this week", dam: "ይህን ሳምንት +24" },
                { en: "Monthly Views", am: "ወርሃዊ እይታዎች", v: "843K", d: "+12.4%", dam: "+12.4%" },
                { en: "Registrations", am: "ምዝገባዎች", v: "2,193", d: "+158", dam: "+158" },
                { en: "Subscribers", am: "ተመዝጋቢዎች", v: "124K", d: "+1,204", dam: "+1,204" },
              ].map((s) => (
                <div key={s.en} className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-xs font-semibold text-muted-foreground"><Bi en={s.en} am={s.am} /></div>
                  <div className="mt-1 text-2xl font-extrabold">{s.v}</div>
                  <div className="mt-1 text-xs font-medium text-success"><Bi en={s.d} am={s.dam} /></div>
                </div>
              ))}
            </div>

            {/* Post video + table */}
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              {/* Post form */}
              <section className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold"><Bi en="Post a New Video" am="አዲስ ቪዲዮ ይለጥፉ" /></h2>
                    <p className="text-xs text-muted-foreground"><Bi en="Bilingual: fill English & Amharic fields" am="ሁለት ቋንቋ: እንግሊዘኛ እና አማርኛ ይሙሉ" /></p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  <div>
                    <label className="text-xs font-semibold">Category / <span className="font-ethiopic">ምድብ</span></label>
                    <select className={`mt-1.5 ${inputCls}`} defaultValue="">
                      <option value="" disabled>—</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{dict[c].en} · {dict[c].am}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold">Title (EN)</label>
                      <input className={`mt-1.5 ${inputCls}`} placeholder="Video title in English" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold font-ethiopic">ርዕስ (አማ)</label>
                      <input className={`mt-1.5 ${inputCls} font-ethiopic`} placeholder="የቪዲዮ ርዕስ በአማርኛ" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold">Keywords / <span className="font-ethiopic">ቁልፍ ቃላት</span></label>
                    <input className={`mt-1.5 ${inputCls}`} placeholder="investment, ethiopia, manufacturing, ኢንቨስት" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold">Description (EN)</label>
                      <textarea rows={4} className={`mt-1.5 w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring`} placeholder="Describe the video…" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold font-ethiopic">መግለጫ (አማ)</label>
                      <textarea rows={4} className={`mt-1.5 w-full rounded-lg border border-input bg-background p-3 text-sm font-ethiopic focus:outline-none focus:ring-2 focus:ring-ring`} placeholder="ቪዲዮውን ይግለጹ…" />
                    </div>
                  </div>

                  {/* Upload */}
                  <div>
                    <label className="text-xs font-semibold">Video file / <span className="font-ethiopic">የቪዲዮ ፋይል</span></label>
                    <div className="mt-1.5 flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-8 text-center">
                      <div>
                        <Upload className="mx-auto h-7 w-7 text-muted-foreground" />
                        <p className="mt-2 text-sm font-semibold"><Bi en="Drag & drop or click to upload" am="ይጎትቱ ወይም ይጫኑ" /></p>
                        <p className="text-xs text-muted-foreground"><Bi en="MP4, MOV up to 2GB" am="MP4, MOV እስከ 2GB" /></p>
                      </div>
                    </div>
                  </div>

                  {/* Share to */}
                  <div>
                    <label className="text-xs font-semibold"><Bi en="Cross-post to" am="በተጨማሪ ይለጥፉ" /></label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        { Icon: Youtube, name: "YouTube" },
                        { Icon: Music2, name: "TikTok" },
                        { Icon: Instagram, name: "Instagram" },
                        { Icon: Facebook, name: "Facebook" },
                      ].map(({ Icon, name }) => (
                        <label key={name} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-accent">
                          <input type="checkbox" className="accent-primary" />
                          <Icon className="h-3.5 w-3.5" />
                          {name}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-accent">
                      <Save className="h-3.5 w-3.5" /> <Bi en="Save as Draft" am="ድራፍት አስቀምጥ" />
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-accent">
                      <Calendar className="h-3.5 w-3.5" /> <Bi en="Schedule" am="ጊዜ ቀጥር" />
                    </button>
                    <button className="ml-auto inline-flex items-center gap-1.5 rounded-full gradient-brand px-5 py-2 text-xs font-bold text-white shadow-md">
                      <Send className="h-3.5 w-3.5" /> <Bi en="Post Now" am="አሁን ይለጥፉ" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Posts table */}
              <section className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold"><Bi en="Recent Posts" am="የቅርብ ልጥፎች" /></h2>
                  <button className="text-xs font-semibold text-primary hover:underline"><Bi en="View all" am="ሁሉንም ይመልከቱ" /></button>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[480px] text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                        <th className="py-2 font-semibold"><Bi en="Title" am="ርዕስ" /></th>
                        <th className="py-2 font-semibold"><Bi en="Views" am="እይታዎች" /></th>
                        <th className="py-2 font-semibold"><Bi en="Status" am="ሁኔታ" /></th>
                        <th className="py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.slice(0, 8).map((v, i) => (
                        <tr key={v.id} className="border-b border-border/60 last:border-0">
                          <td className="py-3 pr-2">
                            <div className="flex items-center gap-2">
                              <img src={v.thumb} alt="" className="h-10 w-16 shrink-0 rounded object-cover" />
                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold">{v.titleEn}</div>
                                <div className="truncate text-[11px] text-muted-foreground font-ethiopic">{v.titleAm}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 pr-2 text-sm">{formatViews(v.views)}</td>
                          <td className="py-3 pr-2">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                              i % 4 === 0 ? "bg-amber-500/15 text-amber-700" :
                              i % 4 === 1 ? "bg-success/15 text-success" :
                              i % 4 === 2 ? "bg-primary/15 text-primary" :
                              "bg-secondary text-foreground"
                            }`}>
                              {i % 4 === 0 ? "Draft" : i % 4 === 1 ? "Published" : i % 4 === 2 ? "Scheduled" : "Review"}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button className="grid h-7 w-7 place-items-center rounded-full hover:bg-accent">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
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
