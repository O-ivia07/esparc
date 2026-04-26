import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  HardHat,
  Home,
  ShieldOff,
  Scale,
  UserCheck,
  ShieldCheck,
  LineChart,
  Sparkles,
} from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { Badge } from "@/components/ui/Badge";

const ROLES = [
  {
    key: "lender",
    href: "/lender",
    icon: Briefcase,
    title: "SMFI Lender",
    description:
      "Underwrite energy loans with structured performance, cash flow, and contractor-quality analysis — without leaving your committee workflow.",
    cta: "Open lender portal",
    tone: "primary",
  },
  {
    key: "consumer",
    href: "/consumer",
    icon: Home,
    title: "Consumer",
    description:
      "See what your lender and contractor have shared, respond to open requests, and check the consumer-protection summary in plain language.",
    cta: "Open consumer portal",
    tone: "neutral",
  },
  {
    key: "contractor",
    href: "/contractor",
    icon: HardHat,
    title: "Contractor",
    description:
      "Submit project documentation, track what the lender still needs, and see your business profile as E-SPARC sees it.",
    cta: "Open contractor portal",
    tone: "neutral",
  },
] as const;

const GUARDRAILS = [
  { icon: ShieldOff, label: "Not a credit decision engine" },
  { icon: Scale, label: "Not a replacement for underwriting judgment" },
  { icon: UserCheck, label: "Not a replacement for human review" },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="dot-bg absolute inset-x-0 top-0 h-[520px] opacity-[0.55]" />
      <div className="relative mx-auto w-full max-w-content px-6 pb-24 pt-16">
        <div className="flex flex-col items-start gap-4">
          <Badge tone="accent" className="gap-1.5">
            <Sparkles className="h-3 w-3" />
            UnLoCED pilot · National Laboratory of the Rockies
          </Badge>
          <h1 className="font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">
            Due diligence clarity for
            <br />
            <span className="bg-gradient-to-r from-brand to-brand-400 bg-clip-text text-transparent">
              community lenders.
            </span>
          </h1>
          <p className="max-w-3xl text-lg text-ink-muted">
            E-SPARC — the Energy System Procurement Assessment for Real Credit — is an
            open-source, AI-assisted due diligence platform for SMFI loan officers
            underwriting commercial energy projects. It tells you what the project can
            produce, what could go wrong, and what&rsquo;s still missing from the file.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link
              href="/lender"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
            >
              Start with the lender portal
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/metrics"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink hairline hover:bg-slate-50"
            >
              <LineChart className="h-4 w-4" />
              View pilot metrics
            </Link>
          </div>
        </div>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          {ROLES.map((role, idx) => {
            const Icon = role.icon;
            const isPrimary = role.tone === "primary";
            return (
              <Link
                key={role.key}
                href={role.href}
                className={`group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-0.5 ${
                  isPrimary
                    ? "bg-gradient-to-br from-brand to-brand-600 text-white shadow-card hover:shadow-hover"
                    : "bg-white text-ink shadow-card hairline hover:shadow-hover"
                }`}
                style={{ animation: `fade-rise 200ms ease-out ${idx * 40}ms both` }}
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                    isPrimary ? "bg-white/15 text-white" : "bg-brand-50 text-brand"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3
                  className={`mt-5 font-display text-xl font-semibold ${isPrimary ? "text-white" : "text-ink"}`}
                >
                  {role.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${isPrimary ? "text-white/80" : "text-ink-muted"}`}
                >
                  {role.description}
                </p>
                <span
                  className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium ${isPrimary ? "text-white" : "text-brand"}`}
                >
                  {role.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </section>

        <section className="mt-14 rounded-2xl bg-white p-6 shadow-card hairline">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand" />
            <h2 className="font-display text-lg font-semibold">
              What E-SPARC is <em className="text-ink-muted">not</em>
            </h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-ink-muted">
            E-SPARC is a decision-support tool for technical, procurement, and consumer-
            protection due diligence. Credit decisions stay with your institution. This
            distinction is not cosmetic — it shapes what E-SPARC will and will not tell you.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {GUARDRAILS.map((g) => {
              const Icon = g.icon;
              return (
                <li
                  key={g.label}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-100"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {g.label}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-14 grid gap-4 rounded-2xl bg-ink p-8 text-white/90 md:grid-cols-3">
          <Stat label="SMFI assets held" value="$8.7T" caption="community banks, regional banks & credit unions" />
          <Stat label="CDFIs reporting energy-efficiency lending" value="<11%" caption="2019–2020, Aeris data" />
          <Stat label="Pilot cohort" value="3 states" caption="California, Colorado, Michigan" />
        </section>

        <footer className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Wordmark size="sm" />
            <span>Pilot Demo v0.1 · build 2026.04</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/metrics" className="hover:text-ink">
              Pilot metrics
            </Link>
            <Link href="/about" className="hover:text-ink">
              About E-SPARC
            </Link>
            <span>UnLoCED program · National Laboratory of the Rockies · DOE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-white/60">{label}</div>
      <div className="mt-1 font-display text-4xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-white/70">{caption}</div>
    </div>
  );
}
