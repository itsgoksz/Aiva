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
import { useScroll } from "framer-motion";
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
  FileCheck2,
  Calendar,
  Lock
} from "lucide-react";
import AivaSolarSystemBackground from "./AivaSolarSystemBackground";

// --- STATIC STAGE REPOSITORY & DATA STRUCTURES ---

const PROBLEMS = [
  {
    icon: PhoneMissed,
    category: "Evening & Weekend Rush",
    stat: "~1 in 3 missed",
    title: "Phones ring out when your desk is busy",
    description: "During 6 PM billing or weekend rush, callers hang up in 8 seconds and dial the next place on Google.",
    solution: "Picks up every caller at once — zero busy tone even on festive weekends.",
  },
  {
    icon: Clock,
    category: "After Closing Hours",
    stat: "₹1.2L+/mo lost",
    title: "Night & Sunday callers find locked doors",
    description: "Working professionals search and call between 9 PM and 11 PM after work, when nobody is at the desk.",
    solution: "Books late-night and Sunday slots 24×7 and texts your clinic location.",
  },
  {
    icon: Users,
    category: "Walk-In Interruptions",
    stat: "2+ hrs/day spent",
    title: "Front desk keeps pausing for repeat calls",
    description: "Walk-in guests wait at reception while staff repeat consultation fees, timings, and landmark directions.",
    solution: "Answers routine fee and timing questions so your team serves guests in person.",
  },
  {
    icon: MessageSquareOff,
    category: "Repeat Visitors",
    stat: "Missed loyalty",
    title: "Regular clients treated like first-timers",
    description: "Loyal patients and customers are asked to repeat their history and preferred specialist every time they call.",
    solution: "Recognises their phone number, greets them by name, and remembers their preference.",
  }
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Answers on the first ring",
    metric: "No wait",
    icon: PhoneCall,
    color: "#E65C8E",
    desc: "Greets callers in warm, natural Indian English or Hindi without hold music or robotic menus.",
  },
  {
    step: "02",
    title: "Checks your real diary",
    metric: "No clashes",
    icon: CalendarCheck,
    color: "#A66B8E",
    desc: "Looks up live openings on Google Calendar or Practo and keeps buffer time between visits.",
  },
  {
    step: "03",
    title: "Sends WhatsApp slip & pin",
    metric: "On the call",
    icon: MessageSquare,
    color: "#34D399",
    desc: "Texts the appointment time, doctor or stylist name, Google Maps pin, and optional UPI link.",
  },
  {
    step: "04",
    title: "Saves regular client notes",
    metric: "Auto-updated",
    icon: Database,
    color: "#EC89B5",
    desc: "Notes preferred specialist, past visits, and call summary neatly for your front desk.",
  }
];

const GOVERNANCE_PILLARS = [
  {
    title: "Keep your same phone number",
    desc: "No new SIM card or office hardware needed. Forward calls only when busy, after closing hours, or round the clock.",
    telemetry: "Ready in 10 minutes",
    icon: ShieldCheck,
    color: "#34D399"
  },
  {
    title: "Syncs with Practo & Google Calendar",
    desc: "Never double-books a doctor or stylist. If your front desk adds a walk-in guest, Aiva adjusts immediately.",
    telemetry: "Zero double-bookings",
    icon: Calendar,
    color: "#E65C8E"
  },
  {
    title: "Official WhatsApp & UPI alerts",
    desc: "Automatically sends verified WhatsApp confirmations with clinic directions, prep tips, and optional UPI advance link.",
    telemetry: "Verified WhatsApp",
    icon: FileCheck2,
    color: "#A66B8E"
  },
  {
    title: "Only approved info — 100% private",
    desc: "Shares strictly your approved prices and timings. Any medical query or special request transfers straight to your staff.",
    telemetry: "Private & bank-safe",
    icon: Lock,
    color: "#EC89B5"
  }
];

// ─── NAMMA UNIVERSE PLANET-EMERGENCE TRANSITIONS ───────────────
// Cards literally appear out of their individual glowing planet:
// - Entering: expands radially from the glowing planet core in deep Z-space
//   (scale 0.08 -> 1.0) as the camera finishes its orbital flight to that planet.
// - Exiting: condenses smoothly back into space as the camera sweeps to the next orbit.
const STAGE_METADATA = [
  { num: "01", short: "FLOW", name: "28s Booking Flow", title: "From Ringing Phone to Confirmed Visit" },
  { num: "02", short: "GAPS", name: "Everyday Revenue Leaks", title: "Every Missed Call Costs You a Customer" },
  { num: "03", short: "COMPARE", name: "How Aiva Compares", title: "Why 100+ Indian Clinics & Studios Switch" },
  { num: "04", short: "DESK", name: "Owner's Daily View", title: "Your Front Desk, Calm & Organised" },
  { num: "05", short: "VALUE", name: "Monthly Earnings Estimator", title: "See What Unanswered Calls Cost You" },
  { num: "06", short: "TRUST", name: "Safe & Simple Setup", title: "Live on Your Number in 10 Minutes" },
];

interface StageSlotProps {
  slotRef: (el: HTMLDivElement | null) => void;
  defaultActive?: boolean;
  children: React.ReactNode;
}

