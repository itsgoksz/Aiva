import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, CheckCircle2, ChevronRight } from 'lucide-react';

interface WelloraHeroSectionProps {
  onOpenDemo: () => void;
}

interface SampleMeal {
  id: string;
  label: string;
  voiceText: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  note: string;
  category: string;
}

const SAMPLE_MEALS: SampleMeal[] = [
  {
    id: 'dosa',
    label: 'Dosa & Chutney',
    voiceText: 'Two crisp dosas with homemade coconut chutney and a hot cup of filter coffee.',
    calories: 395,
    protein: 9,
    carbs: 54,
    fat: 16,
    fiber: 5,
    note: 'Balanced morning meal. Healthy medium-chain fats from fresh coconut chutney.',
    category: 'Breakfast • 8:30 AM'
  },
  {
    id: 'salmon',
    label: 'Salmon & Quinoa',
    voiceText: 'Wild grilled salmon fillet, half cup warm quinoa, steamed broccoli with olive oil drizzle.',
    calories: 540,
    protein: 42,
    carbs: 36,
    fat: 22,
    fiber: 7,
    note: 'High protein recovery plate rich in omega-3s and complex slow-burning carbohydrates.',
    category: 'Lunch • 1:15 PM'
  },
  {
    id: 'yogurt',
    label: 'Greek Yogurt Bowl',
    voiceText: 'Cup of Greek yogurt, handful of wild blueberries, crushed walnuts, and a teaspoon of raw honey.',
    calories: 310,
    protein: 23,
    carbs: 26,
    fat: 12,
    fiber: 4,
    note: 'Probiotic-rich evening fuel. Clean casein protein supports overnight muscle repair.',
    category: 'Snack • 5:45 PM'
  },
  {
    id: 'rajma',
    label: 'Rajma & Jeera Rice',
    voiceText: 'One medium bowl of home-cooked rajma masala with steamed jeera rice and sliced cucumbers.',
    calories: 490,
    protein: 19,
    carbs: 82,
    fat: 9,
    fiber: 14,
    note: 'Exceptional dietary fiber content (14g) promoting gut health and steady glucose curve.',
    category: 'Dinner • 8:15 PM'
  }
];

