import React from "react";
import { motion } from "framer-motion";
import { 
  PhoneMissed, 
  Clock, 
  Users, 
  MessageSquareOff
} from "lucide-react";

// Apple-style 4-quadrant outward bloom offsets
// As you scroll from the single Hero card, the 4 cards burst outward from a unified origin point
const QUADRANT_OFFSETS = [
  { x: 35, y: 35 },   // Card 0: Top-left bursts out from center (+x, +y)
  { x: -35, y: 35 },  // Card 1: Top-right bursts out from center (-x, +y)
  { x: 35, y: -35 },  // Card 2: Bottom-left bursts out from center (+x, -y)
  { x: -35, y: -35 }, // Card 3: Bottom-right bursts out from center (-x, -y)
];

interface ProblemItem {
  icon: typeof PhoneMissed;
  category: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
  solution: string;
  tags: string[];
}

const PROBLEMS: ProblemItem[] = [
  {
    icon: PhoneMissed,
    category: "Peak Hour Loss",
    title: "Unanswered calls during the daily rush.",
    stat: "62%",
    statLabel: "Lost Calls",
    description: "When staff is occupied with in-person clients, calls ring out. Callers hang up within 8 seconds and immediately book with a competitor.",
    solution: "Picks up in under 240ms with warm hospitality, handles unlimited concurrent callers, and locks bookings directly into your calendar.",
    tags: ["< 240ms Pick-up", "Zero Busy Tones", "100% Capture"]
  },
  {
    icon: Clock,
    category: "After-Hours Gap",
    title: "Losing high-value bookings after doors close.",
    stat: "38%",
    statLabel: "After 8 PM",
    description: "Clients attempt to book late at night or on weekends when clinic doors are locked and nobody is at the front desk to answer.",
    solution: "Operates 24/7/365 with zero overtime costs, locking calendar slots and sending instant WhatsApp confirmations while you sleep.",
    tags: ["24/7/365 Always-On", "Instant WhatsApp Slips", "Zero Overtime"]
  },
  {
    icon: Users,
    category: "Front-Desk Bottleneck",
    title: "Front desk staff constantly interrupted by calls.",
    stat: "14 hrs",
    statLabel: "Lost Weekly",
    description: "In-person check-ins and client consultations are repeatedly derailed by routine questions on pricing, timings, and directions.",
    solution: "Handles 100% of routine inquiries and bookings autonomously, freeing your front desk to deliver world-class in-person care.",
    tags: ["Zero Desk Distraction", "100% In-Person Focus", "Calmer Lobby"]
  },
  {
    icon: MessageSquareOff,
    category: "Client Retention",
    title: "Treating loyal regulars like first-time strangers.",
    stat: "1 in 3",
    statLabel: "Cold Churn",
    description: "Returning VIP clients are forced to re-explain their treatment history, doctor preferences, and medical notes on every call.",
    solution: "Instantly recognizes caller ID, greets regulars by name, recalls past doctor notes, and delivers an attentive concierge experience.",
    tags: ["Instant VIP Recall", "Specialist Sync", "Concierge Memory"]
  }
];

