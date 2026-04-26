import { Info, Layers, FileCheck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TransparencyStripProps {
  confidence: "High" | "Moderate" | "Low";
  sources: string[];
  methodology: string;
  modelVersion: string;
  calculatedOn: string;
  className?: string;
}

export function TransparencyStrip(props: TransparencyStripProps) {
  const confidenceTone =
    props.confidence === "High"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : props.confidence === "Moderate"
        ? "bg-amber-50 text-amber-700 ring-amber-100"
        : "bg-rose-50 text-rose-700 ring-rose-100";
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-hairline bg-slate-50/70 p-4 text-sm",
        props.className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
            confidenceTone,
          )}
        >
          <ShieldCheck className="h-3 w-3" />
          Confidence: {props.confidence}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-xs text-ink-muted hairline">
          <Layers className="h-3 w-3" />
          {props.modelVersion}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-xs text-ink-muted hairline">
          <FileCheck className="h-3 w-3" />
          Calculated {props.calculatedOn}
        </span>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <Info className="h-3 w-3" />
            Methodology
          </div>
          <p className="mt-1 text-sm text-ink-muted">{props.methodology}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Sources
          </div>
          <ul className="mt-1 flex flex-wrap gap-1">
            {props.sources.map((s) => (
              <li
                key={s}
                className="rounded-md bg-white px-2 py-0.5 text-xs text-ink-muted hairline"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
