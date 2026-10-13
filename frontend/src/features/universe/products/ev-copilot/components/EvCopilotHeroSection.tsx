import { useState } from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging, Navigation, Zap, Coffee, ChevronRight, Gauge, ExternalLink } from 'lucide-react';

interface RouteScenario {
  id: string;
  name: string;
  distance: string;
  duration: string;
  elevationGain: string;
  chargerName: string;
  chargerPower: string;
  chargeTime: string;
  arrivalSoc: number;
  departSoc: number;
  lifestyleStop: string;
  lifestyleType: string;
  voiceAlert: string;
}

const SCENARIOS: RouteScenario[] = [
  {
    id: 'coorg',
    name: 'Bangalore → Coorg',
    distance: '264 km',
    duration: '5h 15m',
    elevationGain: '+1,150 m climb',
    chargerName: 'Tata Power 150kW Dual Gun (Mysore Bypass)',
    chargerPower: '150 kW DC Fast',
    chargeTime: '21 mins (Peak curve)',
    arrivalSoc: 16,
    departSoc: 80,
    lifestyleStop: 'Subbaiah Kaapi House & Artisan Bakery',
    lifestyleType: '30m walk from charging bay',
    voiceAlert: 'Western Ghats ascent will consume ~18 kWh. Charging stop scheduled at Mysore bypass for 21 minutes while you grab coffee.'
  },
  {
    id: 'ooty',
    name: 'Bangalore → Ooty (Nilgiris)',
    distance: '278 km',
    duration: '5h 40m',
    elevationGain: '+1,850 m climb',
    chargerName: 'Zeon Charging 150kW Dual Gun (Gundlupet Bypass)',
    chargerPower: '150 kW DC Fast',
    chargeTime: '22 mins (Peak curve)',
    arrivalSoc: 14,
    departSoc: 82,
    lifestyleStop: 'Café Coffee Day & Nilgiri Bakers',
    lifestyleType: 'Directly attached to charging bay',
    voiceAlert: 'Nilgiri 36-hairpin climb will consume ~21 kWh. Preconditioning initiated for Gundlupet 150kW DC charger before the ghat section.'
  }
];

interface EvCopilotHeroSectionProps {
  onOpenDemo: () => void;
}

