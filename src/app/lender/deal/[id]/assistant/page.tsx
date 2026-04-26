"use client";
import { Sparkles, ShieldAlert } from "lucide-react";
import { useEsparcStore } from "@/lib/store";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SUGGESTED_QUESTIONS, DISCLAIMER } from "@/lib/data/cannedAnswers";

export default function AssistantPage() {
  const { setAssistantOpen } = useEsparcStore();

  return (
    <div className="mt-4 space-y-5">
      <Card>
        <CardHeader
          title="Ask E-SPARC"
          subtitle="Plain-language Q&A about this deal. Demo mode uses scripted answers; live mode (optional, toggled in settings) proxies to the Anthropic API."
          right={
            <Button onClick={() => setAssistantOpen(true)}>
              <Sparkles className="h-3.5 w-3.5" />
              Open chat
            </Button>
          }
        />
        <CardBody>
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Suggested questions
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => setAssistantOpen(true)}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-slate-200 hover:text-ink"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-muted">
                Every response ends with a source line (e.g. &quot;Sources: Performance
                analysis v1.2, Cashflow v1.0, Closing Checklist updated 2026-04-19&quot;).
                Sources trace back to the input documents and engines that produced the
                number.
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-hairline bg-amber-50/40 p-4 text-sm">
              <div className="flex items-center gap-2 text-amber-800">
                <ShieldAlert className="h-4 w-4" />
                <span className="font-semibold">Guardrails</span>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-amber-900/80">
                <li>Refuses to predict whether a borrower will repay.</li>
                <li>Refuses to evaluate contractor credit risk.</li>
                <li>Never replaces underwriting judgment.</li>
                <li>All analytical outputs show uncertainty bands.</li>
                <li>All claims link back to sources and model version.</li>
              </ul>
              <div className="mt-3 rounded-md bg-white px-3 py-2 text-[11px] text-ink-muted">
                {DISCLAIMER}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
