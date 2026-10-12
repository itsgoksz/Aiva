/**
 * WelloraProductPage — Next-Gen Wellora Product Landing Page
 * 
 * Deep Organic Obsidian design language (#060C08).
 * Real-time speech-to-macro logger, interactive metabolic telemetry,
 * and empathetic companion intelligence.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import WelloraHeroSection from "./wellora/components/WelloraHeroSection";
import WelloraProblemSection from "./wellora/components/WelloraProblemSection";
import WelloraDashboardPreviewSection from "./wellora/components/WelloraDashboardPreviewSection";
import WelloraConversationSection from "./wellora/components/WelloraConversationSection";
import WelloraArchitecture from "./wellora/components/WelloraArchitecture";
import WelloraFinalCTA from "./wellora/components/WelloraFinalCTA";
import WelloraDemoModal from "./wellora/components/WelloraDemoModal";
import WelloraFooter from "./wellora/components/WelloraFooter";

export default function WelloraProductPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Scroll to top on mount & enforce Wellora color tokens
  useEffect(() => {
    window.scrollTo(0, 0);

    // Enforce Wellora palette tokens (Deep Organic Obsidian + Emerald)
    document.documentElement.style.setProperty("--color-accent", "#2ECC71");
    document.documentElement.style.setProperty("--color-accent-subtle", "rgba(46, 204, 113, 0.15)");
    document.documentElement.style.setProperty("--color-bg-primary", "#060C08");
    document.documentElement.style.setProperty("--color-bg-secondary", "#09130D");
    document.documentElement.style.setProperty("--color-bg-tertiary", "#0E1A12");

    if (window.location.hash === "#demo") {
      setIsDemoModalOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }

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
      className="relative min-h-screen selection:bg-[#2ECC71] selection:text-black"
      style={{ backgroundColor: "#060C08", color: "#FFFFFF" }}
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
          backgroundColor: "#2ECC71",
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
            background: "rgba(6, 12, 8, 0.8)",
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
                background: "#2ECC71",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.75rem",
                color: "#060C08",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              W
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
              Wellora
            </span>
            <span 
              className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25"
            >
              Voice Nutrition
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-[#060C08] transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundColor: "#2ECC71" }}
            >
              <Sparkles size={14} />
              <span>Get Beta Access</span>
            </button>
          </div>
        </nav>

        {/* Master Product Sections */}
        <main>
          <WelloraHeroSection onOpenDemo={() => setIsDemoModalOpen(true)} />
          <WelloraProblemSection />
          <WelloraDashboardPreviewSection />
          <WelloraConversationSection />
          <WelloraArchitecture />
          <WelloraFinalCTA onOpenDemo={() => setIsDemoModalOpen(true)} />
        </main>

        <WelloraFooter />
        <WelloraDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      </div>
    </div>
  );
}
