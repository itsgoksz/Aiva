/**
 * AivaProductPage — Next-Gen Aiva Product Landing Page
 * 
 * Matte Black design language.
 * Completely custom sections reflecting real Aiva conversation intelligence,
 * scheduling engine, and executive CRM console.
 */

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, LogIn, LayoutDashboard, PhoneCall } from "lucide-react";
import { useAuth } from "../../auth/AuthProvider";
import { isAivaSubdomain } from "../../../lib/subdomain";
import AivaHeroSection from "./aiva/components/AivaHeroSection";
import AivaCinematicCardStage from "./aiva/components/AivaCinematicCardStage";
import AivaFinalCTASection from "./aiva/components/AivaFinalCTASection";
import AivaDemoModal from "./aiva/components/AivaDemoModal";
import AivaBookDemoModal from "./aiva/components/AivaBookDemoModal";
import AivaFooter from "./aiva/components/AivaFooter";
import ProductAtmosphere from "./components/ProductAtmosphere";

/** Isolated Navbar keeps scroll-driven compact state from re-rendering Hero, Starfield, or WebGL Canvas */
const AivaNavbar = memo(function AivaNavbar({
  isAuthenticated,
  isSubdomain,
  onOpenBookDemo,
  onOpenTestCall,
}: {
  isAuthenticated: boolean;
  isSubdomain: boolean;
  onOpenBookDemo: () => void;
  onOpenTestCall: () => void;
}) {
  const [isNavCompact, setIsNavCompact] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const y = window.scrollY;
        if (y <= 32) {
          setIsNavCompact(false);
        } else if (y > lastScrollYRef.current + 6) {
          setIsNavCompact(true);
        } else if (y < lastScrollYRef.current - 6) {
          setIsNavCompact(false);
        }
        lastScrollYRef.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-[max(1rem,4vw)] flex items-center justify-between transition-[padding] duration-200 will-change-transform ${
        isNavCompact ? "py-2 sm:py-2.5" : "py-3.5 sm:py-4"
      }`}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(10, 5, 8, 0.78)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        transform: "translateZ(0)",
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

      {/* Product Wordmark (centered on mobile, inline on desktop) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 flex items-center gap-2 transition-transform duration-200"
        style={{ transform: isNavCompact ? "scale(0.92)" : undefined }}
      >
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
        <span className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold text-[#EC89B5] bg-[#A66B8E]/15 border border-[#A66B8E]/25">
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
          onClick={onOpenTestCall}
          className="hidden sm:inline-flex items-center gap-1.5 h-9 sm:h-9.5 px-3.5 rounded-xl text-xs font-semibold text-white/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] transition-colors cursor-pointer border border-white/10 hover:border-[#E65C8E]/40 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          <PhoneCall size={13} className="text-[#EC89B5]" />
          <span>Test Call</span>
        </button>

        <button
          onClick={onOpenBookDemo}
          className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-xl font-semibold text-white transition-[height,padding,font-size] duration-200 cursor-pointer hover:brightness-110 active:scale-[0.98] whitespace-nowrap ${
            isNavCompact
              ? "h-7 px-2.5 text-[11px] sm:h-8 sm:px-4 sm:text-xs"
              : "h-7.5 px-2.5 text-[11px] sm:h-9.5 sm:px-4.5 sm:text-sm"
          }`}
          style={{
            background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px rgba(230, 92, 142, 0.35)",
          }}
        >
          <Calendar size={12} className="sm:w-[13px] sm:h-[13px]" />
          <span>Book a Demo</span>
        </button>
      </div>
    </nav>
  );
});

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
        <AivaNavbar
          isAuthenticated={isAuthenticated}
          isSubdomain={isSubdomain}
          onOpenBookDemo={() => setIsBookDemoOpen(true)}
          onOpenTestCall={() => setIsTestCallOpen(true)}
        />

        {/* Master Product Sections */}
        <main>
          <AivaHeroSection 
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
            onOpenTestCall={() => setIsTestCallOpen(true)}
          />
          <AivaCinematicCardStage 
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
            onOpenTestCall={() => setIsTestCallOpen(true)}
          />
          <AivaFinalCTASection 
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
            onOpenTestCall={() => setIsTestCallOpen(true)}
          />
        </main>

        <AivaFooter />
        <AivaBookDemoModal isOpen={isBookDemoOpen} onClose={() => setIsBookDemoOpen(false)} />
        <AivaDemoModal isOpen={isTestCallOpen} onClose={() => setIsTestCallOpen(false)} />
      </div>
    </div>
  );
}
