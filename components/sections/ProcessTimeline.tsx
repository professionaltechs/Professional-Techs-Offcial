"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Search,
    step: "Step 01",
    title: "Discover",
    desc: "We dive deep into your goals, users, and technical requirements.",
  },
  {
    icon: PenTool,
    step: "Step 02",
    title: "Design",
    desc: "We craft intuitive experiences and validate them with real users.",
  },
  {
    icon: Code2,
    step: "Step 03",
    title: "Build",
    desc: "Our engineers build scalable, production-ready software.",
  },
  {
    icon: Rocket,
    step: "Step 04",
    title: "Launch & Scale",
    desc: "We deploy, monitor, and help you scale with confidence.",
  },
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });

  return (
    <section className="relative py-24 sm:py-32 bg-base-alt overflow-hidden">
      {/* soft ambient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title="A proven process, refined over 150+ projects"
        />

        <div ref={containerRef} className="mt-20 relative">
          {/* ===== Desktop track ===== */}
          <div className="hidden md:block absolute top-9 left-[11%] right-[11%] h-[3px] rounded-full bg-surface-border/70" />

          <motion.div
            className="hidden md:block absolute top-9 left-[11%] h-[3px] rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 origin-left"
            style={{ right: "11%" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* traveling glow dot along the line */}
          <motion.div
            className="hidden md:block absolute top-9 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_4px_rgba(124,58,237,0.55)]"
            style={{ left: "11%" }}
            initial={{ left: "11%", opacity: 0 }}
            animate={
              isInView
                ? { left: ["11%", "89%"], opacity: [0, 1, 1, 0] }
                : { opacity: 0 }
            }
            transition={{ duration: 1.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.15, ease: "easeOut" }}
                className="group relative"
              >
                {/* mobile vertical connector */}
                {i !== steps.length - 1 && (
                  <span className="md:hidden absolute left-[27px] top-[60px] h-[calc(100%-8px)] w-[2px] bg-surface-border/70" />
                )}

                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
                  {/* icon */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="relative shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-4 ring-white transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-indigo-600/45"
                  >
                    <step.icon className="h-6 w-6 text-white" strokeWidth={2} />
                    <span className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-white border-2 border-violet-600 text-violet-600 text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </motion.div>

                  {/* text */}
                  <div className="pt-0.5 md:pt-6">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-violet-600/60">
                      {step.step}
                    </span>
                    <h3 className="mt-1 font-semibold text-lg text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60 max-w-[220px] md:mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}