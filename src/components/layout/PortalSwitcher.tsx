"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, HardHat, Home } from "lucide-react";
import { cn } from "@/lib/cn";

const OPTIONS = [
  { key: "lender", label: "Lender", icon: Briefcase, href: "/lender" },
  { key: "consumer", label: "Consumer", icon: Home, href: "/consumer" },
  { key: "contractor", label: "Contractor", icon: HardHat, href: "/contractor" },
] as const;

export function PortalSwitcher() {
  const pathname = usePathname();
  const active = OPTIONS.find((o) => pathname?.startsWith(o.href))?.key ?? "lender";

  return (
    <div className="inline-flex items-center rounded-full bg-slate-100 p-1 text-sm">
      {OPTIONS.map((o) => {
        const Icon = o.icon;
        const isActive = active === o.key;
        return (
          <Link
            key={o.key}
            href={o.href}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors",
              isActive
                ? "bg-white text-ink shadow-sm"
                : "text-ink-muted hover:text-ink",
            )}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            {o.label}
          </Link>
        );
      })}
    </div>
  );
}
