import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { Check, Clock, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import QuoteForm from "@/components/sections/QuoteForm";
import { services } from "@/data/services";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: `Tell ${SITE_NAME} about your project and get a custom quote tailored to your requirements.`,
};

const whyUs = [
  {
    icon: Sparkles,
    title: "Full-cycle expertise",
    description: "Strategy, design, engineering and cloud — one team, start to finish.",
  },
  {
    icon: Clock,
    title: "Fast turnaround",
    description: "We reply to every quote request within 24-48 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Proven track record",
    description: "150+ projects delivered for clients across 12+ countries.",
  },
];

export default function QuotePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get a Quote"
          title="Tell us about your project"
          description={`${SITE_DESCRIPTION} Share your requirements below and we'll come back to you with a tailored quote.`}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Website / company details */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="font-semibold text-ink mb-4">Why work with {SITE_NAME}</h3>
              <div className="space-y-5">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-ink">{item.title}</p>
                      <p className="text-sm text-ink/60 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-ink mb-4">Services we offer</h3>
              <ul className="space-y-3">
                {services.map((service) => {
                  const Icon = (Icons as any)[service.icon] || Icons.Code2;
                  return (
                    <li key={service.slug} className="flex items-center gap-3 text-sm text-ink/70">
                      <Icon className="h-4 w-4 text-brand-indigo shrink-0" />
                      {service.title}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-ink mb-4">How it works</h3>
              <ul className="space-y-3">
                {[
                  "Share your project requirements using the form",
                  "Our team reviews and reaches out within 24-48 hours",
                  "We scope, estimate, and send you a custom quote",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-ink/70">
                    <Check className="h-4 w-4 text-brand-indigo shrink-0 mt-0.5" />
                    <span>
                      <span className="font-medium text-ink">{i + 1}. </span>
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Requirements form */}
          <div className="lg:col-span-2">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
