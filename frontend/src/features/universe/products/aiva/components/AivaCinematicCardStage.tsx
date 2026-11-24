import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { 
  PhoneCall, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  User, 
  PhoneMissed, 
  Clock, 
  Users, 
  MessageSquareOff, 
  ShieldCheck, 
  Phone, 
  IndianRupee, 
  HeartHandshake, 
  CalendarCheck, 
  MessageSquare, 
  BrainCircuit, 
  Check, 
  Lock, 
  PhoneForwarded, 
  Radio, 
  Play, 
  Pause, 
  ChevronUp, 
  ChevronDown, 
  Sparkles,
  GitBranch,
  GitMerge,
  Cpu,
  ArrowRight
} from "lucide-react";

// --- TYPES & DATA DEFINITIONS ---

interface Scenario {
  id: string;
  title: string;
  caller: string;
  service: string;
  time: string;
  revenue: string;
  dialogue: Array<{ speaker: "caller" | "aiva"; text: string }>;
}

const CALL_SCENARIOS: Scenario[] = [
  {
    id: "salon",
    title: "Boutique Salon (Indiranagar)",
    caller: "Pooja Menon",
    service: "HydraFacial + Hair Styling",
    time: "Thu, 2:30 PM",
    revenue: "₹3,700",
    dialogue: [
      { speaker: "caller", text: "Hi! Do you have any openings for a HydraFacial with Divya this Thursday afternoon?" },
      { speaker: "aiva", text: "Hello Pooja! Divya has an opening at 2:30 PM or 4:30 PM. Which one works better for you?" },
      { speaker: "caller", text: "2:30 PM is perfect, thank you!" },
      { speaker: "aiva", text: "You're all booked for Thursday at 2:30 PM. I just sent the confirmation and prep tips straight to your WhatsApp!" }
    ]
  },
  {
    id: "clinic",
    title: "Dental Clinic",
    caller: "Arjun Verma",
    service: "Consultation & Digital X-Ray",
    time: "Sat, 11:00 AM",
    revenue: "₹1,500",
    dialogue: [
      { speaker: "caller", text: "Hello, my tooth has been hurting since yesterday. Can I see Dr. Rao this Saturday morning?" },
      { speaker: "aiva", text: "Hi Arjun, so sorry to hear about the pain. Dr. Rao has a slot this Saturday at 11:00 AM. Shall I lock that in for you?" },
      { speaker: "caller", text: "Yes please, that would be great." },
      { speaker: "aiva", text: "Locked in for Saturday at 11:00 AM. I've sent the clinic location map and an intake form to your phone." }
    ]
  },
  {
    id: "studio",
    title: "Design Studio",
    caller: "Kavita Nair",
    service: "Brand Strategy Session",
    time: "Tomorrow, 4:00 PM",
    revenue: "₹15,000",
    dialogue: [
      { speaker: "caller", text: "Hi, I'd like to book an initial design discovery session for our new fintech brand." },
      { speaker: "aiva", text: "Exciting project, Kavita! Our lead strategist Nikhil has time tomorrow at 4:00 PM or Friday at 11:00 AM." },
      { speaker: "caller", text: "Tomorrow at 4 works great." },
      { speaker: "aiva", text: "Done! Calendar invite and Google Meet link are on their way to your email right now." }
    ]
  }
];

