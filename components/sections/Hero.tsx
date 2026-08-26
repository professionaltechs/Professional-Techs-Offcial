"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Sparkles } from "lucide-react";
import HeroVisual from "@/components/hero/HeroVisual";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#eef0fb] pt-28 pb-20">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-brand-indigo/20 blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-brand-cyan/20 blur-3xl animate-blob-delay" />
      <div className="absolute inset-0 bg-dot-grid" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 inline" />
                Trusted by teams in 12+ countries
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.05]"
            >
              We engineer{" "}
              <span className="text-gradient">world-class</span>{" "}
              software for ambitious companies
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-ink/60 max-w-xl"
            >
              Professional Techs is a global software house delivering web, mobile, cloud and
              AI-powered products — built with precision, shipped at speed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="/contact" showArrow>
                Start a Project
              </Button>
              <Button href="/portfolio" variant="secondary">
                View Our Work
              </Button>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="hidden lg:block"
          >
            <HeroVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
}