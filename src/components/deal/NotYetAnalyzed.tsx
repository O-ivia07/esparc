import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";

export function NotYetAnalyzed({
  dealId,
  stage,
  tabName,
}: {
  dealId: string;
  stage: string;
  tabName: string;
}) {
  return (
    <Card className="mt-4">
      <CardBody>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Clock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold">
              {tabName} not yet generated
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              E-SPARC produces the {tabName.toLowerCase()} output once this deal reaches the{" "}
              <strong>analysis complete</strong> stage. It is currently at{" "}
              <strong>{stage.replace(/_/g, " ")}</strong>. For a fully worked-through
              scenario, open the Coastline hero deal.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/lender/deal/${dealId}`}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium hairline hover:bg-slate-50"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to deal overview
              </Link>
              <Link
                href="/lender/deal/VH-2026-0417"
                className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-600"
              >
                Open hero deal
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
