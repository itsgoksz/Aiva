import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";

interface CasaMotoFinalCTASectionProps {
  onOpenDemo: () => void;
}

export default function CasaMotoFinalCTASection({ onOpenDemo }: CasaMotoFinalCTASectionProps) {
  return (
    <section 
      className="py-32 relative overflow-hidden" 
      style={{ 
        backgroundColor: "var(--color-bg-primary)",
        borderTop: "1px solid rgba(255, 255, 255, 0.04)"
      }}
    >
      {/* High-fidelity ambient radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 900px 520px at 50% 50%, rgba(255, 107, 0, 0.22) 0%, rgba(0, 229, 255, 0.10) 45%, transparent 75%)",
        }}
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
            className="group w-full sm:w-auto px-9 py-4 rounded-xl font-semibold text-base sm:text-lg text-black transition-all duration-200 hover:bg-[#FFA800] active:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
            style={{
              backgroundColor: "#FF6B00",
              boxShadow: "0 10px 30px rgba(255, 107, 0, 0.35)",
            }}
          >
            <span>Request Early Access</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <Link
            to="/#products"
            className="group w-full sm:w-auto px-8 py-4 rounded-xl text-white/90 hover:text-white font-medium text-base transition-all duration-200 text-center flex items-center justify-center cursor-pointer active:opacity-90"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255, 255, 255, 0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255, 255, 255, 0.12)";
            }}
          >
            <span>Explore Other Universe Products</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
