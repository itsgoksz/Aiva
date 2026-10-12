import { motion } from 'framer-motion';
import { Cpu, Zap, Coffee, Network } from 'lucide-react';

const ARCHITECTURE_MODULES = [
  {
    icon: Cpu,
    module: 'vehicle_brain_agent.py',
    title: 'In-Cockpit Voice & Rerouting Agent',
    description: 'Powered by a local lightweight model (Gemma) running right inside the vehicle environment. Evaluates vehicle telemetry, answers natural voice questions, and triggers instant rerouting when headwinds or detours occur.',
    badge: 'Offline local engine • Sub-second response'
  },
  {
    icon: Zap,
    module: 'charging_agent.py',
    title: 'Polyline Corridor Waypoint Optimizer',
    description: 'Queries OpenChargeMap along the actual decoded Google Maps route polyline downsampled at 40km waypoint intervals. Filters for 150kW+ CCS2 fast chargers, verified plug uptime, and dual-gun redundancy.',
    badge: '150kW+ DC Fast • Live bay status'
  },
  {
    icon: Coffee,
    module: 'curation_agent.py',
    title: 'Lifestyle & Artisan Stop Matcher',
    description: 'Ensures you never waste 20 minutes sitting in an empty gravel lot. Automatically coordinates charging stops with specialty espresso roasters, bakeries, or clean dining spots within a 2-minute walk.',
    badge: 'Walkable dining • Clean amenities'
  },
  {
    icon: Network,
    module: 'agent_bus.py',
    title: 'Asynchronous Multi-Agent Bus',
    description: 'An event-driven async bus coordinating battery telemetry, live traffic congestion from Google Maps, OpenWeather wind vectors, and driver preferences into a unified journey plan.',
    badge: 'Event-driven • Non-blocking async bus'
  }
];

export default function EvCopilotArchitecture() {
  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-[#070913] border-t border-white/[0.04]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-violet-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            <span>SYSTEM ARCHITECTURE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Built on an asynchronous multi-agent coordination bus.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every component in EV Copilot has a single focused responsibility, communicating seamlessly over an in-memory event bus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ARCHITECTURE_MODULES.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-7 rounded-2xl bg-[#0B0F22]/80 border border-white/[0.06] hover:border-violet-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#00E5FF] group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-[11px] text-violet-300/90 px-2.5 py-1 rounded-full bg-violet-950/40 border border-violet-500/20">
                      {mod.module}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {mod.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-6">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Capability</span>
                  <span className="text-[#00E5FF] font-medium">{mod.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
