import type { Incentive } from "../types";

export function incentiveStatusColor(
  status: Incentive["status"],
): "green" | "yellow" | "red" | "neutral" {
  switch (status) {
    case "awarded":
      return "green";
    case "eligible_unclaimed":
    case "application_filed":
      return "yellow";
    case "expiring_soon":
      return "red";
    case "ineligible":
      return "neutral";
  }
}

export function totalIncentiveDollars(incentives: Incentive[], projectCost: number) {
  return incentives.reduce((acc, i) => {
    if (i.status === "ineligible") return acc;
    if (i.amountUsd) return acc + i.amountUsd;
    if (i.amountPctOfProject) return acc + i.amountPctOfProject * projectCost;
    return acc;
  }, 0);
}

export const ENGINE_VERSION = "compliance v1.0 (2026-Q2)";
