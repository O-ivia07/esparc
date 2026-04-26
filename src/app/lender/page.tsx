import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle2, Clock, Filter } from "lucide-react";
import { allDeals, HERO_DEAL_ID, LENDER_FIRST } from "@/lib/data/deals";
import { usdK, dateShort } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StageBadge } from "@/components/deal/StageBadge";
import { TechBadges } from "@/components/deal/TechBadges";
import { PipelineKanban } from "@/components/deal/PipelineKanban";

function countBySeverity(deal: (typeof allDeals)[number]) {
  const counts = { green: 0, yellow: 0, red: 0 };
  for (const f of deal.riskFlags) counts[f.severity]++;
  return counts;
}

function nextAction(deal: (typeof allDeals)[number]) {
  switch (deal.stage) {
    case "intake":
      return "Request full document packet";
    case "documents_received":
      return "Queue for E-SPARC analysis";
    case "data_gaps_flagged":
      return "Resolve data gaps with contractor";
    case "in_review":
      return "Review E-SPARC draft output";
    case "analysis_complete":
      return "Review and route to committee";
    case "closing_checklist":
      return "Finalize conditions precedent";
    case "lender_decision_pending":
      return "Committee decision";
    case "closed_funded":
      return "Monitor draw schedule";
    default:
      return "—";
  }
}

export default function LenderPipelinePage() {
  const pipelineDeals = allDeals;
  const active = pipelineDeals.filter((d) =>
    ["intake", "documents_received", "data_gaps_flagged", "in_review", "analysis_complete", "closing_checklist"].includes(
      d.stage,
    ),
  ).length;
  const needsAttention = pipelineDeals.filter((d) =>
    ["data_gaps_flagged"].includes(d.stage) ||
    d.riskFlags.some((f) => f.severity === "red"),
  ).length;

  return (
    <div className="px-6 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm text-ink-soft">Good morning,</div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            {LENDER_FIRST} — {active} active applications, {needsAttention} need your attention.
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Valley Heritage Credit Union · UnLoCED pilot cohort · {dateShort("2026-04-22")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="brand">Pipeline view</Badge>
          <Badge tone="muted">California · Colorado · Michigan</Badge>
        </div>
      </header>

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Stage distribution
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-ink-soft">
            <Clock className="h-3 w-3" />
            Updated 2 minutes ago
          </div>
        </div>
        <PipelineKanban deals={pipelineDeals} />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-semibold">Active pipeline</h2>
            <Badge tone="neutral">{pipelineDeals.length} deals</Badge>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Filter className="h-3 w-3 text-ink-soft" />
            <span className="text-ink-soft">Filter:</span>
            <button className="rounded-full bg-white px-2.5 py-1 hairline">Any stage</button>
            <button className="rounded-full bg-white px-2.5 py-1 hairline">Any technology</button>
            <button className="rounded-full bg-white px-2.5 py-1 hairline">Any state</button>
            <button className="rounded-full bg-white px-2.5 py-1 hairline">Loan size</button>
          </div>
        </div>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1.2fr_0.9fr_1fr_0.9fr_1fr_1.3fr_2rem] items-center gap-3 border-b border-hairline bg-slate-50 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            <div>Applicant</div>
            <div>Technology</div>
            <div className="text-right">Loan</div>
            <div>Stage</div>
            <div>Risk</div>
            <div>Last activity</div>
            <div>Next action</div>
            <div />
          </div>
          <ul className="divide-y divide-hairline">
            {pipelineDeals.map((d) => {
              const counts = countBySeverity(d);
              const isHero = d.id === HERO_DEAL_ID;
              return (
                <li key={d.id}>
                  <Link
                    href={`/lender/deal/${d.id}`}
                    className="grid grid-cols-[1.5fr_1.2fr_0.9fr_1fr_0.9fr_1fr_1.3fr_2rem] items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ink">
                          {d.borrower.legalName}
                        </span>
                        {isHero ? (
                          <Badge tone="accent" className="gap-1">
                            Hero
                          </Badge>
                        ) : null}
                      </div>
                      <div className="text-xs text-ink-soft">
                        {d.borrower.businessType} · {d.borrower.propertyAddress.city},{" "}
                        {d.borrower.propertyAddress.state} · {d.id}
                      </div>
                    </div>
                    <TechBadges techs={d.technologies} />
                    <div className="text-right font-mono text-sm text-ink">
                      {usdK(d.loanAmountRequested)}
                    </div>
                    <div>
                      <StageBadge stage={d.stage} />
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <RiskCount
                        level="red"
                        count={counts.red}
                        Icon={AlertTriangle}
                      />
                      <RiskCount
                        level="yellow"
                        count={counts.yellow}
                        Icon={AlertTriangle}
                      />
                      <RiskCount
                        level="green"
                        count={counts.green}
                        Icon={CheckCircle2}
                      />
                    </div>
                    <div className="text-xs text-ink-muted">
                      {dateShort(d.updatedAt)}
                    </div>
                    <div className="text-xs text-ink-muted">{nextAction(d)}</div>
                    <div className="text-right text-ink-soft">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-lg font-semibold">Program context</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="p-5">
            <div className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              Pilot cohort
            </div>
            <div className="mt-1 font-display text-2xl font-semibold">
              Valley Heritage CU + 2 lenders
            </div>
            <div className="mt-1 text-sm text-ink-muted">
              24 projects tracked across the UnLoCED pilot, primarily California with
              breadth indicators in Colorado and Michigan.
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              Supported technologies
            </div>
            <div className="mt-1 font-display text-2xl font-semibold">4 tech classes</div>
            <div className="mt-1 text-sm text-ink-muted">
              Solar PV, battery storage, air-source heat pumps, and tankless water heaters,
              with full uncertainty bands and scenario analysis for each.
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              Modeling stack
            </div>
            <div className="mt-1 font-display text-2xl font-semibold">NLR grade</div>
            <div className="mt-1 text-sm text-ink-muted">
              Production deployment uses SAM, REopt, ResStock, and ComStock. Demo uses
              simplified closed-form calcs with transparent methodology notes.
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function RiskCount({
  level,
  count,
  Icon,
}: {
  level: "green" | "yellow" | "red";
  count: number;
  Icon: typeof AlertTriangle;
}) {
  if (count === 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-ink-soft">
        <Icon className="h-3 w-3" />0
      </span>
    );
  const color =
    level === "red"
      ? "text-rose-600"
      : level === "yellow"
        ? "text-amber-600"
        : "text-emerald-600";
  return (
    <span className={`inline-flex items-center gap-0.5 font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {count}
    </span>
  );
}
