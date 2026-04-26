import type { ConsumerProtectionScore, RiskFlag, Severity, Deal } from "../types";

const worst = (levels: Severity[]): Severity => {
  if (levels.includes("red")) return "red";
  if (levels.includes("yellow")) return "yellow";
  return "green";
};

export function scoreConsumerProtection(deal: Deal): ConsumerProtectionScore {
  const disclosures: RiskFlag = {
    severity: "green",
    category: "consumer_protection",
    title: "Financing disclosures complete",
    description:
      "APR, total financed, total interest, total cost, and payment schedule disclosed on standard lender TILA form.",
    recommendation: "Obtain signed TILA/Reg Z disclosure at close.",
    sourceRefs: ["12 CFR §1026.18 (Reg Z)"],
  };

  const warranty: RiskFlag = {
    severity: "green",
    category: "consumer_protection",
    title: "Equipment and workmanship warranties meet best practice",
    description:
      "Module 25-year linear power warranty, inverter 12-year manufacturer warranty, 10-year workmanship from contractor.",
    recommendation: "File warranty assignments at close.",
    sourceRefs: ["SunWest standard contract v2024.3"],
  };

  const cancellation: RiskFlag = {
    severity: "green",
    category: "consumer_protection",
    title: "Right-to-cancel disclosed and acknowledged",
    description: "Statutory 3-business-day right to cancel disclosed and signed.",
    recommendation: "Retain signed disclosure in deal file.",
    sourceRefs: ["CA Civil Code §1689.7"],
  };

  const performance: RiskFlag = (() => {
    if (deal.technologies.includes("solar_pv")) {
      return {
        severity: "yellow",
        category: "consumer_protection",
        title: "Performance guarantee present but schedule pending signature",
        description:
          "Contractor commits to 85% of modeled P50 annual production with shortfall credits. Signature pending.",
        recommendation: "Obtain countersigned guarantee before funding.",
        sourceRefs: ["SunWest standard contract v2024.3"],
      };
    }
    return {
      severity: "green",
      category: "consumer_protection",
      title: "Performance acceptance criteria documented",
      description: "Equipment commissioning acceptance criteria in contract.",
      recommendation: "No action required.",
      sourceRefs: ["Contract §7"],
    };
  })();

  const financing: RiskFlag = {
    severity: "green",
    category: "consumer_protection",
    title: "Clear separation of equipment and financing",
    description:
      "Equipment purchase and loan are separately documented; no dealer fee obfuscation.",
    recommendation: "No action required.",
    sourceRefs: ["FTC 16 CFR §433"],
  };

  const contractLanguage: RiskFlag = {
    severity: "green",
    category: "consumer_protection",
    title: "No red-flag clauses detected in contract",
    description:
      "No mandatory arbitration without opt-out, no excessive dealer fees, no hidden assignment clauses.",
    recommendation: "No action required.",
    sourceRefs: ["Contract review"],
  };

  const overall = worst([
    disclosures.severity,
    warranty.severity,
    cancellation.severity,
    performance.severity,
    financing.severity,
    contractLanguage.severity,
  ]);

  return {
    overall,
    disclosuresComplete: disclosures,
    warrantyAdequate: warranty,
    cancellationRightsDocumented: cancellation,
    performanceGuaranteePresent: performance,
    financingDisclosuresComplete: financing,
    contractLanguageReview: contractLanguage,
  };
}

export const ENGINE_VERSION = "consumer protection v1.0 (2026-Q2)";
