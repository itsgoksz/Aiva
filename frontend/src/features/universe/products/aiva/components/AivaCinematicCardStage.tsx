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

import { memo, useState, useEffect, useRef, useMemo } from "react";
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
    description: "6 PM & weekend callers hang up in 8s and dial elsewhere.",
    solution: "Picks up 20+ callers at once — zero busy tone.",
  },
  {
    icon: Clock,
    category: "After Closing Hours",
    stat: "₹1.2L+/mo lost",
    title: "Night & Sunday callers find locked doors",
    description: "Working clients call between 9–11 PM when desk is closed.",
    solution: "Books night & Sunday slots 24×7 + sends map pin.",
  },
  {
    icon: Users,
    category: "Walk-In Interruptions",
    stat: "2+ hrs/day spent",
    title: "Front desk keeps pausing for repeat calls",
    description: "Walk-in guests wait while staff repeat fees & timings.",
    solution: "Handles routine calls so staff focus on walk-ins.",
  },
  {
    icon: MessageSquareOff,
    category: "Repeat Visitors",
    stat: "Missed loyalty",
    title: "Regular clients treated like first-timers",
    description: "Regulars repeat their details & doctor on every call.",
    solution: "Greets by name & remembers preferred specialist.",
  }
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Answers on the first ring",
    metric: "No wait",
    icon: PhoneCall,
    color: "#E65C8E",
    desc: "Greets callers in warm Indian English or Hindi with zero hold music.",
  },
  {
    step: "02",
    title: "Checks your real diary",
    metric: "No clashes",
    icon: CalendarCheck,
    color: "#A66B8E",
    desc: "Checks live slots on Google Calendar or Practo with prep buffers.",
  },
  {
    step: "03",
    title: "Sends WhatsApp slip & pin",
    metric: "On the call",
    icon: MessageSquare,
    color: "#34D399",
    desc: "Texts slot time, doctor or stylist name, map pin, and optional UPI link.",
  },
  {
    step: "04",
    title: "Saves regular client notes",
    metric: "Auto-updated",
    icon: Database,
    color: "#EC89B5",
    desc: "Notes preferred specialist, past visits, and summary for your desk.",
  }
];

