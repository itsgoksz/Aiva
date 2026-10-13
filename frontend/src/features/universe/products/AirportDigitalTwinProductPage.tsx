/**
 * AirportDigitalTwinProductPage — Kempegowda International Airport (BLR / VOBL) 3D Digital Twin
 * 
 * High-fidelity aerospace visual language.
 * Sub-decimeter Google 3D photorealistic tiles, real-time ADS-B transponder streaming,
 * ICAO Annex 14 lighting shaders, and aerodrome ground dynamics.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Plane, ExternalLink, Play } from "lucide-react";

import AirportDigitalTwinHeroSection from "./airport-digital-twin/components/AirportDigitalTwinHeroSection";
import AirportDigitalTwinProblemSection from "./airport-digital-twin/components/AirportDigitalTwinProblemSection";
import AirportDigitalTwinSpatialTwinSection from "./airport-digital-twin/components/AirportDigitalTwinSpatialTwinSection";
import AirportDigitalTwinArchitectureSection from "./airport-digital-twin/components/AirportDigitalTwinArchitectureSection";
import AirportDigitalTwinFinalCTA from "./airport-digital-twin/components/AirportDigitalTwinFinalCTA";
import AirportDigitalTwinDemoModal from "./airport-digital-twin/components/AirportDigitalTwinDemoModal";
import AirportDigitalTwinFooter from "./airport-digital-twin/components/AirportDigitalTwinFooter";

export default function AirportDigitalTwinProductPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [showEnterTransition, setShowEnterTransition] = useState(true);

  // Scroll to top on mount & enforce aerodrome cyan color tokens
  useEffect(() => {
    window.scrollTo(0, 0);

    document.documentElement.style.setProperty("--color-accent", "#00E5FF");
    document.documentElement.style.setProperty("--color-accent-subtle", "rgba(0, 229, 255, 0.15)");
    document.documentElement.style.setProperty("--color-bg-primary", "#050811");
    document.documentElement.style.setProperty("--color-bg-secondary", "#070C18");
    document.documentElement.style.setProperty("--color-bg-tertiary", "#0C1326");

    if (window.location.hash === "#demo" || window.location.hash === "#simulator") {
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
      className="relative min-h-screen selection:bg-[#00E5FF] selection:text-black"
      style={{ backgroundColor: "#050811", color: "#FFFFFF" }}
    >
      {/* Seamless Enter World Transition */}
      <AnimatePresence>
        {showEnterTransition && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onAnimationComplete={() => setShowEnterTransition(false)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9999,
              backgroundColor: "#00E5FF",
              pointerEvents: "none"
            }}
          />
        )}
      </AnimatePresence>

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
            background: "rgba(5, 8, 17, 0.8)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
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
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "#00E5FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000000",
                boxShadow: "0 0 16px rgba(0, 229, 255, 0.4)",
              }}
            >
              <Plane size={16} />
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
              Airport Digital Twin
            </span>
            <span 
              className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold text-[#00E5FF] bg-cyan-500/15 border border-cyan-500/30"
            >
              VOBL • BENGALURU
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href="https://github.com/gokulgautham/live-airport-simulator"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors"
            >
              <ExternalLink size={13} />
              <span>GitHub</span>
            </a>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-black transition-colors duration-200 cursor-pointer flex items-center gap-2 hover:bg-cyan-300 active:opacity-90"
              style={{ backgroundColor: "#00E5FF", boxShadow: "0 4px 14px rgba(0, 229, 255, 0.35)" }}
            >
              <Play size={13} className="fill-black" />
              <span>Launch Simulator</span>
            </button>
          </div>
        </nav>

        {/* Master Product Sections */}
        <main>
          <AirportDigitalTwinHeroSection onOpenDemo={() => setIsDemoModalOpen(true)} />
          <AirportDigitalTwinProblemSection />
          <AirportDigitalTwinSpatialTwinSection />
          <AirportDigitalTwinArchitectureSection />
          <AirportDigitalTwinFinalCTA onOpenDemo={() => setIsDemoModalOpen(true)} />
        </main>

        {/* Airport Footer */}
        <AirportDigitalTwinFooter />

        {/* Interactive 3D Flight & Aerodrome Simulator Modal */}
        <AirportDigitalTwinDemoModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
        />

      </div>
    </div>
  );
}
