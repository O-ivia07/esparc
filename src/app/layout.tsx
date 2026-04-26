import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { AuditTrailDrawer } from "@/components/layout/AuditTrailDrawer";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { AuditSeed } from "@/components/layout/AuditSeed";

export const metadata: Metadata = {
  title: "E-SPARC Pilot Demo · UnLoCED · National Laboratory of the Rockies",
  description:
    "Energy System Procurement Assessment for Real Credit — AI-assisted due diligence for community lenders underwriting energy projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-muted">
        <TopBar />
        <main>{children}</main>
        <AuditTrailDrawer />
        <AssistantPanel />
        <AuditSeed />
      </body>
    </html>
  );
}
