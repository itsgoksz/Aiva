import { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Calendar,
  RotateCcw,
  CheckCircle2,
  User,
  LayoutDashboard,
  Volume2
} from "lucide-react";

interface AivaHeroSectionProps {
  onOpenBookDemo?: () => void;
  onOpenTestCall?: () => void;
  onOpenDemo?: () => void;
}

const CALL_SCENARIOS = [
  {
    id: "salon",
    title: "Boutique Salon",
    caller: "Pooja Menon",
    service: "HydraFacial & Styling with Divya",
    time: "Thursday at 2:30 PM",
    revenue: "₹3,200",
    dialogue: [
      { speaker: "caller", text: "Hi! Do you have any openings for a HydraFacial with Divya this Thursday afternoon?" },
      { speaker: "aiva", text: "Hello Pooja! Divya has an opening at 2:30 PM or 4:30 PM. Which one works better for you?" },
      { speaker: "caller", text: "2:30 PM is perfect, thank you!" },
      { speaker: "aiva", text: "You're all booked for Thursday at 2:30 PM. I just sent the confirmation and prep tips straight to your WhatsApp!" }
    ]
  },
  {
    id: "dental",
    title: "Dental Clinic",
    caller: "David Chen",
    service: "Emergency Tooth Ache Exam",
    time: "Today at 4:00 PM",
    revenue: "₹1,800",
    dialogue: [
      { speaker: "caller", text: "Hello, I have a bad toothache. Do you have any emergency dentist openings today?" },
      { speaker: "aiva", text: "I'm sorry to hear that, David. Dr. Miller has an emergency slot open today at 4:00 PM. Would you like me to reserve that for you?" },
      { speaker: "caller", text: "Yes please, 4:00 PM works great." },
      { speaker: "aiva", text: "Done, you're confirmed for 4:00 PM with Dr. Miller. I've texted you the intake form so you can fill it out before you arrive." }
    ]
  },
  {
    id: "consulting",
    title: "Design Studio",
    caller: "Marcus Brody",
    service: "Project Onboarding Call",
    time: "Tomorrow at 11:00 AM",
    revenue: "₹8,500",
    dialogue: [
      { speaker: "caller", text: "Hey, can I move our onboarding session with Gokul from Friday to tomorrow morning?" },
      { speaker: "aiva", text: "Sure thing, Marcus! Gokul is free tomorrow at 11:00 AM. Want me to update the calendar invite?" },
      { speaker: "caller", text: "That works great, thanks Aiva." },
      { speaker: "aiva", text: "All updated! You'll see the updated Google Meet link in your inbox." }
    ]
  }
];

