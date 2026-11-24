import React from "react";
import { 
  PhoneMissed, 
  Clock, 
  Users, 
  MessageSquareOff
} from "lucide-react";

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
    statLabel: "Never call back",
    description: "When staff is occupied with in-person clients, the phone rings out. Most callers hang up within 8 seconds and immediately book with the next competitor on Google.",
    solution: "Aiva answers in under 240ms with warm, natural hospitality. Handles unlimited concurrent callers, checks live operatory slots, and locks the booking right then and there.",
    tags: ["Sub-300ms Pick-up", "Zero Busy Tones", "100% Captured"]
  },
  {
    icon: Clock,
    category: "After-Hours Gap",
    title: "Losing high-value bookings after you close.",
    stat: "38%",
    statLabel: "Inquiries after 8 PM",
    description: "Clients remember to schedule appointments late at night or early Sunday morning when your doors are locked and nobody is at the reception desk.",
    solution: "Aiva works 24/7/365 without overtime costs, converting late-night and weekend callers into confirmed appointments on your calendar with instant WhatsApp slips.",
    tags: ["24/7 Coverage", "Instant WhatsApp Slips", "Zero Overtime"]
  },
  {
    icon: Users,
    category: "Front-Desk Bottleneck",
    title: "Front desk constantly interrupted by the phone.",
    stat: "14 hrs",
    statLabel: "Lost weekly to phone tag",
    description: "Your team is continually distracted while greeting clients in person to answer repetitive routine questions about pricing, doctor timings, and directions.",
    solution: "Aiva handles 100% of routine inquiries and bookings autonomously in the background, freeing your front desk to deliver memorable in-room care.",
    tags: ["Zero Desk Distraction", "100% Floor Focus", "Calmer Atmosphere"]
  },
  {
    icon: MessageSquareOff,
    category: "Client Retention",
    title: "Treating loyal regulars like first-time strangers.",
    stat: "1 in 3",
    statLabel: "Churn from cold triage",
    description: "Returning clients have to explain their treatment history, preferred specialist doctor, and contact info over again every single time they dial in.",
    solution: "Aiva recognizes the caller ID instantly, greets them by name, recalls past services and doctor preferences, and delivers a warm, familiar concierge experience.",
    tags: ["Instant VIP Recall", "Doctor Synchronization", "Loyalty Guard"]
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

        {/* 4 Minimalist, Clutter-Free Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {PROBLEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-2xl sm:rounded-3xl border border-white/[0.07] bg-[#0C060B] hover:border-white/20 p-5 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-xl"
                style={{
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)"
                }}
              >
                <div>
                  {/* Top Header: Clean category & stat */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.06] mb-5 sm:mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ECA9B7]">
                        <Icon size={16} />
                      </div>
                      <span className="text-xs font-mono tracking-wider uppercase text-white/50 font-medium">
                        {item.category}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/80">
                      <span className="font-bold text-[#ECA9B7]">{item.stat}</span>
                      <span className="text-white/40 font-light">· {item.statLabel}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-6"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  {/* Minimal Typographic Contrast (Zero Box Clutter) */}
                  <div className="space-y-4 mb-8">
                    {/* Without Aiva */}
                    <div className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 mt-2 shrink-0" />
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-red-400/80 block mb-1">
                          Without Aiva
                        </span>
                        <p className="text-sm text-white/55 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* With Aiva */}
                    <div className="flex items-start gap-3 pt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] mt-2 shrink-0 shadow-[0_0_8px_#E65C8E]" />
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#ECA9B7] block mb-1">
                          With Aiva
                        </span>
                        <p className="text-sm text-white/90 leading-relaxed font-normal">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Micro-Specs */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2 text-xs font-mono text-white/40">
                  {item.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      {idx > 0 && <span className="text-white/20">·</span>}
                      <span>{tag}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Minimalist Comparison Table */}
        <div 
          className="rounded-3xl border border-white/[0.07] p-6 sm:p-9 overflow-x-auto shadow-2xl"
          style={{ background: "#0D060C" }}
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
        </div>
      </div>
    </section>
  );
}
