import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Radio, 
  Wind, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';

interface FlightItem {
  id: string;
  callsign: string;
  airline: string;
  aircraft: string;
  originDest: string;
  phase: string;
  altitude: string;
  speed: string;
  heading: string;
  squawk: string;
  runway: string;
  note: string;
  statusBadge: string;
}

const LIVE_FLIGHTS: FlightItem[] = [
  {
    id: '6e5324',
    callsign: '6E 5324',
    airline: 'IndiGo',
    aircraft: 'Airbus A320neo',
    originDest: 'Delhi (DEL) → Bengaluru (BLR)',
    phase: 'Final Approach • ILS Cat I',
    altitude: '450 ft AGL',
    speed: '142 kts',
    heading: '092°',
    squawk: '2314',
    runway: 'Runway 09R',
    note: 'Established on 3.0° glide slope. Nose gear down, volumetric landing beams illuminating runway threshold.',
    statusBadge: 'Touchdown in 38s'
  },
  {
    id: 'ai506',
    callsign: 'AI 506',
    airline: 'Air India',
    aircraft: 'Boeing 787-8 Dreamliner',
    originDest: 'Bengaluru (BLR) → London (LHR)',
    phase: 'Pushback & Engine Start',
    altitude: 'Ground (3,000 ft MSL)',
    speed: '4 kts',
    heading: '270°',
    squawk: '5102',
    runway: 'Gate 214, Terminal 2',
    note: 'Electric pushback tug active at Terminal 2 bamboo garden apron. Transponder Mode-S beacon flashing.',
    statusBadge: 'Tug Active'
  },
  {
    id: 'ek565',
    callsign: 'EK 565',
    airline: 'Emirates',
    aircraft: 'Boeing 777-300ER',
    originDest: 'Bengaluru (BLR) → Dubai (DXB)',
    phase: 'Holding Point Taxiway N3',
    altitude: 'Ground (3,000 ft MSL)',
    speed: '12 kts',
    heading: '090°',
    squawk: '6441',
    runway: 'Holding for 09R',
    note: 'Taxiing via Alpha parallel taxiway. High-intensity wingtip strobe lights armed for departure rollout.',
    statusBadge: 'Taxiing'
  },
  {
    id: 'qp1382',
    callsign: 'QP 1382',
    airline: 'Akasa Air',
    aircraft: 'Boeing 737 MAX 8',
    originDest: 'Mumbai (BOM) → Bengaluru (BLR)',
    phase: 'Inbound Descent • Doddaballapura',
    altitude: '11,200 ft',
    speed: '250 kts',
    heading: '145°',
    squawk: '3120',
    runway: 'Sequenced 09L',
    note: 'Descending through northern arrivals corridor. ADS-B transponder streaming position every 500ms.',
    statusBadge: 'En-Route'
  }
];

interface AirportDigitalTwinHeroSectionProps {
  onOpenDemo: () => void;
}

