import type { ClosingChecklistItem } from "../types";

const U = (days: number) => {
  const d = new Date("2026-04-20");
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const heroChecklist: ClosingChecklistItem[] = [
  // project_scope (4)
  {
    id: "cs-001",
    category: "project_scope",
    title: "Final stamped engineering drawings on file",
    description:
      "PE-stamped single-line, site plan, and module layout matching final equipment list.",
    status: "in_progress",
    requiredBy: "lender_policy",
    sourceCitation: "Valley Heritage CU Solar Loan Policy §4.2",
    responsibleParty: "contractor",
    note: "Contractor expected to submit by 2026-04-29.",
    lastUpdated: U(3),
  },
  {
    id: "cs-002",
    category: "project_scope",
    title: "Equipment cutsheets match bid (modules, inverters, racking, batteries)",
    description:
      "Manufacturer spec sheets for all major equipment verified against signed bid.",
    status: "complete",
    requiredBy: "lender_policy",
    responsibleParty: "contractor",
    evidenceFileName: "SunWest_Cutsheets_v3.pdf",
    lastUpdated: U(11),
  },
  {
    id: "cs-003",
    category: "project_scope",
    title: "Interconnection application submitted to PG&E",
    description:
      "Rule 21 interconnection application acknowledged by PG&E with queue position.",
    status: "complete",
    requiredBy: "utility",
    sourceCitation: "PG&E Rule 21",
    responsibleParty: "contractor",
    evidenceFileName: "PGE_Rule21_Ack_1034729.pdf",
    lastUpdated: U(18),
  },
  {
    id: "cs-004",
    category: "project_scope",
    title: "Structural roof load letter from licensed PE",
    description:
      "PE letter confirming roof load capacity for 4.5 psf ballasted system.",
    status: "pending",
    requiredBy: "state_law",
    sourceCitation: "CA Business & Professions Code §6735",
    responsibleParty: "contractor",
    note: "Contractor engaging PE this week.",
    lastUpdated: U(2),
  },

  // contractor_qualification (3)
  {
    id: "cq-001",
    category: "contractor_qualification",
    title: "CSLB license verified active within 30 days of close",
    description:
      "CSLB License 1034729 (C-46, C-10) confirmed active, no pending disciplinary action.",
    status: "complete",
    requiredBy: "lender_policy",
    sourceCitation: "Valley Heritage CU Contractor Policy §2.1",
    responsibleParty: "lender",
    evidenceFileName: "CSLB_Verification_2026-04-02.pdf",
    lastUpdated: U(18),
  },
  {
    id: "cq-002",
    category: "contractor_qualification",
    title: "Performance and payment bonds naming lender as additional obligee",
    description:
      "Performance bond covering 100% of contract value with lender named as additional obligee.",
    status: "in_progress",
    requiredBy: "lender_policy",
    responsibleParty: "contractor",
    note: "Surety underwriting received; rider pending.",
    lastUpdated: U(4),
  },
  {
    id: "cq-003",
    category: "contractor_qualification",
    title: "Certificate of insurance naming lender as additional insured, $2M minimum",
    description:
      "General liability $2M per occurrence / $4M aggregate, workers comp active.",
    status: "complete",
    requiredBy: "lender_policy",
    responsibleParty: "contractor",
    evidenceFileName: "SunWest_COI_2026-Q2.pdf",
    lastUpdated: U(9),
  },

  // installation (2)
  {
    id: "in-001",
    category: "installation",
    title: "Pre-installation site inspection report",
    description:
      "Third-party site inspection confirming as-bid conditions and no latent issues.",
    status: "pending",
    requiredBy: "best_practice",
    responsibleParty: "lender",
    note: "Scheduled post-permit, pre-mobilization.",
    lastUpdated: U(1),
  },
  {
    id: "in-002",
    category: "installation",
    title: "Module-level monitoring commissioning plan",
    description:
      "Module-level power electronics (MLPE) commissioning and 30-day post-PTO production verification plan.",
    status: "in_progress",
    requiredBy: "best_practice",
    responsibleParty: "contractor",
    lastUpdated: U(5),
  },

  // insurance_bonding (2)
  {
    id: "ib-001",
    category: "insurance_bonding",
    title: "Borrower property insurance endorsed to cover equipment",
    description:
      "Borrower property policy endorsed to cover PV+battery at replacement cost.",
    status: "in_progress",
    requiredBy: "lender_policy",
    responsibleParty: "consumer",
    note: "Borrower's broker quoted; endorsement expected next week.",
    lastUpdated: U(2),
  },
  {
    id: "ib-002",
    category: "insurance_bonding",
    title: "Contractor workers comp certificate current through projected completion",
    description:
      "Workers comp certificate showing active coverage through projected PTO date.",
    status: "complete",
    requiredBy: "state_law",
    sourceCitation: "CA Labor Code §3700",
    responsibleParty: "contractor",
    evidenceFileName: "SunWest_WC_Cert.pdf",
    lastUpdated: U(9),
  },

  // compliance_permitting (4)
  {
    id: "cp-001",
    category: "compliance_permitting",
    title: "City of Fresno building permit issued",
    description: "Municipal building permit issued and posted at site.",
    status: "pending",
    requiredBy: "state_law",
    responsibleParty: "contractor",
    note: "Blocked pending PE structural letter (cs-004).",
    lastUpdated: U(1),
  },
  {
    id: "cp-002",
    category: "compliance_permitting",
    title: "AHJ electrical permit issued",
    description: "Electrical permit covering PV, ESS, and interconnection equipment.",
    status: "pending",
    requiredBy: "state_law",
    responsibleParty: "contractor",
    lastUpdated: U(1),
  },
  {
    id: "cp-003",
    category: "compliance_permitting",
    title: "NEM 3.0 / NBT interconnection agreement countersigned",
    description: "PG&E countersigned interconnection agreement on NBT schedule.",
    status: "in_progress",
    requiredBy: "utility",
    sourceCitation: "PG&E Rule 21 / CPUC D.22-12-056",
    responsibleParty: "contractor",
    lastUpdated: U(7),
  },
  {
    id: "cp-004",
    category: "compliance_permitting",
    title: "PTO (Permission to Operate) letter",
    description: "Post-close condition; PTO within 60 days of mechanical completion.",
    status: "not_applicable",
    requiredBy: "utility",
    sourceCitation: "PG&E Rule 21",
    responsibleParty: "contractor",
    note: "Post-close condition — monitor during draw period.",
    lastUpdated: U(18),
  },

  // consumer_protection (3)
  {
    id: "cx-001",
    category: "consumer_protection",
    title: "Three-day right to cancel disclosure signed and dated",
    description: "CA statutory three-day right to cancel disclosed and acknowledged.",
    status: "complete",
    requiredBy: "state_law",
    sourceCitation: "CA Civil Code §1689.7",
    responsibleParty: "consumer",
    evidenceFileName: "ROC_Signed_2026-03-30.pdf",
    lastUpdated: U(21),
  },
  {
    id: "cx-002",
    category: "consumer_protection",
    title: "Performance guarantee schedule signed",
    description:
      "Contractor's annual performance guarantee (85% of modeled P50) signed by both parties.",
    status: "in_progress",
    requiredBy: "best_practice",
    responsibleParty: "contractor",
    lastUpdated: U(6),
  },
  {
    id: "cx-003",
    category: "consumer_protection",
    title: "Assignment of warranties to borrower filed",
    description:
      "Manufacturer warranty assignments (modules, inverters, batteries) assigned to borrower.",
    status: "pending",
    requiredBy: "best_practice",
    responsibleParty: "contractor",
    lastUpdated: U(1),
  },

  // financial (3)
  {
    id: "fn-001",
    category: "financial",
    title: "UCC-1 filing on equipment recorded",
    description: "UCC-1 filed in CA SOS covering PV modules, inverters, and BESS.",
    status: "in_progress",
    requiredBy: "lender_policy",
    sourceCitation: "CA Commercial Code §9501",
    responsibleParty: "lender",
    lastUpdated: U(4),
  },
  {
    id: "fn-002",
    category: "financial",
    title: "Loan documentation executed",
    description: "Promissory note, security agreement, and guarantee documents executed.",
    status: "pending",
    requiredBy: "lender_policy",
    responsibleParty: "lender",
    lastUpdated: U(1),
  },
  {
    id: "fn-003",
    category: "financial",
    title: "Flood zone determination complete",
    description: "FEMA flood zone determination with life-of-loan tracking.",
    status: "complete",
    requiredBy: "federal_law",
    sourceCitation: "12 CFR §22.3",
    responsibleParty: "lender",
    evidenceFileName: "Flood_Determination_93722.pdf",
    lastUpdated: U(12),
  },

  // incentives (3)
  {
    id: "iv-001",
    category: "incentives",
    title: "Federal ITC basis memo on file",
    description:
      "ITC basis memo documenting 30% base plus 10% energy community and 10% domestic content adders.",
    status: "blocked",
    requiredBy: "federal_law",
    sourceCitation: "IRC §48 / IRS Notice 2023-38",
    responsibleParty: "lender",
    note: "Blocked: awaiting prevailing wage DIR registration from contractor and Qcells domestic content cert.",
    lastUpdated: U(2),
  },
  {
    id: "iv-002",
    category: "incentives",
    title: "SGIP award letter or documented denial",
    description: "CPUC SGIP General Market award letter or documented program denial.",
    status: "blocked",
    requiredBy: "best_practice",
    sourceCitation: "CPUC SGIP Program Handbook 2026",
    responsibleParty: "contractor",
    note: "Blocked: SGIP queue. Application filed 2026-03-18.",
    lastUpdated: U(3),
  },
  {
    id: "iv-003",
    category: "incentives",
    title: "Domestic content certification from manufacturer",
    description:
      "Module manufacturer (Qcells) domestic content certification letter naming project.",
    status: "in_progress",
    requiredBy: "federal_law",
    sourceCitation: "IRS Notice 2023-38",
    responsibleParty: "contractor",
    lastUpdated: U(4),
  },
];
