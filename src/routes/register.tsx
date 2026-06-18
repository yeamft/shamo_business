import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { submitJobRegistration } from "@/lib/api/admin.functions";
import { Bi } from "@/lib/i18n";
import { useState } from "react";
import { CheckCircle2, Briefcase } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Job Registration · ለሥራ እድል ምዝገባ — Shamo Business Portal" },
      { name: "description", content: "Register for job opportunities through the Shamo Business Portal. ለሥራ እድል ምዝገባ።" },
    ],
  }),
  component: Register,
});

const today = new Date().toISOString().slice(0, 10);
const autoId = `SBP-${Math.floor(100000 + Math.random() * 900000)}`;

function Field({
  labelEn,
  labelAm,
  children,
  required,
}: {
  labelEn: string;
  labelAm: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold text-foreground">
          {labelEn} {required && <span className="text-destructive">*</span>}
        </span>
        <span className="text-[11px] text-muted-foreground font-ethiopic">{labelAm}</span>
      </div>
      {children}
    </label>
  );
}

const inputCls =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-ring";

function Register() {
  const [hasJob, setHasJob] = useState<"yes" | "no" | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState(autoId);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-12 text-center">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-2xl font-extrabold"><Bi en="Registration submitted!" am="ምዝገባዎ ተልኳል!" /></h1>
            <p className="mt-2 text-muted-foreground">
              <Bi en="We will contact you when a matching opportunity becomes available." am="ተስማሚ የሥራ እድል ሲገኝ እናገኝዎታለን።" />
            </p>
            <div className="mt-4 inline-flex rounded-full border border-border bg-card px-4 py-2 text-xs">
              <Bi en="Your ID" am="የእርስዎ መለያ" />: <span className="ml-2 font-mono font-bold">{submittedId}</span>
            </div>
            <div className="mt-6">
              <button onClick={() => setSubmitted(false)} className="text-sm font-semibold text-primary hover:underline">
                <Bi en="← Register another" am="← ሌላ ይመዝግቡ" />
              </button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-2xl gradient-brand p-6 text-white shadow-xl sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold sm:text-2xl">Registration for Job Opportunity</h1>
              <p className="text-sm text-white/85 font-ethiopic">ለሥራ እድል ምዝገባ</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const id = String(formData.get("id") ?? autoId);

            void (async () => {
              await submitJobRegistration({
                data: {
                  id,
                  firstName: String(formData.get("firstName") ?? ""),
                  lastName: String(formData.get("lastName") ?? ""),
                  gender: String(formData.get("gender") ?? ""),
                  age: Number(formData.get("age") ?? 0),
                  lastWorkedIn: String(formData.get("lastWorkedIn") ?? ""),
                  profession: String(formData.get("profession") ?? ""),
                  subCity: String(formData.get("subCity") ?? ""),
                  mobile1: String(formData.get("mobile1") ?? ""),
                  mobile2: String(formData.get("mobile2") ?? ""),
                  hasJob,
                },
              });
              setSubmittedId(id);
              setSubmitted(true);
            })();
          }}
          className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field labelEn="Date" labelAm="ቀን">
              <input type="date" defaultValue={today} readOnly className={`${inputCls} bg-secondary/60`} />
            </Field>
            <Field labelEn="ID (Auto)" labelAm="መለያ ቁጥር">
              <input name="id" readOnly value={autoId} className={`${inputCls} bg-secondary/60 font-mono`} />
            </Field>

            <Field labelEn="First Name" labelAm="የመጀመሪያ ስም" required>
              <input name="firstName" required className={inputCls} placeholder="Abebe" />
            </Field>
            <Field labelEn="Last Name" labelAm="የአባት ስም" required>
              <input name="lastName" required className={inputCls} placeholder="Kebede" />
            </Field>

            <Field labelEn="Gender" labelAm="ጾታ" required>
              <select name="gender" required className={inputCls} defaultValue="">
                <option value="" disabled>—</option>
                <option value="male">Male / ወንድ</option>
                <option value="female">Female / ሴት</option>
              </select>
            </Field>
            <Field labelEn="Age" labelAm="ዕድሜ" required>
              <input name="age" required type="number" min={16} max={75} className={inputCls} placeholder="25" />
            </Field>

            <Field labelEn="Last Worked In" labelAm="የመጨረሻ የሥራ ቦታ">
              <input name="lastWorkedIn" className={inputCls} placeholder="e.g. Ethio Telecom" />
            </Field>
            <Field labelEn="Profession" labelAm="ሙያ" required>
              <input name="profession" required className={inputCls} placeholder="Software Engineer" />
            </Field>

            <Field labelEn="Sub City" labelAm="ክፍለ ከተማ" required>
              <select name="subCity" required className={inputCls} defaultValue="">
                <option value="" disabled>—</option>
                {["Bole", "Yeka", "Kirkos", "Arada", "Lideta", "Addis Ketema", "Gulele", "Kolfe Keranio", "Nifas Silk-Lafto", "Akaky Kaliti", "Lemi Kura"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field labelEn="Mobile 1" labelAm="ስልክ 1" required>
              <input name="mobile1" required type="tel" className={inputCls} placeholder="+251 9.." />
            </Field>

            <Field labelEn="Mobile 2" labelAm="ስልክ 2">
              <input name="mobile2" type="tel" className={inputCls} placeholder="+251 9.." />
            </Field>

            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <span className="text-xs font-semibold">Do you have a work now? <span className="text-destructive">*</span></span>
                <span className="text-[11px] text-muted-foreground font-ethiopic">አሁን ሥራ አለዎት?</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: "yes", en: "Yes", am: "አዎ" },
                  { v: "no", en: "No", am: "የለም" },
                ].map((o) => (
                  <button
                    type="button"
                    key={o.v}
                    onClick={() => setHasJob(o.v as "yes" | "no")}
                    className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition-colors ${
                      hasJob === o.v
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background hover:bg-accent"
                    }`}
                  >
                    {o.en} / <span className="font-ethiopic">{o.am}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="reset" className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-accent">
              <Bi en="Clear" am="አጽዳ" />
            </button>
            <button
              type="submit"
              className="rounded-full gradient-brand px-8 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Bi en="Submit" am="አስገባ / ላክ" />
            </button>
          </div>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