const GOVERNANCE_PILLARS = [
  {
    title: "Keep your same phone number",
    desc: "No new SIM or hardware needed. Forward calls when busy, after hours, or 24×7.",
    telemetry: "Ready in 10 minutes",
    icon: ShieldCheck,
    color: "#34D399"
  },
  {
    title: "Syncs with Practo & Google Calendar",
    desc: "Never double-books staff. Walk-ins added by your front desk sync instantly.",
    telemetry: "Zero double-bookings",
    icon: Calendar,
    color: "#E65C8E"
  },
  {
    title: "Official WhatsApp & UPI alerts",
    desc: "Sends verified WhatsApp slips with Google Maps pin, prep tips, and UPI link.",
    telemetry: "Verified WhatsApp",
    icon: FileCheck2,
    color: "#A66B8E"
  },
  {
    title: "Only approved info — 100% private",
    desc: "Shares only approved prices & timings; special queries transfer to staff.",
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
  {
    num: "01",
    short: "FLOW",
    eyebrow: "01 · How Aiva Works",
    titleLead: "From Ringing Phone",
    titleAccent: "to Confirmed Visit",
  },
  {
    num: "02",
    short: "GAPS",
    eyebrow: "02 · Missed Revenue",
    titleLead: "Every Missed Call",
    titleAccent: "Costs You a Customer",
  },
  {
    num: "03",
    short: "COMPARE",
    eyebrow: "03 · Why Teams Switch",
    titleLead: "Built for Modern",
    titleAccent: "Indian Businesses",
  },
  {
    num: "04",
    short: "DESK",
    eyebrow: "04 · Live Workspace",
    titleLead: "Your Front Desk,",
    titleAccent: "Calm & Organised",
  },
  {
    num: "05",
    short: "VALUE",
    eyebrow: "05 · Earnings Estimator",
    titleLead: "See What Unanswered",
    titleAccent: "Calls Cost Monthly",
  },
  {
    num: "06",
    short: "TRUST",
    eyebrow: "06 · Zero-Effort Setup",
    titleLead: "Live on Your Number",
    titleAccent: "in 10 Minutes",
  },
];

interface StageSlotProps {
  slotRef: (el: HTMLDivElement | null) => void;
  defaultActive?: boolean;
  children: React.ReactNode;
}

/** Pre-mounted GPU-composited card layer scrubbed directly via DOM styles */
function StageSlot({ slotRef, defaultActive = false, defaultWarm = false, children }: StageSlotProps & { defaultWarm?: boolean }) {
  return (
    <div
      ref={slotRef}
      className="col-start-1 row-start-1 w-full max-w-[980px] mx-auto relative"
      style={{
        contain: "layout style",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: defaultActive || defaultWarm ? "transform, opacity" : "auto",
        opacity: defaultActive ? 1 : 0,
        transform: defaultActive ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
        pointerEvents: defaultActive ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

/** Isolated WebGL theater wrapper so deferring mount or toggling visibility never re-renders the 6 HTML cards */
const IsolatedSolarTheater = memo(function IsolatedSolarTheater({
  containerRef,
  solarLayerRef,
  floatStageRef,
  stableSolarHeight,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  solarLayerRef: React.RefObject<HTMLDivElement | null>;
  floatStageRef: React.MutableRefObject<number>;
  stableSolarHeight: number;
}) {
  const [isSolarMounted, setIsSolarMounted] = useState(false);
  const [isSolarActive, setIsSolarActive] = useState(false);

  // Mount WebGL during browser idle time after Hero paints cleanly (never mid-first-scroll)
  useEffect(() => {
    let cancelled = false;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const mount = () => {
      if (!cancelled) setIsSolarMounted(true);
    };
    if (typeof w.requestIdleCallback === "function") {
      const idleId = w.requestIdleCallback(mount, { timeout: 1200 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(idleId);
      };
    }
    const timer = setTimeout(mount, 800);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Wake WebGL loop cleanly ahead of reveal without triggering React re-renders during scroll reveal
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSolarMounted(true);
        setIsSolarActive(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );

    activeObserver.observe(el);
    return () => activeObserver.disconnect();
  }, [containerRef]);

  return (
    <div
      ref={solarLayerRef}
      className="fixed top-0 left-0 w-full pointer-events-none z-0 will-change-[opacity]"
      style={{
        opacity: 0,
        height: `${stableSolarHeight}px`,
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {isSolarMounted && (
        <AivaSolarSystemBackground
          stageIndex={0}
          floatStageRef={floatStageRef}
          active={isSolarActive}
          className="w-full h-full"
        />
      )}
    </div>
  );
});

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
      className={`relative sm:transition-transform sm:duration-200 sm:ease-out ${className}`}
      style={style}
    >
      {children}
      <div
        ref={glareRef}
        className="hidden sm:block pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-300 opacity-0"
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
  // Quintic smootherstep (C2 continuous) removes abrupt acceleration at start/end of fades & flights
  return c * c * c * (c * (c * 6 - 15) + 10);
}

function mapProgressToStage(latest: number, isMobile: boolean) {
  const bounds = isMobile ? MOBILE_BOUNDS : DESKTOP_BOUNDS;
  const clamped = Math.max(0, Math.min(0.999999, latest));
  const lastIdx = bounds.length - 1;
  for (let i = 0; i < bounds.length; i++) {
    const { start, end } = bounds[i];
    if (clamped >= start && (clamped < end || i === lastIdx)) {
      const frac = Math.max(0, Math.min(1, (clamped - start) / (end - start)));

      // Symmetric orbital timeline: slightly wider 0.16 card fade ramp keeps open/close silky on iOS
      const flightInEnd = i === 0 ? 0 : i === lastIdx ? 0.28 : 0.24;
      const bloomEnd = i === 0 ? 0 : i === lastIdx ? 0.50 : 0.40;
      const dissolveStart = i === lastIdx ? 1 : i === 0 ? 0.48 : 0.60;
      const flightOutStart = i === lastIdx ? 1 : i === 0 ? 0.68 : 0.76;

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

const WIDGET_SHELL_CLASS =
  "rounded-[22px] sm:rounded-[28px] border border-white/[0.11] p-3.5 sm:p-6 bg-[#0F070C] sm:bg-[#10080D]/[0.96] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_48px_rgba(0,0,0,0.72)]";

const SUB_WIDGET_CLASS =
  "rounded-2xl bg-white/[0.035] border border-white/[0.07] p-3 sm:p-4";

const Stage04DeskContent = memo(function Stage04DeskContent() {
  const [dashTab, setDashTab] = useState<"calls" | "schedule" | "crm">("calls");

  return (
    <TiltCard className={`${WIDGET_SHELL_CLASS} sm:bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.06),transparent_60%)]`}>
      {/* Top 4 KPI Bento Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 mb-2.5 sm:mb-4">
        <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.035] border border-white/[0.07]">
          <span className="text-[10px] sm:text-[11px] font-medium text-white/55 block mb-0.5 sm:mb-1">Calls Answered</span>
          <span className="text-lg sm:text-2xl font-bold text-white tabular-nums leading-none block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>48</span>
          <span className="text-[9.5px] sm:text-[11px] text-emerald-400 font-medium block mt-1">0 missed today</span>
        </div>
        <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.035] border border-white/[0.07]">
          <span className="text-[10px] sm:text-[11px] font-medium text-white/55 block mb-0.5 sm:mb-1">Bookings Value</span>
          <span className="text-lg sm:text-2xl font-bold text-emerald-400 tabular-nums leading-none block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>₹1,84,200</span>
          <span className="text-[9.5px] sm:text-[11px] text-white/55 block mt-1">18 visits confirmed</span>
        </div>
        <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.035] border border-white/[0.07]">
          <span className="text-[10px] sm:text-[11px] font-medium text-white/55 block mb-0.5 sm:mb-1">Staff Time Saved</span>
          <span className="text-lg sm:text-2xl font-bold text-white tabular-nums leading-none block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>36.5 hrs</span>
          <span className="text-[9.5px] sm:text-[11px] text-white/55 block mt-1">This week alone</span>
        </div>
        <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.035] border border-white/[0.07]">
          <span className="text-[10px] sm:text-[11px] font-medium text-white/55 block mb-0.5 sm:mb-1">Caller Rating</span>
          <span className="text-lg sm:text-2xl font-bold text-[#EC89B5] tabular-nums leading-none block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>4.98 / 5</span>
          <span className="text-[9.5px] sm:text-[11px] text-[#ECA9B7]/90 block mt-1">Warm & helpful</span>
        </div>
      </div>

      {/* Modern Segmented Tab Bar */}
      <div className="flex items-center justify-between gap-2 pb-2 sm:pb-3 mb-2 sm:mb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[12px] sm:text-sm font-semibold text-white truncate">Activity</span>
          <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/[0.12] border border-emerald-500/20 text-emerald-300 font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1 bg-white/[0.04] border border-white/[0.07] p-0.5 sm:p-1 rounded-full shrink-0">
          <button
            onClick={() => setDashTab("calls")}
            className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-medium cursor-pointer transition-colors ${dashTab === "calls" ? "bg-[#E65C8E] text-white shadow-sm" : "text-white/60 hover:text-white"}`}
          >
            Calls
          </button>
          <button
            onClick={() => setDashTab("schedule")}
            className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-medium cursor-pointer transition-colors ${dashTab === "schedule" ? "bg-[#E65C8E] text-white shadow-sm" : "text-white/60 hover:text-white"}`}
          >
            Diary
          </button>
          <button
            onClick={() => setDashTab("crm")}
            className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-medium cursor-pointer transition-colors ${dashTab === "crm" ? "bg-[#E65C8E] text-white shadow-sm" : "text-white/60 hover:text-white"}`}
          >
            Regulars
          </button>
        </div>
      </div>

      {/* Feed Widget Cards */}
      <div className="space-y-2 sm:space-y-2.5 text-xs">
        {dashTab === "calls" && (
          <>
            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E65C8E]/20 text-[#EC89B5] text-[9.5px] sm:text-[10px] font-bold flex items-center justify-center shrink-0">AD</span>
                  <span className="font-semibold text-white text-[12px] sm:text-sm">Ananya Deshmukh</span>
                  <span className="hidden sm:inline text-white/45 text-[11px]">+91 98450 23489</span>
                </div>
                <p className="text-white/70 text-[10.5px] sm:text-xs mt-1 leading-snug">
                  HydraFacial with Dr. Kavya · Sat 3:00 PM · WhatsApp map pin sent
                </p>
              </div>
              <div className="text-right shrink-0 ml-1">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/[0.14] border border-emerald-500/20 text-emerald-300 text-[10px] sm:text-[11px] font-semibold block tabular-nums">
                  ₹2,800
                </span>
                <span className="text-[9.5px] text-white/45 block mt-0.5">1m 18s</span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-[9.5px] sm:text-[10px] font-bold flex items-center justify-center shrink-0">KN</span>
                  <span className="font-semibold text-white text-[12px] sm:text-sm">Karthik Nair</span>
                  <span className="hidden sm:inline text-white/45 text-[11px]">+91 99001 89012</span>
                </div>
                <p className="text-white/70 text-[10.5px] sm:text-xs mt-1 leading-snug">
                  Dental scaling Thu 5:30 PM with Dr. Varun · 6-month regular checkup
                </p>
              </div>
              <div className="text-right shrink-0 ml-1">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/[0.14] border border-emerald-500/20 text-emerald-300 text-[10px] sm:text-[11px] font-semibold block tabular-nums">
                  ₹1,500
                </span>
                <span className="text-[9.5px] text-white/45 block mt-0.5">48s</span>
              </div>
            </div>
          </>
        )}

        {dashTab === "schedule" && (
          <>
            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] sm:text-[11px] px-2 py-0.5 rounded-lg bg-[#E65C8E]/20 text-[#ECA9B7] font-semibold tabular-nums shrink-0">3:00 PM</span>
                  <span className="font-semibold text-white text-[12px] sm:text-sm truncate">Ananya Deshmukh · Skin Consult</span>
                </div>
                <p className="text-white/70 text-[10.5px] sm:text-xs mt-1 leading-snug">
                  Dr. Kavya · 15-min buffer reserved · WhatsApp reminder delivered
                </p>
              </div>
              <span className="px-2 py-0.5 sm:py-1 rounded-full bg-emerald-500/[0.14] border border-emerald-500/20 text-emerald-300 text-[10px] sm:text-[11px] font-semibold shrink-0">
                Confirmed
              </span>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] sm:text-[11px] px-2 py-0.5 rounded-lg bg-[#E65C8E]/20 text-[#ECA9B7] font-semibold tabular-nums shrink-0">5:30 PM</span>
                  <span className="font-semibold text-white text-[12px] sm:text-sm truncate">Karthik Nair · Dental Scaling</span>
                </div>
                <p className="text-white/70 text-[10.5px] sm:text-xs mt-1 leading-snug">
                  Dr. Varun · Synced with Google Calendar & Practo
                </p>
              </div>
              <span className="px-2 py-0.5 sm:py-1 rounded-full bg-emerald-500/[0.14] border border-emerald-500/20 text-emerald-300 text-[10px] sm:text-[11px] font-semibold shrink-0">
                Confirmed
              </span>
            </div>
          </>
        )}

        {dashTab === "crm" && (
          <>
            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-[12px] sm:text-sm">Ananya Deshmukh</span>
                  <span className="text-[9.5px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#E65C8E]/15 border border-[#E65C8E]/25 text-[#EC89B5] font-medium">4th Visit</span>
                </div>
                <p className="text-white/70 text-[10.5px] sm:text-xs mt-1 leading-snug">
                  Prefers Sat afternoons with Dr. Kavya · Sensitive skin routine
                </p>
              </div>
              <span className="text-[10.5px] sm:text-[11px] text-white/60 px-2 py-0.5 rounded-full bg-white/[0.04] shrink-0">Indiranagar</span>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-[12px] sm:text-sm">Karthik Nair</span>
                  <span className="text-[9.5px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#E65C8E]/15 border border-[#E65C8E]/25 text-[#EC89B5] font-medium">Regular</span>
                </div>
                <p className="text-white/70 text-[10.5px] sm:text-xs mt-1 leading-snug">
                  Every 6 months · Prefers after 5:00 PM · Pays via UPI at desk
                </p>
              </div>
              <span className="text-[10.5px] sm:text-[11px] text-white/60 px-2 py-0.5 rounded-full bg-white/[0.04] shrink-0">Koramangala</span>
            </div>
          </>
        )}
      </div>
    </TiltCard>
  );
});

const Stage05EstimatorContent = memo(function Stage05EstimatorContent() {
  const [weeklyCalls, setWeeklyCalls] = useState(120);
  const [averageTicket, setAverageTicket] = useState(1800);

  const monthlyCalls = weeklyCalls * 4.3;
  const missedCallsMonthly = Math.round(monthlyCalls * 0.32);
  const recoveredBookings = Math.round(missedCallsMonthly * 0.65);
  const recoveredRevenueMonthly = Math.round(recoveredBookings * averageTicket);

  return (
    <TiltCard className={`${WIDGET_SHELL_CLASS} sm:bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_60%)]`}>
      <div className="flex items-center justify-between pb-3 mb-3.5 sm:mb-5 border-b border-white/[0.08]">
        <span className="text-[11.5px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide">
          Monthly missed-call recovery calculator
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[10.5px] sm:text-xs text-white/70 whitespace-nowrap">
          Slide to match your desk
        </span>
      </div>

      <div className="grid md:grid-cols-12 gap-3.5 sm:gap-5 items-stretch">
        <div className="md:col-span-7 flex flex-col justify-between gap-3">
          <div className={SUB_WIDGET_CLASS}>
            <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-white mb-2.5">
              <span>Phone inquiries per week</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E65C8E]/15 text-[#EC89B5] font-semibold tabular-nums">
                {weeklyCalls} calls/wk
              </span>
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

          <div className={SUB_WIDGET_CLASS}>
            <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-white mb-2.5">
              <span>Average bill per customer visit</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold tabular-nums">
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
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400 touch-pan-x"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
              <span className="text-[10.5px] text-white/55 block">Calls saved / mo</span>
              <strong className="text-sm sm:text-base font-bold text-white tabular-nums">{missedCallsMonthly} calls</strong>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
              <span className="text-[10.5px] text-white/55 block">New bookings won</span>
              <strong className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">{recoveredBookings} visits/mo</strong>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 p-4 sm:p-6 rounded-2xl border border-[#E65C8E]/30 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#230E1C] via-[#140811] to-[#0B0509]">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-[10.5px] sm:text-xs font-medium text-emerald-300 mb-2">
            Recovered every month
          </span>
          <div
            className="text-3xl sm:text-4xl font-bold text-emerald-400 tracking-tight tabular-nums mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            +₹{recoveredRevenueMonthly.toLocaleString("en-IN")}
          </div>
          <span className="text-[11.5px] sm:text-xs text-white/65 leading-relaxed max-w-[26ch]">
            Revenue saved from callers who used to hang up during peak hours & nights
          </span>
        </div>
      </div>
    </TiltCard>
  );
});

const StageCardsGrid = memo(function StageCardsGrid({
  slotRefSetters,
}: {
  slotRefSetters: ((el: HTMLDivElement | null) => void)[];
}) {
  return (
    <div className="w-full relative z-10 grid items-center">
      {/* === STAGE 01: HOW EVERY BOOKING HAPPENS === */}
      <StageSlot slotRef={slotRefSetters[0]} defaultActive>
        <TiltCard className={`${WIDGET_SHELL_CLASS} sm:bg-[radial-gradient(ellipse_at_top,rgba(230,92,142,0.07),transparent_60%)]`}>
          {/* Widget Header */}
          <div className="flex items-center justify-between gap-2 pb-2 sm:pb-3.5 mb-2 sm:mb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E65C8E] shrink-0" />
              <span className="text-[11px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide truncate">
                How a phone inquiry turns into a visit
              </span>
            </div>
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/80 text-[9.5px] sm:text-[11px] font-medium whitespace-nowrap shrink-0">
              Under 30 seconds
            </span>
          </div>

          {/* 4 Tactile Bento Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5">
            {WORKFLOW_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="rounded-xl sm:rounded-2xl bg-white/[0.035] border border-white/[0.07] p-2.5 sm:p-4 flex items-start justify-between gap-2"
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                    <div
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${s.color}20`, color: s.color }}
                    >
                      <Icon size={14} className="sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase" style={{ color: s.color }}>
                          {s.step}
                        </span>
                        <h4 className="text-[12.5px] sm:text-[15px] font-semibold text-white leading-tight">
                          {s.title}
                        </h4>
                      </div>
                      <p className="text-[10.5px] sm:text-[12.5px] text-white/70 leading-[1.3] sm:leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/[0.12] border border-emerald-500/20 text-emerald-300 text-[9px] sm:text-[10.5px] font-medium whitespace-nowrap shrink-0">
                    {s.metric}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Split Summary Widget */}
          <div className="mt-2 sm:mt-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E65C8E]/[0.1] via-white/[0.03] to-emerald-500/[0.06] border border-white/[0.08] p-2.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <div className="min-w-0">
              <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-wider text-[#EC89B5] mb-0.5">
                Built for Indian reception desks
              </span>
              <p className="text-[11.5px] sm:text-[14.5px] font-medium text-white leading-snug">
                Your team serves guests in person — Aiva answers every ring.
              </p>
            </div>

            <div className="w-full sm:w-auto grid grid-cols-3 divide-x divide-white/[0.1] shrink-0 bg-black/30 rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-1 border border-white/[0.06]">
              <div className="px-2 sm:px-4 text-center">
                <span className="text-[13px] sm:text-lg font-bold text-white tabular-nums block leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0</span>
                <span className="text-[9px] sm:text-[10.5px] text-white/55 block">Missed Calls</span>
              </div>
              <div className="px-2 sm:px-4 text-center">
                <span className="text-[13px] sm:text-lg font-bold text-emerald-400 tabular-nums block leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>24×7</span>
                <span className="text-[9px] sm:text-[10.5px] text-white/55 block">Always Open</span>
              </div>
              <div className="px-2 sm:px-4 text-center">
                <span className="text-[13px] sm:text-lg font-bold text-[#EC89B5] tabular-nums block leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>95%</span>
                <span className="text-[9px] sm:text-[10.5px] text-white/55 block">Show-Up Rate</span>
              </div>
            </div>
          </div>
        </TiltCard>
      </StageSlot>

      {/* === STAGE 02: EVERYDAY REVENUE LEAKS (DIAGNOSTIC BENTO WIDGETS) === */}
      <StageSlot slotRef={slotRefSetters[1]} defaultWarm>
        <TiltCard className={`${WIDGET_SHELL_CLASS} !p-3 sm:!p-6 sm:bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.06),transparent_60%)]`}>
          <div className="flex items-center justify-between gap-2 pb-1.5 sm:pb-3.5 mb-2 sm:mb-4 border-b border-white/[0.08]">
            <span className="text-[11px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide">
              Where clinics & studios lose walk-ins
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/[0.12] border border-emerald-500/20 text-emerald-300 text-[9.5px] sm:text-[11px] font-medium whitespace-nowrap shrink-0">
              Every call answered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3.5">
            {PROBLEMS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-xl sm:rounded-2xl bg-white/[0.035] border border-white/[0.07] p-2 sm:p-4 flex flex-col justify-between gap-1.5 sm:gap-2"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
                      <span className="flex items-center gap-1.5 text-[9.5px] sm:text-[11px] text-[#EC89B5] font-medium whitespace-nowrap">
                        <Icon size={11} className="sm:w-3 sm:h-3" />
                        {p.category}
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-rose-500/[0.14] border border-rose-500/20 text-[9px] sm:text-[10.5px] text-rose-200 font-semibold whitespace-nowrap shrink-0">
                        {p.stat}
                      </span>
                    </div>

                    <h4 className="text-[11.5px] sm:text-[15px] font-semibold text-white leading-tight mb-0.5 sm:mb-1">
                      {p.title}
                    </h4>
                    <p className="text-[10px] sm:text-[12.5px] text-white/65 leading-[1.25] sm:leading-[1.35]">
                      {p.description}
                    </p>
                  </div>

                  <div className="rounded-lg sm:rounded-xl bg-emerald-500/[0.08] border border-emerald-500/[0.16] px-2 sm:px-2.5 py-1 sm:py-1.5 text-[9.5px] sm:text-[12px] text-emerald-200 font-medium leading-[1.22] sm:leading-snug">
                    <span className="text-emerald-400 font-bold mr-1">✓</span>
                    {p.solution}
                  </div>
                </div>
              );
            })}
          </div>
        </TiltCard>
      </StageSlot>

      {/* === STAGE 03: MODERN COMPARISON WIDGETS === */}
      <StageSlot slotRef={slotRefSetters[2]}>
        <TiltCard className={`${WIDGET_SHELL_CLASS} sm:bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.07),transparent_60%)]`}>
          <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3.5 mb-3 sm:mb-4 border-b border-white/[0.08]">
            <span className="text-[11.5px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide">
              Side-by-side daily comparison
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[10px] sm:text-xs text-white/70 whitespace-nowrap">
              100+ Indian clinics & studios
            </span>
          </div>

          {/* Mobile View: Crisp Stacked Comparison Widgets */}
          <div className="sm:hidden space-y-2">
            {[
              { cap: "Working Hours", old: "10 AM – 8 PM, off Sundays", aiva: "✓ Open 24×7, all 365 days" },
              { cap: "Peak Hour Rush", old: "1 caller at a time, rest wait", aiva: "✓ Handles 20+ callers at once" },
              { cap: "Bookings & Map Pin", old: "Manual diary & slow callbacks", aiva: "✓ Books live + WhatsApp slip" },
              { cap: "Caller Warmth", old: "Varies by staff shift", aiva: "✓ Warm English & Hindi voice" },
              { cap: "Monthly Expense", old: "₹30k–₹50k/mo per person", aiva: "✓ Predictable flat monthly plan" },
            ].map((row) => (
              <div key={row.cap} className="rounded-xl bg-white/[0.035] border border-white/[0.07] p-2.5">
                <div className="text-[12px] font-semibold text-white mb-1.5">{row.cap}</div>
                <div className="grid grid-cols-2 gap-2 text-[10.5px] leading-snug">
                  <div className="px-2 py-1.5 rounded-lg bg-white/[0.03] text-white/55">
                    {row.old}
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-emerald-500/[0.12] border border-emerald-500/20 text-emerald-300 font-medium">
                    {row.aiva}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Elevated 4-Column Comparison Matrix */}
          <div className="hidden sm:block">
            <table className="w-full text-left text-xs sm:text-sm border-separate border-spacing-0">
              <thead>
                <tr className="text-white/55 text-[11px] font-medium">
                  <th className="pb-3 font-medium border-b border-white/[0.08]">What Matters Daily</th>
                  <th className="pb-3 font-medium border-b border-white/[0.08]">Receptionist Alone</th>
                  <th className="pb-3 font-medium border-b border-white/[0.08]">Outsourced Call Centre</th>
                  <th className="py-2.5 px-4 font-semibold text-[#ECA9B7] bg-[#E65C8E]/[0.1] border-t border-x border-[#E65C8E]/25 rounded-t-2xl">With Aiva</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3.5 font-semibold text-white border-b border-white/[0.06]">Working Hours</td>
                  <td className="py-3.5 text-white/60 border-b border-white/[0.06]">10 AM – 8 PM, off Sundays</td>
                  <td className="py-3.5 text-white/60 border-b border-white/[0.06]">Extra shift charges</td>
                  <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-[#E65C8E]/[0.07] border-b border-x border-[#E65C8E]/20">✓ Open 24×7, Sundays & holidays</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-semibold text-white border-b border-white/[0.06]">Peak Hour Rush</td>
                  <td className="py-3.5 text-white/60 border-b border-white/[0.06]">1 caller at a time, rest wait</td>
                  <td className="py-3.5 text-white/60 border-b border-white/[0.06]">Hold queues & transfers</td>
                  <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-[#E65C8E]/[0.07] border-b border-x border-[#E65C8E]/20">✓ Handles 20+ callers at once</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-semibold text-white border-b border-white/[0.06]">Booking & WhatsApp</td>
                  <td className="py-3.5 text-white/60 border-b border-white/[0.06]">Paper diary & missed callbacks</td>
                  <td className="py-3.5 text-white/60 border-b border-white/[0.06]">Takes notes, no direct booking</td>
                  <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-[#E65C8E]/[0.07] border-b border-x border-[#E65C8E]/20">✓ Books live + sends map & UPI slip</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-semibold text-white border-b border-white/[0.06]">Voice & Languages</td>
                  <td className="py-3.5 text-white/60 border-b border-white/[0.06]">Varies by shift</td>
                  <td className="py-3.5 text-white/60 border-b border-white/[0.06]">Robotic, scripted replies</td>
                  <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-[#E65C8E]/[0.07] border-b border-x border-[#E65C8E]/20">✓ Warm Indian English & Hindi</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-semibold text-white">Monthly Cost</td>
                  <td className="py-3.5 text-white/60">₹30,000 – ₹50,000/mo</td>
                  <td className="py-3.5 text-white/60">Setup fee + per-minute bills</td>
                  <td className="py-3.5 px-4 text-emerald-300 font-semibold bg-[#E65C8E]/[0.07] border-b border-x border-[#E65C8E]/25 rounded-b-2xl">✓ Simple flat monthly plan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TiltCard>
      </StageSlot>

      {/* === STAGE 04: OWNER'S DAILY VIEW (INTERACTIVE TABS) === */}
      <StageSlot slotRef={slotRefSetters[3]}>
        <Stage04DeskContent />
      </StageSlot>

      {/* === STAGE 05: MONTHLY EARNINGS ESTIMATOR === */}
      <StageSlot slotRef={slotRefSetters[4]}>
        <Stage05EstimatorContent />
      </StageSlot>

      {/* === STAGE 06: SAFE & SIMPLE SETUP (TRUST BENTO WIDGETS) === */}
      <StageSlot slotRef={slotRefSetters[5]}>
        <TiltCard className={`${WIDGET_SHELL_CLASS} sm:bg-[radial-gradient(ellipse_at_top,rgba(251,113,133,0.07),transparent_60%)]`}>
          <div className="flex items-center justify-between pb-2 sm:pb-3.5 mb-2 sm:mb-4 border-b border-white/[0.08]">
            <span className="text-[11px] sm:text-xs font-medium text-[#ECA9B7] tracking-wide">
              Safe, reliable & works with what you use
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/[0.12] border border-emerald-500/20 text-emerald-300 text-[9.5px] sm:text-[11px] font-medium whitespace-nowrap">
              Zero IT setup
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5">
            {GOVERNANCE_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-xl sm:rounded-2xl bg-white/[0.035] border border-white/[0.07] p-2.5 sm:p-4 flex items-start gap-2.5 sm:gap-3"
                >
                  <div
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${p.color}20`, color: p.color }}
                  >
                    <Icon size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-0.5 sm:mb-1">
                      <h4 className="text-[12.5px] sm:text-[15px] font-semibold text-white leading-tight sm:leading-snug">{p.title}</h4>
                    </div>
                    <p className="text-[10.5px] sm:text-[12.5px] text-white/70 leading-[1.3] sm:leading-relaxed mb-1.5 sm:mb-2">
                      {p.desc}
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/[0.12] border border-emerald-500/20 text-[9.5px] sm:text-[11px] text-emerald-300 font-medium">
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
  );
});

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
  const slotRefSetters = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => (el: HTMLDivElement | null) => {
        slotRefs.current[i] = el;
      }),
    []
  );

  // Active Stage Index (0 to 5) + Continuous Float Index for Planet Flight
  const [stageIndex, setStageIndex] = useState(0);
  const floatStageRef = useRef<number>(0);
  const prevStageRef = useRef(0);
  const pillScrollRafRef = useRef<number | null>(null);
  const suppressAssistRef = useRef<boolean>(false);
  const suppressAssistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleAssistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchingRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number | null>(null);
  const latestProgressRef = useRef<number>(0);
  const cachedScrollableRef = useRef<number>(4000);
  const flushRef = useRef<(() => void) | null>(null);

  // Desktop matches exact innerHeight (no 1080px screen-height overscan); mobile locks screen height to ignore Safari toolbar resize
  const [stableSolarHeight, setStableSolarHeight] = useState<number>(() => {
    if (typeof window === "undefined") return 900;
    if (window.innerWidth >= 768) return window.innerHeight;
    const screenH = window.screen?.height || window.innerHeight;
    return Math.max(window.innerHeight, screenH) + 80;
  });
  const lastSolarWidthRef = useRef<number>(
    typeof window !== "undefined" ? window.innerWidth : 1000
  );

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w >= 768) {
        setStableSolarHeight(window.innerHeight);
        lastSolarWidthRef.current = w;
        return;
      }
      if (Math.abs(w - lastSolarWidthRef.current) < 40) return;
      lastSolarWidthRef.current = w;
      const screenH = window.screen?.height || window.innerHeight;
      setStableSolarHeight(Math.max(window.innerHeight, screenH) + 80);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getStageTargetY = (targetStageIdx: number) => {
    const el = containerRef.current;
    if (!el) return window.scrollY;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const bounds = isMobile ? MOBILE_BOUNDS : DESKTOP_BOUNDS;
    const clamped = Math.max(0, Math.min(bounds.length - 1, targetStageIdx));
    const seg = bounds[clamped];
    const rect = el.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    // Land squarely inside the fully open card plateau (cardVisibility === 1.0)
    const targetFrac = clamped === 0 ? 0.16 : clamped === bounds.length - 1 ? 0.72 : 0.50;
    const targetProgress = seg.start + (seg.end - seg.start) * targetFrac;
    return containerTop + cachedScrollableRef.current * targetProgress;
  };

  const glideScrollTo = (getTargetY: () => number, durationMs: number) => {
    if (pillScrollRafRef.current !== null) {
      cancelAnimationFrame(pillScrollRafRef.current);
      pillScrollRafRef.current = null;
    }
    const startY = window.scrollY;
    const initialTarget = getTargetY();
    if (Math.abs(initialTarget - startY) < 4) {
      window.scrollTo(0, initialTarget);
      flushRef.current?.();
      return;
    }
    suppressAssistRef.current = true;
    if (suppressAssistTimerRef.current) clearTimeout(suppressAssistTimerRef.current);
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const desiredY = getTargetY();
      window.scrollTo(0, startY + (desiredY - startY) * eased);
      if (t < 1) {
        pillScrollRafRef.current = requestAnimationFrame(step);
      } else {
        pillScrollRafRef.current = null;
        window.scrollTo(0, getTargetY());
        flushRef.current?.();
        suppressAssistTimerRef.current = setTimeout(() => {
          suppressAssistRef.current = false;
        }, 160);
      }
    };
    pillScrollRafRef.current = requestAnimationFrame(step);
  };

  const scheduleIdleAssist = (
    latestOverride?: number,
    mappedOverride?: { stageIndex: number; cardVisibility: number; floatStage: number }
  ) => {
    if (idleAssistTimerRef.current) clearTimeout(idleAssistTimerRef.current);
    if (isTouchingRef.current || suppressAssistRef.current || pillScrollRafRef.current !== null) {
      return;
    }
    const latest = latestOverride ?? latestProgressRef.current;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const mapped = mappedOverride ?? mapProgressToStage(latest, isMobile);

    // Activate only when a card is partially fading/appearing and scrolling settles completely
    if (
      mapped.cardVisibility > 0.02 &&
      mapped.cardVisibility < 0.94 &&
      latest > 0.01 &&
      latest < 0.99
    ) {
      const targetIdx = mapped.stageIndex;
      idleAssistTimerRef.current = setTimeout(() => {
        if (
          isTouchingRef.current ||
          suppressAssistRef.current ||
          pillScrollRafRef.current !== null ||
          !containerRef.current
        ) {
          return;
        }
        glideScrollTo(() => getStageTargetY(targetIdx), 460);
      }, 420);
    }
  };

  useEffect(() => {
    const cancelPillGlide = () => {
      if (pillScrollRafRef.current !== null) {
        cancelAnimationFrame(pillScrollRafRef.current);
        pillScrollRafRef.current = null;
      }
      if (suppressAssistTimerRef.current) clearTimeout(suppressAssistTimerRef.current);
      suppressAssistRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      isTouchingRef.current = true;
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
      if (idleAssistTimerRef.current) clearTimeout(idleAssistTimerRef.current);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || pillScrollRafRef.current === null) return;
      const curY = e.touches[0]?.clientY;
      if (curY !== undefined && Math.abs(curY - touchStartYRef.current) > 8) {
        // Cancel programmatic glide only on intentional drag, never on passive dot taps
        cancelPillGlide();
      }
    };

    const onTouchEnd = () => {
      isTouchingRef.current = false;
      touchStartYRef.current = null;
      scheduleIdleAssist();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("wheel", cancelPillGlide, { passive: true });
    return () => {
      cancelPillGlide();
      if (idleAssistTimerRef.current) clearTimeout(idleAssistTimerRef.current);
      if (suppressAssistTimerRef.current) clearTimeout(suppressAssistTimerRef.current);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("wheel", cancelPillGlide);
    };
  }, []);

  const lastScrubRef = useRef<{ idx: number; vis: number }>({ idx: -1, vis: -1 });
  const applyScrubStyles = (activeIdx: number, cardVisibility: number, isMobile: boolean) => {
    const quantizedVis = Math.round(cardVisibility * 1000);
    if (lastScrubRef.current.idx === activeIdx && lastScrubRef.current.vis === quantizedVis) {
      return;
    }
    lastScrubRef.current.idx = activeIdx;
    lastScrubRef.current.vis = quantizedVis;
    const slots = slotRefs.current;
    // Mobile animates pure translate3d + opacity (scale=1) so iOS WebKit never re-rasterizes Retina text on open/close
    const scaleStr = isMobile ? "" : ` scale(${(0.94 + 0.06 * cardVisibility).toFixed(4)})`;
    const hiddenTransform = isMobile
      ? "translate3d(0, 14px, 0)"
      : "translate3d(0, 10px, 0) scale(0.94)";
    const yOffset = (1 - cardVisibility) * (isMobile ? 14 : 10);
    for (let i = 0; i < 6; i++) {
      const slot = slots[i];
      if (!slot) continue;
      // Keep active slot AND adjacent neighbors GPU-promoted so iOS WebKit never reallocates textures on open/close
      const nextWillChange = Math.abs(i - activeIdx) <= 1 ? "transform, opacity" : "auto";
      if (slot.style.willChange !== nextWillChange) {
        slot.style.willChange = nextWillChange;
      }
      if (i === activeIdx && cardVisibility > 0.002) {
        slot.style.opacity = cardVisibility.toFixed(3);
        slot.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)${scaleStr}`;
        const nextPtr = cardVisibility > 0.05 ? "auto" : "none";
        if (slot.style.pointerEvents !== nextPtr) slot.style.pointerEvents = nextPtr;
      } else if (slot.style.opacity !== "0") {
        slot.style.opacity = "0";
        slot.style.transform = hiddenTransform;
        if (slot.style.pointerEvents !== "none") slot.style.pointerEvents = "none";
      }
    }
    if (headingRef.current) {
      headingRef.current.style.opacity = (0.45 + 0.55 * cardVisibility).toFixed(3);
    }
  };

  // Dot-indicator Navigation: responsive, exact-landing glide immune to Safari toolbar collapse
  const changeStage = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(5, newIndex));
    if (idleAssistTimerRef.current) clearTimeout(idleAssistTimerRef.current);
    if (!containerRef.current) return;

    const hops = Math.max(1, Math.abs(clamped - stageIndex));
    const durationMs = Math.min(920, Math.max(440, hops * 210));
    glideScrollTo(() => getStageTargetY(clamped), durationMs);
  };

  // Zero-delay Direct Scroll-Scrubbed Pipeline (updates in same vsync frame, immune to iOS toolbar resize)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    cachedScrollableRef.current = Math.max(1, el.offsetHeight - window.innerHeight);
    let cachedIsMobile = window.innerWidth < 768;
    let cachedVh = window.innerHeight || 800;
    let lastW = window.innerWidth;
    let lastMeasuredLatest = -1;
    let lastSolarOpacity = -1;

    const updateMetrics = () => {
      const w = window.innerWidth;
      const mobile = w < 768;
      // On mobile, ignore small height fluctuations caused by Safari toolbar collapse/expand
      if (!mobile || Math.abs(w - lastW) >= 40) {
        lastW = w;
        cachedIsMobile = mobile;
        cachedVh = window.innerHeight || 800;
        cachedScrollableRef.current = Math.max(1, el.offsetHeight - cachedVh);
      }
    };

    const ro = new ResizeObserver(updateMetrics);
    ro.observe(el);
    window.addEventListener("resize", updateMetrics, { passive: true });

    applyScrubStyles(0, 1, cachedIsMobile);

    const flush = () => {
      const rect = el.getBoundingClientRect();

      // Scrub 3D solar opacity directly with scroll once Hero nears top (~26% -> 2%, starting around Screenshot 1)
      const solarLayer = solarLayerRef.current;
      if (solarLayer) {
        const enterProg = smoothstep((cachedVh * 0.26 - rect.top) / (cachedVh * 0.24));
        const exitProg = smoothstep((rect.bottom - cachedVh * 0.22) / (cachedVh * 0.65));
        const solarOp = Math.min(enterProg, exitProg);
        const quantizedOp = Math.round(solarOp * 1000);
        if (quantizedOp !== lastSolarOpacity) {
          lastSolarOpacity = quantizedOp;
          solarLayer.style.opacity = solarOp.toFixed(3);
        }
      }

      const latest = Math.max(0, Math.min(1, -rect.top / cachedScrollableRef.current));
      if (latest === lastMeasuredLatest && latestProgressRef.current === latest) {
        return;
      }
      lastMeasuredLatest = latest;
      latestProgressRef.current = latest;
      const mapped = mapProgressToStage(latest, cachedIsMobile);

      floatStageRef.current = mapped.floatStage;
      applyScrubStyles(mapped.stageIndex, mapped.cardVisibility, cachedIsMobile);

      if (mapped.stageIndex !== prevStageRef.current) {
        prevStageRef.current = mapped.stageIndex;
        setStageIndex(mapped.stageIndex);
      }

      scheduleIdleAssist(latest, mapped);
    };

    flushRef.current = flush;
    // Sync once on mount in case browser restored a non-zero scroll offset
    flush();
    window.addEventListener("scroll", flush, { passive: true });

    return () => {
      flushRef.current = null;
      ro.disconnect();
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", flush);
    };
  }, []);

  const currentMeta = STAGE_METADATA[stageIndex];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[560vh] md:min-h-[580vh] bg-transparent"
    >
      {/* Fixed 3D Solar System Layer (isolated state avoids card re-renders on WebGL wake) */}
      <IsolatedSolarTheater
        containerRef={containerRef}
        solarLayerRef={solarLayerRef}
        floatStageRef={floatStageRef}
        stableSolarHeight={stableSolarHeight}
      />

      {/* Pure HTML/CSS Sticky Theater */}
      <div
        className="sticky top-0 h-[100svh] flex flex-col justify-between overflow-x-clip px-3 sm:px-6 z-20"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 48%, transparent 45%, rgba(10, 5, 8, 0.45) 100%)",
        }}
      >
        {/* Stage Header: Editorial Display Heading with Eyebrow */}
        <div
          ref={headingRef}
          className="max-w-3xl mx-auto w-full pt-[52px] sm:pt-[74px] pb-1.5 sm:pb-2.5 px-2 text-center select-none shrink-0 relative z-10 will-change-[opacity]"
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.09] text-[9px] sm:text-[10.5px] font-mono tracking-[0.14em] uppercase text-[#ECA9B7] mb-1 sm:mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E]" />
            <span>{currentMeta.eyebrow}</span>
          </div>
          <h2
            className="text-[20px] sm:text-[36px] md:text-[42px] font-bold tracking-[-0.035em] leading-[1.1] text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {currentMeta.titleLead}{" "}
            <span className="bg-gradient-to-r from-[#FCE7F3] via-[#F472B6] to-[#E65C8E] bg-clip-text text-transparent">
              {currentMeta.titleAccent}
            </span>
          </h2>
        </div>

        {/* Central Morphing Stage (Pre-mounted GPU Grid fills vertical stage comfortably) */}
        <div 
          className="flex-1 min-h-0 max-w-6xl mx-auto w-full flex items-center justify-center relative z-10 py-1 sm:py-2"
        >
          <StageCardsGrid slotRefSetters={slotRefSetters} />
        </div>

        {/* Sleek Minimalist Bottom Dot Indicator (clears iOS Safari expandable toolbar cleanly) */}
        <div className="max-w-xs mx-auto w-full pb-[max(0.35rem,env(safe-area-inset-bottom))] sm:pb-2.5 flex items-center justify-center shrink-0 relative z-30">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0D050C]/90 border border-white/[0.12] shadow-[0_6px_20px_rgba(0,0,0,0.65)]">
            <div className="flex items-center">
              {STAGE_METADATA.map((meta, idx) => {
                const isActive = idx === stageIndex;
                return (
                  <button
                    key={meta.num}
                    type="button"
                    aria-label={`Jump to section ${meta.num}: ${meta.titleLead} ${meta.titleAccent}`}
                    onClick={() => changeStage(idx)}
                    className="p-1.5 cursor-pointer flex items-center justify-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-200 ${
                        isActive
                          ? "w-5 bg-gradient-to-r from-[#EC89B5] to-[#E65C8E] shadow-[0_0_8px_rgba(230,92,142,0.55)]"
                          : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-[9.5px] font-mono text-white/45 pl-1.5 ml-0.5 border-l border-white/10 tabular-nums select-none">
              {currentMeta.num}/06
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
