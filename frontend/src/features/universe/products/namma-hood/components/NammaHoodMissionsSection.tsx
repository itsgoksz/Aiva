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
    xp: 20,
    type: 'Scout',
    completed: true,
    instruction: 'Report 1 litter spot or broken utility during your morning walk.'
  },
  {
    id: 'advocate',
    title: 'Ward Community Advocate',
    xp: 30,
    type: 'Advocate',
    completed: true,
    instruction: 'Support 2 neighbor-submitted issues in your ward using the Megaphone.'
  },
  {
    id: 'verify',
    title: 'Restoration Inspector',
    xp: 50,
    type: 'Verification',
    completed: false,
    instruction: 'Verify a resolved cleanup within 200m using your camera for before/after validation.'
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
            <span>DAILY CIVIC MISSIONS & STREAKS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Small daily actions that compound into spotless streets.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Gamified with daily missions, streak bonuses, and split XP rewards when municipal crews clean up your reported spot.
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
            <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
              You have helped protect your neighborhood 7 days in a row. +15% XP multiplier active.
            </p>
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
