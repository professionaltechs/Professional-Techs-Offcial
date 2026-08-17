"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { Sparkles } from "lucide-react";

const AboutScene = dynamic(() => import("@/components/three/AboutScene"), {
  ssr: false,
});

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pb-24">
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-brand-indigo/20 blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-brand-cyan/20 blur-3xl animate-blob-delay" />
      <div className="absolute inset-0 bg-dot-grid" />

      <AboutScene />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 inline" />
              Our Story
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink leading-[1.08]"
          >
            Building software for the world&apos;s most{" "}
            <span className="text-gradient">ambitious companies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-ink/60 max-w-xl"
          >
            Professional Techs is a global software development company founded on the belief
            that great engineering and great design should never be separate disciplines.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
