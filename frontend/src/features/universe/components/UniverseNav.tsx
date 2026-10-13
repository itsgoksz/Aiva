/**
 * UniverseNav — High-Performance Dual-HUD Navigation Architecture
 * 
 * Features:
 *  1. Top Floating Glass Island: Minimalist pill HUD with active scroll-spy indicators.
 *  2. Bottom-Right Sector Matrix Dock: Command-deck product fleet teleporter with
 *     hotkeys [1-6], instant section jumps, and tactile Web Audio chime synthesis.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  X, 
  ArrowUpRight, 
  Volume2, 
  VolumeX, 
  Compass, 
  ExternalLink
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  emoji: string;
  color: string;
  route: string;
  keyNumber: string;
  liveUrl?: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'aiva',
    name: 'Aiva',
    tagline: 'Autonomous 24/7 Voice AI Receptionist',
    category: 'Enterprise Voice AI',
    emoji: '🧠',
    color: '#A66B8E',
    route: '/products/aiva',
    keyNumber: '1'
  },
  {
    id: 'wellora',
    name: 'Wellora',
    tagline: 'Voice Nutrition & Zero-Guilt Companion',
    category: 'Metabolic Health',
    emoji: '🌿',
    color: '#2ECC71',
    route: '/products/wellora',
    keyNumber: '2'
  },
  {
    id: 'ev-copilot',
    name: 'EV Copilot',
    tagline: 'Aero Drag Physics & Mountain Range Co-Pilot',
    category: 'Automotive Intelligence',
    emoji: '⚡',
    color: '#6D5EF7',
    route: '/products/ev-copilot',
    keyNumber: '3'
  },
  {
    id: 'casamoto',
    name: 'CasaMoto',
    tagline: 'Motorcycle Telemetry & Live Ride Radar',
    category: 'Two-Wheeler OS',
    emoji: '🏍️',
    color: '#FF6B00',
    route: '/products/casamoto',
    keyNumber: '4'
  },
  {
    id: 'airport-digital-twin',
    name: 'Airport 3D Twin',
    tagline: 'Kempegowda (VOBL) Spatial Aerodrome Simulator',
    category: 'Aviation Telemetry',
    emoji: '🛫',
    color: '#00E5FF',
    route: '/products/airport-digital-twin',
    keyNumber: '5'
  },
  {
    id: 'namma-hood',
    name: 'Namma Hood',
    tagline: 'Gamified Cleanups, SplitXP & Breakfast Perks',
    category: 'Community Civic Action',
    emoji: '📢',
    color: '#10B981',
    route: '/products/namma-hood',
    keyNumber: '6',
    liveUrl: 'https://nammavoice.nammauniverse.in'
  }
];

const SECTIONS = [
  { id: 'singularity', label: '01 // Singularity', target: '#singularity' },
  { id: 'philosophy', label: '02 // Manifesto', target: '#philosophy' },
  { id: 'products', label: '03 // Products', target: '#products' },
  { id: 'constellation', label: '04 // Constellation', target: '#constellation' }
];

// Lightweight, pure Web Audio API sound synthesizer
const playTactileTone = (freq = 720, type: OscillatorType = 'sine', duration = 0.05) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio context may be restricted by autoplay policy
  }
};

export default function UniverseNav() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('singularity');
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const matrixRef = useRef<HTMLDivElement>(null);

  // Play sound if enabled
  const triggerSound = (freq = 720) => {
    if (soundEnabled) {
      playTactileTone(freq);
    }
  };

  // ScrollSpy listener
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHasScrolled(y > 80);

      const philosophyEl = document.getElementById('philosophy');
      const productsEl = document.getElementById('products');
      const constellationEl = document.getElementById('constellation');

      const vh = window.innerHeight;
      const mid = y + vh * 0.45;

      if (constellationEl && constellationEl.offsetTop <= mid) {
        setActiveSection('constellation');
      } else if (productsEl && productsEl.offsetTop <= mid) {
        setActiveSection('products');
      } else if (philosophyEl && philosophyEl.offsetTop <= mid) {
        setActiveSection('philosophy');
      } else {
        setActiveSection('singularity');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keyboard Shortcuts (⌘K, Esc, 1-6)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Matrix via ⌘K or Ctrl+K or 'm' (when not inside input)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsMatrixOpen(prev => !prev);
        triggerSound(840);
        return;
      }

      if (e.key === 'Escape' && isMatrixOpen) {
        setIsMatrixOpen(false);
        triggerSound(500);
        return;
      }

      // If Matrix is open, pressing 1-6 jumps to product
      if (isMatrixOpen && ['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const num = parseInt(e.key, 10);
        const prod = PRODUCTS[num - 1];
        if (prod) {
          triggerSound(920);
          setIsMatrixOpen(false);
          navigate(prod.route);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMatrixOpen, soundEnabled, navigate]);

  // Click outside matrix to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (matrixRef.current && !matrixRef.current.contains(e.target as Node)) {
        setIsMatrixOpen(false);
      }
    };
    if (isMatrixOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMatrixOpen]);

  const scrollToAnchor = (target: string) => {
    triggerSound(680);
    const id = target.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getActiveProductHighlight = () => {
    if (activeSection === 'products') return '#6D5EF7';
    if (activeSection === 'philosophy') return '#EC89B5';
    if (activeSection === 'constellation') return '#00E5FF';
    return '#10B981';
  };

  return (
    <>
      {/* ── 1. TOP SLEEK FLOATING ISLAND NAVBAR ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none transition-all duration-300 ${
          hasScrolled ? 'translate-y-0 opacity-100' : 'opacity-95'
        }`}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Left: Brand Identity & Active Status Pill */}
          <Link
            to="/"
            onClick={() => {
              triggerSound(600);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 px-3.5 py-2 rounded-full border border-white/10 bg-[#070913]/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/15 flex items-center justify-center bg-black/40">
              <img 
                src="/logo.png" 
                alt="Namma Universe" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            
            <span className="font-display font-semibold text-xs sm:text-sm tracking-wider uppercase text-white group-hover:text-cyan-300 transition-colors">
              Namma Universe
            </span>

            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-white/10 text-[10px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-widest uppercase">6 LIVE</span>
            </div>
          </Link>

          {/* Center: ScrollSpy Navigation Capsule (Desktop & Tablet) */}
          <nav className="hidden sm:flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-[#070913]/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToAnchor(sec.target)}
                  onMouseEnter={() => triggerSound(800)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/20 shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{sec.label.split('//')[1]?.trim() || sec.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Sound Toggle + Matrix Launcher */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(prev => {
                  const next = !prev;
                  triggerSound(next ? 880 : 440);
                  return next;
                });
              }}
              title={soundEnabled ? 'Mute Interface Audio' : 'Enable Tactile Chimes'}
              className="w-9 h-9 rounded-full border border-white/10 bg-[#070913]/70 backdrop-blur-2xl flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/25 transition-all cursor-pointer"
            >
              {soundEnabled ? <Volume2 size={14} className="text-cyan-400" /> : <VolumeX size={14} />}
            </button>

            {/* Launch Matrix Deck Pill */}
            <button
              onClick={() => {
                setIsMatrixOpen(prev => !prev);
                triggerSound(isMatrixOpen ? 500 : 840);
              }}
              className="px-3.5 py-2 rounded-full border border-white/10 hover:border-violet-400/40 bg-[#070913]/80 backdrop-blur-2xl text-xs font-mono text-white flex items-center gap-2 transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(109,94,247,0.3)] group"
            >
              <Compass size={13} className="text-violet-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-semibold hidden sm:inline">MATRIX</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10 font-mono">
                ⌘K
              </span>
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── 2. BOTTOM-RIGHT FLOATING SECTOR MATRIX DOCK ── */}
      <div 
        ref={matrixRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
      >
        {/* Expanded Matrix Command Deck */}
        <AnimatePresence>
          {isMatrixOpen && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.95 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="w-[calc(100vw-2rem)] sm:w-[410px] mb-3 rounded-3xl p-5 border border-white/15 bg-[#080B16]/95 backdrop-blur-2xl shadow-[0_24px_70px_-10px_rgba(0,0,0,0.9),0_0_50px_rgba(109,94,247,0.18)] text-white overflow-hidden relative"
            >
              {/* Subtle Ambient Radial Glow */}
              <div 
                className="absolute top-0 right-0 w-44 h-44 rounded-full blur-[80px] pointer-events-none opacity-20"
                style={{ background: getActiveProductHighlight() }}
              />

              {/* Deck Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300">
                    <Layers size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-white">
                      UNIVERSE SYSTEMS MATRIX
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      6 Autonomous Products • Real-Time Teleport
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMatrixOpen(false);
                    triggerSound(500);
                  }}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Product Teleporter List */}
              <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      triggerSound(900);
                      setIsMatrixOpen(false);
                      navigate(prod.route);
                    }}
                    onMouseEnter={() => triggerSound(760)}
                    className="w-full p-2.5 rounded-2xl border border-white/[0.05] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] transition-all flex items-center justify-between group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 border transition-transform group-hover:scale-105"
                        style={{ 
                          backgroundColor: `${prod.color}15`, 
                          borderColor: `${prod.color}40`,
                        }}
                      >
                        <span>{prod.emoji}</span>
                      </div>
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {prod.name}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-neutral-400 uppercase">
                            {prod.category}
                          </span>
                          {prod.liveUrl && (
                            <a
                              href={prod.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1 shrink-0"
                              title="Open live web app"
                            >
                              <span>LIVE APP</span>
                              <ExternalLink size={9} />
                            </a>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5 font-normal">
                          {prod.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="hidden sm:inline text-[9px] font-mono text-neutral-500 px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                        [{prod.keyNumber}]
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-white/15 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                        <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Fast Section Jumps & Hotkey Legend */}
              <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 uppercase">Jump:</span>
                  <button 
                    onClick={() => scrollToAnchor('#singularity')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Top
                  </button>
                  <span>•</span>
                  <button 
                    onClick={() => scrollToAnchor('#philosophy')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Manifesto
                  </button>
                  <span>•</span>
                  <button 
                    onClick={() => scrollToAnchor('#products')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Worlds
                  </button>
                </div>

                <span className="text-neutral-500 hidden sm:inline">
                  Press [1–6] or [Esc]
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Capsule Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setIsMatrixOpen(prev => !prev);
            triggerSound(isMatrixOpen ? 500 : 840);
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-full border transition-all cursor-pointer backdrop-blur-2xl shadow-2xl ${
            isMatrixOpen
              ? 'bg-violet-600 border-violet-400 text-white shadow-[0_0_30px_rgba(109,94,247,0.5)]'
              : 'bg-[#080B16]/90 border-white/15 text-white hover:border-cyan-400/50 shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
          }`}
        >
          {/* Beacon radar ring */}
          <div className="relative flex items-center justify-center">
            <span 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getActiveProductHighlight() }}
            />
            <span 
              className="absolute w-5 h-5 rounded-full animate-ping opacity-75"
              style={{ backgroundColor: getActiveProductHighlight() }}
            />
          </div>

          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 leading-none">
              SECTOR RADAR
            </div>
            <div className="text-xs font-mono font-bold text-white mt-0.5 leading-none flex items-center gap-1.5">
              <span>{activeSection.toUpperCase()}</span>
              <span className="text-neutral-500 font-normal">[6]</span>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-neutral-300 ml-1">
            <Layers size={13} />
          </div>
        </motion.button>
      </div>
    </>
  );
}
