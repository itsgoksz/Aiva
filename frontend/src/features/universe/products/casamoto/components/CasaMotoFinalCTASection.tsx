import { ArrowRight, Flame } from "lucide-react";

interface CasaMotoFinalCTASectionProps {
  onOpenDemo: () => void;
}

export default function CasaMotoFinalCTASection({ onOpenDemo }: CasaMotoFinalCTASectionProps) {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Intense glow aura */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{ background: "#FF6B00" }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: "#00E5FF" }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FF6B00] border border-[#FF6B00]/20 bg-[#FF6B00]/5 mb-8 font-mono">
          <Flame size={14} />
          <span>Elevate Your Motorcycle Experience</span>
        </div>

        <h2 
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight leading-[1.1]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Stop guessing your oil intervals. <br />
          <span className="text-[#FF6B00]">Ride with total telemetry precision.</span>
        </h2>

        <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Join thousands of riders transforming their weekend rides and maintenance routines into an orchestrated, gamified experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#FF6B00] hover:bg-[#FFA800] text-black font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-[#FF6B00]/30 cursor-pointer"
          >
            <span>Request Early Access</span>
            <ArrowRight size={18} />
          </button>

          <a
            href="/#products"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-medium text-base transition-all duration-200 text-center"
          >
            Explore Other Universe Products
          </a>
        </div>
      </div>
    </section>
  );
}
