/**
 * ProductCinematicCardStage — Shared Namma Universe 3D Solar System Card Theater
 *
 * Wraps any product's middle marketing card sections (from section 2 through second-to-last)
 * inside the exact Namma Universe 3D solar system & planet-emergence experience:
 * - Full-viewport `sticky top-0 h-[100dvh]` 3D WebGL solar system with zero navbar seams
 * - Symmetric planet-to-planet camera flight: card vanishes cleanly into its planet on scroll,
 *   camera arcs across the solar system, and the next section emerges out of the next planet
 * - Scroll-driven vertical pan for multi-card grids on mobile (no nested scroll traps or clipping)
 * - Glitch-free bottom capsule dock styled in the product's accent color
 * lets go
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, type Variants } from "framer-motion";
import { Play, Pause, ChevronUp, ChevronDown } from "lucide-react";
import AivaSolarSystemBackground, {
  SOLAR_PLANETS,
} from "../aiva/components/AivaSolarSystemBackground";

export interface ProductStageItem {
  id: string;
  short: string;
  content: React.ReactNode;
}

interface ProductCinematicCardStageProps {
  stages: ProductStageItem[];
  accentColor: string;
  /** Starting planet orbit index (0..6) so each product begins on a matching Namma Universe orbit */
  planetOffset?: number;
}

const PLANET_EMERGENCE_TRANSITION: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: 0,
    y: direction >= 0 ? 18 : -18,
    scale: 0.88,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: 0,
    y: direction >= 0 ? -14 : 14,
    scale: 0.9,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1] as const,
    },
  }),
};

function mapStageProgress(latest: number, count: number) {
  const safeCount = Math.max(1, count);
  const clamped = Math.max(0, Math.min(0.999999, latest));
  const rawIndex = Math.min(safeCount - 1, Math.floor(clamped * safeCount));
  const frac = Math.max(0, Math.min(1, clamped * safeCount - rawIndex));

  const lastIdx = safeCount - 1;
  const entryEnd = rawIndex === 0 ? 0 : 0.14;
  const exitStart = rawIndex === lastIdx ? 1 : 0.78;

  const isCardVisible = frac >= entryEnd && frac <= exitStart;

  // Smooth pan from 0 -> 1 inside the docked reading plateau so taller grids on mobile
  // scroll completely to the bottom before the card dissolves for the next planet
  const panStart = Math.max(entryEnd + 0.04, 0.16);
  const panEnd = Math.min(exitStart - 0.06, 0.72);
  let panProgress = 0;
  if (frac > panStart && panEnd > panStart) {
    panProgress = Math.max(0, Math.min(1, (frac - panStart) / (panEnd - panStart)));
  }

  let floatStage = rawIndex;
  if (rawIndex > 0 && frac < entryEnd) {
    const t = frac / entryEnd;
    const eased = t * t * (3 - 2 * t);
    floatStage = rawIndex - 0.5 + 0.5 * eased;
  } else if (rawIndex < lastIdx && frac > exitStart) {
    const t = (frac - exitStart) / (1 - exitStart);
    const eased = t * t * (3 - 2 * t);
    floatStage = rawIndex + 0.5 * eased;
  }

  return { stageIndex: rawIndex, isCardVisible, panProgress, floatStage };
}

