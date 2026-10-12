import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Mic, 
  CheckCircle2, 
  Volume2
} from 'lucide-react';

interface PreloadedMeal {
  id: string;
  name: string;
  text: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  feedback: string;
}

const PRELOADED_MEALS: PreloadedMeal[] = [
  {
    id: 'idli_vada',
    name: 'Idli, Vada & Sambar',
    text: 'Two steamed idlis, one crispy medu vada with hot sambar and coconut chutney.',
    calories: 320,
    protein: 9,
    carbs: 48,
    fat: 11,
    fiber: 5,
    feedback: 'Fermented batter promotes gut microbiome. Lentil sambar provides essential amino acids.'
  },
  {
    id: 'palak_paneer',
    name: 'Palak Paneer & Roti',
    text: 'Medium bowl of fresh palak paneer with two whole wheat rotis and sliced cucumber.',
    calories: 480,
    protein: 22,
    carbs: 46,
    fat: 21,
    fiber: 9,
    feedback: 'High biological value protein from paneer. Spinach delivers rich dietary non-heme iron.'
  },
  {
    id: 'curd_rice',
    name: 'Curd Rice & Tadka',
    text: 'One cup of home-set curd rice tempered with mustard seeds, curry leaves, and pomegranate.',
    calories: 285,
    protein: 8,
    carbs: 42,
    fat: 9,
    fiber: 3,
    feedback: 'Probiotic cooling meal ideal for hot afternoons. Helps stabilize digestive gut flora.'
  },
  {
    id: 'khichdi',
    name: 'Moong Dal Khichdi',
    text: 'One bowl of yellow moong dal khichdi with one teaspoon of desi cow ghee.',
    calories: 360,
    protein: 15,
    carbs: 52,
    fat: 10,
    fiber: 8,
    feedback: 'Easy to digest slow-carb comfort fuel. High soluble fiber and balanced glycemic release.'
  }
];

export default function WelloraDemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedMeal, setSelectedMeal] = useState<PreloadedMeal>(PRELOADED_MEALS[0]);
  const [customText, setCustomText] = useState(PRELOADED_MEALS[0].text);
  const [isParsing, setIsParsing] = useState(false);

  const handleSelectMeal = (meal: PreloadedMeal) => {
    setSelectedMeal(meal);
    setCustomText(meal.text);
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
    }, 450);
  };

  const handleCustomParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
    }, 500);
  };

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
        className="relative w-full max-w-2xl rounded-3xl bg-[#09130D] border border-emerald-500/30 p-6 sm:p-7 shadow-2xl z-10 text-white"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#2ECC71]">
            <Mic size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              Wellora Voice-to-Macro Natural Nutrition Simulator
            </h3>
            <p className="text-xs text-neutral-400">
              Test natural speech meal extraction trained on 10,000+ Indian home-cooked foods
            </p>
          </div>
        </div>

        {/* Quick Indian Meals Selectors */}
        <div className="mb-4">
          <label className="text-[11px] font-mono uppercase text-neutral-400 block mb-1.5">
            Choose a Sample Indian Meal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRELOADED_MEALS.map((meal) => {
              const isSelected = selectedMeal.id === meal.id;
              return (
                <button
                  key={meal.id}
                  onClick={() => handleSelectMeal(meal)}
                  className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400/60 text-white font-semibold'
                      : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <div className="truncate font-semibold">{meal.name}</div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-0.5">{meal.calories} kcal</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Text / Speech Transcript Input Box */}
        <div className="p-3.5 rounded-2xl bg-black/50 border border-white/[0.08] mb-5">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Volume2 size={13} />
              <span>SPOKEN OR TYPED FOOD INPUT</span>
            </span>
            <span>Natural language extractor</span>
          </div>

          <div className="relative">
            <textarea
              rows={2}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs text-neutral-200 outline-none focus:border-emerald-500/50 resize-none font-normal"
              placeholder="e.g. Two rotis with dal tadka, half cup rice and cucumber salad"
            />
            <button
              onClick={handleCustomParse}
              className="absolute right-2 bottom-3 px-3 py-1 rounded-lg bg-emerald-500 text-black text-[11px] font-semibold flex items-center gap-1 cursor-pointer hover:bg-emerald-400"
            >
              <span>{isParsing ? 'Extracting...' : 'Parse'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Extracted Nutrition Display Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-emerald-500/20 mb-5">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400">Calculated Energy</span>
              <div className="text-3xl font-display font-black text-white mt-0.5 flex items-baseline gap-1">
                {selectedMeal.calories}
                <span className="text-sm font-normal text-emerald-400 font-mono">kcal</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-neutral-400">Dietary Fiber</span>
              <div className="text-base font-mono font-bold text-neutral-200 mt-0.5">
                {selectedMeal.fiber}g
              </div>
            </div>
          </div>

          {/* Macro Meters */}
          <div className="grid grid-cols-3 gap-2.5 mb-3.5">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-orange-400">Protein</span>
                <span className="text-white font-bold">{selectedMeal.protein}g</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div style={{ width: `${Math.min(100, (selectedMeal.protein / 30) * 100)}%` }} className="bg-orange-400 h-full rounded-full" />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-emerald-400">Carbs</span>
                <span className="text-white font-bold">{selectedMeal.carbs}g</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div style={{ width: `${Math.min(100, (selectedMeal.carbs / 70) * 100)}%` }} className="bg-emerald-400 h-full rounded-full" />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-blue-400">Fats</span>
                <span className="text-white font-bold">{selectedMeal.fat}g</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div style={{ width: `${Math.min(100, (selectedMeal.fat / 25) * 100)}%` }} className="bg-blue-400 h-full rounded-full" />
              </div>
            </div>
          </div>

          {/* Thoughtful Coach Note */}
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-neutral-300 flex items-start gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span className="leading-relaxed">{selectedMeal.feedback}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>Logged into daily encrypted diary</span>
          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-black bg-[#2ECC71] hover:bg-emerald-400 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
