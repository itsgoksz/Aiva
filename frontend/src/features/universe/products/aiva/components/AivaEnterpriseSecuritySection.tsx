import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  PhoneForwarded, 
  Radio
} from "lucide-react";

const PILLARS = [
  {
    title: "Accurate Business Info Only",
    desc: "Aiva only quotes your verified service menu, prices, and staff schedules. It never guesses or makes up policies.",
    icon: ShieldCheck,
    color: "#EC89B5"
  },
  {
    title: "1-Tap Human Takeover",
    desc: "If your front desk wants to step in, one tap transfers the caller straight to your desk phone with no hold music.",
    icon: PhoneForwarded,
    color: "#A66B8E"
  },
  {
    title: "Encrypted & Confidential",
    desc: "Client phone numbers, transcripts, and messages are encrypted and kept strictly between you and your customer.",
    icon: Lock,
    color: "#6366F1"
  },
  {
    title: "Natural Conversation",
    desc: "Callers can interrupt, change their minds, or ask questions naturally without dealing with robotic press-one menus.",
    icon: Radio,
    color: "#10B981"
  }
];

export default function AivaEnterpriseSecuritySection() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "#0E070C" }}>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#EC89B5] border border-[#A66B8E]/30 bg-[#A66B8E]/10 mb-4 font-mono">
            Safety & Control
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Sounds like a real person. <br />
            <span className="text-white/40">Sticks strictly to your business rules.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Aiva is built to represent your business with warmth, accuracy, and complete reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-7 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative flex flex-col justify-between group hover:border-white/20 transition-all"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 mb-5"
                    style={{ background: `${p.color}15`, color: p.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[10px] text-white/30 uppercase tracking-wider">
                  Built-In Safety
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