export default function ProductCinematicCardStage({
  stages,
  accentColor,
  planetOffset = 0,
}: ProductCinematicCardStageProps) {
  const stageCount = Math.max(1, stages.length);
  // Clamp offset so every stage sits cleanly within SOLAR_PLANETS (0..6)
  const maxOffset = Math.max(0, SOLAR_PLANETS.length - stageCount);
  const safeOffset = Math.max(0, Math.min(maxOffset, planetOffset));

  const containerRef = useRef<HTMLDivElement>(null);
  const solarLayerRef = useRef<HTMLDivElement>(null);
  const stageViewportRef = useRef<HTMLDivElement>(null);
  const stageInnerRef = useRef<HTMLDivElement>(null);
  const panProgressRef = useRef<number>(0);

  const [stageIndex, setStageIndex] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const prevVisibleRef = useRef(true);
  const floatStageRef = useRef<number>(safeOffset);
  const [direction, setDirection] = useState(0);
  const prevStageRef = useRef(0);
  const programmaticTargetRef = useRef<number | null>(null);
  const programmaticTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [isSolarActive, setIsSolarActive] = useState(false);

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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsSolarActive(entry.isIntersecting),
      { rootMargin: "750px 0px 750px 0px", threshold: 0 }
    );
    io.observe(el);

    const syncSolarOpacity = () => {
      const layer = solarLayerRef.current;
      if (!layer) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const navBottom = 88;
      const enterProgress = Math.max(0, Math.min(1, (vh * 0.95 - rect.top) / (vh * 0.5)));
      const exitProgress = Math.max(0, Math.min(1, (rect.bottom - navBottom) / (vh * 0.42)));
      layer.style.opacity = Math.min(enterProgress, exitProgress).toFixed(3);
    };

    syncSolarOpacity();
    window.addEventListener("scroll", syncSolarOpacity, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", syncSolarOpacity);
    };
  }, []);

  // Adaptive container scroll budget (~125vh per stage desktop, ~140vh mobile for multi-card grids)
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const update = () => setIsMobileView(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const containerHeightVh = useMemo(() => {
    const perStage = isMobileView ? 145 : 122;
    return Math.max(240, stageCount * perStage);
  }, [stageCount, isMobileView]);

  const applyCardPan = () => {
    const viewport = stageViewportRef.current;
    const inner = stageInnerRef.current;
    if (!viewport || !inner) return;
    const maxOverflow = Math.max(0, inner.scrollHeight - viewport.clientHeight);
    const offset = panProgressRef.current * maxOverflow;
    inner.style.transform = `translate3d(0, ${-offset.toFixed(2)}px, 0)`;
  };

  const changeStage = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(stageCount - 1, newIndex));
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
    programmaticTargetRef.current = clamped;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const scrollable = Math.max(
        1,
        containerRef.current.offsetHeight - window.innerHeight
      );
      const segSize = 1 / stageCount;
      const targetFrac = clamped === 0 ? 0.06 : 0.17;
      const targetProgress = clamped * segSize + segSize * targetFrac;
      const targetScroll = containerTop + scrollable * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }

    programmaticTimerRef.current = setTimeout(() => {
      programmaticTargetRef.current = null;
    }, 1400);

    if (clamped === stageIndex && isCardVisible) return;
    setDirection(clamped > stageIndex ? 1 : -1);
    prevStageRef.current = clamped;
    prevVisibleRef.current = true;
    floatStageRef.current = clamped + safeOffset;
    panProgressRef.current = 0;
    applyCardPan();
    setIsCardVisible(true);
    setStageIndex(clamped);
  };

  useEffect(() => {
    if (!isPlayingTour) return;
    const timer = setInterval(() => {
      setDirection(1);
      panProgressRef.current = 0;
      prevVisibleRef.current = true;
      setIsCardVisible(true);
      setStageIndex((prev) => {
        const next = (prev + 1) % stageCount;
        prevStageRef.current = next;
        floatStageRef.current = next + safeOffset;
        return next;
      });
    }, 5500);
    return () => clearInterval(timer);
  }, [isPlayingTour, stageCount, safeOffset]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (isPlayingTour) return;
      const mapped = mapStageProgress(latest, stageCount);

      if (programmaticTargetRef.current !== null) {
        if (mapped.stageIndex === programmaticTargetRef.current) {
          programmaticTargetRef.current = null;
          if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
        } else {
          return;
        }
      }

      floatStageRef.current = mapped.floatStage + safeOffset;
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
  }, [scrollYProgress, isPlayingTour, stageCount, safeOffset]);

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
  }, [stageIndex, isCardVisible]);

  const activeStage = stages[stageIndex] || stages[0];
  const activePlanetColor =
    SOLAR_PLANETS[(stageIndex + safeOffset) % SOLAR_PLANETS.length]?.color;
  const planetGlowHex = activePlanetColor
    ? `rgb(${Math.round(activePlanetColor[0] * 255)}, ${Math.round(
      activePlanetColor[1] * 255
    )}, ${Math.round(activePlanetColor[2] * 255)})`
    : accentColor;

  return (
    <section
      ref={containerRef}
      className="relative bg-transparent"
      style={{ minHeight: `${containerHeightVh}vh` }}
    >
      {/* Scoped overrides so existing product sections integrate seamlessly into the solar theater */}
      <style>{`
        .product-stage-content > section {
          padding-top: 0.25rem !important;
          padding-bottom: 0.5rem !important;
          border-top-width: 0 !important;
          background: transparent !important;
        }
        .product-stage-content > section > div.pointer-events-none[class*="blur-"] {
          display: none !important;
        }
        .product-stage-content > section > div {
          padding-left: 0.25rem !important;
          padding-right: 0.25rem !important;
        }
        .product-stage-content > section > div > .text-center {
          margin-bottom: 1.15rem !important;
        }
        @media (min-width: 768px) {
          .product-stage-content > section > div > .text-center {
            margin-bottom: 1.65rem !important;
          }
        }
      `}</style>

      {/* Fixed 3D Solar System Layer (opaque base hides static 2D starfield during card section) */}
      <div
        ref={solarLayerRef}
        className="fixed top-0 left-0 w-full pointer-events-none z-0 will-change-[opacity]"
        style={{ opacity: 0, height: `${stableSolarHeight}px`, backgroundColor: "#06080C" }}
      >
        <AivaSolarSystemBackground
          stageIndex={stageIndex + safeOffset}
          floatStageRef={floatStageRef}
          active={isSolarActive}
          className="w-full h-full"
        />
      </div>

      {/* Pure HTML/CSS Sticky Theater (no WebGL canvas inside sticky) */}
      <div className="sticky top-0 h-[100svh] flex flex-col justify-between overflow-x-clip px-3 sm:px-6 z-20">
        <div
          className="relative z-10 flex-1 min-h-0 flex flex-col justify-between"
        >

          {/* Navbar Clearance + Pan Viewport */}
          <div
            className="flex-1 min-h-0 max-w-7xl mx-auto w-full pt-[78px] sm:pt-[86px] flex items-center justify-center relative z-10"
          >
            {/* Planetary Emergence Aura Pulse (desktop only for 60fps iOS scroll) */}
            <motion.div
              key={`prod-aura-${stageIndex}-${isCardVisible ? "on" : "off"}`}
              initial={{
                opacity: isCardVisible ? 0.65 : 0.1,
                scale: isCardVisible ? 0.15 : 1.0,
              }}
              animate={{
                opacity: isCardVisible ? 0.12 : 0.0,
                scale: isCardVisible ? 1.15 : 0.35,
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:block pointer-events-none absolute w-[480px] h-[480px] rounded-full blur-[75px] z-0"
              style={{
                background: `radial-gradient(circle, ${planetGlowHex}66 0%, transparent 70%)`,
              }}
            />

            <div
              ref={stageViewportRef}
              className="w-full h-full flex flex-col overflow-hidden relative z-10"
            >
              <div
                ref={stageInnerRef}
                className="w-full my-auto py-1 sm:py-2 px-0.5 will-change-transform"
              >
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  {isCardVisible && activeStage && (
                    <motion.div
                      key={activeStage.id}
                      custom={direction}
                      variants={PLANET_EMERGENCE_TRANSITION}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="product-stage-content w-full relative"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {activeStage.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Floating Stage Controller Capsule */}
          <div className="max-w-xl mx-auto w-full pb-2 sm:pb-3 flex items-center justify-center shrink-0 relative z-30">
            <div
              className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#09090D]/95 border border-white/15 backdrop-blur-2xl"
              style={{
                boxShadow: `0 12px 45px rgba(0,0,0,0.88), 0 0 22px ${accentColor}33`,
              }}
            >
              <button
                onClick={() => setIsPlayingTour(!isPlayingTour)}
                title={isPlayingTour ? "Pause Cinematic Tour" : "Play Cinematic Tour"}
                className="p-1.5 rounded-full transition-colors cursor-pointer"
                style={
                  isPlayingTour
                    ? { backgroundColor: accentColor, color: "#05070A" }
                    : { color: "rgba(255,255,255,0.45)" }
                }
              >
                {isPlayingTour ? <Pause size={12} /> : <Play size={12} />}
              </button>

              <div className="flex items-center gap-0.5 sm:gap-1 px-1">
                {stages.map((st, idx) => {
                  const isActive = idx === stageIndex;
                  const num = String(idx + 1).padStart(2, "0");
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setIsPlayingTour(false);
                        changeStage(idx);
                      }}
                      className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer ${isActive
                        ? "text-[#06080B] font-bold"
                        : "text-white/45 hover:text-white hover:bg-white/5"
                        }`}
                      style={
                        isActive
                          ? {
                            background: accentColor,
                            boxShadow: `0 2px 12px ${accentColor}66`,
                          }
                          : {}
                      }
                    >
                      <span>{num}</span>
                      <span className="hidden md:inline ml-1 text-[9px] opacity-80">
                        {st.short}
                      </span>
                    </button>
                  );
                })}
              </div>

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
                    changeStage(Math.min(stageCount - 1, stageIndex + 1));
                  }}
                  disabled={stageIndex === stageCount - 1}
                  className="p-1 text-white/50 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                >
                  <ChevronDown size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
