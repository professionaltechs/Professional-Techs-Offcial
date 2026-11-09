import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/blog-utils";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-sm font-semibold text-ink">On this page</p>
      <ul className="space-y-2.5 border-l border-surface-border">
        {headings.map((h, i) => (
          <li key={`${h.id}-${i}`}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l border-transparent text-sm leading-snug text-ink/60 transition-colors hover:border-brand-indigo hover:text-brand-indigo",
                h.level === 3 ? "pl-7" : "pl-4"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
