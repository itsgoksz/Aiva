import { useState } from 'react';

import { CheckCircle2, Flame } from 'lucide-react';

interface MissionItem {
  id: string;
  title: string;
  xp: number;
  type: string;
  completed: boolean;
  instruction: string;
}

const INITIAL_MISSIONS: MissionItem[] = [
  {
    id: 'scout',
    title: 'Morning Walk Scout',
    xp: 25,
    type: 'Scout',
    completed: true,
    instruction: 'Geotag 1 garbage blackspot or overflowing pile on your morning walk (+10 Eco Points).'
  },
  {
    id: 'rally',
    title: 'Community Megaphone Rally',
    xp: 35,
    type: 'Rally',
    completed: true,
    instruction: 'Upvote a neighbor\'s report and help assemble a 3-person weekend cleanup squad.'
  },
  {
    id: 'cleanup',
    title: 'Neighborhood Cleanup Squad',
    xp: 100,
    type: 'Cleanup',
    completed: false,
    instruction: 'Join neighbors to clean a tagged spot, post before/after proof, and unlock breakfast discounts!'
  }
];

export default function NammaHoodMissionsSection() {
  const [missions, setMissions] = useState<MissionItem[]>(INITIAL_MISSIONS);
  const [streakDays] = useState(7);

  const handleToggleMission = (id: string) => {
    setMissions(prev =>
      prev.map(m => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#060807] border-t border-white/[0.04]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-amber-300">
            <Flame size={12} className="text-amber-400" />
            <span>DAILY MISSIONS & ECO-POINTS ECONOMY</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Gamified civic action that pays for your morning breakfast.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Take on daily missions, organize community cleanup drives, and earn SplitXP plus Eco Points redeemable for real breakfast discounts at neighborhood darshinis and cafes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Streak Counter Card */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-[#0A110D]/90 border border-emerald-500/20 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Flame size={32} />
            </div>
            <div className="text-3xl font-display font-bold text-white">
              {streakDays} Days
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mt-0.5">
              ACTIVE CIVIC STREAK
            </div>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              7-day neighborhood protection streak. +15% XP multiplier active.
            </p>
            <div className="mt-4 pt-3 border-t border-white/[0.08] w-full text-left">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>Eco Points:</span>
                <span className="font-bold">180 🍃</span>
              </div>
              <div className="text-[11px] text-amber-300 font-medium mt-1">
                ☕ Unlocked: 20% off breakfast at Brahmin's & local partner cafes
              </div>
            </div>
          </div>

          {/* Missions List */}
          <div className="md:col-span-8 space-y-3">
            {missions.map((mission) => (
              <div
                key={mission.id}
                onClick={() => handleToggleMission(mission.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  mission.completed
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-white'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                    mission.completed
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'border-white/20 text-transparent'
                  }`}>
                    <CheckCircle2 size={14} className={mission.completed ? 'opacity-100' : 'opacity-0'} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{mission.title}</div>
                    <div className="text-xs text-neutral-400 font-normal mt-0.5">{mission.instruction}</div>
                  </div>
                </div>

                <div className="text-right pl-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    +{mission.xp} XP
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 block uppercase">
                    {mission.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
