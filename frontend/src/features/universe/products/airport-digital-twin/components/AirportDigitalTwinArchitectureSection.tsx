import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

interface ArchitectureStep {
  step: string;
  title: string;
  technology: string;
  description: string;
  codeSnippet: string;
}

const ARCHITECTURE_STEPS: ArchitectureStep[] = [
  {
    step: '01',
    title: 'WGS84 Geodetic to ENU Tangent Projection',
    technology: 'Spatial Matrix Math & Cartography',
    description: 'Aircraft transponders broadcast WGS84 GPS latitude, longitude, and barometric altitude. To render them in a millimeter-accurate Three.js local coordinate system, positions are converted to Earth-Centered Earth-Fixed (ECEF) and then projected onto a local East-North-Up (ENU) tangent plane centered at Kempegowda Aerodrome Reference Point (13.1986° N, 77.7066° E).',
    codeSnippet: `// Geodetic (Lat, Lon, Alt) -> ECEF -> Local ENU
function geodeticToEnu(lat: number, lon: number, altMeters: number) {
  const ecef = wgs84ToEcef(lat, lon, altMeters);
  const delta = [ecef.x - ARP_ECEF.x, ecef.y - ARP_ECEF.y, ecef.z - ARP_ECEF.z];
  
  // Tangent rotation at Kempegowda ARP (VOBL)
  const east  = -sinLon * delta[0] + cosLon * delta[1];
  const north = -sinLat * cosLon * delta[0] - sinLat * sinLon * delta[1] + cosLat * delta[2];
  const up    =  cosLat * cosLon * delta[0] + cosLat * sinLon * delta[1] + sinLat * delta[2];
  return new THREE.Vector3(east, up, -north);
}`
  },
  {
    step: '02',
    title: 'Streaming 3D Photorealistic Tiles Engine',
    technology: 'Three.js • React Three Fiber • 3d-tiles-renderer',
    description: 'Instead of loading static gigabyte models, the engine streams Google Photorealistic 3D Tiles dynamically. As the observer camera switches between the 65m ATC Tower view and Runway 09R threshold, the renderer performs Screen-Space Error (SSE) evaluation to dynamically stream and evict hierarchical octree tiles at 60 FPS.',
    codeSnippet: `// 3D Tiles streaming with Camera Frustum SSE
const tilesRenderer = new TilesRenderer(GOOGLE_3D_TILES_URL);
tilesRenderer.setCamera(camera);
tilesRenderer.setResolution(window.innerWidth, window.innerHeight);
tilesRenderer.errorTarget = 6.0; // Sub-decimeter geometric resolution
tilesRenderer.maxDepth = 18;

// Transform Google Tiles root into VOBL local frame
tilesRenderer.group.rotation.x = -Math.PI / 2;
scene.add(tilesRenderer.group);`
  },
  {
    step: '03',
    title: 'High-Throughput ADS-B Ingestion & Filtering',
    technology: 'Python FastAPI • Async ADS-B One API • Kalman Dead Reckoning',
    description: 'The backend microservice polls ADS-B One transponder feeds within a 100km radius of Bengaluru. Between 1Hz transponder pings, a dead reckoning filter calculates instantaneous ground speed and heading vectors to interpolate smooth, stutter-free flight paths.',
    codeSnippet: `// FastAPI Async ADS-B Stream Filter
@app.get("/api/flights/vobl")
async def get_active_aerodrome_flights():
    raw_adsb = await adsb_client.fetch_radius(lat=13.1986, lon=77.7066, radius_km=100)
    flights = []
    for ac in raw_adsb:
        enu_pos = compute_enu_vector(ac.lat, ac.lon, ac.alt_baro)
        smooth_vector = kalman_filter.update(ac.hex, enu_pos, ac.track, ac.gs)
        flights.append({"callsign": ac.flight, "coords": smooth_vector, "phase": detect_phase(enu_pos)})
    return flights`
  },
  {
    step: '04',
    title: 'Dynamic ICAO Lighting & Particle Shaders',
    technology: 'Custom GLSL Shaders • Instanced Mesh • WebGL',
    description: 'Aircraft wingtip strobes, fuselage beacons, and PAPI glide slope visual aids are driven by GLSL fragment shaders with physical time synchrony. Tire touchdown smoke particle bursts are dynamically computed when wheels touch the Runway 09R threshold elevation.',
    codeSnippet: `// GLSL Strobe Pulse Shader (1.5s ICAO Annex 14 cycle)
uniform float uTime;
varying vec3 vNormal;

void main() {
    float cycle = mod(uTime, 1.5);
    // Double flash pulse signature
    float flash1 = smoothstep(0.0, 0.04, cycle) * (1.0 - smoothstep(0.04, 0.08, cycle));
    float flash2 = smoothstep(0.12, 0.16, cycle) * (1.0 - smoothstep(0.16, 0.20, cycle));
    float intensity = (flash1 + flash2) * 8.0;
    gl_FragColor = vec4(vec3(1.0, 1.0, 1.0) * intensity, 1.0);
}`
  }
];

export default function AirportDigitalTwinArchitectureSection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = ARCHITECTURE_STEPS[activeStepIndex];

  return (
    <section className="relative py-28 bg-[#050811] text-white overflow-hidden border-t border-white/[0.04]">
      {/* Background Subtle Grid & Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[190px] opacity-15"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, rgba(0, 229, 255, 0) 70%)' }}
        />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #00E5FF 1px, transparent 1px),
                              linear-gradient(to bottom, #00E5FF 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-[#00E5FF] mb-4">
            <Cpu size={12} />
            <span>FULL-STACK ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
            How the Aerodrome Twin coordinates real-time spatial reality.
          </h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            Bridging raw transponder RF packets, geodetic geodesy math, streaming 3D tiles, and GLSL physical lighting shaders into a synchronized 60 FPS viewport.
          </p>
        </div>

        {/* Step Selector Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-10">
          {ARCHITECTURE_STEPS.map((item, idx) => {
            const isSelected = idx === activeStepIndex;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF]/50 text-white shadow-[0_0_25px_rgba(0,229,255,0.15)]'
                    : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#00E5FF]' : 'text-neutral-500'}`}>
                    STAGE {item.step}
                  </span>
                  {isSelected && <Zap size={14} className="text-[#00E5FF]" />}
                </div>
                <div className="font-medium text-sm text-white line-clamp-1">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Card */}
        <motion.div
          key={activeStep.step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-8 md:p-10 rounded-3xl bg-black/60 border border-white/[0.08] backdrop-blur-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Explanation */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider block mb-1">
                  STAGE {activeStep.step} • {activeStep.technology}
                </span>
                <h3 className="text-2xl font-semibold text-white">
                  {activeStep.title}
                </h3>
              </div>

              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {activeStep.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs font-mono">
                <div className="text-neutral-400 uppercase text-[10px]">Key Architecture Advantage</div>
                <div className="text-cyan-200 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00E5FF] shrink-0" />
                  <span>Sub-millimeter alignment across runways, aprons, and taxiways</span>
                </div>
                <div className="text-cyan-200 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#00E5FF] shrink-0" />
                  <span>Zero runtime GC stutter via instanced geometry & shader compute</span>
                </div>
              </div>
            </div>

            {/* Right: Code Snippet */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#03060E]">
                <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-neutral-400">vobl_engine.ts</span>
                  </div>
                  <span className="text-[11px] text-[#00E5FF]">PRODUCTION CODE</span>
                </div>
                <pre className="p-5 text-xs font-mono text-cyan-100/90 overflow-x-auto leading-relaxed">
                  <code>{activeStep.codeSnippet}</code>
                </pre>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
