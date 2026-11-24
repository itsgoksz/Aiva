import { 
  PhoneCall, 
  CalendarCheck, 
  MessageSquare, 
  BrainCircuit,
  ShieldCheck,
  Check,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import AivaCardMorphBridge from "./AivaCardMorphBridge";

// Apple-style directional fanning offsets
// The 4 workflow stages fan out smoothly from the central axis
const FAN_OFFSETS = [
  { x: -28, y: 30 },
  { x: -10, y: 30 },
  { x: 10, y: 30 },
  { x: 28, y: 30 },
];

interface StageItem {
  step: string;
  phase: string;
  title: string;
  metric: string;
  metricLabel: string;
  icon: typeof PhoneCall;
  color: string;
  desc: string;
  telemetry: {
    label: string;
    value: string;
    accent?: string;
  };
}

const STAGES: StageItem[] = [
  {
    step: "01",
    phase: "AUDIO INGESTION",
    title: "Answers on Ring 1 in Fluent Voice",
    metric: "240ms",
    metricLabel: "Sub-human speech latency",
    icon: PhoneCall,
    color: "#E65C8E",
    desc: "Aiva answers instantly with warm, natural hospitality. Effortlessly navigates interruptions, everyday Indian conversational speech, clinical questions, and background noise.",
    telemetry: {
      label: "LIVE VOICE STREAM",
      value: "Sub-300ms Speech • Bangalore Node",
      accent: "text-emerald-400"
    }
  },
  {
    step: "02",
    phase: "SCHEDULE ENGINE",
    title: "Checks Operatory & Doctor Buffer",
    metric: "0 Clashes",
    metricLabel: "Multi-doctor operatory lock",
    icon: CalendarCheck,
    color: "#A66B8E",
    desc: "Cross-checks real-time doctor availability across Google Calendar & Practo. Enforces 15-minute sanitization prep buffers so chairs never get double-booked.",
    telemetry: {
      label: "CALENDAR DEFENSE",
      value: "15-Min Buffer Locked • Zero Overlap",
      accent: "text-[#ECA9B7]"
    }
  },
  {
    step: "03",
    phase: "DISPATCH AUTOMATION",
    title: "Dispatches WhatsApp Slip & Map",
    metric: "3.4s",
    metricLabel: "Instant client delivery",
    icon: MessageSquare,
    color: "#10B981",
    desc: "Dispatches an official branded WhatsApp slip with specialist doctor name, appointment time, Google Maps pin, and UPI advance token link before caller hangs up.",
    telemetry: {
      label: "WHATSAPP API",
      value: "Verified Green Badge • 98% Open Rate",
      accent: "text-emerald-400"
    }
  },
  {
    step: "04",
    phase: "EXECUTIVE DOSSIER",
    title: "Saves Client Dossier & VIP Notes",
    metric: "100%",
    metricLabel: "Automated CRM logging",
    icon: BrainCircuit,
    color: "#10B981",
    desc: "Logs treatment type, preferred specialist, call audio replay, and transcript directly to your owner dashboard. Remembers repeat clients for future warm greetings.",
    telemetry: {
      label: "CLIENT MEMORY",
      value: "Rahul Dravid • Operatory 1 Recorded",
      accent: "text-white/80"
    }
  }
];

export default function AivaAutonomousLoopSection() {
  return (
    <section className="pt-10 pb-16 sm:pt-14 sm:pb-20 relative overflow-hidden bg-transparent" style={{ perspective: "1200px" }}>
      {/* Static subtle background glow (Zero repaint jitter) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[850px] h-[400px] sm:h-[550px] rounded-full pointer-events-none opacity-35 sm:opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(230, 92, 142, 0.35) 0%, rgba(166, 107, 142, 0.15) 50%, transparent 75%)"
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
            WORKFLOW PIPELINE // HOW AIVA OPERATES
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-[1.1]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            From inquiry to locked appointment. <br />
            <span className="bg-gradient-to-r from-white/90 via-[#FCE7F3] to-[#E65C8E] bg-clip-text text-transparent">
              In twenty-eight seconds.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-normal leading-relaxed">
            Here is the exact autonomous loop that runs inside Aiva every time a client dials your business number.
          </p>
        </div>

        {/* Transformation Bridge 01 -> 04 */}
        <AivaCardMorphBridge 
          variant="split-1-to-4" 
          label="CARD METAMORPHOSIS // 01 ➔ 04 [BRANCH INTO 4-STAGE PIPELINE]" 
        />

        {/* 4 Apple-Style Process Cards (Solid obsidian with fluid bloom animation) */}
        <div id="card-module-05" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            const offset = FAN_OFFSETS[idx] || { x: 0, y: 30 };
            return (
              <motion.div
                key={s.step}
                initial={{ 
                  opacity: 0.45, 
                  scale: 0.90, 
                  rotateX: -3,
                  x: offset.x, 
                  y: offset.y 
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0,
                  x: 0, 
                  y: 0 
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  duration: 0.85, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: idx * 0.08 
                }}
                className="rounded-2xl border border-white/10 bg-[#0E060D] p-6 relative overflow-hidden flex flex-col justify-between transition-colors duration-200 hover:border-[#E65C8E]/40 shadow-xl"
                style={{
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.6)"
                }}
              >
                <div>
                  {/* Unified Architecture Chassis Ribbon */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="flex items-center gap-2 text-[#EC89B5] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
                      AIVA APPARATUS // UNIT 05.{idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline text-[9px] text-[#EC89B5]/80 font-mono">LINKED ➔ UNIT 04 & UNIT 06</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                        STEP {s.step}
                      </span>
                    </div>
                  </div>

                  {/* Top: Step indicator & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                    <span className="font-mono text-[10px] font-bold text-white/40 tracking-widest uppercase">
                      STEP {s.step} // {s.phase}
                    </span>
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
                      style={{ background: `${s.color}15`, color: s.color }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-base sm:text-lg font-bold text-white tracking-tight mb-2.5 leading-snug"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/65 font-light leading-relaxed mb-5">
                    {s.desc}
                  </p>

                  {/* Simulated Telemetry HUD Box */}
                  <div className="p-3 rounded-xl bg-[#140A12] border border-white/[0.07] mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">
                        {s.telemetry.label}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className={`text-[11px] font-mono font-medium block truncate ${s.telemetry.accent || "text-white/80"}`}>
                      {s.telemetry.value}
                    </span>
                  </div>
                </div>

                {/* Bottom Metric Pill */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/40">RESULT</span>
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <Check size={12} className="text-emerald-400" />
                    <span style={{ color: s.color }}>{s.metric}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner: Executive Impact Slab (Solid obsidian gradient with converge morph) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #170914 0%, #0D050C 50%, #130811 100%)",
            boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 30px 60px rgba(0, 0, 0, 0.7)"
          }}
        >
          {/* Unified Architecture Chassis Ribbon */}
          <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
            <span className="flex items-center gap-2 text-[#EC89B5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
              AIVA APPARATUS // UNIT 05.5
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
              SLA ASSURANCE SLAB
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3 text-left">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest uppercase text-[#ECA9B7] bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30">
                <ShieldCheck size={12} />
                STAFF PRODUCTIVITY GUARANTEE
              </span>
              <h3 
                className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-[1.15]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Give your staff their time back.<br />
                <span className="text-white/40">Not their patience.</span>
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
                No more running across the salon floor or clinical operatory to grab the desk phone. 
                Your team delivers 100% undistracted care to the clients and patients right in front of them.
              </p>
            </div>

            {/* 3 Metric Counters */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#090307]/90 border border-white/10 text-center shadow-lg">
                <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block mb-0.5 sm:mb-1 truncate">REVENUE ROI</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#ECA9B7] font-mono block">3.8x</span>
                <span className="text-[9px] sm:text-[10px] text-white/60 block mt-0.5 sm:mt-1 truncate">Average boost</span>
              </div>
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#090307]/90 border border-emerald-500/20 text-center shadow-lg">
                <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block mb-0.5 sm:mb-1 truncate">MISSED CALLS</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400 font-mono block">0</span>
                <span className="text-[9px] sm:text-[10px] text-emerald-400 block mt-0.5 sm:mt-1 truncate">100% Captured</span>
              </div>
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#090307]/90 border border-white/10 text-center shadow-lg">
                <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block mb-0.5 sm:mb-1 truncate">RETENTION</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-mono block">94.6%</span>
                <span className="text-[9px] sm:text-[10px] text-white/60 block mt-0.5 sm:mt-1 truncate">Top tier clinic</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
