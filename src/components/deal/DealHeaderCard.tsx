import { Building2, Calendar, Gauge, MapPin, User } from "lucide-react";
import type { Deal } from "@/lib/types";
import { STAGE_ORDER, STAGE_LABELS } from "@/lib/types";
import { usd, dateShort } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StageBadge } from "./StageBadge";
import { TechBadges } from "./TechBadges";
import { cn } from "@/lib/cn";

export function DealHeaderCard({ deal }: { deal: Deal }) {
  const stageIdx = (STAGE_ORDER as readonly string[]).indexOf(deal.stage);
  const daysInPipe = Math.max(
    1,
    Math.round((Date.now() - new Date(deal.createdAt).getTime()) / 86_400_000),
  );

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[2fr_1.3fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StageBadge stage={deal.stage} />
            <Badge tone="muted" className="font-mono">
              {deal.id}
            </Badge>
            <span className="text-xs text-ink-soft">Opened {dateShort(deal.createdAt)}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
            {deal.borrower.legalName}
          </h1>
          {deal.borrower.dba ? (
            <div className="text-sm text-ink-muted">d/b/a {deal.borrower.dba}</div>
          ) : null}
          <div className="mt-3 grid gap-2 text-sm text-ink-muted sm:grid-cols-2">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-ink-soft" />
              <span>
                {deal.borrower.businessType} · {deal.borrower.entityType}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-ink-soft" />
              <span>
                {deal.borrower.propertyAddress.city}, {deal.borrower.propertyAddress.state}{" "}
                {deal.borrower.propertyAddress.zip}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-ink-soft" />
              <span>
                {deal.borrower.squareFootage.toLocaleString()} sq ft ·{" "}
                {deal.borrower.yearsInBusiness} years in business
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-ink-soft" />
              <span>
                Loan officer: {deal.loanOfficer} · {deal.lenderInstitution}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Loan request
              </div>
              <div className="mt-0.5 font-mono text-lg font-semibold text-ink">
                {usd(deal.loanAmountRequested)}
              </div>
              <div className="text-xs text-ink-soft">
                {deal.loanTermYears} yrs · target {deal.interestRateTarget}% APR
              </div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                Technology
              </div>
              <div className="mt-1">
                <TechBadges techs={deal.technologies} />
              </div>
            </div>
            {deal.borrower.memberSince ? (
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Member standing
                </div>
                <div className="mt-0.5 inline-flex items-center gap-1 text-sm text-ink">
                  <Calendar className="h-3.5 w-3.5 text-ink-soft" />
                  Member since {dateShort(deal.borrower.memberSince)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-brand-50 to-white p-5 ring-1 ring-inset ring-brand-100">
          <div className="text-xs font-semibold uppercase tracking-wide text-brand">
            Stage timeline
          </div>
          <div className="mt-3 flex items-center gap-1">
            {STAGE_ORDER.map((s, idx) => {
              const done = idx <= stageIdx;
              const current = idx === stageIdx;
              return (
                <div key={s} className="flex flex-1 items-center">
                  <div
                    className={cn(
                      "flex h-3 w-3 shrink-0 items-center justify-center rounded-full",
                      done ? "bg-brand" : "bg-slate-200",
                      current ? "ring-4 ring-brand/20" : "",
                    )}
                  />
                  {idx < STAGE_ORDER.length - 1 ? (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        idx < stageIdx ? "bg-brand" : "bg-slate-200",
                      )}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-xs text-ink-muted">
            Current: <span className="font-medium text-brand">{STAGE_LABELS[deal.stage]}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-white/60 p-3">
              <div className="uppercase tracking-wide text-ink-soft">Days in pipeline</div>
              <div className="mt-0.5 font-mono text-base font-semibold text-ink">
                {daysInPipe}
              </div>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <div className="uppercase tracking-wide text-ink-soft">Last updated</div>
              <div className="mt-0.5 text-sm font-medium text-ink">
                {dateShort(deal.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
