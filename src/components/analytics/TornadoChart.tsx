"use client";
import { num } from "@/lib/format";

export interface TornadoRow {
  label: string;
  low: number;
  high: number;
  absLow: number;
  absHigh: number;
}

export function TornadoChart({
  rows,
  center,
}: {
  rows: TornadoRow[];
  center: number;
}) {
  const maxMagnitude = Math.max(
    ...rows.map((r) => Math.max(Math.abs(r.low), Math.abs(r.high))),
  );
  const scale = maxMagnitude > 0 ? 100 / maxMagnitude : 100;

  return (
    <div className="space-y-2">
      {rows.map((r) => {
        const leftWidth = Math.abs(r.low) * scale;
        const rightWidth = Math.abs(r.high) * scale;
        return (
          <div
            key={r.label}
            className="grid grid-cols-[180px_1fr_120px] items-center gap-3 text-xs"
          >
            <div className="truncate text-ink-muted">{r.label}</div>
            <div className="relative h-6">
              <div className="absolute inset-y-0 left-1/2 w-px bg-slate-300" />
              <div
                className="absolute inset-y-0 bg-rose-400/80"
                style={{
                  right: "50%",
                  width: `${leftWidth / 2}%`,
                }}
              />
              <div
                className="absolute inset-y-0 bg-emerald-500/80"
                style={{
                  left: "50%",
                  width: `${rightWidth / 2}%`,
                }}
              />
            </div>
            <div className="text-right font-mono text-ink-muted">
              ${num(r.absLow / 1000, 0)}k – ${num(r.absHigh / 1000, 0)}k
            </div>
          </div>
        );
      })}
      <div className="pt-1 text-[11px] text-ink-soft">
        Bars show the NPV impact range of a one-variable-at-a-time swing around the central
        NPV of ${num(center / 1000, 0)}k. Green = upside, red = downside.
      </div>
    </div>
  );
}
