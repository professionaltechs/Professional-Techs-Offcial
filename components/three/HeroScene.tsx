"use client";

import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[580px] select-none">

      {/* Floating Badge: API */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-24 z-20"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-2.5 shadow-xl border border-white/60">
          <span className="text-[#1a1a3e] font-bold text-lg tracking-wide">API</span>
        </div>
      </motion.div>

      {/* Floating Badge: AI */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[38%] -right-2 z-20"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-2.5 shadow-xl border border-white/60">
          <span className="text-[#1a1a3e] font-bold text-lg tracking-wide">AI</span>
        </div>
      </motion.div>

      {/* Floating Badge: CLOUD */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-0 z-20"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-xl border border-white/60 flex flex-col items-center gap-1">
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
            <path d="M22 16H6a5 5 0 010-10 6 6 0 0111.9-1A4 4 0 1122 16z"
              stroke="#818cf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#1a1a3e] font-bold text-[10px] tracking-widest">CLOUD</span>
        </div>
      </motion.div>

      {/* Floating Badge: DB */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-4 right-4 z-20"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-xl border border-white/60 flex flex-col items-center gap-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="5" rx="9" ry="3.5" stroke="#818cf8" strokeWidth="1.5" />
            <path d="M3 5v7c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V5" stroke="#818cf8" strokeWidth="1.5" />
            <path d="M3 12v7c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-7" stroke="#818cf8" strokeWidth="1.5" />
          </svg>
          <span className="text-[#1a1a3e] font-bold text-[10px] tracking-widest">DB</span>
        </div>
      </motion.div>

      {/* Code Editor Window */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-10 w-[355px] z-10"
        style={{
          borderRadius: "14px",
          boxShadow: "0 30px 80px rgba(79,93,255,0.18), 0 8px 32px rgba(0,0,0,0.14)",
        }}
      >
        {/* Title bar */}
        <div className="bg-[#1a1a3e] rounded-t-[14px] px-4 py-3 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-3 text-gray-400 text-xs font-mono">app.tsx</span>
          <span className="ml-1 text-gray-600 text-xs">×</span>
        </div>

        {/* Code body */}
        <div className="bg-[#12123a] rounded-b-[14px] px-5 py-4 font-mono text-[11px] leading-[1.7]">
          <div className="flex gap-4">
            <span className="text-gray-600 text-right" style={{ minWidth: "16px" }}>01</span>
            <span>
              <span className="text-purple-400">import </span>
              <span className="text-gray-300">{"{ "}</span>
              <span className="text-yellow-300">Product</span>
              <span className="text-gray-300">{" } "}</span>
              <span className="text-purple-400">from </span>
              <span className="text-green-400">&apos;@/types&apos;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>02</span>
            <span>
              <span className="text-purple-400">export default function </span>
              <span className="text-yellow-300">Dashboard</span>
              <span className="text-gray-300">() {"{"}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>03</span>
            <span><span className="text-gray-300 ml-4">return {"{"}</span></span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>04</span>
            <span>
              <span className="text-gray-500 ml-8">&lt;</span>
              <span className="text-red-400">div </span>
              <span className="text-yellow-300">className</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;grid grid-cols-3 gap-6&quot;</span>
              <span className="text-gray-500">&gt;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>05</span>
            <span>
              <span className="text-gray-500 ml-12">&lt;</span>
              <span className="text-red-400">Card </span>
              <span className="text-yellow-300">title</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;Users&quot; </span>
              <span className="text-yellow-300">value</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;24.8K&quot;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>06</span>
            <span>
              <span className="text-gray-500 ml-16">trend</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;+12.5%&quot; </span>
              <span className="text-gray-500">/&gt;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>07</span>
            <span>
              <span className="text-gray-500 ml-12">&lt;</span>
              <span className="text-red-400">Card </span>
              <span className="text-yellow-300">title</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;Revenue&quot; </span>
              <span className="text-yellow-300">value</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;$54.2K&quot;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>08</span>
            <span>
              <span className="text-gray-500 ml-16">trend</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;+8.1%&quot; </span>
              <span className="text-gray-500">/&gt;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>09</span>
            <span>
              <span className="text-gray-500 ml-12">&lt;</span>
              <span className="text-red-400">Card </span>
              <span className="text-yellow-300">title</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;Orders&quot; </span>
              <span className="text-yellow-300">value</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;1.6K&quot;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>10</span>
            <span>
              <span className="text-gray-500 ml-16">trend</span>
              <span className="text-gray-300">=</span>
              <span className="text-green-400">&quot;+16.3%&quot; </span>
              <span className="text-gray-500">/&gt;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>11</span>
            <span>
              <span className="text-gray-500 ml-8">&lt;/</span>
              <span className="text-red-400">div</span>
              <span className="text-gray-500">&gt;</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>12</span>
            <span><span className="text-gray-300 ml-4">{"}"}</span></span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-600" style={{ minWidth: "16px" }}>13</span>
            <span><span className="text-gray-300">{"}"}</span></span>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Panel */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute right-0 top-6 w-[230px] z-10"
        style={{
          borderRadius: "16px",
          background: "rgba(255,255,255,0.93)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 20px 60px rgba(79,93,255,0.1), 0 4px 20px rgba(0,0,0,0.07)",
          border: "1px solid rgba(255,255,255,0.8)",
        }}
      >
        <div className="p-4">
          <p className="text-[#1a1a3e] font-semibold text-sm mb-3">Dashboard</p>

          {/* Stats */}
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

          {/* Mini chart */}
          <p className="text-gray-400 text-[10px] mb-1">Analytics</p>
          <svg viewBox="0 0 140 50" className="w-full h-8 mb-3">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              points="0,40 20,32 40,36 60,18 80,24 100,12 120,20 140,8"
              fill="none" stroke="#818cf8" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            <polygon
              points="0,40 0,40 20,32 40,36 60,18 80,24 100,12 120,20 140,8 140,50 0,50"
              fill="url(#cg)"
            />
          </svg>

          {/* Top products */}
          <p className="text-gray-500 text-[10px] mb-2">Top Products</p>
          {[
            { label: "Web App",        pct: 82 },
            { label: "Mobile App",     pct: 60 },
            { label: "SaaS Platform",  pct: 44 },
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

      {/* Deploying chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-32 right-6 z-20"
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.93)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255,255,255,0.7)",
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

      {/* Decorative SVG connector dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 560 580" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="390" cy="28" r="5" fill="#a5b4fc" opacity="0.7" />
        <line x1="390" y1="28" x2="310" y2="100"
          stroke="#a5b4fc" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <circle cx="310" cy="100" r="4" fill="#a5b4fc" opacity="0.5" />
        <circle cx="80"  cy="470" r="5" fill="#6ee7b7" opacity="0.6" />
        <line x1="80"  y1="470" x2="180" y2="370"
          stroke="#6ee7b7" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="450" cy="190" r="3" fill="#818cf8" opacity="0.35" />
        <circle cx="470" cy="340" r="3" fill="#818cf8" opacity="0.35" />
        <circle cx="510" cy="120" r="3" fill="#818cf8" opacity="0.35" />
        <circle cx="525" cy="270" r="3" fill="#818cf8" opacity="0.35" />
        <circle cx="430" cy="450" r="3" fill="#818cf8" opacity="0.35" />
      </svg>

    </div>
  );
}