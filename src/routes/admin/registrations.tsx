import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin-shell";
import { useRequireAdmin } from "@/lib/admin-guard";
import { useAdminData } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/registrations")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useRequireAdmin();
  const { registrations, markRegistrationReviewed } = useAdminData();

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
                    <button
                      type="button"
                      disabled={registration.status === "Reviewed"}
                      onClick={() => markRegistrationReviewed(registration.id)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Mark reviewed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}