/**
 * CasaMotoProductPage — CasaMoto (Motorcycle OS & Digital Garage) Product Landing Page
 * 
 * Implements Namma Universe back-navigation and high-octane motorcycle telemetry branding.
 */

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import CasaMotoHeroSection from "./casamoto/components/CasaMotoHeroSection";
import CasaMotoProblemSection from "./casamoto/components/CasaMotoProblemSection";
import CasaMotoGarageSection from "./casamoto/components/CasaMotoGarageSection";
import CasaMotoRideRadarSection from "./casamoto/components/CasaMotoRideRadarSection";
import CasaMotoSynergySection from "./casamoto/components/CasaMotoSynergySection";
import CasaMotoGamificationSection from "./casamoto/components/CasaMotoGamificationSection";
import CasaMotoArchitectureSection from "./casamoto/components/CasaMotoArchitectureSection";
import CasaMotoFinalCTASection from "./casamoto/components/CasaMotoFinalCTASection";
import CasaMotoDemoModal from "./casamoto/components/CasaMotoDemoModal";
import CasaMotoFooter from "./casamoto/components/CasaMotoFooter";
import ParticleField from "../components/ParticleField";

export default function CasaMotoProductPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const progressRef = useRef(1); // Show fully formed constellation
  const activeProductIndexRef = useRef<number | null>(3); // CasaMoto index

  // Scroll to top on mount & set color tokens
  useEffect(() => {
    window.scrollTo(0, 0);

    // Override global colors for CasaMoto (High-octane Blaze Orange & OLED Black)
    document.documentElement.style.setProperty("--color-accent", "#FF6B00");
    document.documentElement.style.setProperty("--color-accent-subtle", "rgba(255, 107, 0, 0.15)");
    document.documentElement.style.setProperty("--color-bg-primary", "#06080E");
    document.documentElement.style.setProperty("--color-bg-secondary", "#090B12");
    document.documentElement.style.setProperty("--color-bg-tertiary", "#0E111B");

    return () => {
      // Revert to default/Aiva on unmount
      document.documentElement.style.setProperty("--color-accent", "#A66B8E");
      document.documentElement.style.setProperty("--color-accent-subtle", "rgba(166, 107, 142, 0.15)");
      document.documentElement.style.setProperty("--color-bg-primary", "#120B0F");
      document.documentElement.style.setProperty("--color-bg-secondary", "#120B0F");
      document.documentElement.style.setProperty("--color-bg-tertiary", "#140C11");
    };
  }, []);

  return (
    <div 
      className="relative min-h-screen selection:bg-[#FF6B00] selection:text-black"
      style={{ backgroundColor: "var(--color-bg-primary)", color: "#FFFFFF" }}
    >
      {/* Seamless Transition Overlay */}
      <motion.div
        initial={{ clipPath: "circle(150% at 50% 50%)" }}
        animate={{ clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999,
          backgroundColor: "#FF6B00",
          pointerEvents: "none"
        }}
      />

      {/* Background WebGL Particle Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-35">
        <ParticleField progressRef={progressRef} activeProductIndexRef={activeProductIndexRef} />
      </div>

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
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            background: "rgba(6, 8, 14, 0.75)",
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
                background: "#FF6B00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.75rem",
                color: "#000000",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              CM
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
              CasaMoto
            </span>
            <span 
              className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20"
            >
              Motorcycle OS
            </span>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/20 hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundColor: "#FF6B00" }}
            >
              <Sparkles size={14} />
              <span>Get Beta Access</span>
            </button>
          </div>
        </nav>

        {/* CasaMoto Product Content Sections */}
        <main>
          <CasaMotoHeroSection onOpenDemo={() => setIsDemoModalOpen(true)} />
          <CasaMotoProblemSection />
          <CasaMotoGarageSection />
          <CasaMotoRideRadarSection />
          <CasaMotoSynergySection />
          <CasaMotoGamificationSection />
          <CasaMotoArchitectureSection />
          <CasaMotoFinalCTASection onOpenDemo={() => setIsDemoModalOpen(true)} />
        </main>

        <CasaMotoFooter />
        <CasaMotoDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      </div>
    </div>
  );
}
