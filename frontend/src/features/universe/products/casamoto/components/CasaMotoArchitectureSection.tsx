import { motion } from "framer-motion";
import { Cpu, Smartphone, Radio, HardDrive } from "lucide-react";

const ARCH_STACK = [
  {
    title: "Client & UI Engine",
    desc: "React Native + Expo native architecture with high-performance gesture physics and 60fps OLED rendering.",
    icon: Smartphone,
    color: "#FF6B00"
  },
  {
    title: "Tactical Telemetry Sync",
    desc: "Supabase Realtime WebSockets streaming position, velocity, and formation packets at sub-100ms latency.",
    icon: Radio,
    color: "#00E5FF"
  },
  {
    title: "Offline-First Canyon Cache",
    desc: "Local SQLite persistence guarantees 100% of ride data and maintenance logs are preserved even when cell signal dies.",
    icon: HardDrive,
    color: "#FFA800"
  },
  {
    title: "IMU Lean Sensor Fusion",
    desc: "Hardware-accelerated gyroscope and accelerometer filters calculate lean angles and braking force with zero gyro drift.",
    icon: Cpu,
    color: "#10B981"
  }
];

export default function CasaMotoArchitectureSection() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#00E5FF] border border-[#00E5FF]/20 bg-[#00E5FF]/5 mb-4 font-mono">
            Engineering & System Architecture
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Engineered For Zero Latency. <br />
            <span className="text-white/40">Resilient on city streets and remote mountain passes.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Built with modern native primitives, event-driven websockets, and robust offline-first synchronization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARCH_STACK.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-7 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 mb-5"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[10px] text-white/30 uppercase tracking-wider">
                  Industrial Spec
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
