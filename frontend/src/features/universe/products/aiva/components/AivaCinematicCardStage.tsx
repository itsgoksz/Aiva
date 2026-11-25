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
    category: "PEAK RUSH",
    stat: "32% Missed",
    title: "Unanswered calls during peak hours",
    description: "Busy staff miss ringing phones—callers hang up in 8s and book competitors.",
    solution: "Picks up in under 1 second and handles unlimited callers at once.",
  },
  {
    icon: Clock,
    category: "AFTER HOURS",
    stat: "₹1.4L+/mo Lost",
    title: "Lost bookings after closing time",
    description: "Late-night and weekend callers hit locked doors with no one to book.",
    solution: "Books appointments 24/7 and sends instant WhatsApp confirmations.",
  },
  {
    icon: Users,
    category: "DESK FOCUS",
    stat: "14 hrs/wk Lost",
    title: "Front desk constantly interrupted",
    description: "In-person guests wait while staff answer routine pricing & direction calls.",
    solution: "Handles every routine call so your team stays 100% focused on guests.",
  },
  {
    icon: MessageSquareOff,
    category: "VIP MEMORY",
    stat: "1 in 3 Churn",
    title: "Treating regulars like strangers",
    description: "Returning clients must re-explain past treatments and doctor preferences.",
    solution: "Recognizes regulars by number, recalls preferences, and greets by name.",
  }
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Answers on Ring One",
    metric: "240ms",
    icon: PhoneCall,
    color: "#E65C8E",
    desc: "Greets callers in a warm, natural human voice with zero hold music.",
  },
  {
    step: "02",
    title: "Checks Real Availability",
    metric: "0 Clashes",
    icon: CalendarCheck,
    color: "#A66B8E",
    desc: "Syncs live with Google Calendar & Practo, keeping 15-min prep buffers.",
  },
  {
    step: "03",
    title: "Sends WhatsApp Slip",
    metric: "3.4s",
    icon: MessageSquare,
    color: "#34D399",
    desc: "Dispatches booking details, doctor name, map pin, and UPI link automatically.",
  },
  {
    step: "04",
    title: "Updates Client Memory",
    metric: "100%",
    icon: Database,
    color: "#EC89B5",
    desc: "Logs visit history, preferred doctor, and call summary straight to your CRM.",
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

// ─── CALIBRATED SCROLL BOUNDS FOR BALANCED SECTION PACING ─────
// Accounts for entry/exit sticky visibility on sections 01 and 06 so every section
// has equal, accurate on-screen reading time during continuous scrolling.
const MOBILE_STAGE_WEIGHTS = [0.85, 1.12, 1.05, 1.12, 0.98, 0.88];
const DESKTOP_STAGE_WEIGHTS = [0.85, 1.1, 1.05, 1.1, 1.0, 0.85];

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
  const lastIdx = bounds.length - 1;
  for (let i = 0; i < bounds.length; i++) {
    const { start, end } = bounds[i];
    if (clamped >= start && (clamped < end || i === lastIdx)) {
      const frac = Math.max(0, Math.min(1, (clamped - start) / (end - start)));
      const entryEnd = i === 0 ? 0 : 0.14;
      const exitStart = i === lastIdx ? 1 : 0.78;

      // Card is visible only while docked on Planet i; disappears symmetrically during
      // interplanetary camera flights ([0..0.14] arriving, [0.78..1.0] departing)
      const isCardVisible = frac >= entryEnd && frac <= exitStart;

      // Smooth pan from 0 -> 1 inside the docked reading plateau so taller cards
      // (e.g. Section 2 & Section 6 on mobile with Safari bar expanded) never clip
      const panStart = Math.max(entryEnd + 0.04, 0.16);
      const panEnd = Math.min(exitStart - 0.06, 0.72);
      let panProgress = 0;
      if (frac > panStart && panEnd > panStart) {
        panProgress = Math.max(0, Math.min(1, (frac - panStart) / (panEnd - panStart)));
      }

      let floatStage = i;
      if (i > 0 && frac < entryEnd) {
        const t = frac / entryEnd;
        const eased = t * t * (3 - 2 * t);
        floatStage = i - 0.5 + 0.5 * eased;
      } else if (i < lastIdx && frac > exitStart) {
        const t = (frac - exitStart) / (1 - exitStart);
        const eased = t * t * (3 - 2 * t);
        floatStage = i + 0.5 * eased;
      }

      return { stageIndex: i, isCardVisible, panProgress, floatStage };
    }
  }
  return { stageIndex: 0, isCardVisible: true, panProgress: 0, floatStage: 0 };
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

  // Active Stage Index (0 to 5) + Visibility Flag + Continuous Float Index for Planet Flight
  const [stageIndex, setStageIndex] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const prevVisibleRef = useRef(true);
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
      // Land cleanly inside the visible card plateau right after planet arrival
      const targetFrac = clamped === 0 ? 0.08 : 0.22;
      const targetProgress = seg.start + (seg.end - seg.start) * targetFrac;
      const targetScroll = containerTop + scrollable * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }

    // Fallback release in case smooth scroll finishes early or target is already in view
    programmaticTimerRef.current = setTimeout(() => {
      programmaticTargetRef.current = null;
    }, 1400);

    if (clamped === stageIndex && isCardVisible) return;
    setDirection(clamped > stageIndex ? 1 : -1);
    prevStageRef.current = clamped;
    prevVisibleRef.current = true;
    floatStageRef.current = clamped;
    panProgressRef.current = 0;
    applyCardPan();
    setIsCardVisible(true);
    setStageIndex(clamped);
  };

  // Automated Cinematic Tour Timer
  useEffect(() => {
    if (!isPlayingTour) return;

    const timer = setInterval(() => {
      setDirection(1);
      panProgressRef.current = 0;
      prevVisibleRef.current = true;
      setIsCardVisible(true);
      setStageIndex((prev) => {
        const next = (prev + 1) % 6;
        prevStageRef.current = next;
        floatStageRef.current = next;
        return next;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlayingTour]);

  // Scroll Sync: Continuous Namma Universe Plateau Curve + Seamless Card Disappear/Reappear
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

      if (mapped.isCardVisible !== prevVisibleRef.current) {
        prevVisibleRef.current = mapped.isCardVisible;
        setIsCardVisible(mapped.isCardVisible);
      }

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
    { num: "03", short: "MATRIX", name: "Capability Parity", title: "Traditional Front Desk vs Aiva" },
    { num: "04", short: "DECK", name: "Telemetry Console", title: "Real-Time Clinic Management Deck" },
    { num: "05", short: "ROI", name: "Financial Recovery", title: "Live Missed-Call Cost & Revenue Engine" },
    { num: "06", short: "SHIELD", name: "Enterprise Governance", title: "Strict Compliance & Zero Risk Protocol" },
  ];

  const currentMeta = STAGE_METADATA[stageIndex];
  const activePlanetColor = STAGE_PLANET_COLORS[stageIndex] || "#E65C8E";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[680vh] md:min-h-[700vh] bg-transparent"
    >
      {/* Sticky Cinematic Theater (Full-screen top-0 h-[100svh] prevents iOS Safari toolbar resize jitter & navbar seam gaps) */}
      <div 
        className="sticky top-0 h-[100svh] flex flex-col justify-between overflow-x-hidden overflow-y-hidden px-3 sm:px-6 z-20 relative"
      >
        {/* Realistic Namma Universe 3D Solar System & Planet-Flight Canvas */}
        <AivaSolarSystemBackground
          stageIndex={stageIndex}
          floatStageRef={floatStageRef}
          className="absolute inset-0 pointer-events-none z-0"
        />
        
        {/* Stage Header: Clean Apple-Style Centered Display Heading */}
        <div
          className="max-w-3xl mx-auto w-full pt-[84px] sm:pt-[96px] pb-2 sm:pb-3 px-2 text-center select-none shrink-0 relative z-10 transition-opacity duration-300"
          style={{ opacity: isCardVisible ? 1 : 0.25 }}
        >
          <h2 
            className="text-[24px] sm:text-[34px] md:text-[40px] font-bold tracking-[-0.03em] leading-[1.15] text-balance text-white"
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
            key={`aura-${stageIndex}-${isCardVisible ? "on" : "off"}`}
            initial={{ opacity: isCardVisible ? 0.75 : 0.12, scale: isCardVisible ? 0.15 : 1.0 }}
            animate={{ opacity: isCardVisible ? 0.12 : 0.0, scale: isCardVisible ? 1.15 : 0.35 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
              <AnimatePresence mode="wait" custom={direction} initial={false}>
            
            {/* === STAGE 01: UNIFIED 28-SECOND BOOKING PIPELINE (FULL TEXT, CARD 4 FOOTPRINT) === */}
            {isCardVisible && stageIndex === 0 && (
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
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-6 bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
                  {/* Top Apparatus Bar */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 sm:mb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="flex items-center gap-2 text-[#EC89B5] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse shrink-0" />
                      <span>28-SECOND BOOKING LOOP</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold whitespace-nowrap shrink-0">
                      28s END-TO-END
                    </span>
                  </div>

                  {/* 4 Crisp Timeline Steps Inside One Unified Card (Zero Truncation) */}
                  <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3 mb-3 sm:mb-4">
                    {WORKFLOW_STEPS.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.step}
                          className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.025] border border-white/10 hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-start gap-2.5 min-w-0">
                              <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/15 shrink-0 mt-0.5"
                                style={{ background: `${s.color}20`, color: s.color }}
                              >
                                <Icon size={15} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className="text-[9.5px] font-mono font-bold tracking-wider" style={{ color: s.color }}>
                                    {s.step}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                                    {s.title}
                                  </h4>
                                </div>
                                <p className="text-[11px] sm:text-xs text-white/70 leading-snug">
                                  {s.desc}
                                </p>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-bold whitespace-nowrap shrink-0">
                              {s.metric}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Guarantee Deck with Card-4 Style Metric Tiles */}
                  <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-1">
                        <ShieldCheck size={10} className="text-[#EC89B5]" />
                        <span>STAFF PRODUCTIVITY GUARANTEE</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                        Give your staff their time back—zero desk phone interruptions.
                      </p>
                    </div>

                    <div className="w-full sm:w-auto grid grid-cols-3 gap-2 shrink-0">
                      <div className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                        <span className="text-[9px] font-mono text-white/45 block">ROI BOOST</span>
                        <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">3.8x</span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                        <span className="text-[9px] font-mono text-white/45 block">MISSED</span>
                        <span className="text-sm sm:text-base font-bold font-mono text-white">0</span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                        <span className="text-[9px] font-mono text-white/45 block">RETENTION</span>
                        <span className="text-sm sm:text-base font-bold font-mono text-[#EC89B5]">94.6%</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 02: FRONT-DESK REALITY MATRIX (FULL TEXT, EYE-CATCHING, ZERO CUTOFFS) === */}
            {isCardVisible && stageIndex === 1 && (
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
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-5 bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 sm:mb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">FRONT-DESK REALITY</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold whitespace-nowrap shrink-0">
                      100% CALL CAPTURE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {PROBLEMS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.title}
                          className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.025] border border-white/10 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="flex items-center gap-1.5 text-[9.5px] font-mono text-[#EC89B5] font-semibold whitespace-nowrap">
                                <Icon size={11} />
                                {p.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/25 text-[9.5px] font-mono text-rose-300 font-semibold whitespace-nowrap shrink-0">
                                {p.stat}
                              </span>
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mb-1.5">
                              {p.title}
                            </h4>
                          </div>

                          <div className="space-y-1 text-[10.5px] sm:text-[11.5px] leading-snug">
                            <p className="text-white/60">
                              <span className="text-rose-400 font-mono font-bold mr-1">✕</span>
                              {p.description}
                            </p>
                            <p className="text-white/95 font-medium">
                              <span className="text-emerald-400 font-mono font-bold mr-1">✓</span>
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

            {/* === STAGE 03: FRIENDLY, NON-TECHNICAL COMPARISON (ZERO HORIZONTAL SCROLL) === */}
            {isCardVisible && stageIndex === 2 && (
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
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-6 bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 sm:mb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                    <span className="text-[#EC89B5] font-semibold">WHY CLINICS SWITCH</span>
                    <span className="text-white/50 whitespace-nowrap">100+ Active Businesses</span>
                  </div>

                  {/* Mobile View: Crisp Client-Friendly Cards (Zero Truncation, Zero Horizontal Scroll) */}
                  <div className="sm:hidden space-y-2">
                    {[
                      { cap: "Availability", old: "Closes at 8 PM & Sundays", aiva: "✓ Open 24/7, all 365 days" },
                      { cap: "Busy Rush Hours", old: "1 caller at a time, rest wait", aiva: "✓ Unlimited calls at once" },
                      { cap: "Appointment Booking", old: "Manual notes & slow callbacks", aiva: "✓ Books live in your calendar" },
                      { cap: "Client Confirmations", old: "Only if front desk remembers", aiva: "✓ WhatsApp slip in 3 seconds" },
                      { cap: "Monthly Cost", old: "₹35k–₹55k/mo + overtime", aiva: "✓ Simple flat monthly plan" },
                    ].map((row) => (
                      <div
                        key={row.cap}
                        className="p-2.5 rounded-xl bg-white/[0.025] border border-white/10"
                      >
                        <div className="text-[11px] font-bold text-white mb-1.5">{row.cap}</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] leading-snug">
                          <div className="px-2 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/55">
                            {row.old}
                          </div>
                          <div className="px-2 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-semibold">
                            {row.aiva}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop View: Clear Non-Technical Comparison Table */}
                  <div className="hidden sm:block">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/45 font-mono text-[10px] sm:text-[11px]">
                          <th className="pb-3 font-normal">WHAT MATTERS MOST</th>
                          <th className="pb-3 font-normal">HUMAN FRONT DESK</th>
                          <th className="pb-3 font-normal">CALL CENTER</th>
                          <th className="pb-3 px-3 font-semibold text-[#EC89B5] bg-emerald-500/[0.06] rounded-t-lg">WITH AIVA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        <tr>
                          <td className="py-3 font-medium text-white">Availability</td>
                          <td className="py-3 text-white/60">10:00 AM – 8:00 PM only</td>
                          <td className="py-3 text-white/60">24/7 (Expensive add-on)</td>
                          <td className="py-3 px-3 text-emerald-400 font-bold bg-emerald-500/[0.06]">✓ Open 24/7, all 365 days</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">Busy Rush Hours</td>
                          <td className="py-3 text-white/60">1 caller at a time, rest wait</td>
                          <td className="py-3 text-white/60">Long hold queues</td>
                          <td className="py-3 px-3 text-emerald-400 font-bold bg-emerald-500/[0.06]">✓ Answers unlimited calls at once</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">Appointment Booking</td>
                          <td className="py-3 text-white/60">Manual paper or CRM notes</td>
                          <td className="py-3 text-white/60">Takes messages, slow callbacks</td>
                          <td className="py-3 px-3 text-emerald-400 font-bold bg-emerald-500/[0.06]">✓ Books straight into your calendar</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">Client Confirmations</td>
                          <td className="py-3 text-white/60">Only if staff remembers</td>
                          <td className="py-3 text-white/60">No WhatsApp map or slip</td>
                          <td className="py-3 px-3 text-emerald-400 font-bold bg-emerald-500/[0.06]">✓ Sends WhatsApp slip in 3 seconds</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-white">Monthly Cost</td>
                          <td className="py-3 text-white/60">₹35,000 – ₹55,000/mo + overtime</td>
                          <td className="py-3 text-white/60">Per-minute fees + setup cost</td>
                          <td className="py-3 px-3 text-emerald-400 font-bold bg-emerald-500/[0.06] rounded-b-lg">✓ Simple flat monthly plan</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TiltCard>
              </motion.div>
            )}

            {/* === STAGE 04: EXECUTIVE TELEMETRY CONSOLE (DASHBOARD) === */}
            {isCardVisible && stageIndex === 3 && (
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
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-5 bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
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
            {isCardVisible && stageIndex === 4 && (
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
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-4 sm:p-7 bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
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
            {isCardVisible && stageIndex === 5 && (
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
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/15 p-3.5 sm:p-6 bg-[#0E070C]/98 sm:bg-[#0E070C]/97 backdrop-blur-3xl">
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
