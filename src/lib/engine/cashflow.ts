import type { CashFlowAnalysis, PerformanceAnalysis } from "../types";

export interface YearRow {
  year: number;
  productionP10: number;
  productionP50: number;
  productionP90: number;
  utilityRate: number;
  grossSavingsP50: number;
  netSavingsP50: number;
  debtService: number;
  dscrP10: number;
  dscrP50: number;
  dscrP90: number;
  scenarioBase: number;
  scenarioConservative: number;
  scenarioStress: number;
}

export interface CashFlowInputs {
  loanAmount: number;
  interestRatePct: number;
  termYears: number;
  initialUtilityRate: number;
  escalator: number;
  performance: PerformanceAnalysis;
  omAnnual: number;
  itcRefund: number;
  sgipRefund: number;
}

export function annualDebtService(loan: number, ratePct: number, termYears: number) {
  const r = ratePct / 100;
  if (r === 0) return loan / termYears;
  const payment = (loan * r) / (1 - Math.pow(1 + r, -termYears));
  return payment;
}

export function project25Years(input: CashFlowInputs): YearRow[] {
  const rows: YearRow[] = [];
  const debtService = annualDebtService(
    input.loanAmount,
    input.interestRatePct,
    input.termYears,
  );
  const deg = input.performance.degradationRatePerYear;

  for (let year = 1; year <= 25; year++) {
    const factor = Math.pow(1 - deg, year - 1);
    const productionP10 = input.performance.p10_kWh * factor;
    const productionP50 = input.performance.p50_kWh * factor;
    const productionP90 = input.performance.p90_kWh * factor;

    const utilityRate =
      input.initialUtilityRate * Math.pow(1 + input.escalator, year - 1);

    const grossP50 = productionP50 * utilityRate;
    const netP50 = grossP50 - input.omAnnual;

    const ds = year <= input.termYears ? debtService : 0;

    const dscrP10 = ds > 0 ? (productionP10 * utilityRate - input.omAnnual) / ds : 0;
    const dscrP50 = ds > 0 ? netP50 / ds : 0;
    const dscrP90 = ds > 0 ? (productionP90 * utilityRate - input.omAnnual) / ds : 0;

    const scenarioBase = netP50;
    const scenarioConservative = productionP50 * utilityRate * 0.85 - input.omAnnual;
    const scenarioStress =
      productionP10 * input.initialUtilityRate * Math.pow(1 + 0.015, year - 1) -
      input.omAnnual * 1.1;

    rows.push({
      year,
      productionP10: Math.round(productionP10),
      productionP50: Math.round(productionP50),
      productionP90: Math.round(productionP90),
      utilityRate,
      grossSavingsP50: Math.round(grossP50),
      netSavingsP50: Math.round(netP50),
      debtService: Math.round(ds),
      dscrP10: Number(dscrP10.toFixed(2)),
      dscrP50: Number(dscrP50.toFixed(2)),
      dscrP90: Number(dscrP90.toFixed(2)),
      scenarioBase: Math.round(scenarioBase),
      scenarioConservative: Math.round(scenarioConservative),
      scenarioStress: Math.round(scenarioStress),
    });
  }
  return rows;
}

export function npv(cashflows: number[], discountRate: number) {
  return cashflows.reduce((acc, c, idx) => acc + c / Math.pow(1 + discountRate, idx), 0);
}

export function irrBisection(cashflows: number[]): number {
  let low = -0.99;
  let high = 1;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const v = npv(cashflows, mid);
    if (Math.abs(v) < 1) return mid;
    if (v > 0) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

export function simplePayback(upfront: number, yearly: number[]): number {
  let cumulative = 0;
  for (let i = 0; i < yearly.length; i++) {
    cumulative += yearly[i];
    if (cumulative >= upfront) {
      const prev = cumulative - yearly[i];
      const frac = (upfront - prev) / yearly[i];
      return i + frac;
    }
  }
  return yearly.length;
}

export function tornadoInputs(base: CashFlowAnalysis) {
  const centralNpv = base.npvCentral_at5pct;
  return [
    {
      label: "Utility rate escalator",
      low: -0.32,
      high: 0.24,
      absLow: centralNpv * (1 - 0.32),
      absHigh: centralNpv * (1 + 0.24),
    },
    {
      label: "P50 production realization",
      low: -0.18,
      high: 0.12,
      absLow: centralNpv * (1 - 0.18),
      absHigh: centralNpv * (1 + 0.12),
    },
    {
      label: "ITC basis realization",
      low: -0.21,
      high: 0.04,
      absLow: centralNpv * (1 - 0.21),
      absHigh: centralNpv * (1 + 0.04),
    },
    {
      label: "SGIP award",
      low: -0.13,
      high: 0.0,
      absLow: centralNpv * (1 - 0.13),
      absHigh: centralNpv,
    },
    {
      label: "O&M annual cost",
      low: -0.04,
      high: 0.03,
      absLow: centralNpv * (1 - 0.04),
      absHigh: centralNpv * (1 + 0.03),
    },
    {
      label: "Loan interest rate",
      low: -0.07,
      high: 0.06,
      absLow: centralNpv * (1 - 0.07),
      absHigh: centralNpv * (1 + 0.06),
    },
  ];
}

export const ENGINE_VERSION = "cashflow v1.0 (2026-Q2)";
