import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';

interface EvCopilotFinalCTAProps {
  onOpenDemo: () => void;
}

export default function EvCopilotFinalCTA({ onOpenDemo }: EvCopilotFinalCTAProps) {
  return (
    <section className="py-28 relative overflow-hidden bg-[#070913] border-t border-white/[0.04]">
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6D5EF7 0%, transparent 70%)' }}
      />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-950/20 mb-6 text-[11px] font-mono uppercase tracking-wider text-violet-300">
          <Zap size={12} className="text-[#00E5FF]" />
          <span>LEAVE RANGE ANXIETY IN THE REAR-VIEW MIRROR</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-tight">
          Electric road trips, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5EF7] via-[#00E5FF] to-sky-300">
            finally perfected.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
          Accurate battery modeling, verified high-speed charging hubs, and curated coffee stops. Hit the highway with total confidence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-white bg-[#6D5EF7] hover:bg-[#5846f5] transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Launch Route Simulator</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-neutral-400 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#00E5FF]" />
            <span>OpenChargeMap verified</span>
          </span>
          <span className="text-neutral-600">•</span>
          <span>Google Maps 1-click sync</span>
          <span className="text-neutral-600">•</span>
          <span>Offline voice support</span>
        </div>
      </div>
    </section>
  );
}
