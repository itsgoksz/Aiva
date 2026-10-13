import { motion } from 'framer-motion';
import { User, Car, Globe } from 'lucide-react';

const propositions = [
  {
    icon: <User className="w-8 h-8" />,
    title: "Conquer Mountain Passes",
    benefits: [
      "Western Ghats & Nilgiris Climbs: Real-time kinetic physics accounts for +1,800m elevation gains that drain batteries 3x faster than flat highway estimates.",
      "Regenerative Braking Yield: Calculates downhill energy recuperation so you know exactly how many kilowatt-hours you will recapture on the descent.",
      "Preconditioning Guidance: Pre-warms or cools battery chemistry before reaching high-speed DC chargers for maximum acceptance speeds."
    ]
  },
  {
    icon: <Car className="w-8 h-8" />,
    title: "Dine While You Charge",
    benefits: [
      "Zero Truck Stop Misery: Automatically filters out bleak industrial substations and unshaded gravel lots.",
      "Artisan Coffee & Bakery Sync: Pairs optimal 20-to-25 minute DC fast charge windows with third-wave roasteries and clean dining within a 2-minute walk.",
      "Dietary Preference Matching: Remembers whether you want South Indian filter coffee, pure vegetarian dining, or pet-friendly green lawns."
    ]
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Conversational In-Cockpit Voice",
    benefits: [
      "Hands-Free In-Cabin Co-Pilot: Voice queries powered by natural text-to-speech explain exactly why a stop was scheduled without taking your eyes off the asphalt.",
      "Dynamic Headwind Compensation: Synthesizes live OpenWeather wind vectors to predict HVAC thermal draw and aero drag penalties in real time.",
      "Rock-Solid Arrival Reserves: Guarantees your designated battery safety buffer (e.g. 15% SoC) at your final resort or hotel."
    ]
  }
];

export default function EvCopilotValueProposition() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            The EV Co-Pilot <span style={{ color: 'var(--color-accent)' }}>Difference</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Engineered for drivers who want effortless road trips, not range anxiety.
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
              className="p-8 rounded-3xl glass border border-[var(--color-border)] hover:border-white/20 transition-all duration-300"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
              >
                {prop.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6">{prop.title}</h3>
              <ul className="space-y-4">
                {prop.benefits.map((benefit, bIndex) => (
                  <li key={bIndex} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />
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
