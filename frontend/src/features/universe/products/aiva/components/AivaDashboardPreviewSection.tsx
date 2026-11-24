import { useState } from "react";
import { 
  Phone, 
  CheckCircle2, 
  Clock, 
  IndianRupee,
  HeartHandshake
} from "lucide-react";

const CALL_RECORDS = [
  {
    caller: "Pooja Hegde",
    phone: "+91 98450 23489",
    service: "HydraFacial & Skin Rejuvenation",
    staff: "Dr. Anjali Rao",
    time: "10:14 AM Today",
    duration: "1m 18s",
    sentiment: "Enthusiastic",
    status: "BOOKED",
    revenue: "₹2,800",
    summary: "Requested weekend afternoon slot with Dr. Anjali. Offered Saturday 3:00 PM. Confirmed booking, WhatsApp confirmation sent."
  },
  {
    caller: "Rahul Nair",
    phone: "+91 99001 89012",
    service: "Consultation & Dental Scaling",
    staff: "Dr. Varun Sharma",
    time: "11:45 AM Today",
    duration: "48s",
    sentiment: "Quick Booking",
    status: "BOOKED",
    revenue: "₹1,500",
    summary: "Returning regular client. Matched usual bi-weekly cadence with Dr. Varun. Booked Thursday 5:30 PM."
  },
  {
    caller: "Claire Dubois",
    phone: "+91 98860 34567",
    service: "Hair Extension Consultation",
    staff: "Priya Sharma",
    time: "1:20 PM Today",
    duration: "2m 04s",
    sentiment: "Inquiry",
    status: "CONSULTATION",
    revenue: "₹3,200",
    summary: "Asked about tape-in extension pricing and maintenance. Booked a 15-minute consultation with Priya."
  }
];

const SCHEDULE_ITEMS = [
  { time: "09:30 AM", client: "Elena Vance", service: "HydraFacial Glow", staff: "Dr. Chloe", status: "Completed", color: "#10B981" },
  { time: "11:00 AM", client: "Marcus Brody", service: "Deep Conditioning + Trim", staff: "Dr. Anjali Rao", status: "In Progress", color: "#EC89B5" },
  { time: "01:30 PM", client: "David Chen", service: "Full Balayage", staff: "Dr. Anjali Rao", status: "Upcoming", color: "#EC89B5" },
  { time: "03:00 PM", client: "Aria Thorne", service: "Bridal Trial Consultation", staff: "Priya Sharma", status: "Upcoming", color: "#F59E0B" },
];

const CLIENT_PROFILES = [
  {
    name: "Elena Vance",
    type: "Regular Client",
    visits: 24,
    spend: "₹48,200",
    preferredStaff: "Sarah Jenkins",
    notes: "Prefers sparkling water. Sensitive scalp—uses sulfate-free formulations only. Enjoys quiet appointments.",
    lastSeen: "2 weeks ago"
  },
  {
    name: "Marcus Brody",
    type: "Monthly Regular",
    visits: 12,
    spend: "₹32,500",
    preferredStaff: "Marcus Vance",
    notes: "Usually books Thursday or Friday evenings after 5:30 PM. Appreciates directions and reminder texts.",
    lastSeen: "1 month ago"
  }
];

