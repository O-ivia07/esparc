import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Building2,
  CircleDollarSign,
  ShieldCheck,
  Wrench,
  MapPin,
  Briefcase,
} from "lucide-react";
import { getDealById } from "@/lib/data/deals";
import { scoreContractor } from "@/lib/engine/contractor";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge, SeverityPill } from "@/components/ui/Badge";
import { QualityCheckList } from "@/components/deal/QualityCheckList";
import { TransparencyStrip } from "@/components/deal/TransparencyStrip";
import { usd, num, dateShort } from "@/lib/format";

export default function ContractorPage({ params }: { params: { id: string } }) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();
  const score = deal.contractorScore ?? scoreContractor(deal.contractor, deal.technologies);
  const c = deal.contractor;

  return (
    <div className="mt-4 space-y-5">
      <Card className="overflow-hidden">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <SeverityPill level={score.overall} label={`Overall ${score.overall}`} />
              <Badge tone="muted">6 checks</Badge>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
              {c.businessName}
            </h2>
            <div className="mt-1 flex items-center gap-3 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-ink-soft" />
                Clovis, CA
              </span>
              <span className="inline-flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-ink-soft" />
                {c.yearsOperating} years operating
              </span>
              <span className="inline-flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-ink-soft" />
                {c.priorProjectsCount} prior commercial projects
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Fact label="CSLB license" value={c.cslbLicense ?? "—"} />
              <Fact label="Classes" value={(c.licenseClass ?? []).join(", ") || "—"} />
              <Fact label="License status" value={c.licenseStatus} capitalize />
              <Fact
                label="Bond"
                value={c.bonded ? `${usd(c.bondAmount ?? 0)} active` : "—"}
              />
              <Fact
                label="General liability"
                value={
                  c.generalLiabilityCoverage
                    ? `${usd(c.generalLiabilityCoverage)} / occ`
                    : "—"
                }
              />
              <Fact label="Workers comp" value={c.workersCompStatus} capitalize />
              <Fact
                label="Complaints (5 yr)"
                value={`${c.complaintsLast5Years} total · ${c.unresolvedComplaints} unresolved`}
              />
              <Fact
                label="NABCEP"
                value={c.nabcepCertified ? "Certified" : "Not on file"}
              />
              <Fact label="BBB" value={c.bbbRating ?? "—"} />
              <Fact
                label="Prior projects documented"
                value={`${c.priorProjectsDocumented} of ${c.priorProjectsCount}`}
              />
              <Fact
                label="References"
                value={`${c.referencesProvided} provided`}
              />
              <Fact
                label="Prevailing wage qualified"
                value={c.prevailingWageQualified ? "Yes" : "Pending"}
              />
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-brand-50 to-white p-5 text-sm ring-1 ring-inset ring-brand-100">
            <div className="text-xs font-semibold uppercase tracking-wide text-brand">
              CSLB Public Query · mocked
            </div>
            <div className="mt-3 space-y-2">
              <PublicRecord
                icon={BadgeCheck}
                label="License number"
                value={`#${c.cslbLicense}`}
              />
              <PublicRecord
                icon={ShieldCheck}
                label="Issued"
                value={`${dateShort("2009-06-12")} (${c.yearsOperating} yrs)`}
              />
              <PublicRecord
                icon={Wrench}
                label="Classes held"
                value={(c.licenseClass ?? []).join(" · ")}
              />
              <PublicRecord
                icon={CircleDollarSign}
                label="Bond"
                value={`${usd(c.bondAmount ?? 0)} active`}
              />
            </div>
            <div className="mt-4 text-[11px] text-ink-soft">
              Production deployment queries CSLB public API in real time and captures the
              ETag for the audit trail.
            </div>
          </div>
        </div>
      </Card>

      <QualityCheckList
        title="Contractor quality scorecard"
        subtitle="E-SPARC does not evaluate contractor credit. These checks assess technical capability and compliance."
        checks={[
          { label: "License", flag: score.licenseCheck },
          { label: "Bonding", flag: score.bondingCheck },
          { label: "Insurance", flag: score.insuranceCheck },
          { label: "Experience", flag: score.experienceCheck },
          { label: "Complaint history", flag: score.complaintHistoryCheck },
          { label: "Certifications", flag: score.certificationsCheck },
        ]}
      />

      <TransparencyStrip
        confidence="High"
        sources={[
          "CSLB public query",
          "BBB listing",
          "NABCEP registry",
          "Contractor self-attestation",
        ]}
        methodology="Deterministic rubric over CSLB, bonding, insurance, experience, complaint, and certification fields. Each sub-check produces a green/yellow/red severity and an actionable recommendation. Overall severity is the worst across the six sub-checks."
        modelVersion="Contractor quality engine v1.1 (2026-Q2)"
        calculatedOn="2026-04-19 16:44 PT"
      />
    </div>
  );
}

function Fact({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </div>
      <div className={`mt-0.5 text-ink ${capitalize ? "capitalize" : ""}`}>{value}</div>
    </div>
  );
}

function PublicRecord({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BadgeCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-brand" />
      <div className="flex-1 text-xs text-ink-muted">{label}</div>
      <div className="text-xs font-medium text-ink">{value}</div>
    </div>
  );
}
