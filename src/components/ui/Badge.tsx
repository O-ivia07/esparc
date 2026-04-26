import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone =
  | "neutral"
  | "brand"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  accent: "bg-accent-50 text-accent-600 ring-accent-100",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
  danger: "bg-rose-50 text-rose-700 ring-rose-100",
  info: "bg-sky-50 text-sky-700 ring-sky-100",
  muted: "bg-slate-50 text-slate-600 ring-slate-200",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SeverityDot({ level }: { level: "green" | "yellow" | "red" | "neutral" }) {
  const color =
    level === "green"
      ? "bg-emerald-500"
      : level === "yellow"
        ? "bg-amber-500"
        : level === "red"
          ? "bg-rose-500"
          : "bg-slate-400";
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full ring-2",
        color,
        color.replace("bg-", "ring-") + "/20",
      )}
    />
  );
}

export function SeverityPill({
  level,
  label,
}: {
  level: "green" | "yellow" | "red";
  label?: string;
}) {
  const tone: BadgeTone =
    level === "green" ? "success" : level === "yellow" ? "warning" : "danger";
  const text = label ?? (level === "green" ? "Pass" : level === "yellow" ? "Watch" : "Fail");
  return (
    <Badge tone={tone} className="uppercase tracking-wide">
      <SeverityDot level={level} />
      {text}
    </Badge>
  );
}
