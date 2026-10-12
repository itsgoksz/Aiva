import { useState } from "react";
import { motion } from "framer-motion";
import { Check, RotateCcw, Tag } from "lucide-react";

interface ComponentItem {
  id: string;
  name: string;
  spec: string;
  currentKm: number;
  maxKm: number;
  condition: "optimal" | "warning" | "critical";
  lastServiced: string;
}

const INITIAL_COMPONENTS: ComponentItem[] = [
  {
    id: "oil",
    name: "Engine Oil & Filter",
    spec: "Motul 300V 15W-50 Factory Line",
    currentKm: 3200,
    maxKm: 6000,
    condition: "optimal",
    lastServiced: "11,620 km"
  },
  {
    id: "chain",
    name: "Chain Clean & Tension",
    spec: "DID 525 ZVMX Gold X-Ring",
    currentKm: 420,
    maxKm: 500,
    condition: "warning",
    lastServiced: "14,400 km"
  },
  {
    id: "brakes",
    name: "Front Brake Pads",
    spec: "Brembo Z04 Sintered Racing",
    currentKm: 4100,
    maxKm: 12000,
    condition: "optimal",
    lastServiced: "10,720 km"
  },
  {
    id: "tyres",
    name: "Tire Set (Front + Rear)",
    spec: "Pirelli Diablo Supercorsa SP V3",
    currentKm: 3800,
    maxKm: 5500,
    condition: "warning",
    lastServiced: "11,020 km"
  },
  {
    id: "coolant",
    name: "Engine Coolant",
    spec: "Engine Ice High Performance",
    currentKm: 14820,
    maxKm: 24000,
    condition: "optimal",
    lastServiced: "Factory Spec"
  },
  {
    id: "brake_fluid",
    name: "Brake Fluid (DOT 5.1)",
    spec: "Castrol SRF Racing Fluid",
    currentKm: 7800,
    maxKm: 10000,
    condition: "optimal",
    lastServiced: "7,020 km"
  }
];

const MODS = [
  { part: "Akrapovič Titanium Slip-On Exhaust", category: "Performance", cost: "₹72,000", date: "Aug 2025", gain: "+6.2 HP • -4.1 kg" },
  { part: "Brembo 19RCS Corsa Corta Master Cylinder", category: "Brakes", cost: "₹34,000", date: "Oct 2025", gain: "Adjustable Bite Point" },
  { part: "Evotech Performance Radiator & Oil Cooler Guards", category: "Protection", cost: "₹14,500", date: "May 2025", gain: "Debris Armor" },
  { part: "Sprint Filter P08 High-Flow Air Filter", category: "Intake", cost: "₹8,500", date: "Nov 2025", gain: "Increased Airflow" },
  { part: "Domino Racing Dual Compound Grips", category: "Cockpit", cost: "₹2,800", date: "Jan 2026", gain: "Vibration Dampening" },
];

