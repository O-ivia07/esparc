import { notFound } from "next/navigation";
import { Calendar, AlertCircle, Check } from "lucide-react";
import { getDealById } from "@/lib/data/deals";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { TransparencyStrip } from "@/components/deal/TransparencyStrip";
import { usd, num, dateShort } from "@/lib/format";
import type { Incentive } from "@/lib/types";

const STATUS_TONE: Record<Incentive["status"], BadgeTone> = {
  awarded: "success",
  eligible_unclaimed: "warning",
  application_filed: "info",
  expiring_soon: "danger",
  ineligible: "muted",
};

const STATUS_LABEL: Record<Incentive["status"], string> = {
  awarded: "Awarded",
  eligible_unclaimed: "Eligible",
  application_filed: "Filed",
  expiring_soon: "Expiring soon",
  ineligible: "Ineligible",
};

export default function CompliancePage({ params }: { params: { id: string } }) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();

  const projectCost = deal.loanAmountRequested;
  const stacked = deal.incentives
    .filter((i) => i.status !== "ineligible")
    .reduce(
      (acc, i) =>
        acc +
        (i.amountUsd ?? (i.amountPctOfProject ? i.amountPctOfProject * projectCost : 0)),
      0,
    );

  return (
    <div className="mt-4 space-y-5">
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Federal ITC base" value="30%" note="IRC §48" />
        <StatTile label="Energy community adder" value="+10%" note="Fresno tract qualifies" tone="success" />
        <StatTile label="Domestic content adder" value="+10%" note="Pending certification" tone="warning" />
        <StatTile label="Stackable incentive value" value={usd(stacked)} note="At ITC basis 50%" tone="brand" />
      </div>

      <Card>
        <CardHeader
          title="Incentive stack"
          subtitle="Federal, state, utility, and local programs with current status and deadlines"
        />
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-5 py-2">Program</th>
                <th className="px-5 py-2">Source</th>
                <th className="px-5 py-2 text-right">Amount</th>
                <th className="px-5 py-2">Status</th>
                <th className="px-5 py-2">Expires</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {deal.incentives.map((i) => (
                <tr key={i.programName} className="hover:bg-slate-50/50 align-top">
                  <td className="px-5 py-3">
                    <div className="font-medium text-ink">{i.programName}</div>
                    <p className="mt-0.5 text-xs text-ink-muted">{i.notes}</p>
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone="neutral">{i.source}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-ink">
                    {i.amountUsd
                      ? usd(i.amountUsd)
                      : i.amountPctOfProject
                        ? `${Math.round(i.amountPctOfProject * 100)}%`
                        : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={STATUS_TONE[i.status]}>{STATUS_LABEL[i.status]}</Badge>
                  </td>
                  <td className="px-5 py-3 text-xs text-ink-muted">
                    {i.expirationDate ? (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {dateShort(i.expirationDate)}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Regulatory compliance checks" />
          <ul className="divide-y divide-hairline">
            {[
              {
                label: "CEC equipment list",
                detail: "All modules and inverters listed on CEC eligible equipment list",
                pass: true,
              },
              {
                label: "CA Title 24 Part 6",
                detail: "Project classified as addition, not replacement — Title 24 triggers minor",
                pass: true,
              },
              {
                label: "PG&E Rule 21 interconnection",
                detail: "Application submitted, queue position assigned",
                pass: true,
              },
              {
                label: "NEM 3.0 / NBT",
                detail: "Tariff confirmed; battery dispatch plan aligned with peak TOU window",
                pass: true,
              },
              {
                label: "IRS prevailing wage bonus",
                detail: "DIR registration and certified payroll plan not yet filed",
                pass: false,
              },
            ].map((r) => (
              <li key={r.label} className="flex items-start gap-3 px-6 py-3">
                {r.pass ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                )}
                <div className="flex-1">
                  <div className="font-medium text-ink">{r.label}</div>
                  <div className="text-xs text-ink-muted">{r.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Net incentive impact on loan" />
          <CardBody>
            <div className="space-y-3 text-sm">
              <WaterfallRow
                label="Project cost (loan request)"
                value={usd(projectCost)}
                bold
              />
              <WaterfallRow
                label="ITC realized at central basis (50%)"
                value={`− ${usd(projectCost * 0.5)}`}
                tone="success"
              />
              <WaterfallRow
                label="SGIP expected value (60% × $64,500)"
                value={`− ${usd(Math.round(64_500 * 0.6))}`}
                tone="success"
              />
              <WaterfallRow
                label="Net out-of-pocket effective basis"
                value={usd(projectCost - projectCost * 0.5 - Math.round(64_500 * 0.6))}
                bold
              />
              <div className="mt-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 ring-1 ring-inset ring-amber-100">
                <div className="mb-0.5 font-semibold">Heads up</div>
                Drop prevailing wage → ITC basis falls from 50% to 40% → net basis increases
                by {usd(Math.round(projectCost * 0.1))}. Scenario modeling on the Cash Flow
                tab reflects this sensitivity.
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <TransparencyStrip
        confidence="Moderate"
        sources={[
          "IRS Notice 2022-61 (prevailing wage)",
          "IRS Notice 2023-38 (domestic content)",
          "CPUC SGIP Program Handbook 2026",
          "PG&E Rule 21",
          "CEC Eligible Equipment list",
        ]}
        methodology="Eligibility checks run against IRS guidance and state program handbooks. Probability weighting for pending applications uses the 2025 program trajectory as reference. Expiration flags fire at T-6 months."
        modelVersion="Compliance engine v1.0 (2026-Q2)"
        calculatedOn="2026-04-19 16:44 PT"
      />
    </div>
  );
}

function StatTile({
  label,
  value,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "neutral" | "brand" | "success" | "warning";
}) {
  const accent =
    tone === "brand"
      ? "bg-brand text-white"
      : tone === "success"
        ? "bg-emerald-600 text-white"
        : tone === "warning"
          ? "bg-amber-500 text-white"
          : "bg-slate-100 text-ink";
  return (
    <Card>
      <div className="p-5">
        <div className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${accent}`}>
          {label}
        </div>
        <div className="mt-2 font-display text-2xl font-semibold text-ink">{value}</div>
        {note ? <div className="mt-1 text-xs text-ink-muted">{note}</div> : null}
      </div>
    </Card>
  );
}

function WaterfallRow({
  label,
  value,
  tone,
  bold,
}: {
  label: string;
  value: string;
  tone?: "success" | "danger";
  bold?: boolean;
}) {
  const color =
    tone === "success" ? "text-emerald-700" : tone === "danger" ? "text-rose-700" : "text-ink";
  return (
    <div className="flex items-center justify-between border-b border-hairline pb-2 last:border-0 last:pb-0">
      <span className={bold ? "font-medium text-ink" : "text-ink-muted"}>{label}</span>
      <span className={`font-mono ${color} ${bold ? "font-semibold" : ""}`}>{value}</span>
    </div>
  );
}
