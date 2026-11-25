import { ArrowRight, PhoneCall, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
      className="py-32 relative overflow-hidden bg-transparent" 
      style={{ 
        borderTop: "1px solid rgba(255, 255, 255, 0.04)"
      }}
    >
      {/* High-fidelity ambient radial glow: velvet plum and rose */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 900px 520px at 50% 50%, rgba(230, 92, 142, 0.28) 0%, rgba(166, 107, 142, 0.10) 50%, transparent 75%)",
        }}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 35 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 relative z-10 text-center max-w-4xl"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-wide text-white/75 border border-white/[0.1] bg-white/[0.035] mb-6 sm:mb-7"
          style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 shrink-0" />
          <span>Ready in 10 minutes · Keep your number</span>
        </div>

        <h2 
          className="text-[34px] sm:text-6xl lg:text-7xl font-bold mb-5 sm:mb-7 text-white tracking-[-0.035em] leading-[1.08]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Never let another client <br />
          <span className="bg-gradient-to-r from-[#FFF5FA] via-[#F9A8D4] to-[#E65C8E] bg-clip-text text-transparent">
            hear a busy signal again.
          </span>
        </h2>

        <p
          className="text-[15.5px] sm:text-[18.5px] text-white/[0.72] mb-8 sm:mb-10 max-w-[34ch] sm:max-w-[46ch] mx-auto font-normal leading-[1.6] tracking-[-0.01em]"
          style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
        >
          Give your front desk an extra set of hands and make sure every single caller gets booked.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-[340px] sm:max-w-none mx-auto">
          <button
            onClick={handleBookDemo}
            className="group w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-7 rounded-full font-semibold text-[14px] sm:text-[15px] text-white inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              background: "linear-gradient(180deg, #EC6B9A 0%, #C84374 100%)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 8px 24px -4px rgba(230, 92, 142, 0.48)",
            }}
          >
            <Calendar size={16} className="shrink-0" />
            <span>Book a Demo</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleTestCall}
              className="h-10 sm:h-12 px-3.5 sm:px-5 rounded-full font-medium text-[13px] sm:text-[14.5px] text-white/90 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] active:scale-[0.98] transition-all duration-200 inline-flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer border border-white/[0.12] hover:border-[#E65C8E]/45 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              <PhoneCall size={14} className="text-[#EC89B5] shrink-0 sm:w-[15px] sm:h-[15px]" />
              <span className="sm:hidden">Live Test Call</span>
              <span className="hidden sm:inline">Try a Live Test Call</span>
            </button>

            {isSubdomain ? (
              <a
                href={getUniverseUrl("/#products")}
                className="h-10 sm:h-12 px-3.5 sm:px-5 rounded-full text-white/75 hover:text-white font-medium text-[13px] sm:text-[14.5px] transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98] border border-white/[0.09] hover:border-white/25 bg-white/[0.025] hover:bg-white/[0.07] whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
              >
                <span>Explore Universe</span>
              </a>
            ) : (
              <Link
                to="/#products"
                className="h-10 sm:h-12 px-3.5 sm:px-5 rounded-full text-white/75 hover:text-white font-medium text-[13px] sm:text-[14.5px] transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98] border border-white/[0.09] hover:border-white/25 bg-white/[0.025] hover:bg-white/[0.07] whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
              >
                <span>Explore Universe</span>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
