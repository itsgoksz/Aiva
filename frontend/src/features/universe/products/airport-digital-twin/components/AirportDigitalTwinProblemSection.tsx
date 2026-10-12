import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Radio, 
  EyeOff 
} from 'lucide-react';

export default function AirportDigitalTwinProblemSection() {
  const [activeTab, setActiveTab] = useState<'legacy' | 'twin'>('twin');

  return (
    <section className="relative py-28 bg-[#050811] text-white overflow-hidden border-t border-white/[0.04]">
      {/* Background Subtle Radar Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-15"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, rgba(0, 229, 255, 0) 70%)' }}
        />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #00E5FF 1px, transparent 1px),
                              linear-gradient(to bottom, #00E5FF 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-[#00E5FF] mb-4">
            <Radio size={12} className="animate-pulse" />
            <span>SITUATIONAL AWARENESS GAP</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
            2D radar displays can't capture a living, multi-layered aerodrome.
          </h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            Every hour at Kempegowda International Airport, dozens of aircraft coordinate departures and arrivals across dual 4,000-meter runways while hundreds of ground vehicles traverse the apron. Yet operations still rely on flat 2D dots, disparate gate sheets, and isolated radio channels.
          </p>
        </div>

        {/* Interactive Comparison Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('legacy')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                activeTab === 'legacy'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Legacy 2D Feeds
            </button>
            <button
              onClick={() => setActiveTab('twin')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                activeTab === 'twin'
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Spatial Airport Twin
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-20">
          
          {/* Legacy Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              activeTab === 'legacy'
                ? 'bg-rose-950/[0.12] border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.08)]'
                : 'bg-white/[0.015] border-white/[0.06] opacity-75'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <EyeOff size={22} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400/80 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                  Fragmented & Latent
                </span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Flat 2D Radar & Disconnected Gate Sheets
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Controllers mentally translate flat top-down dots into 3D airspace reality, cross-referencing separate screens for gate readiness, weather radar, and apron pushback tugs.
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <span>Zero altitude perception on approach without manual label cross-checks</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <span>No spatial verification of wake turbulence separation behind wide-body heavies</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <span>Monsoon rain and wind-shear invisible until pilots report on frequency</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <span>Apron blind spots around Terminal 2 bamboo piers not covered by standard CCTV</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/20 font-mono text-xs text-rose-300/80">
              <span className="text-neutral-500 block text-[10px] uppercase mb-1">Impact at Kempegowda</span>
              Average 14-minute ground delay during peak arrivals when runway 09R/27L switch occurs.
            </div>
          </motion.div>

          {/* Spatial Twin Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              activeTab === 'twin'
                ? 'bg-[#00E5FF]/[0.03] border-[#00E5FF]/40 shadow-[0_0_40px_rgba(0,229,255,0.12)]'
                : 'bg-white/[0.015] border-white/[0.06] opacity-75'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                  <Layers size={22} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full border border-[#00E5FF]/30">
                  Geospatial Reality
                </span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Unified 3D Photogrammetry & Sub-Second Telemetry
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Streaming Google 3D photorealistic tiles fused with live ADS-B transponder telemetry, rendering real aircraft orientations, glide slopes, and apron taxiway movements in millimeters.
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-xs text-neutral-200">
                  <CheckCircle2 size={15} className="text-[#00E5FF] shrink-0 mt-0.5" />
                  <span>Exact 3.0° PAPI glideslope visualization with altitude vector ribbons</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-neutral-200">
                  <CheckCircle2 size={15} className="text-[#00E5FF] shrink-0 mt-0.5" />
                  <span>Real-time ICAO lighting (1.5s strobes, red/green nav lights, volumetric beams)</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-neutral-200">
                  <CheckCircle2 size={15} className="text-[#00E5FF] shrink-0 mt-0.5" />
                  <span>Dynamic solar azimuth and Open-Meteo rain scattering over Devanahalli</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-neutral-200">
                  <CheckCircle2 size={15} className="text-[#00E5FF] shrink-0 mt-0.5" />
                  <span>360° virtual tower and runway threshold spotter cameras with instant replay</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-[#00E5FF]/30 font-mono text-xs text-[#00E5FF]">
              <span className="text-neutral-500 block text-[10px] uppercase mb-1">Operational Advantage</span>
              Instant spatial consensus across ATC, apron managers, and ground pushback crews.
            </div>
          </motion.div>

        </div>

        {/* Airport Stats Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">Dual Runways</div>
            <div className="text-2xl font-semibold text-white tracking-tight mb-1">09L/27R & 09R/27L</div>
            <p className="text-xs text-neutral-400">4,000m Cat I/II/III all-weather precision runways</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-2">ADS-B Ingestion</div>
            <div className="text-2xl font-semibold text-white tracking-tight mb-1">100 km Radius</div>
            <p className="text-xs text-neutral-400">Continuous live transponder coverage over Karnataka</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">Spatial Coordinate Grid</div>
            <div className="text-2xl font-semibold text-white tracking-tight mb-1">WGS84 → ENU</div>
            <p className="text-xs text-neutral-400">Millimeter East-North-Up local tangent plane mapping</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-2">Terminal Architecture</div>
            <div className="text-2xl font-semibold text-white tracking-tight mb-1">T1 & T2 Garden</div>
            <p className="text-xs text-neutral-400">Procedural bamboo bell chandeliers and contact stands</p>
          </div>
        </div>

      </div>
    </section>
  );
}