export default function EvCopilotHeroSection({ onOpenDemo }: EvCopilotHeroSectionProps) {
  const [selectedRoute, setSelectedRoute] = useState<RouteScenario>(SCENARIOS[0]);
  const [isPreconditioning, setIsPreconditioning] = useState(true);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#070913]">
      {/* Cyber Cockpit Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[15%] left-[25%] w-[650px] h-[650px] rounded-full blur-[150px] opacity-25"
          style={{ background: 'radial-gradient(circle, #6D5EF7 0%, rgba(109, 94, 247, 0) 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[15%] w-[550px] h-[550px] rounded-full blur-[160px] opacity-20"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, rgba(0, 229, 255, 0) 70%)' }}
        />
        {/* Cockpit HUD Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(109, 94, 247, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(109, 94, 247, 0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Vision & Narrative */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/40 backdrop-blur-md mb-6 shadow-sm shadow-violet-950/50"
            >
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-violet-300">
                MULTI-AGENT EV TRAVEL CO-PILOT
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08] mb-6"
            >
              The road trip copilot that respects your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5EF7] via-[#00E5FF] to-sky-300 font-semibold">
                charging curve.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8"
            >
              Never wait around in a deserted highway truck stop. EV Copilot models your battery drain against elevation, wind, and HVAC — scheduling ultra-fast 150kW+ chargers paired with curated coffee stops.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <button
                onClick={onOpenDemo}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors duration-200 hover:bg-[#5846f5] active:opacity-90 flex items-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: "#6D5EF7",
                  boxShadow: "0 8px 24px rgba(109, 94, 247, 0.35)",
                }}
              >
                <Zap size={16} className="text-[#00E5FF]" />
                <span>Simulate Route & Charging</span>
              </button>

              <a
                href="#architecture"
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>How the Agent Bus Works</span>
                <ChevronRight size={16} />
              </a>
            </motion.div>

            {/* Spec Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-4 border-t border-white/[0.08] text-left"
            >
              <div>
                <div className="text-xl font-bold font-mono text-[#00E5FF]">150kW+</div>
                <div className="text-xs text-neutral-400 mt-0.5">DC Fast verified</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-white">&lt;22 mins</div>
                <div className="text-xs text-neutral-400 mt-0.5">Optimal dwell time</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-[#6D5EF7]">1-Click</div>
                <div className="text-xs text-neutral-400 mt-0.5">Google Maps sync</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: In-Cockpit HUD Simulator */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl p-6 sm:p-7 bg-[#0B0F22]/90 border border-violet-500/25 backdrop-blur-xl shadow-2xl shadow-violet-950/50"
            >
              {/* Header HUD Bar */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.07]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-[#00E5FF]">
                    <Gauge size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-violet-300 font-semibold">
                      IN-COCKPIT ROUTE & TELEMETRY HUD
                    </div>
                    <div className="text-xs text-neutral-400">Switch corridor scenario below</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Telemetry Live</span>
                </div>
              </div>

              {/* Scenario Toggle */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {SCENARIOS.map((s) => {
                  const isSelected = selectedRoute.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedRoute(s)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer border ${
                        isSelected
                          ? 'bg-violet-600/20 border-violet-400/50 text-white shadow-md shadow-violet-600/20'
                          : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="truncate font-semibold">{s.name}</div>
                      <div className="text-[10px] font-mono text-[#00E5FF] mt-0.5">{s.distance} • {s.elevationGain}</div>
                    </button>
                  );
                })}
              </div>

              {/* Battery State of Charge (SoC) Telemetry Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] mb-5">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <BatteryCharging size={14} className="text-[#00E5FF]" />
                    <span>OPTIMIZED FAST-CHARGE STOP</span>
                  </span>
                  <span className="text-[#00E5FF] font-semibold">{selectedRoute.chargeTime}</span>
                </div>

                <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 mb-3">
                  <div className="text-xs text-white font-medium mb-1">{selectedRoute.chargerName}</div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span className="text-emerald-400 font-semibold">{selectedRoute.chargerPower}</span>
                    <span>10% → 80% Peak Curve</span>
                  </div>
                </div>

                {/* Battery Progression Bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                    <span>Arrival: <strong className="text-amber-400">{selectedRoute.arrivalSoc}% SoC</strong></span>
                    <span>Departure: <strong className="text-emerald-400">{selectedRoute.departSoc}% SoC</strong></span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                    <div style={{ width: `${selectedRoute.arrivalSoc}%` }} className="bg-amber-400 h-full" />
                    <div style={{ width: `${selectedRoute.departSoc - selectedRoute.arrivalSoc}%` }} className="bg-[#00E5FF] h-full" />
                  </div>
                </div>
              </div>

              {/* Curated Lifestyle Stop & Preconditioning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {/* Lifestyle Card */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1.5">
                    <Coffee size={13} />
                    <span>PAIRED STOP</span>
                  </div>
                  <div className="text-xs font-semibold text-white truncate">
                    {selectedRoute.lifestyleStop}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">
                    {selectedRoute.lifestyleType}
                  </div>
                </div>

                {/* Preconditioning Toggle */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-mono text-[#00E5FF]">
                    <span className="flex items-center gap-1.5">
                      <Zap size={13} />
                      <span>PRECONDITIONING</span>
                    </span>
                    <button
                      onClick={() => setIsPreconditioning(!isPreconditioning)}
                      className={`w-6 h-3.5 rounded-full transition-colors cursor-pointer relative ${
                        isPreconditioning ? 'bg-[#00E5FF]' : 'bg-white/20'
                      }`}
                    >
                      <div 
                        className={`w-2.5 h-2.5 rounded-full bg-black absolute top-0.5 transition-transform ${
                          isPreconditioning ? 'left-3' : 'left-0.5'
                        }`} 
                      />
                    </button>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    {isPreconditioning ? 'Heated to 32°C for max charge speed' : 'Standard ambient cell temperature'}
                  </div>
                </div>
              </div>

              {/* Voice Alert Snippet */}
              <div className="p-3 rounded-xl bg-black/50 border border-white/[0.05] text-xs text-neutral-300 flex items-start gap-2.5">
                <Navigation size={14} className="text-violet-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">"{selectedRoute.voiceAlert}"</span>
              </div>

              {/* Google Maps Deep Link Sync */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">Google Maps Waypoint Protocol</span>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(selectedRoute.name.split('→')[0].trim())}&destination=${encodeURIComponent(selectedRoute.name.split('→')[1].trim())}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#00E5FF] hover:underline"
                >
                  <span>Sync to Navigation</span>
                  <ExternalLink size={12} />
                </a>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
