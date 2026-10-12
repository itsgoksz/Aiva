import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Radio, 
  Sparkles 
} from 'lucide-react';

interface Pillar {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  highlight: string;
  technicalDetails: string[];
}

const PILLARS: Pillar[] = [
  {
    id: 'tiles',
    badge: 'GEOSPATIAL FOUNDATION',
    title: 'Photorealistic 3D Aerodrome Mesh',
    tagline: 'Google 3D Tiles streamed with sub-decimeter ground precision.',
    description: 'The digital twin streams high-resolution photorealistic 3D tiles covering all 4,000 acres of Kempegowda International Airport. From the iconic undulating bamboo roof of Terminal 2 to the cargo aprons and taxiway holding positions, geometry is parsed via hierarchical 3D tiles octrees for fluid 60 FPS rendering.',
    specs: [
      { label: 'Aerodrome Coverage', value: '4,000+ Acres' },
      { label: 'Mesh Resolution', value: 'Sub-Decimeter' },
      { label: 'Renderer Engine', value: 'Three.js / WebGL' },
      { label: 'LOD Streaming', value: 'Hierarchical Octree' }
    ],
    highlight: 'Includes procedural bamboo bell chandeliers and indoor flora for Terminal 2 (Terminal in a Garden).',
    technicalDetails: [
      'Level-of-Detail (LOD) distance culling maintains memory under 350 MB',
      'Exact 4,000m runway dimensions for 09L/27R and 09R/27L with real slope grades',
      'Contact stands (Gates 1-64) with individual pushback safety envelopes'
    ]
  },
  {
    id: 'adsb',
    badge: 'LIVE INGESTION',
    title: 'Sub-Second ADS-B Transponder Stream',
    tagline: 'Continuous 100km radius telemetry with dead-reckoning vectors.',
    description: 'Arriving and departing flights from airlines like IndiGo, Air India, Emirates, and Akasa Air stream live into the twin. Transponder packets (ICAO 24-bit address, barometric altitude, ground speed, squawk, track) are ingested asynchronously via FastAPI and converted from geodetic WGS84 to local East-North-Up space.',
    specs: [
      { label: 'Radar Radius', value: '100 km (VOBL)' },
      { label: 'Update Frequency', value: '1 Hz Transponder' },
      { label: 'Interpolation', value: 'Kalman Dead Reckoning' },
      { label: 'Coordinate Frame', value: 'WGS84 → ENU Tangent' }
    ],
    highlight: 'Transforms geodetic latitudes and longitudes to local Cartesian coordinates centered on VOBL ARP (13.1986° N, 77.7066° E).',
    technicalDetails: [
      'Sub-second dead reckoning eliminates jitter between transponder bursts',
      'Automatic squawk emergency detection (7700, 7600, 7500)',
      'Dual-runway glideslope vector tracking for simultaneous parallel arrivals'
    ]
  },
  {
    id: 'lighting',
    badge: 'ICAO COMPLIANCE',
    title: 'Photorealistic Aircraft & Runway Lighting',
    tagline: 'FAA & ICAO Annex 14 compliant strobe, beacon, and PAPI shaders.',
    description: 'Lighting is not static textures—it is driven by custom GLSL shaders simulating exact physical flash intervals and optical angles. Wingtip strobes flash in synchronized 1.5-second double pulses, while PAPI light arrays shift realistically between red and white depending on the observer glideslope angle.',
    specs: [
      { label: 'Strobe Flash Period', value: '1.5s Synchronized' },
      { label: 'Anti-Collision Beacon', value: '1.0s Red Fuselage' },
      { label: 'PAPI Slope Tolerance', value: '3.0° Precision Angle' },
      { label: 'Volumetric Landing', value: 'Below 10,000 ft Active' }
    ],
    highlight: 'Volumetric light cones illuminate runway threshold asphalt during low-visibility and night landings.',
    technicalDetails: [
      'Port wing red (110° arc), Starboard wing green (110° arc), Stern white (140° arc)',
      'Four-box PAPI glideslope guidance: 2 Red / 2 White on-slope visual simulation',
      'Taxiway emerald centerline and runway blue edge lights with distance bloom'
    ]
  },
  {
    id: 'physics',
    badge: 'PHYSICS & ATMOSPHERE',
    title: 'Ground Dynamics & Solar Synchronization',
    tagline: 'Dynamic touchdown tire smoke particles and Bengaluru solar scattering.',
    description: 'When an A320neo or Dreamliner touches down on Runway 09R, the simulator triggers dynamic particle bursts simulating tire friction smoke against tarmac. Environmental illumination matches real-world solar azimuth and elevation calculated from Bengaluru coordinates, alongside live METAR rain scattering.',
    specs: [
      { label: 'Touchdown FX', value: 'Tire Smoke Compute' },
      { label: 'Solar Azimuth', value: 'Real-Time Sun Position' },
      { label: 'Weather Source', value: 'Open-Meteo & METAR' },
      { label: 'Surface Shaders', value: 'Monsoon Wetness Specular' }
    ],
    highlight: 'Realistic contact shadows eliminate floating aircraft illusions on runway and apron.',
    technicalDetails: [
      'Reverse thrust bucket actuation and wing ground-spoilers deploy upon touchdown',
      'Atmospheric Rayleigh and Mie scattering synchronized with local Bengaluru time (IST)',
      'Surface wetness and puddle specular reflection shaders during monsoon downpours'
    ]
  }
];

