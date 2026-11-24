/**
 * AivaCinematicCardStage — Cosmic Metamorphosis Theater (Namma Universe Architecture)
 * 
 * Cinematic Features:
 * 1. Exact Namma Universe Celestial Camera Zoom:
 *    When entering the section, the camera zooms in smoothly from deep space into the card
 *    (initial zoom from scale 0.38, deep z-space, and soft depth blur into full crystal clarity).
 * 2. Namma Universe Planet-to-Planet Orbital Transition:
 *    When switching between sections, the cards animate exactly like planets transitioning in Namma Universe:
 *    the active card sweeps along a 3D orbital curve while the incoming card swoops in from its orbital coordinates.
 * 3. Pure, Pristine Obsidian Glass Cards:
 *    Zero cartoonish overlays or stickers. Full focus on elegant, readable cards.
 * 4. Active Theory 3D Tilt Physics: Subtle perspective tilt with dynamic specular ray sheen.
 * 5. Mobile Smoothness & Touch Swipe: Responsive touch gestures and dynamic viewport sizing.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { 
  PhoneCall, 
  PhoneMissed, 
  Clock, 
  Users, 
  MessageSquareOff, 
  ShieldCheck, 
  CalendarCheck, 
  MessageSquare, 
  Database, 
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Calendar,
  Lock
} from "lucide-react";
import AivaSolarSystemBackground from "./AivaSolarSystemBackground";

// --- STATIC STAGE REPOSITORY & DATA STRUCTURES ---

const PROBLEMS = [
  {
    icon: PhoneMissed,
    category: "FRONT-DESK BOTTLENECK",
    stat: "32%",
    statLabel: "Inbound calls missed",
    title: "Unanswered calls during the daily rush.",
    description: "When staff is occupied with in-person clients, calls ring out. Most callers hang up within 8 seconds and immediately book with competitors.",
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
    description: "In-person consultations are repeatedly derailed by routine questions on pricing, timings, and directions.",
    solution: "Handles 100% of routine inquiries and appointment bookings autonomously, letting your team focus on premium in-person client care.",
    tags: ["Zero Desk Distraction", "100% In-Person Focus", "Calmer Lobby Atmosphere"]
  },
  {
    icon: MessageSquareOff,
    category: "CLIENT RETENTION",
    stat: "1 in 3",
    statLabel: "Cold Churn",
    title: "Treating loyal regulars like first-time strangers.",
    description: "Returning VIP clients are forced to re-explain their treatment history and doctor preferences on every call.",
    solution: "Instantly recognizes caller ID, greets regulars by name, recalls past doctor notes, and delivers warm VIP concierge care.",
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
    desc: "Aiva answers instantly with warm, natural hospitality. Effortlessly navigates interruptions and everyday conversational speech.",
    telemetry: "Live Voice Stream • Sub-300ms Speech"
  },
  {
    step: "02",
    phase: "SCHEDULE ENGINE",
    title: "Checks Operatory & Doctor Buffer",
    metric: "0 Clashes",
    icon: CalendarCheck,
    color: "#A66B8E",
    desc: "Cross-checks real-time doctor availability across Google Calendar & Practo. Enforces 15-minute sanitization prep buffers.",
    telemetry: "Calendar Defense • 15 Min Buffer Locked"
  },
  {
    step: "03",
    phase: "DISPATCH AUTOMATION",
    title: "Dispatches WhatsApp Slip & Map",
    metric: "3.4s",
    icon: MessageSquare,
    color: "#34D399",
    desc: "Dispatches official branded WhatsApp slip with specialist doctor name, appointment time, Google Maps pin, and UPI link.",
    telemetry: "WhatsApp API • Verified Green Badge"
  },
  {
    step: "04",
    phase: "EXECUTIVE DOSSIER",
    title: "Saves Client Dossier & VIP Notes",
    metric: "100%",
    icon: Database,
    color: "#EC89B5",
    desc: "Logs treatment type, preferred specialist, and call audio replay directly to your dashboard. Remembers repeat clients.",
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
    title: "Practo & Calendar Sync",
    desc: "Bi-directional instant synchronization. When a receptionist makes a manual booking, Aiva respects the lock in 50ms.",
    telemetry: "Sub-50ms 2-Way Lock",
    icon: Calendar,
    color: "#E65C8E"
  },
  {
    title: "Official WhatsApp API",
    desc: "Send instant branded confirmation slips with map locations, prep instructions, and cancellation links automatically.",
    telemetry: "Green Checkmark Verified",
    icon: FileCheck2,
    color: "#A66B8E"
  },
  {
    title: "Zero Hallucination Protocol",
    desc: "Strict clinical guardrails. If a caller asks for medical advice beyond guidelines, Aiva gracefully routes to human staff.",
    telemetry: "100% Guardrailed Responses",
    icon: Lock,
    color: "#EC89B5"
  }
];

// ─── NAMMA UNIVERSE PLANET-EMERGENCE TRANSITIONS ───────────────
// Cards literally appear out of their individual glowing planet:
// - Entering: expands radially from the glowing planet core in deep Z-space
//   (scale 0.08 -> 1.0) as the camera finishes its orbital flight to that planet.
// - Exiting: condenses smoothly back into space as the camera sweeps to the next orbit.
const PLANET_EMERGENCE_TRANSITION = {
  initial: (direction: number) => ({
    opacity: 0,
    x: 0,
    y: direction >= 0 ? 18 : -18,
    z: -700,
    scale: 0.08,
    rotateX: direction >= 0 ? 10 : -10,
    filter: "blur(16px) brightness(1.8)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px) brightness(1)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: 0,
    y: direction >= 0 ? -14 : 14,
    z: -550,
    scale: 0.14,
    rotateX: direction >= 0 ? -6 : 6,
    filter: "blur(14px) brightness(1.4)",
    transition: {
      duration: 0.26,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

const STAGE_PLANET_COLORS = [
  "#E65C8E", // 01: 28s Autonomous Loop (Aiva Pink)
  "#A66B8E", // 02: Logic Violet
  "#38BDF8", // 03: Parity Cyan
  "#34D399", // 04: Telemetry Emerald
  "#FBBF24", // 05: ROI Amber Gold
  "#FB7185", // 06: Governance Crimson
];

// ─── 3D INTERACTIVE TILT CONTAINER ───────────────────────────

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
    // Skip 3D hover tilt on touch devices to prevent sticky mobile tilt states
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;

    setRotateX(-py * 3.5);
    setRotateY(px * 3.5);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
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
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

// ─── UNIFORM SCROLL BOUNDS FOR 6 SINGLE-SCREEN CARDS ─────────
const MOBILE_STAGE_WEIGHTS = [1, 1, 1, 1, 1, 1];
const DESKTOP_STAGE_WEIGHTS = [1, 1, 1, 1, 1, 1];

function buildNormalizedBounds(weights: number[]) {
  const total = weights.reduce((a, b) => a + b, 0);
  const bounds: { start: number; end: number }[] = [];
  let acc = 0;
  for (const w of weights) {
    const start = acc / total;
    acc += w;
    bounds.push({ start, end: acc / total });
  }
  return bounds;
}

const MOBILE_BOUNDS = buildNormalizedBounds(MOBILE_STAGE_WEIGHTS);
const DESKTOP_BOUNDS = buildNormalizedBounds(DESKTOP_STAGE_WEIGHTS);

function mapProgressToStage(latest: number, isMobile: boolean) {
  const bounds = isMobile ? MOBILE_BOUNDS : DESKTOP_BOUNDS;
  const clamped = Math.max(0, Math.min(0.999999, latest));
  for (let i = 0; i < bounds.length; i++) {
    const { start, end } = bounds[i];
    if (clamped >= start && (clamped < end || i === bounds.length - 1)) {
      const frac = Math.max(0, Math.min(1, (clamped - start) / (end - start)));
      // Hold at top card (panProgress = 0) until 28% so entering Section 2, 5, 7 always starts at the top card
      const panProgress = frac <= 0.28 ? 0 : frac >= 0.80 ? 1 : (frac - 0.28) / 0.52;
      // Camera holds on Planet i during reading & card pan, then flies to Planet i+1 (80% -> 100%)
      let floatStage = i;
      if (i < bounds.length - 1 && frac > 0.80) {
        const t = (frac - 0.80) / 0.20;
        const eased = t * t * (3 - 2 * t);
        floatStage = i + eased;
      }
      return { stageIndex: i, panProgress, floatStage };
    }
  }
  return { stageIndex: 0, panProgress: 0, floatStage: 0 };
}

// ─── MAIN CINEMATIC CARD STAGE ───────────────────────────────

interface AivaCinematicCardStageProps {
  onOpenBookDemo?: () => void;
  onOpenTestCall?: () => void;
}

export default function AivaCinematicCardStage(
  _props: AivaCinematicCardStageProps
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageViewportRef = useRef<HTMLDivElement>(null);
  const stageInnerRef = useRef<HTMLDivElement>(null);
  const panProgressRef = useRef<number>(0);

  // Active Stage Index (0 to 6) + Continuous Float Index for Namma Universe Camera Flight
  const [stageIndex, setStageIndex] = useState(0);
  const floatStageRef = useRef<number>(0);
  // Direction: 0 = initial zoom from deep space, 1 = forward orbit, -1 = backward orbit
  const [direction, setDirection] = useState(0);
  const prevStageRef = useRef(0);
  const programmaticTargetRef = useRef<number | null>(null);
  const programmaticTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  // Dashboard Preview Tab State (Stage 04)
  const [dashTab, setDashTab] = useState<"calls" | "schedule" | "crm">("calls");

  // ROI Calculator State (Stage 05)
  const [weeklyCalls, setWeeklyCalls] = useState(120);
  const [averageTicket, setAverageTicket] = useState(1800);

  const monthlyCalls = weeklyCalls * 4.3;
  const missedCallsMonthly = Math.round(monthlyCalls * 0.32);
  const recoveredBookings = Math.round(missedCallsMonthly * 0.65);
  const recoveredRevenueMonthly = Math.round(recoveredBookings * averageTicket);

  const applyCardPan = () => {
    const viewport = stageViewportRef.current;
    const inner = stageInnerRef.current;
    if (!viewport || !inner) return;
    const maxOverflow = Math.max(0, inner.scrollHeight - viewport.clientHeight);
    const offset = panProgressRef.current * maxOverflow;
    inner.style.transform = `translate3d(0, ${-offset.toFixed(2)}px, 0)`;
  };

  // Change Stage with Directional Camera Orbit + Glitch-Free Synced Smooth Scroll
  const changeStage = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(5, newIndex));
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
    programmaticTargetRef.current = clamped;

    if (containerRef.current) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const bounds = isMobile ? MOBILE_BOUNDS : DESKTOP_BOUNDS;
      const seg = bounds[clamped];
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const scrollable = Math.max(1, containerRef.current.offsetHeight - window.innerHeight);
      // Land cleanly at top-card resting zone (panProgress = 0)
      const targetProgress = seg.start + (seg.end - seg.start) * 0.16;
      const targetScroll = containerTop + scrollable * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }

    // Fallback release in case smooth scroll finishes early or target is already in view
    programmaticTimerRef.current = setTimeout(() => {
      programmaticTargetRef.current = null;
    }, 1400);

    if (clamped === stageIndex) return;
    setDirection(clamped > stageIndex ? 1 : -1);
    prevStageRef.current = clamped;
    floatStageRef.current = clamped;
    panProgressRef.current = 0;
    applyCardPan();
    setStageIndex(clamped);
  };

  // Automated Cinematic Tour Timer
  useEffect(() => {
    if (!isPlayingTour) return;

    const timer = setInterval(() => {
      setDirection(1);
      panProgressRef.current = 0;
      setStageIndex((prev) => {
        const next = (prev + 1) % 6;
        prevStageRef.current = next;
        floatStageRef.current = next;
        return next;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlayingTour]);

  // Scroll Sync: Continuous Namma Universe Plateau Curve + Seamless Internal Card Pan
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (isPlayingTour) return;
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const mapped = mapProgressToStage(latest, isMobile);

      // While bottom-bar smooth scroll is in flight, ignore intermediate stage snaps
      if (programmaticTargetRef.current !== null) {
        if (mapped.stageIndex === programmaticTargetRef.current) {
          programmaticTargetRef.current = null;
          if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
        } else {
          return;
        }
      }

      floatStageRef.current = mapped.floatStage;
      panProgressRef.current = mapped.panProgress;
      applyCardPan();

      if (mapped.stageIndex !== prevStageRef.current) {
        setDirection(mapped.stageIndex > prevStageRef.current ? 1 : -1);
        prevStageRef.current = mapped.stageIndex;
        setStageIndex(mapped.stageIndex);
      }
    });
  }, [scrollYProgress, isPlayingTour]);

  // Keep internal card vertical pan synced cleanly across stage transitions, tab changes, & resizes
  useEffect(() => {
    const raf = requestAnimationFrame(applyCardPan);
    const ro = new ResizeObserver(() => {
      applyCardPan();
    });
    if (stageViewportRef.current) ro.observe(stageViewportRef.current);
    if (stageInnerRef.current) ro.observe(stageInnerRef.current);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [stageIndex, dashTab]);

  const STAGE_METADATA = [
    { num: "01", short: "LOOP", name: "28s Autonomous Loop", title: "From Inquiry to Confirmed Booking" },
    { num: "02", short: "LOGIC", name: "4-Quadrant Resolution", title: "Every Missed Call is Revenue Lost" },
    { num: "03", short: "MATRIX", name: "Capability Parity", title: "Traditional Front Desk vs Aiva Teammate" },
    { num: "04", short: "DECK", name: "Telemetry Console", title: "Real-Time Clinic Management Deck" },
    { num: "05", short: "ROI", name: "Financial Recovery", title: "Live Missed-Call Cost & Revenue Engine" },
    { num: "06", short: "SHIELD", name: "Enterprise Governance", title: "Strict Compliance & Zero Risk Protocol" },
  ];

  const currentMeta = STAGE_METADATA[stageIndex];
  const activePlanetColor = STAGE_PLANET_COLORS[stageIndex] || "#E65C8E";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[660vh] md:min-h-[720vh] bg-transparent"
    >
      {/* Sticky Cinematic Theater (Full remaining viewport below navbar, dvh resilient) */}
      <div 
        className="sticky top-14 sm:top-16 h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] flex flex-col justify-between overflow-x-hidden overflow-y-hidden px-3 sm:px-6 z-20 relative"
      >
        {/* Realistic Namma Universe 3D Solar System & Planet-Flight Canvas */}
        <AivaSolarSystemBackground
          stageIndex={stageIndex}
          floatStageRef={floatStageRef}
          className="absolute inset-0 pointer-events-none z-0"
        />
        
        {/* Stage Header: Apple-Style Balanced Centered Heading */}
        <div className="max-w-2xl mx-auto w-full pt-4 sm:pt-6 pb-2 sm:pb-3 px-2 text-center select-none shrink-0 relative z-10">
          <h2 
            className="text-[22px] sm:text-3xl md:text-[38px] font-bold tracking-[-0.03em] leading-[1.14] text-balance bg-gradient-to-b from-white via-white to-white/75 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {currentMeta.title}
          </h2>
        </div>

        {/* Central Morphing Stage (min-h-0 + scroll-driven pan viewport eliminates touch scroll traps) */}
        <div 
          className="flex-1 min-h-0 max-w-5xl mx-auto w-full flex items-center justify-center relative z-10"
          style={{ perspective: "1400px" }}
        >
          {/* Planetary Emergence Aura Pulse: glows from the planet's center as card blooms out */}
          <motion.div
            key={`aura-${stageIndex}`}
            initial={{ opacity: 0.75, scale: 0.15 }}
            animate={{ opacity: 0.12, scale: 1.15 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full blur-[70px] z-0"
            style={{
              background: `radial-gradient(circle, ${activePlanetColor}66 0%, transparent 70%)`,
            }}
          />

          <div
            ref={stageViewportRef}
            className="w-full h-full flex flex-col overflow-hidden relative z-10"
          >
            <div
              ref={stageInnerRef}
              className="w-full my-auto py-2 sm:py-3 px-0.5 will-change-transform"
            >
              <AnimatePresence mode="wait" custom={direction}>
            
            {/* === STAGE 01: UNIFIED 28-SECOND AUTONOMOUS PIPELINE (FITS CARD 4 FOOTPRINT) === */}
            {stageIndex === 0 && (
              <motion.div
                key="stage-01"
                custom={direction}
                variants={PLANET_EMERGENCE_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl mx-auto relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_60px_rgba(230,92,142,0.18)] bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
                  {/* Top Apparatus Bar */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 sm:mb-3.5 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="flex items-center gap-2 text-[#EC89B5] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
                      AUTONOMOUS PIPELINE // 28S LOOP
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                      28s END-TO-END
                    </span>
                  </div>

                  {/* 4 Compact Steps: Horizontal rows on mobile (fits 1 screen), 2x2 grid on desktop */}
                  <div className="space-y-1.5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3 mb-2.5 sm:mb-3.5">
                    {WORKFLOW_STEPS.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.step}
                          className="p-2 sm:p-3 rounded-xl bg-white/[0.025] border border-white/10 flex sm:flex-col items-center sm:items-stretch justify-between gap-2.5 sm:gap-1.5"
                        >
                          <div className="flex items-center sm:justify-between gap-2.5 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <div
                                className="w-7 h-7 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center border border-white/10 shrink-0"
                                style={{ background: `${s.color}18`, color: s.color }}
                              >
                                <Icon size={13} />
                              </div>
                              <div className="min-w-0 sm:hidden">
                                <h4 className="text-xs font-bold text-white leading-tight truncate">{s.title}</h4>
                                <p className="text-[10.5px] text-white/60 leading-snug line-clamp-1">{s.desc}</p>
                              </div>
                              <span className="hidden sm:inline text-[10px] font-mono tracking-wider text-white/50">
                                STEP {s.step} · {s.phase}
                              </span>
                            </div>
                            <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold shrink-0">
                              ✓ {s.metric}
                            </span>
                          </div>

                          <span className="sm:hidden px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold shrink-0">
                            {s.metric}
                          </span>

                          <div className="hidden sm:block">
                            <h4 className="text-sm font-bold text-white mb-0.5 leading-snug">{s.title}</h4>
                            <p className="text-xs text-white/70 font-light leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Unified Staff Productivity Guarantee Footer */}
                  <div className="pt-2.5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                    <div className="max-w-md">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-1">
                        <ShieldCheck size={10} className="text-[#EC89B5]" />
                        <span>STAFF PRODUCTIVITY GUARANTEE</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                        Give your staff their time back. Not their patience.
                      </p>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-5 text-center">
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block">ROI</span>
                        <span className="text-sm sm:text-lg font-bold font-mono text-emerald-400">3.8x</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block">MISSED</span>
                        <span className="text-sm sm:text-lg font-bold font-mono text-white">0</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block">RETENTION</span>
                        <span className="text-sm sm:text-lg font-bold font-mono text-[#EC89B5]">94.6%</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 02: FRONT-DESK REALITY MATRIX (SINGLE CARD, FITS CARD 4 FOOTPRINT) === */}
            {stageIndex === 1 && (
              <motion.div
                key="stage-02"
                custom={direction}
                variants={PLANET_EMERGENCE_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl mx-auto relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_60px_rgba(230,92,142,0.18)] bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
                  <div className="flex items-center justify-between pb-2 mb-2.5 sm:mb-3.5 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">FRONT-DESK REALITY // 4-POINT AUDIT</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                      100% CAPTURE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {PROBLEMS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.title}
                          className="p-2.5 sm:p-3.5 rounded-xl bg-white/[0.025] border border-white/10 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="flex items-center gap-1.5 text-[9.5px] font-mono text-[#EC89B5] font-semibold">
                              <Icon size={11} />
                              {p.category}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9.5px] font-mono text-white/60 shrink-0">
                              {p.stat} · {p.statLabel}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mb-1.5">
                            {p.title}
                          </h4>

                          <div className="space-y-1 text-[10.5px] sm:text-[11px] leading-snug">
                            <p className="text-white/55 line-clamp-1 sm:line-clamp-2">
                              <span className="text-red-400 font-mono mr-1">✕</span>
                              {p.description}
                            </p>
                            <p className="text-white/90 line-clamp-1 sm:line-clamp-2">
                              <span className="text-emerald-400 font-mono mr-1">✓</span>
                              {p.solution}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 03: CAPABILITY PARITY MATRIX (ZERO HORIZONTAL SCROLL ON MOBILE) === */}
            {stageIndex === 2 && (
              <motion.div
                key="stage-03"
                custom={direction}
                variants={PLANET_EMERGENCE_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl mx-auto relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_60px_rgba(230,92,142,0.18)] bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
                  <div className="flex items-center justify-between pb-2 mb-2.5 sm:mb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">SYSTEM COMPARISON</span>
                    <span className="text-white/40">100+ Live Deployments</span>
                  </div>

                  {/* Mobile View: Zero Horizontal Scroll — Clean 5-Row Split Cards */}
                  <div className="sm:hidden space-y-1.5">
                    {[
                      { cap: "Hours of Operation", old: "10 AM – 8 PM only", aiva: "✓ 24/7/365 without overtime" },
                      { cap: "Simultaneous Calls", old: "1 caller (busy tone)", aiva: "✓ Unlimited concurrent lines" },
                      { cap: "Calendar & Buffer Sync", old: "Manual entry / message", aiva: "✓ Direct slot & buffer lock" },
                      { cap: "WhatsApp & UPI Slip", old: "Manual / no routing", aiva: "✓ Instant slip in 3.4s" },
                      { cap: "Cost Structure", old: "₹35k–₹55k/mo + PF/ESI", aiva: "✓ Predictable flat monthly plan" },
                    ].map((row) => (
                      <div
                        key={row.cap}
                        className="p-2 rounded-xl bg-white/[0.025] border border-white/10"
                      >
                        <div className="text-[11px] font-bold text-white mb-1">{row.cap}</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] leading-snug">
                          <div className="text-white/50 truncate">
                            <span className="text-white/30 font-mono mr-1">OLD:</span>
                            {row.old}
                          </div>
                          <div className="text-emerald-400 font-semibold truncate text-right">
                            {row.aiva}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop View: Full 4-Column Comparison Table */}
                  <div className="hidden sm:block">
                    <table className="w-full text-left text-xs sm:text-sm">
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
                          <td className="py-3 font-medium text-white">Hours of Operation</td>
                          <td className="py-3 text-white/60">10:00 AM – 8:00 PM only</td>
                          <td className="py-3 text-white/60">24/7 (Expensive add-on)</td>
                          <td className="py-3 text-emerald-400 font-bold">✓ 24/7/365 without overtime</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">Simultaneous Call Capacity</td>
                          <td className="py-3 text-white/60">1 caller (others get busy tone)</td>
                          <td className="py-3 text-white/60">Long wait & hold queues</td>
                          <td className="py-3 text-emerald-400 font-bold">✓ Unlimited concurrent lines</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">Direct Calendar & Buffer Sync</td>
                          <td className="py-3 text-white/60">Manual paper/CRM entry</td>
                          <td className="py-3 text-white/60">Takes message, can't lock slots</td>
                          <td className="py-3 text-emerald-400 font-bold">✓ Direct slot & operatory lock</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">WhatsApp Confirmation & UPI</td>
                          <td className="py-3 text-white/60">Only if staff remembers</td>
                          <td className="py-3 text-white/60">No text / WhatsApp routing</td>
                          <td className="py-3 text-emerald-400 font-bold">✓ Instant WhatsApp slip in 3.4s</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">Cost Structure</td>
                          <td className="py-3 text-white/60">₹35,000 – ₹55,000/mo + PF/ESI</td>
                          <td className="py-3 text-white/60">Per-minute charges + setup fee</td>
                          <td className="py-3 text-emerald-400 font-bold">✓ Predictable flat monthly plan</td>
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
                custom={direction}
                variants={PLANET_EMERGENCE_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_60px_rgba(230,92,142,0.18)] bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
                  {/* Top 4 Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block">CALLS TODAY</span>
                      <span className="text-base sm:text-xl font-bold font-mono text-white">48</span>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono block">100% answered • 0 missed</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block">BOOKED REVENUE</span>
                      <span className="text-base sm:text-xl font-bold font-mono text-emerald-400">₹1,84,200</span>
                      <span className="text-[9px] sm:text-[10px] text-white/50 font-mono block">18 appointments</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block">HOURS SAVED</span>
                      <span className="text-base sm:text-xl font-bold font-mono text-white">36.5 hrs</span>
                      <span className="text-[9px] text-white/50 font-mono block">This week alone</span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/40 block">FEEDBACK</span>
                      <span className="text-base sm:text-xl font-bold font-mono text-pink-400">4.98/5</span>
                      <span className="text-[9px] text-[#EC89B5] font-mono block">Positive caller ratings</span>
                    </div>
                  </div>

                  {/* Tab Selector */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white uppercase">Inbound Call Feed</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-[#EC89B5] border border-pink-500/30">
                        Live Feed
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                      <button 
                        onClick={() => setDashTab("calls")} 
                        className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-colors ${dashTab === "calls" ? "bg-[#E65C8E] text-white font-bold" : "text-white/40 hover:text-white"}`}
                      >
                        Call Feed
                      </button>
                      <button 
                        onClick={() => setDashTab("schedule")} 
                        className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-colors ${dashTab === "schedule" ? "bg-[#E65C8E] text-white font-bold" : "text-white/40 hover:text-white"}`}
                      >
                        Calendar
                      </button>
                      <button 
                        onClick={() => setDashTab("crm")} 
                        className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] font-mono cursor-pointer transition-colors ${dashTab === "crm" ? "bg-[#E65C8E] text-white font-bold" : "text-white/40 hover:text-white"}`}
                      >
                        Customer Notes
                      </button>
                    </div>
                  </div>

                  {/* Tab Feed Content */}
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70">01</span>
                          <span className="font-semibold text-white">Pooja Hegde +91 98450 23489</span>
                          <span className="text-white/40 text-[11px] font-mono hidden sm:inline">• HydraFacial & Skin Rejuvenation</span>
                        </div>
                        <span className="text-white/50 text-[11px] font-mono block mt-0.5 leading-snug">
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

                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70">02</span>
                          <span className="font-semibold text-white">Rahul Nair +91 99001 89012</span>
                          <span className="text-white/40 text-[11px] font-mono hidden sm:inline">• Consultation & Dental Scaling</span>
                        </div>
                        <span className="text-white/50 text-[11px] font-mono block mt-0.5 leading-snug">
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

                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70">03</span>
                          <span className="font-semibold text-white">Claire Dubois +91 98860 34567</span>
                          <span className="text-white/40 text-[11px] font-mono hidden sm:inline">• Hair Extension Consultation</span>
                        </div>
                        <span className="text-white/50 text-[11px] font-mono block mt-0.5 leading-snug">
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

            {/* === STAGE 05: FINANCIAL RECOVERY ENGINE (ROI SLIDER) === */}
            {stageIndex === 4 && (
              <motion.div
                key="stage-05"
                custom={direction}
                variants={PLANET_EMERGENCE_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-4 sm:p-7 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_60px_rgba(230,92,142,0.18)] bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
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
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E65C8E] touch-pan-x"
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
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400 touch-pan-x"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between text-xs font-mono">
                        <span>Missed Calls Saved: <strong className="text-white">{missedCallsMonthly}</strong>/mo</span>
                        <span>Captured Appointments: <strong className="text-emerald-400">{recoveredBookings}</strong>/mo</span>
                      </div>
                    </div>

                    <div className="md:col-span-5 p-5 rounded-2xl border border-[#A66B8E]/30 text-center bg-gradient-to-br from-[#1D0A18] to-[#0D050C] shadow-lg">
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

            {/* === STAGE 06: ENTERPRISE GOVERNANCE MATRIX (SINGLE CARD, NO BOTTOM BUTTONS) === */}
            {stageIndex === 5 && (
              <motion.div
                key="stage-06"
                custom={direction}
                variants={PLANET_EMERGENCE_TRANSITION}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-4xl mx-auto relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_60px_rgba(230,92,142,0.18)] bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
                  <div className="flex items-center justify-between pb-2 mb-2.5 sm:mb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">ENTERPRISE PROTOCOLS // ZERO-RISK</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                      SOC2 & HIPAA READY
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {GOVERNANCE_PILLARS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.title}
                          className="p-2.5 sm:p-3.5 rounded-xl bg-white/[0.025] border border-white/10 flex items-start gap-2.5 sm:gap-3"
                        >
                          <div
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border border-white/10 shrink-0 mt-0.5"
                            style={{ background: `${p.color}18`, color: p.color }}
                          >
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{p.title}</h4>
                            </div>
                            <p className="text-[10.5px] sm:text-xs text-white/70 font-light leading-snug mb-1.5">
                              {p.desc}
                            </p>
                            <span className="text-[9.5px] sm:text-[10px] font-mono text-emerald-400 font-semibold">
                              ✓ {p.telemetry}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TiltCard>
              </motion.div>
            )}

              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stage Controller (Active Theory Floating Capsule) */}
        <div className="max-w-xl mx-auto w-full pb-2 sm:pb-3 flex items-center justify-center shrink-0 relative z-30">
          <div className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#0D050C]/95 border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(230,92,142,0.25)] backdrop-blur-2xl">
            
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
                      changeStage(idx);
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
                  changeStage(Math.max(0, stageIndex - 1));
                }}
                disabled={stageIndex === 0}
                className="p-1 text-white/50 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
              >
                <ChevronUp size={13} />
              </button>
              <button
                onClick={() => {
                  setIsPlayingTour(false);
                  changeStage(Math.min(5, stageIndex + 1));
                }}
                disabled={stageIndex === 5}
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