export default memo(function AivaHeroSection({ onOpenBookDemo, onOpenTestCall, onOpenDemo }: AivaHeroSectionProps) {
  const handleBookDemo = onOpenBookDemo || onOpenDemo || (() => { });
  const handleTestCall = onOpenTestCall || onOpenDemo || (() => { });
  const sectionRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(true);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);

  const scenario = CALL_SCENARIOS[scenarioIndex];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      if (!isInViewRef.current) return;
      setCurrentLine((prev) => {
        if (prev < scenario.dialogue.length - 1) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 2400);

    return () => clearInterval(timer);
  }, [isPlaying, scenario]);

  const handleSelectScenario = (idx: number) => {
    setScenarioIndex(idx);
    setCurrentLine(0);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setCurrentLine(0);
    setIsPlaying(true);
  };

  return (
    <section ref={sectionRef} className="relative min-h-[640px] sm:min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-x-clip bg-transparent">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
          {/* Left Column: Product Positioning */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full mb-6 sm:mb-8 border border-[#E65C8E]/30 bg-[#E65C8E]/10"
              >
                <span className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                  <span className="w-0.5 sm:w-1 h-2.5 sm:h-3 bg-[#E65C8E] rounded-full" />
                  <span className="w-0.5 sm:w-1 h-3.5 sm:h-4 bg-[#E65C8E] rounded-full" />
                  <span className="w-0.5 sm:w-1 h-2 sm:h-2.5 bg-[#E65C8E] rounded-full" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest uppercase text-[#ECA9B7] font-semibold whitespace-nowrap">
                  Aiva • 24/7 Assistant
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-[36px] sm:text-6xl lg:text-[68px] font-bold tracking-[-0.035em] mb-4 sm:mb-6 leading-[1.06] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Never let another <br className="sm:hidden" />
                phone call{" "}
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFF5FA] via-[#F9A8D4] to-[#E65C8E]"
                >
                  go to voicemail.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-[15.5px] sm:text-[18.5px] mb-7 sm:mb-9 max-w-[34ch] sm:max-w-[52ch] mx-auto lg:mx-0 font-normal text-white/[0.72] leading-[1.62] tracking-[-0.01em]"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
              >
                Aiva answers incoming calls in{" "}
                <span className="text-white/95 font-medium">under a second</span>, speaks in a warm human voice, checks your team&apos;s real schedule, and{" "}
                <span className="text-white/95 font-medium">books visits straight to your calendar</span>—day, night, or peak rush.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-4 sm:mb-2 w-full max-w-[340px] sm:max-w-none mx-auto lg:mx-0">
                <button
                  onClick={handleBookDemo}
                  className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-7 rounded-full font-semibold text-[14px] sm:text-[15px] text-white inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                    background: "linear-gradient(180deg, #EC6B9A 0%, #C84374 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 8px 24px -4px rgba(230, 92, 142, 0.48)",
                  }}
                >
                  <Calendar size={16} className="shrink-0" />
                  <span>Book a Demo</span>
                </button>

                <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handleTestCall}
                    className="h-10 sm:h-12 px-3.5 sm:px-5 rounded-full font-medium text-[13px] sm:text-[14.5px] text-white/90 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] active:scale-[0.98] transition-all duration-200 inline-flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer border border-white/[0.12] hover:border-[#E65C8E]/45 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                  >
                    <PhoneCall size={14} className="text-[#EC89B5] shrink-0 sm:w-[15px] sm:h-[15px]" />
                    <span className="sm:hidden">Live Test Call</span>
                    <span className="hidden sm:inline">Hear a Live Test Call</span>
                  </button>

                  <a
                    href="#dashboard-preview"
                    className="h-10 sm:h-12 px-3.5 sm:px-5 rounded-full font-medium text-[13px] sm:text-[14.5px] text-white/75 hover:text-white bg-white/[0.025] hover:bg-white/[0.07] active:scale-[0.98] transition-all duration-200 inline-flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer border border-white/[0.09] hover:border-white/25 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
                  >
                    <LayoutDashboard size={14} className="text-[#ECA9B7] shrink-0 sm:w-[15px] sm:h-[15px]" />
                    <span>Dashboard</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Live Receptionist Console */}
          <div className="w-full lg:w-1/2">
            <motion.div
              id="card-module-01"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl mx-auto"
            >
              <div
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden border border-white/10"
                style={{
                  background: "linear-gradient(150deg, #170B14 0%, #0A0508 100%)",
                  boxShadow: "0 18px 48px -12px rgba(0, 0, 0, 0.78), 0 0 36px -12px rgba(166, 107, 142, 0.18)",
                }}
              >
                {/* Unified Architecture Chassis Ribbon */}
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08] text-[10px] font-mono tracking-widest uppercase">
                  <span className="flex items-center gap-2 text-[#EC89B5] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E]" />
                    AIVA APPARATUS // UNIT 01
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-[9px] text-[#EC89B5]/80 font-mono">LINKED ➔ UNIT 02 & UNIT 04</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                      LIVE AUDIO INGESTION CORE
                    </span>
                  </div>
                </div>

                {/* Header: Status & Scenario Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full h-2.5 w-2.5 bg-[#E65C8E] shadow-[0_0_8px_rgba(230,92,142,0.7)]" />
                    <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#EC89B5] font-bold">
                      AIVA LIVE CALL DEMO
                    </span>
                  </div>

                  {/* Scenarios selector tabs */}
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 overflow-x-auto max-w-full scrollbar-none">
                    {CALL_SCENARIOS.map((sc, idx) => (
                      <button
                        key={sc.id}
                        onClick={() => handleSelectScenario(idx)}
                        className={`whitespace-nowrap px-2.5 py-1 text-[10px] sm:text-[11px] font-medium rounded-lg transition-all cursor-pointer ${scenarioIndex === idx
                          ? "bg-[#A66B8E] text-white font-semibold shadow-sm"
                          : "text-white/40 hover:text-white"
                          }`}
                      >
                        {sc.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Call Status Card with Waveform */}
                <div
                  className="p-4 rounded-2xl border border-white/[0.08] mb-6 relative overflow-hidden"
                  style={{ background: "rgba(255, 255, 255, 0.02)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#A66B8E]/15 border border-[#A66B8E]/30 flex items-center justify-center text-[#EC89B5] shrink-0">
                        <PhoneCall size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Caller: {scenario.caller}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            SAVED CLIENT
                          </span>
                        </div>
                        <div className="text-xs text-white/50 font-mono mt-0.5">
                          Line 1 • Direct AI Phone Assistant
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleRestart}
                      title="Replay Call Demo"
                      className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>

                  {/* Audio Waveform (pure GPU scaleY transforms avoid layout reflow during scroll) */}
                  <div className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-black/40 border border-white/5 h-10">
                    <Volume2 size={14} className="text-[#EC89B5] mr-2 shrink-0" />
                    {[40, 65, 85, 45, 95, 75, 55, 80, 100, 70, 50, 85, 60, 90, 75, 45, 65, 50].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 h-6 rounded-full bg-gradient-to-t from-[#A66B8E] to-[#EC89B5] transition-transform duration-200 will-change-transform"
                        style={{
                          transform: `scaleY(${((h / 100) * (currentLine % 2 === 1 ? 0.95 : 0.42)).toFixed(2)})`,
                          opacity: currentLine % 2 === 1 ? 0.95 : 0.55,
                        }}
                      />
                    ))}
                    <span className="text-[10px] font-mono text-white/40 ml-3">
                      {currentLine % 2 === 1 ? "Aiva speaking" : "Listening..."}
                    </span>
                  </div>
                </div>

                {/* Conversation Stream */}
                <div className="space-y-3 mb-6 min-h-[220px]">
                  {scenario.dialogue.slice(0, currentLine + 1).map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 items-start ${msg.speaker === "aiva" ? "flex-row" : "flex-row-reverse"
                        }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${msg.speaker === "aiva"
                          ? "bg-[#A66B8E] text-white"
                          : "bg-white/10 text-white/70"
                          }`}
                      >
                        {msg.speaker === "aiva" ? "A" : <User size={13} />}
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-[85%] leading-relaxed ${msg.speaker === "aiva"
                          ? "bg-[#A66B8E]/15 border border-[#A66B8E]/30 text-white rounded-tl-sm"
                          : "bg-white/[0.05] border border-white/10 text-white/80 rounded-tr-sm"
                          }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Output Card */}
                {currentLine >= scenario.dialogue.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl border border-emerald-500/30 bg-[#0E1C12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>Appointment Booked</span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            +{scenario.revenue}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/60 mt-0.5">
                          {scenario.service} • {scenario.time}
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-white/50 bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5 whitespace-nowrap self-end sm:self-center">
                      WhatsApp Confirmation Sent
                    </div>
                  </motion.div>
                )}

                {/* Metamorphosis Conduit Exit Dock */}
                <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    AUTONOMOUS APPARATUS READY
                  </span>
                  <span className="text-[#EC89B5]">CONDUIT 01 ➔ 04 READY</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});
