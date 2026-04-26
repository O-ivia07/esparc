import type { RiskFlag } from "../types";

export const heroRiskFlags: RiskFlag[] = [
  {
    severity: "green",
    category: "contractor",
    title: "Contractor licensing current and in good standing",
    description:
      "CSLB License 1034729 active since 2009, C-46 (solar) and C-10 (electrical) both current. Verified against CSLB public records on import date.",
    recommendation: "No action required. Re-verify within 30 days of close per lender policy.",
    sourceRefs: ["CSLB Public Query", "Contractor self-attestation 2026-04-02"],
  },
  {
    severity: "green",
    category: "scope",
    title: "System design consistent with PG&E NEM 3.0 best economics",
    description:
      "215 kWh battery sized to capture 4–9 PM demand window under PG&E E-19 tariff. Battery-to-PV ratio (1.16 kWh/kW) falls within SGIP General Market recommended envelope.",
    recommendation: "Confirm battery duty cycle modeling matches PG&E E-19 time-of-use windows.",
    sourceRefs: ["HelioScope report v2.3", "PG&E E-19 schedule (effective 2026-03-01)"],
  },
  {
    severity: "green",
    category: "scope",
    title: "Cross-model agreement within 5% threshold",
    description:
      "HelioScope P50 (310,300 kWh) and PVWatts cross-check (297,400 kWh) agree within 4.2%. Below the 5% lender policy threshold for standalone acceptance.",
    recommendation: "Accept HelioScope as system of record. Retain PVWatts cross-check in deal file.",
    sourceRefs: ["HelioScope output", "PVWatts v8 run 2026-04-03"],
  },
  {
    severity: "yellow",
    category: "compliance",
    title: "SGIP award pending, probability ~60%",
    description:
      "SGIP General Market application filed 2026-03-18, placed in active queue. Based on 2025 SGIP trajectory (CPUC monthly reports), probability of award at requested capacity is estimated 60%.",
    recommendation:
      "Stress-test cash flow with SGIP denial scenario (already modeled). Consider conditional commitment subject to SGIP outcome.",
    sourceRefs: ["SGIP queue confirmation 2026-03-18", "CPUC SGIP monthly report Q1 2026"],
  },
  {
    severity: "yellow",
    category: "scope",
    title: "Battery duty cycle not yet modeled for E-19 4–9 PM peak",
    description:
      "Contractor provided sizing rationale but has not submitted battery dispatch simulation against borrower's 12-month interval data for demand charge capture.",
    recommendation:
      "Request battery dispatch simulation from contractor. Required for Year-1 demand charge savings estimate confidence.",
    sourceRefs: ["SunWest proposal p. 14", "Missing: battery dispatch model"],
  },
  {
    severity: "yellow",
    category: "scope",
    title: "Fresno 2025 wildfire smoke season may reduce Year 1 production",
    description:
      "2023 and 2024 Central Valley wildfire seasons reduced PV production 2–4% in affected months. Year 1 forecast does not include a smoke derate.",
    recommendation:
      "Apply 2% conservative smoke derate to Year 1 only. Does not materially affect 25-year NPV but improves Year 1 DSCR confidence.",
    sourceRefs: ["NREL 2024 Central Valley smoke impact study", "CAL FIRE season outlook"],
  },
  {
    severity: "red",
    category: "compliance",
    title: "Prevailing wage eligibility for ITC bonus not confirmed",
    description:
      "Contractor indicates intent to pay prevailing wage for the 10% ITC bonus adder but has not filed the required apprenticeship ratio affidavit or certified payroll plan.",
    recommendation:
      "Make prevailing wage documentation a condition precedent. Without it, the ITC basis in the financial model drops from 50% to 40%, lowering central NPV by ~$78,000.",
    sourceRefs: ["IRS Notice 2022-61", "Contractor attestation 2026-03-22", "Missing: DIR registration"],
  },
  {
    severity: "green",
    category: "contractor",
    title: "Contractor has 16 years operating history, 287 documented projects",
    description:
      "340 prior commercial projects, 287 with production data available on request. Zero unresolved CSLB complaints. BBB A+.",
    recommendation: "No action required.",
    sourceRefs: ["Contractor references", "CSLB complaint history", "BBB listing"],
  },
  {
    severity: "yellow",
    category: "compliance",
    title: "Domestic content adder claimed but manufacturer documentation pending",
    description:
      "10% ITC domestic content adder claimed. Manufacturer certification letter for modules (Qcells Q.PEAK DUO ML-G10+) requested but not received.",
    recommendation:
      "Require manufacturer certification letter as ITC basis documentation before closing. Treaty Decision Notice 2023-38 applies.",
    sourceRefs: ["IRS Notice 2023-38", "Qcells certification request 2026-04-05"],
  },
  {
    severity: "green",
    category: "financial",
    title: "Borrower 12-year member standing with strong deposit relationship",
    description:
      "Member since 2013. Average deposit balance $84,300 over trailing 24 months. No NSF events. Primary operating account at Valley Heritage CU.",
    recommendation: "Positive factor for credit committee; outside E-SPARC scope.",
    sourceRefs: ["Internal deposit history (lender system of record)"],
  },
  {
    severity: "yellow",
    category: "installation",
    title: "Structural roof load letter not yet submitted",
    description:
      "Licensed PE letter confirming roof load capacity for module weight (ballasted system, ~4.5 psf) not in deal file. Required for city building permit.",
    recommendation: "Condition precedent: PE-stamped structural letter prior to permit submission.",
    sourceRefs: ["Fresno building permit checklist", "Missing: PE letter"],
  },
  {
    severity: "green",
    category: "consumer_protection",
    title: "Consumer protection baseline met",
    description:
      "Three-day right to cancel disclosed. Workmanship warranty 10 years. Equipment warranty 25 years (modules) / 12 years (inverters). No mandatory arbitration clause.",
    recommendation: "Obtain final signed disclosure packet at close.",
    sourceRefs: ["SunWest standard contract v2024.3"],
  },
];
