import Link from "next/link";
import { Home, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ConsumerPortalPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center gap-2">
        <Badge tone="brand">Consumer portal</Badge>
        <Badge tone="muted">Hero path preview</Badge>
      </div>
      <h1 className="mt-3 font-display text-3xl font-semibold">
        Your energy project at a glance
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        The consumer portal shows borrowers only what is relevant to them: project scope,
        contractor submissions, outstanding items, and a plain-language consumer protection
        summary. It does not display the lender&rsquo;s internal risk flags.
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-hairline bg-amber-50/50 p-4 text-sm text-amber-900">
        <strong>Hero-path scope.</strong> Full consumer workflow (document upload, data
        request responses, status timeline) is scoped for the follow-on build. This preview
        screen shows the framing and the key disclaimer.
      </div>

      <Card className="mt-6">
        <CardHeader
          title="Coastline Auto Collision LLC"
          subtitle="Valley Heritage Credit Union · Loan application VH-2026-0417"
          right={<Badge tone="accent">Analysis complete</Badge>}
        />
        <CardBody>
          <div className="rounded-lg bg-brand-50 p-4 text-sm text-brand-700 ring-1 ring-inset ring-brand-100">
            <div className="mb-1 flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              What E-SPARC does not do
            </div>
            E-SPARC does <strong>not</strong> evaluate your credit. Your credit decision is
            made by your lender. E-SPARC helps your lender understand the technical and
            contractor side of your project.
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Section title="Project scope">
              <ul className="space-y-1 text-sm text-ink-muted">
                <li>· 185 kW rooftop solar PV</li>
                <li>· 215 kWh / 100 kW battery energy storage</li>
                <li>· Installed by SunWest Commercial Solar (Clovis, CA)</li>
                <li>· Expected to offset 84% of your current electric bill</li>
              </ul>
            </Section>
            <Section title="What we checked for you">
              <ul className="space-y-1 text-sm text-ink-muted">
                <li>✓ 3-day right to cancel disclosed and signed</li>
                <li>✓ 25-year module warranty, 10-year workmanship warranty</li>
                <li>✓ Clear loan cost and APR disclosures</li>
                <li>! Performance guarantee (85% of forecast) — awaiting your signature</li>
              </ul>
            </Section>
          </div>

          <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm">
            <div className="font-medium text-ink">Still needed from you</div>
            <p className="mt-1 text-ink-muted">
              Endorse your property insurance to cover the solar and battery equipment. Your
              insurance broker will provide a form on request.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm hairline hover:bg-slate-50"
            >
              <Home className="h-3.5 w-3.5" /> Back to home
            </Link>
            <Link
              href="/lender/deal/VH-2026-0417/consumer"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-brand px-4 text-sm font-medium text-white hover:bg-brand-600"
            >
              <Sparkles className="h-3.5 w-3.5" />
              View the lender&rsquo;s consumer-protection analysis
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {title}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
