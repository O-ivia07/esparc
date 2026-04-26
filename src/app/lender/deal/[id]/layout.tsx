import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDealById } from "@/lib/data/deals";
import { DealHeaderCard } from "@/components/deal/DealHeaderCard";
import { DealTabs } from "@/components/deal/DealTabs";

export default function DealLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const deal = getDealById(params.id);
  if (!deal) return notFound();

  return (
    <div className="space-y-5 px-6 py-6">
      <Link
        href="/lender"
        className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to pipeline
      </Link>
      <DealHeaderCard deal={deal} />
      <DealTabs dealId={deal.id} />
      <div>{children}</div>
    </div>
  );
}
