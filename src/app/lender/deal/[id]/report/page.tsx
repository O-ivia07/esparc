"use client";
import { notFound } from "next/navigation";
import { Download, Printer, Signature } from "lucide-react";
import { getDealById } from "@/lib/data/deals";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Wordmark } from "@/components/ui/Wordmark";
import { NotYetAnalyzed } from "@/components/deal/NotYetAnalyzed";
import { num, pctRaw, usd, dateShort } from "@/lib/format";

export default function ReportPage({ params }: { params: { id: string } }) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();
  if (!deal.cashflow || !deal.performance)
    return <NotYetAnalyzed dealId={deal.id} stage={deal.stage} tabName="Lender ready report" />;
  const cf = deal.cashflow;
  const perf = deal.performance;

  const print = () => typeof window !== "undefined" && window.print();

  return (
    <div className="mt-4 space-y-4">
      <div className="no-print flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-ink-muted">
          One-page lender committee memo. Ready to print or export.
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={print}>
            <Printer className="h-3.5 w-3.5" /> Print
          </Button>
          <Button size="sm" onClick={print}>
            <Download className="h-3.5 w-3.5" /> Download PDF
          </Button>
        </div>
      </div>

      <Card className="bg-white p-0">
        <div className="border-b border-hairline px-10 py-6">
          <div className="flex items-center justify-between">
            <Wordmark size="lg" />
            <div className="text-right text-xs text-ink-soft">
              <div>Lender Ready Report</div>
              <div className="font-mono">{deal.id}</div>
              <div>{dateShort(deal.updatedAt)}</div>
            </div>
          </div>
        </div>

        <div className="px-10 py-7">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-hairline pb-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Applicant
              </div>
              <div className="font-display text-2xl font-semibold">
                {deal.borrower.legalName}
              </div>
              <div className="text-sm text-ink-muted">
                {deal.borrower.businessType} · {deal.borrower.propertyAddress.city},{" "}
                {deal.borrower.propertyAddress.state}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge tone="accent">Analysis complete</Badge>
              <div className="font-mono text-sm text-ink-muted">
                Prepared for {deal.lenderInstitution}
              </div>
            </div>
          </div>

          <section className="mt-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Executive summary
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {deal.borrower.legalName} requests {usd(deal.loanAmountRequested)} over{" "}
              {deal.loanTermYears} years for a{" "}
              {deal.energyModel.find((m) => m.sizeKwDc)?.sizeKwDc} kW solar PV system plus{" "}
              {deal.energyModel.find((m) => m.sizeKwhStorage)?.sizeKwhStorage} kWh battery
              storage at its owned {deal.borrower.squareFootage.toLocaleString()} sq ft
              facility. HelioScope-modeled P50 annual production is{" "}
              {num(perf.p50_kWh)} kWh (P10 {num(perf.p10_kWh)} / P90 {num(perf.p90_kWh)}) with{" "}
              {perf.crossCheckAgreementPct}% cross-check agreement against PVWatts. Central-
              case Year-1 DSCR is {num(cf.dscrYear1Range.central, 2)}× with a stress-case
              floor of {num(cf.dscrWorstYear, 2)}×. NPV at 5% is{" "}
              {usd(cf.npvCentral_at5pct)} and IRR is {pctRaw(cf.irrCentral * 100, 1)}.
              Contractor SunWest Commercial Solar holds an active CSLB license with 16 years
              of commercial track record.
            </p>
          </section>

          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <Metric label="Central NPV" value={usd(cf.npvCentral_at5pct)} />
            <Metric
              label="Year 1 DSCR"
              value={`${num(cf.dscrYear1Range.central, 2)}×`}
            />
            <Metric label="Central IRR" value={pctRaw(cf.irrCentral * 100, 1)} />
            <Metric label="Payback" value={`${cf.paybackYearsCentral} yrs`} />
          </div>

          <section className="mt-6 grid gap-5 md:grid-cols-2">
            <ReportSection title="Performance summary">
              <ul className="space-y-1 text-xs text-ink-muted">
                <li>P50 production: {num(perf.p50_kWh)} kWh/yr</li>
                <li>P10 / P90: {num(perf.p10_kWh)} / {num(perf.p90_kWh)} kWh/yr</li>
                <li>Annual degradation: {pctRaw(perf.degradationRatePerYear * 100, 2)}</li>
                <li>Cross-check agreement: {perf.crossCheckAgreementPct}% (within 5% policy threshold)</li>
              </ul>
            </ReportSection>
            <ReportSection title="Cash flow summary">
              <ul className="space-y-1 text-xs text-ink-muted">
                <li>Year 1 savings: {usd(cf.year1SavingsRange.central)} ({usd(cf.year1SavingsRange.low)}–{usd(cf.year1SavingsRange.high)})</li>
                <li>25-year savings (central, nominal): {usd(cf.year25SavingsCentral)}</li>
                <li>Escalator: {pctRaw(cf.escalatorAssumption.central * 100, 1)} central ({pctRaw(cf.escalatorAssumption.low * 100, 1)}–{pctRaw(cf.escalatorAssumption.high * 100, 1)})</li>
                <li>DSCR: {num(cf.dscrYear1Range.central, 2)}× Year 1 · {num(cf.dscrWorstYear, 2)}× stress-case floor</li>
              </ul>
            </ReportSection>
          </section>

          <section className="mt-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Risk summary
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              {deal.riskFlags
                .filter((f) => f.severity !== "green")
                .slice(0, 6)
                .map((f) => (
                  <li key={f.title} className="flex items-start gap-2">
                    <span
                      className={
                        f.severity === "red"
                          ? "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500"
                          : "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                      }
                    />
                    <div>
                      <div className="text-ink">{f.title}</div>
                      <div className="text-xs text-ink-soft">{f.recommendation}</div>
                    </div>
                  </li>
                ))}
            </ul>
          </section>

          <section className="mt-6 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-5">
            <div className="flex items-center gap-2">
              <Signature className="h-4 w-4 text-amber-700" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-amber-900">
                Lender recommendation (lender input)
              </h3>
              <Badge tone="warning">Not auto-filled</Badge>
            </div>
            <p className="mt-2 text-xs text-amber-900/80">
              E-SPARC presents analysis. The recommendation below is written by the loan
              officer and reviewed by the credit committee.
            </p>
            <textarea
              className="mt-3 h-28 w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-amber-400/60"
              placeholder="Write your recommendation here. Reference specific scenarios, conditions precedent, and policy floors."
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                  Loan officer signature
                </div>
                <div className="mt-6 border-t border-amber-400" />
                <div className="mt-1 text-xs text-amber-900/80">
                  {deal.loanOfficer} · {deal.lenderInstitution}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                  Credit committee chair
                </div>
                <div className="mt-6 border-t border-amber-400" />
                <div className="mt-1 text-xs text-amber-900/80">Date</div>
              </div>
            </div>
          </section>

          <footer className="mt-6 border-t border-hairline pt-3 text-[10px] text-ink-soft">
            E-SPARC demonstration prototype. Models and outputs illustrative only. Production
            deployment uses NLR-grade modeling (SAM, REopt, ResStock, ComStock) with full
            regulatory review and advisory board oversight. Credit decisions remain with
            your institution.
          </footer>
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-inset ring-hairline">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </div>
      <div className="mt-0.5 font-display text-lg font-semibold text-ink">{value}</div>
    </div>
  );
}

function ReportSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-hairline p-4">
      <h4 className="font-display text-sm font-semibold text-ink">{title}</h4>
      <div className="mt-2">{children}</div>
    </div>
  );
}