export default function AivaDashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState<"calls" | "schedule" | "crm">("calls");

  return (
    <section id="dashboard-preview" className="py-28 relative overflow-hidden bg-transparent">
      {/* Background ambient lighting — Smooth radial gradient (Zero GPU blur-box clipping) */}
      <div 
        className="absolute top-1/4 -left-[10%] w-[650px] h-[650px] pointer-events-none opacity-35"
        style={{ 
          background: "radial-gradient(circle at 40% 50%, rgba(166, 107, 142, 0.28) 0%, rgba(230, 92, 142, 0.08) 50%, transparent 75%)" 
        }}
      />
      <div 
        className="absolute bottom-10 -right-[10%] w-[650px] h-[650px] pointer-events-none opacity-30"
        style={{ 
          background: "radial-gradient(circle at 60% 50%, rgba(230, 92, 142, 0.25) 0%, rgba(166, 107, 142, 0.06) 50%, transparent 75%)" 
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#EC89B5] border border-[#A66B8E]/30 bg-[#A66B8E]/10 mb-4 font-mono">
            Management Console
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Your entire front desk in one clean view. <br />
            <span className="text-white/40">Real calls, calendar bookings, and customer notes.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            See who called, what was discussed, which appointments were booked, and how much revenue came in.
          </p>

          <div className="flex items-center justify-center mt-6 sm:mt-8 w-full overflow-x-auto px-1 scrollbar-none">
            <div className="inline-flex p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("calls")}
                className={`whitespace-nowrap px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "calls"
                    ? "text-white shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
                style={
                  activeTab === "calls"
                    ? {
                        background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 12px rgba(230, 92, 142, 0.35)",
                      }
                    : {}
                }
              >
                <span className="sm:hidden">Call Logs</span>
                <span className="hidden sm:inline">Call Logs & Summaries</span>
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`whitespace-nowrap px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "schedule"
                    ? "text-white shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
                style={
                  activeTab === "schedule"
                    ? {
                        background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 12px rgba(230, 92, 142, 0.35)",
                      }
                    : {}
                }
              >
                <span className="sm:hidden">Calendar</span>
                <span className="hidden sm:inline">Team Calendar</span>
              </button>
              <button
                onClick={() => setActiveTab("crm")}
                className={`whitespace-nowrap px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "crm"
                    ? "text-white shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
                style={
                  activeTab === "crm"
                    ? {
                        background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 12px rgba(230, 92, 142, 0.35)",
                      }
                    : {}
                }
              >
                <span className="sm:hidden">Client Notes</span>
                <span className="hidden sm:inline">Customer History & Notes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-[#120810]/75 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/40 uppercase mb-1.5 sm:mb-2">
              <span className="truncate">Calls Today</span>
              <Phone size={13} className="text-[#EC89B5] shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-white tracking-tight truncate">48</div>
            <div className="text-[11px] sm:text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1 truncate">
              <CheckCircle2 size={11} className="shrink-0" />
              <span className="truncate">100% answered • 0 missed</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-[#120810]/75 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/40 uppercase mb-1.5 sm:mb-2">
              <span className="truncate">Booked Revenue</span>
              <IndianRupee size={13} className="text-emerald-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-mono text-emerald-400 tracking-tight truncate">
              ₹1,84,200
            </div>
            <div className="text-[11px] sm:text-xs text-white/50 font-mono mt-1 truncate">18 appointments scheduled</div>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-[#120810]/75 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/40 uppercase mb-1.5 sm:mb-2">
              <span className="truncate">Hours Saved</span>
              <Clock size={13} className="text-[#ECA9B7] shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-white tracking-tight truncate">36.5 hrs</div>
            <div className="text-[11px] sm:text-xs text-white/50 font-mono mt-1 truncate">This week alone</div>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-[#120810]/75 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-white/40 uppercase mb-1.5 sm:mb-2">
              <span className="truncate">Feedback</span>
              <HeartHandshake size={13} className="text-pink-400 shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-white tracking-tight truncate">
              4.98<span className="text-white/40 text-sm sm:text-lg">/5</span>
            </div>
            <div className="text-[11px] sm:text-xs text-[#EC89B5] font-mono mt-1 truncate">Positive caller ratings</div>
          </div>
        </div>

        {/* Tab 1: Call Logs */}
        {activeTab === "calls" && (
          <div 
            className="rounded-2xl border border-white/10 p-4 sm:p-8 shadow-2xl bg-[#120810]/80 backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/[0.08]">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span>Inbound Call Feed</span>
                <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-[#A66B8E]/20 text-[#EC89B5] border border-[#A66B8E]/30 whitespace-nowrap">
                  Live Feed
                </span>
              </h3>
              <span className="text-[11px] sm:text-xs font-mono text-white/40">Direct transcripts & summaries</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {CALL_RECORDS.map((c, idx) => (
                <div
                  key={c.caller}
                  className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#A66B8E]/15 text-[#EC89B5] flex items-center justify-center font-bold font-mono shrink-0 text-xs sm:text-sm">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-semibold text-white flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span>{c.caller}</span>
                          <span className="text-[11px] sm:text-xs font-mono text-white/40">{c.phone}</span>
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#EC89B5] font-mono mt-0.5">
                          {c.service} • Assigned to {c.staff}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-center pl-12 sm:pl-0">
                      <span className="text-[11px] sm:text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold whitespace-nowrap">
                        {c.status} ({c.revenue})
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono text-white/40 whitespace-nowrap">{c.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light pl-0 sm:pl-13 mt-1.5 sm:mt-0">
                    <strong className="text-white font-medium">Summary: </strong>
                    {c.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Calendar */}
        {activeTab === "schedule" && (
          <div 
            className="rounded-2xl border border-white/10 p-4 sm:p-8 shadow-2xl bg-[#120810]/80 backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/[0.08]">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span>Today's Appointment Schedule</span>
                <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 whitespace-nowrap">
                  Synchronized
                </span>
              </h3>
              <span className="text-[11px] sm:text-xs font-mono text-white/40">Updated automatically</span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {SCHEDULE_ITEMS.map((item) => (
                <div
                  key={item.time}
                  className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="font-mono text-xs sm:text-sm font-bold text-white/80 w-16 sm:w-20 shrink-0">
                      {item.time}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.client}</div>
                      <div className="text-[11px] sm:text-xs text-white/50 font-mono mt-0.5">
                        {item.service} • Assigned: {item.staff}
                      </div>
                    </div>
                  </div>

                  <span 
                    className="text-[11px] sm:text-xs font-mono px-2.5 py-1 rounded-lg self-start sm:self-center font-semibold whitespace-nowrap"
                    style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: CRM */}
        {activeTab === "crm" && (
          <div 
            className="rounded-2xl border border-white/10 p-4 sm:p-8 shadow-2xl bg-[#120810]/80 backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/[0.08]">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span>Customer Preferences & History</span>
                <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-[#E65C8E]/15 text-[#ECA9B7] border border-[#E65C8E]/30 whitespace-nowrap">
                  Client Memory
                </span>
              </h3>
              <span className="text-[11px] sm:text-xs font-mono text-white/40">Saved automatically from calls</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              {CLIENT_PROFILES.map((p) => (
                <div
                  key={p.name}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#EC89B5] font-mono mt-0.5">{p.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-emerald-400">{p.spend}</div>
                      <div className="text-[10px] text-white/40 font-mono">{p.visits} visits</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 mb-4">
                    <div className="text-[10px] uppercase font-mono text-white/40 mb-1">Client Notes</div>
                    <p className="text-xs text-white/80 leading-relaxed font-light">
                      {p.notes}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>Favorite Staff: {p.preferredStaff}</span>
                    <span>Last visit: {p.lastSeen}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
