import type { DealStage } from "@/lib/types";
import { STAGE_LABELS } from "@/lib/types";
import { Badge, type BadgeTone } from "@/components/ui/Badge";

const STAGE_TONE: Record<DealStage, BadgeTone> = {
  intake: "neutral",
  documents_received: "info",
  data_gaps_flagged: "warning",
  in_review: "info",
  analysis_complete: "accent",
  closing_checklist: "brand",
  lender_decision_pending: "accent",
  closed_funded: "success",
  declined: "danger",
};

export function StageBadge({ stage }: { stage: DealStage }) {
  return <Badge tone={STAGE_TONE[stage]}>{STAGE_LABELS[stage]}</Badge>;
}
