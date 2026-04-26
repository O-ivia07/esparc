# E-SPARC Pilot Demo

**Energy System Procurement Assessment for Real Credit** — a demonstration prototype of the AI-assisted due diligence platform being developed under the UnLoCED program (Unleashing Local Capital for Energy Dominance) at the National Laboratory of the Rockies.

E-SPARC gives community bank, regional bank, CDFI, and credit-union loan officers a structured, explainable due diligence output on any commercial energy project loan application: P10/P50/P90 performance bands, scenario-based cash flow and DSCR, contractor quality scoring, consumer protection checks, and a production-grade closing checklist — all with transparent sources, methodology, and audit trail.

> This is a **demonstration prototype** developed to illustrate the proposed E-SPARC platform described in the UnLoCED program proposal. Models, data, and outputs are illustrative only. Production deployment will be built by NLR with full modeling rigor, regulatory review, and Advisory Board oversight.

## Hero-path scope

This build implements the hero path: landing → lender pipeline → Coastline Auto Collision deal (fully worked through) → closing checklist → Ask E-SPARC (canned answers). Consumer and Contractor portals are preview pages with the key framing; a follow-on build can expand them to full workflows.

## Quick start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). No auth, no database, no external API calls.

## The hero deal

**Coastline Auto Collision LLC**, Fresno CA — a 12-year Valley Heritage Credit Union member requesting $412,000 for a 185 kW solar PV + 215 kWh battery system. Every tab on that deal is fully populated: performance analysis with P10/P50/P90 production bands and 25-year degradation curve, three-scenario cash-flow projection with DSCR timeseries and tornado sensitivity, contractor quality scorecard, consumer protection scorecard, compliance/incentive stack with ITC adders and SGIP status, a 24-item closing checklist with real citations, and a print-ready lender committee memo.

The pipeline also contains five "sibling" deals at different stages (documents received, in review, data gaps flagged, closing checklist, intake-above-scope) to give the dashboard realism.

## Ask E-SPARC

The AI assistant runs in **demo mode** by default with deterministic canned answers for 15 common follow-up questions (e.g. "What is the biggest risk on this deal?", "Summarize this deal for my loan committee", "What happens if SGIP is denied?"). Answers include source citations.

Guardrails are built in: E-SPARC **refuses** to evaluate consumer credit or contractor credit. Try "What is the probability this borrower repays?" — you get an explicit refusal, not an answer.

Live mode (proxy to Anthropic API) is scaffolded as a future enhancement; the route handler and toggle are not wired in this hero-path build.

## Audit trail

Every model run, AI query, and meaningful user action is logged to a persistent audit trail (zustand + localStorage). The bell icon in the top bar opens the drawer. Events are CSV-exportable.

## Tech stack

- Next.js 14 (App Router) · TypeScript strict
- Tailwind CSS
- Recharts · Framer Motion · Zustand · Lucide React
- No database, no auth, no external services

## Design system

- Primary deep institutional blue `#0B3B8C`, accent warm amber `#F4A736`
- Inter (UI) · Instrument Sans (display) · JetBrains Mono (data)
- 16 px card radius, soft card shadow, 1 px hairline borders
- All analytical outputs show **uncertainty bands** (no point estimates)
- All analytical outputs show **sources, model version, and calculation date** (no black boxes)

## What E-SPARC is not

E-SPARC is a decision-support tool for technical, procurement, and consumer-protection due diligence. These distinctions are enforced in the product, not just on a marketing page:

- **Not a credit decision engine.** The AI refuses credit-prediction questions.
- **Not a replacement for underwriting judgment.** The lender-ready report has an explicit loan-officer signature block and a recommendation field that is never auto-filled.
- **Not a replacement for human review.** Every flag links to a recommendation for a human to act on.

## Attribution

Developed for the **UnLoCED pilot** under the National Laboratory of the Rockies and the U.S. Department of Energy. Demonstration prototype for pilot design discussion and stakeholder demos — not a production system.

## License

MIT.
