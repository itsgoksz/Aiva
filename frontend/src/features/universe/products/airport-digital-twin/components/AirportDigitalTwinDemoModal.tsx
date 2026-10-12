import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plane, 
  Radio, 
  Wind, 
  CloudRain, 
  Sparkles, 
  RotateCcw, 
  Play, 
  Pause, 
  Flame 
} from 'lucide-react';

interface AirportDigitalTwinDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SimulatedFlight {
  id: string;
  callsign: string;
  airline: string;
  aircraft: string;
  route: string;
  runway: string;
  squawk: string;
  gate: string;
}

const FLIGHTS: SimulatedFlight[] = [
  {
    id: '6e5324',
    callsign: '6E 5324',
    airline: 'IndiGo',
    aircraft: 'Airbus A320neo',
    route: 'DEL → BLR (Bengaluru)',
    runway: 'Runway 09R',
    squawk: '2314',
    gate: 'Stand 24 • Terminal 1'
  },
  {
    id: 'ai506',
    callsign: 'AI 506',
    airline: 'Air India',
    aircraft: 'Boeing 787-8 Dreamliner',
    route: 'BOM → BLR (Bengaluru)',
    runway: 'Runway 09R',
    squawk: '4421',
    gate: 'Stand 38 • Terminal 2'
  },
  {
    id: 'ek564',
    callsign: 'EK 564',
    airline: 'Emirates',
    aircraft: 'Boeing 777-300ER',
    route: 'DXB → BLR (Bengaluru)',
    runway: 'Runway 09L',
    squawk: '7105',
    gate: 'Stand 44 • Terminal 2'
  },
  {
    id: 'qp1302',
    callsign: 'QP 1302',
    airline: 'Akasa Air',
    aircraft: 'Boeing 737 MAX 8',
    route: 'MAA → BLR (Bengaluru)',
    runway: 'Runway 27R',
    squawk: '1540',
    gate: 'Stand 19 • Terminal 1'
  }
];

type CameraMode = 'tower' | 'spotter' | 'cockpit' | 'chase' | 'apron';
type TimeOfDay = 'dawn' | 'noon' | 'sunset' | 'night';

