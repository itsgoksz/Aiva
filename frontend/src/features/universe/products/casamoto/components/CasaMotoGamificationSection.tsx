import { Flame, Compass, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

const BADGES = [
  {
    title: "Apex Hunter",
    desc: "Recorded a verified 45°+ lean angle on mountain twisties.",
    xp: "+500 XP",
    icon: Flame,
    color: "#FF6B00",
    tier: "Master"
  },
  {
    title: "DIY Grease Monkey",
    desc: "Logged 5 self-performed maintenance routines (chain, oil, pads).",
    xp: "+350 XP",
    icon: Zap,
    color: "#00E5FF",
    tier: "Adept"
  },
  {
    title: "Iron Butt 500",
    desc: "Completed a 500km single-day endurance ride with your crew.",
    xp: "+800 XP",
    icon: Compass,
    color: "#FFA800",
    tier: "Legend"
  },
  {
    title: "Pack Commander",
    desc: "Orchestrated 10 group rides with 100% zero-dropout completion.",
    xp: "+650 XP",
    icon: ShieldCheck,
    color: "#10B981",
    tier: "Elite"
  }
];

export default function CasaMotoGamificationSection() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FF6B00] border border-[#FF6B00]/20 bg-[#FF6B00]/5 mb-4 font-mono">
            Rider Progression & Gamification
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Level Up With Every Kilometer. <br />
            <span className="text-white/40">Earn XP for riding hard and servicing right.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Taking care of your motorcycle should feel rewarding. Earn badges, level up your rider status, 
            and unlock exclusive telemetry dashboards as your experience grows.
          </p>
        </div>

        {/* Rider Profile Card Preview */}
        <div 
          className="rounded-3xl border border-white/10 p-6 sm:p-10 mb-12 backdrop-blur-2xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(18, 22, 34, 0.8) 0%, rgba(8, 10, 16, 0.9) 100%)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Rider Info */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FF6B00] to-[#00E5FF] p-0.5 shrink-0 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center font-black text-2xl text-white font-mono">
                  G01
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Gautham G.
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#FF6B00] text-black uppercase">
                    TIER IV • APEX HUNTER
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/50 font-mono mt-1">
                  14,820 Total Kilometers • 3 Bikes In Garage • 18 Group Rides Led
                </p>
              </div>
            </div>

            {/* XP Ring & Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-white/40">Current Level</div>
                <div className="text-2xl font-black font-mono text-white">Level 42</div>
                <div className="text-xs font-mono text-[#00E5FF]">4,850 / 6,000 XP to Track Legend</div>
              </div>

              {/* Progress bar */}
              <div className="w-36 h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF6B00] to-[#00E5FF] rounded-full" style={{ width: "81%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Achievement Badges */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10"
                      style={{ background: `${b.color}15`, color: b.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs font-bold text-white/40 group-hover:text-white transition-colors">
                      {b.xp}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {b.title}
                  </h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/40">Rarity: {b.tier}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Unlocked</span>
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
