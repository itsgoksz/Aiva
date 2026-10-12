import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Zap, 
  BatteryCharging, 
  Coffee, 
  ExternalLink
} from 'lucide-react';

interface VehicleModel {
  name: string;
  batteryKwh: number;
  maxChargeKw: number;
}

const VEHICLES: VehicleModel[] = [
  { name: 'Tata Nexon EV Long Range', batteryKwh: 40.5, maxChargeKw: 50 },
  { name: 'Mahindra XUV400 EL Pro', batteryKwh: 39.4, maxChargeKw: 50 },
  { name: 'MG ZS EV', batteryKwh: 50.3, maxChargeKw: 50 },
  { name: 'Hyundai Ioniq 5', batteryKwh: 72.6, maxChargeKw: 150 }
];

interface Destination {
  id: string;
  name: string;
  distance: string;
  elevation: string;
  charger: string;
  chargerKw: string;
  pairedCafe: string;
  energyKwh: number;
  chargeTimeMins: number;
  chargeCostInr: number;
  petrolCostInr: number;
}

const DESTINATIONS: Destination[] = [
  {
    id: 'coorg',
    name: 'Coorg (Madikeri)',
    distance: '264 km',
    elevation: '+1,150 m climb',
    charger: 'Tata Power 150kW Dual Gun (Mysore Bypass)',
    chargerKw: '150 kW DC Fast',
    pairedCafe: 'Subbaiah Kaapi House & Bakery',
    energyKwh: 38,
    chargeTimeMins: 21,
    chargeCostInr: 395,
    petrolCostInr: 2420
  },
  {
    id: 'ooty',
    name: 'Ooty (Nilgiris)',
    distance: '278 km',
    elevation: '+1,850 m climb',
    charger: 'Zeon Charging 150kW Dual Gun (Gundlupet Bypass)',
    chargerKw: '150 kW DC Fast',
    pairedCafe: 'Café Coffee Day & Nilgiri Bakers',
    energyKwh: 43,
    chargeTimeMins: 24,
    chargeCostInr: 440,
    petrolCostInr: 2680
  },
  {
    id: 'chikmagalur',
    name: 'Chikmagalur',
    distance: '242 km',
    elevation: '+950 m climb',
    charger: 'Jio-bp pulse 120kW Dual Gun (Hassan Highway)',
    chargerKw: '120 kW DC Fast',
    pairedCafe: 'Coffee Barn Cafe & Roastery',
    energyKwh: 35,
    chargeTimeMins: 19,
    chargeCostInr: 360,
    petrolCostInr: 2240
  }
];

export default function EvCopilotDemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel>(VEHICLES[0]);
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);
  const [batterySoc, setBatterySoc] = useState(65);
  const isCalculated = true;

  const savingsInr = selectedDest.petrolCostInr - selectedDest.chargeCostInr;

  const handleReset = () => {
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
        className="relative w-full max-w-2xl rounded-3xl bg-[#090C1B] border border-violet-500/30 p-6 sm:p-7 shadow-2xl z-10 text-white"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[#00E5FF]">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              EV Copilot Route & Charging Optimizer Simulator
            </h3>
            <p className="text-xs text-neutral-400">
              Live battery SoC degradation and 150kW fast charging planner for Bangalore highway trips
            </p>
          </div>
        </div>

        {/* Origin & Destination Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {/* Destination */}
          <div>
            <label className="text-[11px] font-mono uppercase text-neutral-400 block mb-1.5">
              Trip Destination (From Bangalore)
            </label>
            <div className="space-y-1.5">
              {DESTINATIONS.map((d) => {
                const isSelected = selectedDest.id === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDest(d)}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-violet-600/20 border-violet-400/60 text-white font-semibold'
                        : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="truncate">{d.name}</div>
                    <div className="text-[10px] font-mono text-[#00E5FF] mt-0.5">{d.distance} • {d.elevation}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vehicle & Battery Slider */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-mono uppercase text-neutral-400 block mb-1.5">
                Select Electric Vehicle
              </label>
              <select
                value={selectedVehicle.name}
                onChange={(e) => {
                  const v = VEHICLES.find(item => item.name === e.target.value);
                  if (v) setSelectedVehicle(v);
                }}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:border-violet-500 outline-none"
              >
                {VEHICLES.map(v => (
                  <option key={v.name} value={v.name} className="bg-[#090C1B]">
                    {v.name} ({v.batteryKwh} kWh)
                  </option>
                ))}
              </select>
            </div>

            {/* Battery SoC Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono text-neutral-400 mb-1">
                <span>Departure Battery Level</span>
                <span className="text-[#00E5FF] font-bold">{batterySoc}% SoC</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={batterySoc}
                onChange={(e) => setBatterySoc(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
              />
            </div>
          </div>
        </div>

        {/* Calculated Charging & Waypoint Card */}
        {isCalculated && (
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/[0.08] mb-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-xs font-mono">
              <span className="text-violet-300 font-semibold flex items-center gap-1.5">
                <BatteryCharging size={14} className="text-[#00E5FF]" />
                <span>OPTIMIZED CHARGE BAY • OPENCHARGEMAP LIVE</span>
              </span>
              <span className="text-emerald-400 font-semibold">
                {selectedDest.chargeTimeMins} mins dwell time
              </span>
            </div>

            {/* Station & Cafe Details */}
            <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/20 mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">{selectedDest.charger}</div>
                  <div className="text-[11px] font-mono text-emerald-400">{selectedDest.chargerKw} • Dual Gun CCS2 Verified</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#00E5FF]">₹{selectedDest.chargeCostInr}</div>
                  <div className="text-[10px] font-mono text-neutral-400">₹{Math.round(selectedDest.chargeCostInr / (selectedDest.energyKwh * 0.55))}/kWh rate</div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center gap-2 text-xs text-amber-300">
                <Coffee size={13} className="shrink-0" />
                <span>Paired Stop: {selectedDest.pairedCafe} (30m walk from bay)</span>
              </div>
            </div>

            {/* Rupee Fuel Savings vs Petrol */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] font-mono text-neutral-400 uppercase">EV Charge Cost</div>
                <div className="text-sm font-bold font-mono text-white mt-0.5">₹{selectedDest.chargeCostInr}</div>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] font-mono text-neutral-400 uppercase">Petrol Equivalent</div>
                <div className="text-sm font-bold font-mono text-neutral-400 mt-0.5">₹{selectedDest.petrolCostInr}</div>
              </div>

              <div className="p-2 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="text-[10px] font-mono text-emerald-400 uppercase">Net Trip Savings</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">+₹{savingsInr}</div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between text-xs">
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=Bangalore&destination=${encodeURIComponent(selectedDest.name)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#00E5FF] hover:underline font-mono"
          >
            <span>Open Route in Google Maps</span>
            <ExternalLink size={12} />
          </a>

          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#6D5EF7] hover:bg-[#5846f5] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
