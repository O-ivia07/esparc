import { notFound } from "next/navigation";
import { FileText, Microscope } from "lucide-react";
import { getDealById } from "@/lib/data/deals";
import { degradedProduction } from "@/lib/engine/performance";
import { Card, CardBody, CardHeader, StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { UncertaintyBandChart } from "@/components/analytics/UncertaintyBandChart";
import { TransparencyStrip } from "@/components/deal/TransparencyStrip";
import { NotYetAnalyzed } from "@/components/deal/NotYetAnalyzed";
import { num, pctRaw } from "@/lib/format";

export default function PerformancePage({ params }: { params: { id: string } }) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();
  if (!deal.performance)
    return <NotYetAnalyzed dealId={deal.id} stage={deal.stage} tabName="Performance analysis" />;
  const perf = deal.performance;
  const data = degradedProduction(perf, 25);

  const tableRows = data.filter((r) => r.year === 1 || r.year % 5 === 0 || r.year === 25);

  return (
    <div className="mt-4 space-y-5">
      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="P10 (conservative)" value={`${num(perf.p10_kWh)} kWh`} tone="neutral" />
        <StatCard label="P50 (central)" value={`${num(perf.p50_kWh)} kWh`} tone="brand" />
        <StatCard label="P90 (optimistic)" value={`${num(perf.p90_kWh)} kWh`} tone="neutral" />
        <StatCard
          label="Cross-model agreement"
          value={`${perf.crossCheckAgreementPct}%`}
          caption="Within 5% threshold"
          tone="success"
        />
      </div>

      <Card>
        <CardHeader
          title="25-year production with uncertainty band"
          subtitle={`Shaded band is P10 to P90 with annual ${pctRaw(perf.degradationRatePerYear * 100, 2)} linear degradation applied.`}
          right={
            <div className="flex gap-1.5 text-xs">
              <Badge tone="brand">P50 central</Badge>
              <Badge tone="muted">P10 / P90 range</Badge>
            </div>
          }
        />
        <CardBody>
          <UncertaintyBandChart data={data} />
        </CardBody>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader title="Annual production — sampled years" />
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-5 py-2">Year</th>
                  <th className="px-5 py-2 text-right">P10 kWh</th>
                  <th className="px-5 py-2 text-right">P50 kWh</th>
                  <th className="px-5 py-2 text-right">P90 kWh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {tableRows.map((r) => (
                  <tr key={r.year} className="hover:bg-slate-50/50">
                    <td className="px-5 py-2 font-mono text-ink">Year {r.year}</td>
                    <td className="px-5 py-2 text-right font-mono text-ink-muted">
                      {num(r.p10)}
                    </td>
                    <td className="px-5 py-2 text-right font-mono font-semibold text-ink">
                      {num(r.p50)}
                    </td>
                    <td className="px-5 py-2 text-right font-mono text-ink-muted">
                      {num(r.p90)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Input sources" right={<Badge tone="info">Cross-checked</Badge>} />
          <CardBody>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Primary model
                </div>
                <div className="flex items-center gap-1.5 text-ink">
                  <FileText className="h-3.5 w-3.5 text-ink-soft" />
                  {perf.crossCheckModels[0]}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Cross-check
                </div>
                <div className="flex items-center gap-1.5 text-ink">
                  <Microscope className="h-3.5 w-3.5 text-ink-soft" />
                  {perf.crossCheckModels[1]}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Loss stack
                </div>
                <ul className="mt-1 space-y-0.5 text-xs text-ink-muted">
                  <li>Soiling loss: {perf.soilingLossPct}% (Fresno dust)</li>
                  <li>Shading loss: {perf.shadingLossPct}%</li>
                  <li>Inverter efficiency: {perf.inverterEffPct}%</li>
                  <li>Annual degradation: {pctRaw(perf.degradationRatePerYear * 100, 2)}</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <TransparencyStrip
        confidence="High"
        sources={[
          "HelioScope export v2.3",
          "PVWatts v8 cross-check",
          "NREL TMY3 Fresno Yosemite Intl",
          "SAM CEC module database",
        ]}
        methodology={perf.modelNotes}
        modelVersion="Performance engine v1.2 (2026-Q2)"
        calculatedOn="2026-04-19 16:42 PT"
      />
    </div>
  );
}
