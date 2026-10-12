import { motion } from "framer-motion";
import { 
  PhoneCall, 
  CalendarCheck, 
  MessageSquare, 
  BrainCircuit
} from "lucide-react";

const STAGES = [
  {
    step: "01",
    title: "Answers on the first ring",
    metric: "Under 1 second",
    icon: PhoneCall,
    color: "#EC89B5",
    desc: "Aiva picks up right away with a warm, natural voice. It understands everyday conversational speech, accents, interruptions, and questions."
  },
  {
    step: "02",
    title: "Checks your real calendar",
    metric: "Zero double-bookings",
    icon: CalendarCheck,
    color: "#A66B8E",
    desc: "Looks at staff schedules, service durations, and buffer times in real time to suggest open slots that actually fit."
  },
  {
    step: "03",
    title: "Sends instant text confirmation",
    metric: "Sent in seconds",
    icon: MessageSquare,
    color: "#6366F1",
    desc: "Texts the caller a confirmation on WhatsApp or SMS with the appointment time, Google Calendar link, and address before they hang up."
  },
  {
    step: "04",
    title: "Saves client history & notes",
    metric: "Saved to your dashboard",
    icon: BrainCircuit,
    color: "#10B981",
    desc: "Logs what service they booked, their preferred staff member, and any special notes directly to your customer dashboard."
  }
];

export default function AivaAutonomousLoopSection() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "#0E070C" }}>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[220px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #A66B8E 0%, #6366F1 100%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#EC89B5] border border-[#A66B8E]/30 bg-[#A66B8E]/10 mb-4 font-mono">
            How It Works
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            From phone call to booked appointment. <br />
            <span className="text-white/40">Handled completely from start to finish.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Here is what happens behind the scenes every time someone calls your business.
          </p>
        </div>

        {/* 4-Stage Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative flex flex-col justify-between group hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-white/40 group-hover:text-white transition-colors">
                      STEP {s.step}
                    </span>
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center border border-white/10"
                      style={{ background: `${s.color}15`, color: s.color }}
                    >
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[11px]" style={{ color: s.color }}>
                  {s.metric}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div 
          className="rounded-3xl border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(166, 107, 142, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)",
          }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Give your staff their time back.
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            No more running across the salon or clinic to grab the phone. Your team can give 100% of their attention to the clients in the room.
          </p>
        </div>
      </div>
    </section>
  );
}
