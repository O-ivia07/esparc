"use client";
import { X, Download, Activity } from "lucide-react";
import { useEsparcStore } from "@/lib/store";
import { dateTime } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function AuditTrailDrawer() {
  const { auditDrawerOpen, setAuditDrawerOpen, events, clearEvents } = useEsparcStore();

  if (!auditDrawerOpen) return null;

  const exportCsv = () => {
    const rows = [
      ["timestamp", "actor", "action", "dealId", "detail", "modelVersion"],
      ...events.map((e) => [
        e.timestamp,
        e.actor,
        e.action,
        e.dealId,
        e.detail.replaceAll('"', '""'),
        e.modelVersion ?? "",
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `esparc-audit-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        className="flex-1 bg-ink/20 backdrop-blur-sm"
        aria-label="Close drawer"
        onClick={() => setAuditDrawerOpen(false)}
      />
      <aside className="flex h-full w-full max-w-xl flex-col bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-brand" />
            <h2 className="font-display text-lg font-semibold">Audit trail</h2>
            <Badge tone="brand">{events.length} events</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </Button>
            <button
              onClick={() => setAuditDrawerOpen(false)}
              className="rounded-full p-2 hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>
        <div className="border-b border-hairline bg-slate-50 px-6 py-3 text-xs text-ink-muted">
          Regulator-friendly audit surface. Every model run, checklist change, and AI query is
          captured. Filterable, exportable as CSV. Persisted in browser storage for this demo.
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {events.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-ink-muted">
              <Activity className="h-8 w-8 text-slate-300" />
              <p>No audit events yet. Interact with any deal to generate entries.</p>
            </div>
          ) : (
            <ul className="divide-y divide-hairline">
              {events.map((e, idx) => (
                <li key={idx} className="py-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        tone={
                          e.actor === "esparc_engine"
                            ? "brand"
                            : e.actor === "system"
                              ? "neutral"
                              : "info"
                        }
                      >
                        {e.actor}
                      </Badge>
                      <span className="font-medium text-ink">{e.action}</span>
                    </div>
                    <span className="text-xs text-ink-soft">{dateTime(e.timestamp)}</span>
                  </div>
                  <p className="mt-1 text-ink-muted">{e.detail}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-ink-soft">
                    <span className="font-mono">{e.dealId}</span>
                    {e.modelVersion ? <span>· {e.modelVersion}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {events.length > 0 ? (
          <footer className="border-t border-hairline px-6 py-3 text-right">
            <Button variant="ghost" size="sm" onClick={clearEvents}>
              Clear events
            </Button>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
