import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-card hairline",
        "transition-shadow duration-200",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-hairline px-6 py-4",
        className,
      )}
    >
      <div>
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-ink-muted">{subtitle}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 py-5", className)}>{children}</div>;
}

export function StatCard({
  label,
  value,
  caption,
  tone = "neutral",
}: {
  label: string;
  value: ReactNode;
  caption?: ReactNode;
  tone?: "neutral" | "brand" | "success" | "warning" | "danger";
}) {
  const accent =
    tone === "brand"
      ? "bg-brand-50 text-brand-700"
      : tone === "success"
        ? "bg-emerald-50 text-emerald-700"
        : tone === "warning"
          ? "bg-amber-50 text-amber-700"
          : tone === "danger"
            ? "bg-rose-50 text-rose-700"
            : "bg-slate-50 text-slate-700";
  return (
    <Card className="overflow-hidden">
      <div className="px-5 py-4">
        <div className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          {label}
        </div>
        <div className="mt-1 font-display text-2xl font-semibold text-ink">{value}</div>
        {caption ? (
          <div
            className={cn(
              "mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
              accent,
            )}
          >
            {caption}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
