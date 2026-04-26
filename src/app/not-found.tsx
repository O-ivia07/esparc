import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-start gap-3 px-6 py-16">
      <div className="font-display text-6xl font-bold text-brand">404</div>
      <h1 className="font-display text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-ink-muted">
        That deal or page isn&rsquo;t in the demo seed data. This is the hero-path preview —
        five pipeline deals plus the Coastline hero deal.
      </p>
      <Link
        href="/lender"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to the lender pipeline
      </Link>
    </div>
  );
}
