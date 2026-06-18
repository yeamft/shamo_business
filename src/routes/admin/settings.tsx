import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { useAdminData, type AdminSettings } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, isReady } = useRequireAdmin();
  const { settings, saveSettings } = useAdminData();
  const [form, setForm] = useState<AdminSettings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  if (!isReady || !isAuthenticated) return null;

  return (
    <AdminShell>
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold">Admin settings</h2>
        <p className="mt-2 text-sm text-muted-foreground">Configure portal defaults and admin notifications.</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Site title">
            <input
              value={form.siteTitle}
              onChange={(e) => setForm((current) => ({ ...current, siteTitle: e.target.value }))}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
            />
          </Field>
          <Field label="Support email">
            <input
              value={form.supportEmail}
              onChange={(e) => setForm((current) => ({ ...current, supportEmail: e.target.value }))}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
            />
          </Field>
          <Field label="Default language">
            <select
              value={form.defaultLanguage}
              onChange={(e) => setForm((current) => ({ ...current, defaultLanguage: e.target.value as "en" | "am" }))}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              <option value="en">English</option>
              <option value="am">Amharic</option>
            </select>
          </Field>
        </div>

        <div className="mt-6 space-y-3">
          <Toggle
            label="Auto publish new posts"
            checked={form.autoPublish}
            onChange={(checked) => setForm((current) => ({ ...current, autoPublish: checked }))}
          />
          <Toggle
            label="Notify on new registrations"
            checked={form.notifyOnRegistration}
            onChange={(checked) => setForm((current) => ({ ...current, notifyOnRegistration: checked }))}
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              saveSettings(form);
              setSaved(true);
              window.setTimeout(() => setSaved(false), 2000);
            }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Save settings
          </button>
          {saved && <span className="text-sm font-medium text-emerald-600">Settings saved.</span>}
        </div>
      </section>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm">
      <span className="font-medium">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
