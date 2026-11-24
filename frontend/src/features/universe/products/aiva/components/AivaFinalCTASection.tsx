import { ArrowRight, PhoneCall, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { isAivaSubdomain, getUniverseUrl } from "../../../../../lib/subdomain";

interface AivaFinalCTASectionProps {
  onOpenBookDemo?: () => void;
  onOpenTestCall?: () => void;
  onOpenDemo?: () => void;
}

export default function AivaFinalCTASection({ onOpenBookDemo, onOpenTestCall, onOpenDemo }: AivaFinalCTASectionProps) {
  const isSubdomain = isAivaSubdomain();
  const handleBookDemo = onOpenBookDemo || onOpenDemo || (() => {});
  const handleTestCall = onOpenTestCall || onOpenDemo || (() => {});
  return (
    <section 
      className="py-32 relative overflow-hidden" 
      style={{ 
        backgroundColor: "#0A0508",
        borderTop: "1px solid rgba(255, 255, 255, 0.04)"
      }}
    >
      {/* High-fidelity ambient radial glow: velvet plum and rose (zero purple haze) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 900px 520px at 50% 50%, rgba(230, 92, 142, 0.20) 0%, rgba(166, 107, 142, 0.06) 50%, transparent 75%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
          <span>DEPLOYMENT READY // ZERO DISRUPTION</span>
        </div>

        <h2 
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight leading-[1.1]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Never let another client <br />
          <span className="bg-gradient-to-r from-white/90 via-[#FCE7F3] to-[#E65C8E] bg-clip-text text-transparent">
            hear a busy signal again.
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Give your front desk an extra set of hands and make sure every single caller gets booked.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto">
          <button
            onClick={handleBookDemo}
            className="group w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-7 rounded-xl font-semibold text-sm sm:text-base text-white inline-flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
            style={{
              background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 8px 24px -4px rgba(230, 92, 142, 0.45)",
            }}
          >
            <Calendar size={17} className="shrink-0" />
            <span>Book a Demo</span>
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleTestCall}
            className="group w-full sm:w-auto h-12 sm:h-13 px-5 sm:px-6 rounded-xl font-medium text-sm sm:text-base text-white/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-200 inline-flex items-center justify-center gap-2.5 cursor-pointer border border-white/15 hover:border-[#E65C8E]/40 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <PhoneCall size={16} className="text-[#EC89B5] shrink-0" />
            <span>Try a Live Test Call</span>
          </button>

          {isSubdomain ? (
            <a
              href={getUniverseUrl("/#products")}
              className="group w-full sm:w-auto h-12 sm:h-13 px-5 sm:px-6 rounded-xl text-white/70 hover:text-white font-medium text-sm sm:text-base transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98] border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] whitespace-nowrap"
            >
              <span>Explore Universe</span>
            </a>
          ) : (
            <Link
              to="/#products"
              className="group w-full sm:w-auto h-12 sm:h-13 px-5 sm:px-6 rounded-xl text-white/70 hover:text-white font-medium text-sm sm:text-base transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98] border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] whitespace-nowrap"
            >
              <span>Explore Universe</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
