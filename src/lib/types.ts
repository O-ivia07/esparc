export type ActorRole = "lender" | "consumer" | "contractor";

export type Technology =
  | "solar_pv"
  | "battery_storage"
  | "air_source_heat_pump"
  | "tankless_water_heater";

export type USState = "CA" | "CO" | "MI";

export type DealStage =
  | "intake"
  | "documents_received"
  | "data_gaps_flagged"
  | "in_review"
  | "analysis_complete"
  | "closing_checklist"
  | "lender_decision_pending"
  | "closed_funded"
  | "declined";

export interface Address {
  street: string;
  city: string;
  state: USState;
  zip: string;
}

export interface Borrower {
  legalName: string;
  dba?: string;
  entityType: "LLC" | "S-Corp" | "C-Corp" | "Sole Prop" | "Non-Profit";
  propertyAddress: Address;
  squareFootage: number;
  businessType: string;
  yearsInBusiness: number;
  memberSince?: string;
}

export interface Contractor {
  businessName: string;
  cslbLicense?: string;
  licenseClass?: string[];
  licenseStatus: "active" | "suspended" | "expired" | "not_found";
  bonded: boolean;
  bondAmount?: number;
  generalLiabilityCoverage?: number;
  workersCompStatus: "active" | "exempt" | "lapsed";
  yearsOperating: number;
  prevailingWageQualified: boolean;
  complaintsLast5Years: number;
  unresolvedComplaints: number;
  bbbRating?: string;
  nabcepCertified?: boolean;
  iccQualified?: boolean;
  priorProjectsCount: number;
  priorProjectsDocumented: number;
  referencesProvided: number;
}

export interface EnergyModelInput {
  technology: Technology;
  sizeKwDc?: number;
  sizeKwhStorage?: number;
  tonnage?: number;
  annualGalUsage?: number;
  tilt?: number;
  azimuth?: number;
  shading?: number;
  modelSource:
    | "HelioScope"
    | "PVWatts"
    | "PVsyst"
    | "Aurora"
    | "HOMER"
    | "REopt"
    | "EnergyPlus"
    | "OS-HPXML"
    | "Manual";
  modelFileName?: string;
  annualProduction_kWh?: number;
  specificYield_kWh_per_kW?: number;
}

export interface PerformanceAnalysis {
  p10_kWh: number;
  p50_kWh: number;
  p90_kWh: number;
  degradationRatePerYear: number;
  soilingLossPct: number;
  shadingLossPct: number;
  inverterEffPct: number;
  modelNotes: string;
  crossCheckModels: string[];
  crossCheckAgreementPct: number;
}

export interface CashFlowScenario {
  name: string;
  description: string;
  annualSavingsYear1: number;
  dscrYear1: number;
  npv: number;
  probability: number;
}

export interface CashFlowAnalysis {
  year1SavingsRange: { low: number; central: number; high: number };
  escalatorAssumption: { low: number; central: number; high: number };
  year25SavingsCentral: number;
  npvCentral_at5pct: number;
  irrCentral: number;
  dscrYear1Range: { low: number; central: number; high: number };
  dscrWorstYear: number;
  paybackYearsCentral: number;
  scenarios: CashFlowScenario[];
}

export interface Incentive {
  programName: string;
  source: "Federal" | "State" | "Utility" | "Local";
  amountUsd?: number;
  amountPctOfProject?: number;
  status:
    | "eligible_unclaimed"
    | "application_filed"
    | "awarded"
    | "ineligible"
    | "expiring_soon";
  expirationDate?: string;
  notes: string;
}

export type Severity = "green" | "yellow" | "red";

export interface RiskFlag {
  severity: Severity;
  category:
    | "scope"
    | "contractor"
    | "installation"
    | "financial"
    | "compliance"
    | "consumer_protection";
  title: string;
  description: string;
  recommendation: string;
  sourceRefs: string[];
}

export type ChecklistStatus =
  | "complete"
  | "in_progress"
  | "pending"
  | "blocked"
  | "not_applicable";

export type ChecklistCategory =
  | "project_scope"
  | "contractor_qualification"
  | "installation"
  | "insurance_bonding"
  | "compliance_permitting"
  | "consumer_protection"
  | "financial"
  | "incentives";

export interface ClosingChecklistItem {
  id: string;
  category: ChecklistCategory;
  title: string;
  description: string;
  status: ChecklistStatus;
  requiredBy:
    | "lender_policy"
    | "state_law"
    | "federal_law"
    | "utility"
    | "best_practice";
  sourceCitation?: string;
  evidenceFileName?: string;
  responsibleParty: ActorRole;
  note?: string;
  lastUpdated: string;
}

export interface AuditEvent {
  timestamp: string;
  actor: ActorRole | "system" | "esparc_engine";
  action: string;
  dealId: string;
  detail: string;
  modelVersion?: string;
}

export interface ContractorQualityScore {
  overall: Severity;
  licenseCheck: RiskFlag;
  bondingCheck: RiskFlag;
  insuranceCheck: RiskFlag;
  experienceCheck: RiskFlag;
  complaintHistoryCheck: RiskFlag;
  certificationsCheck: RiskFlag;
}

export interface ConsumerProtectionScore {
  overall: Severity;
  disclosuresComplete: RiskFlag;
  warrantyAdequate: RiskFlag;
  cancellationRightsDocumented: RiskFlag;
  performanceGuaranteePresent: RiskFlag;
  financingDisclosuresComplete: RiskFlag;
  contractLanguageReview: RiskFlag;
}

export interface Deal {
  id: string;
  stage: DealStage;
  createdAt: string;
  updatedAt: string;
  borrower: Borrower;
  contractor: Contractor;
  technologies: Technology[];
  loanAmountRequested: number;
  loanTermYears: number;
  interestRateTarget: number;
  energyModel: EnergyModelInput[];
  performance?: PerformanceAnalysis;
  cashflow?: CashFlowAnalysis;
  contractorScore?: ContractorQualityScore;
  consumerProtection?: ConsumerProtectionScore;
  incentives: Incentive[];
  riskFlags: RiskFlag[];
  closingChecklist: ClosingChecklistItem[];
  auditTrail: AuditEvent[];
  lenderInstitution: string;
  loanOfficer: string;
}

export const TECH_LABELS: Record<Technology, string> = {
  solar_pv: "Solar PV",
  battery_storage: "Battery Storage",
  air_source_heat_pump: "Air-Source Heat Pump",
  tankless_water_heater: "Tankless Water Heater",
};

export const STAGE_LABELS: Record<DealStage, string> = {
  intake: "Intake",
  documents_received: "Documents received",
  data_gaps_flagged: "Data gaps flagged",
  in_review: "In review",
  analysis_complete: "Analysis complete",
  closing_checklist: "Closing checklist",
  lender_decision_pending: "Decision pending",
  closed_funded: "Closed & funded",
  declined: "Declined",
};

export const STAGE_ORDER = [
  "intake",
  "documents_received",
  "data_gaps_flagged",
  "in_review",
  "analysis_complete",
  "closing_checklist",
  "lender_decision_pending",
  "closed_funded",
] as const satisfies readonly DealStage[];

export const CHECKLIST_CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  project_scope: "Project scope",
  contractor_qualification: "Contractor qualification",
  installation: "Installation",
  insurance_bonding: "Insurance & bonding",
  compliance_permitting: "Compliance & permitting",
  consumer_protection: "Consumer protection",
  financial: "Financial",
  incentives: "Incentives",
};
