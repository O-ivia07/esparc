export interface CannedAnswer {
  question: string;
  patterns: string[];
  answer: string;
  sources: string;
}

const HERO_SOURCES =
  "Performance analysis v1.2, Cashflow v1.0, Closing Checklist (updated 2026-04-19).";

export const CANNED_ANSWERS: CannedAnswer[] = [
  {
    question: "What is the biggest risk on this deal?",
    patterns: ["biggest risk", "top risk", "main risk"],
    answer:
      "The most material open risk is **prevailing wage documentation for the 10% ITC bonus adder**. The central NPV model assumes prevailing wage is met, which contributes roughly $78,000 to NPV. Without DIR registration and a certified payroll plan filed before placed-in-service, the ITC basis drops from 50% to 40% and the deal still pencils — the Conservative scenario still shows $388k NPV and 1.14 DSCR — but your central case weakens.\n\nSecond-order: SGIP award (flagged yellow at ~60% probability) and Year-1 wildfire smoke derate (flagged yellow). Both are modeled in the Stress scenario which still clears 1.04 DSCR.",
    sources: HERO_SOURCES,
  },
  {
    question: "Explain the DSCR in plain English.",
    patterns: ["dscr", "debt service coverage", "coverage ratio"],
    answer:
      "DSCR is the ratio of **net project cash flow to debt service**. A DSCR of 1.32 means the project generates $1.32 of savings for every $1.00 of loan payment.\n\nFor this deal:\n- **Year 1 central**: 1.32 (comfortable)\n- **Year 1 range (P10 to P90)**: 1.18 to 1.46\n- **Worst modeled year**: 1.04 in Year 20 under the Stress scenario (SGIP denied, 1.5% escalator, 85% of P10 production)\n\nYour institution's policy floor is 1.20. Central and P50 exceed it; P10 in the Conservative scenario (1.14) dips below. That is why the Conservative scenario is flagged for loan committee discussion rather than accepted as baseline.",
    sources: HERO_SOURCES,
  },
  {
    question: "Why is the SGIP flagged yellow?",
    patterns: ["sgip", "self-generation", "self generation"],
    answer:
      "SGIP is flagged yellow because the **General Market application is filed but not yet awarded**. The $64,500 budgeted SGIP refund is probability-weighted at 60% based on the 2025 SGIP trajectory reported by CPUC.\n\nDenial does not kill the deal — the Conservative scenario removes SGIP entirely and still produces $388k NPV and 1.14 Year-1 DSCR — but it drops the central case by ~$50k NPV. We recommend a conditional commitment that can be adjusted if the award comes in below request.",
    sources: HERO_SOURCES,
  },
  {
    question: "Can this project still pencil if the utility escalator is flat?",
    patterns: ["flat escalator", "utility escalator", "rate stagnation"],
    answer:
      "Yes, with reduced margin. In the Stress scenario we model a 1.5% escalator (effectively flat after inflation) combined with 85% of P10 production and no SGIP. That scenario still produces:\n\n- **NPV**: $184,600\n- **Year 1 DSCR**: 1.04\n- **Worst-year DSCR**: 1.04 in Year 20\n\nDSCR floor of 1.04 is tight but not negative. The bigger concern under flat escalation is Years 18 to 25 where degradation stacks with zero real rate growth. Payback extends from 7.2 to about 11.4 years in this scenario.",
    sources: HERO_SOURCES,
  },
  {
    question: "What documentation is still missing from the contractor?",
    patterns: ["missing", "outstanding", "pending contractor", "contractor missing"],
    answer:
      "Outstanding items from SunWest Commercial Solar:\n\n1. **PE-stamped structural roof load letter** (blocks city building permit)\n2. **DIR registration and certified payroll plan** (blocks full ITC basis)\n3. **Qcells manufacturer domestic content certification letter** (blocks domestic content adder)\n4. **Final engineering drawings** (expected 2026-04-29)\n5. **Battery dispatch simulation** against borrower's 12-month interval data\n6. **Performance bond rider** naming lender as additional obligee\n7. **Signed performance guarantee schedule** (85% of P50)\n8. **Module warranty assignments**\n\nThe first three are the critical path.",
    sources: HERO_SOURCES,
  },
  {
    question: "Compare this deal to similar deals in our pipeline.",
    patterns: ["compare", "similar deals", "comparable"],
    answer:
      "Two pipeline comparables:\n\n**Mesa Verde Veterinary (Montrose CO, $156k, solar only)** — further along (closing checklist), smaller size, PVWatts-only modeling acceptable at that size, no battery and no SGIP. Cleaner deal profile.\n\n**Iron Range Machining (Hancock MI, $287k, solar + battery)** — closer in technology mix but currently data-gaps-flagged. Contractor experience thinner (6 years, 54 projects vs. SunWest's 16 years and 340). Michigan solar specific yield ~22% lower than California, which tightens cash flow margin.\n\nCoastline is the **strongest candidate in-pipeline to close on original terms** given contractor track record, deposit relationship, and incentive stack.",
    sources: HERO_SOURCES,
  },
  {
    question: "What would change if the borrower uses prevailing wage?",
    patterns: ["prevailing wage", "dir", "davis-bacon"],
    answer:
      "Prevailing wage is the gateway to the full 50% ITC basis (30% base × 5 multiplier for prevailing wage + 10% energy community + 10% domestic content, capped at 50%).\n\n**With prevailing wage documented (central case)**: ITC contribution ~$206,000, NPV central $612,400.\n\n**Without prevailing wage (Conservative/Stress cases)**: ITC contribution drops to ~$165,000, NPV central falls to roughly $535,000.\n\nRequirements: contractor registers with DIR, pays CA prevailing wage rates for each craft on site, maintains certified payroll, and meets the apprenticeship ratio (currently 12.5% of total labor hours for 2026 placed-in-service). This is a condition precedent in our recommended structure.",
    sources: HERO_SOURCES,
  },
  {
    question: "Summarize this deal for my loan committee in three sentences.",
    patterns: ["summarize", "committee", "three sentences", "loan committee"],
    answer:
      "Coastline Auto Collision LLC, a 12-year member in good standing, requests $412,000 for a 185 kW solar PV plus 215 kWh battery system on its owned Fresno facility, sized to offset 84% of load. E-SPARC analysis shows a central NPV of $612,400, Year-1 DSCR of 1.32 (1.18–1.46 range), and a Stress-case DSCR floor of 1.04; contractor SunWest Commercial Solar is CSLB-active with 16 years of commercial track record. Remaining conditions precedent include prevailing wage documentation for full ITC basis, Qcells domestic content certification, and the pending SGIP award — none of which break the deal if denied.",
    sources: HERO_SOURCES,
  },
  {
    question: "Is the contractor's bond amount adequate for this project size?",
    patterns: ["bond", "bond amount", "bonding"],
    answer:
      "SunWest's $25,000 CSLB contractor's bond meets California's statutory minimum but is **materially below the $412,000 project value**. That is expected — contractor bonds are not project-sized by default.\n\nFor adequacy on this project, we recommend requiring a **project-specific performance bond at 100% of contract value** naming Valley Heritage CU as additional obligee. Surety underwriting has been engaged (checklist cq-002, in progress).",
    sources: HERO_SOURCES,
  },
  {
    question: "How does Fresno smoke affect Year 1 production?",
    patterns: ["smoke", "wildfire", "fresno"],
    answer:
      "Central Valley wildfire smoke reduced PV production by 2–4% in affected months during the 2023 and 2024 seasons (NREL 2024 study). The effect is seasonal (July–October) and depends on smoke density.\n\nOur central-case Year 1 forecast (310,300 kWh P50) does **not** apply a smoke derate. We recommend a 2% conservative Year-1 derate, which moves central Year-1 savings from $64,950 to roughly $63,650 and Year-1 DSCR from 1.32 to 1.29 — still well above policy floor. This does not affect lifecycle NPV materially because smoke is episodic, not structural.",
    sources: HERO_SOURCES,
  },
  {
    question: "What happens if SGIP is denied?",
    patterns: ["sgip denied", "sgip denial", "without sgip"],
    answer:
      "The Conservative scenario models this exactly. SGIP denial produces:\n\n- **Year 1 savings**: $55,800 (vs. $64,950 central)\n- **Year 1 DSCR**: 1.14 (below your 1.20 policy floor)\n- **NPV**: $388,200 (vs. $612,400 central)\n\nBecause Year-1 DSCR drops below policy floor under SGIP denial, we recommend structuring the loan with a **reserve account** or **interest-only period** in Year 1 that steps up once the project produces, or conditionally approving the loan subject to SGIP award.",
    sources: HERO_SOURCES,
  },
  {
    question: "What are the consumer protection gaps?",
    patterns: ["consumer protection", "protection gaps"],
    answer:
      "One yellow item: the **performance guarantee schedule** (85% of modeled P50) is in the contract but not yet signed by both parties. All other checks (TILA disclosures, right-to-cancel, warranties, financing separation, contract language) are green.\n\nThe gap is procedural rather than substantive — SunWest's standard contract includes the guarantee; it is a sign-and-file item before funding.",
    sources: HERO_SOURCES,
  },
  {
    question: "Draft the recommendation language for my committee memo.",
    patterns: ["draft", "recommendation language", "committee memo", "recommendation"],
    answer:
      "**Draft recommendation** (lender editable; E-SPARC provides the analytic basis only):\n\n*We recommend conditional approval of the $412,000 Coastline Auto Collision loan for a 185 kW solar plus 215 kWh battery system, subject to: (1) DIR registration and certified payroll plan confirming prevailing wage eligibility, (2) receipt of Qcells domestic content certification, (3) PE-stamped structural letter, and (4) pro-rata reduction or reserve adjustment if SGIP is awarded below $45,000. E-SPARC central-case analysis shows Year-1 DSCR of 1.32 with a Stress-case floor of 1.04, NPV $612,400, and IRR 14.8%. Contractor is CSLB-active with 16 years of commercial track record.*\n\nE-SPARC provides analysis. Credit decisions are made by your institution.",
    sources: HERO_SOURCES,
  },
  {
    question:
      "How does this compare to the average solar plus battery project in your dataset?",
    patterns: ["average", "dataset", "typical"],
    answer:
      "Across the pilot cohort of 24 solar-plus-battery deals (3 participating lenders, CA):\n\n- **Loan size median**: $287,000 (Coastline is $412,000, above median).\n- **Year 1 DSCR median**: 1.26 (Coastline central 1.32, above).\n- **Contractor experience median**: 11 years (SunWest 16, above).\n- **SGIP status at close**: 40% awarded, 35% application-filed, 25% not pursued (Coastline is in the application-filed bucket).\n\nCoastline ranks in the top quartile on DSCR and contractor track record within the pilot.",
    sources: HERO_SOURCES + " Pilot cohort dataset v0.3 (2026-04).",
  },
  {
    question: "What is the closing checklist blocking item right now?",
    patterns: ["blocking", "blocker", "blocked"],
    answer:
      "Two items are **blocked**:\n\n1. **ITC basis memo (iv-001)** — blocked on prevailing wage DIR registration and Qcells domestic content certification.\n2. **SGIP award or denial letter (iv-002)** — blocked on CPUC queue position.\n\nOne item is waiting on a dependency:\n\n- **City of Fresno building permit (cp-001)** — pending PE-stamped structural letter (cs-004).\n\nThe critical path is the PE letter. Once filed, the permit can be issued, which unblocks installation scheduling.",
    sources: HERO_SOURCES,
  },
];

export function matchAnswer(question: string): CannedAnswer | undefined {
  const q = question.toLowerCase();
  let best: { answer: CannedAnswer; hits: number } | undefined;
  for (const a of CANNED_ANSWERS) {
    let hits = 0;
    for (const p of a.patterns) {
      if (q.includes(p.toLowerCase())) hits++;
    }
    if (hits > 0 && (!best || hits > best.hits)) {
      best = { answer: a, hits };
    }
  }
  return best?.answer;
}

export const FALLBACK_ANSWER =
  "I don't have a scripted answer for that question in demo mode. Typical topics I can answer: the biggest risks on the deal, DSCR interpretation, scenario analysis, contractor qualifications, consumer protection, incentive status, and what's blocking the closing checklist. Try a suggested question below, or enable live AI mode in settings to ask freely.";

export const SUGGESTED_QUESTIONS = [
  "What is the biggest risk on this deal?",
  "Explain the DSCR in plain English.",
  "Summarize this deal for my loan committee in three sentences.",
  "What documentation is still missing from the contractor?",
  "What happens if SGIP is denied?",
  "Draft the recommendation language for my committee memo.",
];

export const DISCLAIMER =
  "E-SPARC provides analysis. Credit decisions are made by your institution.";
