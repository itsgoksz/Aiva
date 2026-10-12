import { motion } from 'framer-motion';
import { Ghost, Gamepad2, Users, Flame } from 'lucide-react';

const problems = [
  {
    title: "Boring & Bureaucratic",
    description: "Traditional reporting tools feel like filing taxes. Nobody wants to fill out long, tedious forms just to report a pothole.",
    icon: <Ghost className="w-8 h-8 text-[#ff4d6d]" />
  },
  {
    title: "No Real Incentives",
    description: "Citizens get nothing in return for being proactive. Without rewards or recognition, civic engagement quickly fades away.",
    icon: <Gamepad2 className="w-8 h-8 text-[#10b981]" />
  },
  {
    title: "Lack of Collaboration",
    description: "Individual complaints lack impact. People report the same issues independently without any way to team up or combine their voices.",
    icon: <Users className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Invisible Progress",
    description: "Reports often go into a black box. There is no public, live map to track if a problem is actually being addressed or cleaned up.",
    icon: <Flame className="w-8 h-8 text-orange-400" />
  }
];

export default function NammaHoodProblemSection() {
  return (
    <section className="py-32 relative" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Civic Duty is <span style={{ color: 'var(--color-accent)' }}>Broken.</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Traditional reporting platforms fail because they lack engagement, transparency, and a sense of community. We needed a radically different approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-3xl glass border border-[var(--color-border)] hover:bg-white/5 transition-all duration-300"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--color-accent-subtle)' }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
