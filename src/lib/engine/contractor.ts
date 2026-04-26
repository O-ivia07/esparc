import type {
  Contractor,
  ContractorQualityScore,
  RiskFlag,
  Severity,
  Technology,
} from "../types";

const worst = (levels: Severity[]): Severity => {
  if (levels.includes("red")) return "red";
  if (levels.includes("yellow")) return "yellow";
  return "green";
};

export function scoreContractor(
  c: Contractor,
  technologies: Technology[],
): ContractorQualityScore {
  const license: RiskFlag = (() => {
    if (c.licenseStatus === "active") {
      return {
        severity: "green",
        category: "contractor",
        title: "Active license matches project scope",
        description: `CSLB ${c.cslbLicense ?? "N/A"} active. Classes: ${(c.licenseClass ?? []).join(", ") || "—"}.`,
        recommendation: "Re-verify within 30 days of close.",
        sourceRefs: ["CSLB public query"],
      };
    }
    if (c.licenseStatus === "expired") {
      return {
        severity: "yellow",
        category: "contractor",
        title: "License recently expired",
        description: `CSLB ${c.cslbLicense} shows expired. Contractor may be in grace period.`,
        recommendation: "Confirm reinstatement before contract execution.",
        sourceRefs: ["CSLB public query"],
      };
    }
    return {
      severity: "red",
      category: "contractor",
      title: "License suspended or not found",
      description: "Cannot confirm active license matching technology scope.",
      recommendation: "Do not proceed until license status is resolved.",
      sourceRefs: ["CSLB public query"],
    };
  })();

  const bond: RiskFlag = (() => {
    if (c.bonded && (c.bondAmount ?? 0) >= 25_000) {
      return {
        severity: "green",
        category: "contractor",
        title: "Bond active and at or above CA contractor minimum",
        description: `Active bond of $${(c.bondAmount ?? 0).toLocaleString()}.`,
        recommendation: "Request rider naming lender as additional obligee.",
        sourceRefs: ["Bond verification"],
      };
    }
    if (c.bonded) {
      return {
        severity: "yellow",
        category: "contractor",
        title: "Bond active but below recommended amount",
        description: `Bond of $${(c.bondAmount ?? 0).toLocaleString()} below $25,000 best-practice minimum.`,
        recommendation: "Request bond increase or larger performance bond on this project.",
        sourceRefs: ["Bond verification"],
      };
    }
    return {
      severity: "red",
      category: "contractor",
      title: "No active bond found",
      description: "Contractor shows no bond in file.",
      recommendation: "Require performance bond before close.",
      sourceRefs: ["Bond verification"],
    };
  })();

  const insurance: RiskFlag = (() => {
    const gl = c.generalLiabilityCoverage ?? 0;
    if (gl >= 2_000_000 && c.workersCompStatus === "active") {
      return {
        severity: "green",
        category: "contractor",
        title: "General liability and workers comp meet lender policy",
        description: `GL $${gl.toLocaleString()} per occurrence; WC active.`,
        recommendation: "Request COI naming lender as additional insured.",
        sourceRefs: ["COI on file"],
      };
    }
    if (gl >= 1_000_000 && c.workersCompStatus !== "lapsed") {
      return {
        severity: "yellow",
        category: "contractor",
        title: "Insurance coverage below lender preferred limits",
        description: `GL $${gl.toLocaleString()} below $2M preferred.`,
        recommendation: "Request umbrella endorsement or excess policy.",
        sourceRefs: ["COI on file"],
      };
    }
    return {
      severity: "red",
      category: "contractor",
      title: "Insurance below minimum acceptable",
      description: `GL $${gl.toLocaleString()}; WC ${c.workersCompStatus}.`,
      recommendation: "Do not proceed without policy upgrade.",
      sourceRefs: ["COI on file"],
    };
  })();

  const experience: RiskFlag = (() => {
    if (c.yearsOperating >= 10 && c.priorProjectsCount >= 100) {
      return {
        severity: "green",
        category: "contractor",
        title: "Deep commercial track record",
        description: `${c.yearsOperating} years operating, ${c.priorProjectsCount} prior projects, ${c.priorProjectsDocumented} with documented production data.`,
        recommendation: "No action required.",
        sourceRefs: ["Contractor project history"],
      };
    }
    if (c.yearsOperating >= 3) {
      return {
        severity: "yellow",
        category: "contractor",
        title: "Limited commercial history",
        description: `${c.yearsOperating} years operating, ${c.priorProjectsCount} prior projects.`,
        recommendation: "Increase reference checks and require additional performance assurance.",
        sourceRefs: ["Contractor project history"],
      };
    }
    return {
      severity: "red",
      category: "contractor",
      title: "Insufficient track record for project size",
      description: `Only ${c.yearsOperating} years and ${c.priorProjectsCount} prior projects.`,
      recommendation: "Escalate to credit committee or require co-general contractor.",
      sourceRefs: ["Contractor project history"],
    };
  })();

  const complaints: RiskFlag = (() => {
    if (c.unresolvedComplaints === 0 && c.complaintsLast5Years <= 2) {
      return {
        severity: "green",
        category: "contractor",
        title: "Clean complaint history",
        description: `${c.complaintsLast5Years} complaints in 5 years, 0 unresolved.`,
        recommendation: "No action required.",
        sourceRefs: ["CSLB complaint query", c.bbbRating ? `BBB ${c.bbbRating}` : "BBB"],
      };
    }
    if (c.unresolvedComplaints <= 1 && c.complaintsLast5Years <= 3) {
      return {
        severity: "yellow",
        category: "contractor",
        title: "Moderate complaint activity",
        description: `${c.complaintsLast5Years} complaints; ${c.unresolvedComplaints} unresolved.`,
        recommendation: "Review complaint substance before close.",
        sourceRefs: ["CSLB complaint query"],
      };
    }
    return {
      severity: "red",
      category: "contractor",
      title: "Elevated complaint history",
      description: `${c.complaintsLast5Years} complaints; ${c.unresolvedComplaints} unresolved.`,
      recommendation: "Require complaint resolution documentation before close.",
      sourceRefs: ["CSLB complaint query"],
    };
  })();

  const certifications: RiskFlag = (() => {
    const isSolar =
      technologies.includes("solar_pv") || technologies.includes("battery_storage");
    if (isSolar) {
      if (c.nabcepCertified) {
        return {
          severity: "green",
          category: "contractor",
          title: "NABCEP certified installer",
          description: "NABCEP PV certification held by at least one key staff member.",
          recommendation: "Confirm NABCEP-certified foreman on site during install.",
          sourceRefs: ["NABCEP registry"],
        };
      }
      return {
        severity: "yellow",
        category: "contractor",
        title: "No NABCEP certification on file",
        description: "Contractor does not hold NABCEP certification for solar work.",
        recommendation: "Request equivalent credential documentation.",
        sourceRefs: ["NABCEP registry"],
      };
    }
    if (c.iccQualified) {
      return {
        severity: "green",
        category: "contractor",
        title: "ICC qualified for efficiency work",
        description: "ICC certification on file.",
        recommendation: "No action required.",
        sourceRefs: ["ICC registry"],
      };
    }
    return {
      severity: "yellow",
      category: "contractor",
      title: "Credential match is adequate but not preferred",
      description: "Technology-specific certification not on file.",
      recommendation: "Request training documentation or equivalent.",
      sourceRefs: [],
    };
  })();

  const overall = worst([
    license.severity,
    bond.severity,
    insurance.severity,
    experience.severity,
    complaints.severity,
    certifications.severity,
  ]);

  return {
    overall,
    licenseCheck: license,
    bondingCheck: bond,
    insuranceCheck: insurance,
    experienceCheck: experience,
    complaintHistoryCheck: complaints,
    certificationsCheck: certifications,
  };
}

export const ENGINE_VERSION = "contractor quality v1.1 (2026-Q2)";
