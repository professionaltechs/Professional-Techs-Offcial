import { cn } from "@/lib/utils";

export default function GlowCard({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1",
        dark
          ? "glass-card-dark hover:shadow-glow-lg"
          : "glass-card shadow-sm hover:shadow-glow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
