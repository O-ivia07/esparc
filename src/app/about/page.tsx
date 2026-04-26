import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <Badge tone="accent">About</Badge>
      <h1 className="mt-3 font-display text-3xl font-semibold">E-SPARC</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Energy System Procurement Assessment for Real Credit.
      </p>

      <Card className="mt-6">
        <CardBody className="space-y-3 text-sm leading-relaxed text-ink-muted">
          <p>
            E-SPARC is an open-source, AI-assisted due-diligence platform being developed
            under the <strong>UnLoCED program</strong> (Unleashing Local Capital for Energy
            Dominance) at the National Laboratory of the Rockies.
          </p>
          <p>
            U.S. community banks, regional banks, and credit unions hold roughly $8.7
            trillion in assets, yet fewer than 11% of CDFIs reported any energy-efficiency
            lending activity in 2019 and 2020. SMFI loan officers consistently report they
            cannot quantify performance and cash-flow uncertainty on energy projects, so
            they decline or misprice applications that would otherwise be fundable.
          </p>
          <p>
            E-SPARC gives those loan officers a structured, explainable due-diligence
            output: P10/P50/P90 production bands, scenario-based cash flow, contractor
            quality scoring, consumer protection checks, and a production-grade closing
            checklist — all with transparent methodology, sources, and audit trail.
          </p>
          <p className="rounded-xl bg-amber-50 p-4 text-amber-900 ring-1 ring-inset ring-amber-100">
            <ShieldCheck className="mr-1 inline h-3.5 w-3.5" />
            This is a demonstration prototype. Models, data, and outputs are illustrative
            only. Production deployment will be built by NLR with full modeling rigor,
            regulatory review, and Advisory Board oversight.
          </p>
        </CardBody>
      </Card>

      <div className="mt-6 flex gap-3">
        <Link
          href="/lender"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-brand px-4 text-sm font-medium text-white hover:bg-brand-600"
        >
          Open lender portal
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/metrics"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm hairline hover:bg-slate-50"
        >
          Pilot metrics
        </Link>
      </div>
    </div>
  );
}
