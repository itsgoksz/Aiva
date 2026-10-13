import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, MapPin, CheckCircle2, Megaphone, Sparkles } from 'lucide-react';

interface NammaHoodDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NammaHoodDemoModal({ isOpen, onClose }: NammaHoodDemoModalProps) {
  const [step, setStep] = useState<'form' | 'submitted'>('form');
  const [severity, setSeverity] = useState<'Moderate' | 'Severe' | 'Critical'>('Critical');
  const [ward, setWard] = useState('Indiranagar • Ward 112');
  const [description, setDescription] = useState('Construction debris and plastic bags dumped beside footpath');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('submitted');
    }, 700);
  };

  const handleReset = () => {
    setStep('form');
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#0A110D] border border-emerald-500/30 p-6 sm:p-7 shadow-2xl z-10 text-white"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#10B981]">
                  <Camera size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display">Simulate 5-Second Report</h3>
                  <p className="text-xs text-neutral-400">Test how quickly issues are tagged and verified</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {/* Simulated Geotag Box */}
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <MapPin size={14} />
                    <span>GPS Auto-Locked: 12.9784° N, 77.6408° E</span>
                  </div>
                  <span className="text-neutral-400 text-[10px]">Indiranagar</span>
                </div>

                {/* Ward Selection */}
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                    Select Ward
                  </label>
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:border-emerald-500/50 outline-none"
                  >
                    <option value="Indiranagar • Ward 112" className="bg-[#0A110D]">Indiranagar • Ward 112</option>
                    <option value="HSR Layout • Ward 174" className="bg-[#0A110D]">HSR Layout • Ward 174</option>
                    <option value="Koramangala • Ward 151" className="bg-[#0A110D]">Koramangala • Ward 151</option>
                    <option value="Malleshwaram • Ward 45" className="bg-[#0A110D]">Malleshwaram • Ward 45</option>
                  </select>
                </div>

                {/* Severity Selection */}
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                    Issue Severity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Moderate', 'Severe', 'Critical'] as const).map((sev) => {
                      const isSelected = severity === sev;
                      return (
                        <button
                          key={sev}
                          type="button"
                          onClick={() => setSeverity(sev)}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? sev === 'Critical'
                                ? 'bg-red-500/20 border-red-500/50 text-red-300'
                                : sev === 'Severe'
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                                : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                              : 'bg-white/[0.02] border-white/[0.06] text-neutral-400'
                          }`}
                        >
                          {sev}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                    Description Note
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:border-emerald-500/50 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-black bg-[#10B981] hover:bg-[#059669] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2 active:opacity-90" style={{ boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)" }}
                >
                  {isSubmitting ? (
                    <span>Publishing to Neighborhood Radar...</span>
                  ) : (
                    <>
                      <Megaphone size={15} />
                      <span>Tag Blackspot (+50 XP & +25 Eco Points)</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={30} />
              </div>

              <h3 className="text-xl font-bold font-display text-white mb-2">
                Live on Neighborhood Radar!
              </h3>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
                <Sparkles size={13} />
                <span>+50 XP & +25 Eco Points Awarded</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto mb-6 leading-relaxed">
                Your report is pinned to {ward}. Neighbors can now back this spot with the Megaphone, organize a weekend cleanup crew, and submit verified before/after proof. Clean it up to earn SplitXP and redeem your Eco Points for breakfast discounts!
              </p>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-black bg-[#10B981] hover:bg-[#059669] transition-all cursor-pointer"
              >
                Close Simulator
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
