import { useState } from "react";
import { motion } from "framer-motion";
import AivaCardMorphBridge from "./AivaCardMorphBridge";

export default function AivaRoiCalculatorSection() {
  const [weeklyCalls, setWeeklyCalls] = useState(120);
  const [averageTicket, setAverageTicket] = useState(1800);

  const monthlyCalls = weeklyCalls * 4.3;
  const missedCallsMonthly = Math.round(monthlyCalls * 0.32);
  const recoveredBookings = Math.round(missedCallsMonthly * 0.65);
  const recoveredRevenueMonthly = Math.round(recoveredBookings * averageTicket);
  const hoursSavedMonthly = Math.round((monthlyCalls * 2.5) / 60);

  return (
    <section className="pt-10 pb-16 sm:pt-14 sm:pb-20 relative overflow-hidden bg-transparent">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full pointer-events-none opacity-30 sm:opacity-20"
        style={{ 
          background: "radial-gradient(ellipse at center, rgba(166, 107, 142, 0.28) 0%, rgba(230, 92, 142, 0.08) 50%, transparent 75%)" 
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
            FINANCIAL IMPACT // REVENUE RECOVERY
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            See what missed calls are costing you. <br />
            <span className="bg-gradient-to-r from-white/90 via-[#FCE7F3] to-[#E65C8E] bg-clip-text text-transparent">
              And how quickly Aiva pays for itself.
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Drag the sliders to match your typical weekly call volume and average booking value.
          </p>
        </div>

        {/* Transformation Bridge 04 -> 01 */}
        <AivaCardMorphBridge 
          variant="merge-4-to-1" 
          label="CARD METAMORPHOSIS // 04 ➔ 01 [CONSOLIDATE INTO REVENUE ENGINE]" 
        />

        {/* The Calculator Box (Apple Morph Entry) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.90, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-8 lg:p-12 shadow-2xl max-w-4xl mx-auto"
          style={{
            background: "linear-gradient(150deg, #170A14 0%, #0A0508 100%)",
            boxShadow: "0 30px 100px -20px rgba(0, 0, 0, 0.9), 0 0 50px rgba(166, 107, 142, 0.15)",
          }}
        >
          {/* Unified Architecture Chassis Ribbon */}
          <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
            <span className="flex items-center gap-2 text-[#EC89B5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
              AIVA APPARATUS // UNIT 06
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
              FINANCIAL RECOVERY ENGINE
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 sm:mb-3">
                  <label className="text-sm font-semibold text-white">
                    Estimated Inbound Calls per Week
                  </label>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#EC89B5]">
                    {weeklyCalls} calls/week
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="400"
                  step="10"
                  value={weeklyCalls}
                  onChange={(e) => setWeeklyCalls(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#A66B8E]"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-white/40 mt-1">
                  <span>30 calls (Boutique)</span>
                  <span>400 calls (Busy Studio)</span>
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 sm:mb-3">
                  <label className="text-sm font-semibold text-white">
                    Average Service / Booking Price
                  </label>
                  <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">
                    ₹{averageTicket.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="100"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-white/40 mt-1">
                  <span>₹500 (Basic Consultation)</span>
                  <span>₹6,000 (Comprehensive Service)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 grid grid-cols-2 gap-3 sm:gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Calls Saved Monthly</span>
                  <span className="text-white font-bold text-xs sm:text-sm">{missedCallsMonthly} callers caught</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Phone Time Saved</span>
                  <span className="text-white font-bold text-xs sm:text-sm">{hoursSavedMonthly} staff hours/mo</span>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#A66B8E]/30 text-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(166, 107, 142, 0.20) 0%, rgba(230, 92, 142, 0.08) 100%)",
                }}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                  Estimated Recovered Revenue
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-emerald-400 tracking-tight mb-2 truncate">
                  +₹{recoveredRevenueMonthly.toLocaleString("en-IN")}
                </div>
                <div className="text-xs font-mono text-white/60 mb-6">
                  per month in captured bookings
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-white/70 leading-relaxed font-light">
                  That's about <strong className="text-white font-semibold">{recoveredBookings} appointments</strong> each month that would have otherwise gone to voicemail.
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
