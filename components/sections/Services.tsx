import * as Icons from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import FadeIn from "@/components/shared/FadeIn";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Full-cycle software services"
          description="From idea to global scale — we cover every layer of modern product development."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = (Icons as any)[service.icon] || Icons.Code2;
            return (
              <FadeIn key={service.slug} delay={i * 0.08}>
                <Link href={`/services/${service.slug}`}>
                  <GlowCard className="h-full group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-brand-gradient flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-ink/30 group-hover:text-brand-indigo group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-ink">{service.title}</h3>
                    <p className="mt-3 text-sm text-ink/60 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </GlowCard>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
