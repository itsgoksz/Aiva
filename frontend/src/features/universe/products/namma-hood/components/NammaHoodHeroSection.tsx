import { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, MapPin, CheckCircle2, ChevronRight, Camera, ExternalLink } from 'lucide-react';

interface CivicSpot {
  id: string;
  ward: string;
  address: string;
  coords: string;
  timeAgo: string;
  severity: 'Critical' | 'Severe' | 'Moderate';
  description: string;
  initialSupports: number;
  guardian: string;
  guardianXp: number;
  beforeLabel: string;
  afterLabel: string;
}

const SAMPLE_SPOTS: CivicSpot[] = [
  {
    id: 'indiranagar',
    ward: 'Ward 112 • Indiranagar',
    address: '100ft Road, Behind Metro Pillar 84',
    coords: '12.9784° N, 77.6408° E',
    timeAgo: '2 hours ago',
    severity: 'Critical',
    description: 'Commercial debris & illegal plastic dumping blocking pedestrian footpath and storm drain entrance.',
    initialSupports: 24,
    guardian: 'Kavitha R.',
    guardianXp: 1840,
    beforeLabel: 'Reported: Unregulated commercial waste pile',
    afterLabel: 'Restored: Sunday neighborhood drive cleaned & cleared (+120 Eco Points)'
  },
  {
    id: 'hsr',
    ward: 'Ward 174 • HSR Layout Sector 2',
    address: '19th Main Road, Near Park Corner',
    coords: '12.9116° N, 77.6474° E',
    timeAgo: '4 hours ago',
    severity: 'Severe',
    description: 'Overflowing wet waste bin and garden trimming backlog attracting stray pack on school route.',
    initialSupports: 31,
    guardian: 'Arun Kumar',
    guardianXp: 2150,
    beforeLabel: 'Reported: Overflowing wet waste container',
    afterLabel: 'Restored: Resident cleanup squad cleared & placed potted plants (+95 Eco Points)'
  }
];

interface NammaHoodHeroSectionProps {
  onOpenDemo: () => void;
}

