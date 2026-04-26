import Link from "next/link";
import { HardHat, ShieldCheck, Wrench, FileUp } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ContractorPortalPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center gap-2">
        <Badge tone="brand">Contractor portal</Badge>
        <Badge tone="muted">Hero path preview</Badge>
      </div>
      <h1 className="mt-3 font-display text-3xl font-semibold">
        Your submissions, at a glance
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        Submit project documentation, track what the lender still needs, and see your
        business profile as E-SPARC sees it.
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-hairline bg-amber-50/50 p-4 text-sm text-amber-900">
        <strong>Hero-path scope.</strong> Full upload flow, data-request inbox, and
        business-profile editor are scoped for the follow-on build.
      </div>

      <Card className="mt-6">
        <CardHeader
          title="SunWest Commercial Solar"
          subtitle="CSLB 1034729 · C-46 · C-10"
          right={<Badge tone="success">License active</Badge>}
        />
        <CardBody>
          <div className="rounded-lg bg-brand-50 p-4 text-sm text-brand-700 ring-1 ring-inset ring-brand-100">
            <div className="mb-1 flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              What E-SPARC does not do
            </div>
            E-SPARC does <strong>not</strong> evaluate contractor credit. Your credit is not
            part of this application. E-SPARC checks your license, bonding, insurance,
            experience, complaint history, and relevant certifications.
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Section title="Active submissions">
              <ul className="space-y-1 text-sm">
                <li className="flex items-center justify-between">
                  <span>
                    <strong className="text-ink">Coastline Auto Collision</strong> ·
                    VH-2026-0417
                  </span>
                  <Badge tone="accent">Analysis complete</Badge>
                </li>
              </ul>
            </Section>
            <Section title="Your business profile (as seen by E-SPARC)">
              <ul className="space-y-1 text-sm text-ink-muted">
                <li>· License: Active since 2009 (C-46 solar, C-10 electrical)</li>
                <li>· Bond: $25,000 active</li>
                <li>· GL: $2M per occurrence · WC active</li>
                <li>· Track record: 340 projects, 287 documented</li>
                <li>· Complaints: 2 in 5 years, 0 unresolved</li>
                <li>· NABCEP certified · BBB A+</li>
              </ul>
            </Section>
          </div>

          <Section title="Data requests from E-SPARC" className="mt-5">
            <ul className="space-y-2 text-sm">
              <RequestRow
                title="DIR registration + certified payroll plan"
                detail="Needed for ITC prevailing wage bonus adder"
                urgency="high"
              />
              <RequestRow
                title="Qcells domestic content certification letter"
                detail="Needed for ITC domestic content bonus adder"
                urgency="high"
              />
              <RequestRow
                title="PE-stamped structural roof load letter"
                detail="Blocks City of Fresno building permit"
                urgency="high"
              />
              <RequestRow
                title="Battery dispatch simulation"
                detail="12-month interval data dispatch plan for E-19 peak capture"
                urgency="medium"
              />
            </ul>
          </Section>

          <div className="mt-6 flex items-center gap-3">
            <button className="inline-flex h-9 items-center gap-2 rounded-full bg-brand px-4 text-sm font-medium text-white hover:bg-brand-600">
              <FileUp className="h-3.5 w-3.5" /> Upload documents
            </button>
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm hairline hover:bg-slate-50"
            >
              <HardHat className="h-3.5 w-3.5" /> Back to home
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {title}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function RequestRow({
  title,
  detail,
  urgency,
}: {
  title: string;
  detail: string;
  urgency: "high" | "medium" | "low";
}) {
  return (
    <li className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
      <Wrench
        className={
          urgency === "high"
            ? "mt-0.5 h-4 w-4 text-rose-600"
            : urgency === "medium"
              ? "mt-0.5 h-4 w-4 text-amber-600"
              : "mt-0.5 h-4 w-4 text-slate-500"
        }
      />
      <div>
        <div className="font-medium text-ink">{title}</div>
        <div className="text-xs text-ink-muted">{detail}</div>
      </div>
    </li>
  );
}
