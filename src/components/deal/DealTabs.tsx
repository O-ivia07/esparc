"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  LineChart,
  Wallet,
  HardHat,
  Home,
  FileCheck,
  CheckSquare,
  FileText,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/cn";

const TABS = [
  { slug: "", icon: LayoutGrid, label: "Overview" },
  { slug: "performance", icon: LineChart, label: "Performance" },
  { slug: "cashflow", icon: Wallet, label: "Cash Flow" },
  { slug: "contractor", icon: HardHat, label: "Contractor" },
  { slug: "consumer", icon: Home, label: "Consumer" },
  { slug: "compliance", icon: FileCheck, label: "Compliance & Incentives" },
  { slug: "closing-checklist", icon: CheckSquare, label: "Closing Checklist" },
  { slug: "report", icon: FileText, label: "Lender Ready Report" },
  { slug: "assistant", icon: Sparkles, label: "Ask E-SPARC" },
];

export function DealTabs({ dealId }: { dealId: string }) {
  const pathname = usePathname() ?? "";
  const base = `/lender/deal/${dealId}`;
  return (
    <div className="sticky top-14 z-20 -mx-6 border-b border-hairline bg-surface-muted/90 px-6 backdrop-blur">
      <nav className="flex gap-1 overflow-x-auto py-2">
        {TABS.map((t) => {
          const href = t.slug ? `${base}/${t.slug}` : base;
          const active = t.slug ? pathname.endsWith(`/${t.slug}`) : pathname === base;
          const Icon = t.icon;
          return (
            <Link
              key={t.slug || "overview"}
              href={href}
              className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "bg-white text-brand shadow-sm hairline"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
