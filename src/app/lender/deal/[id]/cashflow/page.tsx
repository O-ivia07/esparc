import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { getDealById } from "@/lib/data/deals";
import { project25Years, tornadoInputs } from "@/lib/engine/cashflow";
import { Card, CardBody, CardHeader, StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CashFlowChart, DscrChart } from "@/components/analytics/CashFlowChart";
import { TornadoChart } from "@/components/analytics/TornadoChart";
import { TransparencyStrip } from "@/components/deal/TransparencyStrip";
import { NotYetAnalyzed } from "@/components/deal/NotYetAnalyzed";
import { num, pctRaw, usd } from "@/lib/format";

export default function CashFlowPage({ params }: { params: { id: string } }) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();
  if (!deal.cashflow || !deal.performance)
    return <NotYetAnalyzed dealId={deal.id} stage={deal.stage} tabName="Cash flow analysis" />;
  const cf = deal.cashflow;
  const perf = deal.performance;

  const projection = project25Years({
    loanAmount: deal.loanAmountRequested,
    interestRatePct: deal.interestRateTarget,
    termYears: deal.loanTermYears,
    initialUtilityRate: 0.21,
    escalator: cf.escalatorAssumption.central,
    performance: perf,
    omAnnual: 4_200,
    itcRefund: deal.loanAmountRequested * 0.5,
    sgipRefund: 64_500,
  });

  const tornado = tornadoInputs(cf);

  return (
    <div className="mt-4 space-y-5">
      <div className="grid gap-3 md:grid-cols-4">
        <StatCard
          label="Year 1 savings"
          value={usd(cf.year1SavingsRange.central)}
          caption={`${usd(cf.year1SavingsRange.low)} – ${usd(cf.year1SavingsRange.high)}`}
          tone="brand"
        />
        <StatCard
          label="25-yr savings (central)"
          value={usd(cf.year25SavingsCentral)}
          caption="Nominal, pre-O&M"
          tone="neutral"
        />
        <StatCard
          label="NPV @ 5% discount"
          value={usd(cf.npvCentral_at5pct)}
          caption={`IRR ${pctRaw(cf.irrCentral * 100, 1)}`}
          tone="success"
        />
        <StatCard
          label="Payback"
          value={`${cf.paybackYearsCentral} yrs`}
          caption={`DSCR worst year ${num(cf.dscrWorstYear, 2)}×`}
          tone="neutral"
        />
      </div>

      <Card>
        <CardHeader
          title="25-year net cash flow by scenario"
          subtitle="Three pre-defined scenarios with explicit probability weights"
          right={
            <div className="flex gap-1.5 text-xs">
              <Badge tone="success">Base</Badge>
              <Badge tone="warning">Conservative</Badge>
              <Badge tone="danger">Stress</Badge>
            </div>
          }
        />
        <CardBody>
          <CashFlowChart data={projection} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="DSCR over loan term"
          subtitle={`P10 / P50 / P90 with your ${"1.25×"} policy floor overlay`}
        />
        <CardBody>
          <DscrChart data={projection} />
        </CardBody>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader
            title="Scenarios"
            subtitle="Each scenario is a distinct path, not a confidence interval."
          />
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-5 py-2">Scenario</th>
                  <th className="px-5 py-2 text-right">Year 1 savings</th>
                  <th className="px-5 py-2 text-right">Year 1 DSCR</th>
                  <th className="px-5 py-2 text-right">NPV</th>
                  <th className="px-5 py-2 text-right">Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {cf.scenarios.map((s) => {
                  const belowFloor = s.dscrYear1 < 1.25;
                  return (
                    <tr key={s.name} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3">
                        <div className="font-medium text-ink">{s.name}</div>
                        <p className="mt-0.5 text-xs text-ink-muted">{s.description}</p>
                      </td>
                      <td className="px-5 py-3 text-right font-mono">
                        {usd(s.annualSavingsYear1)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono">
                        <span
                          className={
                            belowFloor ? "text-rose-600" : "text-emerald-700"
                          }
                        >
                          {num(s.dscrYear1, 2)}×
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-mono">{usd(s.npv)}</td>
                      <td className="px-5 py-3 text-right">
                        <Badge tone="muted">{Math.round(s.probability * 100)}%</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <CardBody className="bg-slate-50 text-xs text-ink-muted">
            <Info className="mr-1 inline-block h-3 w-3" />
            Policy floor 1.25×. The Conservative scenario lands below floor; we recommend
            pairing that scenario with a Year-1 interest-only structure or debt reserve.
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Tornado sensitivity"
            subtitle="Six inputs with the largest NPV impact"
          />
          <CardBody>
            <TornadoChart rows={tornado} center={cf.npvCentral_at5pct} />
          </CardBody>
        </Card>
      </div>

      <TransparencyStrip
        confidence="Moderate"
        sources={[
          "PG&E E-19 2026-03-01 schedule",
          "HelioScope v2.3",
          "Borrower 12-month interval data",
          "IRC §48 · IRS Notice 2023-38",
        ]}
        methodology="Simple 25-year projection: production × utility rate × escalator × (1−degradation)^t, net of fixed O&M. DSCR is net cash flow divided by level annual debt service. Scenario weights sum to 1. Simulated demonstration — production deployment uses SAM + REopt integrated financial module."
        modelVersion="Cashflow engine v1.0 (2026-Q2)"
        calculatedOn="2026-04-19 16:44 PT"
      />
    </div>
  );
}
