import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplets, Moon, Plus, Utensils, Award } from 'lucide-react';

interface MealLog {
  id: string;
  time: string;
  name: string;
  calories: number;
  macros: string;
  iconBg: string;
}

const INITIAL_MEALS: MealLog[] = [
  {
    id: '1',
    time: '8:30 AM',
    name: 'Two dosas with coconut chutney & filter coffee',
    calories: 395,
    macros: '9g P • 54g C • 16g F',
    iconBg: 'bg-orange-500/10 text-orange-400'
  },
  {
    id: '2',
    time: '1:15 PM',
    name: 'Grilled salmon fillet, brown rice & broccoli',
    calories: 540,
    macros: '42g P • 36g C • 22g F',
    iconBg: 'bg-emerald-500/10 text-emerald-400'
  },
  {
    id: '3',
    time: '4:45 PM',
    name: 'Tender coconut water & raw almonds',
    calories: 180,
    macros: '4g P • 14g C • 12g F',
    iconBg: 'bg-blue-500/10 text-blue-400'
  },
  {
    id: '4',
    time: '8:00 PM',
    name: 'Home-style rajma masala with jeera rice',
    calories: 490,
    macros: '19g P • 82g C • 9g F',
    iconBg: 'bg-purple-500/10 text-purple-400'
  }
];

export default function WelloraDashboardPreviewSection() {
  const [waterMl, setWaterMl] = useState(2250);
  const [meals] = useState<MealLog[]>(INITIAL_MEALS);
  const [activeTab, setActiveTab] = useState<'today' | 'weekly'>('today');

  const targetWater = 3000;
  const targetCalories = 2200;
  const consumedCalories = 1605;
  const remainingCalories = targetCalories - consumedCalories;

  const handleAddWater = () => {
    setWaterMl(prev => Math.min(targetWater, prev + 250));
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#060C08] border-t border-white/[0.04]">
      {/* Background Glow */}
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Interactive Wellness Telemetry</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Designed to feel like calm clarity, not data overload.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every screen is engineered with high contrast, legible hierarchy, and peaceful tactile feedback. Test the live controls below.
          </p>
        </div>

        {/* Master Console Container */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#08110B]/90 border border-emerald-500/20 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80">
          
          {/* Top Bar with Time & Date Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.06] gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                DAILY METABOLIC SNAPSHOT
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-white mt-1">
                Tuesday, October 13
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('today')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'today'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-neutral-400 hover:text-white bg-white/[0.02]'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'weekly'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-neutral-400 hover:text-white bg-white/[0.02]'
                }`}
              >
                Weekly Rhythm
              </button>
            </div>
          </div>

          {/* Grid Layout: Rings + Macros + Water + Sleep */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Column 1: Daily Target Ring */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.06] flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="8"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#2ECC71"
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * (consumedCalories / targetCalories))}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Flame size={20} className="text-[#2ECC71] mb-1" />
                  <span className="text-3xl font-display font-bold text-white tracking-tight">
                    {consumedCalories}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    of {targetCalories} kcal
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.06] text-xs">
                <div className="text-left">
                  <div className="text-neutral-400 text-[10px] font-mono uppercase">Remaining</div>
                  <div className="font-semibold text-emerald-400 font-mono mt-0.5">{remainingCalories} kcal</div>
                </div>
                <div className="text-right">
                  <div className="text-neutral-400 text-[10px] font-mono uppercase">Active Burn</div>
                  <div className="font-semibold text-orange-400 font-mono mt-0.5">420 kcal</div>
                </div>
              </div>
            </div>

            {/* Column 2: Macronutrient Breakdown */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Target Distribution</span>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">In Zone</span>
                </div>

                <div className="space-y-4">
                  {/* Protein */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-neutral-300 font-medium">Protein</span>
                      <span className="text-white font-semibold">112g <span className="text-neutral-500">/ 140g</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>

                  {/* Carbohydrates */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-neutral-300 font-medium">Carbohydrates</span>
                      <span className="text-white font-semibold">186g <span className="text-neutral-500">/ 220g</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '84%' }} />
                    </div>
                  </div>

                  {/* Healthy Fats */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-neutral-300 font-medium">Healthy Fats</span>
                      <span className="text-white font-semibold">49g <span className="text-neutral-500">/ 60g</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: '81%' }} />
                    </div>
                  </div>

                  {/* Dietary Fiber */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-neutral-300 font-medium">Dietary Fiber</span>
                      <span className="text-white font-semibold">30g <span className="text-neutral-500">/ 32g</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: '93%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>Micronutrient Quality</span>
                <span className="text-emerald-300 font-medium">9.4 / 10 Excellent</span>
              </div>
            </div>

            {/* Column 3: Interactive Water & Recovery */}
            <div className="flex flex-col gap-4">
              {/* Interactive Water Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-medium">
                      <Droplets size={14} />
                      <span>HYDRATION LOG</span>
                    </div>
                    <span className="text-xs font-mono text-white font-semibold">
                      {waterMl} <span className="text-neutral-500">/ {targetWater}ml</span>
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                    <motion.div
                      animate={{ width: `${(waterMl / targetWater) * 100}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-gradient-to-r from-sky-400 to-teal-300 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-neutral-400">Tap glass to record water:</span>
                  <button
                    onClick={handleAddWater}
                    className="px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Plus size={13} />
                    <span>+250ml Glass</span>
                  </button>
                </div>
              </div>

              {/* Recovery & Sleep Correlation */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Moon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">Sleep Correlation</div>
                    <div className="text-sm font-semibold text-white mt-0.5">8h 12m • 94% Recovery</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                  <Award size={14} />
                  <span>High HRV</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Real Meal Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Utensils size={13} className="text-emerald-400" />
                <span>TODAY'S RECORDED MEALS</span>
              </span>
              <span className="text-xs font-mono text-neutral-500">4 entries logged</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between hover:border-emerald-500/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[10px] font-mono text-neutral-400 px-2 py-1 rounded bg-black/50 border border-white/[0.06] shrink-0">
                      {meal.time}
                    </div>
                    <div>
                      <div className="text-sm text-neutral-200 font-medium leading-snug">
                        {meal.name}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        {meal.macros}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span className="text-sm font-mono font-bold text-white">
                      +{meal.calories}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 block">kcal</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