export default function AivaProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Subtle, non-blurry static ambient illumination */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[700px] h-[350px] sm:h-[500px] rounded-full pointer-events-none blur-[80px] sm:blur-none opacity-40 sm:opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(230, 92, 142, 0.35) 0%, rgba(166, 107, 142, 0.12) 50%, transparent 75%)"
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
            THE FRONT-DESK REALITY
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-[1.1]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Every missed call is <br />
            <span className="bg-gradient-to-r from-white/90 via-[#FCE7F3] to-[#E65C8E] bg-clip-text text-transparent">
              revenue lost to a competitor.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-normal leading-relaxed">
            High-end clinics and luxury salons don't lose clients because their work isn't world-class. 
            They lose them because the desk phone rang while everyone was busy.
          </p>
        </div>

        {/* 4 Premium, Horizontally-Aligned Product Cards (Apple Morph Outward Bloom) */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {PROBLEMS.map((item, idx) => {
            const Icon = item.icon;
            const offset = QUADRANT_OFFSETS[idx] || { x: 0, y: 30 };
            return (
              <motion.div
                key={item.title}
                initial={{ 
                  opacity: 0, 
                  scale: 0.88, 
                  x: offset.x, 
                  y: offset.y 
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0, 
                  y: 0 
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  duration: 0.85, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: idx * 0.08 
                }}
                className="group rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#120810]/75 hover:bg-[#150A13]/90 hover:border-[#E65C8E]/30 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden backdrop-blur-xl shadow-2xl"
                style={{
                  boxShadow: "0 24px 48px -18px rgba(0, 0, 0, 0.75)"
                }}
              >
                {/* Subtle top edge gradient highlight on hover */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E65C8E]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Top Header: Category & Stat Badge (Guaranteed 1-Line Lock) */}
                  <div className="flex items-center justify-between gap-3 pb-5 border-b border-white/[0.06] mb-5 sm:mb-6 min-h-[44px]">
                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-[#E65C8E]/10 border border-[#E65C8E]/25 flex items-center justify-center text-[#ECA9B7] group-hover:bg-[#E65C8E]/20 transition-colors">
                        <Icon size={16} />
                      </div>
                      <span className="text-xs font-mono tracking-wider uppercase text-white/70 font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono shrink-0">
                      <span className="font-bold text-[#ECA9B7] text-sm">{item.stat}</span>
                      <span className="text-white/50 text-[11px] font-normal">· {item.statLabel}</span>
                    </div>
                  </div>

                  {/* Title (Locked Minimum Height for Horizontal Parity) */}
                  <div className="min-h-[3.5rem] sm:min-h-[3.75rem] flex items-start mb-5">
                    <h3 
                      className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-pink-50 transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Structured Dual Contrast Cards (Locked Vertical Slots) */}
                  <div className="space-y-3 mb-6">
                    {/* The Friction / Without Aiva */}
                    <div className="min-h-[105px] sm:min-h-[112px] rounded-xl p-3.5 sm:p-4 bg-red-950/20 border border-red-500/15 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5 text-red-400 text-xs font-bold font-mono">
                        ✕
                      </div>
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-red-400/90 font-semibold mb-1">
                          The Friction · Without Aiva
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* The Aiva Fix */}
                    <div className="min-h-[105px] sm:min-h-[112px] rounded-xl p-3.5 sm:p-4 bg-[#E65C8E]/[0.08] border border-[#E65C8E]/25 flex items-start gap-3 shadow-sm shadow-[#E65C8E]/10">
                      <div className="w-5 h-5 rounded-md bg-[#E65C8E]/20 border border-[#E65C8E]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#ECA9B7] text-xs font-bold font-mono">
                        ✓
                      </div>
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-[#ECA9B7] font-semibold mb-1 flex items-center gap-2">
                          <span>The Aiva Advantage</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
                        </div>
                        <p className="text-sm text-white/95 leading-relaxed font-normal">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Micro-Specs as Modern Badges (Locked Minimum Height) */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 min-h-[44px]">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono text-white/60 tracking-tight whitespace-nowrap hover:text-white/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clean Minimalist Comparison Table (Morph Expansion from 4 Cards) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.90, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 p-6 sm:p-9 overflow-x-auto shadow-2xl bg-[#120810]/80 backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-6 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECA9B7] block mb-1">
                SYSTEM COMPARISON
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                How Aiva compares to traditional setups
              </h3>
            </div>
            <span className="text-xs font-mono text-white/40">
              Validated on 100+ Live Deployments
            </span>
          </div>

          <table className="w-full text-left text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-[11px] uppercase tracking-wider">
                <th className="pb-3.5 font-semibold">Core Capability</th>
                <th className="pb-3.5 font-normal text-white/50">Human Front Desk</th>
                <th className="pb-3.5 font-normal text-white/50">Traditional Call Center</th>
                <th className="pb-3.5 font-bold text-[#ECA9B7] bg-[#E65C8E]/10 px-3 py-1 rounded-t-lg">Aiva Voice AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="py-4 font-medium text-white">Hours of Operation</td>
                <td className="py-4 text-white/50">10:00 AM – 8:00 PM only</td>
                <td className="py-4 text-white/50">24/7 (Expensive add-on)</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2 bg-[#E65C8E]/[0.04] px-3">
                  <span className="text-emerald-400">✓</span> 24/7/365 without overtime
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Simultaneous Call Capacity</td>
                <td className="py-4 text-white/50">1 caller (others get busy tone)</td>
                <td className="py-4 text-white/50">Long wait & hold queues</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2 bg-[#E65C8E]/[0.04] px-3">
                  <span className="text-emerald-400">✓</span> Unlimited concurrent lines
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Direct Calendar & Buffer Sync</td>
                <td className="py-4 text-white/50">Manual paper/CRM entry</td>
                <td className="py-4 text-white/50">Takes message, can't lock slots</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2 bg-[#E65C8E]/[0.04] px-3">
                  <span className="text-emerald-400">✓</span> Direct slot & operatory lock
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">WhatsApp Confirmation & UPI</td>
                <td className="py-4 text-white/50">Only if staff remembers</td>
                <td className="py-4 text-white/50">No text / WhatsApp routing</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2 bg-[#E65C8E]/[0.04] px-3">
                  <span className="text-emerald-400">✓</span> Instant WhatsApp slip in 3.4s
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Cost Structure</td>
                <td className="py-4 text-white/50">₹35,000 – ₹55,000/mo + PF/ESI</td>
                <td className="py-4 text-white/50">Per-minute charges + setup fee</td>
                <td className="py-4 text-emerald-400 font-semibold flex items-center gap-2 bg-[#E65C8E]/[0.04] px-3">
                  <span className="text-emerald-400">✓</span> Predictable flat monthly plan
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
