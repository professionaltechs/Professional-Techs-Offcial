"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What our clients say" />

        <div className="mt-14 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <GlowCard className="text-center py-12">
                <Quote className="h-8 w-8 text-brand-indigo mx-auto mb-6" />
                <p className="text-lg sm:text-xl text-ink leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-ink/50">{t.role}, {t.company}</p>
                </div>
              </GlowCard>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-surface-border flex items-center justify-center hover:border-brand-indigo transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-surface-border flex items-center justify-center hover:border-brand-indigo transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
