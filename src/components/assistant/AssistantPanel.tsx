"use client";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, X, ShieldAlert, Info } from "lucide-react";
import { useEsparcStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CANNED_ANSWERS,
  FALLBACK_ANSWER,
  SUGGESTED_QUESTIONS,
  DISCLAIMER,
  matchAnswer,
} from "@/lib/data/cannedAnswers";
import { HERO_DEAL_ID } from "@/lib/data/deals";
import { cn } from "@/lib/cn";

interface Message {
  id: string;
  role: "user" | "assistant" | "disclaimer";
  content: string;
  sources?: string;
}

export function AssistantPanel() {
  const { assistantOpen, setAssistantOpen, logEvent } = useEsparcStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "I'm E-SPARC. I can explain the analytics on this deal, help you stress-test scenarios, and draft committee memo language. Ask me anything about Coastline Auto Collision — or pick a suggested question below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const refuseCredit = (q: string) => {
    const ql = q.toLowerCase();
    return (
      /probability.*repay|will.*repay|credit.*score|borrower.*default|contractor.*credit|credit.*decision/.test(
        ql,
      ) ||
      /repay(s|ment)?\s*(the|this|their)?\s*loan/.test(ql)
    );
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const userId = `u-${Date.now()}`;
    setMessages((m) => [...m, { id: userId, role: "user", content: clean }]);
    setInput("");
    setThinking(true);
    logEvent({
      actor: "lender",
      action: "ai_query",
      dealId: HERO_DEAL_ID,
      detail: `Asked: "${clean}"`,
    });

    setTimeout(() => {
      const id = `a-${Date.now()}`;
      if (refuseCredit(clean)) {
        setMessages((m) => [
          ...m,
          {
            id,
            role: "disclaimer",
            content:
              "I can't evaluate consumer credit or contractor credit. That is explicitly out of scope for E-SPARC. Your institution's underwriting remains the credit decision-maker; E-SPARC gives you the technical and procurement due diligence that sits alongside it.",
          },
        ]);
      } else {
        const hit = matchAnswer(clean);
        setMessages((m) => [
          ...m,
          {
            id,
            role: "assistant",
            content: hit?.answer ?? FALLBACK_ANSWER,
            sources: hit?.sources,
          },
        ]);
        logEvent({
          actor: "esparc_engine",
          action: "ai_response",
          dealId: HERO_DEAL_ID,
          detail: hit ? `Answered: ${hit.question}` : "Fallback: no canned match",
          modelVersion: "canned-v1",
        });
      }
      setThinking(false);
    }, 900);
  };

  if (!assistantOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        className="flex-1 bg-ink/20 backdrop-blur-sm"
        aria-label="Close assistant"
        onClick={() => setAssistantOpen(false)}
      />
      <aside className="flex h-full w-full max-w-lg flex-col bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-hairline px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-400 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="font-display text-base font-semibold leading-tight">
                Ask E-SPARC
              </div>
              <div className="text-xs text-ink-soft">Demo mode · canned answers</div>
            </div>
          </div>
          <button
            onClick={() => setAssistantOpen(false)}
            className="rounded-full p-2 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="border-b border-hairline bg-brand-50/60 px-5 py-2.5 text-xs text-brand-700">
          <div className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5" />
            <span>{DISCLAIMER}</span>
          </div>
        </div>
        <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {thinking ? (
            <div className="flex items-center gap-1.5 pl-1">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          ) : null}
        </div>
        <div className="border-t border-hairline px-5 py-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-ink-muted hover:bg-slate-200"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up about this deal…"
              className="h-10 flex-1 rounded-full border border-hairline bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand-400/60"
            />
            <Button type="submit" size="sm" disabled={thinking}>
              <Send className="h-3.5 w-3.5" />
              Send
            </Button>
          </form>
          <p className="mt-2 flex items-center gap-1 text-[11px] text-ink-soft">
            <ShieldAlert className="h-3 w-3" />
            Covers {CANNED_ANSWERS.length} scripted topics. Credit questions are refused by design.
          </p>
        </div>
      </aside>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-brand px-3.5 py-2 text-sm text-white">
          {message.content}
        </div>
      </div>
    );
  }
  if (message.role === "disclaimer") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800">
        <div className="mb-1 flex items-center gap-1.5 font-medium">
          <ShieldAlert className="h-3.5 w-3.5" />
          Guardrail
        </div>
        {message.content}
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-sm bg-slate-50 px-3.5 py-2.5 text-sm text-ink">
        <FormattedAnswer text={message.content} />
        {message.sources ? (
          <div className="text-[11px] text-ink-soft">
            <span className="font-medium">Sources:</span> {message.sources}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FormattedAnswer({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <div className="space-y-2">
      {paragraphs.map((p, i) => {
        if (p.startsWith("- ") || /^\d\.\s/.test(p)) {
          const items = p.split("\n");
          return (
            <ul key={i} className="ml-4 list-disc space-y-0.5">
              {items.map((it, j) => (
                <li key={j}>
                  <InlineBold>{it.replace(/^[-\d.]+\s/, "")}</InlineBold>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className={cn(i === 0 ? "" : "mt-1")}>
            <InlineBold>{p}</InlineBold>
          </p>
        );
      })}
    </div>
  );
}

function InlineBold({ children }: { children: string }) {
  const parts = children.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold">
              {p.slice(2, -2)}
            </strong>
          );
        }
        if (p.startsWith("*") && p.endsWith("*")) {
          return <em key={i}>{p.slice(1, -1)}</em>;
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}
