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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={handleBookDemo}
            className="group w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base sm:text-lg text-white transition-all duration-200 hover:bg-[#B882A2] active:opacity-90 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
            style={{
              backgroundColor: "#A66B8E",
              boxShadow: "0 10px 30px rgba(166, 107, 142, 0.35)",
            }}
          >
            <Calendar size={18} />
            <span>Book a Demo</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleTestCall}
            className="group w-full sm:w-auto px-7 py-4 rounded-xl font-medium text-base text-white/90 hover:text-white transition-all duration-200 hover:bg-white/[0.08] active:opacity-90 flex items-center justify-center gap-2.5 cursor-pointer border border-[#E65C8E]/30 hover:border-[#E65C8E]/60"
            style={{ background: "rgba(230, 92, 142, 0.08)" }}
          >
            <PhoneCall size={18} className="text-[#EC89B5]" />
            <span>Try a Live Test Call</span>
          </button>

          {isSubdomain ? (
            <a
              href={getUniverseUrl("/#products")}
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
            </a>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}
