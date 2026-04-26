import { cn } from "@/lib/cn";

export function Wordmark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  const mark = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-5 w-5" : "h-6 w-6";
  return (
    <span className={cn("inline-flex items-center gap-2 font-display font-bold", className)}>
      <svg
        viewBox="0 0 24 24"
        className={cn(mark, "shrink-0")}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="#F4A736" stroke="#F4A736" />
      </svg>
      <span className={cn("tracking-tight text-ink", textSize)}>E-SPARC</span>
    </span>
  );
}
