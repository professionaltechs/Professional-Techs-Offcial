"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
  dark = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: "easeOut",
        onUpdate(latest) {
          setDisplay(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className={`text-4xl sm:text-5xl font-bold ${dark ? "text-white" : "text-ink"}`}>
        <span className="text-gradient">{display}{suffix}</span>
      </div>
      <p className={`mt-2 text-sm ${dark ? "text-white/60" : "text-ink/60"}`}>{label}</p>
    </motion.div>
  );
}
