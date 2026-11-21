import { 
  PhoneMissed, 
  Clock, 
  Users, 
  MessageSquareOff, 
  CheckCircle2, 
  XCircle,
  Zap
} from "lucide-react";

interface ProblemItem {
  icon: typeof PhoneMissed;
  category: string;
  badge: string;
  badgeColor: string;
  title: string;
  stat: string;
  statLabel: string;
  statColor: string;
  description: string;
  solution: string;
  tags: string[];
}

const PROBLEMS: ProblemItem[] = [
  {
    icon: PhoneMissed,
    category: "CALL FRICTION // 01",
    badge: "Ring 1 Ingestion",
    badgeColor: "text-red-300 bg-red-950/40 border-red-500/30",
    title: "Unanswered Calls During the Daily Rush",
    stat: "62%",
    statLabel: "Never leave voicemail",
    statColor: "text-red-400 border-red-500/30 bg-red-500/10",
    description: "When your team is performing consultations or styling clients, the phone rings out. Callers hang up within 8 seconds and immediately book with the next clinic on Google.",
    solution: "Aiva answers in under 240ms in warm, fluent voice. Handles unlimited concurrent callers, checks live operatory slots, and secures the booking instantly.",
    tags: ["Sub-300ms Pick-up", "Zero Busy Tones", "100% Captured"]
  },
  {
    icon: Clock,
    category: "AFTER-HOURS GAP // 02",
    badge: "24/7 Operatory",
    badgeColor: "text-amber-300 bg-amber-950/40 border-amber-500/30",
    title: "Losing Bookings After You Close",
    stat: "38%",
    statLabel: "Inquiries after 8 PM",
    statColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    description: "High-value patients and clients remember to book treatments late at night from their phone or early Sunday morning when your clinic doors are locked.",
    solution: "Aiva operates round-the-clock without overtime overhead, locking genuine appointments and sending instant WhatsApp confirmation slips into your calendar.",
    tags: ["24/7/365 Coverage", "WhatsApp Slips", "Zero Overtime"]
  },
  {
    icon: Users,
    category: "DESK BOTTLENECK // 03",
    badge: "Floor Protection",
    badgeColor: "text-[#ECA9B7] bg-[#E65C8E]/15 border-[#E65C8E]/30",
    title: "Constant Front-Desk Multitasking",
    stat: "14 hrs",
    statLabel: "Weekly lost desk focus",
    statColor: "text-[#ECA9B7] border-[#E65C8E]/30 bg-[#E65C8E]/10",
    description: "Reception staff are continually pulled away while greeting in-person clients to answer routine pricing, parking, and reschedule questions over the phone.",
    solution: "Aiva handles 100% of routine inquiries, direction requests, and bookings in background, freeing your front-line team to deliver unforgettable in-room hospitality.",
    tags: ["Zero Desk Distraction", "Staff Focus 100%", "Warm Hospitality"]
  },
  {
    icon: MessageSquareOff,
    category: "CLIENT RETENTION // 04",
    badge: "Dossier Memory",
    badgeColor: "text-indigo-300 bg-indigo-950/40 border-indigo-500/30",
    title: "Treating Regulars Like Strangers",
    stat: "1 in 3",
    statLabel: "Churn from cold triage",
    statColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    description: "Returning VIP clients have to re-explain their clinical history, preferred specialist doctor, and contact information over again every time they dial in.",
    solution: "Aiva recognizes the caller ID instantly, greets them by name ('Welcome back, Rahul'), recalls past services and preferred doctors, and delivers a warm concierge experience.",
    tags: ["Instant VIP Recall", "Doctor Sync", "Loyalty Guard"]
  }
];

export default function AivaProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#0A0508" }}>
      {/* Subtle, non-blurry static ambient illumination: Zero GPU repaint flicker */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(230, 92, 142, 0.25) 0%, transparent 70%)"
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Apple-Grade Categorical Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
            OPERATIONAL BOTTLENECK // THE REALITY
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

        {/* 4 Apple-Style Problem Cards (Rock solid: zero flicker, zero blur thrash) */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {PROBLEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#0E060D] p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#E65C8E]/40 shadow-xl"
                style={{
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.6)"
                }}
              >
                <div>
                  {/* Top Bar: Category Pill & Stat Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E65C8E]/15 border border-[#E65C8E]/30 flex items-center justify-center text-[#ECA9B7]">
                        <Icon size={16} />
                      </div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-white/40 font-bold">
                        {item.category}
                      </span>
                    </div>

                    <div className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold ${item.statColor}`}>
                      {item.stat} <span className="text-[10px] opacity-75 font-normal">({item.statLabel})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-lg sm:text-xl font-bold text-white tracking-tight mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  {/* "The Friction Today" Slab */}
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20 mb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <XCircle size={14} className="text-red-400 shrink-0" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-300">
                        Today's Friction
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light pl-5">
                      {item.description}
                    </p>
                  </div>

                  {/* "With Aiva Core" Slab */}
                  <div className="p-3.5 rounded-xl bg-[#170B14] border border-[#E65C8E]/35 mb-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#ECA9B7]">
                        Aiva Standard
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium pl-5">
                      {item.solution}
                    </p>
                  </div>
                </div>

                {/* Bottom Tags / Telemetry Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.05]">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
                    <Zap size={11} className="text-[#ECA9B7]" />
                    GUARANTEE:
                  </span>
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Apple-Grade Comparison Table (Solid obsidian: No blur flicker) */}
        <div 
          className="rounded-2xl border border-white/10 p-6 sm:p-9 overflow-x-auto shadow-2xl"
          style={{ background: "#0D060C" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-6 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECA9B7] block mb-1">
                SYSTEM COMPARISON MATRIX
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
                <th className="pb-3.5 font-semibold">Core Operational Vector</th>
                <th className="pb-3.5 font-normal text-white/50">Human Front Desk</th>
                <th className="pb-3.5 font-normal text-white/50">Traditional Call Center</th>
                <th className="pb-3.5 font-bold text-[#ECA9B7] bg-[#E65C8E]/10 px-3 py-1 rounded-t-lg">Aiva Autonomous Voice</th>
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
