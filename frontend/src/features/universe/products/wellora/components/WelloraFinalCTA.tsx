import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface WelloraFinalCTAProps {
  onOpenDemo: () => void;
}

export default function WelloraFinalCTA({ onOpenDemo }: WelloraFinalCTAProps) {
  return (
    <section className="py-28 relative overflow-hidden bg-[#060C08] border-t border-white/[0.04]">
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2ECC71 0%, transparent 70%)' }}
      />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 mb-6 text-[11px] font-mono uppercase tracking-wider text-emerald-300">
          <Sparkles size={12} className="text-emerald-400" />
          <span>START TRACKING WITH PEACE OF MIND</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-tight">
          Eat intuitively. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-emerald-300 to-teal-200">
            Track effortlessly.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
          Trade tedious barcode scanners and guilt-inducing alarms for a natural conversational companion that actually understands whole foods.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-[#060C08] bg-[#2ECC71] hover:bg-[#27ae60] transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Request Early Beta Access</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-neutral-400 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Encrypted local storage</span>
          </span>
          <span className="text-neutral-600">•</span>
          <span>Zero third-party trackers</span>
          <span className="text-neutral-600">•</span>
          <span>No credit card required</span>
        </div>
      </div>
    </section>
  );
}
