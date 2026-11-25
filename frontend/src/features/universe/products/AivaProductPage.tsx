/**
 * AivaProductPage — Next-Gen Aiva Product Landing Page
 * 
 * Matte Black design language.
 * Completely custom sections reflecting real Aiva conversation intelligence,
 * scheduling engine, and executive CRM console.
 */

import { useState, useEffect, memo } from "react";
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

/** 2026 Minimalist GPU-pinned Navbar: shrinks cleanly into a floating glass-matte island on scroll */
const AivaNavbar = memo(function AivaNavbar({
  isAuthenticated,
  isSubdomain,
  isCompact,
  onOpenBookDemo,
  onOpenTestCall,
}: {
  isAuthenticated: boolean;
  isSubdomain: boolean;
  isCompact: boolean;
  onOpenBookDemo: () => void;
  onOpenTestCall: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
      <nav
        className={`pointer-events-auto w-full flex items-center justify-between transition-[max-width,margin,padding,border-radius,border-color,background-color] duration-300 ease-out ${
          isCompact
            ? "max-w-[92%] sm:max-w-3xl mt-1.5 sm:mt-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/[0.11] bg-[#0D060B]/[0.94] shadow-[0_8px_24px_rgba(0,0,0,0.68)]"
            : "max-w-full mt-0 px-3.5 sm:px-[max(1rem,4vw)] py-2.5 sm:py-3 rounded-none border-b border-white/[0.06] bg-[#0A0508]/[0.92]"
        }`}
        style={{
          transform: "translateZ(0)",
        }}
      >
        {/* Back to Universe */}
        {isSubdomain ? (
          <a
            href="https://www.nammauniverse.in/#products"
            className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors no-underline"
          >
            <ArrowLeft size={isCompact ? 15 : 16} />
            <span
              className="hidden sm:inline font-semibold tracking-[0.08em] uppercase text-[11px] text-white/45"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              NAMMA UNIVERSE
            </span>
          </a>
        ) : (
          <Link
            to="/#products"
            className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors no-underline"
          >
            <ArrowLeft size={isCompact ? 15 : 16} />
            <span
              className="hidden sm:inline font-semibold tracking-[0.08em] uppercase text-[11px] text-white/45"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              NAMMA UNIVERSE
            </span>
          </Link>
        )}

        {/* Product Wordmark */}
        <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 flex items-center gap-1.5 sm:gap-2">
          <div
            className={`rounded-lg bg-[#A66B8E] flex items-center justify-center font-extrabold text-white transition-all duration-300 ${
              isCompact ? "w-[22px] h-[22px] text-[11px]" : "w-[26px] h-[26px] text-xs"
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            A
          </div>
          <span
            className={`font-bold text-white tracking-tight transition-all duration-300 ${
              isCompact ? "text-[15px] sm:text-base" : "text-[17px]"
            }`}
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Aiva
          </span>
          {!isCompact && (
            <span className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold text-[#EC89B5] bg-[#A66B8E]/15 border border-[#A66B8E]/25">
              Voice AI Teammate
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {isAuthenticated ? (
            <Link
              to="/app"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full text-xs font-mono text-white/80 hover:text-white transition-colors bg-white/5 border border-white/10 ${
                isCompact ? "h-7 px-2.5" : "h-9 px-3 rounded-xl"
              }`}
            >
              <LayoutDashboard size={13} />
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
            className={`hidden sm:inline-flex items-center gap-1.5 font-semibold text-white/90 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] transition-all cursor-pointer border border-white/10 hover:border-[#E65C8E]/40 whitespace-nowrap ${
              isCompact ? "h-7 px-3 rounded-full text-[11px]" : "h-9 px-3.5 rounded-xl text-xs"
            }`}
          >
            <PhoneCall size={12} className="text-[#EC89B5]" />
            <span>Test Call</span>
          </button>

          <button
            onClick={onOpenBookDemo}
            className={`inline-flex items-center gap-1 sm:gap-1.5 font-semibold text-white cursor-pointer hover:brightness-110 active:scale-[0.98] whitespace-nowrap transition-all duration-200 ${
              isCompact
                ? "h-6.5 px-2.5 text-[10.5px] sm:h-7 sm:px-3 sm:text-[11px] rounded-full"
                : "h-7.5 px-2.5 text-[11px] sm:h-9 sm:px-4 sm:text-xs rounded-xl"
            }`}
            style={{
              background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 12px rgba(230, 92, 142, 0.32)",
            }}
          >
            <Calendar size={11} className="sm:w-[12px] sm:h-[12px]" />
            <span>Book a Demo</span>
          </button>
        </div>
      </nav>
    </div>
  );
});

export default function AivaProductPage() {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isTestCallOpen, setIsTestCallOpen] = useState(false);
  const [isNavCompact, setIsNavCompact] = useState(false);
  const location = useLocation();
  // Only trigger the enter world animation if arriving from Namma Universe navigation
  const [showEnterTransition, setShowEnterTransition] = useState(() => {
    return !!(location.state as any)?.fromUniverse;
  });
  const { isAuthenticated } = useAuth();
  const isSubdomain = isAivaSubdomain();

  useEffect(() => {
    const onScroll = () => {
      const compact = window.scrollY > 40;
      setIsNavCompact((prev) => (prev === compact ? prev : compact));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          isCompact={isNavCompact}
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