export default function AirportDigitalTwinDemoModal({ isOpen, onClose }: AirportDigitalTwinDemoModalProps) {
  const [selectedFlight, setSelectedFlight] = useState<SimulatedFlight>(FLIGHTS[0]);
  const [cameraMode, setCameraMode] = useState<CameraMode>('tower');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
  const [isRainy, setIsRainy] = useState<boolean>(false);
  const [strobesEnabled, setStrobesEnabled] = useState<boolean>(true);
  
  // Interactive Approach & Touchdown Physics State
  const [distanceNm, setDistanceNm] = useState<number>(3.2); // NM to runway threshold
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [touchdownBurst, setTouchdownBurst] = useState<boolean>(false);
  const [reverseThrust, setReverseThrust] = useState<boolean>(false);
  const [brakeTemp, setBrakeTemp] = useState<number>(185); // Celsius

  // Auto-approach simulation tick
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setDistanceNm(prev => {
          if (prev <= 0.05) {
            // Trigger touchdown!
            setTouchdownBurst(true);
            setReverseThrust(true);
            setBrakeTemp(t => Math.min(480, t + 40));
            setIsPlaying(false);
            return 0.0;
          }
          return Math.max(0, +(prev - 0.15).toFixed(2));
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Derived altitude and speed
  const altitudeFt = distanceNm === 0 ? 0 : Math.round(distanceNm * 318 + 50); // 3-degree glide slope
  const indicatedAirspeed = distanceNm === 0 ? (reverseThrust ? 58 : 65) : Math.round(140 + distanceNm * 3.5);
  const verticalSpeedFpm = distanceNm === 0 ? 0 : -720;

  // Reset simulation
  const handleReset = () => {
    setDistanceNm(3.5);
    setTouchdownBurst(false);
    setReverseThrust(false);
    setBrakeTemp(185);
    setIsPlaying(false);
  };

  const handleManualTouchdown = () => {
    setDistanceNm(0);
    setTouchdownBurst(true);
    setReverseThrust(true);
    setBrakeTemp(420);
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-6xl rounded-3xl bg-[#060913] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col text-white my-auto max-h-[94vh]"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <Radio size={16} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm tracking-tight text-white">VOBL 3D Digital Twin Simulator</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                    BENGALURU AIRPORT
                  </span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400">
                  Kempegowda Int'l (VOBL / BLR) • Coordinates 13.1986° N, 77.7066° E • Elev 915m MSL
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Main Workspace: 3D Viewport Simulation + Right Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-[560px] overflow-hidden">
            
            {/* Viewport Canvas (Left 8 Cols) */}
            <div className="lg:col-span-8 relative bg-[#03060E] flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              
              {/* Virtual Aerodrome 3D Display Container */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[380px] p-6">
                
                {/* Background Sky / Time of Day Lighting Shader Emulation */}
                <div 
                  className="absolute inset-0 transition-all duration-700 pointer-events-none"
                  style={{
                    background: timeOfDay === 'dawn'
                      ? 'linear-gradient(to bottom, #111a33 0%, #3a2234 60%, #522d2f 100%)'
                      : timeOfDay === 'noon'
                      ? 'linear-gradient(to bottom, #032147 0%, #0c3866 50%, #173b5c 100%)'
                      : timeOfDay === 'sunset'
                      ? 'linear-gradient(to bottom, #151129 0%, #3a1c2d 50%, #612718 100%)'
                      : 'linear-gradient(to bottom, #02040a 0%, #050a14 60%, #07101f 100%)'
                  }}
                />

                {/* Rain Overlay Effect */}
                {isRainy && (
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_32px] opacity-20 animate-pulse" />
                )}

                {/* Aerodrome Radar Grid Lines & Runway Vectors */}
                <div className="absolute inset-0 pointer-events-none opacity-25">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E5FF10_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF10_1px,transparent_1px)] bg-[size:40px_40px]" />
                  {/* Runway 09R / 27L Axis */}
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-cyan-400/30" />
                  {/* Glideslope Guide Vector */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-cyan-400/20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-cyan-400/10" />
                </div>

                {/* Viewport Content Based on Camera Mode */}
                <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center justify-center">
                  
                  {/* Camera Mode Visualizer */}
                  {cameraMode === 'cockpit' ? (
                    /* Cockpit Synthetic Vision HUD */
                    <div className="w-full p-6 rounded-2xl bg-black/70 border border-cyan-500/30 backdrop-blur-md font-mono text-cyan-400 relative">
                      <div className="flex justify-between items-center text-xs pb-3 border-b border-cyan-500/20">
                        <span>SYNTHETIC VISION HUD</span>
                        <span className="text-emerald-400">ILS CAT III ARMED</span>
                      </div>
                      
                      {/* PFD Horizon & Pitch Ladder */}
                      <div className="relative h-44 my-4 flex items-center justify-center overflow-hidden">
                        {/* Artificial Horizon Line */}
                        <div className="absolute left-8 right-8 h-[2px] bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                        {/* Aircraft Bore Sight Reticle */}
                        <div className="w-6 h-6 border-2 border-amber-400 rounded-full flex items-center justify-center z-10">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                        </div>
                        {/* Glideslope Diamond Indicators */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-[10px]">
                          <span>▲</span>
                          <span className="text-emerald-300 font-bold">◆ G/S 3.0°</span>
                          <span>▼</span>
                        </div>
                        {/* Speed & Altitude Tapes */}
                        <div className="absolute left-3 top-2 bottom-2 w-12 bg-black/60 border-r border-cyan-500/20 flex flex-col justify-between text-[11px] py-1 text-left">
                          <span className="text-neutral-500">160</span>
                          <span className="text-emerald-300 font-bold">{indicatedAirspeed} KT</span>
                          <span className="text-neutral-500">120</span>
                        </div>
                        <div className="absolute right-12 top-2 bottom-2 w-16 bg-black/60 border-l border-cyan-500/20 flex flex-col justify-between text-[11px] py-1 text-right">
                          <span className="text-neutral-500">{altitudeFt + 200}</span>
                          <span className="text-emerald-300 font-bold">{altitudeFt} FT</span>
                          <span className="text-neutral-500">{Math.max(0, altitudeFt - 200)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] pt-3 border-t border-cyan-500/20 text-neutral-300">
                        <span>RWY 09R • HDG 092°</span>
                        <span>V/S: {verticalSpeedFpm} FPM</span>
                        <span className="text-emerald-400">LOC ON TRK</span>
                      </div>
                    </div>
                  ) : cameraMode === 'tower' ? (
                    /* ATC Tower 360° Panorama View */
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-[#00E5FF]/10 border-2 border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mx-auto shadow-[0_0_30px_rgba(0,229,255,0.25)]">
                          <Plane size={44} className="transform rotate-45 transition-transform" />
                        </div>
                        {strobesEnabled && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_#ffffff] animate-ping" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-lg font-semibold text-white">
                          ATC Tower Elevation +65m AGL
                        </div>
                        <p className="text-xs text-neutral-400 font-mono">
                          Tracking {selectedFlight.callsign} ({selectedFlight.airline}) on 3.0° glide slope to {selectedFlight.runway}
                        </p>
                      </div>

                      {/* Touchdown Particle FX Indicator */}
                      {touchdownBurst && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-xs font-mono text-cyan-200"
                        >
                          <Flame size={14} className="text-amber-400 animate-bounce" />
                          <span>TOUCHDOWN SMOKE BURST ACTIVE • REVERSE THRUST ARMED</span>
                        </motion.div>
                      )}
                    </div>
                  ) : cameraMode === 'spotter' ? (
                    /* Runway 09R Spotter Cam */
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.1] backdrop-blur-md">
                        <div className="text-xs font-mono text-[#00E5FF] uppercase mb-2">Runway 09R Threshold Spotter</div>
                        <div className="text-2xl font-bold font-mono text-white mb-1">
                          {distanceNm === 0 ? 'ON RUNWAY CENTERLINE' : `${distanceNm} NM TO TOUCHDOWN`}
                        </div>
                        <div className="text-xs text-neutral-400">
                          Volumetric landing beams active • PAPI guidance: 2 Red / 2 White (On Slope)
                        </div>
                      </div>
                    </div>
                  ) : cameraMode === 'apron' ? (
                    /* Terminal 2 Apron Cam */
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.1] backdrop-blur-md">
                        <div className="text-xs font-mono text-amber-400 uppercase mb-2">Terminal 2 Garden Apron & Pushback</div>
                        <div className="text-lg font-semibold text-white mb-1">
                          {selectedFlight.gate}
                        </div>
                        <div className="text-xs text-neutral-400">
                          Pushback tug assigned • Bamboo bell chandelier interior illumination active
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Chase Cam */
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.1] backdrop-blur-md">
                        <div className="text-xs font-mono text-emerald-400 uppercase mb-2">Aircraft Chase Camera</div>
                        <div className="text-xl font-bold text-white mb-1">
                          {selectedFlight.aircraft}
                        </div>
                        <div className="text-xs text-neutral-400">
                          Trailing 120m aft • Wingtip vortex ribbons visible at {indicatedAirspeed} kts
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Floating Telemetry Badge Overlay (Top Left) */}
                <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/70 border border-white/[0.08] backdrop-blur-md font-mono text-[11px] text-neutral-300 space-y-1 text-left">
                  <div className="flex items-center gap-2 text-[#00E5FF] font-bold">
                    <Radio size={12} className="animate-pulse" />
                    <span>{selectedFlight.callsign}</span>
                    <span className="text-neutral-400 font-normal">({selectedFlight.aircraft})</span>
                  </div>
                  <div>ALT: <span className="text-white font-semibold">{altitudeFt} ft AGL</span></div>
                  <div>IAS: <span className="text-white font-semibold">{indicatedAirspeed} kts</span></div>
                  <div>DIST: <span className="text-white font-semibold">{distanceNm} NM</span></div>
                </div>

                {/* Floating Weather & Time HUD (Top Right) */}
                <div className="absolute top-4 right-4 p-3 rounded-xl bg-black/70 border border-white/[0.08] backdrop-blur-md font-mono text-[11px] text-neutral-300 space-y-1 text-right">
                  <div className="text-[#00E5FF] font-semibold flex items-center justify-end gap-1.5">
                    <Wind size={12} />
                    <span>VOBL 260° @ 8 kts</span>
                  </div>
                  <div>QNH: <span className="text-white">1014 hPa</span></div>
                  <div>TEMP: <span className="text-white">24°C • IST</span></div>
                </div>

                {/* Bottom Viewport Control Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-black/80 border border-white/[0.08] backdrop-blur-lg">
                  {/* Play / Pause / Reset Approach */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1.5 rounded-xl bg-[#00E5FF] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-cyan-300 transition-colors"
                    >
                      {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      <span>{isPlaying ? 'Pause Approach' : 'Start Approach'}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/[0.08] cursor-pointer"
                      title="Reset Approach Position"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button
                      onClick={handleManualTouchdown}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Flame size={13} />
                      <span>Trigger Touchdown</span>
                    </button>
                  </div>

                  {/* Distance Scrubber */}
                  <div className="hidden sm:flex items-center gap-3">
                    <span className="text-[11px] font-mono text-neutral-400">Glide Path:</span>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={distanceNm}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setDistanceNm(val);
                        if (val > 0) {
                          setTouchdownBurst(false);
                          setReverseThrust(false);
                        }
                      }}
                      className="w-32 accent-[#00E5FF] cursor-pointer"
                    />
                    <span className="text-xs font-mono text-[#00E5FF] w-12 text-right">{distanceNm} NM</span>
                  </div>
                </div>

              </div>

              {/* Live METAR Ticker Footer */}
              <div className="px-6 py-2.5 bg-black/90 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="truncate">
                  METAR VOBL 121800Z 26008KT 6000 FEW025 BKN080 24/20 Q1014 NOSIG
                </span>
                <span className="text-emerald-400 shrink-0 ml-4">ADS-B STREAM: 60 FPS</span>
              </div>
            </div>

            {/* Simulation Controls & Aircraft Selector (Right 4 Cols) */}
            <div className="lg:col-span-4 p-6 bg-[#060913] space-y-6 overflow-y-auto max-h-[580px]">
              
              {/* Flight Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5 block">
                  Select Active Aerodrome Flight
                </label>
                <div className="space-y-2">
                  {FLIGHTS.map((flight) => {
                    const isSelected = flight.id === selectedFlight.id;
                    return (
                      <button
                        key={flight.id}
                        onClick={() => setSelectedFlight(flight)}
                        className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#00E5FF]/10 border-[#00E5FF]/40 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-300 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-white">{flight.callsign}</span>
                          <span className="text-[10px] font-mono text-[#00E5FF]">{flight.runway}</span>
                        </div>
                        <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                          <span>{flight.airline} • {flight.aircraft}</span>
                          <span className="font-mono text-neutral-500">SQ {flight.squawk}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Camera Perspective Mode */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5 block">
                  Camera Perspective
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['tower', 'spotter', 'cockpit', 'chase', 'apron'] as CameraMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCameraMode(mode)}
                      className={`p-2 rounded-xl text-xs font-mono transition-all border cursor-pointer capitalize text-center ${
                        cameraMode === mode
                          ? 'bg-[#00E5FF] text-black font-bold border-[#00E5FF]'
                          : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time of Day & Lighting */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5 block">
                  Time of Day & Solar Azimuth
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['dawn', 'noon', 'sunset', 'night'] as TimeOfDay[]).map((tod) => (
                    <button
                      key={tod}
                      onClick={() => setTimeOfDay(tod)}
                      className={`p-2 rounded-xl text-xs font-mono transition-all border cursor-pointer capitalize text-center ${
                        timeOfDay === tod
                          ? 'bg-cyan-500/20 text-[#00E5FF] border-[#00E5FF]/40 font-bold'
                          : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tod}
                    </button>
                  ))}
                </div>
              </div>

              {/* Atmospheric & Physics Toggles */}
              <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Atmospheric & Avionics Toggles
                </label>

                {/* Rain toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-xs text-neutral-300 flex items-center gap-2">
                    <CloudRain size={14} className={isRainy ? 'text-[#00E5FF]' : 'text-neutral-500'} />
                    <span>Monsoon Rain & Wet Specular</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={isRainy}
                    onChange={(e) => setIsRainy(e.target.checked)}
                    className="accent-[#00E5FF] cursor-pointer"
                  />
                </div>

                {/* Strobes toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-xs text-neutral-300 flex items-center gap-2">
                    <Sparkles size={14} className={strobesEnabled ? 'text-amber-400' : 'text-neutral-500'} />
                    <span>1.5s ICAO Annex 14 Strobes</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={strobesEnabled}
                    onChange={(e) => setStrobesEnabled(e.target.checked)}
                    className="accent-[#00E5FF] cursor-pointer"
                  />
                </div>

                {/* Reverse Thrust Status */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs space-y-1">
                  <div className="flex justify-between text-neutral-400">
                    <span>Brake Carbon Temp:</span>
                    <span className={brakeTemp > 350 ? 'text-amber-400' : 'text-cyan-300'}>{brakeTemp}°C</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Reverse Thrust:</span>
                    <span className={reverseThrust ? 'text-emerald-400' : 'text-neutral-500'}>
                      {reverseThrust ? 'DEPLOYED (60%)' : 'STOWED'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Modal Footer CTA */}
          <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              Tested on Google 3D Photorealistic Tiles & ADS-B One API telemetry stream at Kempegowda (BLR).
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/gokulgautham/live-airport-simulator"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-white border border-white/[0.1] transition-colors"
              >
                View Repository on GitHub
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#00E5FF] text-black font-semibold text-xs cursor-pointer hover:bg-cyan-300 transition-colors"
              >
                Close Simulator
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
