import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import FadeIn from "@/components/shared/FadeIn";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Professional Techs' full range of software development services.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything you need to build and scale"
          description="Full-cycle software development services — from strategy and design to engineering and cloud infrastructure."
        />
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {services.map((service, i) => {
            const Icon = (Icons as any)[service.icon] || Icons.Code2;
            return (
              <FadeIn key={service.slug} delay={i * 0.06}>
                <GlowCard>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div>
                      <div className="h-14 w-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-ink">{service.title}</h3>
                      <p className="mt-3 text-sm text-ink/60">{service.fullDescription}</p>
                      <Link href={`/services/${service.slug}`}>
                        <Button variant="ghost" className="!px-0 mt-4" showArrow>
                          Learn more
                        </Button>
                      </Link>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-brand-indigo shrink-0 mt-0.5" />
                          <span className="text-sm text-ink/70">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </div>
  );
}
