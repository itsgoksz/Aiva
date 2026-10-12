import { motion } from 'framer-motion';
import { Database, Cpu, Lock, Volume2 } from 'lucide-react';

const ARCHITECTURE_BLOCKS = [
  {
    icon: Cpu,
    tag: 'extractor.py',
    title: 'Natural Language Food Extraction',
    description: 'Deconstructs spoken colloquial meals into precise ingredients, portions, and cooking methods. Understands local culinary preparations, oils, gravies, and mixed dishes without rigid syntax.',
    metrics: '<180ms latency • 96.4% portion recall'
  },
  {
    icon: Database,
    tag: 'food-calorie-data.csv',
    title: 'Comprehensive Nutritional Database',
    description: 'Trained on over 10,000 whole foods, regional Indian recipes, street food, and global grocery items. Provides complete profiles for calories, macros, micronutrients, and glycemic indices.',
    metrics: '10,000+ foods • Complete macro/micronutrients'
  },
  {
    icon: Volume2,
    tag: 'voicebox_service.py',
    title: 'Hands-Free Kitchen Voice Engine',
    description: 'Designed for when your hands are covered in flour or holding cooking utensils. Stream speech input and receive gentle audio confirmations without touching your screen.',
    metrics: 'Low latency audio • Ambient noise filtration'
  },
  {
    icon: Lock,
    tag: 'database.py',
    title: 'Encrypted Private Health Vault',
    description: 'Your food intake, biometric metrics, and daily habits are encrypted locally. No ad retargeting, no selling health data to insurance brokers, zero third-party telemetry leak.',
    metrics: 'On-device SQLite • Zero behavioral advertising'
  }
];

export default function WelloraArchitecture() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#060C08] border-t border-white/[0.04]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>ENGINEERING FOUNDATION</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Built for speed, accuracy, and absolute privacy.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            FastAPI microservices paired with custom extraction models ensure your meals are logged in the blink of an eye.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ARCHITECTURE_BLOCKS.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-7 rounded-2xl bg-[#09130D]/80 border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400/80 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20">
                      {block.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {block.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-6">
                    {block.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Performance</span>
                  <span className="text-emerald-400 font-medium">{block.metrics}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
