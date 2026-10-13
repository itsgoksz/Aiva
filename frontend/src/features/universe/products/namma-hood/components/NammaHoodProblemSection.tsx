import { motion } from 'framer-motion';
import { FileQuestion, Users, XCircle } from 'lucide-react';

const CIVIC_PAIN_POINTS = [
  {
    icon: FileQuestion,
    title: 'The bureaucratic black hole',
    stat: '84% portal drop-off rate',
    description: 'Government portals force you through multi-page forms, municipal department codes, and captchas. After all that effort, you get an obscure ticket ID that disappears into digital oblivion.',
    quote: '"I tried reporting open garbage dumping twice. The portal required me to know the exact sub-divisional executive engineer code."'
  },
  {
    icon: Users,
    title: 'Waiting for someone else to care',
    stat: 'Months of inaction',
    description: 'Waiting for ward authorities to clear a street corner usually means months of rotting trash. Without a way to rally neighbors into direct action, everyone walks past feeling frustrated and powerless.',
    quote: '"We waited four months for someone to clear the corner lot. Finally three neighbors and I took 45 minutes on Sunday morning and transformed the spot ourselves."'
  },
  {
    icon: XCircle,
    title: 'Ghost ticket closures',
    stat: 'Unverified status updates',
    description: 'Public grievance portals routinely mark tickets as \'Resolved\' without anyone ever touching the physical debris. Zero before-and-after proof, zero community accountability.',
    quote: '"My grievance was marked \'Completed\' while the debris was still overflowing right onto the road."'
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
            <span>The Broken Grievance Loophole</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Why waiting for bureaucratic help feels futile.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Neighborhoods don't get cleaned by filing paperwork into a void. They get restored when residents organize directly, verify real progress, and get rewarded for their efforts.
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
