import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover", desc: "We dive deep into your goals, users, and technical requirements." },
  { icon: PenTool, title: "Design", desc: "We craft intuitive experiences and validate them with real users." },
  { icon: Code2, title: "Build", desc: "Our engineers build scalable, production-ready software." },
  { icon: Rocket, title: "Launch & Scale", desc: "We deploy, monitor, and help you scale with confidence." },
];

export default function ProcessTimeline() {
  return (
    <section className="py-24 sm:py-32 bg-base-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title="A proven process, refined over 150+ projects"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.1}>
              <div className="relative text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-white shadow-glow border border-surface-border flex items-center justify-center relative z-10">
                  <step.icon className="h-7 w-7 text-brand-indigo" />
                </div>
                <h3 className="mt-6 font-semibold text-ink">{`${i + 1}. ${step.title}`}</h3>
                <p className="mt-2 text-sm text-ink/60">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
