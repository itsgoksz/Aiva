/**
 * AivaCinematicCardStage — Cosmic Metamorphosis Theater (Active Theory Architecture)
 * 
 * Cinematic Features:
 * 1. Deep Space Cosmic Star Emergence: Cards physically materialize out of the background stars
 *    (scale: 0.15, blur: 18px -> scale: 1, blur: 0px) and dissolve back into distant space on scroll.
 * 2. Translucent Obsidian Cosmic Glass: Real background stars twinkle right through the card face.
 * 3. Stardust Aura Emitters: Shimmering stardust constellations envelop active modules.
 * 4. Active Theory 3D Tilt Physics: Subtle perspective tilt with dynamic specular sheen.
 * 5. Mobile Smoothness & Touch Swipe: Responsive touch gestures and dynamic viewport sizing.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { 
  PhoneCall, 
  RotateCcw, 
  CheckCircle2, 
  User, 
  PhoneMissed, 
  Clock, 
  Users, 
  MessageSquareOff, 
  ShieldCheck, 
  CalendarCheck, 
  MessageSquare, 
  Database, 
  ArrowRight,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Calendar,
  Lock
} from "lucide-react";

// --- STATIC STAGE REPOSITORY & DATA STRUCTURES ---

const CALL_SCENARIOS = [
  {
    id: "salon",
    title: "Boutique Salon (Indiranagar)",
    caller: "Pooja Menon",
    service: "HydraFacial with Divya",
    time: "Thursday 2:30 PM",
    revenue: "₹3,700",
    dialogue: [
      { speaker: "caller", text: "Hi! Do you have any openings for a HydraFacial with Divya this Thursday afternoon?" },
      { speaker: "aiva", text: "Hello Pooja! Divya has an opening at 2:30 PM or 4:30 PM. Which one works better for you?" },
      { speaker: "caller", text: "2:30 PM is perfect, thank you!" },
      { speaker: "aiva", text: "You're all booked for Thursday at 2:30 PM. I just sent the confirmation and prep tips straight to your WhatsApp!" },
    ],
  },
  {
    id: "dental",
    title: "Dental Clinic",
    caller: "Dr. Vikram Seth",
    service: "Root Canal Follow-up",
    time: "Tomorrow 11:00 AM",
    revenue: "₹5,200",
    dialogue: [
      { speaker: "caller", text: "I have throbbing tooth pain from yesterday's filling. Can I see the doctor tomorrow morning?" },
      { speaker: "aiva", text: "I'm so sorry you're in discomfort. I'm holding an emergency slot with Dr. Rao tomorrow at 11:00 AM. Does that work?" },
      { speaker: "caller", text: "Yes please, please confirm that." },
      { speaker: "aiva", text: "Locked in for 11:00 AM. An SMS token and pain relief guidance have been dispatched to your mobile." },
    ],
  },
  {
    id: "studio",
    title: "Design Studio",
    caller: "Aarav Sharma",
    service: "Brand Discovery Session",
    time: "Friday 4:00 PM",
    revenue: "₹15,000",
    dialogue: [
      { speaker: "caller", text: "Hey team, we're launching a fintech app and need a 45-minute discovery consultation this Friday." },
      { speaker: "aiva", text: "Exciting! Our creative partner Kabir is open Friday at 4:00 PM. Shall I reserve that for your team?" },
      { speaker: "caller", text: "That sounds great, let's lock it in." },
      { speaker: "aiva", text: "Confirmed for Friday at 4:00 PM. A calendar invite and Google Meet link are in your inbox." },
    ],
  },
];

const PROBLEMS = [
  {
    icon: PhoneMissed,
    category: "FRONT-DESK BOTTLENECK",
    stat: "32%",
    statLabel: "Inbound calls missed",
    title: "Unanswered calls during the daily rush.",
    description: "When staff is occupied with in-person clients, calls ring out. Most callers hang up within 8 seconds and immediately book with the next competitor on Google.",
    solution: "Aiva answers in under 240ms with warm hospitality, handles unlimited concurrent callers, and locks bookings directly into your calendar.",
    tags: ["< 240ms Pick-up", "Zero Busy Tones", "100% Capture"]
  },
  {
    icon: Clock,
    category: "AFTER-HOURS CAPTURE",
    stat: "₹1.4L+",
    statLabel: "Lost bookings/mo",
    title: "Losing high-value bookings after doors close.",
    description: "Clients attempt to book late at night or on weekends when clinic doors are locked and nobody is at the front desk to answer.",
    solution: "Operates 24/7/365 with zero overtime costs, locking calendar slots and sending instant WhatsApp confirmations while you sleep.",
    tags: ["24/7/365 Always-On", "Instant WhatsApp Slips", "Zero Overtime"]
  },
  {
    icon: Users,
    category: "FRONT-DESK BOTTLENECK",
    stat: "14 hrs",
    statLabel: "Lost Weekly",
    title: "Front desk staff constantly interrupted by calls.",
    description: "In-person check-ins and client consultations are repeatedly derailed by routine questions on pricing, timings, and directions.",
    solution: "Handles 100% of routine inquiries and appointment bookings autonomously, letting your team focus on premium in-person client care.",
    tags: ["Zero Desk Distraction", "100% In-Person Focus", "Calmer Lobby Atmosphere"]
  },
  {
    icon: MessageSquareOff,
    category: "CLIENT RETENTION",
    stat: "1 in 3",
    statLabel: "Cold Churn",
    title: "Treating loyal regulars like first-time strangers.",
    description: "Returning VIP clients are forced to re-explain their treatment history, doctor preferences, and medical notes on every call.",
    solution: "Instantly recognizes caller ID, greets regulars by name, recalls past doctor notes and service preferences, and delivers warm VIP concierge care.",
    tags: ["Instant VIP Recall", "Specialist Preference Sync", "Automated Client Memory"]
  }
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    phase: "AUDIO INGESTION",
    title: "Answers on Ring 1 in Fluent Voice",
    metric: "240ms",
    icon: PhoneCall,
    color: "#E65C8E",
    desc: "Aiva answers instantly with warm, natural hospitality. Effortlessly navigates interruptions, everyday Indian conversational speech, clinical questions, and background noise.",
    telemetry: "Live Voice Stream • Sub-300ms Speech"
  },
  {
    step: "02",
    phase: "SCHEDULE ENGINE",
    title: "Checks Operatory & Doctor Buffer",
    metric: "0 Clashes",
    icon: CalendarCheck,
    color: "#A66B8E",
    desc: "Cross-checks real-time doctor availability across Google Calendar & Practo. Enforces 15-minute sanitization prep buffers so chairs never get double-booked.",
    telemetry: "Calendar Defense • 15 Min Buffer Locked"
  },
  {
    step: "03",
    phase: "DISPATCH AUTOMATION",
    title: "Dispatches WhatsApp Slip & Map",
    metric: "3.4s",
    icon: MessageSquare,
    color: "#34D399",
    desc: "Dispatches an official branded WhatsApp slip with specialist doctor name, appointment time, Google Maps pin, and UPI advance token link before caller hangs up.",
    telemetry: "WhatsApp API • Verified Green Badge"
  },
  {
    step: "04",
    phase: "EXECUTIVE DOSSIER",
    title: "Saves Client Dossier & VIP Notes",
    metric: "100%",
    icon: Database,
    color: "#EC89B5",
    desc: "Logs treatment type, preferred specialist, call audio replay, and transcript directly to your owner dashboard. Remembers repeat clients for future warm greetings.",
    telemetry: "Client Memory • Automated History Sync"
  }
];

const GOVERNANCE_PILLARS = [
  {
    title: "SOC2 & HIPAA Compliant",
    desc: "All audio streams, patient records, and booking notes are encrypted end-to-end with strict 256-bit AES standards.",
    telemetry: "256-Bit Encrypted Data",
    icon: ShieldCheck,
    color: "#34D399"
  },
  {
    title: "Practo & Google Calendar Sync",
    desc: "Bi-directional instant synchronization. When a receptionist makes a manual booking, Aiva respects the lock in 50ms.",
    telemetry: "Sub-50ms 2-Way Lock",
    icon: Calendar,
    color: "#E65C8E"
  },
  {
    title: "Official WhatsApp Business API",
    desc: "Send instant branded confirmation slips with map locations, prep instructions, and cancellation links automatically.",
    telemetry: "Green Checkmark Verified",
    icon: FileCheck2,
    color: "#A66B8E"
  },
  {
    title: "Zero Hallucination Protocol",
    desc: "Strict clinical and salon guardrails. If a caller asks for medical advice beyond your guidelines, Aiva gracefully routes to human staff.",
    telemetry: "100% Guardrailed Responses",
    icon: Lock,
    color: "#EC89B5"
  }
];

// --- COSMIC STARDUST EMERGENCE & DISSOLUTION PHYSICS ---
// Entering card emerges forward out of the background starfield:
// (scale: 0.15, blur: 18px -> scale: 1, blur: 0px)
// Exiting card dissolves backward into distant cosmic stars:
// (scale: 0.12, blur: 22px -> scale: 0, blur: 24px)
const COSMIC_STAR_TRANSITION = {
  initial: { 
    opacity: 0, 
    scale: 0.15, 
    rotateX: -14, 
    filter: "blur(18px)", 
    y: 35 
  },
  animate: { 
    opacity: 1, 
    scale: 1, 
    rotateX: 0, 
    filter: "blur(0px)", 
    y: 0 
  },
  exit: { 
    opacity: 0, 
    scale: 0.12, 
    rotateX: 14, 
    filter: "blur(22px)", 
    y: -35 
  },
  transition: { 
    duration: 0.85, 
    ease: [0.16, 1, 0.3, 1] 
  }
};

// Shimmering Celestial Stardust Halo Emitter
function StardustAura() {
  return (
    <div className="pointer-events-none absolute -inset-6 sm:-inset-12 z-0 overflow-visible">
      {/* Ambient Celestial Glow Behind Card */}
      <div 
        className="absolute inset-4 rounded-3xl opacity-60 blur-2xl"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(230,92,142,0.22) 0%, rgba(166,107,142,0.10) 45%, transparent 75%)"
        }}
      />
      {/* Shimmering Star Sparkles */}
      {[...Array(26)].map((_, i) => {
        const top = (i * 13 + 7) % 100;
        const left = (i * 19 + 5) % 100;
        const delay = (i * 0.22) % 2.5;
        const isRose = i % 3 === 0;
        const isEmerald = i % 5 === 0;
        const size = (i % 3 === 0) ? 3.5 : (i % 2 === 0 ? 2 : 2.5);
        return (
          <div
            key={i}
            className={`absolute rounded-full animate-ping ${
              isRose ? "bg-[#E65C8E]" : isEmerald ? "bg-emerald-400" : "bg-white"
            }`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${2.2 + (i % 3) * 0.6}s`,
              animationDelay: `${delay}s`,
              boxShadow: isRose ? "0 0 12px #E65C8E" : isEmerald ? "0 0 10px #34D399" : "0 0 8px #FFFFFF",
              opacity: 0.75,
            }}
          />
        );
      })}
    </div>
  );
}

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

    setRotateX(-py * 4); // 4 deg max tilt
    setRotateY(px * 4);
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
      {/* Specular Ray Glint */}
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
      if (isPlayingTour) return;
      const calculatedIndex = Math.min(6, Math.floor(latest * 7));
      setStageIndex(calculatedIndex);
    });
  }, [scrollYProgress, isPlayingTour]);

  // Touch Gesture Handlers for Mobile Scrolling Smoothness
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    
    // Vertical swipe exceeds threshold and dominates horizontal movement
    if (Math.abs(deltaY) > 45 && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY < 0 && stageIndex < 6) {
        setIsPlayingTour(false);
        setStageIndex((prev) => Math.min(6, prev + 1));
      } else if (deltaY > 0 && stageIndex > 0) {
        setIsPlayingTour(false);
        setStageIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

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
      className="relative min-h-[240vh] md:min-h-[460vh] bg-transparent"
    >
      {/* Sticky Cinematic Theater (Anchored in Viewport, dvh resilient) */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="sticky top-14 sm:top-18 h-[calc(100dvh-4.5rem)] sm:h-[88vh] flex flex-col justify-between overflow-hidden px-3 sm:px-6 z-20"
      >
        
        {/* Stage Header: Active Theory Style High-Altitude Narrative Ribbon */}
        <div className="max-w-5xl mx-auto w-full pt-2 sm:pt-4 text-center select-none shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-1.5 sm:mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
            <span>MODULE {currentMeta.num} // {currentMeta.badge}</span>
          </div>

          <h2 
            className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight line-clamp-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {currentMeta.title}
          </h2>
        </div>

        {/* Central Morphing Stage (Cosmic Star Emergence & Dissolution) */}
        <div className="flex-1 max-w-5xl mx-auto w-full flex items-center justify-center my-auto py-2 sm:py-3 overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* === STAGE 01: HERO AUDIO DEMO CARD === */}
            {stageIndex === 0 && (
              <motion.div
                key="stage-01"
                variants={COSMIC_STAR_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-xl mx-auto relative"
              >
                <StardustAura />
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-4 sm:p-7 shadow-[0_0_60px_rgba(230,92,142,0.22)] bg-[#120710]/75 backdrop-blur-2xl">
                  {/* Chassis Ribbon */}
                  <div className="flex items-center justify-between pb-3 mb-3 sm:mb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="flex items-center gap-2 text-[#EC89B5] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
                      AIVA APPARATUS // UNIT 01
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                      LIVE AUDIO INGESTION CORE
                    </span>
                  </div>

                  {/* Scenarios Switcher */}
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 pb-2.5 border-b border-white/[0.06]">
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
                          className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
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
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-[#A66B8E]/20 text-[#EC89B5] flex items-center justify-center font-bold">
                        <PhoneCall size={15} className="animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                          <span>Caller: {activeScenario.caller}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            SAVED CLIENT
                          </span>
                        </div>
                        <div className="text-[11px] text-white/50 font-mono">Line 1 • Direct AI Phone Assistant</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentLine(0);
                        setIsPlayingAudio(true);
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </div>

                  {/* Dialogue Feed */}
                  <div className="space-y-2.5 min-h-[120px] max-h-[170px] overflow-y-auto pr-1 scrollbar-none mb-3 sm:mb-4">
                    {activeScenario.dialogue.slice(0, currentLine + 1).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2.5 items-start ${
                          msg.speaker === "aiva" ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          msg.speaker === "aiva" ? "bg-[#A66B8E] text-white" : "bg-white/10 text-white/70"
                        }`}>
                          {msg.speaker === "aiva" ? "A" : <User size={11} />}
                        </div>
                        <div className={`p-2.5 sm:p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
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
                  <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span className="text-white font-medium truncate">Appointment Booked: {activeScenario.service}</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold shrink-0 ml-2">{activeScenario.revenue}</span>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 02: 4-QUADRANT PROBLEM RESOLUTION CARDS === */}
            {stageIndex === 1 && (
              <motion.div
                key="stage-02"
                variants={COSMIC_STAR_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-5xl relative"
              >
                <StardustAura />
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-h-[66vh] overflow-y-auto sm:overflow-visible pr-1 sm:pr-0 scrollbar-none">
                  {PROBLEMS.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <TiltCard 
                        key={p.title}
                        className="rounded-2xl border border-white/15 p-3.5 sm:p-5 shadow-[0_0_40px_rgba(230,92,142,0.18)] bg-[#120710]/75 backdrop-blur-2xl flex flex-col justify-between"
                      >
                        <div>
                          {/* Header Ribbon */}
                          <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-white/[0.08] text-[10px] font-mono">
                            <span className="flex items-center gap-1.5 text-[#EC89B5] font-semibold">
                              <Icon size={12} />
                              {p.category}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                              {p.stat} · {p.statLabel}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight mb-2">
                            {p.title}
                          </h4>

                          {/* Friction vs Advantage Blocks */}
                          <div className="space-y-2 mb-2 sm:mb-3">
                            <div className="p-2 sm:p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-white/70">
                              <span className="font-mono text-[9px] sm:text-[10px] text-red-400 uppercase font-semibold flex items-center gap-1 mb-0.5">
                                <span>✕</span> THE FRICTION · WITHOUT AIVA
                              </span>
                              <p className="line-clamp-2 sm:line-clamp-none text-[11px] sm:text-xs text-white/70 leading-relaxed">
                                {p.description}
                              </p>
                            </div>
                            <div className="p-2 sm:p-2.5 rounded-xl bg-[#E65C8E]/10 border border-[#E65C8E]/25 text-xs text-white/90">
                              <span className="font-mono text-[9px] sm:text-[10px] text-[#ECA9B7] uppercase font-semibold flex items-center gap-1 mb-0.5">
                                <span>✓</span> THE AIVA ADVANTAGE
                              </span>
                              <p className="line-clamp-2 sm:line-clamp-none text-[11px] sm:text-xs text-white/90 leading-relaxed">
                                {p.solution}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Feature Tags */}
                        <div className="pt-2 border-t border-white/[0.06] flex items-center gap-1.5 flex-wrap">
                          {p.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-[9px] sm:text-[10px] font-mono text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
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
                variants={COSMIC_STAR_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl relative"
              >
                <StardustAura />
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-4 sm:p-8 shadow-[0_0_60px_rgba(230,92,142,0.22)] bg-[#120710]/75 backdrop-blur-2xl">
                  <div className="flex items-center justify-between pb-3 mb-4 sm:mb-5 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">SYSTEM COMPARISON // UNIT 03</span>
                    <span className="text-white/40">Validated on 100+ Live Deployments</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 font-mono text-[10px] sm:text-[11px]">
                          <th className="pb-3 font-normal">CORE CAPABILITY</th>
                          <th className="pb-3 font-normal">HUMAN FRONT DESK</th>
                          <th className="pb-3 font-normal">TRADITIONAL CALL CENTER</th>
                          <th className="pb-3 font-semibold text-[#EC89B5]">AIVA VOICE AI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        <tr>
                          <td className="py-2.5 sm:py-3 font-medium text-white">Hours of Operation</td>
                          <td className="py-2.5 sm:py-3 text-white/60">10:00 AM – 8:00 PM only</td>
                          <td className="py-2.5 sm:py-3 text-white/60">24/7 (Expensive add-on)</td>
                          <td className="py-2.5 sm:py-3 text-emerald-400 font-bold">✓ 24/7/365 without overtime</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 sm:py-3 font-medium text-white">Simultaneous Call Capacity</td>
                          <td className="py-2.5 sm:py-3 text-white/60">1 caller (others get busy tone)</td>
                          <td className="py-2.5 sm:py-3 text-white/60">Long wait & hold queues</td>
                          <td className="py-2.5 sm:py-3 text-emerald-400 font-bold">✓ Unlimited concurrent lines</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 sm:py-3 font-medium text-white">Direct Calendar & Buffer Sync</td>
                          <td className="py-2.5 sm:py-3 text-white/60">Manual paper/CRM entry</td>
                          <td className="py-2.5 sm:py-3 text-white/60">Takes message, can't lock slots</td>
                          <td className="py-2.5 sm:py-3 text-emerald-400 font-bold">✓ Direct slot & operatory lock</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 sm:py-3 font-medium text-white">WhatsApp Confirmation & UPI</td>
                          <td className="py-2.5 sm:py-3 text-white/60">Only if staff remembers</td>
                          <td className="py-2.5 sm:py-3 text-white/60">No text / WhatsApp routing</td>
                          <td className="py-2.5 sm:py-3 text-emerald-400 font-bold">✓ Instant WhatsApp slip in 3.4s</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 sm:py-3 font-medium text-white">Cost Structure</td>
                          <td className="py-2.5 sm:py-3 text-white/60">₹35,000 – ₹55,000/mo + PF/ESI</td>
                          <td className="py-2.5 sm:py-3 text-white/60">Per-minute charges + setup fee</td>
                          <td className="py-2.5 sm:py-3 text-emerald-400 font-bold">✓ Predictable flat monthly plan</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 04: EXECUTIVE TELEMETRY CONSOLE (DASHBOARD) === */}
            {stageIndex === 3 && (
              <motion.div
                key="stage-04"
                variants={COSMIC_STAR_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl relative"
              >
                <StardustAura />
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-4 sm:p-7 shadow-[0_0_60px_rgba(230,92,142,0.22)] bg-[#120710]/75 backdrop-blur-2xl">
                  {/* Top 4 Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block">CALLS TODAY</span>
                      <span className="text-lg sm:text-2xl font-bold font-mono text-white">48</span>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono block">100% answered • 0 missed</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block">BOOKED REVENUE</span>
                      <span className="text-lg sm:text-2xl font-bold font-mono text-emerald-400">₹1,84,200</span>
                      <span className="text-[9px] sm:text-[10px] text-white/50 font-mono block">18 appointments</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block">HOURS SAVED</span>
                      <span className="text-lg sm:text-2xl font-bold font-mono text-white">36.5 hrs</span>
                      <span className="text-[9px] sm:text-[10px] text-white/50 font-mono block">This week alone</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block">FEEDBACK</span>
                      <span className="text-lg sm:text-2xl font-bold font-mono text-pink-400">4.98/5</span>
                      <span className="text-[9px] sm:text-[10px] text-[#EC89B5] font-mono block">Positive caller ratings</span>
                    </div>
                  </div>

                  {/* Tab Selector */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white uppercase">Inbound Call Feed</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-[#EC89B5] border border-pink-500/30">
                        Live Feed
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                      <button 
                        onClick={() => setDashTab("calls")} 
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-colors ${dashTab === "calls" ? "bg-[#E65C8E] text-white font-bold" : "text-white/40 hover:text-white"}`}
                      >
                        Call Logs
                      </button>
                      <button 
                        onClick={() => setDashTab("schedule")} 
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-colors ${dashTab === "schedule" ? "bg-[#E65C8E] text-white font-bold" : "text-white/40 hover:text-white"}`}
                      >
                        Calendar
                      </button>
                      <button 
                        onClick={() => setDashTab("crm")} 
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-colors ${dashTab === "crm" ? "bg-[#E65C8E] text-white font-bold" : "text-white/40 hover:text-white"}`}
                      >
                        Customer Notes
                      </button>
                    </div>
                  </div>

                  {/* Tab Feed Content */}
                  <div className="space-y-2 text-xs max-h-[160px] overflow-y-auto pr-1 scrollbar-none">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70">01</span>
                          <span className="font-semibold text-white">Pooja Hegde +91 98450 23489</span>
                          <span className="text-white/40 text-[11px] font-mono hidden sm:inline">• HydraFacial & Skin Rejuvenation</span>
                        </div>
                        <span className="text-white/50 text-[11px] font-mono block mt-1">
                          Summary: Requested weekend slot with Dr. Anjali. Offered Saturday 3:00 PM. Confirmed, WhatsApp slip sent.
                        </span>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold block">
                          BOOKED (₹2,800)
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">1m 18s</span>
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70">02</span>
                          <span className="font-semibold text-white">Rahul Nair +91 99001 89012</span>
                          <span className="text-white/40 text-[11px] font-mono hidden sm:inline">• Consultation & Dental Scaling</span>
                        </div>
                        <span className="text-white/50 text-[11px] font-mono block mt-1">
                          Summary: Returning regular client. Matched bi-weekly cadence with Dr. Varun. Booked Thursday 5:30 PM.
                        </span>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold block">
                          BOOKED (₹1,500)
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">48s</span>
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70">03</span>
                          <span className="font-semibold text-white">Claire Dubois +91 98860 34567</span>
                          <span className="text-white/40 text-[11px] font-mono hidden sm:inline">• Hair Extension Consultation</span>
                        </div>
                        <span className="text-white/50 text-[11px] font-mono block mt-1">
                          Summary: Asked about tape-in extension pricing. Booked a 15-minute consultation with Priya Sharma.
                        </span>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 text-[10px] font-mono font-bold block">
                          CONSULT (₹3,200)
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">2m 04s</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 05: 28-SECOND AUTONOMOUS LOOP === */}
            {stageIndex === 4 && (
              <motion.div
                key="stage-05"
                variants={COSMIC_STAR_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-5xl relative"
              >
                <StardustAura />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-3 sm:mb-4">
                  {WORKFLOW_STEPS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <TiltCard key={s.step} className="p-3 sm:p-4 rounded-2xl border border-white/15 bg-[#120710]/75 backdrop-blur-2xl flex flex-col justify-between shadow-[0_0_30px_rgba(230,92,142,0.15)]">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-white/[0.06] text-[9px] sm:text-[10px] font-mono text-white/40">
                            <span>STEP {s.step} // {s.phase}</span>
                            <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-md flex items-center justify-center border border-white/10" style={{ background: `${s.color}15`, color: s.color }}>
                              <Icon size={12} />
                            </div>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white mb-1 leading-snug">{s.title}</h4>
                          <p className="text-[11px] sm:text-xs text-white/60 font-light mb-2.5 line-clamp-3 sm:line-clamp-none leading-relaxed">{s.desc}</p>
                        </div>
                        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
                          <span className="text-white/40">RESULT</span>
                          <span className="text-emerald-400 font-bold">✓ {s.metric}</span>
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>

                {/* Staff Productivity Guarantee Card */}
                <TiltCard className="p-3 sm:p-5 rounded-2xl border border-white/15 bg-[#120710]/85 backdrop-blur-2xl shadow-[0_0_40px_rgba(230,92,142,0.2)]">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-1.5">
                        <ShieldCheck size={11} className="text-[#EC89B5]" />
                        <span>STAFF PRODUCTIVITY GUARANTEE</span>
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-white mb-1">
                        Give your staff their time back. Not their patience.
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed">
                        No more running across the salon floor or clinical operatory to grab the desk phone. Your team delivers 100% undistracted care to the clients and patients right in front of them.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-2.5 md:pt-0 md:pl-5 text-center">
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block">REVENUE ROI</span>
                        <span className="text-base sm:text-xl font-bold font-mono text-emerald-400">3.8x</span>
                        <span className="text-[9px] text-white/50 font-mono block">Average boost</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block">MISSED CALLS</span>
                        <span className="text-base sm:text-xl font-bold font-mono text-white">0</span>
                        <span className="text-[9px] text-emerald-400 font-mono block">100% Captured</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block">RETENTION</span>
                        <span className="text-base sm:text-xl font-bold font-mono text-[#EC89B5]">94.6%</span>
                        <span className="text-[9px] text-white/50 font-mono block">Top tier clinic</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 06: FINANCIAL RECOVERY ENGINE (ROI SLIDER) === */}
            {stageIndex === 5 && (
              <motion.div
                key="stage-06"
                variants={COSMIC_STAR_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl relative"
              >
                <StardustAura />
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-4 sm:p-8 shadow-[0_0_60px_rgba(230,92,142,0.22)] bg-[#120710]/75 backdrop-blur-2xl">
                  <div className="flex items-center justify-between pb-3 mb-4 sm:mb-5 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">AIVA APPARATUS // UNIT 06</span>
                    <span className="text-white/40">VALUE SIMULATOR</span>
                  </div>

                  <div className="grid md:grid-cols-12 gap-5 sm:gap-6 items-center">
                    <div className="md:col-span-7 space-y-4 sm:space-y-5">
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

                    <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl border border-[#A66B8E]/30 text-center bg-gradient-to-br from-[#1D0A18]/90 to-[#0D050C]/90 shadow-lg">
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
                variants={COSMIC_STAR_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-5xl relative"
              >
                <StardustAura />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-4 sm:mb-5">
                  {GOVERNANCE_PILLARS.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <TiltCard key={p.title} className="p-3 sm:p-4 rounded-2xl border border-white/15 bg-[#120710]/75 backdrop-blur-2xl flex flex-col justify-between shadow-[0_0_30px_rgba(230,92,142,0.15)]">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-white/[0.06] text-[9px] sm:text-[10px] font-mono text-white/40">
                            <span>UNIT 07.{idx + 1}</span>
                            <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-md flex items-center justify-center border border-white/10" style={{ background: `${p.color}15`, color: p.color }}>
                              <Icon size={12} />
                            </div>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{p.title}</h4>
                          <p className="text-[11px] sm:text-xs text-white/60 font-light mb-2.5 line-clamp-3 sm:line-clamp-none leading-relaxed">{p.desc}</p>
                        </div>
                        <div className="pt-2 border-t border-white/[0.06] text-[9px] sm:text-[10px] font-mono text-emerald-400">
                          ✓ {p.telemetry}
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                  <button
                    onClick={onOpenBookDemo}
                    className="w-full sm:w-auto h-10 sm:h-11 px-5 sm:px-6 rounded-xl font-semibold text-xs text-white inline-flex items-center justify-center gap-2 transition-all cursor-pointer hover:brightness-110 active:scale-95 shadow-[0_4px_20px_rgba(230,92,142,0.4)]"
                    style={{
                      background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                    }}
                  >
                    <span>Deploy Aiva On Your Clinic Line</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={onOpenTestCall}
                    className="w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-5 rounded-xl font-medium text-xs text-white/80 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer inline-flex items-center justify-center"
                  >
                    <span>Hear Live Audio Demo</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Stage Controller (Active Theory Floating Capsule) */}
        <div className="max-w-xl mx-auto w-full pb-2 sm:pb-3 flex items-center justify-center shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#0D050C]/95 border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(230,92,142,0.25)] backdrop-blur-2xl">
            
            {/* Play/Pause Auto Tour */}
            <button
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              title={isPlayingTour ? "Pause Cinematic Tour" : "Play Cinematic Tour"}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isPlayingTour ? "bg-[#E65C8E] text-white" : "text-white/40 hover:text-white hover:bg-white/10"
              }`}
            >
              {isPlayingTour ? <Pause size={12} /> : <Play size={12} />}
            </button>

            {/* Stepper Buttons 01 - 07 */}
            <div className="flex items-center gap-0.5 sm:gap-1 px-1">
              {STAGE_METADATA.map((meta, idx) => {
                const isActive = idx === stageIndex;
                return (
                  <button
                    key={meta.num}
                    onClick={() => {
                      setIsPlayingTour(false);
                      setStageIndex(idx);
                    }}
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer ${
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
                <ChevronUp size={13} />
              </button>
              <button
                onClick={() => {
                  setIsPlayingTour(false);
                  setStageIndex((prev) => Math.min(6, prev + 1));
                }}
                disabled={stageIndex === 6}
                className="p-1 text-white/50 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
              >
                <ChevronDown size={13} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
