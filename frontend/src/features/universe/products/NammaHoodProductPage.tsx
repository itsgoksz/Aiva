/**
 * NammaHoodProductPage — Next-Gen Namma Hood Product Landing Page
 * 
 * Urban Night Asphalt design language (#060807) with Civic Emerald & Streetlamp Amber.
 * Real-time 5-second geotag reporting, community megaphone upvotes,
 * ward territory leaderboards, and daily civic missions.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import NammaHoodHeroSection from "./namma-hood/components/NammaHoodHeroSection";
import NammaHoodProblemSection from "./namma-hood/components/NammaHoodProblemSection";
import NammaHoodTerritorySection from "./namma-hood/components/NammaHoodTerritorySection";
import NammaHoodMissionsSection from "./namma-hood/components/NammaHoodMissionsSection";
import NammaHoodFinalCTA from "./namma-hood/components/NammaHoodFinalCTA";
import NammaHoodDemoModal from "./namma-hood/components/NammaHoodDemoModal";
import NammaHoodFooter from "./namma-hood/components/NammaHoodFooter";

export default function NammaHoodProductPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Scroll to top on mount & enforce Namma Hood color tokens
  useEffect(() => {
    window.scrollTo(0, 0);

    // Enforce Namma Hood palette tokens (Urban Night Asphalt + Civic Emerald)
    document.documentElement.style.setProperty("--color-accent", "#10B981");
    document.documentElement.style.setProperty("--color-accent-subtle", "rgba(16, 185, 129, 0.15)");
    document.documentElement.style.setProperty("--color-bg-primary", "#060807");
    document.documentElement.style.setProperty("--color-bg-secondary", "#0A110D");
    document.documentElement.style.setProperty("--color-bg-tertiary", "#0F1A14");

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
      className="relative min-h-screen selection:bg-[#10B981] selection:text-black"
      style={{ backgroundColor: "#060807", color: "#FFFFFF" }}
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
          backgroundColor: "#10B981",
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
            background: "rgba(6, 8, 7, 0.8)",
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
                background: "#10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.75rem",
                color: "#060807",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              NH
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
              Namma Hood
            </span>
            <span 
              className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30"
            >
              Civic Action
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/25 hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundColor: "#10B981" }}
            >
              <Sparkles size={14} />
              <span>Simulate Report</span>
            </button>
          </div>
        </nav>

        {/* Master Product Sections */}
        <main>
          <NammaHoodHeroSection onOpenDemo={() => setIsDemoModalOpen(true)} />
          <NammaHoodProblemSection />
          <NammaHoodTerritorySection />
          <NammaHoodMissionsSection />
          <NammaHoodFinalCTA onOpenDemo={() => setIsDemoModalOpen(true)} />
        </main>

        <NammaHoodFooter />
        <NammaHoodDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      </div>
    </div>
  );
}
