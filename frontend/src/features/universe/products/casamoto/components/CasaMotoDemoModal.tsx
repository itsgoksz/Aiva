import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Bike, Gauge, ShieldAlert } from "lucide-react";

interface BikeModel {
  name: string;
  specs: string;
  topSpeed: number;
}

const BIKES: BikeModel[] = [
  { name: 'Royal Enfield Himalayan 450', specs: '40 HP • 40 Nm • Sherpa 452 Engine', topSpeed: 142 },
  { name: 'KTM 390 Duke Gen 3', specs: '45 HP • 39 Nm • Cornering MTC & ABS', topSpeed: 168 },
  { name: 'Triumph Speed 400', specs: '40 HP • 37.5 Nm • Hybrid Monoshock', topSpeed: 154 }
];

export default function CasaMotoDemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedBike, setSelectedBike] = useState<BikeModel>(BIKES[1]);
  const [route, setRoute] = useState<'nandi' | 'sakleshpur'>('nandi');
  const [telemetryState, setTelemetryState] = useState<'cruising' | 'cornering' | 'sprint'>('cruising');
  const [sosTriggered, setSosTriggered] = useState(false);

  // Dynamic telemetry values based on state
  const speed = telemetryState === 'cornering' ? 54 : telemetryState === 'sprint' ? 116 : 82;
  const leanAngle = telemetryState === 'cornering' ? 42 : telemetryState === 'sprint' ? 4 : 22;
  const gear = telemetryState === 'cornering' ? '3rd' : telemetryState === 'sprint' ? '5th' : '4th';
  const rpm = telemetryState === 'cornering' ? '5,800' : telemetryState === 'sprint' ? '8,900' : '6,400';

  const handleReset = () => {
    setSosTriggered(false);
    setTelemetryState('cruising');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleReset}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#090B12] border border-[#FF6B00]/30 p-6 sm:p-7 shadow-2xl z-10 text-white"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00]">
            <Bike size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              CasaMoto Motorcycle OS & Radar Simulator
            </h3>
            <p className="text-xs text-neutral-400">
              Test real-time lean angles, pack telemetry, and SOS beacon logic calibrated for Bangalore riding corridors
            </p>
          </div>
        </div>

        {/* Motorcycle & Corridor Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {/* Bike Picker */}
          <div>
            <label className="text-[11px] font-mono uppercase text-neutral-400 block mb-1.5">
              Select Motorcycle
            </label>
            <div className="space-y-1.5">
              {BIKES.map((bike) => {
                const isSelected = selectedBike.name === bike.name;
                return (
                  <button
                    key={bike.name}
                    onClick={() => setSelectedBike(bike)}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF6B00]/20 border-[#FF6B00]/60 text-white font-semibold'
                        : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="truncate">{bike.name}</div>
                    <div className="text-[10px] font-mono text-[#FF6B00] mt-0.5">{bike.specs}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corridor & Mode */}
          <div>
            <label className="text-[11px] font-mono uppercase text-neutral-400 block mb-1.5">
              Bangalore Riding Corridor
            </label>
            <div className="space-y-1.5 mb-3">
              <button
                onClick={() => setRoute('nandi')}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                  route === 'nandi'
                    ? 'bg-[#FF6B00]/20 border-[#FF6B00]/60 text-white font-semibold'
                    : 'bg-white/[0.02] border-white/[0.06] text-neutral-400'
                }`}
              >
                <div>Nandi Hills Sunrise Blast</div>
                <div className="text-[10px] font-mono text-[#00E5FF]">58 km • 32 Curves • NH 44 Hebbal</div>
              </button>

              <button
                onClick={() => setRoute('sakleshpur')}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                  route === 'sakleshpur'
                    ? 'bg-[#FF6B00]/20 border-[#FF6B00]/60 text-white font-semibold'
                    : 'bg-white/[0.02] border-white/[0.06] text-neutral-400'
                }`}
              >
                <div>Sakleshpur Western Ghats Run</div>
                <div className="text-[10px] font-mono text-[#00E5FF]">220 km • 64 Hairpins • Hassan Highway</div>
              </button>
            </div>
          </div>
        </div>

        {/* Live Cockpit Telemetry HUD */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/[0.08] mb-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs font-mono">
            <span className="text-[#FF6B00] font-semibold flex items-center gap-1.5">
              <Gauge size={13} />
              <span>LIVE CLUSTER TELEMETRY • {selectedBike.name.split(' ')[0]} CAN-BUS</span>
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>TPMS 29F / 32R PSI</span>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center mb-4">
            {/* Speed */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Speed</div>
              <div className="text-2xl font-display font-black text-white mt-0.5">
                {speed} <span className="text-xs font-normal text-neutral-400 font-mono">km/h</span>
              </div>
            </div>

            {/* Lean Angle */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Lean Angle</div>
              <div className="text-2xl font-display font-black text-[#FF6B00] mt-0.5">
                {leanAngle}° <span className="text-xs font-normal text-neutral-400 font-mono">L</span>
              </div>
            </div>

            {/* Gear & RPM */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Gear & RPM</div>
              <div className="text-lg font-display font-bold text-white mt-1">
                {gear} <span className="text-xs font-mono text-amber-400">({rpm})</span>
              </div>
            </div>

            {/* Pack Position */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Pack Radar</div>
              <div className="text-lg font-display font-bold text-[#00E5FF] mt-1">
                4 Riders <span className="text-[10px] text-neutral-500 block font-mono">In Formation</span>
              </div>
            </div>
          </div>

          {/* Interactive Dynamic Action Triggers */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTelemetryState('cornering')}
              className={`py-2 px-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border text-center ${
                telemetryState === 'cornering'
                  ? 'bg-[#FF6B00] text-black border-[#FF6B00]'
                  : 'bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              Hairpin Apex (42° Lean)
            </button>

            <button
              onClick={() => setTelemetryState('sprint')}
              className={`py-2 px-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border text-center ${
                telemetryState === 'sprint'
                  ? 'bg-[#00E5FF] text-black border-[#00E5FF]'
                  : 'bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              Highway Sprint (116 km/h)
            </button>

            <button
              onClick={() => setTelemetryState('cruising')}
              className={`py-2 px-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border text-center ${
                telemetryState === 'cruising'
                  ? 'bg-emerald-400 text-black border-emerald-400'
                  : 'bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              Paced Cruise (82 km/h)
            </button>
          </div>
        </div>

        {/* SOS Crash Beacon Simulator */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert size={16} className={sosTriggered ? 'text-red-400 animate-bounce' : 'text-neutral-400'} />
            <div>
              <div className="text-xs font-semibold text-white">
                {sosTriggered ? 'Crash Beacon Active! Broadcast sent to 4 pack riders' : 'Sub-Second Incident Beacon'}
              </div>
              <div className="text-[10px] text-neutral-400">
                {sosTriggered ? 'GPS: 13.3702° N, 77.6835° E (Nandi Hairpin #14)' : 'Automatically detects severe impact (>4.5G) or high-side inversion'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setSosTriggered(!sosTriggered)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold cursor-pointer transition-all ${
              sosTriggered
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
            }`}
          >
            {sosTriggered ? 'Cancel SOS' : 'Test Crash SOS'}
          </button>
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
          <span>Tested on OBD-II & 6-Axis IMU sensors</span>
          <button
            onClick={handleReset}
            className="text-[#FF6B00] hover:underline font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
