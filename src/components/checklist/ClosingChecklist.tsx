"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Clock,
  Ban,
  Minus,
  FileCheck,
  Filter,
  Download,
  User,
} from "lucide-react";
import type {
  ActorRole,
  ChecklistCategory,
  ChecklistStatus,
  ClosingChecklistItem,
} from "@/lib/types";
import { CHECKLIST_CATEGORY_LABELS } from "@/lib/types";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dateShort } from "@/lib/format";
import { cn } from "@/lib/cn";

const STATUS_META: Record<
  ChecklistStatus,
  { label: string; tone: BadgeTone; Icon: typeof CheckCircle2 }
> = {
  complete: { label: "Complete", tone: "success", Icon: CheckCircle2 },
  in_progress: { label: "In progress", tone: "info", Icon: Clock },
  pending: { label: "Pending", tone: "warning", Icon: Circle },
  blocked: { label: "Blocked", tone: "danger", Icon: Ban },
  not_applicable: { label: "N/A", tone: "muted", Icon: Minus },
};

const REQUIRED_BY_LABEL: Record<ClosingChecklistItem["requiredBy"], string> = {
  lender_policy: "Lender Policy",
  state_law: "State Law",
  federal_law: "Federal Law",
  utility: "Utility",
  best_practice: "Best Practice",
};

const REQUIRED_BY_TONE: Record<ClosingChecklistItem["requiredBy"], BadgeTone> = {
  lender_policy: "brand",
  state_law: "info",
  federal_law: "accent",
  utility: "neutral",
  best_practice: "muted",
};

const ACTOR_LABEL: Record<ActorRole, string> = {
  lender: "Lender",
  consumer: "Borrower",
  contractor: "Contractor",
};

type StatusFilter = ChecklistStatus | "all";
type CategoryFilter = ChecklistCategory | "all";
type PartyFilter = ActorRole | "all";

export function ClosingChecklist({ items }: { items: ClosingChecklistItem[] }) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [partyFilter, setPartyFilter] = useState<PartyFilter>("all");

  const counts = useMemo(() => {
    const active = items.filter((i) => i.status !== "not_applicable");
    const complete = active.filter((i) => i.status === "complete").length;
    return {
      total: active.length,
      complete,
      pct: active.length > 0 ? Math.round((complete / active.length) * 100) : 0,
      inProgress: items.filter((i) => i.status === "in_progress").length,
      pending: items.filter((i) => i.status === "pending").length,
      blocked: items.filter((i) => i.status === "blocked").length,
    };
  }, [items]);

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (statusFilter === "all" || i.status === statusFilter) &&
          (categoryFilter === "all" || i.category === categoryFilter) &&
          (partyFilter === "all" || i.responsibleParty === partyFilter),
      ),
    [items, statusFilter, categoryFilter, partyFilter],
  );

  const grouped = useMemo(() => {
    const by: Partial<Record<ChecklistCategory, ClosingChecklistItem[]>> = {};
    for (const i of filtered) {
      by[i.category] = [...(by[i.category] ?? []), i];
    }
    return by;
  }, [filtered]);

  return (
    <Card>
      <CardHeader
        title={
          <span className="flex items-center gap-2">
            Closing checklist
            <Badge tone="brand" className="font-mono">
              {counts.complete} of {counts.total} complete
            </Badge>
          </span>
        }
        subtitle={`${counts.inProgress} in progress · ${counts.pending} pending · ${counts.blocked} blocked · ${counts.pct}%`}
        right={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </div>
        }
      />
      <div className="px-6 py-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-brand-400 transition-all"
            style={{ width: `${counts.pct}%` }}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline bg-slate-50/60 px-6 py-3 text-xs">
        <Filter className="h-3 w-3 text-ink-soft" />
        <Select
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as StatusFilter)}
          options={[
            { value: "all", label: "Any status" },
            { value: "complete", label: "Complete" },
            { value: "in_progress", label: "In progress" },
            { value: "pending", label: "Pending" },
            { value: "blocked", label: "Blocked" },
          ]}
        />
        <Select
          value={categoryFilter}
          onChange={(v) => setCategoryFilter(v as CategoryFilter)}
          options={[
            { value: "all", label: "Any category" },
            ...Object.entries(CHECKLIST_CATEGORY_LABELS).map(([v, l]) => ({
              value: v,
              label: l,
            })),
          ]}
        />
        <Select
          value={partyFilter}
          onChange={(v) => setPartyFilter(v as PartyFilter)}
          options={[
            { value: "all", label: "Any party" },
            { value: "lender", label: "Lender" },
            { value: "contractor", label: "Contractor" },
            { value: "consumer", label: "Borrower" },
          ]}
        />
      </div>

      <div className="divide-y divide-hairline">
        {Object.entries(CHECKLIST_CATEGORY_LABELS).map(([cat, label]) => {
          const groupItems = grouped[cat as ChecklistCategory] ?? [];
          if (groupItems.length === 0) return null;
          const categoryItems = items.filter((i) => i.category === cat);
          const catComplete = categoryItems.filter((i) => i.status === "complete").length;
          return (
            <section key={cat}>
              <div className="flex items-center justify-between bg-white px-6 py-3">
                <h4 className="font-display text-sm font-semibold text-ink">{label}</h4>
                <Badge tone="muted" className="font-mono">
                  {catComplete} of {categoryItems.length}
                </Badge>
              </div>
              <ul className="divide-y divide-hairline">
                {groupItems.map((item) => (
                  <ChecklistRow key={item.id} item={item} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Card>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full border border-hairline bg-white px-2.5 py-1 text-xs text-ink-muted"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function ChecklistRow({ item }: { item: ClosingChecklistItem }) {
  const [open, setOpen] = useState(false);
  const meta = STATUS_META[item.status];
  const Icon = meta.Icon;
  return (
    <li>
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 px-6 py-3 text-left hover:bg-slate-50/60"
      >
        <div className="pt-0.5">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              item.status === "complete"
                ? "bg-emerald-100 text-emerald-700"
                : item.status === "in_progress"
                  ? "bg-sky-100 text-sky-700"
                  : item.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : item.status === "blocked"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-slate-100 text-slate-600",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-ink">{item.title}</span>
            <Badge tone={REQUIRED_BY_TONE[item.requiredBy]} className="text-[10px]">
              {REQUIRED_BY_LABEL[item.requiredBy]}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-ink-muted">{item.description}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <User className="h-3 w-3" />
              {ACTOR_LABEL[item.responsibleParty]}
            </span>
            {item.evidenceFileName ? (
              <span className="inline-flex items-center gap-1 text-brand-700">
                <FileCheck className="h-3 w-3" />
                {item.evidenceFileName}
              </span>
            ) : null}
            <span>Updated {dateShort(item.lastUpdated)}</span>
            {item.sourceCitation ? (
              <span className="font-mono text-[11px]">{item.sourceCitation}</span>
            ) : null}
          </div>
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </button>
      {open && item.note ? (
        <div className="border-t border-hairline bg-slate-50 px-6 py-2.5 text-xs text-ink-muted">
          <span className="font-semibold text-ink">Note: </span>
          {item.note}
        </div>
      ) : null}
    </li>
  );
}
