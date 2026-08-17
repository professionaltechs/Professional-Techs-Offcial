import { COMPANY_STATS } from "@/lib/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Stats() {
  return (
    <section className="relative py-24 sm:py-32 bg-navy overflow-hidden">
      <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-brand-indigo/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-brand-cyan/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Numbers that speak for themselves"
          dark
        />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {COMPANY_STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              dark
            />
          ))}
        </div>
      </div>
    </section>
  );
}
