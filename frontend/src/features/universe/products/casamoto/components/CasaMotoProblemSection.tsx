import { motion } from "framer-motion";
import { FileSpreadsheet, Receipt, MessageSquareWarning, NavigationOff, XCircle, CheckCircle2 } from "lucide-react";

const FRAGMENTS = [
  {
    icon: FileSpreadsheet,
    title: "The Spreadsheet Hassle",
    problem: "Tracking chain cleanings, oil viscosities, and tyre changes in generic spreadsheet templates built for fleet minivans.",
    casamotoFix: "Visual dynamic component health bars that automatically deplete as your odometer advances.",
    color: "#FF334B"
  },
  {
    icon: Receipt,
    title: "Lost Invoices & Upgrades",
    problem: "Receipts for exhaust upgrades, tail tidies, and levers scattered across physical folders and email inboxes.",
    casamotoFix: "The Ultimate Build Sheet: itemized mod logging with lifetime investment analytics and parts history.",
    color: "#FFA800"
  },
  {
    icon: MessageSquareWarning,
    title: "Chaotic WhatsApp Rides",
    problem: "Sunday group rides devolve into messy pin drops, frantic phone calls, and riders lost at traffic lights.",
    casamotoFix: "Tactical Group Radar: real-time GPS telemetry showing formation, lead bike, and drop-off alerts.",
    color: "#FF6B00"
  },
  {
    icon: NavigationOff,
    title: "Disconnected Riding",
    problem: "You complete a spirited 300km mountain ride, but none of that distance syncs to your bike's service intervals.",
    casamotoFix: "Zero manual entry: ending a ride immediately logs km, alerts pending chain lube, and awards rider XP.",
    color: "#00E5FF"
  }
];

export default function CasaMotoProblemSection() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      {/* Subtle background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{ background: "#FF6B00" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FF6B00] border border-[#FF6B00]/20 bg-[#FF6B00]/5 mb-4 font-mono">
            The Fragmented Rider Experience
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Motorcycles are high-performance machines. <br />
            <span className="text-white/40">Why manage them with 2010 spreadsheets?</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Most motorcycle owners juggle 4 different disconnected tools just to own, ride, and service their bike. 
            Here is how CasaMoto solves it.
          </p>
        </div>

        {/* 4 Problems vs CasaMoto Fix Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {FRAGMENTS.map((item, idx) => {
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
                  background: "linear-gradient(160deg, rgba(18, 20, 29, 0.65) 0%, rgba(9, 11, 16, 0.8) 100%)",
                }}
              >
                {/* Glow accent in corner */}
                <div 
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: item.color }}
                />

                <div className="flex items-center gap-4 mb-5">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shrink-0"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* The Old Broken Way */}
                <div className="p-3.5 rounded-xl bg-red-500/[0.06] border border-red-500/15 mb-3 flex items-start gap-3">
                  <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    <strong className="text-red-300 font-medium">The hassle: </strong>
                    {item.problem}
                  </p>
                </div>

                {/* The CasaMoto Fix */}
                <div className="p-3.5 rounded-xl bg-[#FF6B00]/[0.08] border border-[#FF6B00]/25 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#FF6B00] mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                    <strong className="text-[#FF6B00]">CasaMoto solution: </strong>
                    {item.casamotoFix}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Head-to-Head Comparison Table */}
        <div 
          className="rounded-3xl border border-white/[0.08] p-6 sm:p-10 backdrop-blur-2xl overflow-x-auto"
          style={{ background: "rgba(10, 12, 18, 0.7)" }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How CasaMoto Leaves Traditional Tools Behind
            </h3>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-xs uppercase tracking-wider">
                <th className="pb-4 font-normal">Feature Dimension</th>
                <th className="pb-4 font-normal text-white/50">Generic Apps / Spreadsheets</th>
                <th className="pb-4 font-semibold text-[#FF6B00]">CasaMoto Ecosystem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="py-4 font-medium text-white">Maintenance Architecture</td>
                <td className="py-4 text-white/50">Static Excel cells or generic fleet mileage logs</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2">
                  <span className="text-[#FF6B00]">✦</span> Live wear-rate algorithms based on actual ride telemetry
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Group Ride Coordination</td>
                <td className="py-4 text-white/50">Fragmented WhatsApp chats, manual route links</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2">
                  <span className="text-[#FF6B00]">✦</span> Real-time Tactical Radar with lead/sweeper tracking
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Build & Mod Tracking</td>
                <td className="py-4 text-white/50">Paper invoices, phone notes apps, lost warranty receipts</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2">
                  <span className="text-[#FF6B00]">✦</span> Verified digital build book with lifetime cost charts
                </td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Rider Progression</td>
                <td className="py-4 text-white/50">None (feels like doing taxes)</td>
                <td className="py-4 text-white font-semibold flex items-center gap-2">
                  <span className="text-[#FF6B00]">✦</span> Gamified XP, DIY service achievements, Rider Tiers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