export default function NammaHoodHeroSection({ onOpenDemo }: NammaHoodHeroSectionProps) {
  const [selectedSpot, setSelectedSpot] = useState<CivicSpot>(SAMPLE_SPOTS[0]);
  const [supportCount, setSupportCount] = useState<number>(selectedSpot.initialSupports);
  const [hasSupported, setHasSupported] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSelectSpot = (spot: CivicSpot) => {
    setSelectedSpot(spot);
    setSupportCount(spot.initialSupports);
    setHasSupported(false);
    setSliderPosition(50);
  };

  const handleToggleSupport = () => {
    if (!hasSupported) {
      setSupportCount(prev => prev + 1);
      setHasSupported(true);
    } else {
      setSupportCount(prev => prev - 1);
      setHasSupported(false);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#060807]">
      {/* Background Urban Night Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[15%] left-[20%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-25"
          style={{ background: 'radial-gradient(circle, #10B981 0%, rgba(16, 185, 129, 0) 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[15%] w-[550px] h-[550px] rounded-full blur-[160px] opacity-20"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, rgba(245, 158, 11, 0) 70%)' }}
        />
        {/* Subtle Street Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Vision & Narrative */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md mb-6 shadow-sm shadow-emerald-950/50"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-emerald-300">
                GAMIFIED CIVIC CLEANUP & REWARDS PLATFORM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08] mb-6"
            >
              Spot the trash. Clean it together.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-emerald-300 to-amber-300 font-semibold">
                Earn breakfast on the house.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8"
            >
              Don't wait months for a government portal to reply. Snap a 5-second geotag of illegal dumping, mobilize your neighbors, clean it up yourselves, and post verified before/after photos. Earn SplitXP and Eco Points redeemable for real discounts on morning idlis, filter coffee, and neighborhood cafe treats.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href="https://nammavoice.nammauniverse.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-black transition-all duration-200 hover:bg-[#059669] hover:scale-[1.02] active:opacity-90 flex items-center gap-2 cursor-pointer shadow-lg"
                style={{
                  backgroundColor: "#10B981",
                  boxShadow: "0 8px 24px rgba(16, 185, 129, 0.35)",
                }}
              >
                <span>Launch Live App</span>
                <ExternalLink size={16} className="text-black" />
              </a>

              <button
                onClick={onOpenDemo}
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-neutral-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Camera size={16} className="text-emerald-400" />
                <span>Simulate 5-Sec Report</span>
              </button>

              <a
                href="#territories"
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>View Ward Territories & Guardians</span>
                <ChevronRight size={16} />
              </a>
            </motion.div>

            {/* Spec Metrics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-4 border-t border-white/[0.08] text-left"
            >
              <div>
                <div className="text-xl font-bold font-mono text-emerald-400">5 seconds</div>
                <div className="text-xs text-neutral-400 mt-0.5">To snap & geotag</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-amber-400">SplitXP</div>
                <div className="text-xs text-neutral-400 mt-0.5">Shared with spotter & crew</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-white">Eco Points</div>
                <div className="text-xs text-neutral-400 mt-0.5">Breakfast discounts & perks</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Real Civic Card Simulator */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl p-6 sm:p-7 bg-[#0A110D]/90 border border-emerald-500/25 backdrop-blur-xl shadow-2xl shadow-emerald-950/40"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.07]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#10B981]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      COMMUNITY CIVIC CARD
                    </div>
                    <div className="text-xs text-neutral-400">Select active neighborhood issue:</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-[11px] font-mono text-red-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>{selectedSpot.severity}</span>
                </div>
              </div>

              {/* Spot Switchers */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {SAMPLE_SPOTS.map((s) => {
                  const isSelected = selectedSpot.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectSpot(s)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer border ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-400/50 text-white shadow-sm'
                          : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="truncate font-semibold">{s.ward.split('•')[1]?.trim() || s.ward}</div>
                      <div className="text-[10px] font-mono opacity-60 mt-0.5">{s.timeAgo}</div>
                    </button>
                  );
                })}
              </div>

              {/* Location & GPS Geotag Details */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] mb-4">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                  <span className="text-emerald-400 font-medium">{selectedSpot.ward}</span>
                  <span>{selectedSpot.coords}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-2">
                  {selectedSpot.address}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  {selectedSpot.description}
                </p>
              </div>

              {/* Before / After Interactive Slider */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                  <span className="text-amber-400 font-medium">BEFORE / AFTER RESTORATION</span>
                  <span>Drag slider to inspect</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] h-36 bg-black">
                  {/* Before Side */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-neutral-900 to-black p-4 flex flex-col justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 w-fit">
                      REPORTED ISSUE
                    </span>
                    <p className="text-xs text-neutral-300 max-w-[200px]">
                      {selectedSpot.beforeLabel}
                    </p>
                  </div>

                  {/* After Side (Clipped by sliderPosition) */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-neutral-900 to-black p-4 flex flex-col justify-between"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                  >
                    <div className="flex justify-end">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-fit flex items-center gap-1">
                        <CheckCircle2 size={11} />
                        <span>CLEARED & RESTORED</span>
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <p className="text-xs text-emerald-200 text-right max-w-[220px]">
                        {selectedSpot.afterLabel}
                      </p>
                    </div>
                  </div>

                  {/* Slider Control Divider */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md cursor-ew-resize"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center shadow-lg">
                      ↔
                    </div>
                  </div>

                  {/* Hidden Range Input for tactile slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  />
                </div>
              </div>

              {/* Community Megaphone Upvote Action & Ward Guardian */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] gap-3">
                <button
                  onClick={handleToggleSupport}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                    hasSupported
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30 scale-[1.02]'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.08]'
                  }`}
                >
                  <Megaphone size={14} className={hasSupported ? 'text-black fill-black' : 'text-amber-400'} />
                  <span>
                    {hasSupported ? 'Backed by you!' : 'Support with Megaphone'} ({supportCount})
                  </span>
                </button>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-neutral-400">Ward Guardian</div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <span>{selectedSpot.guardian}</span>
                    <span className="text-[10px] font-mono text-neutral-500">({selectedSpot.guardianXp} XP)</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
