import React from "react";
import { motion } from "framer-motion";
import { Sparkles, GitBranch, GitMerge, Cpu, ArrowDown } from "lucide-react";

export type MorphBridgeVariant = "split-1-to-4" | "merge-4-to-1" | "bus-1-to-1";

interface AivaCardMorphBridgeProps {
  variant: MorphBridgeVariant;
  label?: string;
  sourceLabel?: string;
  targetLabel?: string;
  className?: string;
}

export default function AivaCardMorphBridge({
  variant,
  label,
  sourceLabel,
  targetLabel,
  className = "",
}: AivaCardMorphBridgeProps) {
  const defaultLabels = {
    "split-1-to-4": "CARD METAMORPHOSIS // 01 ➔ 04 [FRACTURE INTO 4 QUADRANTS]",
    "merge-4-to-1": "CARD METAMORPHOSIS // 04 ➔ 01 [CONVERGE INTO UNIFIED MATRIX]",
    "bus-1-to-1": "CARD METAMORPHOSIS // 01 ➔ 01 [MORPH INTO TELEMETRY CONSOLE]",
  };

  const displayLabel = label || defaultLabels[variant];

  return (
    <div className={`relative w-full max-w-6xl mx-auto py-6 sm:py-8 flex flex-col items-center justify-center pointer-events-none select-none ${className}`}>
      {/* Central Quantum Morph Junction Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120810]/95 border border-[#E65C8E]/40 shadow-[0_0_25px_rgba(230,92,142,0.35)] backdrop-blur-xl"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E65C8E] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E65C8E]" />
        </span>

        {variant === "split-1-to-4" && <GitBranch size={12} className="text-[#EC89B5]" />}
        {variant === "merge-4-to-1" && <GitMerge size={12} className="text-emerald-400" />}
        {variant === "bus-1-to-1" && <Cpu size={12} className="text-[#EC89B5]" />}

        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-white/90">
          {displayLabel}
        </span>

        <ArrowDown size={11} className="text-[#ECA9B7] animate-bounce" />
      </motion.div>

      {/* Desktop High-Fidelity SVG Laser Conduit Network */}
      <div className="hidden sm:block w-full h-24 sm:h-28 relative -my-4 z-10">
        <svg
          viewBox="0 0 1000 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <defs>
            {/* Primary Aiva Velvet Plum-to-Rose Glow Gradient */}
            <linearGradient id="aivaConduitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A66B8E" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#E65C8E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#EC89B5" stopOpacity="0.3" />
            </linearGradient>

            {/* Emerald Convergence Gradient */}
            <linearGradient id="emeraldConduitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E65C8E" stopOpacity="0.3" />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Variant 1: Single Card Fractures into 4 Cards */}
          {variant === "split-1-to-4" && (
            <g filter="url(#neonGlow)">
              {/* Central origin stem */}
              <line x1="500" y1="0" x2="500" y2="28" stroke="url(#aivaConduitGrad)" strokeWidth="2.5" />
              
              {/* Branch 1: Top-Left Card */}
              <path
                d="M 500,28 C 500,75 140,45 140,120"
                stroke="url(#aivaConduitGrad)"
                strokeWidth="1.75"
                strokeDasharray="6 8"
                className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />
              {/* Branch 2: Mid-Left Card */}
              <path
                d="M 500,28 C 500,70 380,50 380,120"
                stroke="url(#aivaConduitGrad)"
                strokeWidth="1.75"
                strokeDasharray="6 8"
                className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />
              {/* Branch 3: Mid-Right Card */}
              <path
                d="M 500,28 C 500,70 620,50 620,120"
                stroke="url(#aivaConduitGrad)"
                strokeWidth="1.75"
                strokeDasharray="6 8"
                className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />
              {/* Branch 4: Top-Right Card */}
              <path
                d="M 500,28 C 500,75 860,45 860,120"
                stroke="url(#aivaConduitGrad)"
                strokeWidth="1.75"
                strokeDasharray="6 8"
                className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />

              {/* Terminal Connection Pips */}
              <circle cx="140" cy="116" r="3.5" fill="#E65C8E" />
              <circle cx="380" cy="116" r="3.5" fill="#E65C8E" />
              <circle cx="620" cy="116" r="3.5" fill="#E65C8E" />
              <circle cx="860" cy="116" r="3.5" fill="#E65C8E" />
            </g>
          )}

          {/* Variant 2: 4 Cards Converge into 1 Card */}
          {variant === "merge-4-to-1" && (
            <g filter="url(#neonGlow)">
              {/* Incoming Branch 1 */}
              <path
                d="M 140,0 C 140,75 500,45 500,92"
                stroke="url(#emeraldConduitGrad)"
                strokeWidth="1.75"
                strokeDasharray="6 8"
                className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />
              {/* Incoming Branch 2 */}
              <path
                d="M 380,0 C 380,70 500,50 500,92"
                stroke="url(#emeraldConduitGrad)"
                strokeWidth="1.75"
                strokeDasharray="6 8"
                className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />
              {/* Incoming Branch 3 */}
              <path
                d="M 620,0 C 620,70 500,50 500,92"
                stroke="url(#emeraldConduitGrad)"
                strokeWidth="1.75"
                strokeDasharray="6 8"
                className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />
              {/* Incoming Branch 4 */}
              <path
                d="M 860,0 C 860,75 500,45 500,92"
                stroke="url(#emeraldConduitGrad)"
                strokeWidth="1.75"
                strokeDasharray="6 8"
                className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />

              {/* Convergence Terminal Stem */}
              <line x1="500" y1="92" x2="500" y2="120" stroke="url(#aivaConduitGrad)" strokeWidth="3" />
              <circle cx="500" cy="116" r="4" fill="#10B981" />
            </g>
          )}

          {/* Variant 3: 1 Card Telemetry Bus to 1 Card */}
          {variant === "bus-1-to-1" && (
            <g filter="url(#neonGlow)">
              {/* Dual high-speed data rails */}
              <line x1="475" y1="0" x2="475" y2="120" stroke="url(#aivaConduitGrad)" strokeWidth="1.75" strokeDasharray="4 6" />
              <line x1="525" y1="0" x2="525" y2="120" stroke="url(#aivaConduitGrad)" strokeWidth="1.75" strokeDasharray="4 6" />
              
              {/* Central high-bandwidth beam */}
              <line x1="500" y1="0" x2="500" y2="120" stroke="url(#aivaConduitGrad)" strokeWidth="2.5" />
              
              {/* Cross-bus parity rings */}
              <circle cx="500" cy="20" r="3.5" fill="#EC89B5" />
              <circle cx="500" cy="60" r="5" fill="#E65C8E" />
              <circle cx="500" cy="100" r="3.5" fill="#EC89B5" />
            </g>
          )}
        </svg>
      </div>

      {/* Mobile Streamlined Vertical Morph Spine (100% Zero-lag & Crisp) */}
      <div className="sm:hidden flex flex-col items-center justify-center my-1">
        <div className="w-[1.5px] h-8 bg-gradient-to-b from-transparent via-[#E65C8E] to-[#E65C8E]/40" />
        <div className="w-2 h-2 rounded-full bg-[#E65C8E] shadow-[0_0_8px_#E65C8E]" />
        <div className="w-[1.5px] h-8 bg-gradient-to-b from-[#E65C8E]/40 via-[#E65C8E] to-transparent" />
      </div>
    </div>
  );
}
