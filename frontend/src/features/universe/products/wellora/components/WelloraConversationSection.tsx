import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface DialogueSnippet {
  id: string;
  topic: string;
  userQuery: string;
  assistantResponse: string;
  nutritionTag: string;
  philosophy: string;
}

const DIALOGUES: DialogueSnippet[] = [
  {
    id: 'clarify',
    topic: 'Smart Clarification',
    userQuery: 'Had a bowl of dal tadka, jeera rice, and cucumber salad for lunch.',
    assistantResponse: 'Logged ~510 kcal with 16g protein and 11g dietary fiber! Did you use ghee for the tadka temper, or light mustard oil? Either way, great slow-burning fuel for the afternoon.',
    nutritionTag: '510 kcal • High fiber',
    philosophy: 'Asks clarifying questions gently, never interrupting your day.'
  },
  {
    id: 'empathy',
    topic: 'Non-Judgmental Guidance',
    userQuery: "I completely overate at my friend's wedding reception tonight. Feel guilty.",
    assistantResponse: 'One celebration dinner does not undo weeks of healthy habits. Your 7-day average is still right in your target zone. Drink a tall glass of water, sleep well, and we will ease back into tomorrow naturally.',
    nutritionTag: 'Mindset & Recovery',
    philosophy: 'Focuses on long-term metabolic health rather than daily guilt.'
  },
  {
    id: 'recommendation',
    topic: 'Targeted Evening Advice',
    userQuery: 'I still have 35g of protein left today. What is a light snack before bed?',
    assistantResponse: 'A cup of Greek yogurt with a scoop of whey, or 150g of grilled paneer with black pepper. Both provide slow-release casein protein that repairs muscle overnight without causing acid reflux.',
    nutritionTag: 'Casein protein recommendation',
    philosophy: 'Tailored recommendations based on what macros you actually have remaining.'
  }
];

export default function WelloraConversationSection() {
  const [selectedDialogue, setSelectedDialogue] = useState<DialogueSnippet>(DIALOGUES[0]);

  return (
    <section className="py-24 relative overflow-hidden bg-[#060C08] border-t border-white/[0.04]">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 mb-4 text-[11px] font-mono uppercase tracking-wider text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>EMPATHETIC COMPANION ENGINE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            A wellness partner that understands context, not just numbers.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Wellora talks like a thoughtful nutritionist who lives in your corner — offering encouragement, smart portion estimates, and zero guilt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Topics Selector */}
          <div className="lg:col-span-5 space-y-3">
            {DIALOGUES.map((d) => {
              const isSelected = selectedDialogue.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDialogue(d)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/40 shadow-lg shadow-emerald-950/50'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                      {d.topic}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {d.nutritionTag}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {d.philosophy}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Chat Window Display */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 bg-[#09130D]/90 border border-emerald-500/20 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xs font-bold font-mono">
                    W
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Wellora Companion</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Voice & Text Synchronized</div>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-neutral-500">Live Transcript</div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm p-4 bg-emerald-500/15 border border-emerald-500/25 text-neutral-100 text-xs sm:text-sm leading-relaxed">
                    "{selectedDialogue.userQuery}"
                  </div>
                </div>

                {/* Assistant Message */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDialogue.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[90%] rounded-2xl rounded-tl-sm p-4 bg-white/[0.03] border border-white/[0.07] text-neutral-200 text-xs sm:text-sm leading-relaxed">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono mb-2 uppercase tracking-wider font-semibold">
                        <Sparkles size={12} />
                        <span>Wellora Response</span>
                      </div>
                      {selectedDialogue.assistantResponse}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>Portion auto-calculated</span>
                </span>
                <span className="font-mono text-[11px] text-neutral-500">FastAPI backend</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
