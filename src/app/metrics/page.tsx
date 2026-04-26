import { Clock, TrendingDown, Scale, Smile } from "lucide-react";
import { Card, CardBody, CardHeader, StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function MetricsPage() {
  return (
    <div className="mx-auto w-full max-w-content px-6 py-10">
      <div className="flex items-center gap-2">
        <Badge tone="brand">Pilot metrics</Badge>
        <Badge tone="muted">24 deals · 3 lenders · California</Badge>
      </div>
      <h1 className="mt-3 font-display text-3xl font-semibold">
        How E-SPARC is performing in the field
      </h1>
      <p className="mt-1 max-w-3xl text-sm text-ink-muted">
        Mocked metrics modeled on the UnLoCED pilot measurement plan (Task 4.3). Four
        outcome dimensions: efficiency, accuracy, access, and adoption.
      </p>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
          <Clock className="h-4 w-4 text-brand" /> Efficiency
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          <StatCard
            label="Avg review time"
            value="5.8 hrs"
            caption="Baseline: 14.2 hrs (−59%)"
            tone="success"
          />
          <StatCard
            label="Cost per deal"
            value="$980"
            caption="Baseline: $2,340 (−58%)"
            tone="success"
          />
          <StatCard
            label="Deals / officer / month"
            value="14.6"
            caption="Baseline: 6.1 (+139%)"
            tone="success"
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
          <TrendingDown className="h-4 w-4 text-brand" /> Accuracy
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          <StatCard
            label="MAPE (pred. vs actual Year-1 kWh)"
            value="6.4%"
            caption="24 projects with ≥6 mo production data"
            tone="success"
          />
          <StatCard
            label="Cross-reviewer variance"
            value="0.09"
            caption="Normalized DSCR variance, lower is better"
            tone="neutral"
          />
          <StatCard
            label="Scenario coverage"
            value="Base / Conservative / Stress"
            caption="Every deal has 3 weighted scenarios"
            tone="brand"
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
          <Scale className="h-4 w-4 text-brand" /> Access
        </h2>
        <Card>
          <CardHeader
            title="Approval rates by borrower characteristic"
            subtitle="Fair lending disparate-impact screen"
            right={<Badge tone="success">Parity met</Badge>}
          />
          <CardBody>
            <table className="w-full text-sm">
              <thead className="text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="py-2">Cohort</th>
                  <th className="py-2 text-right">Approval</th>
                  <th className="py-2 text-right">Avg loan</th>
                  <th className="py-2 text-right">Avg DSCR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {[
                  ["Urban", "71%", "$248k", "1.31×"],
                  ["Rural", "69%", "$186k", "1.34×"],
                  ["LMI census tract", "72%", "$162k", "1.29×"],
                  ["Tribal", "67%", "$212k", "1.27×"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="py-2 text-ink">{r[0]}</td>
                    <td className="py-2 text-right font-mono">{r[1]}</td>
                    <td className="py-2 text-right font-mono">{r[2]}</td>
                    <td className="py-2 text-right font-mono">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
          <Smile className="h-4 w-4 text-brand" /> Adoption
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          <StatCard label="User satisfaction" value="4.6 / 5" caption="n=14 loan officers" tone="success" />
          <StatCard label="Would rely on for next deal" value="86%" caption="Post-pilot survey" tone="success" />
          <StatCard
            label="Top friction"
            value="Document ingest time"
            caption="Fixing in v1.2 (parallel upload)"
            tone="warning"
          />
        </div>
        <Card className="mt-3">
          <CardBody>
            <blockquote className="text-sm italic text-ink-muted">
              &ldquo;E-SPARC takes the part of the file I was least confident about — the
              technical side — and hands me a summary with uncertainty I can defend to
              committee. It doesn&rsquo;t decide for me. It just lets me decide faster and
              with more reasons.&rdquo;
            </blockquote>
            <div className="mt-2 text-xs text-ink-soft">
              — Senior commercial loan officer, pilot cohort
            </div>
          </CardBody>
        </Card>
      </section>

      <p className="mt-10 text-xs text-ink-soft">
        All figures mocked for the demonstration build. Production reporting pipeline will
        aggregate metrics from participating institutions on an opt-in basis with full data
        governance review.
      </p>
    </div>
  );
}
