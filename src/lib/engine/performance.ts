import type { USState, PerformanceAnalysis } from "../types";

const SPECIFIC_YIELD: Record<USState, number> = {
  CA: 1680,
  CO: 1620,
  MI: 1320,
};

export function lookupSpecificYield(state: USState) {
  return SPECIFIC_YIELD[state];
}

export function pvProduction(sizeKwDc: number, state: USState) {
  const specificYield = SPECIFIC_YIELD[state];
  const p50 = sizeKwDc * specificYield;
  return {
    p10: Math.round(p50 * 0.905),
    p50: Math.round(p50),
    p90: Math.round(p50 * 1.085),
  };
}

export function degradedProduction(
  p: Pick<PerformanceAnalysis, "p10_kWh" | "p50_kWh" | "p90_kWh" | "degradationRatePerYear">,
  years = 25,
) {
  const rows: { year: number; p10: number; p50: number; p90: number }[] = [];
  for (let year = 1; year <= years; year++) {
    const factor = Math.pow(1 - p.degradationRatePerYear, year - 1);
    rows.push({
      year,
      p10: Math.round(p.p10_kWh * factor),
      p50: Math.round(p.p50_kWh * factor),
      p90: Math.round(p.p90_kWh * factor),
    });
  }
  return rows;
}

export const ENGINE_VERSION = "performance v1.2 (2026-Q2)";
