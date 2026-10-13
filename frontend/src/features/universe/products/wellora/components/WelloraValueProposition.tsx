import { motion } from 'framer-motion';
import { Heart, TrendingUp, Database } from 'lucide-react';

const propositions = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Talk Like a Human, Not a Barcode Scanner",
    benefits: [
      "Understands Home Cooking: Say 'Two dosas with homemade coconut chutney and a filter coffee' — breaks down regional dishes, gravies, and portion weights without searching endless barcode databases.",
      "Hands-Free Kitchen Voice: Designed for when your hands are wet or covered in flour. Speak naturally and get instant audio confirmations.",
      "Gentle Clarifications: Asks thoughtful follow-ups ('Did you temper the dal with ghee or mustard oil?') only when it actually matters."
    ]
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Zero Guilt, Zero Judgment Philosophy",
    benefits: [
      "No Lecture After Big Feasts: Overate at a weekend wedding dinner? Wellora evaluates your 7-day rolling balance instead of penalizing a single meal.",
      "Targeted Evening Guidance: Missing 30g of protein before bed? Recommends light, high-casein snacks (paneer, Greek yogurt) that won't disrupt deep sleep.",
      "Long-Term Habit Momentum: Helps you understand how hydration, sleep latency, and meal pacing influence your everyday energy."
    ]
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Instant Offline Data & True Privacy",
    benefits: [
      "10,000+ Calibrated Food Database: Instant millisecond lookups powered by a built-in nutrition index (food-calorie-data.csv) without relying on laggy third-party APIs.",
      "Private On-Device Health Vault: Relational SQLite database keeps your meals and biometrics private with zero data exfiltration.",
      "Zero Ad Retargeting: Your daily habits are strictly yours—never packaged for targeted ads or sold to health insurance underwriters."
    ]
  }
];

export default function WelloraValueProposition() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[150px] opacity-10" style={{ background: '#2DD4FF' }} />
        <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[150px] opacity-10" style={{ background: 'var(--color-accent)' }} />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            A Health Companion That <span style={{ color: 'var(--color-accent)' }}>Actually Understands You</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Nutrition tracking that fits into real life, without spreadsheets or shame.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl glass border border-[var(--color-border)] hover:border-white/20 transition-all duration-300 group"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: index === 0 ? 'var(--color-accent-subtle)' : 'rgba(45, 212, 255, 0.15)', color: index === 0 ? 'var(--color-accent)' : '#2DD4FF' }}
              >
                {prop.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6">{prop.title}</h3>
              <ul className="space-y-4">
                {prop.benefits.map((benefit, bIndex) => (
                  <li key={bIndex} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: index === 0 ? 'var(--color-accent)' : '#2DD4FF' }} />
                    <span className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
