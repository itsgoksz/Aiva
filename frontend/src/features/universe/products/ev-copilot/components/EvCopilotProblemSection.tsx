import { motion } from 'framer-motion';
import { AlertOctagon, TrendingDown, Clock } from 'lucide-react';

const EV_PAIN_POINTS = [
  {
    icon: AlertOctagon,
    title: 'The broken charger gamble',
    stat: '28% public chargers fail on arrival',
    description: 'Arriving with 8% battery at a remote highway station only to find the CCS2 plug offline, the payment terminal frozen, or a delivery truck blocking the bay.',
    quote: '"Nothing ruins a weekend getaway faster than being stranded in the dark with single-digit battery."'
  },
  {
    icon: TrendingDown,
    title: 'The elevation range cliff',
    stat: 'Up to 45% range loss on climbs',
    description: 'Standard in-car trip computers assume flat topography. The moment you climb a mountain pass with headwinds and cabin heating, your 200km range evaporates in 80km.',
    quote: '"Your dashboard says you have plenty of range until you hit the foot of the hills."'
  },
  {
    icon: Clock,
    title: 'The empty asphalt waiting room',
    stat: '35+ minutes wasted per stop',
    description: 'Legacy maps dump you at the nearest industrial substation or unshaded gravel lot with no restrooms, no coffee, and nowhere to stretch your legs.',
    quote: '"Charging should be a relaxing coffee break, not detention in a parking lot."'
  }
];

export default function EvCopilotProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#070913] border-t border-white/[0.04]">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6D5EF7 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-red-300">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>The Reality of Long-Distance EV Driving</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Why EV road trips still cause range anxiety.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Electric cars are brilliant to drive, but road trip planning is still stuck in the early adopter dark ages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EV_PAIN_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative rounded-2xl p-7 bg-[#0B0F22]/80 border border-white/[0.06] hover:border-violet-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-300 group-hover:text-[#00E5FF] group-hover:border-violet-500/30 transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.03] text-neutral-400 border border-white/[0.06]">
                      {point.stat}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2.5">
                    {point.title}
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {point.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.05]">
                  <p className="text-xs italic text-neutral-500 font-serif">
                    {point.quote}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
