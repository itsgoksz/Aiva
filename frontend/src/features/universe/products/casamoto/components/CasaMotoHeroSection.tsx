import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Wrench, Radio, Zap, ShieldCheck, Compass, Play, ChevronRight } from "lucide-react";

interface CasaMotoHeroSectionProps {
  onOpenDemo: () => void;
}

const BIKES = [
  { id: "ducati", name: "Ducati Panigale V4 S", cc: "1,103cc", power: "215 HP", odo: "14,820 km", color: "#FF334B" },
  { id: "ktm", name: "KTM 390 Duke", cc: "399cc", power: "45 HP", odo: "8,450 km", color: "#FF6B00" },
  { id: "triumph", name: "Triumph Street Triple 765", cc: "765cc", power: "128 HP", odo: "21,190 km", color: "#00E5FF" },
];

export default function CasaMotoHeroSection({ onOpenDemo }: CasaMotoHeroSectionProps) {
  const [selectedBike, setSelectedBike] = useState(BIKES[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simKm, setSimKm] = useState(0);

  const handleSimulateTrip = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 25;
      setSimKm(count);
      if (count >= 150) {
        clearInterval(interval);
        setTimeout(() => setIsSimulating(false), 800);
      }
    }, 120);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Background Gradients & Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div 
          className="absolute top-[-15%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] rounded-full blur-[160px] opacity-25"
          style={{ background: "radial-gradient(circle, #FF6B00 0%, rgba(255, 107, 0, 0.05) 70%, transparent 100%)" }}
        />
        <div 
          className="absolute bottom-[-10%] right-[10%] w-[45vw] h-[45vw] max-w-[600px] rounded-full blur-[140px] opacity-15"
          style={{ background: "radial-gradient(circle, #00E5FF 0%, rgba(0, 229, 255, 0.05) 70%, transparent 100%)" }}
        />
        {/* Subtle checkered race grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 border border-white/10"
                style={{
                  background: "rgba(255, 107, 0, 0.08)",
                  boxShadow: "0 0 25px rgba(255, 107, 0, 0.15)",
                }}
              >
                <Flame className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
                  CasaMoto • The Motorcycle OS & Digital Garage
                </span>
              </div>

              {/* Headline */}
              <h1 
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.08]"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                Your Bike's Ultimate <br />
                <span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#00E5FF]"
                >
                  Digital Garage & Ride OS.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl mb-9 max-w-2xl mx-auto lg:mx-0 font-light text-white/70 leading-relaxed">
                Replace fragmented spreadsheets, messy WhatsApp ride pins, and lost receipts. 
                CasaMoto combines <strong className="text-white font-medium">real-time component wear tracking</strong>, 
                <strong className="text-white font-medium"> lifetime build analytics</strong>, and 
                <strong className="text-white font-medium"> tactical group ride radar</strong> into a high-performance cockpit.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button
                  onClick={onOpenDemo}
                  className="px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-black flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  style={{
                    backgroundColor: "#FF6B00",
                    boxShadow: "0 10px 30px rgba(255, 107, 0, 0.35)",
                  }}
                >
                  <span>Get Early Access</span>
                  <ChevronRight size={18} />
                </button>

                <a
                  href="#garage-demo"
                  className="px-7 py-4 rounded-xl font-medium text-base transition-all hover:bg-white/[0.08] active:scale-[0.98] w-full sm:w-auto text-white/90 border border-white/10 flex items-center justify-center gap-2"
                  style={{ background: "rgba(255, 255, 255, 0.03)" }}
                >
                  <Wrench size={18} className="text-[#FF6B00]" />
                  <span>Inspect Garage Demo</span>
                </a>
              </div>

              {/* Quick Spec Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/40 mb-1 font-mono">Sync</div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Radio size={14} className="text-[#00E5FF] animate-pulse" />
                    <span>Live GPS Mesh</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/40 mb-1 font-mono">Wear Engine</div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Zap size={14} className="text-[#FF6B00]" />
                    <span>Real-time Telemetry</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/40 mb-1 font-mono">Build Book</div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>100% Verified Log</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Digital Cockpit */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full max-w-xl mx-auto"
            >
              {/* Outer Glowing Housing */}
              <div 
                className="rounded-3xl p-6 sm:p-7 relative overflow-hidden backdrop-blur-2xl border border-white/10 shadow-2xl"
                style={{
                  background: "linear-gradient(145deg, rgba(16, 18, 26, 0.85) 0%, rgba(8, 10, 15, 0.92) 100%)",
                  boxShadow: "0 30px 100px -20px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(255, 107, 0, 0.15)",
                }}
              >
                {/* Header: OS Status & Bike Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B00] font-bold">
                      CASAMOTO OS • v2.4
                    </span>
                  </div>

                  {/* Bike selector tabs */}
                  <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                    {BIKES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBike(b)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${
                          selectedBike.id === b.id 
                            ? "bg-[#FF6B00] text-black font-semibold shadow-sm" 
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        {b.id.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bike Title & Live Odometer */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {selectedBike.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-white/50 mt-1 font-mono">
                      <span>{selectedBike.cc}</span>
                      <span>•</span>
                      <span>{selectedBike.power}</span>
                      <span>•</span>
                      <span className="text-[#00E5FF]">DESMO DOHC</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Odometer</div>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                      {isSimulating ? (14820 + simKm).toLocaleString() : selectedBike.odo}
                    </div>
                    {simKm > 0 && (
                      <div className="text-[10px] text-[#FF6B00] font-mono">+{simKm} km logged</div>
                    )}
                  </div>
                </div>

                {/* Component Wear HUD Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* Engine Oil */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/60 font-medium">Engine Oil (Motul 300V)</span>
                      <span className="font-mono text-[#00E5FF] font-semibold">
                        {Math.max(10, 84 - Math.floor(simKm / 10))}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00E5FF] to-emerald-400 rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(10, 84 - Math.floor(simKm / 10))}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-white/40 mt-1.5 flex justify-between font-mono">
                      <span>Healthy</span>
                      <span>Next: 18,000 km</span>
                    </div>
                  </div>

                  {/* Chain Tension & Lube */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/60 font-medium">Chain Lube</span>
                      <span className="font-mono text-[#FF6B00] font-bold">
                        {Math.max(5, 38 - Math.floor(simKm / 6))}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF6B00] to-red-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(5, 38 - Math.floor(simKm / 6))}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-[#FF6B00] mt-1.5 flex justify-between font-mono">
                      <span>Due in 120 km</span>
                      <span>DID 525 ZVMX</span>
                    </div>
                  </div>

                  {/* Brake Pads */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/60 font-medium">Brembo Stylema Pads</span>
                      <span className="font-mono text-emerald-400 font-semibold">74%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: "74%" }} />
                    </div>
                    <div className="text-[10px] text-white/40 mt-1.5 flex justify-between font-mono">
                      <span>4.8mm thickness</span>
                      <span>Optimum</span>
                    </div>
                  </div>

                  {/* Tyres */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/60 font-medium">Pirelli Supercorsa V3</span>
                      <span className="font-mono text-white/80 font-semibold">
                        {Math.max(10, 68 - Math.floor(simKm / 8))}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-[#FF6B00] rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(10, 68 - Math.floor(simKm / 8))}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-white/40 mt-1.5 flex justify-between font-mono">
                      <span>33 PSI Front • 37 Rear</span>
                      <span>Warm</span>
                    </div>
                  </div>
                </div>

                {/* Active Group Ride Banner & Simulator Trigger */}
                <div 
                  className="p-4 rounded-2xl border border-[#FF6B00]/30 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4"
                  style={{
                    background: "linear-gradient(90deg, rgba(255, 107, 0, 0.12) 0%, rgba(0, 229, 255, 0.08) 100%)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] shrink-0">
                      <Compass size={20} className="animate-spin" style={{ animationDuration: "12s" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Sunday Dawn Twisties</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#FF6B00] text-black font-extrabold uppercase">
                          Live Radar
                        </span>
                      </div>
                      <p className="text-[11px] text-white/60 mt-0.5">
                        5 Riders Active • Lead: Ghost_01 • Next Stop: CCD Ghats (18 km)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulateTrip}
                    disabled={isSimulating}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] active:scale-95 text-white font-mono text-xs flex items-center justify-center gap-2 border border-white/10 transition-all cursor-pointer shrink-0"
                  >
                    <Play size={13} className={isSimulating ? "animate-spin text-[#FF6B00]" : "text-[#FF6B00]"} />
                    <span>{isSimulating ? "Simulating +150km..." : "Simulate 150km Ride"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
