import { motion } from "framer-motion";
import { 
  PhoneMissed, 
  Clock, 
  Users, 
  MessageSquareOff, 
  CheckCircle2, 
  XCircle
} from "lucide-react";

const PROBLEMS = [
  {
    icon: PhoneMissed,
    title: "Unanswered Calls During the Daily Rush",
    stat: "62%",
    description: "When your staff is busy working with clients, the phone rings in the background. Most callers won't leave a voicemail—they just hang up and call the next business on Google.",
    solution: "Aiva answers in under a second, handles multiple callers at the same time, and books the appointment right then and there.",
    color: "#EF4444"
  },
  {
    icon: Clock,
    title: "Losing Bookings After You Close",
    stat: "38%",
    description: "People often remember to book an appointment late at night from their couch or early on Sunday morning when your doors are locked.",
    solution: "Aiva works 24/7, turning after-hours calls and weekend inquiries into confirmed appointments on your calendar.",
    color: "#F59E0B"
  },
  {
    icon: Users,
    title: "Constant Front-Desk Multitasking",
    stat: "14 hrs",
    description: "Your team is constantly interrupted while greeting clients in person to answer basic questions about hours, directions, and prices.",
    solution: "Aiva handles routine phone questions and bookings so your staff can focus entirely on the people right in front of them.",
    color: "#A66B8E"
  },
  {
    icon: MessageSquareOff,
    title: "Treating Regulars Like Strangers",
    stat: "1 in 3",
    description: "Returning clients have to explain their service preferences, favorite staff members, and contact info over again every time they call.",
    solution: "Aiva remembers past visits, preferred team members, and special requests automatically, giving regulars a warm, familiar greeting.",
    color: "#6366F1"
  }
];

export default function AivaProblemSection() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "#0E070C" }}>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[200px] pointer-events-none opacity-15"
        style={{ background: "#A66B8E" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#EC89B5] border border-[#A66B8E]/30 bg-[#A66B8E]/10 mb-4 font-mono">
            The Problem
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Every missed call is <br />
            <span className="text-white/40">revenue lost to a competitor.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Great businesses don't lose clients because their work isn't good enough. 
            They lose them because the phone rang while everyone was busy.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {PROBLEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-7 rounded-3xl border border-white/[0.08] relative overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300"
                style={{
                  background: "linear-gradient(160deg, rgba(22, 14, 20, 0.7) 0%, rgba(12, 7, 10, 0.85) 100%)",
                }}
              >
                <div 
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: item.color }}
                />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shrink-0"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-red-500/[0.06] border border-red-500/15 mb-3 flex items-start gap-3">
                  <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    <strong className="text-red-300 font-medium">What happens today: </strong>
                    {item.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#A66B8E]/[0.08] border border-[#A66B8E]/30 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#EC89B5] mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                    <strong className="text-[#EC89B5]">With Aiva: </strong>
                    {item.solution}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div 
          className="rounded-3xl border border-white/[0.08] p-6 sm:p-10 backdrop-blur-2xl overflow-x-auto"
          style={{ background: "rgba(14, 8, 12, 0.85)" }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How Aiva Compares
            </h3>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-xs uppercase tracking-wider">
                <th className="pb-4 font-normal">What Matters</th>
                <th className="pb-4 font-normal text-white/50">Human Front Desk</th>
                <th className="pb-4 font-normal text-white/50">Traditional Answering Service</th>
                <th className="pb-4 font-semibold text-[#EC89B5]">Aiva</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="py-4 font-medium text-white">Hours of Operation</td>
                <td className="py-4 text-white/50">Business hours only</td>
                <td className="py-4 text-white/50">24/7 (Expensive add-on)</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2">
                  <span className="text-[#EC89B5]">✦</span> 24/7/365 without overtime
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Simultaneous Calls</td>
                <td className="py-4 text-white/50">1 caller at a time (others get busy tone)</td>
                <td className="py-4 text-white/50">Long hold queues</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2">
                  <span className="text-[#EC89B5]">✦</span> Unlimited lines answered at once
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Direct Calendar Booking</td>
                <td className="py-4 text-white/50">Manual scheduling</td>
                <td className="py-4 text-white/50">Takes a message, can't book</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2">
                  <span className="text-[#EC89B5]">✦</span> Direct booking into your real calendar
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">WhatsApp / SMS Follow-up</td>
                <td className="py-4 text-white/50">Only if staff remembers</td>
                <td className="py-4 text-white/50">No text messaging</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2">
                  <span className="text-[#EC89B5]">✦</span> Sent automatically in seconds
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Cost Structure</td>
                <td className="py-4 text-white/50">₹35,000 - ₹50,000/mo salary + overhead</td>
                <td className="py-4 text-white/50">Per-minute charges + setup fees</td>
                <td className="py-4 text-emerald-400 font-semibold flex items-center gap-2">
                  <span className="text-[#EC89B5]">✦</span> Simple flat monthly pricing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
