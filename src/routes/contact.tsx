import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Bi } from "@/lib/i18n";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us · ያግኙን — Shamo Business Portal" },
      { name: "description", content: "Get in touch with Shamo Business Portal." },
    ],
  }),
  component: Contact,
});

const inputCls =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl"><Bi en="Contact Us" am="ያግኙን" /></h1>
            <p className="mt-2 text-muted-foreground">
              <Bi en="Have a story, idea, or partnership in mind? We'd love to hear from you." am="ታሪክ፣ ሃሳብ ወይም ሽርክና አለዎት? እንዲሰሙን እንፈልጋለን።" />
            </p>

            <div className="mt-8 space-y-5">
              {[
                { Icon: MapPin, en: "Addis Ababa, Ethiopia", am: "አዲስ አበባ፣ ኢትዮጵያ" },
                { Icon: Phone, en: "+251 911 000 000", am: "+251 911 000 000" },
                { Icon: Mail, en: "info@shamobusiness.et", am: "info@shamobusiness.et" },
              ].map(({ Icon, en, am }) => (
                <div key={en} className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{en}</div>
                    <div className="text-xs text-muted-foreground font-ethiopic">{am}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold"><Bi en="Send us a message" am="መልዕክት ይላኩልን" /></h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <div className="text-xs font-semibold mb-1.5"><Bi en="Name" am="ስም" /></div>
                <input className={inputCls} required />
              </label>
              <label className="block">
                <div className="text-xs font-semibold mb-1.5"><Bi en="Email" am="ኢሜይል" /></div>
                <input type="email" className={inputCls} required />
              </label>
            </div>
            <label className="mt-4 block">
              <div className="text-xs font-semibold mb-1.5"><Bi en="Subject" am="ርዕሰ ጉዳይ" /></div>
              <input className={inputCls} />
            </label>
            <label className="mt-4 block">
              <div className="text-xs font-semibold mb-1.5"><Bi en="Message" am="መልዕክት" /></div>
              <textarea rows={5} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
            </label>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-2.5 text-sm font-bold text-white shadow-md">
              <Send className="h-4 w-4" /> <Bi en="Send" am="ላክ" />
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
