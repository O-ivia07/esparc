"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { RiskFlag } from "@/lib/types";
import { Card, CardHeader } from "@/components/ui/Card";
import { SeverityPill } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const SEVERITY_ORDER: Record<RiskFlag["severity"], number> = {
  red: 0,
  yellow: 1,
  green: 2,
};

export function RiskFlagList({ flags }: { flags: RiskFlag[] }) {
  const [sort, setSort] = useState<"severity" | "category">("severity");
  const sorted = [...flags].sort((a, b) => {
    if (sort === "severity")
      return SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    return a.category.localeCompare(b.category);
  });

  return (
    <Card>
      <CardHeader
        title="Risk flags"
        subtitle={`${flags.length} flags · ${flags.filter((f) => f.severity === "red").length} red · ${flags.filter((f) => f.severity === "yellow").length} yellow`}
        right={
          <div className="flex rounded-full bg-slate-100 p-1 text-xs">
            {(["severity", "category"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={cn(
                  "rounded-full px-2.5 py-1 font-medium capitalize",
                  sort === s
                    ? "bg-white text-ink shadow-sm"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        }
      />
      <ul className="divide-y divide-hairline">
        {sorted.map((f, idx) => (
          <RiskFlagRow key={idx} flag={f} />
        ))}
      </ul>
    </Card>
  );
}

export function RiskFlagRow({ flag }: { flag: RiskFlag }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 px-6 py-4 text-left transition-colors hover:bg-slate-50"
      >
        <div className="shrink-0 pt-0.5">
          <SeverityPill level={flag.severity} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="font-medium text-ink">{flag.title}</div>
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 text-ink-soft transition-transform",
                open ? "rotate-90" : "",
              )}
            />
          </div>
          <p className="mt-1 text-sm text-ink-muted">{flag.description}</p>
          {open ? (
            <div className="mt-3 space-y-2 rounded-lg bg-slate-50 p-3 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Recommendation
                </span>
                <p className="text-ink-muted">{flag.recommendation}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Sources
                </span>
                <ul className="mt-0.5 text-xs text-ink-muted">
                  {flag.sourceRefs.map((s, i) => (
                    <li key={i}>· {s}</li>
                  ))}
                </ul>
              </div>
              <div className="text-xs uppercase tracking-wide text-ink-soft">
                Category · {flag.category.replace(/_/g, " ")}
              </div>
            </div>
          ) : null}
        </div>
      </button>
    </li>
  );
}
