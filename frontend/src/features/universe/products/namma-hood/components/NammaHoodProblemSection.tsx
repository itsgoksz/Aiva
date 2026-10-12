import { motion } from 'framer-motion';
import { FileQuestion, Users, XCircle } from 'lucide-react';

const CIVIC_PAIN_POINTS = [
  {
    icon: FileQuestion,
    title: 'The bureaucratic black hole',
    stat: '84% portal drop-off rate',
    description: 'Government portals force you through multi-page forms, municipal department codes, and captchas. After all that effort, you get an obscure ticket ID that disappears without action.',
    quote: '"I tried reporting open garbage dumping twice. The portal required me to know the exact sub-divisional executive engineer code."'
  },
  {
    icon: Users,
    title: 'The isolated resident',
    stat: 'Zero community leverage',
    description: 'A single resident complaining is easy for municipal contractors to ignore. Without a shared neighborhood feed, neighbors have no way to rally together and prove collective urgency.',
    quote: '"When one person complains, nothing happens. When 50 neighbors stand behind a report, the cleanup crew arrives that evening."'
  },
  {
    icon: XCircle,
    title: 'Ghost ticket closures',
    stat: 'Unverified status updates',
    description: 'Tickets routinely get marked as \'Resolved\' in municipal backends without anyone ever visiting the physical spot. No photographic evidence, no before-and-after verification.',
    quote: '"My grievance was marked \'Completed\' while the debris was still overflowing onto the road."'
  }
];

export default function NammaHoodProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#060807] border-t border-white/[0.04]">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-red-300">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>The Reality of Public Grievance Portals</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Why reporting civic issues still feels futile.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Neighborhoods don\'t get cleaned up by filing endless paperwork. They get restored when citizens have transparent, collective proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CIVIC_PAIN_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative rounded-2xl p-7 bg-[#0A110D]/80 border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
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
