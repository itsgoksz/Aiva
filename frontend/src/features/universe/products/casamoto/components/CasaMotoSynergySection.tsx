

export default function CasaMotoSynergySection() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[220px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #FF6B00 0%, #00E5FF 100%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#00E5FF] border border-[#00E5FF]/20 bg-[#00E5FF]/5 mb-4 font-mono">
            How It All Works Together
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tracking rides automatically updates your maintenance. <br />
            <span className="text-white/40">No manual logging. Just ride.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Every kilometer you ride actively updates your mechanical ecosystem in real-time.
          </p>
        </div>

        {/* 4-Step Visual Synergy Pipeline */}
        <div className="grid md:grid-cols-4 gap-6 relative mb-16">
          {/* Step 1 */}
          <div className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/15 text-[#FF6B00] flex items-center justify-center font-mono font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Ride Tracked
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                You complete a 280km mountain pass with your riding crew on Sunday morning.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-[#FF6B00]">
              +280 km GPS Verified
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#00E5FF]/15 text-[#00E5FF] flex items-center justify-center font-mono font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Automatic Wear Updates
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                The wear engine calculates tyre stress, chain friction, and engine oil degradation automatically.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-[#00E5FF]">
              Tyres: -4% • Oil: -3%
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Smart Service Alerts
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                A subtle, intelligent push ping notifies you: <em className="text-white/80">"Chain lube due before your next canyon run."</em>
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-amber-400">
              1-Tap Service Logging
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Rider XP & Tiers
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                You gain 350 Rider XP, unlocking the "Canyon Carver Tier III" badge and leveling up your rider profile.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-emerald-400">
              +350 XP Level Progress
            </div>
          </div>
        </div>

        {/* Big Highlight Banner */}
        <div 
          className="rounded-3xl border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255, 107, 0, 0.08) 0%, rgba(0, 229, 255, 0.05) 100%)",
          }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Built Exclusively for the Anatomy of a Motorcyclist.
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Other apps treat motorcycles like 4-wheeled economy sedans. CasaMoto understands wet clutches, 
            chain tension tolerances, countersteering lean telemetry, and the camaraderie of pack riding.
          </p>
        </div>
      </div>
    </section>
  );
}
