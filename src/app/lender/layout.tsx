import { LenderSidebar } from "@/components/layout/LenderSidebar";

export default function LenderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-content">
      <LenderSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
