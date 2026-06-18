import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { useAdminData } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/registrations")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useRequireAdmin();
  const { registrations, markRegistrationReviewed, deleteRegistration } = useAdminData();
  const [selectedRegistrationId, setSelectedRegistrationId] = useState<string | null>(null);

  const selectedRegistration = registrations.find((registration) => registration.id === selectedRegistrationId) ?? null;

  if (!isAuthenticated) return null;

  return (
    <AdminShell>
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Job Registrations</h2>
          <div className="text-xs text-muted-foreground">{registrations.length} total applications</div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <th className="py-2">ID</th>
                <th className="py-2">Applicant</th>
                <th className="py-2">Profession</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Sub City</th>
                <th className="py-2">Status</th>
                <th className="py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr key={registration.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3 font-mono text-xs">{registration.id}</td>
                  <td className="py-3 font-semibold">{registration.name}</td>
                  <td className="py-3">{registration.profession}</td>
                  <td className="py-3">{registration.phone}</td>
                  <td className="py-3">{registration.subCity}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${registration.status === "New" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>
                      {registration.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRegistrationId(registration.id)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold"
                      >
                        View details
                      </button>
                      <button
                        type="button"
                        disabled={registration.status === "Reviewed"}
                        onClick={() => markRegistrationReviewed(registration.id)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Mark reviewed
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedRegistrationId === registration.id) {
                            setSelectedRegistrationId(null);
                          }
                          void deleteRegistration(registration.id);
                        }}
                        className="inline-flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1.5 text-xs font-semibold text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedRegistration && (
          <div className="mt-6 rounded-2xl border border-border bg-background p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold">Applicant details</h3>
                <p className="text-sm text-muted-foreground">Full registration record for {selectedRegistration.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRegistrationId(null)}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  void deleteRegistration(selectedRegistration.id);
                  setSelectedRegistrationId(null);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm font-semibold text-destructive"
              >
                <Trash2 className="h-4 w-4" /> Delete registration
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem label="ID" value={selectedRegistration.id} />
              <DetailItem label="Full name" value={selectedRegistration.name} />
              <DetailItem label="First name" value={selectedRegistration.firstName} />
              <DetailItem label="Last name" value={selectedRegistration.lastName} />
              <DetailItem label="Gender" value={selectedRegistration.gender} />
              <DetailItem label="Age" value={selectedRegistration.age?.toString()} />
              <DetailItem label="Profession" value={selectedRegistration.profession} />
              <DetailItem label="Last worked in" value={selectedRegistration.lastWorkedIn} />
              <DetailItem label="Sub city" value={selectedRegistration.subCity} />
              <DetailItem label="Primary phone" value={selectedRegistration.phone || selectedRegistration.mobile1} />
              <DetailItem label="Mobile 1" value={selectedRegistration.mobile1} />
              <DetailItem label="Mobile 2" value={selectedRegistration.mobile2} />
              <DetailItem label="Has job now" value={selectedRegistration.hasJob} />
              <DetailItem label="Created at" value={selectedRegistration.createdAt} />
              <DetailItem label="Status" value={selectedRegistration.status} />
            </div>
          </div>
        )}
      </section>
    </AdminShell>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xl border border-border/70 p-3">
      <div className="text-xs font-semibold uppercase text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{value && value.trim() ? value : "—"}</div>
    </div>
  );
}