"use client";
import { useEffect } from "react";
import { useEsparcStore } from "@/lib/store";

const SEED = [
  {
    offsetSeconds: 10,
    actor: "lender" as const,
    action: "deal_opened",
    dealId: "VH-2026-0417",
    detail: "Maya Okafor opened deal VH-2026-0417 for review.",
  },
  {
    offsetSeconds: 70,
    actor: "esparc_engine" as const,
    action: "performance_run",
    dealId: "VH-2026-0417",
    detail: "Performance engine produced P10 281,200 / P50 310,300 / P90 336,400 kWh.",
    modelVersion: "performance v1.2 (2026-Q2)",
  },
  {
    offsetSeconds: 140,
    actor: "esparc_engine" as const,
    action: "cashflow_run",
    dealId: "VH-2026-0417",
    detail: "Cashflow engine produced central NPV $612,400 · Year-1 DSCR 1.32×.",
    modelVersion: "cashflow v1.0 (2026-Q2)",
  },
  {
    offsetSeconds: 220,
    actor: "esparc_engine" as const,
    action: "contractor_score",
    dealId: "VH-2026-0417",
    detail: "Contractor quality scored overall green (6 sub-checks).",
    modelVersion: "contractor quality v1.1 (2026-Q2)",
  },
  {
    offsetSeconds: 320,
    actor: "esparc_engine" as const,
    action: "checklist_regenerated",
    dealId: "VH-2026-0417",
    detail: "Closing checklist regenerated: 24 items, 8 complete, 2 blocked.",
    modelVersion: "checklist v2026-Q2",
  },
  {
    offsetSeconds: 420,
    actor: "lender" as const,
    action: "risk_flag_acknowledged",
    dealId: "VH-2026-0417",
    detail: "Loan officer acknowledged red flag: prevailing-wage documentation pending.",
  },
];

export function AuditSeed() {
  useEffect(() => {
    const store = useEsparcStore.getState();
    if (store.events.length > 0) return;
    const now = Date.now();
    const seeded = SEED.map((e, idx) => ({
      actor: e.actor,
      action: e.action,
      dealId: e.dealId,
      detail: e.detail,
      modelVersion: e.modelVersion,
      timestamp: new Date(now - (SEED.length - idx) * e.offsetSeconds * 1000).toISOString(),
    }));
    useEsparcStore.setState({ events: seeded.reverse() });
  }, []);
  return null;
}
