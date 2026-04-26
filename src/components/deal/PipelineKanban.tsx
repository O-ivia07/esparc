import type { Deal, DealStage } from "@/lib/types";
import { STAGE_LABELS, STAGE_ORDER } from "@/lib/types";
import { usdK } from "@/lib/format";
import { cn } from "@/lib/cn";

const STAGE_DOT: Record<Exclude<DealStage, "declined">, string> = {
  intake: "bg-slate-400",
  documents_received: "bg-sky-400",
  data_gaps_flagged: "bg-amber-400",
  in_review: "bg-sky-500",
  analysis_complete: "bg-accent",
  closing_checklist: "bg-brand",
  lender_decision_pending: "bg-accent-500",
  closed_funded: "bg-emerald-500",
};

export function PipelineKanban({ deals }: { deals: Deal[] }) {
  const byStage = STAGE_ORDER.map((stage) => ({
    stage,
    deals: deals.filter((d) => d.stage === stage),
  }));
  return (
    <div className="grid auto-cols-[minmax(160px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-1">
      {byStage.map((col) => (
        <div
          key={col.stage}
          className="min-w-[160px] rounded-xl border border-hairline bg-white px-3 py-2.5"
        >
          <div className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
            <span className={cn("h-2 w-2 rounded-full", STAGE_DOT[col.stage])} />
            {STAGE_LABELS[col.stage]}
            <span className="ml-auto font-mono text-ink-soft">{col.deals.length}</span>
          </div>
          <div className="mt-2 space-y-1.5">
            {col.deals.length === 0 ? (
              <div className="rounded-md border border-dashed border-hairline py-1.5 text-center text-[11px] text-ink-soft">
                —
              </div>
            ) : (
              col.deals.map((d) => (
                <div
                  key={d.id}
                  className="rounded-md bg-slate-50 px-2 py-1.5 text-[11px]"
                >
                  <div className="truncate font-medium text-ink">
                    {d.borrower.legalName.split(" ")[0]}{" "}
                    {d.borrower.legalName.split(" ").slice(1, 2).join(" ")}
                  </div>
                  <div className="text-ink-soft">{usdK(d.loanAmountRequested)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
