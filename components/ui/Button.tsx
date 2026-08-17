import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  showArrow?: boolean;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  showArrow = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 group";

  const variants = {
    primary:
      "bg-brand-gradient text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5",
    secondary:
      "bg-white text-ink border border-surface-border hover:border-brand-indigo hover:-translate-y-0.5",
    ghost: "text-ink hover:text-brand-indigo",
  };

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cn(base, variants[variant], className)}>
      {content}
    </button>
  );
}
