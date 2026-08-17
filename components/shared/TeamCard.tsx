"use client";

import { motion } from "framer-motion";

export default function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 250, damping: 18 }} className="text-center group">
      <div className="relative aspect-square rounded-3xl bg-brand-gradient-soft mb-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-90 transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-brand-indigo/40 group-hover:text-white transition-colors duration-300">
            {name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>
      </div>
      <h3 className="font-semibold text-ink">{name}</h3>
      <p className="text-sm text-ink/50">{role}</p>
    </motion.div>
  );
}
