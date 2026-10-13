import { motion } from 'framer-motion';
import { Plane, Radio, ExternalLink } from 'lucide-react';

interface AirportDigitalTwinFinalCTAProps {
  onOpenDemo: () => void;
}

export default function AirportDigitalTwinFinalCTA({ onOpenDemo }: AirportDigitalTwinFinalCTAProps) {
  return (
    <section className="relative py-28 bg-[#050811] text-white overflow-hidden border-t border-white/[0.04]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[200px] opacity-20"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, rgba(0, 229, 255, 0) 70%)' }}
        />
        {/* Runway Approach Centerline Illumination */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#00E5FF]/[0.08] to-transparent pointer-events-none" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-[#00E5FF] mb-6"
        >
          <Radio size={13} className="animate-pulse" />
          <span>LIVE VOBL SPATIAL ENGINE</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight"
        >
          Experience the spatial reality of <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-cyan-200 to-sky-400">
            Kempegowda International Airport.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Step into the 65m virtual air traffic control tower or fly the 3.0° ILS glide slope into Runway 09R. See how Google 3D photorealistic tiles, live ADS-B telemetry, and real aerodrome physics unify flight operations in Bengaluru.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onOpenDemo}
            className="group w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-black transition-colors duration-200 hover:bg-cyan-300 active:opacity-90 flex items-center justify-center gap-2.5 cursor-pointer"
            style={{
              backgroundColor: "#00E5FF",
              boxShadow: "0 10px 30px rgba(0, 229, 255, 0.35)",
            }}
          >
            <Plane size={18} />
            <span>Launch Flight Simulator</span>
          </button>

          <a
            href="https://github.com/gokulgautham/live-airport-simulator"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-sm sm:text-base border border-white/10 hover:border-white/20 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ExternalLink size={16} />
            <span>Explore Code on GitHub</span>
          </a>
        </motion.div>

        {/* Airport Metric Specs Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/[0.06] text-left">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Aerodrome ICAO</div>
            <div className="text-sm font-semibold text-white font-mono mt-1">VOBL (BLR)</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Bengaluru, Karnataka</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Runway Configuration</div>
            <div className="text-sm font-semibold text-white font-mono mt-1">09L/27R & 09R/27L</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">4,000m Dual Parallel</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Telemetry Range</div>
            <div className="text-sm font-semibold text-[#00E5FF] font-mono mt-1">100 km ADS-B</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Real-time transponders</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Terminal Architecture</div>
            <div className="text-sm font-semibold text-white font-mono mt-1">T1 & T2 Garden</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">64+ Contact Stands</div>
          </div>
        </div>

      </div>
    </section>
  );
}
