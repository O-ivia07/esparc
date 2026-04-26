import { notFound } from "next/navigation";
import { getDealById } from "@/lib/data/deals";
import { ClosingChecklist } from "@/components/checklist/ClosingChecklist";
import { Card, CardBody } from "@/components/ui/Card";

export default function ClosingChecklistPage({ params }: { params: { id: string } }) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();
  if (deal.closingChecklist.length === 0) {
    return (
      <Card className="mt-4 p-8 text-center text-sm text-ink-muted">
        The closing checklist is generated when the deal reaches `analysis_complete` stage.
        This deal is currently at <strong>{deal.stage.replace(/_/g, " ")}</strong>.
      </Card>
    );
  }
  return (
    <div className="mt-4 space-y-4">
      <ClosingChecklist items={deal.closingChecklist} />
      <Card>
        <CardBody className="text-xs text-ink-muted">
          <strong className="text-ink">Methodology.</strong> The checklist is assembled from
          (a) your institution&rsquo;s policy template, (b) applicable state and federal citations
          for this technology and jurisdiction, (c) utility interconnection requirements, and
          (d) best-practice conditions curated by the E-SPARC advisory board. Each item is
          linked to its source. Production deployment supports institution-specific overrides
          and per-product templates.
        </CardBody>
      </Card>
    </div>
  );
}
