import { motion } from 'framer-motion';
import { Camera, Map, Target, Medal } from 'lucide-react';

export default function NammaHoodFeaturesSection() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full mb-6 border border-[var(--color-border)]" style={{ background: 'var(--color-bg-tertiary)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Core Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Future of <br />
            <span style={{ color: 'var(--color-accent)' }}>Civic Engagement.</span>
          </h2>
        </div>

        <div className="space-y-16">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center glass border border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-accent-subtle)' }}>
                <Map className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-3">Map-First Discovery</h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Instead of boring lists, Namma Hood opens straight to a gorgeous, dark-themed neighborhood map. See live hotspots around you, color-coded by urgency.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse gap-8 items-center"
          >
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center glass border border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-accent-subtle)' }}>
                <Target className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />
              </div>
            </div>
            <div className="md:w-2/3 md:text-right">
              <h3 className="text-2xl font-bold mb-3">Dynamic Radar & Navigation</h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Our Dynamic Island radar detects nearby issues while you walk or drive. Tap to start live, turn-by-turn navigation directly to the cleanup site.
              </p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center glass border border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-accent-subtle)' }}>
                <Medal className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-3">Gamification & XP</h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Every report and cleanup earns you XP. Climb the local leaderboards, earn exclusive titles like "Eco-Guardian", and compete with neighboring sectors.
              </p>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse gap-8 items-center"
          >
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center glass border border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-accent-subtle)' }}>
                <Camera className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />
              </div>
            </div>
            <div className="md:w-2/3 md:text-right">
              <h3 className="text-2xl font-bold mb-3">Frictionless Reporting</h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Quickly capture an issue using the bottom '+' button. Provide a photo and description in seconds to create a new mission for the community.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