export default function WelloraHeroSection({ onOpenDemo }: WelloraHeroSectionProps) {
  const [selectedMeal, setSelectedMeal] = useState<SampleMeal>(SAMPLE_MEALS[0]);
  const [isSimulatingAudio, setIsSimulatingAudio] = useState(false);

  const handleSelectMeal = (meal: SampleMeal) => {
    setIsSimulatingAudio(true);
    setSelectedMeal(meal);
    setTimeout(() => {
      setIsSimulatingAudio(false);
    }, 600);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#060C08]">
      {/* Organic Bioluminescent Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[15%] left-[20%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #2ECC71 0%, rgba(16, 185, 129, 0) 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[10%] w-[550px] h-[550px] rounded-full blur-[160px] opacity-20"
          style={{ background: 'radial-gradient(circle, #10B981 0%, rgba(5, 150, 105, 0) 70%)' }}
        />
        {/* Subtle Organic Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#2ECC71 1px, transparent 1px)',
            backgroundSize: '36px 36px'
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md mb-6 shadow-sm shadow-emerald-950/50"
            >
              <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-emerald-300">
                VOICE NUTRITION & LIFESTYLE ENGINE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08] mb-6"
            >
              Nutrition tracking that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-emerald-300 to-teal-200 font-semibold">
                listens
              </span>{' '}
              instead of demanding barcodes.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8"
            >
              Just speak what you ate in plain words. Wellora understands home cooking, portion sizes, and regional dishes — delivering accurate calories and macronutrients without spreadsheets or guilt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <button
                onClick={onOpenDemo}
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-[#060C08] bg-[#2ECC71] hover:bg-[#27ae60] transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Mic size={16} className="text-black" />
                <span>Try Voice Logger Live</span>
              </button>

              <a
                href="#experience"
                className="px-6 py-3.5 rounded-xl font-medium text-sm text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore the Dashboard</span>
                <ChevronRight size={16} />
              </a>
            </motion.div>

            {/* Health Principles Micro-Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-4 border-t border-white/[0.08] text-left"
            >
              <div>
                <div className="text-xl font-bold font-mono text-emerald-400">0 barcodes</div>
                <div className="text-xs text-neutral-400 mt-0.5">Natural voice input</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-white">10,000+</div>
                <div className="text-xs text-neutral-400 mt-0.5">Regional & whole foods</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-emerald-400">100%</div>
                <div className="text-xs text-neutral-400 mt-0.5">Private on-device log</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Tactile Simulator Card */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl p-6 sm:p-7 bg-[#09130D]/90 border border-emerald-500/20 backdrop-blur-xl shadow-2xl shadow-emerald-950/40"
            >
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.07]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#2ECC71]">
                    <Mic size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      WELLORA SPEECH-TO-MACRO SIMULATOR
                    </div>
                    <div className="text-xs text-neutral-400">Click any meal below to test real extraction</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ready</span>
                </div>
              </div>

              {/* Sample Meal Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {SAMPLE_MEALS.map((meal) => {
                  const isSelected = selectedMeal.id === meal.id;
                  return (
                    <button
                      key={meal.id}
                      onClick={() => handleSelectMeal(meal)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer border ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-400/50 text-white shadow-sm shadow-emerald-500/20'
                          : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="truncate font-medium">{meal.label}</div>
                      <div className="text-[10px] font-mono opacity-60 mt-0.5">{meal.calories} kcal</div>
                    </button>
                  );
                })}
              </div>

              {/* Audio Transcript Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] mb-5 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Volume2 size={13} />
                    <span>AUDIO INPUT TRANSCRIPT</span>
                  </span>
                  <span>{selectedMeal.category}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedMeal.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm text-neutral-200 leading-relaxed font-normal"
                  >
                    "{selectedMeal.voiceText}"
                  </motion.p>
                </AnimatePresence>

                {/* Animated Voice Waveform */}
                <div className="flex items-center gap-1 mt-3 pt-2 border-t border-white/[0.04]">
                  {[4, 12, 20, 8, 16, 28, 14, 6, 22, 10, 18, 5, 14, 24, 8, 16].map((height, i) => (
                    <motion.div
                      key={i}
                      animate={isSimulatingAudio ? { height: [height * 0.4, height * 1.2, height * 0.5] } : { height: height * 0.6 }}
                      transition={{ duration: 0.4, repeat: isSimulatingAudio ? Infinity : 0, delay: i * 0.03 }}
                      className="w-1 rounded-full bg-emerald-400/50"
                      style={{ height: `${height * 0.6}px` }}
                    />
                  ))}
                  <span className="ml-auto text-[10px] font-mono text-neutral-500">
                    {isSimulatingAudio ? 'Synthesizing...' : 'Parsed in 180ms'}
                  </span>
                </div>
              </div>

              {/* Instant Nutrition Breakdown Card */}
              <div className="rounded-2xl p-4 bg-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Energy</span>
                    <div className="text-3xl font-display font-bold text-white flex items-baseline gap-1 mt-0.5">
                      {selectedMeal.calories}
                      <span className="text-sm font-normal text-emerald-400 font-mono">kcal</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Dietary Fiber</span>
                    <div className="text-lg font-mono font-semibold text-neutral-200 mt-0.5">
                      {selectedMeal.fiber}g
                    </div>
                  </div>
                </div>

                {/* Macro Progress Bars */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/[0.05]">
                    <div className="flex justify-between text-[11px] font-mono mb-1.5">
                      <span className="text-orange-400 font-medium">Protein</span>
                      <span className="text-white font-bold">{selectedMeal.protein}g</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (selectedMeal.protein / 50) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-orange-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/[0.05]">
                    <div className="flex justify-between text-[11px] font-mono mb-1.5">
                      <span className="text-emerald-400 font-medium">Carbs</span>
                      <span className="text-white font-bold">{selectedMeal.carbs}g</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (selectedMeal.carbs / 90) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-emerald-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/[0.05]">
                    <div className="flex justify-between text-[11px] font-mono mb-1.5">
                      <span className="text-blue-400 font-medium">Fats</span>
                      <span className="text-white font-bold">{selectedMeal.fat}g</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (selectedMeal.fat / 30) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-blue-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Thoughtful Coach Note */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-neutral-300">
                  <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{selectedMeal.note}</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
