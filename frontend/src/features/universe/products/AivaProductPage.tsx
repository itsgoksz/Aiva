/**
 * AivaProductPage — Next-Gen Aiva Product Landing Page
 * 
 * Matte Black design language.
 * Completely custom sections reflecting real Aiva conversation intelligence,
 * scheduling engine, and executive CRM console.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, LogIn, LayoutDashboard, PhoneCall } from "lucide-react";
import { useAuth } from "../../auth/AuthProvider";
import { isAivaSubdomain } from "../../../lib/subdomain";
import AivaHeroSection from "./aiva/components/AivaHeroSection";
import AivaProblemSection from "./aiva/components/AivaProblemSection";
import AivaDashboardPreviewSection from "./aiva/components/AivaDashboardPreviewSection";
import AivaAutonomousLoopSection from "./aiva/components/AivaAutonomousLoopSection";
import AivaRoiCalculatorSection from "./aiva/components/AivaRoiCalculatorSection";
import AivaEnterpriseSecuritySection from "./aiva/components/AivaEnterpriseSecuritySection";
import AivaFinalCTASection from "./aiva/components/AivaFinalCTASection";
import AivaDemoModal from "./aiva/components/AivaDemoModal";
import AivaBookDemoModal from "./aiva/components/AivaBookDemoModal";
import AivaSpatialDeckNav from "./aiva/components/AivaSpatialDeckNav";
import AivaFooter from "./aiva/components/AivaFooter";
import ProductAtmosphere from "./components/ProductAtmosphere";

export default function AivaProductPage() {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isTestCallOpen, setIsTestCallOpen] = useState(false);
  const location = useLocation();
  // Only trigger the enter world animation if arriving from Namma Universe navigation
  const [showEnterTransition, setShowEnterTransition] = useState(() => {
    return !!(location.state as any)?.fromUniverse;
  });
  const { isAuthenticated } = useAuth();
  const isSubdomain = isAivaSubdomain();

  // Scroll to top on mount & enforce Aiva color tokens
  useEffect(() => {
    window.scrollTo(0, 0);

    // Enforce Aiva palette tokens (Velvet Plum & Matte Black OS)
    document.documentElement.style.setProperty("--color-accent", "#A66B8E");
    document.documentElement.style.setProperty("--color-accent-subtle", "rgba(166, 107, 142, 0.15)");
    document.documentElement.style.setProperty("--color-bg-primary", "#0A0508");
    document.documentElement.style.setProperty("--color-bg-secondary", "#0E070C");
    document.documentElement.style.setProperty("--color-bg-tertiary", "#140C11");

    if (window.location.hash === "#demo" || window.location.hash === "#book-demo") {
      setIsBookDemoOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    } else if (window.location.hash === "#test-call" || window.location.hash === "#simulator") {
      setIsTestCallOpen(true);
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
      className="relative min-h-screen selection:bg-[#A66B8E] selection:text-white"
      style={{ backgroundColor: "#0A0508", color: "#FFFFFF" }}
    >
      {/* Seamless Enter World Transition */}
      <AnimatePresence>
        {showEnterTransition && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onAnimationComplete={() => {
              setShowEnterTransition(false);
              window.history.replaceState({}, document.title);
            }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9999,
              background: "radial-gradient(circle at 50% 50%, rgba(166, 107, 142, 0.35) 0%, #0A0508 80%)",
              pointerEvents: "none"
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle Starfield & Celestial Product Atmosphere */}
      <ProductAtmosphere 
        accentColor="#A66B8E"
        secondaryAccent="#E65C8E"
        bgBaseColor="#0A0508"
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
            background: "rgba(10, 5, 8, 0.75)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Back to Universe */}
          {isSubdomain ? (
            <a
              href="https://www.nammauniverse.in/#products"
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
            </a>
          ) : (
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
          )}

          {/* Product Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "8px",
                background: "#A66B8E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.75rem",
                color: "#FFFFFF",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              A
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
              Aiva
            </span>
            <span 
              className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold text-[#EC89B5] bg-[#A66B8E]/15 border border-[#A66B8E]/25"
            >
              Voice AI Teammate
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <Link
                to="/app"
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-mono text-white/80 hover:text-white transition-colors bg-white/5 border border-white/10"
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors px-2 py-1"
              >
                <LogIn size={13} />
                <span>Sign in</span>
              </Link>
            )}

            <button
              onClick={() => setIsTestCallOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 sm:h-9.5 px-3.5 rounded-xl text-xs font-semibold text-white/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] transition-all cursor-pointer border border-white/10 hover:border-[#E65C8E]/40 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <PhoneCall size={13} className="text-[#EC89B5]" />
              <span>Test Call</span>
            </button>

            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 sm:h-9.5 px-3.5 sm:px-4.5 rounded-xl font-semibold text-xs sm:text-sm text-white transition-all duration-200 cursor-pointer hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
              style={{
                background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px rgba(230, 92, 142, 0.35)",
              }}
            >
              <Calendar size={13} />
              <span>Book a Demo</span>
            </button>
          </div>
        </nav>

        {/* Master Product Sections */}
        <main>
          <AivaHeroSection 
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
            onOpenTestCall={() => setIsTestCallOpen(true)}
          />
          <AivaProblemSection />
          <AivaDashboardPreviewSection />
          <AivaAutonomousLoopSection />
          <AivaRoiCalculatorSection />
          <AivaEnterpriseSecuritySection />
          <AivaFinalCTASection 
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
            onOpenTestCall={() => setIsTestCallOpen(true)}
          />
        </main>

        <AivaSpatialDeckNav />
        <AivaFooter />
        <AivaBookDemoModal isOpen={isBookDemoOpen} onClose={() => setIsBookDemoOpen(false)} />
        <AivaDemoModal isOpen={isTestCallOpen} onClose={() => setIsTestCallOpen(false)} />
      </div>
    </div>
  );
}
