import { ArrowRight, Sparkles } from "lucide-react";

interface AivaFinalCTASectionProps {
  onOpenDemo: () => void;
}

export default function AivaFinalCTASection({ onOpenDemo }: AivaFinalCTASectionProps) {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: "#0A0508" }}>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{ background: "#A66B8E" }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: "#6366F1" }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#EC89B5] border border-[#A66B8E]/30 bg-[#A66B8E]/10 mb-8 font-mono">
          <Sparkles size={14} />
          <span>Get Started Today</span>
        </div>

        <h2 
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight leading-[1.1]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Never let another client <br />
          <span className="text-[#EC89B5]">hear a busy signal again.</span>
        </h2>

        <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Give your front desk an extra set of hands and make sure every single caller gets booked.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#A66B8E] hover:bg-[#B882A2] text-white font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-[#A66B8E]/30 cursor-pointer"
          >
            <span>Try a Live Test Call</span>
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
