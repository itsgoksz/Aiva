import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Zap, Thermometer, Battery, MessageSquare, CheckCircle2 } from 'lucide-react';

interface CockpitTelemetry {
  speedKmh: number;
  batterySoc: number;
  rangeKm: number;
  powerKw: number;
  cabinTemp: number;
  batteryTemp: number;
  regenKw: number;
}

export default function EvCopilotCockpitPreviewSection() {
  const [telemetry] = useState<CockpitTelemetry>({
    speedKmh: 94,
    batterySoc: 64,
    rangeKm: 284,
    powerKw: 18.2,
    cabinTemp: 21.5,
    batteryTemp: 31.8,
    regenKw: 0
  });

  const [activeVoicePrompt, setActiveVoicePrompt] = useState<number>(0);

  const VOICE_PROMPTS = [
    {
      driver: "Can we make it through the mountain pass without charging?",
      copilot: "You will crest the pass at 18% SoC. The downhill descent will regenerate ~4.2 kWh via regenerative braking, arriving at your hotel with 22% remaining. No extra charge stop required.",
      type: "Topography & Regen Simulation"
    },
    {
      driver: "What's the best charger within 50 km with clean coffee?",
      copilot: "Routing to the Shell Recharge 150kW station at Exit 42. It has two open CCS2 bays and is connected to a Blue Tokai roastery with high-speed WiFi. Charging time: 19 mins.",
      type: "Fast Charger & Lifestyle Pairing"
    },
    {
      driver: "Why did my predicted range drop by 15 km just now?",
      copilot: "Headwinds increased to 34 km/h and elevation gradient steepened to +3.8%. I have already factored this in — your reserve buffer remains safely above 12% at the destination.",
      type: "Dynamic Headwind Diagnostics"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#070913] border-t border-white/[0.04]">
      {/* Background glow */}
      <div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full blur-[180px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-violet-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            <span>IN-COCKPIT TELEMETRY & VOICE INTELLIGENCE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            A copilot that thinks like an experienced electric driver.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Real-time vehicle dynamics calculated continuously in the background, paired with conversational natural voice alerts.
          </p>
        </div>

        {/* Cockpit HUD Console */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0B0F22]/90 border border-violet-500/20 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          
          {/* Real-Time Live Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pb-6 mb-6 border-b border-white/[0.06]">
            {/* Speed */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>Cruising Speed</span>
                <Gauge size={13} className="text-[#00E5FF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                {telemetry.speedKmh} <span className="text-xs font-mono font-normal text-neutral-400">km/h</span>
              </div>
            </div>

            {/* Battery SoC */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>Battery Level</span>
                <Battery size={13} className="text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 mt-1">
                {telemetry.batterySoc}% <span className="text-xs font-mono font-normal text-neutral-400">({telemetry.rangeKm} km)</span>
              </div>
            </div>

            {/* Instant Draw */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>Current Draw</span>
                <Zap size={13} className="text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                {telemetry.powerKw} <span className="text-xs font-mono font-normal text-neutral-400">kW</span>
              </div>
            </div>

            {/* Pack Temperature */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>Cell Temperature</span>
                <Thermometer size={13} className="text-[#6D5EF7]" />
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-[#00E5FF] mt-1">
                {telemetry.batteryTemp}°C <span className="text-[10px] font-mono text-emerald-400 block sm:inline">Preheated</span>
              </div>
            </div>
          </div>

          {/* Interactive Voice Assistant Dialogue Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Prompt Selector */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                TEST IN-COCKPIT VOICE SCENARIOS:
              </div>
              {VOICE_PROMPTS.map((item, idx) => {
                const isSelected = activeVoicePrompt === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveVoicePrompt(idx)}
                    className={`w-full p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-violet-600/20 border-violet-400/50 text-white shadow-md shadow-violet-600/20'
                        : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-xs font-semibold truncate mb-1">"{item.driver}"</div>
                    <div className="text-[10px] font-mono text-[#00E5FF]">{item.type}</div>
                  </button>
                );
              })}
            </div>

            {/* Right Chat Bubble */}
            <div className="lg:col-span-7">
              <div className="p-5 rounded-2xl bg-black/50 border border-white/[0.08] relative">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-[11px] font-mono">
                  <span className="text-violet-300 font-medium flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-[#00E5FF]" />
                    <span>IN-VEHICLE NATURAL VOICE COPILOT</span>
                  </span>
                  <span className="text-neutral-500">Offline Ollama Engine</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-end">
                    <div className="p-3 rounded-xl bg-violet-600/20 border border-violet-500/30 text-white text-xs sm:text-sm max-w-[85%]">
                      "{VOICE_PROMPTS[activeVoicePrompt].driver}"
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeVoicePrompt}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="flex justify-start"
                    >
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-neutral-200 text-xs sm:text-sm leading-relaxed max-w-[92%]">
                        <div className="text-[10px] font-mono text-[#00E5FF] mb-1.5 uppercase tracking-wider font-semibold">
                          Copilot Guidance
                        </div>
                        {VOICE_PROMPTS[activeVoicePrompt].copilot}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 size={13} />
                    <span>Calculated with 3D elevation profile</span>
                  </span>
                  <span>Zero lag</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
