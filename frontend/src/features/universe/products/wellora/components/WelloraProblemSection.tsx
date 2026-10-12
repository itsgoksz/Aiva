import { motion } from 'framer-motion';
import { ScanBarcode, AlertTriangle, Scale } from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: ScanBarcode,
    title: "The barcode exhaustion",
    stat: "92% abandon apps in week 1",
    description: "Home-cooked food does not have barcodes. Scanning each tomato, pinch of salt, and spoonful of ghee turns making dinner into administrative data entry.",
    quote: "I stopped tracking because logging homemade food took longer than eating it."
  },
  {
    icon: AlertTriangle,
    title: "The red banner guilt engine",
    stat: "Negative psychology loop",
    description: "Most counters treat nutrition like a criminal audit. Going 40 calories over your daily target flashes angry red warnings, creating stress instead of sustainable habits.",
    quote: "One social dinner with friends should never make your health app scold you."
  },
  {
    icon: Scale,
    title: "Calories in a vacuum",
    stat: "Misleading equivalence",
    description: "300 calories of refined sugar and 300 calories of wild salmon are not biologically equal. Spreadsheet counters ignore fiber, gut satiety, protein quality, and recovery.",
    quote: "Your body metabolizes whole food nutrients, not raw arithmetic."
  }
];

export default function WelloraProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#060C08] border-t border-white/[0.04]">
      {/* Subtle organic gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[160px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2ECC71 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-red-300">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>The Reality of Traditional Diet Apps</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Why traditional calorie counters feel like a chore.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Health tracking should give you peace of mind and clarity — not an extra spreadsheet job before every meal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative rounded-2xl p-7 bg-[#09130D]/80 border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
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
                    "{point.quote}"
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
