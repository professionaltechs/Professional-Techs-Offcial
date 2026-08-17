import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import FadeIn from "@/components/shared/FadeIn";
import TiltCard from "@/components/shared/TiltCard";
import AboutHero from "@/components/sections/AboutHero";
import { COMPANY_STATS } from "@/lib/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Target, Eye, Heart, Rocket, Globe2, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Professional Techs — our story, mission, and the team behind our work.",
};

const values = [
  { icon: Target, title: "Our Mission", desc: "To engineer software that helps ambitious companies scale globally with confidence." },
  { icon: Eye, title: "Our Vision", desc: "To be the most trusted software partner for businesses expanding into the digital economy." },
  { icon: Heart, title: "Our Values", desc: "Craftsmanship, transparency, and long-term partnership over short-term wins." },
];

const milestones = [
  { year: "2017", icon: Rocket, title: "Founded", desc: "Professional Techs was founded with a small team and a big ambition." },
  { year: "2019", icon: Globe2, title: "Went Global", desc: "Delivered our first international project, opening doors across 3 continents." },
  { year: "2022", icon: Users, title: "Scaled the Team", desc: "Grew into a full-cycle team spanning engineering, design, and cloud." },
  { year: "2025", icon: Award, title: "150+ Projects", desc: "Crossed 150 delivered projects for clients across 12+ countries." },
];

export default function AboutPage() {
  return (
    <div className="pt-32">
      <AboutHero />

      {/* Values */}
      <section className="py-20 bg-base-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.1}>
              <TiltCard>
                <GlowCard className="h-full">
                  <div className="h-12 w-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-6">
                    <v.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{v.title}</h3>
                  <p className="mt-3 text-sm text-ink/60">{v.desc}</p>
                </GlowCard>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Story" title="The journey so far" />

          <div className="mt-16 relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-surface-border to-transparent md:-translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.1}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:block md:w-1/2" />
                    <div className="absolute left-6 md:left-1/2 h-4 w-4 rounded-full bg-brand-gradient -translate-x-1/2 shadow-glow ring-4 ring-base" />
                    <div className="pl-14 md:pl-0 md:w-1/2">
                      <div className={`md:${i % 2 === 0 ? "pl-12" : "pr-12"}`}>
                        <GlowCard>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-9 w-9 rounded-xl bg-brand-gradient-soft flex items-center justify-center">
                              <m.icon className="h-4 w-4 text-brand-indigo" />
                            </div>
                            <span className="text-sm font-semibold text-brand-indigo">{m.year}</span>
                          </div>
                          <h3 className="font-semibold text-ink">{m.title}</h3>
                          <p className="mt-1 text-sm text-ink/60">{m.desc}</p>
                        </GlowCard>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-24 bg-navy overflow-hidden">
        <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-brand-indigo/20 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-brand-cyan/10 blur-3xl animate-blob-delay" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Impact" title="Trusted at scale" dark />
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
            {COMPANY_STATS.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} dark />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
