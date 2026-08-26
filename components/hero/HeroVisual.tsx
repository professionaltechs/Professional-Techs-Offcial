"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CODE_LINES = [
  { num: "01", tokens: [
    { t: "import ", c: "text-purple-400" },
    { t: "{ Product } ", c: "text-gray-300" },
    { t: "from ", c: "text-purple-400" },
    { t: "'@/types'", c: "text-green-400" },
  ]},
  { num: "02", tokens: [
    { t: "export default function ", c: "text-purple-400" },
    { t: "Dashboard", c: "text-yellow-300" },
    { t: "() {", c: "text-gray-300" },
  ]},
  { num: "03", tokens: [{ t: "  return (", c: "text-gray-300" }] },
  { num: "04", tokens: [
    { t: "    <", c: "text-gray-500" },
    { t: "div ", c: "text-red-400" },
    { t: "className", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"grid cols-3"', c: "text-green-400" },
    { t: ">", c: "text-gray-500" },
  ]},
  { num: "05", tokens: [
    { t: "      <", c: "text-gray-500" },
    { t: "Card ", c: "text-red-400" },
    { t: "title", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"Users"', c: "text-green-400" },
  ]},
  { num: "06", tokens: [
    { t: "        value", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"24.8K"', c: "text-green-400" },
    { t: " trend", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"+12.5%"', c: "text-green-400" },
    { t: " />", c: "text-gray-500" },
  ]},
  { num: "07", tokens: [
    { t: "      <", c: "text-gray-500" },
    { t: "Card ", c: "text-red-400" },
    { t: "title", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"Revenue"', c: "text-green-400" },
  ]},
  { num: "08", tokens: [
    { t: "        value", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"$54.2K"', c: "text-green-400" },
    { t: " trend", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"+8.1%"', c: "text-green-400" },
    { t: " />", c: "text-gray-500" },
  ]},
  { num: "09", tokens: [
    { t: "      <", c: "text-gray-500" },
    { t: "Card ", c: "text-red-400" },
    { t: "title", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"Orders"', c: "text-green-400" },
  ]},
  { num: "10", tokens: [
    { t: "        value", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"1.6K"', c: "text-green-400" },
    { t: " trend", c: "text-yellow-300" },
    { t: "=", c: "text-gray-300" },
    { t: '"+16.3%"', c: "text-green-400" },
    { t: " />", c: "text-gray-500" },
  ]},
  { num: "11", tokens: [{ t: "    </div>", c: "text-gray-500" }] },
  { num: "12", tokens: [{ t: "  )", c: "text-gray-300" }] },
  { num: "13", tokens: [{ t: "}", c: "text-gray-300" }] },
];

function buildCharList() {
  const chars: { char: string; color: string }[] = [];
  CODE_LINES.forEach((line) => {
    line.num.split("").forEach((ch) => chars.push({ char: ch, color: "text-gray-600" }));
    line.tokens.forEach((tok) => tok.t.split("").forEach((ch) => chars.push({ char: ch, color: tok.c })));
    chars.push({ char: "\n", color: "" });
  });
  return chars;
}

const ALL_CHARS = buildCharList();

// Spring-based snappy easing
const SPRING = { type: "spring", stiffness: 200, damping: 22, mass: 0.8 };
const SPRING_SOFT = { type: "spring", stiffness: 140, damping: 18, mass: 1 };

export default function HeroVisual() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [looping, setLooping] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const startDelay = setTimeout(() => {
      function type() {
        i++;
        setVisibleCount(i);
        if (i < ALL_CHARS.length) {
          timeout = setTimeout(type, Math.random() * 35 + 16);
        } else {
          timeout = setTimeout(() => { i = 0; setVisibleCount(0); setLooping((p) => !p); }, 2800);
        }
      }
      type();
    }, 1400);
    return () => { clearTimeout(startDelay); clearTimeout(timeout); };
  }, [looping]);

  // Build rendered lines
  const lines: { numStr: string; segments: { text: string; color: string }[] }[] = [];
  let charIdx = 0;
  let shown = 0;
  for (let li = 0; li < CODE_LINES.length; li++) {
    const lineData = CODE_LINES[li];
    const segments: { text: string; color: string }[] = [];
    let numStr = "";
    for (let c = 0; c < lineData.num.length; c++) {
      if (shown < visibleCount) { numStr += ALL_CHARS[charIdx].char; shown++; }
      charIdx++;
    }
    for (const tok of lineData.tokens) {
      let tokStr = "";
      for (let c = 0; c < tok.t.length; c++) {
        if (shown < visibleCount) { tokStr += ALL_CHARS[charIdx].char; shown++; }
        charIdx++;
      }
      if (tokStr) segments.push({ text: tokStr, color: tok.c });
    }
    charIdx++;
    if (shown < visibleCount) shown++;
    if (numStr || segments.length > 0) lines.push({ numStr, segments });
  }
  const lastLineIdx = lines.length - 1;

  return (
    <div className="relative w-full h-[600px] select-none" style={{ perspective: "1400px" }}>

      {/* ═══════════════════════════════════════
          CODE EDITOR — flies in from left + rotates into place
      ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -120, y: 60, rotateY: -45, rotateX: 20, scale: 0.75 }}
        animate={{ opacity: 1, x: 0,    y: 0,  rotateY: -12, rotateX: 6,  scale: 1 }}
        transition={{ ...SPRING, delay: 0.1 }}
        className="absolute left-0 top-8 w-[370px] z-10"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Glow behind editor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute -inset-4 rounded-3xl blur-2xl"
          style={{ background: "radial-gradient(ellipse, rgba(79,93,255,0.25) 0%, transparent 70%)", zIndex: -1 }}
        />

        {/* Floating loop wraps the card */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{
            borderRadius: "14px",
            boxShadow: "0 40px 100px rgba(79,93,255,0.25), 0 12px 40px rgba(0,0,0,0.20), -6px 6px 0 rgba(79,93,255,0.10)",
          }}
        >
          <div className="bg-[#1e1e4a] rounded-t-[14px] px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-gray-400 text-xs font-mono">app.tsx</span>
            <span className="ml-1 text-gray-600 text-xs">×</span>
          </div>
          <div className="bg-[#0f0f2e] rounded-b-[14px] px-4 py-4 font-mono text-[11px] leading-[1.8] min-h-[260px]">
            {lines.map((line, li) => (
              <div key={li} className="flex gap-3">
                <span className="text-gray-600 w-5 shrink-0 text-right select-none">{line.numStr}</span>
                <span className="flex flex-wrap">
                  {line.segments.map((seg, si) => (
                    <span key={si} className={seg.color}>{seg.text}</span>
                  ))}
                  {li === lastLineIdx && visibleCount < ALL_CHARS.length && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.65, repeat: Infinity }}
                      className="inline-block w-[2px] h-[13px] bg-indigo-400 ml-0.5 translate-y-0.5"
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════
          DASHBOARD — drops from top + rotates
      ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: 80, y: -100, rotateY: 35, rotateX: -20, scale: 0.7 }}
        animate={{ opacity: 1, x: 0,   y: 0,   rotateY: 10,  rotateX: -5,  scale: 1 }}
        transition={{ ...SPRING_SOFT, delay: 0.35 }}
        className="absolute right-0 top-4 w-[235px] z-10"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Glow behind dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute -inset-4 rounded-3xl blur-2xl"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.20) 0%, transparent 70%)", zIndex: -1 }}
        />

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{
            borderRadius: "16px",
            background: "rgba(255,255,255,0.97)",
            boxShadow: "0 30px 80px rgba(79,93,255,0.16), 0 8px 30px rgba(0,0,0,0.12), 8px 8px 0 rgba(124,58,237,0.08)",
            border: "1px solid rgba(255,255,255,0.9)",
          }}
        >
          <div className="p-4">
            <p className="text-[#1a1a3e] font-semibold text-sm mb-3">Dashboard</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Users",   value: "24.8K", trend: "+12.5%" },
                { label: "Revenue", value: "$54.2K", trend: "+8.1%" },
                { label: "Orders",  value: "1.6K",  trend: "+16.5%" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-gray-400 text-[9px]">{s.label}</p>
                  <p className="text-[#1a1a3e] font-bold text-[11px]">{s.value}</p>
                  <p className="text-emerald-500 text-[9px]">{s.trend}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-[10px] mb-1">Analytics</p>
            <svg viewBox="0 0 140 50" className="w-full h-9 mb-3">
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline points="0,42 20,34 40,38 60,18 80,26 100,12 120,20 140,8"
                fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points="0,42 20,34 40,38 60,18 80,26 100,12 120,20 140,8 140,50 0,50" fill="url(#cg)" />
            </svg>
            <p className="text-gray-500 text-[10px] mb-2">Top Products</p>
            {[
              { label: "Web App",       pct: 82 },
              { label: "Mobile App",    pct: 60 },
              { label: "SaaS Platform", pct: 44 },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-gray-500 w-20 shrink-0">{p.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-indigo-400" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════
          DEPLOYING CHIP — pops up from bottom
      ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, y: 0,  scale: 1,   rotate: 0  }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.7 }}
        className="absolute bottom-36 right-4 z-20"
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.97)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(79,93,255,0.10)",
            border: "1px solid rgba(255,255,255,0.9)",
          }}
        >
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#e0e7ff" strokeWidth="2" />
            <path d="M8 2a6 6 0 016 6" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[#1a1a3e] text-sm font-medium">Deploying...</span>
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          BADGES — each from a different direction
      ════════════════════════════════════════ */}

      {/* API — rains from top */}
      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.5, rotate: 12 }}
        animate={{ opacity: 1, y: 0,   scale: 1,   rotate: 0  }}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.55 }}
        className="absolute top-2 right-20 z-20"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <div className="bg-white/97 rounded-2xl px-5 py-2.5 border border-white/60"
            style={{ boxShadow: "0 8px 32px rgba(79,93,255,0.20), 0 2px 8px rgba(0,0,0,0.10)" }}>
            <span className="text-[#1a1a3e] font-bold text-lg tracking-wide">API</span>
          </div>
        </motion.div>
      </motion.div>

      {/* AI — shoots from right */}
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, x: 0,  scale: 1,   rotate: 0   }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
        className="absolute top-[36%] -right-1 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <div className="bg-white/97 rounded-2xl px-5 py-2.5 border border-white/60"
            style={{ boxShadow: "0 8px 32px rgba(79,93,255,0.20), 0 2px 8px rgba(0,0,0,0.10)" }}>
            <span className="text-[#1a1a3e] font-bold text-lg tracking-wide">AI</span>
          </div>
        </motion.div>
      </motion.div>

      {/* CLOUD — rises from bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 60, scale: 0.5, rotate: 15 }}
        animate={{ opacity: 1, x: 0,   y: 0,  scale: 1,   rotate: 0  }}
        transition={{ type: "spring", stiffness: 240, damping: 18, delay: 1.0 }}
        className="absolute bottom-24 left-0 z-20"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <div className="bg-white/97 rounded-2xl px-4 py-2.5 border border-white/60 flex flex-col items-center gap-1"
            style={{ boxShadow: "0 8px 32px rgba(79,93,255,0.15), 0 2px 8px rgba(0,0,0,0.08)" }}>
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
              <path d="M22 16H6a5 5 0 010-10 6 6 0 0111.9-1A4 4 0 1122 16z"
                stroke="#818cf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[#1a1a3e] font-bold text-[10px] tracking-widest">CLOUD</span>
          </div>
        </motion.div>
      </motion.div>

      {/* DB — spins in from bottom-right */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 60, scale: 0.4, rotate: -20 }}
        animate={{ opacity: 1, x: 0,  y: 0,  scale: 1,   rotate: 0   }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 1.2 }}
        className="absolute bottom-2 right-6 z-20"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <div className="bg-white/97 rounded-2xl px-4 py-2.5 border border-white/60 flex flex-col items-center gap-1"
            style={{ boxShadow: "0 8px 32px rgba(79,93,255,0.15), 0 2px 8px rgba(0,0,0,0.08)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <ellipse cx="12" cy="5" rx="9" ry="3.5" stroke="#818cf8" strokeWidth="1.5" />
              <path d="M3 5v7c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V5" stroke="#818cf8" strokeWidth="1.5" />
              <path d="M3 12v7c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-7" stroke="#818cf8" strokeWidth="1.5" />
            </svg>
            <span className="text-[#1a1a3e] font-bold text-[10px] tracking-widest">DB</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Decorative dots ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 560 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="390" cy="28" r="5" fill="#a5b4fc" opacity="0.7" />
        <line x1="390" y1="28" x2="310" y2="110" stroke="#a5b4fc" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <circle cx="310" cy="110" r="4" fill="#a5b4fc" opacity="0.5" />
        <circle cx="80" cy="470" r="5" fill="#6ee7b7" opacity="0.6" />
        <line x1="80" y1="470" x2="180" y2="370" stroke="#6ee7b7" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="450" cy="190" r="3" fill="#818cf8" opacity="0.35" />
        <circle cx="470" cy="340" r="3" fill="#818cf8" opacity="0.35" />
        <circle cx="510" cy="120" r="3" fill="#818cf8" opacity="0.35" />
        <circle cx="525" cy="270" r="3" fill="#818cf8" opacity="0.35" />
        <circle cx="430" cy="450" r="3" fill="#818cf8" opacity="0.35" />
      </svg>

    </div>
  );
}