import { useState } from "react";

export default function AivaRoiCalculatorSection() {
  const [weeklyCalls, setWeeklyCalls] = useState(120);
  const [averageTicket, setAverageTicket] = useState(1800);

  const monthlyCalls = weeklyCalls * 4.3;
  const missedCallsMonthly = Math.round(monthlyCalls * 0.32);
  const recoveredBookings = Math.round(missedCallsMonthly * 0.65);
  const recoveredRevenueMonthly = Math.round(recoveredBookings * averageTicket);
  const hoursSavedMonthly = Math.round((monthlyCalls * 2.5) / 60);

  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "#0A0508" }}>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-15"
        style={{ background: "#A66B8E" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#EC89B5] border border-[#A66B8E]/30 bg-[#A66B8E]/10 mb-4 font-mono">
            Revenue Calculator
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            See what missed calls are costing you. <br />
            <span className="text-white/40">And how quickly Aiva pays for itself.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Drag the sliders to match your typical weekly call volume and average booking value.
          </p>
        </div>

        {/* The Calculator Box */}
        <div 
          className="rounded-3xl border border-white/10 p-6 sm:p-12 backdrop-blur-2xl shadow-2xl max-w-4xl mx-auto"
          style={{
            background: "linear-gradient(150deg, rgba(22, 14, 20, 0.8) 0%, rgba(10, 6, 9, 0.95) 100%)",
            boxShadow: "0 30px 100px -20px rgba(0, 0, 0, 0.9), 0 0 50px rgba(166, 107, 142, 0.15)",
          }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-white">
                    Estimated Inbound Calls per Week
                  </label>
                  <span className="font-mono text-base font-bold text-[#EC89B5]">
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
                <div className="flex justify-between text-[11px] font-mono text-white/40 mt-1">
                  <span>30 calls (Boutique)</span>
                  <span>400 calls (Busy Studio)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-white">
                    Average Service / Booking Price
                  </label>
                  <span className="font-mono text-base font-bold text-emerald-400">
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
                <div className="flex justify-between text-[11px] font-mono text-white/40 mt-1">
                  <span>₹500 (Basic Consultation)</span>
                  <span>₹6,000 (Comprehensive Service)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Calls Saved Monthly</span>
                  <span className="text-white font-bold">{missedCallsMonthly} callers caught</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Phone Time Saved</span>
                  <span className="text-white font-bold">{hoursSavedMonthly} staff hours/mo</span>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="lg:col-span-5">
              <div 
                className="p-6 sm:p-8 rounded-3xl border border-[#A66B8E]/30 text-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(166, 107, 142, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
                }}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                  Estimated Recovered Revenue
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight mb-2">
                  +₹{recoveredRevenueMonthly.toLocaleString("en-IN")}
                </div>
                <div className="text-xs font-mono text-white/60 mb-6">
                  per month in captured bookings
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-white/70 leading-relaxed font-light">
                  That's about <strong className="text-white font-semibold">{recoveredBookings} appointments</strong> each month that would have otherwise gone to voicemail.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
