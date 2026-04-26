import { notFound } from "next/navigation";
import { Info, ShieldCheck } from "lucide-react";
import { getDealById } from "@/lib/data/deals";
import { scoreConsumerProtection } from "@/lib/engine/consumer";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge, SeverityPill } from "@/components/ui/Badge";
import { QualityCheckList } from "@/components/deal/QualityCheckList";
import { TransparencyStrip } from "@/components/deal/TransparencyStrip";

export default function ConsumerPage({ params }: { params: { id: string } }) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();
  const score = deal.consumerProtection ?? scoreConsumerProtection(deal);

  return (
    <div className="mt-4 space-y-5">
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-6">
          <div>
            <div className="flex items-center gap-2">
              <SeverityPill level={score.overall} label={`Overall ${score.overall}`} />
              <Badge tone="muted">6 checks</Badge>
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold text-ink">
              Consumer protection summary — {deal.borrower.legalName}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-ink-muted">
              E-SPARC reviews the contract and disclosure packet against state and federal
              consumer protection requirements and best-practice lender guardrails. This
              view does not evaluate consumer credit.
            </p>
          </div>
          <div className="rounded-xl bg-brand-50 p-4 text-xs text-brand-700 ring-1 ring-inset ring-brand-100">
            <div className="mb-1 flex items-center gap-1.5 font-semibold">
              <Info className="h-3.5 w-3.5" />
              What the borrower sees
            </div>
            The consumer portal shows a plain-language version of these checks without the
            rubric detail. They see the project scope and protection summary only — not the
            internal risk flags.
          </div>
        </div>
      </Card>

      <QualityCheckList
        title="Consumer protection scorecard"
        checks={[
          { label: "Disclosures complete", flag: score.disclosuresComplete },
          { label: "Warranty adequate", flag: score.warrantyAdequate },
          { label: "Cancellation rights documented", flag: score.cancellationRightsDocumented },
          { label: "Performance guarantee present", flag: score.performanceGuaranteePresent },
          { label: "Financing disclosures", flag: score.financingDisclosuresComplete },
          { label: "Contract language review", flag: score.contractLanguageReview },
        ]}
      />

      <Card>
        <CardHeader
          title="Plain-language summary (borrower-facing)"
          right={<Badge tone="brand">Shown in consumer portal</Badge>}
        />
        <CardBody>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                Your contract includes a 3-business-day right to cancel. You already signed
                and dated this disclosure.
              </span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                Your equipment has a 25-year manufacturer power warranty and a 10-year
                workmanship warranty from SunWest.
              </span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                Your loan paperwork discloses the APR, total interest, and total payments in
                plain dollar figures.
              </span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span>
                Please confirm SunWest sent you the signed performance guarantee (it
                promises 85% of forecast production with shortfall credits).
              </span>
            </li>
          </ul>
        </CardBody>
      </Card>

      <TransparencyStrip
        confidence="High"
        sources={[
          "SunWest contract v2024.3",
          "12 CFR §1026 (Reg Z)",
          "CA Civil Code §1689.7",
          "FTC 16 CFR §433",
        ]}
        methodology="Deterministic rubric over six consumer-protection criteria. Production deployment runs NLP-assisted contract review with redlined output and jurisdiction detection."
        modelVersion="Consumer protection engine v1.0 (2026-Q2)"
        calculatedOn="2026-04-19 16:44 PT"
      />
    </div>
  );
}
