"use client";

import * as Icons from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10">
        <div className="absolute left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Full-cycle software services"
          description="From idea to global scale — we cover every layer of modern product development."
        />

        <div
          ref={containerRef}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const Icon = (Icons as any)[service.icon] || Icons.Code2;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: "easeOut" }}
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <GlowCard className="relative h-full group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-600/10 border border-transparent hover:border-violet-600/20">
                    {/* faint index number watermark */}
                    {/* <span className="pointer-events-none absolute -top-3 right-3 text-6xl font-black text-ink/[0.04] select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span> */}

                    <div className="relative flex items-center justify-between">
                      <motion.div
                        whileHover={{ rotate: -8, scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="h-12 w-12 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md shadow-violet-600/20"
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border text-ink/30 group-hover:text-brand-indigo group-hover:border-brand-indigo/40 transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </span>
                    </div>

                    <h3 className="relative mt-6 text-xl font-semibold text-ink group-hover:text-violet-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="relative mt-3 text-sm text-ink/60 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* animated underline reveal */}
                    <div className="relative mt-5 h-px w-full bg-surface-border overflow-hidden">
                      <div className="h-full w-0 bg-brand-gradient group-hover:w-full transition-all duration-500 ease-out" />
                    </div>
                  </GlowCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}