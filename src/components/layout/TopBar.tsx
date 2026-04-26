"use client";
import Link from "next/link";
import { Bell, Sparkles } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { PortalSwitcher } from "./PortalSwitcher";
import { useEsparcStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";

export function TopBar() {
  const { events, setAuditDrawerOpen, setAssistantOpen } = useEsparcStore();

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-content items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-3">
          <Wordmark />
          <span className="hidden text-xs text-ink-soft sm:inline">
            Pilot Demo · UnLoCED
          </span>
        </Link>
        <div className="hidden md:block">
          <PortalSwitcher />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAssistantOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-400 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm hover:brightness-110"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ask E-SPARC
          </button>
          <button
            onClick={() => setAuditDrawerOpen(true)}
            className="relative rounded-full p-2 text-ink-muted hover:bg-slate-100 hover:text-ink"
            aria-label="Audit trail"
          >
            <Bell className="h-4 w-4" />
            {events.length > 0 ? (
              <span className="absolute -right-0.5 -top-0.5">
                <Badge tone="accent" className="px-1.5 py-0 text-[10px]">
                  {events.length}
                </Badge>
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
