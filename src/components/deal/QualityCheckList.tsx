"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { RiskFlag } from "@/lib/types";
import { Card, CardHeader } from "@/components/ui/Card";
import { SeverityPill } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export function QualityCheckList({
  title,
  subtitle,
  checks,
}: {
  title: string;
  subtitle?: string;
  checks: { label: string; flag: RiskFlag }[];
}) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <ul className="divide-y divide-hairline">
        {checks.map((c, i) => (
          <CheckRow key={i} label={c.label} flag={c.flag} />
        ))}
      </ul>
    </Card>
  );
}

function CheckRow({ label, flag }: { label: string; flag: RiskFlag }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-6 py-4 text-left hover:bg-slate-50"
      >
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            {label}
          </div>
          <div className="mt-0.5 font-medium text-ink">{flag.title}</div>
        </div>
        <SeverityPill level={flag.severity} />
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-ink-soft transition-transform",
            open ? "rotate-180" : "",
          )}
        />
      </button>
      {open ? (
        <div className="border-t border-hairline bg-slate-50 px-6 py-4 text-sm">
          <p className="text-ink-muted">{flag.description}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Recommendation
              </div>
              <p className="mt-1 text-ink">{flag.recommendation}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Sources
              </div>
              <ul className="mt-1 text-xs text-ink-muted">
                {flag.sourceRefs.map((s, i) => (
                  <li key={i}>· {s}</li>
                ))}
                {flag.sourceRefs.length === 0 ? <li>· —</li> : null}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}
