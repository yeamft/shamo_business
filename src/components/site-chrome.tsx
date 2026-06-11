import { Link, useNavigate } from "@tanstack/react-router";
import { Bi, useLang } from "@/lib/i18n";
import { Search, Menu, X, Globe, Play } from "lucide-react";
import { useState, type FormEvent } from "react";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const nav = [
    { to: "/", labelEn: "Home", labelAm: "መነሻ" },
    { to: "/about", labelEn: "About Us", labelAm: "ስለ እኛ" },
    { to: "/categories", labelEn: "Categories", labelAm: "ምድቦች" },
    { to: "/contact", labelEn: "Contact Us", labelAm: "ያግኙን" },
  ] as const;

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = searchTerm.trim();
    void navigate({
      to: "/categories",
      search: q ? { q } : {},
    });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand text-white shadow-lg shadow-primary/20">
            <Play className="h-4 w-4 fill-current" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-bold text-foreground">Shamo Business</div>
            <div className="truncate text-[11px] font-medium text-muted-foreground font-ethiopic">ሻሞ ቢዝነስ ፖርታል</div>
          </div>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:bg-accent [&.active]:text-foreground"
              activeOptions={{ exact: n.to === "/" }}
            >
              <Bi en={n.labelEn} am={n.labelAm} />
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-9 w-64 rounded-full border border-border bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </form>

          <button
            onClick={() => setLang(lang === "en" ? "am" : "en")}
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-semibold transition-colors hover:bg-accent"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className={lang === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
            <span className="text-border">/</span>
            <span className={lang === "am" ? "text-foreground font-ethiopic" : "text-muted-foreground font-ethiopic"}>አማ</span>
          </button>

          <Link
            to="/register"
            className="hidden h-9 items-center rounded-full gradient-brand px-4 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] sm:flex"
          >
            <Bi en="Register" am="ይመዝገቡ" />
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <form onSubmit={handleSearch} className="mb-3 md:hidden">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="h-10 w-full rounded-full border border-border bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </form>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                <Bi en={n.labelEn} am={n.labelAm} />
              </Link>
            ))}
            <Link
              to="/admin"
              search={{ section: "dashboard" }}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
            >
              <Bi en="Admin Dashboard" am="የአስተዳዳሪ ዳሽቦርድ" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="mt-20 border-t border-border bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand text-white">
              <Play className="h-4 w-4 fill-current" />
            </div>
            <div>
              <div className="text-sm font-bold">Shamo Business Portal</div>
              <div className="text-[11px] text-muted-foreground font-ethiopic">ሻሞ ቢዝነስ ፖርታል</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t("tagline")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold"><Bi en="Explore" am="ያስሱ" /></h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground"><Bi en="Home" am="መነሻ" /></Link></li>
            <li><Link to="/categories" className="hover:text-foreground"><Bi en="Categories" am="ምድቦች" /></Link></li>
            <li><Link to="/about" className="hover:text-foreground"><Bi en="About Us" am="ስለ እኛ" /></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold"><Bi en="For Users" am="ለተጠቃሚዎች" /></h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/register" className="hover:text-foreground"><Bi en="Job Registration" am="የሥራ ምዝገባ" /></Link></li>
            <li><Link to="/contact" className="hover:text-foreground"><Bi en="Contact" am="ያግኙን" /></Link></li>
            <li><Link to="/admin" search={{ section: "dashboard" }} className="hover:text-foreground"><Bi en="Admin" am="አስተዳዳሪ" /></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold"><Bi en="Contact" am="አድራሻ" /></h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Addis Ababa, Ethiopia</li>
            <li>+251 911 000 000</li>
            <li>info@shamobusiness.et</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © 2026 Shamo Business Portal · ሻሞ ቢዝነስ ፖርታል — <Bi en="All rights reserved." am="መብቱ የተጠበቀ ነው።" />
        </div>
      </div>
    </footer>
  );
}
