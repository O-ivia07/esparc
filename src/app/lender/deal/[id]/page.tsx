import { notFound } from "next/navigation";
import {
  ArrowRight,
  DollarSign,
  Gauge,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { getDealById } from "@/lib/data/deals";
import { usd, num, pctRaw } from "@/lib/format";
import { Card, CardHeader, CardBody, StatCard } from "@/components/ui/Card";
import { Badge, SeverityDot } from "@/components/ui/Badge";
import { RiskFlagList } from "@/components/deal/RiskFlagList";

export default function DealOverviewPage({ params }: { params: { id: string } }) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();

  const risk = {
    red: deal.riskFlags.filter((f) => f.severity === "red").length,
    yellow: deal.riskFlags.filter((f) => f.severity === "yellow").length,
    green: deal.riskFlags.filter((f) => f.severity === "green").length,
  };
  const overall: "green" | "yellow" | "red" =
    risk.red > 0 ? "red" : risk.yellow > 0 ? "yellow" : "green";

  const daysInPipe = Math.max(
    1,
    Math.round((Date.now() - new Date(deal.createdAt).getTime()) / 86_400_000),
  );

  const hasFullAnalysis = deal.performance && deal.cashflow;

  return (
    <div className="mt-4 space-y-5">
      {hasFullAnalysis ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            label="Central NPV (5% disc.)"
            value={usd(deal.cashflow!.npvCentral_at5pct)}
            caption={`IRR ${pctRaw(deal.cashflow!.irrCentral * 100, 1)}`}
            tone="brand"
          />
          <StatCard
            label="Year 1 DSCR (central)"
            value={num(deal.cashflow!.dscrYear1Range.central, 2)}
            caption={`P10–P90: ${num(deal.cashflow!.dscrYear1Range.low, 2)}–${num(deal.cashflow!.dscrYear1Range.high, 2)}`}
            tone="success"
          />
          <StatCard
            label="Overall risk"
            value={
              <span className="inline-flex items-center gap-2">
                <SeverityDot level={overall} />
                <span className="capitalize">{overall}</span>
              </span>
            }
            caption={`${risk.red} red · ${risk.yellow} yellow · ${risk.green} green`}
            tone={overall === "green" ? "success" : overall === "yellow" ? "warning" : "danger"}
          />
          <StatCard
            label="Days in pipeline"
            value={daysInPipe}
            caption={`${deal.closingChecklist.length} CP items`}
            tone="neutral"
          />
        </div>
      ) : (
        <Card className="p-5">
          <div className="text-sm text-ink-muted">
            E-SPARC analysis has not yet been run on this deal. Once documents are complete
            and technical inputs are validated, the performance, cash flow, contractor
            quality, and consumer protection engines will produce outputs on this page.
          </div>
        </Card>
      )}

      {hasFullAnalysis ? (
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader
              title="Deal summary"
              subtitle="Auto-generated from latest E-SPARC run"
              right={
                <Link
                  href={`/lender/deal/${deal.id}/report`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
                >
                  Open lender ready report
                  <ArrowRight className="h-3 w-3" />
                </Link>
              }
            />
            <CardBody>
              <p className="text-sm leading-relaxed text-ink-muted">
                <span className="font-medium text-ink">{deal.borrower.legalName}</span> is
                requesting <span className="font-mono text-ink">{usd(deal.loanAmountRequested)}</span>{" "}
                over {deal.loanTermYears} years at a target {deal.interestRateTarget}% APR
                for a{" "}
                <span className="text-ink">
                  {deal.energyModel.find((m) => m.sizeKwDc)?.sizeKwDc} kW DC solar PV and{" "}
                  {deal.energyModel.find((m) => m.sizeKwhStorage)?.sizeKwhStorage} kWh
                  battery
                </span>{" "}
                installation at {deal.borrower.propertyAddress.city},{" "}
                {deal.borrower.propertyAddress.state}. HelioScope-modeled P50 production is{" "}
                {num(deal.performance!.p50_kWh)} kWh per year (P10 {num(deal.performance!.p10_kWh)} / P90{" "}
                {num(deal.performance!.p90_kWh)}), cross-checked against PVWatts within{" "}
                {deal.performance!.crossCheckAgreementPct}% agreement.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Central-case Year-1 savings of {usd(deal.cashflow!.year1SavingsRange.central)}{" "}
                produce a Year-1 DSCR of{" "}
                <span className="font-mono text-ink">
                  {num(deal.cashflow!.dscrYear1Range.central, 2)}
                </span>{" "}
                with a stress-case floor of{" "}
                <span className="font-mono text-ink">{num(deal.cashflow!.dscrWorstYear, 2)}</span>.
                Contractor SunWest Commercial Solar is CSLB-active with 16 years of
                commercial track record. The critical open item is prevailing wage
                documentation for the full ITC basis — without it, central NPV drops by
                roughly $78,000 but the deal still clears policy DSCR.
              </p>
            </CardBody>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader title="Next best actions" subtitle="Queued by E-SPARC" />
            <ul className="divide-y divide-hairline text-sm">
              {[
                {
                  action: "Request DIR registration + certified payroll plan from SunWest",
                  tag: "Prevailing wage",
                  urgency: "high",
                },
                {
                  action: "Confirm Qcells domestic content certification letter",
                  tag: "ITC adder",
                  urgency: "high",
                },
                {
                  action: "Schedule PE structural letter",
                  tag: "Permit gate",
                  urgency: "medium",
                },
                {
                  action: "Apply 2% smoke derate to Year-1 forecast",
                  tag: "Conservatism",
                  urgency: "low",
                },
              ].map((a) => (
                <li key={a.action} className="flex items-start gap-3 px-6 py-3">
                  <span
                    className={
                      a.urgency === "high"
                        ? "mt-1.5 h-2 w-2 rounded-full bg-rose-500"
                        : a.urgency === "medium"
                          ? "mt-1.5 h-2 w-2 rounded-full bg-amber-500"
                          : "mt-1.5 h-2 w-2 rounded-full bg-slate-300"
                    }
                  />
                  <div className="flex-1">
                    <div className="text-ink">{a.action}</div>
                    <div className="text-xs text-ink-soft">{a.tag}</div>
                  </div>
                </li>
              ))}
            </ul>
            <CardBody className="bg-slate-50">
              <Link
                href={`/lender/deal/${deal.id}/assistant`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Ask E-SPARC to draft a committee memo for this deal
              </Link>
            </CardBody>
          </Card>
        </div>
      ) : null}

      {hasFullAnalysis ? <RiskFlagList flags={deal.riskFlags} /> : null}

      {!hasFullAnalysis ? (
        <Card className="p-6">
          <CardHeader
            title="Input queue"
            subtitle="Items still needed before the engines can run"
          />
          <CardBody className="px-0 pt-4">
            <ul className="divide-y divide-hairline text-sm">
              {[
                "Final signed bid with equipment model numbers",
                "HelioScope or PVsyst output for PV projects",
                "12 months of utility interval data",
                "Contractor CSLB license verification",
                "Insurance certificates (GL, WC)",
                "Borrower ownership and property confirmation",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2 py-2">
                  <Clock className="h-3.5 w-3.5 text-ink-soft" />
                  {line}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
