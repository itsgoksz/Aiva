/**
 * EvCopilotProductPage — Next-Gen EV Copilot Product Landing Page
 * 
 * Cyber Night design language (#070913) with Electric Violet & Hyper Cyan.
 * Real-time elevation charging curve modeling, OpenChargeMap fast-charger integration,
 * curated lifestyle stops, and in-cockpit voice assistant.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import EvCopilotHeroSection from "./ev-copilot/components/EvCopilotHeroSection";
import EvCopilotProblemSection from "./ev-copilot/components/EvCopilotProblemSection";
import EvCopilotCockpitPreviewSection from "./ev-copilot/components/EvCopilotCockpitPreviewSection";
import EvCopilotArchitecture from "./ev-copilot/components/EvCopilotArchitecture";
import EvCopilotFinalCTA from "./ev-copilot/components/EvCopilotFinalCTA";
import EvCopilotDemoModal from "./ev-copilot/components/EvCopilotDemoModal";
import EvCopilotFooter from "./ev-copilot/components/EvCopilotFooter";

export default function EvCopilotProductPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Scroll to top on mount & enforce EV Copilot color tokens
  useEffect(() => {
    window.scrollTo(0, 0);

    // Enforce EV Copilot palette tokens (Cyber Night + Electric Violet & Cyan)
    document.documentElement.style.setProperty("--color-accent", "#6D5EF7");
    document.documentElement.style.setProperty("--color-accent-subtle", "rgba(109, 94, 247, 0.15)");
    document.documentElement.style.setProperty("--color-bg-primary", "#070913");
    document.documentElement.style.setProperty("--color-bg-secondary", "#0B0F22");
    document.documentElement.style.setProperty("--color-bg-tertiary", "#101633");

    if (window.location.hash === "#demo") {
      setIsDemoModalOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }

    return () => {
      // Revert on unmount
      document.documentElement.style.setProperty("--color-accent", "#A66B8E");
      document.documentElement.style.setProperty("--color-accent-subtle", "rgba(166, 107, 142, 0.15)");
      document.documentElement.style.setProperty("--color-bg-primary", "#120B0F");
      document.documentElement.style.setProperty("--color-bg-secondary", "#120B0F");
      document.documentElement.style.setProperty("--color-bg-tertiary", "#140C11");
    };
  }, []);

  return (
    <div 
      className="relative min-h-screen selection:bg-[#6D5EF7] selection:text-white"
      style={{ backgroundColor: "#070913", color: "#FFFFFF" }}
    >
      {/* Seamless Transition Radial Overlay */}
      <motion.div
        initial={{ clipPath: "circle(150% at 50% 50%)" }}
        animate={{ clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999,
          backgroundColor: "#6D5EF7",
          pointerEvents: "none"
        }}
      />

      {/* Foreground Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation Bar */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: "1rem max(1rem, 4vw)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            background: "rgba(7, 9, 19, 0.8)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Back to Universe */}
          <Link
            to="/#products"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 400,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")}
          >
            <ArrowLeft size={16} />
            <span
              className="hidden sm:inline"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              NAMMA UNIVERSE
            </span>
          </Link>

          {/* Product Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "8px",
                background: "#6D5EF7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.75rem",
                color: "#FFFFFF",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              EV
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              EV Copilot
            </span>
            <span 
              className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold text-[#00E5FF] bg-violet-950/60 border border-violet-500/30"
            >
              Electric Travel OS
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-violet-600/30 hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundColor: "#6D5EF7" }}
            >
              <Sparkles size={14} className="text-[#00E5FF]" />
              <span>Simulate Trip</span>
            </button>
          </div>
        </nav>

        {/* Master Product Sections */}
        <main>
          <EvCopilotHeroSection onOpenDemo={() => setIsDemoModalOpen(true)} />
          <EvCopilotProblemSection />
          <EvCopilotCockpitPreviewSection />
          <EvCopilotArchitecture />
          <EvCopilotFinalCTA onOpenDemo={() => setIsDemoModalOpen(true)} />
        </main>

        <EvCopilotFooter />
        <EvCopilotDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      </div>
    </div>
  );
}