const PROBLEMS = [
  {
    icon: PhoneMissed,
    category: "Peak-Hour Surge",
    stat: "32%",
    statLabel: "Inbound calls missed",
    title: "Unanswered calls during the daily rush.",
    description: "When staff is occupied with in-person clients, the phone rings out. Most callers hang up within 8 seconds and immediately book with the next competitor on Google.",
    solution: "Aiva answers in under 240ms with warm, natural hospitality. Handles unlimited concurrent callers, checks live operatory slots, and locks the booking right then and there.",
    tags: ["Sub-300ms Pick-up", "Zero Busy Tones", "100% Captured"]
  },
  {
    icon: Clock,
    category: "After-Hours Leak",
    stat: "₹1.4L+",
    statLabel: "Lost bookings/month",
    title: "Losing high-value bookings after you close.",
    description: "Clients remember to schedule appointments late at night or early Sunday morning when your doors are locked and nobody is at the reception desk.",
    solution: "Aiva works 24/7/365 without overtime costs, converting late-night and weekend callers into confirmed appointments on your calendar with instant WhatsApp slips.",
    tags: ["24/7 Coverage", "Instant WhatsApp Slips", "Zero Overtime"]
  },
  {
    icon: Users,
    category: "Front-Desk Bottleneck",
    stat: "14 hrs",
    statLabel: "Lost weekly to phone tag",
    title: "Front desk constantly interrupted by the phone.",
    description: "Front desk staff is continually distracted while greeting clients in person to answer repetitive routine questions on pricing, doctor timings, and directions.",
    solution: "Handles 100% of routine inquiries and appointment bookings autonomously, letting your team focus on premium in-person client care.",
    tags: ["Zero Desk Distraction", "100% In-Person Focus", "Calmer Lobby Atmosphere"]
  },
  {
    icon: MessageSquareOff,
    category: "Client Retention",
    stat: "1 in 3",
    statLabel: "Churn from cold triage",
    title: "Treating loyal regulars like first-time strangers.",
    description: "Returning VIP clients are forced to re-explain their treatment history, doctor preferences, and notes every time they dial in.",
    solution: "Instantly recognizes caller ID, greets regulars by name, recalls past doctor notes and service preferences, and delivers warm VIP concierge care.",
    tags: ["Instant VIP Recall", "Specialist Preference Sync", "Automated Client Memory"]
  }
];

const STAGES = [
  {
    step: "01",
    phase: "AUDIO INGESTION",
    title: "Answers on Ring 1 in Fluent Voice",
    metric: "240ms",
    icon: PhoneCall,
    color: "#E65C8E",
    desc: "Aiva answers instantly with warm, natural hospitality. Effortlessly navigates interruptions, everyday conversational speech, and background noise.",
    telemetry: "Sub-300ms Speech • Bangalore Low-Latency Node"
  },
  {
    step: "02",
    phase: "SCHEDULE ENGINE",
    title: "Checks Operatory & Doctor Buffer",
    metric: "0 Clashes",
    icon: CalendarCheck,
    color: "#A66B8E",
    desc: "Cross-checks real-time doctor availability across Google Calendar & CRM. Enforces 15-minute sanitization prep buffers so chairs never double-book.",
    telemetry: "15-Min Buffer Locked • Zero Overlap"
  },
  {
    step: "03",
    phase: "DISPATCH AUTOMATION",
    title: "Dispatches WhatsApp Slip & Map",
    metric: "3.4s",
    icon: MessageSquare,
    color: "#10B981",
    desc: "Dispatches an official branded WhatsApp slip with doctor name, appointment time, Google Maps pin, and UPI advance token link before caller hangs up.",
    telemetry: "Verified WhatsApp API • 98% Open Rate"
  },
  {
    step: "04",
    phase: "EXECUTIVE DOSSIER",
    title: "Saves Client Dossier & VIP Notes",
    metric: "100%",
    icon: BrainCircuit,
    color: "#10B981",
    desc: "Logs treatment type, preferred specialist, call audio replay, and transcript directly to your dashboard. Remembers repeat clients for future warm greetings.",
    telemetry: "Rahul Dravid • Operatory 1 Recorded"
  }
];

const PILLARS = [
  {
    tag: "PROTOCOL 01 // RULES",
    title: "Accurate Business Info Only",
    desc: "Aiva strictly quotes your verified service menu, doctor fees, and operatory timings. It never hallucinates discounts or makes up policies.",
    icon: ShieldCheck,
    color: "#E65C8E",
    telemetry: "100% Policy Bound • Zero Hallucinations",
    protocol: "VERIFIED KNOWLEDGE BASE"
  },
  {
    tag: "PROTOCOL 02 // BYPASS",
    title: "1-Tap Human Desk Takeover",
    desc: "If your reception wants to step in, one tap on the dashboard instantly transfers the caller to your clinic phone with zero hold music or disconnects.",
    icon: PhoneForwarded,
    color: "#A66B8E",
    telemetry: "Instant Bridge • Zero Disconnects",
    protocol: "DESK OPERATOR BRIDGE"
  },
  {
    tag: "PROTOCOL 03 // PRIVACY",
    title: "End-to-End Encrypted Data",
    desc: "Patient contact numbers, audio recordings, and medical notes are encrypted at rest and in transit. Your client data stays strictly yours.",
    icon: Lock,
    color: "#E65C8E",
    telemetry: "DPDP & HIPAA Compliant Storage",
    protocol: "CONFIDENTIAL CLINIC DATA"
  },
  {
    tag: "PROTOCOL 04 // ACOUSTICS",
    title: "Natural Human Conversation",
    desc: "Callers can interrupt, change their minds mid-sentence, or ask multi-part questions naturally without ever hearing a robotic 'Press 1' menu.",
    icon: Radio,
    color: "#10B981",
    telemetry: "Fluid Speech • Interruption Ready",
    protocol: "ZERO PRESS-ONE MENUS"
  }
];

