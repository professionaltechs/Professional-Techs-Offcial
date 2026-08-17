import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/shared/FadeIn";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return { title: service.title, description: service.shortDescription };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const Icon = (Icons as any)[service.icon] || Icons.Code2;

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="h-16 w-16 rounded-2xl bg-brand-gradient flex items-center justify-center mb-6">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <SectionHeading title={service.title} description={service.fullDescription} align="left" />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-brand-indigo shrink-0 mt-0.5" />
                <span className="text-sm text-ink/70">{f}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button href="/contact" showArrow>Discuss Your Project</Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
