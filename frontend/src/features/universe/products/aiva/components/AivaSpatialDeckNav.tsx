import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Layers, Sparkles } from "lucide-react";

interface CardModule {
  id: string;
  num: string;
  short: string;
  name: string;
}

const MODULES: CardModule[] = [
  { id: "card-module-01", num: "01", short: "CORE", name: "Live Ingestion" },
  { id: "card-module-02", num: "02", short: "LOGIC", name: "4-Quadrant Resolution" },
  { id: "card-module-03", num: "03", short: "MATRIX", name: "Capability Parity" },
  { id: "card-module-04", num: "04", short: "DECK", name: "Telemetry Console" },
  { id: "card-module-05", num: "05", short: "RUNTIME", name: "28s Autonomous Loop" },
  { id: "card-module-06", num: "06", short: "ROI", name: "Financial Engine" },
  { id: "card-module-07", num: "07", short: "SHIELD", name: "Enterprise Governance" },
];

export default function AivaSpatialDeckNav() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show after scrolling past the top hero title (around 300px), hide before the footer
      const shouldShow = scrollY > 250 && scrollY < docHeight - windowHeight - 400;
      setIsVisible(shouldShow);

      // Determine active module based on middle of the viewport
      const viewportCenter = scrollY + windowHeight * 0.45;

      let closestIdx = 0;
      let minDistance = Infinity;

      MODULES.forEach((mod, idx) => {
        const el = document.getElementById(mod.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elCenter = scrollY + rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - elCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToModule = (idx: number) => {
    const targetIdx = Math.max(0, Math.min(MODULES.length - 1, idx));
    const targetMod = MODULES[targetIdx];
    const el = document.getElementById(targetMod.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const activeModule = MODULES[activeIdx];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-[#0D050C]/90 border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(230,92,142,0.2)] backdrop-blur-2xl">
            {/* Active Stage Indicator */}
            <div className="hidden sm:flex items-center gap-2 pl-3 pr-2 py-1 border-r border-white/10 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E65C8E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E65C8E]" />
              </span>
              <span className="text-white/40 uppercase tracking-widest text-[10px]">STAGE:</span>
              <span className="text-[#EC89B5] font-bold text-[11px] whitespace-nowrap">
                {activeModule.num} // {activeModule.name}
              </span>
            </div>

            {/* Stepper Buttons for All 7 Interconnected Cards */}
            <div className="flex items-center gap-1 sm:gap-1.5 px-1">
              {MODULES.map((mod, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={mod.id}
                    onClick={() => scrollToModule(idx)}
                    title={`Glide to Card ${mod.num}: ${mod.name}`}
                    className={`relative px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-white font-bold shadow-md"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                    style={
                      isActive
                        ? {
                            background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 10px rgba(230, 92, 142, 0.4)",
                          }
                        : {}
                    }
                  >
                    <span>{mod.num}</span>
                    <span className="hidden md:inline ml-1 text-[9px] opacity-75">{mod.short}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Glide Controls */}
            <div className="flex items-center gap-0.5 pl-1 sm:pl-2 border-l border-white/10">
              <button
                onClick={() => scrollToModule(activeIdx - 1)}
                disabled={activeIdx === 0}
                title="Previous Card"
                className="p-1 sm:p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={() => scrollToModule(activeIdx + 1)}
                disabled={activeIdx === MODULES.length - 1}
                title="Next Card"
                className="p-1 sm:p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
