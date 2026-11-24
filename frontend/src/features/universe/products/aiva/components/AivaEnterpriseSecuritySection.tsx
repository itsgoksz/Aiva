import { 
  ShieldCheck, 
  Lock, 
  PhoneForwarded, 
  Radio,
  CheckCircle2,
  Cpu
} from "lucide-react";

interface PillarItem {
  tag: string;
  title: string;
  desc: string;
  icon: typeof ShieldCheck;
  color: string;
  telemetry: {
    badge: string;
    detail: string;
  };
  protocol: string;
}

const PILLARS: PillarItem[] = [
  {
    tag: "PROTOCOL 01 // RULES",
    title: "Accurate Business Info Only",
    desc: "Aiva strictly quotes your verified clinical service menu, doctor fees, and operatory timings. It never hallucinates discounts or makes up policies.",
    icon: ShieldCheck,
    color: "#E65C8E",
    telemetry: {
      badge: "STRICT COMPLIANCE",
      detail: "100% Policy Bound • Zero Hallucinations"
    },
    protocol: "VERIFIED KNOWLEDGE BASE"
  },
  {
    tag: "PROTOCOL 02 // BYPASS",
    title: "1-Tap Human Desk Takeover",
    desc: "If your reception wants to step in, one tap on the dashboard instantly transfers the caller to your clinic phone with zero hold music or disconnects.",
    icon: PhoneForwarded,
    color: "#A66B8E",
    telemetry: {
      badge: "LIVE HANDOFF",
      detail: "Instant Bridge • Zero Disconnects"
    },
    protocol: "DESK OPERATOR BRIDGE"
  },
  {
    tag: "PROTOCOL 03 // PRIVACY",
    title: "End-to-End Encrypted Data",
    desc: "Patient contact numbers, audio recordings, and medical notes are encrypted at rest and in transit. Your client data stays strictly yours.",
    icon: Lock,
    color: "#E65C8E",
    telemetry: {
      badge: "AES-256 ENCRYPTED",
      detail: "DPDP & HIPAA Compliant Storage"
    },
    protocol: "CONFIDENTIAL CLINIC DATA"
  },
  {
    tag: "PROTOCOL 04 // ACOUSTICS",
    title: "Natural Human Conversation",
    desc: "Callers can interrupt, change their minds mid-sentence, or ask multi-part questions naturally without ever hearing a robotic 'Press 1' menu.",
    icon: Radio,
    color: "#10B981",
    telemetry: {
      badge: "ACOUSTIC INTELLIGENCE",
      detail: "Fluid Speech • Interruption Ready"
    },
    protocol: "ZERO PRESS-ONE MENUS"
  }
];

export default function AivaEnterpriseSecuritySection() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Subtle static ambient glow (Zero flicker) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[750px] h-[350px] sm:h-[450px] rounded-full pointer-events-none opacity-30 sm:opacity-15"
        style={{
          background: "radial-gradient(ellipse at center, rgba(230, 92, 142, 0.3) 0%, rgba(166, 107, 142, 0.15) 50%, transparent 75%)"
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
            ENTERPRISE GOVERNANCE // SYSTEM RELIABILITY
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-[1.1]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Sounds like a real person. <br />
            <span className="bg-gradient-to-r from-white/90 via-[#FCE7F3] to-[#E65C8E] bg-clip-text text-transparent">
              Sticks strictly to your business rules.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-normal leading-relaxed">
            Aiva is engineered to represent Indian healthcare clinics and premium salons with warmth, clinical accuracy, and zero liability risk.
          </p>
        </div>

        {/* 4 Apple-Style Enterprise Cards (Solid obsidian, zero flicker) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-[#0E060D] p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#E65C8E]/40 shadow-xl"
                style={{
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.6)"
                }}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                    <span className="font-mono text-[10px] font-bold text-white/40 tracking-wider uppercase">
                      {p.tag}
                    </span>
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
                      style={{ background: `${p.color}15`, color: p.color }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-base sm:text-lg font-bold text-white tracking-tight mb-2.5 leading-snug"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/65 font-light leading-relaxed mb-5">
                    {p.desc}
                  </p>

                  {/* Security Verification HUD */}
                  <div className="p-3 rounded-xl bg-[#140A12] border border-white/[0.07] mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#ECA9B7] flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-emerald-400" />
                        {p.telemetry.badge}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-white/70 block truncate">
                      {p.telemetry.detail}
                    </span>
                  </div>
                </div>

                {/* Bottom Footnote */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">
                    STANDARD
                  </span>
                  <span className="text-[10px] font-mono font-medium text-white/50">
                    {p.protocol}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