export default function CasaMotoGarageSection() {
  const [components, setComponents] = useState<ComponentItem[]>(INITIAL_COMPONENTS);
  const [activeTab, setActiveTab] = useState<"health" | "build" | "costs">("health");
  const [serviceMessage, setServiceMessage] = useState<string | null>(null);

  const handleQuickService = (id: string, name: string) => {
    setComponents((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, currentKm: 0, condition: "optimal", lastServiced: "Just now (14,820 km)" }
          : c
      )
    );
    setServiceMessage(`Marked ${name} as freshly serviced! Component health reset to 100%.`);
    setTimeout(() => setServiceMessage(null), 3500);
  };

  const handleReset = () => {
    setComponents(INITIAL_COMPONENTS);
  };

  return (
    <section id="garage-demo" className="py-28 relative overflow-hidden" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Decorative ambient lighting */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{ background: "#FF6B00" }}
      />
      <div 
        className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{ background: "#00E5FF" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#00E5FF] border border-[#00E5FF]/20 bg-[#00E5FF]/5 mb-4 font-mono">
            Interactive Digital Garage
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Live Component Health Bars. <br />
            <span className="text-white/40">Turn maintenance into a visual science.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Never guess when your chain needs lube or when your pads are thinning. 
            CasaMoto tracks exact wear based on ridden distance, conditions, and manufacturer tolerances.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("health")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "health"
                    ? "bg-[#FF6B00] text-black shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Component Wear Engine
              </button>
              <button
                onClick={() => setActiveTab("build")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "build"
                    ? "bg-[#FF6B00] text-black shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                The Build Sheet & Mods
              </button>
              <button
                onClick={() => setActiveTab("costs")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "costs"
                    ? "bg-[#FF6B00] text-black shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Lifetime Cost Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Feedback notification toast */}
        {serviceMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-md mx-auto p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono text-center flex items-center justify-center gap-2 shadow-lg backdrop-blur-xl"
          >
            <Check size={14} className="text-emerald-400" />
            <span>{serviceMessage}</span>
          </motion.div>
        )}

        {/* Tab 1: Component Wear Engine */}
        {activeTab === "health" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                Active Vehicle: Ducati Panigale V4 S (14,820 km)
              </span>
              <button
                onClick={handleReset}
                className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset Demo State</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {components.map((comp) => {
                const remainingKm = Math.max(0, comp.maxKm - comp.currentKm);
                const healthPercent = Math.max(0, Math.round(((comp.maxKm - comp.currentKm) / comp.maxKm) * 100));
                
                const isWarning = healthPercent < 25;
                const isDueSoon = healthPercent < 50;

                return (
                  <motion.div
                    key={comp.id}
                    layout
                    className="p-6 rounded-3xl border border-white/[0.08] relative overflow-hidden backdrop-blur-2xl flex flex-col justify-between"
                    style={{
                      background: "linear-gradient(155deg, rgba(20, 24, 34, 0.6) 0%, rgba(10, 12, 18, 0.85) 100%)",
                    }}
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h4 className="text-base font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {comp.name}
                          </h4>
                          <p className="text-xs text-white/40 font-mono mt-0.5">{comp.spec}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span 
                            className={`font-mono text-sm font-black ${
                              isWarning ? "text-red-400" : isDueSoon ? "text-[#FF6B00]" : "text-emerald-400"
                            }`}
                          >
                            {healthPercent}%
                          </span>
                        </div>
                      </div>

                      {/* Health Progress Bar */}
                      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden my-4">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isWarning 
                              ? "bg-gradient-to-r from-red-500 to-[#FF6B00]" 
                              : isDueSoon 
                              ? "bg-gradient-to-r from-[#FF6B00] to-amber-300" 
                              : "bg-gradient-to-r from-emerald-400 to-[#00E5FF]"
                          }`}
                          style={{ width: `${healthPercent}%` }}
                        />
                      </div>

                      {/* Mileage Details */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-white/60 mb-5">
                        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                          <div className="text-white/30 text-[9px] uppercase">Ridden</div>
                          <div className="font-semibold text-white/90">{comp.currentKm.toLocaleString()} km</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                          <div className="text-white/30 text-[9px] uppercase">Remaining</div>
                          <div className={`font-semibold ${isWarning ? "text-red-400" : "text-white/90"}`}>
                            {remainingKm.toLocaleString()} km
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-white/35 font-mono">
                        Last: {comp.lastServiced}
                      </span>
                      <button
                        onClick={() => handleQuickService(comp.id, comp.name)}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-[#FF6B00] hover:text-black text-white/80 text-xs font-medium font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check size={12} />
                        <span>Log Service</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: The Build Sheet & Mods */}
        {activeTab === "build" && (
          <div 
            className="rounded-3xl border border-white/[0.08] p-6 sm:p-10 backdrop-blur-2xl"
            style={{ background: "rgba(12, 15, 23, 0.75)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
              <div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  The Verified Build Sheet
                </h3>
                <p className="text-sm text-white/50 mt-1 font-light">
                  5 Aftermarket Upgrades Installed • Total Mod Investment: ₹1,85,000
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs font-semibold">
                <Tag size={14} />
                <span>Verified Resale Value: +₹1,20,000</span>
              </div>
            </div>

            <div className="space-y-3">
              {MODS.map((mod, i) => (
                <div
                  key={mod.part}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono text-xs text-[#FF6B00] font-bold">
                      0{i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{mod.part}</div>
                      <div className="flex items-center gap-2 text-xs text-white/40 font-mono mt-0.5">
                        <span className="text-[#00E5FF]">{mod.category}</span>
                        <span>•</span>
                        <span>Installed {mod.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {mod.gain}
                    </span>
                    <span className="font-mono text-base font-bold text-white">{mod.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Lifetime Cost Analytics */}
        {activeTab === "costs" && (
          <div 
            className="rounded-3xl border border-white/[0.08] p-6 sm:p-10 backdrop-blur-2xl"
            style={{ background: "rgba(12, 15, 23, 0.75)" }}
          >
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-white/40 uppercase mb-1">Total Fuel Spent</div>
                <div className="text-3xl font-black font-mono text-white">₹48,500</div>
                <p className="text-xs text-white/50 mt-1 font-mono">14,820 km @ 16.2 km/L avg</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-white/40 uppercase mb-1">Routine Servicing & Consumables</div>
                <div className="text-3xl font-black font-mono text-[#00E5FF]">₹32,000</div>
                <p className="text-xs text-white/50 mt-1 font-mono">Oil, filters, pads, chain care</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-white/40 uppercase mb-1">Performance Modifications</div>
                <div className="text-3xl font-black font-mono text-[#FF6B00]">₹1,85,000</div>
                <p className="text-xs text-white/50 mt-1 font-mono">5 modifications itemized</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/5">
              <h4 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                True Cost Per Kilometer (CPK)
              </h4>
              <p className="text-xs sm:text-sm text-white/60 mb-6 font-light">
                CasaMoto gives you the crystal-clear operational cost of running your motorcycle, eliminating end-of-year surprise bills.
              </p>

              <div className="flex items-center gap-4">
                <div className="text-2xl font-black font-mono text-emerald-400">₹3.40 / km</div>
                <div className="h-4 w-px bg-white/10" />
                <div className="text-xs font-mono text-white/50">
                  Comprehensive (Fuel + Maintenance + Insurance amortization)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
