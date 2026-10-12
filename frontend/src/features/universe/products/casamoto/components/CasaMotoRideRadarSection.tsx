import { useState, useEffect } from "react";
import { 
  Radio, 
  AlertCircle, 
  Navigation, 
  Coffee,
  Activity
} from "lucide-react";

interface RiderNode {
  id: string;
  name: string;
  callsign: string;
  bike: string;
  speed: number;
  role: "lead" | "member" | "sweeper";
  battery: number;
  x: number; // radar percentage
  y: number;
  status: "active" | "lagging";
}

const INITIAL_RIDERS: RiderNode[] = [
  { id: "1", name: "Gautham", callsign: "Ghost_01", bike: "Panigale V4 S", speed: 104, role: "lead", battery: 92, x: 50, y: 30, status: "active" },
  { id: "2", name: "Karthik", callsign: "Apex_Raven", bike: "Street Triple RS", speed: 98, role: "member", battery: 78, x: 42, y: 44, status: "active" },
  { id: "3", name: "Rahul", callsign: "KTM_Drifter", bike: "Duke 390", speed: 96, role: "member", battery: 84, x: 58, y: 52, status: "active" },
  { id: "4", name: "Arjun", callsign: "Interceptor_X", bike: "GT 650", speed: 82, role: "member", battery: 65, x: 38, y: 72, status: "lagging" },
  { id: "5", name: "Deepak", callsign: "Tail_Gunner", bike: "Tiger 900 Rally", speed: 85, role: "sweeper", battery: 95, x: 48, y: 84, status: "active" },
];

export default function CasaMotoRideRadarSection() {
  const [riders] = useState<RiderNode[]>(INITIAL_RIDERS);
  const [radarPulse, setRadarPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRadarPulse((p) => (p + 1) % 100);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      {/* Background radial radar ambient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none opacity-10"
        style={{ background: "#00E5FF" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FF6B00] border border-[#FF6B00]/20 bg-[#FF6B00]/5 mb-4 font-mono">
            Next-Gen Ride Coordination
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tactical Group Ride Radar. <br />
            <span className="text-white/40">Never lose a rider at a traffic light again.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Existing navigation apps treat group rides like single cars in traffic. 
            CasaMoto provides real-time mesh tracking, formation telemetry, and automated sweeper alerts.
          </p>
        </div>

        {/* The Tactical Cockpit Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Radar Screen Visualizer (7 Cols) */}
          <div className="lg:col-span-7">
            <div 
              className="rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden backdrop-blur-2xl shadow-2xl"
              style={{
                background: "linear-gradient(145deg, rgba(14, 18, 28, 0.9) 0%, rgba(6, 8, 14, 0.95) 100%)",
                boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 229, 255, 0.08)",
              }}
            >
              {/* Radar Status Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF]">
                  <Radio size={14} className="animate-pulse" />
                  <span className="font-bold tracking-wider">TACTICAL MESH • 5 BIKES CONNECTED</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  <span>GPS 5Hz L1+L5 Lock</span>
                </div>
              </div>

              {/* Radar circular screen */}
              <div className="relative w-full aspect-square max-w-[440px] mx-auto rounded-full border border-[#00E5FF]/20 bg-black/60 overflow-hidden flex items-center justify-center shadow-inner">
                {/* Concentric distance rings */}
                <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[#00E5FF]/15" />
                <div className="absolute w-[60%] h-[60%] rounded-full border border-[#00E5FF]/20" />
                <div className="absolute w-[40%] h-[40%] rounded-full border border-dashed border-[#00E5FF]/25" />
                <div className="absolute w-[20%] h-[20%] rounded-full border border-[#00E5FF]/30" />

                {/* Crosshairs */}
                <div className="absolute w-full h-px bg-[#00E5FF]/15" />
                <div className="absolute h-full w-px bg-[#00E5FF]/15" />

                {/* Sweep animation line */}
                <div 
                  className="absolute inset-0 origin-center pointer-events-none"
                  style={{
                    transform: `rotate(${radarPulse * 3.6}deg)`,
                    background: "conic-gradient(from 0deg at 50% 50%, rgba(0, 229, 255, 0.25) 0deg, transparent 45deg, transparent 360deg)",
                  }}
                />

                {/* Distance scale labels */}
                <span className="absolute top-3 font-mono text-[9px] text-[#00E5FF]/50">3.0 KM</span>
                <span className="absolute top-[22%] font-mono text-[9px] text-[#00E5FF]/40">1.5 KM</span>
                <span className="absolute top-[32%] font-mono text-[9px] text-[#00E5FF]/30">500 M</span>

                {/* Riders Rendered on Radar */}
                {riders.map((r) => (
                  <div
                    key={r.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all"
                    style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  >
                    <div className="relative">
                      {/* Ping ring */}
                      {r.status === "lagging" && (
                        <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                      )}
                      {r.role === "lead" && (
                        <div className="absolute inset-0 rounded-full bg-[#FF6B00] animate-ping opacity-50" />
                      )}

                      {/* Dot icon */}
                      <div 
                        className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[8px] text-black ${
                          r.role === "lead" 
                            ? "bg-[#FF6B00] text-black ring-2 ring-[#FF6B00]/50" 
                            : r.status === "lagging" 
                            ? "bg-red-500 text-white ring-2 ring-red-500/50" 
                            : "bg-[#00E5FF] text-black"
                        }`}
                      >
                        {r.role === "lead" ? "L" : r.role === "sweeper" ? "S" : "•"}
                      </div>
                    </div>

                    {/* Rider label badge */}
                    <div className="mt-1 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-white whitespace-nowrap shadow-md">
                      {r.callsign} ({r.speed} km/h)
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Radar Controls & Alerts */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>Drop-Off Alert: Interceptor_X is 850m behind formation</span>
                </div>
                <div className="text-white/40">
                  Target: Nandi Hills Checkpoint (12.4 km)
                </div>
              </div>
            </div>
          </div>

          {/* Radar Features & Telemetry Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00] flex items-center justify-center">
                  <Navigation size={18} />
                </div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Autonomous Sweeper Protocol
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                If a rider misses a highway exit or drops below the group's rolling pace threshold, 
                CasaMoto instantly notifies the Designated Sweeper and Lead Bike with exact GPS coordinates.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/15 text-[#00E5FF] flex items-center justify-center">
                  <Coffee size={18} />
                </div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Synchronized Fuel & Chai Stops
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                Add waypoints, scenic pull-offs, and fuel stations. Everyone's HUD updates simultaneously, 
                eliminating stopping on the shoulder of expressways to debate directions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Activity size={18} />
                </div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Lean Angle & G-Force Telemetry
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                Capture high-resolution riding dynamics: cornering lean angles (up to 52° recorded), 
                braking deceleration forces, and elevation changes saved directly into your ride logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