export default function AirportDigitalTwinSpatialTwinSection() {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('tiles');
  const activePillar = PILLARS.find(p => p.id === selectedPillarId) || PILLARS[0];

  return (
    <section className="relative py-28 bg-[#050811] text-white overflow-hidden border-t border-white/[0.04]">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -top-[10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[170px] opacity-20"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, rgba(0, 229, 255, 0) 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-15"
          style={{ background: 'radial-gradient(circle, #0284C7 0%, rgba(2, 132, 199, 0) 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-[#00E5FF] mb-4">
            <Box size={12} />
            <span>FOUR SPATIAL PILLARS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
            Engineered with millimeter aerospace fidelity.
          </h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            From 100 kilometers out on Delhi and Mumbai arrival corridors to the tire rubber meeting Runway 09R, every subsystem reflects real aerodrome physics.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {PILLARS.map((pillar) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF]/40 text-white shadow-[0_0_25px_rgba(0,229,255,0.15)]'
                    : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {isSelected && (
                  <motion.div 
                    layoutId="pillarActiveIndicator"
                    className="absolute top-0 left-0 w-full h-[2px] bg-[#00E5FF]" 
                  />
                )}
                <div className="text-[10px] font-mono uppercase tracking-wider mb-1.5 text-neutral-400">
                  {pillar.badge}
                </div>
                <div className="font-medium text-sm text-white line-clamp-1">
                  {pillar.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Description & Specs */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00E5FF] mb-2 uppercase tracking-wider">
                    <span>{activePillar.badge}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                    {activePillar.title}
                  </h3>
                  <p className="text-sm font-mono text-cyan-200/70 mb-4">
                    {activePillar.tagline}
                  </p>
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                    {activePillar.description}
                  </p>
                </div>

                {/* Highlight Callout */}
                <div className="p-4 rounded-2xl bg-[#00E5FF]/[0.06] border border-[#00E5FF]/20 flex items-start gap-3">
                  <Sparkles size={16} className="text-[#00E5FF] shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                    {activePillar.highlight}
                  </p>
                </div>

                {/* Technical Bullet Points */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Aerodrome Specifications
                  </div>
                  {activePillar.technicalDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Spec Grid & Telemetry HUD */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-black/60 border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] font-mono text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5 text-[#00E5FF]">
                      <Radio size={12} className="animate-pulse" />
                      VOBL SPATIAL ENGINE
                    </span>
                    <span className="text-emerald-400">ONLINE</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {activePillar.specs.map((spec, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <div className="text-[10px] font-mono text-neutral-500 uppercase">{spec.label}</div>
                        <div className="text-sm font-semibold font-mono text-white mt-1">{spec.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Simulation Graphic */}
                  <div className="mt-4 p-4 rounded-xl bg-[#00E5FF]/[0.03] border border-[#00E5FF]/15 text-xs font-mono space-y-2">
                    <div className="text-neutral-400 text-[11px] uppercase tracking-wider">Coordinates & Tangent Origin</div>
                    <div className="text-[#00E5FF] text-[11px]">ARP: 13° 11' 55" N, 77° 42' 24" E</div>
                    <div className="text-neutral-400 text-[11px]">Elevation: 915m (3,002 ft MSL)</div>
                    <div className="text-neutral-500 text-[10px] pt-1 border-t border-white/[0.05]">
                      Kempegowda International Airport, Bengaluru, India
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
