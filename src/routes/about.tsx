import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Bi } from "@/lib/i18n";
import { Target, Eye, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us · ስለ እኛ — Shamo Business Portal" },
      { name: "description", content: "About Shamo Business Portal — Ethiopia's bilingual business video platform." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="gradient-hero py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            <Bi en="About Shamo Business Portal" am="ስለ ሻሞ ቢዝነስ ፖርታል" />
          </h1>
          <p className="mt-4 text-lg text-white/85">
            <Bi en="Connecting entrepreneurs, investors, and institutions across Ethiopia through video." am="ሥራ ፈጣሪዎችን፣ ኢንቨስተሮችን እና ተቋማትን በቪዲዮ የምናገናኝ።" />
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { Icon: Target, en: "Our Mission", am: "ተልዕኳችን", desc_en: "Democratize access to business knowledge in Ethiopia through bilingual video content.", desc_am: "በኢትዮጵያ የቢዝነስ እውቀትን በሁለት ቋንቋ ቪዲዮ ማድረስ።" },
            { Icon: Eye, en: "Our Vision", am: "ራዕያችን", desc_en: "Become the leading business media platform for the Horn of Africa.", desc_am: "የቀንድ አፍሪካ ግንባር ቀደም የቢዝነስ ሚዲያ መድረክ መሆን።" },
            { Icon: Heart, en: "Our Values", am: "እሴቶቻችን", desc_en: "Authenticity, accessibility, and community impact.", desc_am: "እውነተኝነት፣ ተደራሽነት እና የማህበረሰብ ተጽዕኖ።" },
          ].map(({ Icon, en, am, desc_en, desc_am }) => (
            <div key={en} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold"><Bi en={en} am={am} /></h3>
              <p className="mt-2 text-sm text-muted-foreground"><Bi en={desc_en} am={desc_am} /></p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold"><Bi en="Our Story" am="ታሪካችን" /></h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            <Bi
              en="Shamo Business Portal was founded with the belief that great ideas deserve to reach every corner of Ethiopia. We produce, curate, and distribute high-quality video content about business opportunities, investment frameworks, industrial zones, and the organizations powering the country's economic growth."
              am="ሻሞ ቢዝነስ ፖርታል የተመሰረተው ጥሩ ሃሳቦች በመላው ኢትዮጵያ ሊደርሱ ይገባል በሚል እምነት ነው። ስለ ቢዝነስ እድሎች፣ የኢንቨስትመንት ማዕቀፎች፣ ኢንዱስትሪያል ዞኖች እና የአገሪቱን ኢኮኖሚያዊ እድገት ስለሚያንቀሳቅሱ ድርጅቶች ከፍተኛ ጥራት ያላቸውን ቪዲዮዎች እናመርታለን።"
            />
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