/** Pre-mounted GPU-composited card layer scrubbed directly via DOM styles (never toggles visibility so iOS WebKit keeps GPU texture hot) */
function StageSlot({ slotRef, defaultActive = false, children }: StageSlotProps) {
  return (
    <div
      ref={slotRef}
      className="col-start-1 row-start-1 w-full max-w-[980px] mx-auto relative will-change-[transform,opacity]"
      style={{
        contain: "layout style",
        opacity: defaultActive ? 1 : 0,
        transform: defaultActive
          ? "translate3d(0, 0, 0) scale(1)"
          : "translate3d(0, 10px, 0) scale(0.94)",
        pointerEvents: defaultActive ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

// ─── 3D INTERACTIVE TILT CONTAINER ───────────────────────────

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function TiltCard({ children, className = "", style = {} }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Skip 3D hover tilt on touch devices and avoid React re-renders on desktop hover
    if (e.pointerType === "touch" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;

    cardRef.current.style.transform = `perspective(1200px) rotateX(${(-py * 3.2).toFixed(2)}deg) rotateY(${(px * 3.2).toFixed(2)}deg)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${((x / rect.width) * 100).toFixed(1)}% ${((y / rect.height) * 100).toFixed(1)}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const handlePointerLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={style}
    >
      {children}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-300 opacity-0"
      />
    </div>
  );
}

// ─── CALIBRATED SCROLL BOUNDS FOR BALANCED SECTION PACING ─────
// Accounts for entry/exit sticky visibility on sections 01 and 06 so every section
// has equal, accurate on-screen reading time during continuous scrolling.
// Symmetric weights & flight spans ensure identical orbital velocity clockwise and anticlockwise
const MOBILE_STAGE_WEIGHTS = [0.85, 1.0, 1.0, 1.0, 1.0, 0.85];
const DESKTOP_STAGE_WEIGHTS = [0.85, 1.0, 1.0, 1.0, 1.0, 0.85];

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

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function mapProgressToStage(latest: number, isMobile: boolean) {
  const bounds = isMobile ? MOBILE_BOUNDS : DESKTOP_BOUNDS;
  const clamped = Math.max(0, Math.min(0.999999, latest));
  const lastIdx = bounds.length - 1;
  for (let i = 0; i < bounds.length; i++) {
    const { start, end } = bounds[i];
    if (clamped >= start && (clamped < end || i === lastIdx)) {
      const frac = Math.max(0, Math.min(1, (clamped - start) / (end - start)));

      // Symmetric orbital timeline: identical ~0.26 scroll travel per half-flight across all boundaries
      // so reversing direction (anticlockwise) never hits a velocity kink at planet midpoints.
      const flightInEnd = i === 0 ? 0 : i === lastIdx ? 0.31 : 0.26;
      const bloomEnd = i === 0 ? 0 : i === lastIdx ? 0.54 : 0.38;
      const dissolveStart = i === lastIdx ? 1 : i === 0 ? 0.46 : 0.62;
      const flightOutStart = i === lastIdx ? 1 : i === 0 ? 0.69 : 0.74;

      let cardVisibility = 1;
      if (i > 0 && frac < flightInEnd) {
        cardVisibility = 0;
      } else if (i > 0 && frac < bloomEnd) {
        cardVisibility = smoothstep((frac - flightInEnd) / (bloomEnd - flightInEnd));
      } else if (i < lastIdx && frac > flightOutStart) {
        cardVisibility = 0;
      } else if (i < lastIdx && frac > dissolveStart) {
        cardVisibility = 1 - smoothstep((frac - dissolveStart) / (flightOutStart - dissolveStart));
      }

      let floatStage = i;
      if (i > 0 && frac < flightInEnd) {
        floatStage = i - 0.5 + 0.5 * smoothstep(frac / flightInEnd);
      } else if (i < lastIdx && frac > flightOutStart) {
        floatStage = i + 0.5 * smoothstep((frac - flightOutStart) / (1 - flightOutStart));
      }

      return { stageIndex: i, cardVisibility, floatStage };
    }
  }
  return { stageIndex: 0, cardVisibility: 1, floatStage: 0 };
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
  const solarLayerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active Stage Index (0 to 5) + Continuous Float Index for Planet Flight
  const [stageIndex, setStageIndex] = useState(0);
  const floatStageRef = useRef<number>(0);
  const prevStageRef = useRef(0);
  const pillScrollRafRef = useRef<number | null>(null);
  const suppressAssistRef = useRef<boolean>(false);
  const suppressAssistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleAssistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchingRef = useRef<boolean>(false);
  const latestProgressRef = useRef<number>(0);
  const [isSolarActive, setIsSolarActive] = useState(false);

  // Lock solar canvas height to screen/largest viewport height (ignoring iOS Safari toolbar resize)
  const [stableSolarHeight, setStableSolarHeight] = useState<number>(() => {
    if (typeof window === "undefined") return 900;
    const screenH = window.screen?.height || window.innerHeight;
    return Math.max(window.innerHeight, screenH) + 120;
  });
  const lastSolarWidthRef = useRef<number>(
    typeof window !== "undefined" ? window.innerWidth : 1000
  );

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (Math.abs(w - lastSolarWidthRef.current) < 40) return;
      lastSolarWidthRef.current = w;
      const screenH = window.screen?.height || window.innerHeight;
      setStableSolarHeight(Math.max(window.innerHeight, screenH) + 120);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const glideScrollTo = (targetY: number, durationMs: number) => {
    if (pillScrollRafRef.current !== null) {
      cancelAnimationFrame(pillScrollRafRef.current);
      pillScrollRafRef.current = null;
    }
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) < 6) return;
    suppressAssistRef.current = true;
    if (suppressAssistTimerRef.current) clearTimeout(suppressAssistTimerRef.current);
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      window.scrollTo(0, startY + diff * eased);
      if (t < 1) {
        pillScrollRafRef.current = requestAnimationFrame(step);
      } else {
        pillScrollRafRef.current = null;
        suppressAssistTimerRef.current = setTimeout(() => {
          suppressAssistRef.current = false;
        }, 180);
      }
    };
    pillScrollRafRef.current = requestAnimationFrame(step);
  };

  const scheduleIdleAssist = () => {
    if (idleAssistTimerRef.current) clearTimeout(idleAssistTimerRef.current);
    if (suppressAssistRef.current || pillScrollRafRef.current !== null) return;
    const latest = latestProgressRef.current;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const mapped = mapProgressToStage(latest, isMobile);

    // Activate only when a card is partially fading/appearing and scrolling settles completely
    if (
      mapped.cardVisibility > 0.02 &&
      mapped.cardVisibility < 0.94 &&
      latest > 0.01 &&
      latest < 0.99
    ) {
      idleAssistTimerRef.current = setTimeout(() => {
        if (
          isTouchingRef.current ||
          suppressAssistRef.current ||
          pillScrollRafRef.current !== null ||
          !containerRef.current
        ) {
          return;
        }
        const bounds = isMobile ? MOBILE_BOUNDS : DESKTOP_BOUNDS;
        const idx = mapped.stageIndex;
        const seg = bounds[idx];
        const targetFrac = idx === 0 ? 0.16 : idx === bounds.length - 1 ? 0.72 : 0.50;
        const rect = containerRef.current.getBoundingClientRect();
        const containerTop = window.scrollY + rect.top;
        const scrollable = Math.max(1, containerRef.current.offsetHeight - window.innerHeight);
        const targetY =
          containerTop + scrollable * (seg.start + (seg.end - seg.start) * targetFrac);
        glideScrollTo(targetY, 540);
      }, 420);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsSolarActive(entry.isIntersecting),
      { rootMargin: "900px 0px 900px 0px", threshold: 0 }
    );
    io.observe(el);

    let rafId: number | null = null;
    const updateOpacity = () => {
      rafId = null;
      const layer = solarLayerRef.current;
      if (!layer) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const navBottom = 88;
      // Only begin cross-fading solar theater after Hero has mostly scrolled past (eliminates Hero initial-scroll starfield flash)
      const enterProgress = Math.max(0, Math.min(1, (vh * 0.52 - rect.top) / (vh * 0.48)));
      const exitProgress = Math.max(0, Math.min(1, (rect.bottom - navBottom) / (vh * 0.42)));
      const opacity = Math.min(enterProgress, exitProgress);
      layer.style.opacity = opacity.toFixed(3);
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(updateOpacity);
    };

    const cancelPillGlide = () => {
      if (pillScrollRafRef.current !== null) {
        cancelAnimationFrame(pillScrollRafRef.current);
        pillScrollRafRef.current = null;
      }
      if (suppressAssistTimerRef.current) clearTimeout(suppressAssistTimerRef.current);
      suppressAssistRef.current = false;
    };

    const onTouchStart = () => {
      isTouchingRef.current = true;
      cancelPillGlide();
      if (idleAssistTimerRef.current) clearTimeout(idleAssistTimerRef.current);
    };

    const onTouchEnd = () => {
      isTouchingRef.current = false;
      // Re-arm idle assist on finger lift in case scroll stopped while thumb was still resting
      scheduleIdleAssist();
    };

    updateOpacity();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("wheel", cancelPillGlide, { passive: true });
    return () => {
      io.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      cancelPillGlide();
      if (idleAssistTimerRef.current) clearTimeout(idleAssistTimerRef.current);
      if (suppressAssistTimerRef.current) clearTimeout(suppressAssistTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("wheel", cancelPillGlide);
    };
  }, []);

  // Dashboard Preview Tab State (Stage 04)
  const [dashTab, setDashTab] = useState<"calls" | "schedule" | "crm">("calls");

  // ROI Calculator State (Stage 05)
  const [weeklyCalls, setWeeklyCalls] = useState(120);
  const [averageTicket, setAverageTicket] = useState(1800);

  const monthlyCalls = weeklyCalls * 4.3;
  const missedCallsMonthly = Math.round(monthlyCalls * 0.32);
  const recoveredBookings = Math.round(missedCallsMonthly * 0.65);
  const recoveredRevenueMonthly = Math.round(recoveredBookings * averageTicket);

  const applyScrubStyles = (activeIdx: number, cardVisibility: number) => {
    const slots = slotRefs.current;
    // Gentle 0.94 -> 1.0 scale prevents iOS Safari Retina layer re-rasterization jitter
    const scale = 0.94 + 0.06 * cardVisibility;
    const yOffset = (1 - cardVisibility) * 10;
    for (let i = 0; i < 6; i++) {
      const slot = slots[i];
      if (!slot) continue;
      if (i === activeIdx && cardVisibility > 0.002) {
        slot.style.opacity = cardVisibility.toFixed(3);
        slot.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        const nextPtr = cardVisibility > 0.5 ? "auto" : "none";
        if (slot.style.pointerEvents !== nextPtr) slot.style.pointerEvents = nextPtr;
      } else if (slot.style.opacity !== "0") {
        slot.style.opacity = "0";
        slot.style.transform = "translate3d(0, 10px, 0) scale(0.94)";
        if (slot.style.pointerEvents !== "none") slot.style.pointerEvents = "none";
      }
    }
    if (headingRef.current) {
      headingRef.current.style.opacity = (0.35 + 0.65 * cardVisibility).toFixed(3);
    }
  };

  // Pill-click Navigation: matches natural orbital cruise speed instead of snapping fast
  const changeStage = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(5, newIndex));
    if (idleAssistTimerRef.current) clearTimeout(idleAssistTimerRef.current);
    if (!containerRef.current) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const bounds = isMobile ? MOBILE_BOUNDS : DESKTOP_BOUNDS;
    const seg = bounds[clamped];
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollable = Math.max(1, containerRef.current.offsetHeight - window.innerHeight);
    const targetFrac = clamped === 0 ? 0.16 : clamped === bounds.length - 1 ? 0.72 : 0.50;
    const targetProgress = seg.start + (seg.end - seg.start) * targetFrac;
    const targetY = containerTop + scrollable * targetProgress;

    const hops = Math.max(1, Math.abs(clamped - stageIndex));
    const durationMs = Math.min(2200, Math.max(900, hops * 560));
    glideScrollTo(targetY, durationMs);
  };

  // 100% Native Scroll-Scrubbed Pipeline (rAF-batched DOM updates, zero scroll hijacking)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    applyScrubStyles(0, 1);
    let scrubRaf: number | null = null;
    let pendingLatest = 0;

    const flush = () => {
      scrubRaf = null;
      latestProgressRef.current = pendingLatest;
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const mapped = mapProgressToStage(pendingLatest, isMobile);

      floatStageRef.current = mapped.floatStage;
      applyScrubStyles(mapped.stageIndex, mapped.cardVisibility);

      if (mapped.stageIndex !== prevStageRef.current) {
        prevStageRef.current = mapped.stageIndex;
        setStageIndex(mapped.stageIndex);
      }

      scheduleIdleAssist();
    };

    const unsub = scrollYProgress.on("change", (latest) => {
      pendingLatest = latest;
      if (scrubRaf === null) {
        scrubRaf = requestAnimationFrame(flush);
      }
    });

    return () => {
      unsub();
      if (scrubRaf !== null) cancelAnimationFrame(scrubRaf);
    };
  }, [scrollYProgress]);

  const currentMeta = STAGE_METADATA[stageIndex];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[560vh] md:min-h-[580vh] bg-transparent"
    >
      {/* Fixed 3D Solar System Layer (opaque obsidian base hides static 2D starfield during card section) */}
      <div
        ref={solarLayerRef}
        className="fixed top-0 left-0 w-full pointer-events-none z-0 will-change-[opacity]"
        style={{ opacity: 0, height: `${stableSolarHeight}px`, backgroundColor: "#0A0508" }}
      >
        <AivaSolarSystemBackground
          stageIndex={stageIndex}
          floatStageRef={floatStageRef}
          active={isSolarActive}
          className="w-full h-full"
        />
      </div>

      {/* Pure HTML/CSS Sticky Theater */}
      <div 
        className="sticky top-0 h-[100svh] flex flex-col justify-between overflow-x-clip px-2.5 sm:px-6 z-20"
      >
        {/* Stage Header: Clean Apple-Style Centered Display Heading */}
        <div
          ref={headingRef}
          className="max-w-3xl mx-auto w-full pt-[78px] sm:pt-[104px] pb-2 sm:pb-4 px-2 text-center select-none shrink-0 relative z-10 will-change-[opacity]"
        >
          <h2 
            className="text-[20px] sm:text-[34px] md:text-[40px] font-bold tracking-[-0.03em] leading-[1.15] text-balance text-white drop-shadow-[0_2px_10px_rgba(10,5,8,0.85)]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {currentMeta.title}
          </h2>
        </div>

        {/* Central Morphing Stage (Pre-mounted GPU Grid prevents React mount hitch on iOS) */}
        <div 
          className="flex-1 min-h-0 max-w-6xl mx-auto w-full flex items-center justify-center relative z-10 py-0.5 sm:py-2"
        >
          <div className="w-full relative z-10 grid items-center">
            
            {/* === STAGE 01: HOW EVERY BOOKING HAPPENS === */}
            <StageSlot slotRef={(el) => { slotRefs.current[0] = el; }} defaultActive>
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/[0.12] p-3.5 sm:p-7 bg-[#10080D]/[0.94] bg-[radial-gradient(ellipse_at_top,rgba(230,92,142,0.08),transparent_62%)] shadow-[0_24px_72px_rgba(0,0,0,0.82)]">
                  {/* Editorial Card Header */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-4 mb-1 sm:mb-2 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] shrink-0" />
                      <span className="text-[11px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide truncate">
                        How a phone inquiry turns into a visit
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-white/75 text-[10px] sm:text-[11px] font-medium whitespace-nowrap shrink-0">
                      Under 30 seconds
                    </span>
                  </div>

                  {/* 4 Clean Hairline-Separated Steps (Zero Double Boxes) */}
                  <div className="divide-y divide-white/[0.07] sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-1">
                    {WORKFLOW_STEPS.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.step}
                          className="py-2 sm:py-3.5 sm:border-b sm:border-white/[0.07]"
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                              <div
                                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: `${s.color}1C`, color: s.color }}
                              >
                                <Icon size={14} className="sm:w-4 sm:h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-baseline gap-1.5 mb-0.5">
                                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide" style={{ color: s.color }}>
                                    {s.step}
                                  </span>
                                  <h4 className="text-[12.5px] sm:text-[15px] font-semibold text-white leading-tight sm:leading-snug">
                                    {s.title}
                                  </h4>
                                </div>
                                <p className="text-[10.5px] sm:text-[13px] text-white/65 leading-[1.35] sm:leading-relaxed">
                                  {s.desc}
                                </p>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/[0.11] text-emerald-300 text-[9.5px] sm:text-[11px] font-medium whitespace-nowrap shrink-0 mt-0.5">
                              {s.metric}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Clean Asymmetric Takeaway Footer */}
                  <div className="pt-2.5 sm:pt-4 mt-0.5 sm:mt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4">
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-medium text-[#EC89B5] block mb-0.5">
                        Built for Indian reception desks
                      </span>
                      <p className="text-[12px] sm:text-[14.5px] font-medium text-white/95 leading-snug">
                        Your team helps guests in person — Aiva answers every call.
                      </p>
                    </div>

                    <div className="w-full sm:w-auto grid grid-cols-3 divide-x divide-white/[0.1] shrink-0 bg-white/[0.025] rounded-xl py-1.5 sm:py-2 px-1">
                      <div className="px-2.5 sm:px-4 text-center">
                        <span className="text-[13px] sm:text-lg font-bold text-white block leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0</span>
                        <span className="text-[9px] sm:text-[10.5px] text-white/50 block">Missed Calls</span>
                      </div>
                      <div className="px-2.5 sm:px-4 text-center">
                        <span className="text-[13px] sm:text-lg font-bold text-emerald-400 block leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>24×7</span>
                        <span className="text-[9px] sm:text-[10.5px] text-white/50 block">Always Open</span>
                      </div>
                      <div className="px-2.5 sm:px-4 text-center">
                        <span className="text-[13px] sm:text-lg font-bold text-[#EC89B5] block leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>95%</span>
                        <span className="text-[9px] sm:text-[10.5px] text-white/50 block">Show-Up Rate</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
            </StageSlot>

            {/* === STAGE 02: EVERYDAY REVENUE LEAKS (HAIRLINE QUADRANT MATRIX) === */}
            <StageSlot slotRef={(el) => { slotRefs.current[1] = el; }}>
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/[0.12] p-3.5 sm:p-7 bg-[#10080D]/[0.94] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.07),transparent_62%)] shadow-[0_24px_72px_rgba(0,0,0,0.82)]">
                  <div className="flex items-center justify-between gap-2 pb-2 sm:pb-3.5 mb-0.5 sm:mb-1 border-b border-white/[0.08]">
                    <span className="text-[11px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide">
                      Where clinics & studios lose walk-ins
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/[0.12] text-emerald-300 text-[10px] sm:text-[11px] font-medium whitespace-nowrap shrink-0">
                      Every call answered
                    </span>
                  </div>

                  <div className="divide-y divide-white/[0.07] sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8">
                    {PROBLEMS.map((p, idx) => {
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.title}
                          className={`py-2 sm:py-4 flex flex-col justify-between ${
                            idx < 2 ? "sm:border-b sm:border-white/[0.07]" : ""
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#EC89B5] font-medium whitespace-nowrap">
                                <Icon size={12} />
                                {p.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/[0.12] text-[9.5px] sm:text-[10.5px] text-rose-200 font-medium whitespace-nowrap shrink-0">
                                {p.stat}
                              </span>
                            </div>

                            <h4 className="text-[12px] sm:text-[15px] font-semibold text-white leading-tight sm:leading-snug mb-1">
                              {p.title}
                            </h4>
                          </div>

                          <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-[12.5px] leading-[1.3] sm:leading-relaxed">
                            <p className="text-white/55">
                              <span className="text-rose-400/90 font-semibold mr-1.5">−</span>
                              {p.description}
                            </p>
                            <p className="text-white/90 font-medium">
                              <span className="text-emerald-400 font-semibold mr-1.5">✓</span>
                              {p.solution}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TiltCard>
            </StageSlot>

            {/* === STAGE 03: PLAIN-ENGLISH COMPARISON === */}
            <StageSlot slotRef={(el) => { slotRefs.current[2] = el; }}>
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/[0.12] p-3.5 sm:p-7 bg-[#10080D]/[0.94] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_62%)] shadow-[0_24px_72px_rgba(0,0,0,0.82)]">
                  <div className="flex items-center justify-between gap-2 pb-2 sm:pb-3.5 mb-1 sm:mb-2 border-b border-white/[0.08]">
                    <span className="text-[11px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide">
                      Comparing your options
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/55 whitespace-nowrap">
                      Trusted by 100+ Indian teams
                    </span>
                  </div>

                  {/* Mobile View: Crisp Hairline Rows (Compact Height, Zero Box Clutter) */}
                  <div className="sm:hidden divide-y divide-white/[0.07]">
                    {[
                      { cap: "Working Hours", old: "10 AM – 8 PM, off Sundays", aiva: "✓ Open 24×7, all 365 days" },
                      { cap: "Peak Hour Rush", old: "1 caller at a time, rest wait", aiva: "✓ Handles 20+ callers at once" },
                      { cap: "Bookings & Map Pin", old: "Manual diary & slow callbacks", aiva: "✓ Books live + WhatsApp slip" },
                      { cap: "Caller Warmth", old: "Varies by staff shift", aiva: "✓ Warm English & Hindi voice" },
                      { cap: "Monthly Expense", old: "₹30k–₹50k/mo per person", aiva: "✓ Predictable flat monthly plan" },
                    ].map((row) => (
                      <div key={row.cap} className="py-2">
                        <div className="text-[11.5px] font-semibold text-white mb-1">{row.cap}</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] leading-snug">
                          <div className="text-white/50 pr-1">
                            {row.old}
                          </div>
                          <div className="px-2 py-1 rounded-lg bg-emerald-500/[0.1] text-emerald-300 font-medium">
                            {row.aiva}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop View: Editorial 4-Column Comparison Sheet */}
                  <div className="hidden sm:block">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.08] text-white/50 text-[11px] font-medium">
                          <th className="pb-3 font-medium">What Matters Daily</th>
                          <th className="pb-3 font-medium">Receptionist Alone</th>
                          <th className="pb-3 font-medium">Outsourced Call Centre</th>
                          <th className="pb-3 px-4 font-semibold text-[#ECA9B7] bg-white/[0.04] rounded-t-xl">With Aiva</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        <tr>
                          <td className="py-3 font-semibold text-white">Working Hours</td>
                          <td className="py-3 text-white/55">10 AM – 8 PM, off Sundays</td>
                          <td className="py-3 text-white/55">Extra shift charges</td>
                          <td className="py-3 px-4 text-emerald-300 font-semibold bg-white/[0.04]">✓ Open 24×7, Sundays & holidays</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold text-white">Peak Hour Rush</td>
                          <td className="py-3 text-white/55">1 caller at a time, rest wait</td>
                          <td className="py-3 text-white/55">Hold queues & transfers</td>
                          <td className="py-3 px-4 text-emerald-300 font-semibold bg-white/[0.04]">✓ Handles 20+ callers at once</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold text-white">Booking & WhatsApp</td>
                          <td className="py-3 text-white/55">Paper diary & missed callbacks</td>
                          <td className="py-3 text-white/55">Takes notes, no direct booking</td>
                          <td className="py-3 px-4 text-emerald-300 font-semibold bg-white/[0.04]">✓ Books live + sends map & UPI slip</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold text-white">Voice & Languages</td>
                          <td className="py-3 text-white/55">Varies by shift</td>
                          <td className="py-3 text-white/55">Robotic, scripted replies</td>
                          <td className="py-3 px-4 text-emerald-300 font-semibold bg-white/[0.04]">✓ Warm Indian English & Hindi</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold text-white">Monthly Cost</td>
                          <td className="py-3 text-white/55">₹30,000 – ₹50,000/mo</td>
                          <td className="py-3 text-white/55">Setup fee + per-minute bills</td>
                          <td className="py-3 px-4 text-emerald-300 font-semibold bg-white/[0.04] rounded-b-xl">✓ Simple flat monthly plan</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TiltCard>
            </StageSlot>

            {/* === STAGE 04: OWNER'S DAILY VIEW (INTERACTIVE TABS) === */}
            <StageSlot slotRef={(el) => { slotRefs.current[3] = el; }}>
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/[0.12] p-3.5 sm:p-6 bg-[#10080D]/[0.94] bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.07),transparent_62%)] shadow-[0_24px_72px_rgba(0,0,0,0.82)]">
                  {/* Top 4 Clean Metrics (Soft Bento Tiles without Clunky Borders) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03]">
                      <span className="text-[10px] sm:text-[11px] text-white/50 block">Calls Answered</span>
                      <span className="text-lg sm:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>48</span>
                      <span className="text-[10px] text-emerald-400 block">0 missed today</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03]">
                      <span className="text-[10px] sm:text-[11px] text-white/50 block">Bookings Value</span>
                      <span className="text-lg sm:text-2xl font-bold text-emerald-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>₹1,84,200</span>
                      <span className="text-[10px] text-white/50 block">18 visits confirmed</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03]">
                      <span className="text-[10px] sm:text-[11px] text-white/50 block">Staff Time Saved</span>
                      <span className="text-lg sm:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>36.5 hrs</span>
                      <span className="text-[10px] text-white/50 block">This week alone</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03]">
                      <span className="text-[10px] sm:text-[11px] text-white/50 block">Caller Rating</span>
                      <span className="text-lg sm:text-2xl font-bold text-[#EC89B5]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>4.98 / 5</span>
                      <span className="text-[10px] text-[#ECA9B7]/85 block">Warm & helpful</span>
                    </div>
                  </div>

                  {/* Interactive Tab Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-1 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-white">Reception Activity</span>
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/[0.12] text-emerald-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Live sync
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full">
                      <button
                        onClick={() => setDashTab("calls")}
                        className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-medium cursor-pointer transition-colors ${dashTab === "calls" ? "bg-[#E65C8E] text-white" : "text-white/55 hover:text-white"}`}
                      >
                        Today's Calls
                      </button>
                      <button
                        onClick={() => setDashTab("schedule")}
                        className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-medium cursor-pointer transition-colors ${dashTab === "schedule" ? "bg-[#E65C8E] text-white" : "text-white/55 hover:text-white"}`}
                      >
                        Today's Diary
                      </button>
                      <button
                        onClick={() => setDashTab("crm")}
                        className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-medium cursor-pointer transition-colors ${dashTab === "crm" ? "bg-[#E65C8E] text-white" : "text-white/55 hover:text-white"}`}
                      >
                        Regular Clients
                      </button>
                    </div>
                  </div>

                  {/* Interactive Tab Content */}
                  <div className="divide-y divide-white/[0.07] text-xs">
                    {dashTab === "calls" && (
                      <>
                        <div className="py-2.5 sm:py-3 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.07] text-white/70 font-medium">01</span>
                              <span className="font-semibold text-white text-[12px] sm:text-sm">Ananya Deshmukh</span>
                              <span className="text-white/45 text-[11px]">+91 98450 23489</span>
                            </div>
                            <span className="text-white/60 text-[11px] sm:text-xs block mt-0.5 leading-snug">
                              Booked HydraFacial with Dr. Kavya for Sat 3:00 PM · WhatsApp map pin sent
                            </span>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/[0.14] text-emerald-300 text-[10px] sm:text-[11px] font-semibold block">
                              Booked · ₹2,800
                            </span>
                            <span className="text-[10px] text-white/40 block mt-0.5">1m 18s call</span>
                          </div>
                        </div>

                        <div className="py-2.5 sm:py-3 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.07] text-white/70 font-medium">02</span>
                              <span className="font-semibold text-white text-[12px] sm:text-sm">Karthik Nair</span>
                              <span className="text-white/45 text-[11px]">+91 99001 89012</span>
                            </div>
                            <span className="text-white/60 text-[11px] sm:text-xs block mt-0.5 leading-snug">
                              Confirmed dental scaling Thu 5:30 PM with Dr. Varun · 6-month regular checkup
                            </span>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/[0.14] text-emerald-300 text-[10px] sm:text-[11px] font-semibold block">
                              Booked · ₹1,500
                            </span>
                            <span className="text-[10px] text-white/40 block mt-0.5">48s call</span>
                          </div>
                        </div>
                      </>
                    )}

                    {dashTab === "schedule" && (
                      <>
                        <div className="py-2.5 sm:py-3 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] px-2 py-0.5 rounded bg-[#E65C8E]/20 text-[#ECA9B7] font-semibold">3:00 PM</span>
                              <span className="font-semibold text-white text-[12px] sm:text-sm">Ananya Deshmukh · Skin Consult</span>
                            </div>
                            <span className="text-white/60 text-[11px] sm:text-xs block mt-0.5">
                              With Dr. Kavya · 15-min buffer reserved · WhatsApp reminder delivered
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/[0.14] text-emerald-300 text-[10px] sm:text-[11px] font-semibold shrink-0">
                            Confirmed
                          </span>
                        </div>

                        <div className="py-2.5 sm:py-3 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] px-2 py-0.5 rounded bg-[#E65C8E]/20 text-[#ECA9B7] font-semibold">5:30 PM</span>
                              <span className="font-semibold text-white text-[12px] sm:text-sm">Karthik Nair · Dental Scaling</span>
                            </div>
                            <span className="text-white/60 text-[11px] sm:text-xs block mt-0.5">
                              With Dr. Varun · Synced with Google Calendar & Practo
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/[0.14] text-emerald-300 text-[10px] sm:text-[11px] font-semibold shrink-0">
                            Confirmed
                          </span>
                        </div>
                      </>
                    )}

                    {dashTab === "crm" && (
                      <>
                        <div className="py-2.5 sm:py-3 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white text-[12px] sm:text-sm">Ananya Deshmukh</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/15 text-[#EC89B5] font-medium">4th Visit</span>
                            </div>
                            <span className="text-white/60 text-[11px] sm:text-xs block mt-0.5">
                              Prefers Saturday afternoons with Dr. Kavya · Note: Sensitive skin routine
                            </span>
                          </div>
                          <span className="text-[11px] text-white/55 shrink-0">Indiranagar</span>
                        </div>

                        <div className="py-2.5 sm:py-3 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white text-[12px] sm:text-sm">Karthik Nair</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/15 text-[#EC89B5] font-medium">Regular Patron</span>
                            </div>
                            <span className="text-white/60 text-[11px] sm:text-xs block mt-0.5">
                              Books every 6 months · Prefers after 5:00 PM · Pays via UPI at desk
                            </span>
                          </div>
                          <span className="text-[11px] text-white/55 shrink-0">Koramangala</span>
                        </div>
                      </>
                    )}
                  </div>
                </TiltCard>
            </StageSlot>

            {/* === STAGE 05: MONTHLY EARNINGS ESTIMATOR === */}
            <StageSlot slotRef={(el) => { slotRefs.current[4] = el; }}>
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/[0.12] p-4 sm:p-7 bg-[#10080D]/[0.94] bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_62%)] shadow-[0_24px_72px_rgba(0,0,0,0.82)]">
                  <div className="flex items-center justify-between pb-2.5 mb-3.5 sm:mb-5 border-b border-white/[0.08]">
                    <span className="text-[11px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide">
                      Estimate your monthly missed-call recovery
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/45 whitespace-nowrap">Slide to match your clinic</span>
                  </div>

                  <div className="grid md:grid-cols-12 gap-4 sm:gap-6 items-center">
                    <div className="md:col-span-7 space-y-4 sm:space-y-5">
                      <div>
                        <div className="flex justify-between text-xs sm:text-sm font-medium text-white mb-2">
                          <span>Phone inquiries you get per week</span>
                          <span className="font-semibold text-[#EC89B5]">{weeklyCalls} calls/week</span>
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
                        <div className="flex justify-between text-xs sm:text-sm font-medium text-white mb-2">
                          <span>Average bill per customer visit</span>
                          <span className="font-semibold text-emerald-400">₹{averageTicket.toLocaleString("en-IN")}</span>
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

                      <div className="pt-2 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-xs text-white/65">
                        <span>Calls saved from ringing out: <strong className="text-white">{missedCallsMonthly}/mo</strong></span>
                        <span>New bookings won back: <strong className="text-emerald-400">{recoveredBookings}/mo</strong></span>
                      </div>
                    </div>

                    <div className="md:col-span-5 p-4 sm:p-6 rounded-2xl border border-[#E65C8E]/25 text-center bg-gradient-to-br from-[#210D1B] via-[#130810] to-[#0A0508] shadow-lg">
                      <span className="text-[10.5px] sm:text-xs font-medium text-white/60 block mb-1.5">
                        Extra revenue recovered every month
                      </span>
                      <div
                        className="text-2xl sm:text-4xl font-bold text-emerald-400 tracking-tight mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        +₹{recoveredRevenueMonthly.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[11px] sm:text-xs text-white/55 block leading-snug">
                        From callers who previously hung up during busy hours & nights
                      </span>
                    </div>
                  </div>
                </TiltCard>
            </StageSlot>

            {/* === STAGE 06: SAFE & SIMPLE SETUP (ZERO TECH HASSLE) === */}
            <StageSlot slotRef={(el) => { slotRefs.current[5] = el; }}>
                <TiltCard className="rounded-2xl sm:rounded-3xl border border-white/[0.12] p-3.5 sm:p-7 bg-[#10080D]/[0.94] bg-[radial-gradient(ellipse_at_top,rgba(251,113,133,0.08),transparent_62%)] shadow-[0_24px_72px_rgba(0,0,0,0.82)]">
                  <div className="flex items-center justify-between pb-2 sm:pb-3.5 mb-0.5 sm:mb-1 border-b border-white/[0.08]">
                    <span className="text-[11px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide">
                      Safe, reliable & works with what you already use
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/[0.12] text-emerald-300 text-[10px] sm:text-[11px] font-medium whitespace-nowrap">
                      Zero IT setup
                    </span>
                  </div>

                  <div className="divide-y divide-white/[0.07] sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8">
                    {GOVERNANCE_PILLARS.map((p, idx) => {
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.title}
                          className={`py-2.5 sm:py-4 flex items-start gap-3 ${
                            idx < 2 ? "sm:border-b sm:border-white/[0.07]" : ""
                          }`}
                        >
                          <div
                            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: `${p.color}1C`, color: p.color }}
                          >
                            <Icon size={14} className="sm:w-4 sm:h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <h4 className="text-[12px] sm:text-[15px] font-semibold text-white leading-tight sm:leading-snug">{p.title}</h4>
                            </div>
                            <p className="text-[10.5px] sm:text-[12.5px] text-white/65 leading-[1.3] sm:leading-relaxed mb-1">
                              {p.desc}
                            </p>
                            <span className="text-[10px] sm:text-[11px] text-emerald-400 font-medium">
                              ✓ {p.telemetry}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TiltCard>
            </StageSlot>

          </div>
        </div>

        {/* Stage Controller (Minimalist Numbers-Only Floating Capsule) */}
        <div className="max-w-xl mx-auto w-full pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-3 flex items-center justify-center shrink-0 relative z-30">
          <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#0D050C]/95 border border-white/15 sm:shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(230,92,142,0.25)] sm:backdrop-blur-2xl">
            {STAGE_METADATA.map((meta, idx) => {
              const isActive = idx === stageIndex;
              return (
                <button
                  key={meta.num}
                  onClick={() => changeStage(idx)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
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
                  {meta.num}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