export default function AirportDigitalTwinHeroSection({ onOpenDemo }: AirportDigitalTwinHeroSectionProps) {
  const [selectedFlight, setSelectedFlight] = useState<FlightItem>(LIVE_FLIGHTS[0]);
  const [simMode, setSimMode] = useState<'approach' | 'touchdown' | 'lighting'>('approach');

  const speedKts = simMode === 'touchdown' ? 62 : selectedFlight.speed;
  const altitudeFt = simMode === 'touchdown' ? 'Touchdown Ground' : selectedFlight.altitude;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#050811]">
      {/* Aerospace Radar Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[15%] left-[20%] w-[650px] h-[650px] rounded-full blur-[150px] opacity-25"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, rgba(0, 229, 255, 0) 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[15%] w-[550px] h-[550px] rounded-full blur-[160px] opacity-20"
          style={{ background: 'radial-gradient(circle, #0284C7 0%, rgba(2, 132, 199, 0) 70%)' }}
        />
        {/* Runway Approach Vector Lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-950/40 backdrop-blur-md mb-6 shadow-sm shadow-sky-950/50"
            >
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-sky-300">
                KEMPEGOWDA INTERNATIONAL AIRPORT (BLR / VOBL) • 3D SPATIAL DIGITAL TWIN
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08] mb-6"
            >
              The 3D airport twin that sees every runway and arrival in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-sky-300 to-teal-200 font-semibold">
                real time.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8"
            >
              Stream live ADS-B flight transponders, Google 3D photorealistic tiles, and ICAO-compliant aircraft lighting over Kempegowda International Airport. From 100km out down to runway touchdown smoke and Terminal 2 bamboo garden gates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <button
                onClick={onOpenDemo}
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-black bg-[#00E5FF] hover:bg-[#00cbe3] transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer font-semibold"
              >
                <Plane size={16} className="text-black" />
                <span>Launch 3D Twin Simulator</span>
              </button>

              <a
                href="#spatial-twin"
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore 3D Geospatial Tiles</span>
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
                <div className="text-xl font-bold font-mono text-[#00E5FF]">100 km</div>
                <div className="text-xs text-neutral-400 mt-0.5">Live ADS-B radius</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-emerald-400">FAA/ICAO</div>
                <div className="text-xs text-neutral-400 mt-0.5">Compliant lighting</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-white">VOBL / T2</div>
                <div className="text-xs text-neutral-400 mt-0.5">Terminal in a garden</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Live Radar Console */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl p-6 sm:p-7 bg-[#090E1D]/90 border border-sky-500/25 backdrop-blur-xl shadow-2xl shadow-sky-950/50"
            >
              {/* Header HUD Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.07]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-[#00E5FF]">
                    <Radio size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-sky-300 font-semibold">
                      VOBL RADAR AIRSPACE TELEMETRY
                    </div>
                    <div className="text-xs text-neutral-400">Select active flight below:</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/25 text-[11px] font-mono text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{selectedFlight.statusBadge}</span>
                </div>
              </div>

              {/* Flight Selection Pills */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {LIVE_FLIGHTS.map((f) => {
                  const isSelected = selectedFlight.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFlight(f)}
                      className={`px-3 py-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-sky-500/20 border-sky-400/60 text-white font-semibold'
                          : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="truncate font-semibold">{f.callsign} • {f.aircraft.split(' ')[1] || f.aircraft}</div>
                      <div className="text-[10px] font-mono text-[#00E5FF] mt-0.5">{f.runway}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Flight Telemetry Box */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] mb-4">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span className="text-[#00E5FF] font-semibold">{selectedFlight.airline} {selectedFlight.callsign}</span>
                  <span>Squawk: {selectedFlight.squawk}</span>
                </div>

                <div className="text-sm font-semibold text-white mb-1">
                  {selectedFlight.originDest}
                </div>
                <div className="text-xs font-mono text-emerald-400 mb-3">
                  {selectedFlight.phase} • {selectedFlight.runway}
                </div>

                {/* Live Flight Telemetry Gauges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-center">
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Altitude</div>
                    <div className="text-sm font-bold font-mono text-white mt-0.5">{altitudeFt}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Speed</div>
                    <div className="text-sm font-bold font-mono text-[#00E5FF] mt-0.5">{speedKts}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Heading</div>
                    <div className="text-sm font-bold font-mono text-amber-400 mt-0.5">{selectedFlight.heading}</div>
                  </div>
                </div>
              </div>

              {/* Interactive 3D Simulation Controls */}
              <div className="mb-4">
                <div className="text-[11px] font-mono uppercase text-neutral-400 mb-2 flex items-center justify-between">
                  <span>TEST 3D SIMULATOR PHYSICS</span>
                  <span className="text-[#00E5FF]">Touchdown & Lighting</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSimMode('approach')}
                    className={`py-2 px-2 rounded-xl text-xs font-mono transition-all border cursor-pointer text-center ${
                      simMode === 'approach'
                        ? 'bg-sky-500/25 border-sky-400/60 text-white font-semibold'
                        : 'bg-white/[0.03] border-white/[0.06] text-neutral-400'
                    }`}
                  >
                    ILS Glide (3.0°)
                  </button>

                  <button
                    onClick={() => setSimMode('touchdown')}
                    className={`py-2 px-2 rounded-xl text-xs font-mono transition-all border cursor-pointer text-center ${
                      simMode === 'touchdown'
                        ? 'bg-amber-500 text-black font-bold border-amber-400'
                        : 'bg-white/[0.03] border-white/[0.06] text-neutral-400'
                    }`}
                  >
                    Touchdown Smoke
                  </button>

                  <button
                    onClick={() => setSimMode('lighting')}
                    className={`py-2 px-2 rounded-xl text-xs font-mono transition-all border cursor-pointer text-center ${
                      simMode === 'lighting'
                        ? 'bg-[#00E5FF] text-black font-bold border-[#00E5FF]'
                        : 'bg-white/[0.03] border-white/[0.06] text-neutral-400'
                    }`}
                  >
                    ICAO Strobes
                  </button>
                </div>
              </div>

              {/* Note / Atmospheric Observation */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300 flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-[#00E5FF] mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {simMode === 'touchdown'
                    ? 'Tire smoke particle burst deployed on Runway 09R center line. Reverse thrust buckets deployed, spoilers extended.'
                    : simMode === 'lighting'
                    ? 'Wingtip strobes synchronizing 1.5s flash cycle. Red navigation light on port wing, green on starboard wing.'
                    : selectedFlight.note}
                </span>
              </div>

              {/* Live METAR Ticker */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Wind size={12} />
                  <span>VOBL METAR 260° @ 8 kts</span>
                </span>
                <span>QNH 1014 hPa • 24°C</span>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
