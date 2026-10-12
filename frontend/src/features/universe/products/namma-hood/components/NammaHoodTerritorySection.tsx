import { useState } from 'react';

import { Trophy, CheckCircle2, Shield, Flame } from 'lucide-react';

interface WardData {
  id: string;
  name: string;
  wardNumber: string;
  resolvedCount: number;
  activeCount: number;
  monthlyCleanups: number;
  guardian: string;
  guardianXp: number;
  leaderboard: { rank: number; name: string; xp: number }[];
}

const WARDS: WardData[] = [
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    wardNumber: 'Ward 112',
    resolvedCount: 142,
    activeCount: 4,
    monthlyCleanups: 38,
    guardian: 'Kavitha R.',
    guardianXp: 1840,
    leaderboard: [
      { rank: 1, name: 'Kavitha R.', xp: 1840 },
      { rank: 2, name: 'Vikram N.', xp: 1420 },
      { rank: 3, name: 'Priya S.', xp: 1180 }
    ]
  },
  {
    id: 'hsr',
    name: 'HSR Layout',
    wardNumber: 'Ward 174',
    resolvedCount: 215,
    activeCount: 3,
    monthlyCleanups: 64,
    guardian: 'Arun Kumar',
    guardianXp: 2150,
    leaderboard: [
      { rank: 1, name: 'Arun Kumar', xp: 2150 },
      { rank: 2, name: 'Deepa M.', xp: 1790 },
      { rank: 3, name: 'Karthik V.', xp: 1350 }
    ]
  },
  {
    id: 'koramangala',
    name: 'Koramangala',
    wardNumber: 'Ward 151',
    resolvedCount: 189,
    activeCount: 6,
    monthlyCleanups: 52,
    guardian: 'Rajesh Hegde',
    guardianXp: 2410,
    leaderboard: [
      { rank: 1, name: 'Rajesh Hegde', xp: 2410 },
      { rank: 2, name: 'Siddharth B.', xp: 1940 },
      { rank: 3, name: 'Ananya G.', xp: 1610 }
    ]
  },
  {
    id: 'malleshwaram',
    name: 'Malleshwaram',
    wardNumber: 'Ward 45',
    resolvedCount: 128,
    activeCount: 2,
    monthlyCleanups: 41,
    guardian: 'Sneha Rao',
    guardianXp: 1690,
    leaderboard: [
      { rank: 1, name: 'Sneha Rao', xp: 1690 },
      { rank: 2, name: 'Ramesh K.', xp: 1310 },
      { rank: 3, name: 'Ganesh P.', xp: 1050 }
    ]
  }
];

export default function NammaHoodTerritorySection() {
  const [selectedWard, setSelectedWard] = useState<WardData>(WARDS[0]);

  return (
    <section id="territories" className="py-24 relative overflow-hidden bg-[#060807] border-t border-white/[0.04]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>WARD GUARDIANS & CIVIC TERRITORIES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Friendly neighborhood pride that drives real change.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every Bangalore ward has a live territory map. Top reporting and verification contributors are crowned Ward Guardians.
          </p>
        </div>

        {/* Master Console */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0A110D]/90 border border-emerald-500/20 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          
          {/* Ward Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-6 mb-6 border-b border-white/[0.06]">
            {WARDS.map((w) => {
              const isSelected = selectedWard.id === w.id;
              return (
                <button
                  key={w.id}
                  onClick={() => setSelectedWard(w)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-white shadow-md shadow-emerald-950/50'
                      : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{w.name}</span>
                  <span className="ml-1.5 text-[10px] font-mono text-neutral-500">({w.wardNumber})</span>
                </button>
              );
            })}
          </div>

          {/* Grid Layout: Ward Stats + Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 7 cols: Ward Stats Snapshot */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Territory Jurisdiction</span>
                    <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                      {selectedWard.name} • {selectedWard.wardNumber}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    <Trophy size={14} className="text-amber-400" />
                    <span>Guardian: {selectedWard.guardian}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Total Resolved</div>
                    <div className="text-2xl font-display font-bold text-emerald-400 mt-0.5">
                      {selectedWard.resolvedCount}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-400">This Month</div>
                    <div className="text-2xl font-display font-bold text-white mt-0.5">
                      {selectedWard.monthlyCleanups}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Active Issues</div>
                    <div className="text-2xl font-display font-bold text-amber-400 mt-0.5">
                      {selectedWard.activeCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolution Rate Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Shield size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">96.8% Verified Cleanup Proof</div>
                    <div className="text-xs text-neutral-400">All closed reports backed by geotagged post-cleanup photos</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={14} />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Top 3 Contributors Leaderboard */}
            <div className="lg:col-span-5">
              <div className="p-5 rounded-2xl bg-black/50 border border-white/[0.08]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs font-mono">
                  <span className="text-emerald-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Flame size={13} className="text-amber-400" />
                    <span>AREA LEADERBOARD</span>
                  </span>
                  <span className="text-neutral-500">Eco XP</span>
                </div>

                <div className="space-y-2.5">
                  {selectedWard.leaderboard.map((item) => (
                    <div
                      key={item.rank}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                          item.rank === 1 ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'
                        }`}>
                          #{item.rank}
                        </span>
                        <span className="text-xs font-medium text-white">{item.name}</span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-emerald-400">
                        {item.xp} XP
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 text-center">
                  Top contributor holds the Ward Guardian badge for 30 days
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