// --- 3D INTERACTIVE TILT CONTAINER (Active Theory Physics) ---

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function TiltCard({ children, className = "", style = {} }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to +1
    const py = (y / rect.height) * 2 - 1;

    setRotateX(-py * 5); // 5 deg max tilt
    setRotateY(px * 5);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handlePointerLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
      {/* Dynamic Specular Sheen (Active Theory Ray Glint) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

// --- MAIN CINEMATIC CARD STAGE ---

interface AivaCinematicCardStageProps {
  onOpenBookDemo?: () => void;
  onOpenTestCall?: () => void;
}

export default function AivaCinematicCardStage({
  onOpenBookDemo,
  onOpenTestCall,
}: AivaCinematicCardStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Active Stage Index (0 to 6)
  const [stageIndex, setStageIndex] = useState(0);
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  // Audio Demo State (Stage 01)
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // Dashboard Preview Tab State (Stage 04)
  const [dashTab, setDashTab] = useState<"calls" | "schedule" | "crm">("calls");

  // ROI Calculator State (Stage 06)
  const [weeklyCalls, setWeeklyCalls] = useState(120);
  const [averageTicket, setAverageTicket] = useState(1800);

  const monthlyCalls = weeklyCalls * 4.3;
  const missedCallsMonthly = Math.round(monthlyCalls * 0.32);
  const recoveredBookings = Math.round(missedCallsMonthly * 0.65);
  const recoveredRevenueMonthly = Math.round(recoveredBookings * averageTicket);

  // Auto-advance audio dialogue in Stage 01
  const activeScenario = CALL_SCENARIOS[scenarioIdx];
  useEffect(() => {
    if (!isPlayingAudio) return;
    if (currentLine >= activeScenario.dialogue.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentLine((prev) => prev + 1);
    }, 2400);

    return () => clearTimeout(timer);
  }, [currentLine, isPlayingAudio, activeScenario]);

  // Automated Cinematic Tour Timer
  useEffect(() => {
    if (!isPlayingTour) return;

    const timer = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % 7);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlayingTour]);

  // Scroll Sync: Track container scroll to map to stage index
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (isPlayingTour) return; // Allow manual override during autoplay
      const calculatedIndex = Math.min(6, Math.floor(latest * 7));
      setStageIndex(calculatedIndex);
    });
  }, [scrollYProgress, isPlayingTour]);

  const STAGE_METADATA = [
    { num: "01", short: "CORE", name: "Live Audio Ingest", title: "Answers on Ring One in Fluent Voice", badge: "AUTONOMOUS INGESTION" },
    { num: "02", short: "LOGIC", name: "4-Quadrant Resolution", title: "Every Missed Call is Revenue Lost", badge: "THE FRONT-DESK REALITY" },
    { num: "03", short: "MATRIX", name: "Capability Parity", title: "Traditional Front Desk vs Aiva Teammate", badge: "SYSTEM COMPARISON" },
    { num: "04", short: "DECK", name: "Telemetry Console", title: "Real-Time Clinic Management Deck", badge: "LIVE TELEMETRY" },
    { num: "05", short: "RUNTIME", name: "28s Autonomous Loop", title: "From Inquiry to Confirmed Booking", badge: "WORKFLOW PIPELINE" },
    { num: "06", short: "ROI", name: "Financial Recovery", title: "Live Missed-Call Cost & Revenue Engine", badge: "FINANCIAL IMPACT" },
    { num: "07", short: "SHIELD", name: "Enterprise Governance", title: "Strict Compliance & Zero Risk Protocol", badge: "ENTERPRISE PROTOCOLS" },
  ];

  const currentMeta = STAGE_METADATA[stageIndex];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[460vh] sm:min-h-[500vh] bg-transparent"
    >
      {/* Sticky Cinematic Theater (Anchored in Viewport) */}
      <div className="sticky top-16 sm:top-20 h-[88vh] sm:h-[90vh] flex flex-col justify-between overflow-hidden px-4 sm:px-6 z-20">
        
        {/* Stage Header: Active Theory Style High-Altitude Narrative Ribbon */}
        <div className="max-w-6xl mx-auto w-full pt-2 sm:pt-4 text-center select-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
            <span>MODULE {currentMeta.num} // {currentMeta.badge}</span>
          </div>

          <h2 
            className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {currentMeta.title}
          </h2>
        </div>

        {/* Central Morphing Stage (3D Spatial Perspective) */}
        <div className="flex-1 max-w-5xl mx-auto w-full flex items-center justify-center my-auto py-2 sm:py-4">
          <AnimatePresence mode="wait">
            
            {/* === STAGE 01: HERO AUDIO DEMO CARD === */}
            {stageIndex === 0 && (
              <motion.div
                key="stage-01"
                initial={{ opacity: 0, scale: 0.90, rotateX: -10, y: 35 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.90, rotateX: 10, y: -35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl mx-auto"
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-7 shadow-2xl bg-gradient-to-b from-[#180B15]/95 via-[#0D050C]/95 to-[#120710]/95 backdrop-blur-xl">
                  {/* Chassis Ribbon */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="flex items-center gap-2 text-[#EC89B5] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
                      AIVA APPARATUS // UNIT 01
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                      LIVE AUDIO INGESTION CORE
                    </span>
                  </div>

                  {/* Scenarios Switcher */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#EC89B5] font-bold">
                      AIVA LIVE CALL DEMO
                    </span>
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 overflow-x-auto">
                      {CALL_SCENARIOS.map((sc, idx) => (
                        <button
                          key={sc.id}
                          onClick={() => {
                            setScenarioIdx(idx);
                            setCurrentLine(0);
                            setIsPlayingAudio(true);
                          }}
                          className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-all cursor-pointer ${
                            scenarioIdx === idx
                              ? "bg-[#A66B8E] text-white font-semibold shadow-sm"
                              : "text-white/40 hover:text-white"
                          }`}
                        >
                          {sc.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Caller Bar */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#A66B8E]/20 text-[#EC89B5] flex items-center justify-center font-bold">
                        <PhoneCall size={16} className="animate-pulse" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Caller: {activeScenario.caller}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            SAVED CLIENT
                          </span>
                        </div>
                        <div className="text-xs text-white/50 font-mono">Line 1 • Direct AI Phone Assistant</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentLine(0);
                        setIsPlayingAudio(true);
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>

                  {/* Dialogue Feed */}
                  <div className="space-y-3 min-h-[140px] max-h-[200px] overflow-y-auto pr-1 scrollbar-none mb-4">
                    {activeScenario.dialogue.slice(0, currentLine + 1).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2.5 items-start ${
                          msg.speaker === "aiva" ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-bold ${
                          msg.speaker === "aiva" ? "bg-[#A66B8E] text-white" : "bg-white/10 text-white/70"
                        }`}>
                          {msg.speaker === "aiva" ? "A" : <User size={12} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                          msg.speaker === "aiva"
                            ? "bg-[#A66B8E]/15 border border-[#A66B8E]/30 text-white"
                            : "bg-white/5 border border-white/10 text-white/80"
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Booking Confirmation Output */}
                  <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span className="text-white font-medium">Appointment Booked: {activeScenario.service}</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{activeScenario.revenue}</span>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 02: 4-QUADRANT PROBLEM RESOLUTION CARDS === */}
            {stageIndex === 1 && (
              <motion.div
                key="stage-02"
                initial={{ opacity: 0, scale: 0.90, rotateX: -10, y: 35 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.90, rotateX: 10, y: -35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {PROBLEMS.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <TiltCard 
                        key={p.title}
                        className="rounded-2xl border border-white/10 p-4 sm:p-5 shadow-2xl bg-[#120810]/90 backdrop-blur-xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08] text-[10px] font-mono">
                            <span className="text-[#EC89B5] font-semibold">UNIT 02.{idx + 1}</span>
                            <span className="text-white/40">{p.category}</span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-lg bg-[#E65C8E]/15 border border-[#E65C8E]/30 flex items-center justify-center text-[#ECA9B7]">
                              <Icon size={14} />
                            </div>
                            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">{p.title}</h4>
                          </div>

                          <div className="space-y-2 my-3">
                            <div className="p-2.5 rounded-xl bg-red-950/25 border border-red-500/20 text-xs text-white/70">
                              <span className="font-mono text-[10px] text-red-400 uppercase font-semibold block mb-0.5">✕ WITHOUT AIVA</span>
                              {p.description}
                            </div>
                            <div className="p-2.5 rounded-xl bg-[#E65C8E]/10 border border-[#E65C8E]/25 text-xs text-white/90">
                              <span className="font-mono text-[10px] text-[#ECA9B7] uppercase font-semibold block mb-0.5">✓ THE AIVA FIX</span>
                              {p.solution}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
                          <span>{p.statLabel}</span>
                          <span className="text-emerald-400 font-bold">{p.stat}</span>
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* === STAGE 03: CAPABILITY PARITY MATRIX (COMPARISON TABLE) === */}
            {stageIndex === 2 && (
              <motion.div
                key="stage-03"
                initial={{ opacity: 0, scale: 0.90, rotateX: -10, y: 35 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.90, rotateX: 10, y: -35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl"
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-8 shadow-2xl bg-[#120810]/95 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">AIVA APPARATUS // UNIT 03</span>
                    <span className="text-white/40">DIRECT BENCHMARK</span>
                  </div>

                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-white/40 font-mono text-[11px]">
                        <th className="pb-3 font-normal">CAPABILITY</th>
                        <th className="pb-3 font-normal">TRADITIONAL FRONT DESK</th>
                        <th className="pb-3 font-semibold text-[#EC89B5]">AIVA AUTONOMOUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      <tr>
                        <td className="py-3 font-medium text-white">Call Response Time</td>
                        <td className="py-3 text-red-400/80">3 - 8 Rings (or Missed)</td>
                        <td className="py-3 text-emerald-400 font-bold">&lt; 240ms (Instant Ring 1)</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-white">Concurrent Caller Capacity</td>
                        <td className="py-3 text-red-400/80">1 Call (Busy tone for rest)</td>
                        <td className="py-3 text-emerald-400 font-bold">Unlimited Simultaneous Calls</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-white">After-Hours & Sunday Coverage</td>
                        <td className="py-3 text-red-400/80">Voicemail (85% bounce)</td>
                        <td className="py-3 text-emerald-400 font-bold">24/7/365 Autonomous Booking</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-white">Calendar Conflict Prevention</td>
                        <td className="py-3 text-red-400/80">Human double-booking errors</td>
                        <td className="py-3 text-emerald-400 font-bold">Zero Clashes • Auto 15m Buffer</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-white">Client Recognition</td>
                        <td className="py-3 text-red-400/80">Depends on staff memory</td>
                        <td className="py-3 text-emerald-400 font-bold">Instant Caller ID & VIP Notes</td>
                      </tr>
                    </tbody>
                  </table>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 04: EXECUTIVE TELEMETRY CONSOLE (DASHBOARD) === */}
            {stageIndex === 3 && (
              <motion.div
                key="stage-04"
                initial={{ opacity: 0, scale: 0.90, rotateX: -10, y: 35 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.90, rotateX: 10, y: -35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl"
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-7 shadow-2xl bg-[#120810]/95 backdrop-blur-xl">
                  {/* Top 4 Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[10px] font-mono text-white/40 block">CALLS TODAY</span>
                      <span className="text-xl sm:text-2xl font-bold font-mono text-white">48</span>
                      <span className="text-[10px] text-emerald-400 font-mono block">100% captured</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[10px] font-mono text-white/40 block">BOOKED REVENUE</span>
                      <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">₹1,84,200</span>
                      <span className="text-[10px] text-white/50 font-mono block">18 appointments</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[10px] font-mono text-white/40 block">HOURS SAVED</span>
                      <span className="text-xl sm:text-2xl font-bold font-mono text-white">36.5 hrs</span>
                      <span className="text-[10px] text-white/50 font-mono block">This week alone</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[10px] font-mono text-white/40 block">CALLER RATING</span>
                      <span className="text-xl sm:text-2xl font-bold font-mono text-pink-400">4.98/5</span>
                      <span className="text-[10px] text-[#EC89B5] font-mono block">Zero complaints</span>
                    </div>
                  </div>

                  {/* Tab Selector */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-xs font-mono font-bold text-white uppercase">INBOUND FEED & TELEMETRY</span>
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                      <button 
                        onClick={() => setDashTab("calls")} 
                        className={`px-3 py-1 rounded-lg text-[10px] font-mono ${dashTab === "calls" ? "bg-[#E65C8E] text-white" : "text-white/40"}`}
                      >
                        Call Feed
                      </button>
                      <button 
                        onClick={() => setDashTab("schedule")} 
                        className={`px-3 py-1 rounded-lg text-[10px] font-mono ${dashTab === "schedule" ? "bg-[#E65C8E] text-white" : "text-white/40"}`}
                      >
                        Calendar
                      </button>
                      <button 
                        onClick={() => setDashTab("crm")} 
                        className={`px-3 py-1 rounded-lg text-[10px] font-mono ${dashTab === "crm" ? "bg-[#E65C8E] text-white" : "text-white/40"}`}
                      >
                        Client Memory
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-white block">Dr. Sarah Jenkins · Patient Consultation</span>
                        <span className="text-white/40 text-[11px] font-mono">Booked via phone · WhatsApp slip dispatched · ₹4,500</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold">
                        CONFIRMED
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-white block">Divya Nair · Hair Treatment & Blowdry</span>
                        <span className="text-white/40 text-[11px] font-mono">Booked 11:45 PM Sunday · ₹2,800</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold">
                        AFTER-HOURS
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 05: 28-SECOND AUTONOMOUS LOOP === */}
            {stageIndex === 4 && (
              <motion.div
                key="stage-05"
                initial={{ opacity: 0, scale: 0.90, rotateX: -10, y: 35 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.90, rotateX: 10, y: -35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
                  {STAGES.map((s, idx) => {
                    const Icon = s.icon;
                    return (
                      <TiltCard key={s.step} className="p-4 rounded-2xl border border-white/10 bg-[#0E060D] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06] text-[10px] font-mono text-white/40">
                            <span>STEP {s.step}</span>
                            <div className="w-6 h-6 rounded-md flex items-center justify-center border border-white/10" style={{ background: `${s.color}15`, color: s.color }}>
                              <Icon size={13} />
                            </div>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1.5">{s.title}</h4>
                          <p className="text-xs text-white/60 font-light mb-3">{s.desc}</p>
                        </div>
                        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                          <span className="text-white/40">LATENCY</span>
                          <span className="text-emerald-400 font-bold">{s.metric}</span>
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-[#140812] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-white/80 font-medium flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#EC89B5]" />
                    Staff Productivity Guarantee: 100% of calls captured or money-back guarantee.
                  </span>
                  <span className="text-emerald-400 font-mono font-bold whitespace-nowrap">0 Missed Calls</span>
                </div>
              </motion.div>
            )}

            {/* === STAGE 06: FINANCIAL RECOVERY ENGINE (ROI SLIDER) === */}
            {stageIndex === 5 && (
              <motion.div
                key="stage-06"
                initial={{ opacity: 0, scale: 0.90, rotateX: -10, y: 35 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.90, rotateX: 10, y: -35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl"
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-8 shadow-2xl bg-[#120810]/95 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">AIVA APPARATUS // UNIT 06</span>
                    <span className="text-white/40">VALUE SIMULATOR</span>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-5">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-white mb-2">
                          <span>Inbound Calls Per Week</span>
                          <span className="font-mono text-[#EC89B5]">{weeklyCalls} calls/week</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="400"
                          step="10"
                          value={weeklyCalls}
                          onChange={(e) => setWeeklyCalls(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E65C8E]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-white mb-2">
                          <span>Average Booking / Service Value</span>
                          <span className="font-mono text-emerald-400">₹{averageTicket.toLocaleString("en-IN")}</span>
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
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between text-xs font-mono">
                        <span>Missed Calls Saved: <strong className="text-white">{missedCallsMonthly}</strong>/mo</span>
                        <span>Captured Appointments: <strong className="text-emerald-400">{recoveredBookings}</strong>/mo</span>
                      </div>
                    </div>

                    <div className="md:col-span-5 p-5 rounded-2xl border border-[#A66B8E]/30 text-center bg-gradient-to-br from-[#1D0A18] to-[#0D050C]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                        ESTIMATED RECOVERED REVENUE
                      </span>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-emerald-400 tracking-tight mb-2">
                        +₹{recoveredRevenueMonthly.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[11px] font-mono text-white/50 block">Per month in previously lost revenue</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 07: ENTERPRISE GOVERNANCE MATRIX === */}
            {stageIndex === 6 && (
              <motion.div
                key="stage-07"
                initial={{ opacity: 0, scale: 0.90, rotateX: -10, y: 35 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.90, rotateX: 10, y: -35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
                  {PILLARS.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <TiltCard key={p.title} className="p-4 rounded-2xl border border-white/10 bg-[#0E060D] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06] text-[10px] font-mono text-white/40">
                            <span>UNIT 07.{idx + 1}</span>
                            <div className="w-6 h-6 rounded-md flex items-center justify-center border border-white/10" style={{ background: `${p.color}15`, color: p.color }}>
                              <Icon size={13} />
                            </div>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1.5">{p.title}</h4>
                          <p className="text-xs text-white/60 font-light mb-3">{p.desc}</p>
                        </div>
                        <div className="pt-2 border-t border-white/[0.06] text-[10px] font-mono text-emerald-400">
                          {p.telemetry}
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onOpenBookDemo}
                    className="h-11 px-6 rounded-xl font-semibold text-xs text-white inline-flex items-center gap-2 transition-all cursor-pointer hover:brightness-110 active:scale-95"
                    style={{
                      background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                      boxShadow: "0 4px 15px rgba(230, 92, 142, 0.4)",
                    }}
                  >
                    <span>Deploy Aiva On Your Clinic Line</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={onOpenTestCall}
                    className="h-11 px-5 rounded-xl font-medium text-xs text-white/80 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    <span>Hear Live Audio Demo</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Stage Controller (Active Theory Floating Capsule) */}
        <div className="max-w-xl mx-auto w-full pb-3 sm:pb-4 flex items-center justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#0D050C]/95 border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(230,92,142,0.25)] backdrop-blur-2xl">
            
            {/* Play/Pause Auto Tour */}
            <button
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              title={isPlayingTour ? "Pause Cinematic Tour" : "Play Cinematic Tour"}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isPlayingTour ? "bg-[#E65C8E] text-white" : "text-white/40 hover:text-white hover:bg-white/10"
              }`}
            >
              {isPlayingTour ? <Pause size={13} /> : <Play size={13} />}
            </button>

            {/* Stepper Buttons 01 - 07 */}
            <div className="flex items-center gap-1 px-1">
              {STAGE_METADATA.map((meta, idx) => {
                const isActive = idx === stageIndex;
                return (
                  <button
                    key={meta.num}
                    onClick={() => {
                      setIsPlayingTour(false);
                      setStageIndex(idx);
                    }}
                    className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer ${
                      isActive
                        ? "text-white font-bold"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                    style={
                      isActive
                        ? {
                            background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                            boxShadow: "0 2px 10px rgba(230, 92, 142, 0.4)",
                          }
                        : {}
                    }
                  >
                    <span>{meta.num}</span>
                    <span className="hidden md:inline ml-1 text-[9px] opacity-75">{meta.short}</span>
                  </button>
                );
              })}
            </div>

            {/* Chevrons Up / Down */}
            <div className="flex items-center pl-1 border-l border-white/10">
              <button
                onClick={() => {
                  setIsPlayingTour(false);
                  setStageIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={stageIndex === 0}
                className="p-1 text-white/50 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={() => {
                  setIsPlayingTour(false);
                  setStageIndex((prev) => Math.min(6, prev + 1));
                }}
                disabled={stageIndex === 6}
                className="p-1 text-white/50 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
