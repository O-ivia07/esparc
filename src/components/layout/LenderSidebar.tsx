"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FolderOpen,
  ShieldAlert,
  LineChart,
  BookOpen,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/lender", icon: LayoutGrid, label: "Pipeline" },
  { href: "/lender/my-deals", icon: FolderOpen, label: "My deals" },
  { href: "/lender/watchlist", icon: ShieldAlert, label: "Compliance watchlist" },
  { href: "/metrics", icon: LineChart, label: "Metrics" },
  { href: "/lender/library", icon: BookOpen, label: "Training library" },
  { href: "/lender/settings", icon: Settings, label: "Settings" },
];

export function LenderSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-56 shrink-0 border-r border-hairline bg-white/60 px-3 py-5 lg:block">
      <nav className="space-y-0.5 text-sm">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/lender"
              ? pathname === "/lender"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-muted hover:bg-slate-100 hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 rounded-xl border border-hairline bg-slate-50 p-3 text-xs text-ink-muted">
        <div className="font-medium text-ink">Your institution</div>
        <div className="mt-1">Valley Heritage Credit Union</div>
        <div className="mt-2 text-ink-soft">NCUA · FDIC insured · CDFI certified</div>
      </div>
    </aside>
  );
}
