import React, { useState } from 'react';
import {
  Sparkles,
  PhoneCall,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
  ShieldCheck,
  Zap,
  MessageSquare,
  Building2,
  Smartphone,
  Star,
  Activity,
  Maximize2,
  X,
  Volume2,
  Scissors,
  Smile,
  Heart,
  Moon,
  Check,
  ArrowRight,
  Flame,
  Layers,
  MapPin,
  ChevronRight,
  Shield,
  CreditCard,
  Mic,
  Camera,
  ExternalLink,
  Laptop,
  Download,
  Loader2,
  Award,
  BarChart3,
  Sparkle,
  PhoneForwarded,
  UserCheck,
  BellRing,
  Search,
  Plus,
  Radio,
  FileText,
  CheckCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';

interface MarketingScreen {
  id: number;
  dropZone: string;
  fcpScene: string;
  category: string;
  tag: string;
  title: string;
  aspect: '16:9' | '9:16';
  renderContent: (isExport?: boolean) => React.ReactNode;
}

export default function AivaMarketingPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [focusedScreen, setFocusedScreen] = useState<MarketingScreen | null>(null);
  const [cleanScreenshotMode, setCleanScreenshotMode] = useState<boolean>(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [isBatchDownloading, setIsBatchDownloading] = useState<boolean>(false);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });

  // ─── Apple-Grade Categorical Header ───
  const AppleHeader = ({
    category = "Assistance",
    badge = "Active",
    badgeColor = "text-[#ECA9B7] bg-[#E65C8E]/10 border-[#E65C8E]/30"
  }: {
    category?: string;
    badge?: string;
    badgeColor?: string;
  }) => (
    <div className="flex items-center justify-between w-full select-none pb-3 border-b border-white/[0.08] mb-3">
      <div className="flex items-center gap-3">
        <span className="font-black text-2xl tracking-tight text-white flex items-center gap-2">
          aiva
          <span className="inline-flex gap-1 items-center">
            <span className="w-1.5 h-3.5 bg-[#E65C8E] rounded-full animate-pulse"></span>
            <span className="w-1.5 h-5 bg-[#E65C8E] rounded-full"></span>
            <span className="w-1.5 h-3 bg-[#E65C8E] rounded-full"></span>
          </span>
        </span>
        <span className="text-xs text-white/40 font-mono tracking-widest uppercase">| {category}</span>
      </div>
      <span className={`text-[11px] uppercase font-mono tracking-widest px-3 py-1 rounded-full border ${badgeColor}`}>
        {badge}
      </span>
    </div>
  );

  const screens: MarketingScreen[] = [
    // =============================================================
    // DROP ZONE 01 — Scene 1: "Meet Aiva" (Hero Brand Waveform)
    // =============================================================
    {
      id: 1,
      dropZone: 'DROP ZONE 01',
      fcpScene: 'Scene 1: Meet Aiva',
      category: 'Front Desk Intelligence',
      tag: 'Brand Hero',
      title: 'Your front desk. Reimagined on Ring 1.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-gradient-to-br from-[#1A0B16] via-[#0E060D] to-[#070206] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/40 relative overflow-hidden text-left shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(230,92,142,0.22),transparent_70%)] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />
          <AppleHeader category="Front Desk Intelligence" badge="Bangalore Node • Live" />

          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-7 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block shadow-sm">
                  Calls • Calendar • Clarity
                </span>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Your front desk.<br />
                  <span className="bg-gradient-to-r from-white via-[#FCE7F3] to-[#E65C8E] bg-clip-text text-transparent">
                    Reimagined on Ring 1.
                  </span>
                </h1>
                <p className="text-sm text-white/75 font-normal leading-relaxed">
                  Picks up on the first ring in warm, fluent Indian English. Answers clinical inquiries, checks doctor operatory schedules in real-time, and secures bookings 24/7.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-3">
                <div className="bg-[#140A12]/90 border border-white/10 rounded-xl p-2.5 shadow-lg">
                  <span className="text-[10px] text-white/40 font-mono block">RESPONSE TIME</span>
                  <span className="text-xl font-black text-[#ECA9B7] font-mono">240ms</span>
                  <span className="text-[9px] text-white/60 block mt-0.5">Sub-human speed</span>
                </div>
                <div className="bg-[#140A12]/90 border border-emerald-500/20 rounded-xl p-2.5 shadow-lg">
                  <span className="text-[10px] text-white/40 font-mono block">PICK-UP RATE</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">100%</span>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">Zero missed calls</span>
                </div>
                <div className="bg-[#140A12]/90 border border-white/10 rounded-xl p-2.5 shadow-lg">
                  <span className="text-[10px] text-white/40 font-mono block">CALENDAR SYNC</span>
                  <span className="text-xl font-black text-white font-mono">&lt;100ms</span>
                  <span className="text-[9px] text-white/60 block mt-0.5">Google Cal Live</span>
                </div>
              </div>
            </div>

            <div className="col-span-5 bg-[#120710]/95 backdrop-blur-2xl border border-[#E65C8E]/40 rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.12)] flex flex-col justify-between h-full">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Aura Dental Indiranagar
                </span>
                <span className="font-mono text-emerald-400 text-[11px] font-bold">00:34 • Active Call</span>
              </div>

              {/* Glowing High-Definition Waveform */}
              <div className="my-2 flex items-center justify-center gap-1.5 h-16 bg-black/50 rounded-xl px-4 py-2 border border-white/5 shadow-inner">
                {[8, 16, 26, 42, 54, 38, 20, 32, 50, 36, 18, 12, 24, 40, 56, 38, 16, 10].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1.5 bg-gradient-to-t from-[#D94676] via-[#E65C8E] to-[#FCE7F3] rounded-full shadow-[0_0_10px_rgba(230,92,142,0.8)]"
                  />
                ))}
              </div>

              <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 space-y-1 shadow-sm">
                <div className="text-[11px] text-[#ECA9B7] font-semibold">Caller: Rahul Dravid (+91 98450 12345)</div>
                <div className="text-xs text-white/90">"Root Canal Consultation with Dr. Julian"</div>
                <div className="text-[11px] text-emerald-400 font-bold flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1"><Check size={12} /> Confirmed Sat @ 3:30 PM</span>
                  <span className="font-mono text-[10px] text-white/60">₹500 Token Paid</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            <span className="font-mono tracking-widest uppercase">Engineered for Indian Healthcare & Luxury Salons</span>
            <span className="text-[#ECA9B7] font-semibold font-mono">BENGALURU • MUMBAI • DELHI</span>
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 02 — Scene 1: "Meet Aiva" (Never Miss A Call Again)
    // =============================================================
    {
      id: 2,
      dropZone: 'DROP ZONE 02',
      fcpScene: 'Scene 1: Meet Aiva',
      category: 'Voice Answering',
      tag: 'Zero Missed Calls',
      title: 'Every call answered. Every opportunity captured.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C050B] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(230,92,142,0.15),transparent_70%)] pointer-events-none" />
          <AppleHeader category="Voice Automation" badge="1st Ring Pick-Up" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-7 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Revenue Protection
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Zero missed calls.<br />
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
                    Zero lost patients.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  In India, over 40% of clinic inquiries occur when front desk staff is attending patients, during lunch rush, or after hours. Aiva answers simultaneously with zero wait time.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-3">
                <div className="bg-[#140A12] border border-emerald-500/30 rounded-xl p-2.5">
                  <span className="text-[10px] text-white/40 font-mono block">MISSED CALLS</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">0</span>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">100% captured</span>
                </div>
                <div className="bg-[#140A12] border border-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-white/40 font-mono block">HOLD TIME</span>
                  <span className="text-2xl font-black text-white font-mono">0.0s</span>
                  <span className="text-[9px] text-white/60 block mt-0.5">Instant pick-up</span>
                </div>
                <div className="bg-[#140A12] border border-[#E65C8E]/30 rounded-xl p-2.5">
                  <span className="text-[10px] text-white/40 font-mono block">MONTHLY SAVED</span>
                  <span className="text-2xl font-black text-[#ECA9B7] font-mono">₹48,500</span>
                  <span className="text-[9px] text-white/60 block mt-0.5">Recovered revenue</span>
                </div>
              </div>
            </div>

            <div className="col-span-5 relative flex flex-col justify-between h-full">
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-white/15 shadow-2xl min-h-[210px]">
                <img
                  src="/indian-businesswoman.jpg"
                  alt="Clinic Receptionist Manager"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xs font-bold text-white">Dr. Ananya's Dental & Aesthetics</div>
                  <div className="text-[10px] text-white/60">Indiranagar, Bangalore • 14 Chairs Active</div>
                </div>
              </div>
              <div className="mt-3 bg-[#120710]/95 backdrop-blur-xl border border-emerald-500/40 rounded-xl p-3 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-400 font-bold uppercase font-mono">Call Converted on Ring 1</div>
                    <div className="text-xs font-bold text-white">Laser Whitening • ₹3,800 Locked</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">WhatsApp Sent</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Works seamlessly with Airtel, Jio, Vodafone-Idea, and clinic landlines.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 03 — Scene 1: "Meet Aiva" (Natural Dialogue)
    // =============================================================
    {
      id: 3,
      dropZone: 'DROP ZONE 03',
      fcpScene: 'Scene 1: Meet Aiva',
      category: 'Natural Dialogue',
      tag: 'Speech AI',
      title: 'Conversations that feel human. Bookings that happen instantly.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0A0308] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Speech Intelligence" badge="Zero Robotic IVR" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Sub-Continent Speech Engine
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  No robotic IVR.<br />
                  <span className="bg-gradient-to-r from-white via-[#FCE7F3] to-[#E65C8E] bg-clip-text text-transparent">
                    Pure human warmth.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Aiva listens, pauses naturally, understands Indian conversational interruptions, and speaks with polite, warm hospitality in Indian English or Hinglish.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3">
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  Empathetic Hospital Tone
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  Clinic FAQ & Directions
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  UPI Pricing Transparency
                </span>
              </div>
            </div>

            <div className="col-span-6 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <span className="font-bold text-white flex items-center gap-2">
                  <Mic size={14} className="text-[#E65C8E]" /> Live Speech Audio Stream
                </span>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">99.4% Intent Accuracy</span>
              </div>

              <div className="space-y-2.5 my-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/10 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    P
                  </div>
                  <div className="bg-white/[0.05] border border-white/10 rounded-2xl rounded-tl-sm p-2.5 text-xs text-white/90 leading-relaxed">
                    "Hi! Do you have any slot for HydraFacial this Saturday afternoon with Arjun?"
                  </div>
                </div>
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="bg-gradient-to-r from-[#D94676] to-[#A6365C] rounded-2xl rounded-tr-sm p-2.5 text-xs text-white shadow-lg leading-relaxed">
                    "Namaste Rahul! Arjun has an open operatory slot at 3:30 PM. Shall I lock that for you?"
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#E65C8E] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    A
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 size={14} /> Slot Locked: Saturday, 3:30 PM
                </span>
                <span className="font-mono text-[10px] text-emerald-400">WhatsApp Slip Dispatched</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Indistinguishable from a senior, highly trained clinical receptionist.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 04 — Scene 2: "slots / Zero Conflicts" (Calendar)
    // =============================================================
    {
      id: 4,
      dropZone: 'DROP ZONE 04',
      fcpScene: 'Scene 2: Zero Conflicts',
      category: 'Calendar Engine',
      tag: 'Zero Double Bookings',
      title: 'Zero double-bookings. Conflict-free by design.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C060A] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Multi-Operatory Calendar" badge="Conflict-Free Buffer" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-5 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Operatory Protection
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Zero conflicts.<br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-200 to-white bg-clip-text text-transparent">
                    100% Guaranteed.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Aiva checks specialist availability in real-time, monitors operatory chairs, and automatically injects 15-minute sanitization buffers so you never run late.
                </p>
              </div>

              <div className="bg-[#140A12] border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs mt-3 shadow-lg">
                <div>
                  <span className="text-white/40 font-mono text-[10px] block">REAL-TIME CLOUD SYNC</span>
                  <span className="font-bold text-white">Google Calendar & EMR</span>
                </div>
                <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 font-bold">
                  ● 2-Way Live Sync
                </span>
              </div>
            </div>

            <div className="col-span-7 bg-[#120710] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10">
                <span className="font-bold text-white">Today's Schedule • Aura Dental Indiranagar</span>
                <span className="font-mono text-[10px] text-[#ECA9B7] font-bold">All Operatories Protected</span>
              </div>
              <div className="space-y-2 text-xs my-auto">
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-white">
                    <span>Dr. Ananya Iyer (Dental Chair 1)</span>
                    <span className="text-[#ECA9B7]">4 Consultations</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div className="bg-[#E65C8E]/20 border border-[#E65C8E]/60 p-1.5 rounded-lg text-white font-medium">
                      10:00 AM • Rahul D. (₹1,200)
                    </div>
                    <div className="bg-amber-500/20 border border-dashed border-amber-400 p-1.5 rounded-lg text-amber-300 font-mono text-center font-bold">
                      🛡️ 15m Buffer
                    </div>
                    <div className="bg-[#E65C8E]/20 border border-[#E65C8E]/60 p-1.5 rounded-lg text-white font-medium">
                      11:30 AM • Rahul S. (₹3,800)
                    </div>
                  </div>
                </div>
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-white">
                    <span>Arjun Reddy (Aesthetics Operatory)</span>
                    <span className="text-purple-300">5 Treatments</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div className="bg-purple-500/20 border border-purple-400 p-1.5 rounded-lg text-white font-medium">
                      2:00 PM • Balayage (₹4,500)
                    </div>
                    <div className="bg-amber-500/20 border border-dashed border-amber-400 p-1.5 rounded-lg text-amber-300 font-mono text-center font-bold">
                      🛡️ 15m Buffer
                    </div>
                    <div className="bg-emerald-500/20 border border-emerald-400 p-1.5 rounded-lg text-emerald-300 font-bold text-center">
                      3:30 PM • Open Slot
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Zero double-booking errors across 14,000+ appointments scheduled in India.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 05 — Scene 2: "From inquiry to appointment"
    // =============================================================
    {
      id: 5,
      dropZone: 'DROP ZONE 05',
      fcpScene: 'Scene 2: Zero Conflicts',
      category: 'Workflow Pipeline',
      tag: 'Fully Autonomous',
      title: 'From inquiry to appointment. In twenty-eight seconds.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0A0408] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Workflow Pipeline" badge="Fully Autonomous" />
          <div className="flex-1 z-10 flex flex-col justify-between w-full py-2">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                Frictionless Automation
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                From inquiry to appointment.<br />
                <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                  In twenty-eight seconds.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-4 my-auto">
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
                <span className="text-[10px] font-mono text-[#ECA9B7] font-bold block">STEP 01 • 00:02</span>
                <h4 className="text-sm font-bold text-white">Call Answered</h4>
                <p className="text-xs text-white/60 leading-relaxed">Picks up on Ring 1. Inbound patient greeted in warm clinical tone.</p>
              </div>
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
                <span className="text-[10px] font-mono text-purple-300 font-bold block">STEP 02 • 00:11</span>
                <h4 className="text-sm font-bold text-white">Intent Understood</h4>
                <p className="text-xs text-white/60 leading-relaxed">Identifies requested procedure, doctor, and patient history.</p>
              </div>
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block">STEP 03 • 00:21</span>
                <h4 className="text-sm font-bold text-white">Calendar Synced</h4>
                <p className="text-xs text-white/60 leading-relaxed">Slot locked in Google Calendar with 15-minute sanitization buffer.</p>
              </div>
              <div className="bg-[#140A12] border border-emerald-500/30 rounded-2xl p-4 space-y-2 shadow-lg">
                <span className="text-[10px] font-mono text-emerald-300 font-bold block">STEP 04 • 00:28</span>
                <h4 className="text-sm font-bold text-white">WhatsApp Slip</h4>
                <p className="text-xs text-white/60 leading-relaxed">Official branded receipt sent with Google Maps pin & UPI advance link.</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            7.2x faster than a manual front desk. Zero telephone hold times.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 06 — Scene 2: "Instant confirmations" (WhatsApp)
    // =============================================================
    {
      id: 6,
      dropZone: 'DROP ZONE 06',
      fcpScene: 'Scene 2: Zero Conflicts',
      category: 'Instant Receipts',
      tag: 'Meta Verified',
      title: 'Instant confirmation. Right where patients live.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0A0408] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="WhatsApp Official API" badge="Meta Verified" badgeColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/30" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                  98% Indian Open Rate
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Instant WhatsApp slips.<br />
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                    78% fewer no-shows.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Patients receive an official branded WhatsApp slip with doctor name, appointment time, location pin, and UPI advance link. Eliminates missed appointments.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3">
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  ✓ Verified Green Badge
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  📍 Google Maps Link
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  💳 UPI Advance Token
                </span>
              </div>
            </div>

            <div className="col-span-6 flex justify-end h-full">
              <div className="w-full bg-[#111B21] border border-emerald-500/40 rounded-2xl p-4 shadow-2xl text-left flex flex-col justify-between">
                <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Aura Dental Indiranagar</span>
                    <span className="text-[9px] text-emerald-400 font-mono">Meta Verified Business Account</span>
                  </div>
                </div>
                <div className="bg-[#202C33] rounded-xl p-3 text-xs text-white/90 space-y-1.5 my-auto">
                  <div className="font-bold text-[#ECA9B7]">Namaste Sneha Nair!</div>
                  <div className="text-[11px] text-white/80">Your appointment is confirmed via Aiva:</div>
                  <div className="bg-black/30 p-2.5 rounded-lg font-mono text-[10px] space-y-1 text-white/90 border border-white/5">
                    <div>📅 Saturday, 18 Nov @ 3:30 PM</div>
                    <div>👨‍⚕️ Dr. Ananya Iyer • Operatory 1</div>
                    <div>🦷 Laser Teeth Whitening</div>
                    <div>📍 100ft Road, Indiranagar, Bangalore</div>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center justify-between">
                    <span>✓ Advance: ₹500 Paid via GPay</span>
                    <span className="text-white/40 text-[9px]">11:42 AM</span>
                  </div>
                </div>
                <div className="flex gap-2 text-[10px]">
                  <button className="flex-1 py-1.5 bg-white/[0.05] text-white rounded-lg border border-white/10 font-medium text-center">
                    📍 Get Directions
                  </button>
                  <button className="flex-1 py-1.5 bg-white/[0.05] text-white rounded-lg border border-white/10 font-medium text-center">
                    📅 Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Automated 2-hour reminder and one-tap reschedule options included.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 07 — Scene 3: "Live dashboard, / total control" (Hero Dashboard)
    // =============================================================
    {
      id: 7,
      dropZone: 'DROP ZONE 07',
      fcpScene: 'Scene 3: Live Dashboard',
      category: 'Command Center',
      tag: 'Executive Dashboard',
      title: 'Your entire front desk. Under total control.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#080206] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/40 text-left relative overflow-hidden">
          <AppleHeader category="Executive Command OS" badge="Real-Time Node • Live" />
          <div className="flex-1 z-10 flex flex-col justify-between w-full py-2">
            {/* Top Metric Strip */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-[#120710] border border-white/10 rounded-xl p-3">
                <span className="text-[10px] font-mono text-white/40 block">MONTHLY REVENUE</span>
                <span className="text-2xl font-black text-white font-mono">₹1,84,500</span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">+28.4% MoM</span>
              </div>
              <div className="bg-[#120710] border border-white/10 rounded-xl p-3">
                <span className="text-[10px] font-mono text-white/40 block">RETENTION RATE</span>
                <span className="text-2xl font-black text-white font-mono">94.6%</span>
                <span className="text-[9px] text-[#ECA9B7] block mt-0.5">Top 5% in Bangalore</span>
              </div>
              <div className="bg-[#120710] border border-white/10 rounded-xl p-3">
                <span className="text-[10px] font-mono text-white/40 block">MISSED CALLS</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">0</span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">100% Captured</span>
              </div>
              <div className="bg-[#120710] border border-white/10 rounded-xl p-3">
                <span className="text-[10px] font-mono text-white/40 block">VOICE LATENCY</span>
                <span className="text-2xl font-black text-white font-mono">240ms</span>
                <span className="text-[9px] text-white/50 block mt-0.5">Sub-human pause</span>
              </div>
            </div>

            {/* Main Interactive Command Grid */}
            <div className="grid grid-cols-12 gap-4 my-auto">
              <div className="col-span-8 bg-[#120710] border border-white/10 rounded-2xl p-4 space-y-2 shadow-2xl">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 font-mono">
                  <span className="text-white font-bold">LIVE APPOINTMENT STREAM (TODAY)</span>
                  <span className="text-emerald-400 font-bold">● 14 Scheduled • 0 Clashes</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="font-semibold text-white">Rahul Dravid</span>
                      <span className="text-white/40 text-[11px]">Root Canal Consultation • Dr. Julian</span>
                    </div>
                    <span className="font-mono text-[#ECA9B7] font-bold">₹1,200 Confirmed (3:30 PM)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-semibold text-white">Vikram Malhotra</span>
                      <span className="text-white/40 text-[11px]">Balayage Treatment • Arjun Reddy</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">₹4,500 Confirmed (5:00 PM)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-semibold text-white">Rahul Sharma</span>
                      <span className="text-white/40 text-[11px]">Dental Examination • Dr. Ananya</span>
                    </div>
                    <span className="font-mono text-white/90 font-bold">₹800 Confirmed (6:15 PM)</span>
                  </div>
                </div>
              </div>

              <div className="col-span-4 bg-[#120710] border border-[#E65C8E]/30 rounded-2xl p-4 flex flex-col justify-between shadow-2xl">
                <div>
                  <span className="text-[10px] font-mono text-[#ECA9B7] font-bold uppercase block">Aiva Engine Status</span>
                  <h4 className="text-sm font-bold text-white mt-1">Receptionist Active</h4>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    Handling concurrent inquiries across phone & WhatsApp. No lines busy.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-white/40 font-mono">SYSTEM UPTIME</span>
                  <span className="font-mono text-emerald-400 font-bold">99.98%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            One app, total control. Designed for modern Indian service business owners.
          </div>
        </div>
      )
    },
    // =============================================================
    // DROP ZONE 08 — Scene 4: Rapid Montage (Revenue Growth Curve)
    // =============================================================
    {
      id: 8,
      dropZone: 'DROP ZONE 08',
      fcpScene: 'Scene 4: Rapid Montage',
      category: 'Financial Intelligence',
      tag: '+28.4% MoM',
      title: 'Turn missed rings into compounding revenue.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C050A] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Revenue Intelligence" badge="+28.4% MoM" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                  Proven Clinical ROI
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Grow revenue.<br />
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
                    Not your overhead.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  By answering missed evening inquiries, preventing schedule gaps, and securing advance UPI tokens, clinics add ₹45,000 to ₹1,80,000 extra every month.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="bg-[#140A12] border border-emerald-500/30 p-3 rounded-xl shadow-lg">
                  <span className="text-[10px] text-white/40 font-mono block">MONTHLY CAPTURED</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">₹1,84,500</span>
                </div>
                <div className="bg-[#140A12] border border-[#E65C8E]/30 p-3 rounded-xl shadow-lg">
                  <span className="text-[10px] text-white/40 font-mono block">ROI MULTIPLIER</span>
                  <span className="text-2xl font-black font-mono text-[#ECA9B7]">3.8x ROI</span>
                </div>
              </div>
            </div>

            <div className="col-span-6 bg-[#120710] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between text-xs text-white/60 pb-2 border-b border-white/10 font-mono">
                <span>REVENUE GENERATION CURVE</span>
                <span className="text-emerald-400 font-bold">96.7% Client Retention</span>
              </div>
              <svg className="w-full h-32 text-[#E65C8E] my-auto" viewBox="0 0 200 80" fill="none">
                <defs>
                  <linearGradient id="roseGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E65C8E" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#E65C8E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0 65 Q40 60 70 45 T130 35 T170 18 T200 8" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M0 65 Q40 60 70 45 T130 35 T170 18 T200 8 L200 80 L0 80 Z" fill="url(#roseGrad2)" />
                <circle cx="200" cy="8" r="4" fill="#ECA9B7" />
              </svg>
              <div className="flex justify-between text-[10px] text-white/40 font-mono pt-2 border-t border-white/5">
                <span>WEEK 1 (Setup)</span>
                <span>WEEK 2 (+₹38K)</span>
                <span>WEEK 3 (+₹92K)</span>
                <span className="text-emerald-400 font-bold">WEEK 4 (₹1.84L)</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Zero salary overhead. 100% scalable for single clinics and multi-chain brands.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 09 — Scene 4: Rapid Montage (After Hours Answering)
    // =============================================================
    {
      id: 9,
      dropZone: 'DROP ZONE 09',
      fcpScene: 'Scene 4: Rapid Montage',
      category: 'After-Hours Answering',
      tag: 'Night Node 24/7',
      title: 'Never lose an after-hours patient. 24/7/365.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#080309] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="After-Hours Answering" badge="Night Node • 24/7" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  24/7 Always Active
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Open when your<br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-200 to-white bg-clip-text text-transparent">
                    doors are closed.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Over 28% of premium dental and salon bookings are made after 8 PM while patients are relaxing at home. Aiva answers, locks appointments, and dispatches confirmations while you sleep.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-3">
                <div className="bg-[#140A12] border border-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-white/40 font-mono block">NIGHT BOOKINGS</span>
                  <span className="text-xl font-black text-[#ECA9B7] font-mono">38%</span>
                  <span className="text-[9px] text-white/60 block mt-0.5">After-hours share</span>
                </div>
                <div className="bg-[#140A12] border border-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-white/40 font-mono block">UPTIME SLA</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">100%</span>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">Zero downtime</span>
                </div>
                <div className="bg-[#140A12] border border-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-white/40 font-mono block">NIGHT REVENUE</span>
                  <span className="text-xl font-black text-white font-mono">₹52,000</span>
                  <span className="text-[9px] text-white/60 block mt-0.5">Avg captured / mo</span>
                </div>
              </div>
            </div>

            <div className="col-span-6 bg-[#120710] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <Moon size={14} className="text-[#ECA9B7]" /> 10:48 PM • Inbound Night Call
                </span>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">Line 1 Active</span>
              </div>
              <div className="space-y-2 text-xs my-auto">
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="text-[#ECA9B7] font-semibold text-[11px]">Caller: Vikram Malhotra (+91 98860 55678)</div>
                  <p className="text-white/90">"Hi, I have emergency tooth sensitivity. Can I get a slot with Dr. Julian tomorrow morning?"</p>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 size={13} /> Slot Locked: Tomorrow @ 10:00 AM
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">WhatsApp Sent</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Capture patients while your competitors are asleep.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 10 — Scene 4: Rapid Montage (Zero Staff Training)
    // =============================================================
    {
      id: 10,
      dropZone: 'DROP ZONE 10',
      fcpScene: 'Scene 4: Rapid Montage',
      category: 'Clinic Leadership',
      tag: 'Zero Training',
      title: 'Zero training required. Live in five minutes.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0A0408] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Clinic Leadership" badge="Zero Training Required" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-7 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Frictionless Adoption
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Zero staff training.<br />
                  <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                    Live in five minutes.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  No complex software to learn. Connect your clinic phone number, paste your treatment menu, and Aiva immediately begins answering calls with flawless medical accuracy.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3">
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  ✓ Keep Existing Phone Number
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  ✓ Instant Menu & Doctor Sync
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white">
                  ✓ Zero Disruption to Care
                </span>
              </div>
            </div>

            <div className="col-span-5 relative flex flex-col justify-between h-full">
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-white/15 shadow-2xl min-h-[210px]">
                <img
                  src="/indian-founder.jpg"
                  alt="Doctor Clinic Founder"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xs font-bold text-white">Dr. Julian (Endodontist & Clinic Owner)</div>
                  <div className="text-[10px] text-white/60">Bandra West, Mumbai • 8 Chairs</div>
                </div>
              </div>
              <div className="mt-3 bg-[#120710]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl">
                <p className="text-xs text-white/90 italic leading-snug">
                  "Aiva gave our staff back 3 hours every day. No more answering the same pricing questions 50 times an afternoon."
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Set up in 5 minutes with zero technical overhead.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 11 — Scene 4: Rapid Montage (5-Star Reputation Engine)
    // =============================================================
    {
      id: 11,
      dropZone: 'DROP ZONE 11',
      fcpScene: 'Scene 4: Rapid Montage',
      category: 'Reputation Engine',
      tag: 'Google & Practo',
      title: 'A 5-star reputation. Built on autopilot.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0B0509] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Reputation Automation" badge="Google & Practo Verified" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-5 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
                  Automated Review Engine
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  #1 on Google.<br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                    Built on autopilot.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Aiva dispatches a polite WhatsApp review prompt 1 hour post-appointment. Catching patients while satisfaction is peak and driving your clinic to #1 in your locality.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3">
                <div className="bg-[#140A12] border border-amber-500/30 rounded-xl p-2.5 text-center shadow-lg">
                  <span className="text-amber-400 font-black text-xl font-mono block">4.9 ★</span>
                  <span className="text-[9px] text-white/60 uppercase font-mono block mt-0.5">280+ Reviews</span>
                </div>
                <div className="bg-[#140A12] border border-emerald-500/30 rounded-xl p-2.5 text-center shadow-lg">
                  <span className="text-emerald-400 font-black text-xl font-mono block">+4.2x</span>
                  <span className="text-[9px] text-emerald-400 uppercase font-mono block mt-0.5">Review Volume</span>
                </div>
                <div className="bg-[#140A12] border border-white/10 rounded-xl p-2.5 text-center shadow-lg">
                  <span className="text-[#ECA9B7] font-black text-xl font-mono block">98%</span>
                  <span className="text-[9px] text-white/60 uppercase font-mono block mt-0.5">Open Rate</span>
                </div>
              </div>
            </div>

            <div className="col-span-7 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-black text-[10px]">
                    G
                  </div>
                  <span className="font-bold text-white">Aura Dental Clinic • Indiranagar</span>
                </div>
                <span className="text-amber-400 font-mono text-[11px] font-bold">4.9 ★★★★★ (Google Verified)</span>
              </div>

              <div className="space-y-2 text-xs my-auto">
                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-white">Rahul Sharma</span>
                    <span className="text-amber-400 font-bold">★★★★★</span>
                  </div>
                  <p className="text-[11px] text-white/80 leading-snug">
                    "Phenomenal clinic experience! Booked my root canal appointment over the phone, got an instant WhatsApp confirmation, zero double booking, and no waiting time at Dr. Ananya's clinic."
                  </p>
                </div>
                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-white">Sneha Nair</span>
                    <span className="text-amber-400 font-bold">★★★★★</span>
                  </div>
                  <p className="text-[11px] text-white/80 leading-snug">
                    "Super seamless booking process. Loved the WhatsApp directions and advance payment link. Staff was courteous and the clinic is stunning."
                  </p>
                </div>
              </div>

              <div className="bg-amber-950/30 border border-amber-500/30 p-2 rounded-xl text-[10px] text-amber-300 flex items-center justify-between">
                <span>Automated WhatsApp Prompt: "Namaste Rahul! Tap here to rate your care."</span>
                <span className="font-mono text-white/60">1h Post-Visit</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Clinics see an average 4.2x increase in verified 5-star Google & Practo reviews within 30 days.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 12 — Fast Paced Montage (Operatory Buffer Protection)
    // =============================================================
    {
      id: 12,
      dropZone: 'DROP ZONE 12',
      fcpScene: 'Fast Paced Montage',
      category: 'Operational Integrity',
      tag: 'Sanitization Buffers',
      title: 'Automatic buffer guards between appointments.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C060B] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Operational Buffer Guard" badge="Zero Overlaps" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-5 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
                  Chair Sanitization Safety
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Fewer no-shows.<br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                    More certainty.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Aiva automatically enforces mandatory 15-minute sanitization and chair prep buffers between patients so your day stays calm, combined with automated 2-hour WhatsApp reminders.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 inline-block font-bold">
                  ✓ 78% Reduction in Patient No-Shows
                </span>
              </div>
            </div>

            <div className="col-span-7 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 font-mono">
                <span className="font-bold text-white">Operatory Room 1 • Chair Schedule</span>
                <span className="text-emerald-400 font-bold">Protected</span>
              </div>
              <div className="space-y-2 my-auto">
                <div className="bg-[#E65C8E]/10 border border-[#E65C8E]/40 p-2.5 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-bold text-white">10:00 AM - 11:00 AM • Root Canal Consultation (Dr. Ananya)</span>
                  <span className="text-[#ECA9B7] font-mono font-bold">Confirmed</span>
                </div>
                <div className="bg-amber-500/20 border border-dashed border-amber-400 p-2 rounded-xl text-center text-xs text-amber-300 font-mono font-bold">
                  🛡️ 15-Minute Sanitization & Operatory Buffer (Locked)
                </div>
                <div className="bg-purple-500/10 border border-purple-500/40 p-2.5 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-bold text-white">11:15 AM - 12:00 PM • Teeth Whitening (Sneha N.)</span>
                  <span className="text-purple-300 font-mono font-bold">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Never another waiting room crowd or double-booked chair.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 13 — Fast Paced Montage (Anywhere Mobile Access)
    // =============================================================
    {
      id: 13,
      dropZone: 'DROP ZONE 13',
      fcpScene: 'Fast Paced Montage',
      category: 'Anywhere Access',
      tag: 'Mobile First',
      title: 'Your front desk in your pocket. Live everywhere.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0A0408] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Anywhere Access" badge="Mobile Sync" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Live Executive Mobility
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Your business in<br />
                  <span className="bg-gradient-to-r from-white to-[#ECA9B7] bg-clip-text text-transparent">
                    your pocket.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Real-time call transcripts, automated bookings, and revenue tracking delivered directly to your iPhone. Stay connected whether you are in surgery or traveling.
                </p>
              </div>

              <div className="flex gap-3 pt-2 text-xs">
                <div className="bg-[#140A12] border border-white/10 p-2.5 rounded-xl">
                  <span className="text-[10px] text-white/40 font-mono block">IOS & ANDROID</span>
                  <span className="font-bold text-white">Native Mobile OS</span>
                </div>
                <div className="bg-[#140A12] border border-white/10 p-2.5 rounded-xl">
                  <span className="text-[10px] text-white/40 font-mono block">INSTANT ALERTS</span>
                  <span className="font-bold text-emerald-400">Push & WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="col-span-6 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 font-mono">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Smartphone size={14} className="text-[#ECA9B7]" /> Live Mobile Notification
                </span>
                <span className="text-emerald-400 font-bold">Just Now</span>
              </div>
              <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5 space-y-1.5 my-auto text-xs">
                <div className="font-bold text-white">New Appointment Locked by Aiva</div>
                <p className="text-white/80">Dr. Julian • Root Canal Consultation • Rahul Dravid</p>
                <div className="text-[10px] text-[#ECA9B7] font-mono">Advance: ₹500 Token Confirmed via GPay</div>
              </div>
              <div className="text-[11px] text-white/50 text-center font-mono">
                Synced with Apple Calendar & Google Workspace
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Full executive oversight from anywhere in the world.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 14 — Fast Paced Montage (Indian Accents & Dialects)
    // =============================================================
    {
      id: 14,
      dropZone: 'DROP ZONE 14',
      fcpScene: 'Fast Paced Montage',
      category: 'Speech Intelligence',
      tag: 'Sub-Continent AI',
      title: 'Tuned for Indian English, Hindi & regional terms.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#080206] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Speech Intelligence" badge="Sub-Continent AI" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Acoustic Model Tuned for India
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Tuned for Indian accents.<br />
                  <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                    Built for your patients.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Trained on diverse Indian accents across Bangalore, Mumbai, Delhi, and Chennai. Naturally understands colloquial phrasing, medical terminology, and mixed languages.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="bg-white/[0.04] p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-white/40 block">ACCENT COMPREHENSION</span>
                  <span className="font-bold text-white">99.2% Accuracy</span>
                </div>
                <div className="bg-white/[0.04] p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-white/40 block">SPEECH LATENCY</span>
                  <span className="font-bold text-emerald-400">240ms Real-Time</span>
                </div>
              </div>
            </div>

            <div className="col-span-6 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between text-xs pb-2 border-b border-white/10 font-mono">
                <span className="font-bold text-white">Language Processing Matrix</span>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs my-auto">
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                  <span className="font-bold text-white block">Indian English</span>
                  <span className="text-[10px] text-white/50">Fluent clinical terminology</span>
                </div>
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                  <span className="font-bold text-white block">Hinglish Comprehension</span>
                  <span className="text-[10px] text-white/50">Natural conversational mix</span>
                </div>
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                  <span className="font-bold text-white block">Regional Names & Pincodes</span>
                  <span className="text-[10px] text-white/50">Indiranagar, Koramangala, Bandra</span>
                </div>
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                  <span className="font-bold text-white block">Medical Specializations</span>
                  <span className="text-[10px] text-white/50">Endodontics, Invisalign, Balayage</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            No awkward pronunciation errors. No misunderstanding patient names.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 15 — Scene 5: Command Center (Unified OS)
    // =============================================================
    {
      id: 15,
      dropZone: 'DROP ZONE 15',
      fcpScene: 'Scene 5: Command Center',
      category: 'Unified OS',
      tag: 'Enterprise Ready',
      title: 'One unified OS for your entire practice.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C060A] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Unified OS" badge="Enterprise Ready" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-5 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Complete Practice Suite
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  One unified system.<br />
                  <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                    Total clarity.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Replaces fragmented answering services, booking apps, and messy spreadsheets with one synchronized operating system designed for Indian service leaders.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 inline-block font-bold">
                  ✓ Replaces 4 Disconnected Software Tools
                </span>
              </div>
            </div>

            <div className="col-span-7 grid grid-cols-2 gap-3 my-auto">
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-1 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-[#E65C8E]/20 text-[#ECA9B7] flex items-center justify-center font-bold text-xs mb-2">
                  <PhoneCall size={14} />
                </div>
                <h4 className="font-bold text-white text-sm">AI Voice Receptionist</h4>
                <p className="text-xs text-white/60">Sub-300ms call handling 24/7/365.</p>
              </div>
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-1 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
                  <Calendar size={14} />
                </div>
                <h4 className="font-bold text-white text-sm">Operatory Calendar</h4>
                <p className="text-xs text-white/60">Multi-doctor buffer synchronization.</p>
              </div>
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-1 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-300 flex items-center justify-center font-bold text-xs mb-2">
                  <MessageSquare size={14} />
                </div>
                <h4 className="font-bold text-white text-sm">WhatsApp Business</h4>
                <p className="text-xs text-white/60">Automated booking slips & maps pins.</p>
              </div>
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-1 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs mb-2">
                  <CreditCard size={14} />
                </div>
                <h4 className="font-bold text-white text-sm">UPI Advance Tokens</h4>
                <p className="text-xs text-white/60">Zero no-shows with advance deposits.</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Built specifically for Indian healthcare clinics, aesthetic centers, and premium salons.
          </div>
        </div>
      )
    },
    // =============================================================
    // DROP ZONE 16 — Fast Paced Montage (Sectors & Verticals)
    // =============================================================
    {
      id: 16,
      dropZone: 'DROP ZONE 16',
      fcpScene: 'Fast Paced Montage',
      category: 'Sectors & Verticals',
      tag: 'Industry Tailored',
      title: 'Built for clinics, salons & aesthetic centers.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0A0408] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Industry Customization" badge="Multi-Sector" />
          <div className="flex-1 z-10 flex flex-col justify-between w-full py-2">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                Specialized Clinical Workflows
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                Built for service leaders.<br />
                <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                  Designed for real clinical care.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-4 my-auto">
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
                <span className="text-[10px] font-mono text-[#ECA9B7] font-bold block">HEALTHCARE</span>
                <h4 className="text-sm font-bold text-white">Dental Clinics</h4>
                <p className="text-xs text-white/60 leading-relaxed">Operatory buffer times & multi-doctor shift sync.</p>
              </div>
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
                <span className="text-[10px] font-mono text-purple-300 font-bold block">BEAUTY</span>
                <h4 className="text-sm font-bold text-white">Luxury Salons</h4>
                <p className="text-xs text-white/60 leading-relaxed">Senior stylist matching & multi-treatment booking.</p>
              </div>
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
                <span className="text-[10px] font-mono text-emerald-300 font-bold block">MED-SPA</span>
                <h4 className="text-sm font-bold text-white">Dermatology</h4>
                <p className="text-xs text-white/60 leading-relaxed">Advance UPI token deposits & pre-care instructions.</p>
              </div>
              <div className="bg-[#140A12] border border-white/10 rounded-2xl p-4 space-y-2 shadow-lg">
                <span className="text-[10px] font-mono text-amber-300 font-bold block">WELLNESS</span>
                <h4 className="text-sm font-bold text-white">Ayurveda & Spa</h4>
                <p className="text-xs text-white/60 leading-relaxed">Therapy room sanitization & practitioner load balance.</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Custom service menus and price lists configured in seconds.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 17 — Fast Paced Montage (VIP Client Intelligence)
    // =============================================================
    {
      id: 17,
      dropZone: 'DROP ZONE 17',
      fcpScene: 'Fast Paced Montage',
      category: 'Client Intelligence',
      tag: 'VIP Memory',
      title: 'VIP Client intelligence at your fingertips.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C060A] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Patient CRM" badge="VIP Memory" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-5 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Personalized Patient Care
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Happier clients.<br />
                  <span className="bg-gradient-to-r from-white to-[#ECA9B7] bg-clip-text text-transparent">
                    Every single call.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Aiva recognizes repeat callers, knows their preferred specialist, previous treatments, and special notes so every client feels recognized like a VIP.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 inline-block font-bold">
                  ✓ Instant Caller Dossier Lookup
                </span>
              </div>
            </div>

            <div className="col-span-7 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D94676] to-[#ECA9B7] flex items-center justify-center font-bold text-white text-xs">
                    RD
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">Rahul Dravid</span>
                    <span className="text-[10px] text-[#ECA9B7]">VIP Patient • 8 Completed Visits</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Total Spend: ₹18,400
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs my-auto">
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 block">PREFERRED SPECIALIST</span>
                  <span className="text-white font-medium">Dr. Ananya Iyer (Endo)</span>
                </div>
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 block">SPECIAL PREFERENCES</span>
                  <span className="text-white font-medium">Prefers evening slots after 4 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Build lifelong customer loyalty with automated clinical memory.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 18 — Fast Paced Montage (Staff Management & Morale)
    // =============================================================
    {
      id: 18,
      dropZone: 'DROP ZONE 18',
      fcpScene: 'Fast Paced Montage',
      category: 'Staff Management',
      tag: 'Staff Wellness',
      title: 'A stronger clinic. A happier front desk team.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#080206] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Staff Management" badge="Optimal Load Balance" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Workload Balancing
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  A calmer team.<br />
                  <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                    A stronger clinic.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Shield your front desk staff from constant phone ringing. Let them provide warm, attentive care to patients walking into your clinic.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                  ✓ Zero Front Desk Phone Burnout
                </span>
              </div>
            </div>

            <div className="col-span-6 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between text-xs pb-2 border-b border-white/10 font-mono">
                <span className="font-bold text-white">Daily Practitioner Capacity</span>
                <span className="text-emerald-400 font-bold">Optimal</span>
              </div>
              <div className="space-y-3 text-xs my-auto">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-white">Dr. Ananya Iyer (Dental)</span>
                    <span className="text-[#ECA9B7] font-bold">8 / 8 Slots Filled</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="w-full h-full bg-[#E65C8E] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-white">Arjun Reddy (Senior Stylist)</span>
                    <span className="text-purple-300 font-bold">6 / 7 Slots Filled</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="w-[85%] h-full bg-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Maximizes daily billable hours with zero practitioner fatigue.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 19 — Fast Paced Montage (Advance UPI Token Security)
    // =============================================================
    {
      id: 19,
      dropZone: 'DROP ZONE 19',
      fcpScene: 'Fast Paced Montage',
      category: 'UPI Payments',
      tag: 'Zero No-Shows',
      title: 'Lock commitment with advance UPI deposits.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C060A] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="UPI Payments" badge="Instant Settlement" badgeColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/30" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                  No-Show Shield
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Instant UPI tokens.<br />
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                    Zero no-show anxiety.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Collect advance tokens (₹500 or full consultation) automatically over WhatsApp via Google Pay, PhonePe, or Paytm. Slashes patient no-shows by 78%.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                  ✓ Slashes No-Shows by 78% in India
                </span>
              </div>
            </div>

            <div className="col-span-6 bg-[#140A12] border border-emerald-500/30 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 font-mono">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CreditCard size={14} className="text-emerald-400" /> UPI Instant Token Request
                </span>
                <span className="text-emerald-400 font-bold">Settled to HDFC Bank</span>
              </div>
              <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/50">APPOINTMENT TOKEN:</span>
                  <span className="text-white font-bold">₹500.00</span>
                </div>
                <div className="text-4xl font-black font-mono text-white text-center py-1">₹500.00</div>
                <div className="text-[10px] text-white/50 text-center font-mono">
                  Google Pay • PhonePe • Paytm • BHIM UPI
                </div>
              </div>
              <div className="bg-emerald-950/40 p-2 rounded-xl text-center text-xs text-emerald-300 font-mono font-bold">
                ✓ Auto-Refunded If Cancelled 24 Hours Prior
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Instant settlement directly to your clinic bank account. Zero gateway delays.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 20 — Fast Paced Montage (Modern Clinic Sanctuary)
    // =============================================================
    {
      id: 20,
      dropZone: 'DROP ZONE 20',
      fcpScene: 'Fast Paced Montage',
      category: 'Clinic Sanctuary',
      tag: 'Serene Space',
      title: 'Transform your reception from chaos to calm.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0A0308] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Clinic Sanctuary" badge="Modern Space" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Patient Hospitality
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  A calmer, brighter<br />
                  <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                    reception experience.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Turn your front desk into a calm, welcoming luxury lounge. While Aiva handles every phone inquiry silently in the cloud, your team delivers five-star hospitality in person.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-[#ECA9B7] bg-[#E65C8E]/10 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block font-bold">
                  ✓ 100% Silent Front Desk • Zero Ringing Phones
                </span>
              </div>
            </div>

            <div className="col-span-6 relative flex flex-col justify-between h-full">
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-white/15 shadow-2xl min-h-[220px]">
                <img
                  src="/mobile-storefront.jpg"
                  alt="Modern Clinic Lounge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xs font-bold text-white">Aura Dental & Aesthetics Lounge</div>
                  <div className="text-[10px] text-white/60">Indiranagar, Bangalore • Calm Front Desk</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Great clinical service starts with a peaceful environment.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 21 — Fast Paced Montage (Audio Latency Engine)
    // =============================================================
    {
      id: 21,
      dropZone: 'DROP ZONE 21',
      fcpScene: 'Fast Paced Montage',
      category: 'Audio Engineering',
      tag: 'Sub-300ms Latency',
      title: 'Ultra-low latency voice engine (<240ms).',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C060A] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Audio Engineering" badge="240ms Sub-Perception" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-5 flex flex-col justify-between h-full py-1">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Real-Time Voice Architecture
                </span>
                <div className="text-5xl lg:text-6xl font-black font-mono text-[#ECA9B7] tracking-tight">
                  240ms
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Faster than human<br />
                  conversational pauses.
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Engineered for real-time natural speech with sub-300ms turn-taking. Zero awkward pauses, robotic delays, or speech overlap.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
                  ✓ Human Latency Threshold: &lt;300ms
                </span>
              </div>
            </div>

            <div className="col-span-7 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 font-mono">
                <span className="font-bold text-white flex items-center gap-2">
                  <Volume2 size={14} className="text-[#E65C8E]" /> Multi-Band Frequency Spectrum
                </span>
                <span className="text-[#ECA9B7]">48kHz HD Audio</span>
              </div>

              <div className="my-auto flex items-center justify-center gap-1.5 h-20 bg-black/40 rounded-xl px-4 py-2 border border-white/5">
                {[10, 18, 30, 48, 40, 22, 36, 56, 42, 24, 34, 52, 38, 22, 14, 28, 44, 30, 16, 8].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1.5 bg-gradient-to-t from-[#D94676] to-[#ECA9B7] rounded-full shadow-[0_0_12px_rgba(230,92,142,0.85)]"
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
                  <span className="text-[9px] text-white/40 font-mono block">SPEECH TO TEXT</span>
                  <span className="font-mono font-bold text-white text-sm">65ms</span>
                </div>
                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
                  <span className="text-[9px] text-white/40 font-mono block">LLM REASONING</span>
                  <span className="font-mono font-bold text-[#ECA9B7] text-sm">110ms</span>
                </div>
                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
                  <span className="text-[9px] text-white/40 font-mono block">VOICE SYNTHESIS</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">65ms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Tuned for Indian 4G/5G mobile networks and noisy clinical environments.
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 22 — Fast Paced Montage (Freedom & Peace of Mind)
    // =============================================================
    {
      id: 22,
      dropZone: 'DROP ZONE 22',
      fcpScene: 'Fast Paced Montage',
      category: 'Clinical Freedom',
      tag: 'Peace of Mind',
      title: 'Focus on treatments. Let Aiva handle the calls.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#080206] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 relative text-left">
          <AppleHeader category="Staff Wellness" badge="Peace of Mind" />
          <div className="flex-1 z-10 grid grid-cols-12 gap-8 items-center w-full py-2">
            <div className="col-span-6 flex flex-col justify-between h-full py-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#ECA9B7] uppercase bg-[#E65C8E]/15 px-3 py-1 rounded-full border border-[#E65C8E]/30 inline-block">
                  Doctor Work-Life Balance
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  Focus on treatments.<br />
                  <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                    Aiva handles the calls.
                  </span>
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Perform complex procedures with uninterrupted clinical focus. Your schedule is locked, your patients are confirmed, and your practice runs on autopilot.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                  ✓ Over 48 Hours Saved Per Month
                </span>
              </div>
            </div>

            <div className="col-span-6 bg-[#140A12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 font-mono">
                <span className="font-bold text-white">Monthly Clinical Freedom Summary</span>
                <span className="text-emerald-400 font-bold">100% Automated</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs my-auto">
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 block font-mono">CLINICAL HOURS SAVED</span>
                  <span className="text-2xl font-black text-white font-mono">48 hrs</span>
                  <span className="text-[10px] text-emerald-400 block font-semibold">+32 extra patient slots</span>
                </div>
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 block font-mono">REVENUE RECOVERED</span>
                  <span className="text-2xl font-black text-[#ECA9B7] font-mono">₹1.84L</span>
                  <span className="text-[10px] text-white/60 block font-semibold">Zero lost inquiries</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 pt-3 border-t border-white/[0.08]">
            Trusted by leading healthcare and luxury wellness clinics across India.
          </div>
        </div>
      )
    },
    // =============================================================
    // DROP ZONE 23 — 9:16 Mobile Portrait (Active HD Voice Call HUD)
    // =============================================================
    {
      id: 23,
      dropZone: 'DROP ZONE 23',
      fcpScene: '9:16 Mobile Portrait',
      category: 'Mobile Voice HD',
      tag: 'Dynamic Island Call',
      title: 'Active Voice Call Screen (Mobile Portrait).',
      aspect: '9:16',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#080206] p-5 flex flex-col justify-between border border-[#E65C8E]/40 text-center relative overflow-hidden select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[radial-gradient(circle,rgba(230,92,142,0.2),transparent_70%)] pointer-events-none" />

          {/* iOS Status Bar + Dynamic Island */}
          <div className="flex flex-col items-center w-full z-10 pt-1">
            <div className="w-full flex justify-between items-center text-xs text-white/70 font-mono px-2">
              <span className="font-bold">9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">Airtel 5G</span>
                <span className="w-5 h-2.5 rounded-sm border border-white/70 inline-block p-0.5">
                  <span className="w-full h-full bg-white block rounded-[1px]"></span>
                </span>
              </div>
            </div>
            {/* Dynamic Island In-Call Pill */}
            <div className="mt-2 bg-black/95 border border-white/20 px-4 py-2 rounded-full flex items-center justify-between w-64 shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[11px] font-bold text-white tracking-wide">aiva Voice HD</span>
              </div>
              <div className="flex items-center gap-1 h-3">
                {[6, 12, 18, 10, 16, 8].map((h, i) => (
                  <span key={i} style={{ height: `${h}px` }} className="w-1 bg-[#E65C8E] rounded-full animate-bounce"></span>
                ))}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">00:48</span>
            </div>
          </div>

          {/* Caller Identity & Live Voice Visualizer */}
          <div className="flex-1 z-10 flex flex-col justify-center items-center space-y-3 py-2 w-full">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#D94676] to-[#ECA9B7] p-1 shadow-[0_0_40px_rgba(230,92,142,0.55)]">
              <div className="w-full h-full bg-[#120810] rounded-full flex items-center justify-center text-[#E65C8E]">
                <Mic size={32} />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                ● LIVE RECEPTIONIST SESSION • LINE 1
              </span>
              <h2 className="text-2xl font-black text-white mt-1.5 tracking-tight">Rahul Dravid</h2>
              <p className="text-[11px] text-white/60 font-mono">+91 98450 12345 • Indiranagar, Bangalore</p>
              <p className="text-xs text-[#ECA9B7] font-semibold mt-0.5">Aura Dental Clinic • Doctor Julian's Operatory</p>
            </div>

            {/* Glowing Frequency Visualizer & Live Dialog Card */}
            <div className="w-full bg-[#120710]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-2xl space-y-2.5 text-left">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
                <span>SPEECH RECOGNITION HUD</span>
                <span className="text-emerald-400 font-bold">240ms Sub-Perception</span>
              </div>
              {/* Audio Spectrum Waveform */}
              <div className="flex items-center justify-center gap-1.5 h-10 bg-black/50 rounded-xl px-2 border border-white/5">
                {[8, 16, 26, 38, 28, 14, 24, 40, 32, 18, 10, 22, 34, 20, 12, 28, 16, 8].map((h, i) => (
                  <span key={i} style={{ height: `${h}px` }} className="w-1.5 bg-gradient-to-t from-[#D94676] to-[#ECA9B7] rounded-full shadow-[0_0_8px_#E65C8E]"></span>
                ))}
              </div>
              {/* Live Dialog Feed */}
              <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[9px] text-[#ECA9B7] font-bold block uppercase tracking-wider">Live Dialog Transcription</span>
                <p className="text-xs text-white/90 leading-snug">
                  "Hello Rahul! I have reserved Saturday @ 3:30 PM with Dr. Julian. Official WhatsApp slip sent to your phone!"
                </p>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-2 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-bold text-[11px]">
                  <CheckCircle2 size={13} /> Slot Locked: Sat 18 Nov @ 3:30 PM
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold">Token: ₹500 (UPI)</span>
              </div>
            </div>
          </div>

          {/* iOS Call Controls + Home Bar */}
          <div className="z-10 w-full pt-1">
            <div className="grid grid-cols-3 gap-3 px-6 pb-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><Mic size={18} /></div>
                <span className="text-[10px] text-white/60">Mute</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><Volume2 size={18} /></div>
                <span className="text-[10px] text-white/60">Speaker</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg"><PhoneCall size={18} className="rotate-[135deg]" /></div>
                <span className="text-[10px] text-white/60">End</span>
              </div>
            </div>
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 24 — 9:16 Mobile Portrait (Official WhatsApp Chat Thread)
    // =============================================================
    {
      id: 24,
      dropZone: 'DROP ZONE 24',
      fcpScene: '9:16 Mobile Portrait',
      category: 'WhatsApp Official API',
      tag: 'Meta Verified Chat',
      title: 'Official WhatsApp Booking Slip (Mobile Portrait).',
      aspect: '9:16',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0B141A] p-4 flex flex-col justify-between border border-emerald-500/40 text-left relative select-none">
          {/* WhatsApp Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10 z-10 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                AD
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">Aura Dental Indiranagar</span>
                  <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full text-black flex items-center justify-center text-[8px] font-bold">✓</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Official Business Account • Online</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-white/70">
              <PhoneCall size={16} />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 z-10 flex flex-col justify-center space-y-2.5 py-2 w-full">
            <div className="text-center">
              <span className="text-[9px] bg-black/40 text-white/50 px-3 py-0.5 rounded-full font-mono uppercase">
                Today • End-to-End Encrypted
              </span>
            </div>

            {/* Inbound Customer Inquiry */}
            <div className="bg-[#202C33] text-white text-xs p-2.5 rounded-2xl rounded-tl-sm max-w-[85%] shadow-md border border-white/5">
              <p className="text-[11px] leading-relaxed">
                "Hello! I just confirmed my booking with Aiva on the phone. Could you please send me the appointment slip and clinic address?"
              </p>
              <span className="text-[8px] text-white/40 block text-right font-mono mt-0.5">11:41 AM</span>
            </div>

            {/* Inbound Booking Confirmation Card */}
            <div className="bg-[#202C33] rounded-2xl rounded-tl-sm p-3.5 text-xs text-white/90 space-y-2 shadow-2xl border border-white/5">
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="font-bold text-[#ECA9B7] text-xs">Aura Dental Appointment Receipt</span>
                <span className="text-[9px] font-mono text-emerald-400">#AD-8842</span>
              </div>
              <p className="font-semibold text-white text-xs">Namaste Rahul Dravid,</p>
              <p className="text-[10px] text-white/80 leading-relaxed">
                Your consultation has been confirmed by Aiva AI Front Desk:
              </p>
              <div className="bg-black/40 p-2.5 rounded-xl font-mono text-[10px] space-y-1.5 text-white/90 border border-white/5">
                <div className="flex justify-between">
                  <span className="text-white/50">DATE & TIME:</span>
                  <span className="text-white font-bold">Sat, 18 Nov @ 3:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">SPECIALIST:</span>
                  <span className="text-[#ECA9B7] font-bold">Dr. Julian (Endodontist)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">TREATMENT:</span>
                  <span className="text-white">Root Canal Consultation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">OPERATORY:</span>
                  <span className="text-emerald-400">Chair 1 (15m Buffer Locked)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10">
                  <span className="text-white/50">ADVANCE TOKEN:</span>
                  <span className="text-emerald-400 font-bold">₹500 Paid via Google Pay</span>
                </div>
              </div>

              {/* Action Buttons inside WhatsApp */}
              <div className="space-y-1 pt-1">
                <button className="w-full py-1.5 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/40 font-bold text-[11px] flex items-center justify-center gap-1.5">
                  <MapPin size={12} /> Open in Google Maps (Indiranagar)
                </button>
                <button className="w-full py-1.5 bg-white/[0.06] text-white rounded-xl border border-white/10 font-medium text-[11px] flex items-center justify-center gap-1.5">
                  <Calendar size={12} /> Add to Apple / Google Calendar
                </button>
              </div>
              <span className="text-[8px] text-white/40 block text-right font-mono">11:42 AM • Delivered ✓✓</span>
            </div>

            {/* Patient Response */}
            <div className="bg-[#005C4B] text-white text-xs p-2.5 rounded-2xl rounded-tr-sm ml-auto max-w-[85%] text-right shadow-md">
              <p className="text-[11px]">"Received, thank you! Google Maps link opened. See you Saturday at 3:30 PM."</p>
              <span className="text-[8px] text-emerald-200 block font-mono mt-0.5">11:43 AM ✓✓</span>
            </div>
          </div>

          {/* WhatsApp Input Bar + Home Bar */}
          <div className="z-10 w-full">
            <div className="bg-[#202C33] rounded-full p-2.5 flex items-center justify-between text-xs text-white/50">
              <span className="text-[11px]">Message Aura Dental...</span>
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                ➤
              </div>
            </div>
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 25 — 9:16 Mobile Portrait (Lockscreen Push Notifications)
    // =============================================================
    {
      id: 25,
      dropZone: 'DROP ZONE 25',
      fcpScene: '9:16 Mobile Portrait',
      category: 'Live iOS Hub',
      tag: 'Lockscreen Stack',
      title: 'UPI Advance & Push Notification (Mobile Portrait).',
      aspect: '9:16',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-gradient-to-b from-[#180C14] via-[#0E060C] to-[#070306] p-5 flex flex-col justify-between border border-[#E65C8E]/40 text-left relative overflow-hidden select-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(230,92,142,0.18),transparent_70%)] pointer-events-none" />

          {/* iOS Clock Header */}
          <div className="z-10 flex flex-col items-center pt-2 text-center">
            <span className="text-xs font-medium text-white/80 font-mono tracking-wide">Saturday, 18 November</span>
            <span className="text-5xl font-black text-white tracking-tighter mt-0.5 font-mono">9:41</span>
          </div>

          {/* Stacked Live Activity + Push Notifications */}
          <div className="flex-1 z-10 flex flex-col justify-center space-y-2.5 py-2 w-full">
            {/* 0. iOS 18 Dynamic Live Activity Widget */}
            <div className="bg-black/90 backdrop-blur-2xl border border-[#E65C8E]/50 rounded-2xl p-3 shadow-2xl space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-[#ECA9B7] font-mono">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> aiva Live Activity
                </span>
                <span className="text-emerald-400 font-bold">Call Converted • 00:48</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white">
                <span className="font-bold">Rahul Dravid</span>
                <span className="font-mono text-emerald-300 font-semibold text-[11px]">Sat 3:30 PM (Dr. Julian)</span>
              </div>
              <div className="bg-white/[0.04] p-1.5 rounded-lg flex items-center justify-between text-[10px] text-white/70">
                <span>Google Calendar Synced</span>
                <span className="text-emerald-400 font-mono font-bold">₹500 Token Collected</span>
              </div>
            </div>

            {/* 1. Aiva Front Desk Notification */}
            <div className="bg-white/[0.08] backdrop-blur-2xl border border-[#E65C8E]/40 rounded-2xl p-3.5 shadow-2xl">
              <div className="flex justify-between items-center text-[10px] text-[#ECA9B7] mb-1 font-mono">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E65C8E]"></span> aiva • Front Desk
                </span>
                <span>Just now</span>
              </div>
              <h4 className="text-xs font-bold text-white">New Appointment Locked</h4>
              <p className="text-[11px] text-white/70 mt-0.5 leading-snug">
                Rahul Dravid booked Saturday @ 3:30 PM with Dr. Julian. Operatory 1 buffer secured.
              </p>
            </div>

            {/* 2. Google Pay UPI */}
            <div className="bg-white/[0.08] backdrop-blur-2xl border border-emerald-500/40 rounded-2xl p-3.5 shadow-2xl">
              <div className="flex justify-between items-center text-[10px] text-emerald-400 mb-1 font-mono">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Google Pay • UPI
                </span>
                <span>1m ago</span>
              </div>
              <h4 className="text-xs font-bold text-white">₹500.00 Advance Token Received</h4>
              <p className="text-[11px] text-white/70 mt-0.5 leading-snug">
                Payment received from Rahul Dravid for Aura Dental. Settled to HDFC Bank.
              </p>
            </div>

            {/* 3. Google Calendar */}
            <div className="bg-white/[0.08] backdrop-blur-2xl border border-blue-400/40 rounded-2xl p-3.5 shadow-2xl">
              <div className="flex justify-between items-center text-[10px] text-blue-300 mb-1 font-mono">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span> Google Calendar
                </span>
                <span>2m ago</span>
              </div>
              <h4 className="text-xs font-bold text-white">Schedule Synced & Protected</h4>
              <p className="text-[11px] text-white/70 mt-0.5 leading-snug">
                Dr. Julian's calendar updated. 15-minute sanitization buffer guard active.
              </p>
            </div>
          </div>

          {/* Bottom iOS Quick Controls + Home Bar */}
          <div className="z-10 w-full">
            <div className="flex justify-between items-center px-4 pb-1">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                <Sparkle size={16} />
              </div>
              <span className="text-[10px] text-white/50 font-mono tracking-wide">Swipe up to unlock</span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                <Camera size={16} />
              </div>
            </div>
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 26 — 9:16 Mobile Portrait (NEW: Aiva Mobile Executive OS)
    // =============================================================
    {
      id: 26,
      dropZone: 'DROP ZONE 26',
      fcpScene: '9:16 Mobile Portrait',
      category: 'Mobile Command OS',
      tag: 'Executive App',
      title: 'Aiva Mobile Executive OS (Daily Revenue & Live Feed).',
      aspect: '9:16',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0B050A] p-5 flex flex-col justify-between border border-[#E65C8E]/40 text-left relative overflow-hidden select-none">
          {/* iOS Status + App Header */}
          <div className="z-10 pt-1 pb-2 border-b border-white/10">
            <div className="flex justify-between items-center text-xs text-white/60 font-mono mb-1">
              <span>9:41</span>
              <span>Aiva OS Mobile</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono text-[#ECA9B7] uppercase font-bold">Good Morning</span>
                <h3 className="text-base font-black text-white">Dr. Ananya Iyer</h3>
                <span className="text-[11px] text-white/50">Aura Dental Indiranagar</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#E65C8E]/20 border border-[#E65C8E]/40 flex items-center justify-center text-[#ECA9B7] font-bold text-xs">
                AI
              </div>
            </div>
          </div>

          {/* Today's Metrics Bento */}
          <div className="flex-1 z-10 flex flex-col justify-center space-y-2.5 py-2 w-full">
            <div className="bg-[#140A12] border border-white/10 rounded-2xl p-3.5 shadow-xl">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/50 mb-1">
                <span>TODAY'S ESTIMATED REVENUE</span>
                <span className="text-emerald-400 font-bold">+34% vs avg</span>
              </div>
              <div className="text-3xl font-black font-mono text-emerald-400 tracking-tight">₹42,800</div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[9px] text-white/40 font-mono block">CALLS HANDLED</span>
                  <span className="font-bold text-emerald-400 text-xs">38 (0 Missed)</span>
                </div>
                <div>
                  <span className="text-[9px] text-white/40 font-mono block">SLOTS BOOKED</span>
                  <span className="font-bold text-white text-xs">14 Confirmed</span>
                </div>
              </div>
            </div>

            {/* Live Call Feed Card */}
            <div className="bg-[#120710] border border-emerald-500/40 rounded-2xl p-3.5 shadow-xl space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#ECA9B7] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Voice Session
                </span>
                <span className="text-white/40">Line 2</span>
              </div>
              <div className="font-bold text-white text-xs">Vikram Malhotra</div>
              <p className="text-[11px] text-white/70 leading-snug">
                Booked Balayage Coloring Treatment with Arjun Reddy for Saturday @ 5:00 PM (₹4,500).
              </p>
              <div className="text-[9px] text-emerald-400 font-mono font-bold pt-0.5">
                ✓ WhatsApp Confirmation Dispatched • ₹500 Token Paid
              </div>
            </div>

            {/* Today's Schedule Preview */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 space-y-1.5 text-xs">
              <span className="text-[9px] font-mono text-white/50 uppercase font-bold block">Next Up in Operatory</span>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <div>
                  <span className="font-bold text-white block text-xs">10:00 AM • Rahul Dravid</span>
                  <span className="text-[10px] text-white/50">Root Canal • Dr. Julian</span>
                </div>
                <span className="text-emerald-400 font-mono text-xs font-bold">₹1,200</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-white block text-xs">11:30 AM • Rahul Sharma</span>
                  <span className="text-[10px] text-white/50">Laser Whitening • Dr. Ananya</span>
                </div>
                <span className="text-emerald-400 font-mono text-xs font-bold">₹3,800</span>
              </div>
            </div>
          </div>

          {/* Bottom Mobile Dock + Home Bar */}
          <div className="z-10 w-full">
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center text-[10px] text-white/50 font-mono">
              <div className="text-[#ECA9B7] font-bold">● Home</div>
              <div>Calls</div>
              <div>Calendar</div>
              <div>Analytics</div>
            </div>
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 27 — 9:16 Mobile Portrait (NEW: Smart Operatory Calendar)
    // =============================================================
    {
      id: 27,
      dropZone: 'DROP ZONE 27',
      fcpScene: '9:16 Mobile Portrait',
      category: 'Operatory Calendar',
      tag: 'Multi-Chair Schedule',
      title: 'Smart Operatory Day Calendar (Mobile View).',
      aspect: '9:16',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0C060A] p-5 flex flex-col justify-between border border-[#E65C8E]/40 text-left relative overflow-hidden select-none">
          {/* Calendar Header */}
          <div className="z-10 pt-1 pb-2 border-b border-white/10">
            <div className="flex justify-between items-center text-xs text-white/60 font-mono mb-1">
              <span>Saturday, 18 Nov</span>
              <span className="text-emerald-400 font-bold">● 2 Chairs Protected</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-white">Operatory Day Schedule</h3>
                <span className="text-[11px] text-white/50">Aura Dental Indiranagar</span>
              </div>
              <button className="px-2.5 py-1 rounded-xl bg-[#E65C8E] text-white font-bold text-xs flex items-center gap-1 shadow-lg">
                <Plus size={11} /> Add
              </button>
            </div>
          </div>

          {/* Calendar Day Slots with Buffer Bars */}
          <div className="flex-1 z-10 flex flex-col justify-center space-y-2 py-2 w-full">
            {/* Slot 1 */}
            <div className="bg-[#140A12] border border-[#E65C8E]/40 rounded-xl p-2.5 space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-white text-xs">10:00 AM - 11:00 AM</span>
                <span className="text-[#ECA9B7] font-mono font-bold text-xs">₹1,200</span>
              </div>
              <div className="text-xs text-white/90 font-medium">Rahul Dravid • Root Canal</div>
              <div className="text-[10px] text-white/50">Chair 1 • Dr. Julian</div>
            </div>

            {/* Sanitization Buffer */}
            <div className="bg-amber-500/15 border border-dashed border-amber-400/50 rounded-xl p-1.5 text-center text-[10px] font-mono text-amber-300 font-bold">
              🛡️ 15m Sanitization & Operatory Buffer (Locked by Aiva)
            </div>

            {/* Slot 2 */}
            <div className="bg-[#140A12] border border-purple-500/40 rounded-xl p-2.5 space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-white text-xs">11:15 AM - 12:15 PM</span>
                <span className="text-purple-300 font-mono font-bold text-xs">₹3,800</span>
              </div>
              <div className="text-xs text-white/90 font-medium">Rahul Sharma • Laser Whitening</div>
              <div className="text-[10px] text-white/50">Chair 1 • Dr. Ananya Iyer</div>
            </div>

            {/* Sanitization Buffer */}
            <div className="bg-amber-500/15 border border-dashed border-amber-400/50 rounded-xl p-1.5 text-center text-[10px] font-mono text-amber-300 font-bold">
              🛡️ 15m Sanitization & Operatory Buffer (Locked by Aiva)
            </div>

            {/* Slot 3 */}
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-2.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-300 block">1:30 PM - 2:30 PM</span>
                <span className="text-[10px] text-emerald-400/80">Open Operatory Slot</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                Aiva Booking Active
              </span>
            </div>
          </div>

          {/* Quick Floating Action + Home Bar */}
          <div className="z-10 w-full">
            <div className="bg-white/[0.04] p-2.5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/70 text-[11px]">Synced with Google Calendar & Practo</span>
              <span className="text-emerald-400 font-mono font-bold text-xs">0 Conflicts</span>
            </div>
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 28 — 9:16 Mobile Portrait (NEW: Google Reviews Booster)
    // =============================================================
    {
      id: 28,
      dropZone: 'DROP ZONE 28',
      fcpScene: '9:16 Mobile Portrait',
      category: 'Reputation Engine',
      tag: 'Google Business Profile',
      title: 'Google & Practo 5-Star Reviews (Mobile Profile).',
      aspect: '9:16',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0B050A] p-5 flex flex-col justify-between border border-amber-400/40 text-left relative overflow-hidden select-none">
          {/* Google Profile Header */}
          <div className="z-10 pt-1 pb-2 border-b border-white/10 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-black text-[10px]">
                G
              </div>
              <span className="text-xs font-bold text-white">Google Business Profile</span>
            </div>
            <div>
              <h3 className="text-base font-black text-white">Aura Dental & Aesthetics</h3>
              <p className="text-[11px] text-white/50">100ft Road, Indiranagar, Bengaluru</p>
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-amber-400 font-black font-mono text-base">4.9 ★★★★★</span>
              <span className="text-[10px] text-white/60 font-mono">(284 Verified Reviews)</span>
            </div>
          </div>

          {/* Review Showcase Bento */}
          <div className="flex-1 z-10 flex flex-col justify-center space-y-2 py-2 w-full">
            {/* Live New Review Banner */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                ★
              </div>
              <div className="text-xs">
                <span className="text-amber-300 font-bold block text-xs">New 5-Star Review Received</span>
                <span className="text-[10px] text-white/60">Dispatched via Aiva automated WhatsApp link</span>
              </div>
            </div>

            {/* Review Card 1 */}
            <div className="bg-[#140A12] border border-white/10 rounded-2xl p-3 space-y-1.5 shadow-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-xs">Rahul Sharma (Indiranagar)</span>
                <span className="text-amber-400 font-bold text-[10px]">★★★★★</span>
              </div>
              <p className="text-[11px] text-white/80 leading-snug">
                "Phenomenal clinic! Called to book, Aiva answered immediately, checked Dr. Ananya's schedule, and sent me a WhatsApp slip with directions. Zero waiting time!"
              </p>
              <span className="text-[8px] text-white/40 block font-mono">2 minutes ago • Verified Patient</span>
            </div>

            {/* Review Card 2 */}
            <div className="bg-[#140A12] border border-white/10 rounded-2xl p-3 space-y-1.5 shadow-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-xs">Sneha Nair (Koramangala)</span>
                <span className="text-amber-400 font-bold text-[10px]">★★★★★</span>
              </div>
              <p className="text-[11px] text-white/80 leading-snug">
                "Super seamless booking process. Loved the WhatsApp directions and advance payment link. Staff was courteous and the clinic is stunning."
              </p>
              <span className="text-[8px] text-white/40 block font-mono">1 hour ago • Verified Patient</span>
            </div>
          </div>

          {/* Bottom Stats + Home Bar */}
          <div className="z-10 w-full">
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10 text-xs">
              <div className="bg-white/[0.04] p-2 rounded-xl border border-white/5">
                <span className="text-[8px] text-white/40 font-mono block">MONTHLY REVIEWS</span>
                <span className="font-mono font-bold text-emerald-400 text-xs">+48 Reviews</span>
              </div>
              <div className="bg-white/[0.04] p-2 rounded-xl border border-white/5">
                <span className="text-[8px] text-white/40 font-mono block">LOCAL RANKING</span>
                <span className="font-mono font-bold text-[#ECA9B7] text-xs">#1 in Indiranagar</span>
              </div>
            </div>
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </div>
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 29 — 9:16 Mobile Portrait (NEW: Smart Call Transfer & Brief)
    // =============================================================
    {
      id: 29,
      dropZone: 'DROP ZONE 29',
      fcpScene: '9:16 Mobile Portrait',
      category: 'Smart Call Brief',
      tag: 'VIP Escalation',
      title: 'Smart Call Brief & VIP Escalation (Live Patient Context on iOS).',
      aspect: '9:16',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0E060C] p-5 flex flex-col justify-between border border-[#E65C8E]/40 text-left relative overflow-hidden select-none">
          {/* iOS Incoming Escalation Header */}
          <div className="z-10 pt-1 pb-2 border-b border-white/10 space-y-0.5">
            <div className="flex justify-between items-center text-xs text-white/60 font-mono">
              <span>9:41 AM</span>
              <span className="text-amber-400 font-bold">● Aiva Smart Transfer</span>
            </div>
            <span className="text-[9px] font-mono tracking-widest uppercase text-[#ECA9B7] bg-[#E65C8E]/10 px-2 py-0.5 rounded border border-[#E65C8E]/30 inline-block font-bold">
              VIP Caller Escalation
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">Vikram Malhotra</h3>
            <p className="text-[10px] text-white/60 font-mono">+91 98860 55678 • Bandra West, Mumbai</p>
          </div>

          {/* AI Pre-Call Context Brief */}
          <div className="flex-1 z-10 flex flex-col justify-center space-y-2 py-2 w-full">
            <div className="bg-[#140A12] border border-[#E65C8E]/40 rounded-2xl p-3 space-y-2 shadow-2xl">
              <div className="flex justify-between items-center text-xs pb-1 border-b border-white/10">
                <span className="font-bold text-white flex items-center gap-1.5 text-xs">
                  <UserCheck size={13} className="text-emerald-400" /> Patient Dossier
                </span>
                <span className="text-emerald-400 font-mono text-[9px] font-bold">VIP Status</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/[0.04] p-1.5 rounded-xl">
                  <span className="text-[8px] text-white/40 block">PREVIOUS VISITS</span>
                  <span className="font-bold text-white text-xs">8 Completed</span>
                </div>
                <div className="bg-white/[0.04] p-1.5 rounded-xl">
                  <span className="text-[8px] text-white/40 block">TOTAL VALUE</span>
                  <span className="font-bold text-[#ECA9B7] text-xs">₹18,400</span>
                </div>
              </div>
              <div className="bg-white/[0.04] p-2 rounded-xl space-y-0.5 text-xs">
                <span className="text-[8px] text-white/40 block font-mono uppercase font-bold">AI REASON FOR TRANSFER</span>
                <p className="text-white/90 leading-snug text-[11px]">
                  "Caller requested custom aesthetic smile makeover package. Aiva verified Dr. Ananya is free and transferred with complete consultation context."
                </p>
              </div>
            </div>

            {/* Suggested Answer Slot */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-2xl text-xs flex items-center justify-between">
              <div>
                <span className="text-emerald-400 font-bold block text-xs">Recommended Slot</span>
                <span className="text-white/80 text-[10px]">Saturday @ 4:30 PM is open in Operatory 2</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-300 font-bold">Ready to Book</span>
            </div>
          </div>

          {/* iOS Call Actions + Home Bar */}
          <div className="z-10 w-full space-y-1.5">
            <button className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2">
              <PhoneCall size={13} /> Accept Call With Context
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 bg-white/[0.08] text-white rounded-xl text-xs font-medium border border-white/10 text-center">
                Send WhatsApp Reply
              </button>
              <button className="py-2 bg-red-600/20 text-red-400 rounded-xl text-xs font-medium border border-red-500/30 text-center">
                Let Aiva Handle
              </button>
            </div>
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </div>
        </div>
      )
    },
    // =============================================================
    // DROP ZONE 30 — Outro Bridge (Call To Action)
    // =============================================================
    {
      id: 30,
      dropZone: 'DROP ZONE 30',
      fcpScene: 'Outro Bridge',
      category: 'Get Started',
      tag: 'Risk-Free Trial',
      title: 'Ready to transform your calls into opportunities?',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-[#0A0308] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/30 text-center relative overflow-hidden">
          {/* Minimalist Sonic Resonance & Harmonic Waves Artwork */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* Ambient Radiant Glow Orbs */}
            <div className="absolute w-[680px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(230,92,142,0.18),transparent_65%)] blur-2xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[radial-gradient(circle,rgba(16,185,129,0.06),transparent_70%)] blur-2xl" />
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(168,85,247,0.06),transparent_70%)] blur-2xl" />

            {/* Subtle Concentric Sonic Pulse Rings & Harmonic Waves */}
            <svg className="w-[850px] h-[500px] opacity-25 absolute" viewBox="0 0 850 500" fill="none">
              <ellipse cx="425" cy="250" rx="390" ry="200" stroke="url(#dz30RingGrad)" strokeWidth="1" strokeDasharray="4 6" />
              <ellipse cx="425" cy="250" rx="300" ry="150" stroke="url(#dz30RingGrad)" strokeWidth="1" />
              <ellipse cx="425" cy="250" rx="210" ry="105" stroke="url(#dz30RingGrad)" strokeWidth="1" strokeDasharray="3 5" />
              <ellipse cx="425" cy="250" rx="120" ry="60" stroke="url(#dz30RingGrad)" strokeWidth="1.2" />

              {/* Minimalist Harmonic Sine Waves */}
              <path d="M 60 250 Q 242.5 195 425 250 T 790 250" stroke="url(#dz30WaveGrad)" strokeWidth="1.5" strokeOpacity="0.4" />
              <path d="M 90 250 Q 257.5 295 425 250 T 760 250" stroke="url(#dz30WaveGrad)" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="2 4" />

              <defs>
                <linearGradient id="dz30RingGrad" x1="0" y1="0" x2="850" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E65C8E" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#ECA9B7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E65C8E" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="dz30WaveGrad" x1="0" y1="0" x2="850" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E65C8E" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#ECA9B7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#E65C8E" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <AppleHeader category="Get Started Today" badge="Free 7-Day Trial" />

          <div className="flex-1 z-10 max-w-xl mx-auto space-y-4 flex flex-col justify-center items-center">
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to transform your calls<br />
              <span className="bg-gradient-to-r from-white via-[#ECA9B7] to-[#E65C8E] bg-clip-text text-transparent">
                into growth opportunities?
              </span>
            </h2>
            <p className="text-sm md:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
              Keep your existing clinic phone number. No hardware, no long contracts, zero disruption to your daily clinical care.
            </p>
          </div>

          {/* Minimalist Bottom Breathing Space */}
          <div className="h-4" />
        </div>
      )
    },

    // =============================================================
    // DROP ZONE 31 — Grand Climax Finale (CALLS. CALENDAR. CLARITY.)
    // =============================================================
    {
      id: 31,
      dropZone: 'DROP ZONE 31',
      fcpScene: 'Scene Climax: Grand Finale',
      category: 'Brand Climax',
      tag: 'Grand Finale',
      title: 'aiva — CALLS. CALENDAR. CLARITY.',
      aspect: '16:9',
      renderContent: (isExport = false) => (
        <div className="w-full h-full bg-gradient-to-b from-[#180B14] via-[#0E060C] to-[#080306] p-7 md:p-8 flex flex-col justify-between border border-[#E65C8E]/40 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(230,92,142,0.25),transparent_70%)] pointer-events-none" />
          <div className="flex justify-between items-center w-full z-10 pb-3 border-b border-white/[0.08]">
            <span className="text-xs uppercase font-mono tracking-widest text-[#ECA9B7] bg-[#E65C8E]/10 px-3 py-1 rounded-full border border-[#E65C8E]/30 font-bold">
              Official Finale Asset
            </span>
            <span className="text-xs text-white/40 font-mono">FCP DROP ZONE 31</span>
          </div>

          <div className="flex-1 z-10 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2 h-16 mb-4">
              {[6, 16, 28, 48, 60, 42, 22, 36, 54, 38, 20, 10, 26, 46, 62, 44, 18, 8].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className="w-2 bg-gradient-to-t from-[#D94676] to-[#ECA9B7] rounded-full shadow-[0_0_16px_rgba(230,92,142,0.85)]"
                />
              ))}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight">
              aiva
            </h1>
            <p className="text-base lg:text-lg font-bold tracking-[0.3em] text-[#ECA9B7] uppercase mt-2">
              CALLS. CALENDAR. CLARITY.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 px-5 py-2 rounded-full text-xs font-semibold text-emerald-300">
              <CheckCircle2 size={16} /> The AI Front Desk for Indian Service Leaders
            </div>
          </div>

          <div className="z-10 text-xs text-white/40 uppercase tracking-widest font-mono pt-3 border-t border-white/[0.08]">
            A SMARTER WAY TO HANDLE CALLS • AIVA.IN
          </div>
        </div>
      )
    }
  ];

  // ─── High-Definition PNG Exporter (Pixel-Accurate 1920x1080 / 1080x1920 Full HD) ───
  const handleDownload = async (screen: MarketingScreen) => {
    setDownloadingId(screen.id);
    try {
      if (document.fonts) {
        await document.fonts.ready;
      }

      // If viewing in Clean View modal, capture the active on-screen modal directly for 100% WYSIWYG!
      const modalEl = document.getElementById(`modal-canvas-${screen.id}`);
      const exportEl = document.getElementById(`export-canvas-${screen.id}`);
      const targetElement = modalEl || exportEl;

      if (!targetElement) {
        console.error(`Canvas for screen ${screen.id} not found`);
        return;
      }

      const isPortrait = screen.aspect === '9:16';
      const targetWidth = isPortrait ? 1080 : 1920;
      const elementWidth = targetElement.clientWidth || (isPortrait ? 540 : 1024);
      const calculatedPixelRatio = targetWidth / elementWidth;

      const dataUrl = await toPng(targetElement, {
        quality: 1.0,
        pixelRatio: calculatedPixelRatio,
        cacheBust: true,
        backgroundColor: '#080306',
      });

      const link = document.createElement('a');
      const safeTitle = screen.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
      const dropZoneCode = screen.dropZone.replace(/\s+/g, '_');
      link.download = `Aiva_${dropZoneCode}_${safeTitle}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadAll = async () => {
    if (isBatchDownloading) return;
    setIsBatchDownloading(true);
    try {
      for (let i = 0; i < filteredScreens.length; i++) {
        const screen = filteredScreens[i];
        setBatchProgress({ current: i + 1, total: filteredScreens.length });
        await handleDownload(screen);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } finally {
      setIsBatchDownloading(false);
    }
  };

  const filteredScreens = screens.filter((s) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === '16:9') return s.aspect === '16:9';
    if (selectedFilter === '9:16') return s.aspect === '9:16';
    if (selectedFilter === 'scene1') return s.id <= 3;
    if (selectedFilter === 'scene2') return s.id >= 4 && s.id <= 6;
    if (selectedFilter === 'scene3') return s.id === 7;
    if (selectedFilter === 'scene4') return s.id >= 8 && s.id <= 14;
    if (selectedFilter === 'scene5') return s.id === 15;
    if (selectedFilter === 'mobile') return s.aspect === '9:16';
    if (selectedFilter === 'finale') return s.id >= 30;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070306] text-white font-sans p-6 md:p-10">
      {/* ─── Hidden High-Resolution Staging Layer (1024x576 for 16:9, 540x960 for 9:16) ─── */}
      <div style={{ position: 'fixed', left: 0, top: 0, zIndex: -9999, opacity: 0, pointerEvents: 'none' }}>
        {screens.map((screen) => (
          <div
            key={`export-${screen.id}`}
            id={`export-canvas-${screen.id}`}
            style={{
              width: screen.aspect === '16:9' ? '1024px' : '540px',
              height: screen.aspect === '16:9' ? '576px' : '960px',
              overflow: 'hidden',
              backgroundColor: '#080306',
            }}
          >
            {screen.renderContent(true)}
          </div>
        ))}
      </div>

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-mono tracking-widest text-[#ECA9B7] bg-[#E65C8E]/10 px-3 py-1 rounded-full border border-[#E65C8E]/30 flex items-center gap-1.5 font-bold">
              <Sparkles size={12} /> Final Cut Pro Ad Studio #74XX • Top-Level Media House Edition
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Aiva Marketing Master Assets
          </h1>
          <p className="text-xs md:text-sm text-white/50 mt-1 max-w-2xl">
            31 eye-stopping master screens (24 in 16:9 Landscape & 7 in 9:16 Mobile Portrait) crafted with high-contrast Bento compositions, atmospheric obsidian lighting, and authentic Indian clinical data.
          </p>
        </div>

        {/* Action & Filter Pills */}
        <div className="flex flex-col md:items-end gap-3">
          <button
            onClick={handleDownloadAll}
            disabled={isBatchDownloading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-[0_4px_20px_rgba(16,185,129,0.35)] flex items-center gap-2 transition-all self-start md:self-end"
          >
            {isBatchDownloading ? (
              <>
                <Loader2 size={14} className="animate-spin text-white" />
                <span>Downloading ({batchProgress.current}/{batchProgress.total})...</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>Download All Visible PNGs ({filteredScreens.length})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Navigation Tabs */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-6 scrollbar-none">
        {[
          { id: 'all', label: 'All 31 Drop Zones' },
          { id: 'mobile', label: '9:16 Mobile Showcase (7 Screens)' },
          { id: 'scene1', label: 'Scene 1: Meet Aiva (DZ 1-3)' },
          { id: 'scene2', label: 'Scene 2: Zero Conflicts (DZ 4-6)' },
          { id: 'scene3', label: 'Scene 3: Live Dashboard (DZ 7)' },
          { id: 'scene4', label: 'Scene 4: Rapid Montage (DZ 8-14)' },
          { id: 'scene5', label: 'Scene 5: Command Center (DZ 15)' },
          { id: '16:9', label: '16:9 Landscape (24)' },
          { id: '9:16', label: '9:16 Mobile (7)' },
          { id: 'finale', label: 'Outro & Finale (DZ 30-31)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              selectedFilter === tab.id
                ? 'bg-[#E65C8E] text-white border-[#E65C8E] shadow-[0_0_15px_rgba(230,92,142,0.4)]'
                : 'bg-white/[0.04] text-white/60 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of All Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredScreens.map((screen) => (
          <motion.div
            key={screen.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-[#0E060D] border border-white/10 hover:border-[#E65C8E]/60 rounded-2xl p-3 shadow-xl transition-all flex flex-col justify-between"
          >
            {/* Top Bar for Card */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#ECA9B7] bg-[#E65C8E]/10 px-2 py-0.5 rounded border border-[#E65C8E]/20">
                  {screen.dropZone}
                </span>
                <span className="text-[10px] text-white/50 font-medium">
                  {screen.aspect}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleDownload(screen)}
                  disabled={downloadingId === screen.id}
                  title="Download 1080p PNG"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-white/70 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/30 transition-all text-xs flex items-center gap-1"
                >
                  {downloadingId === screen.id ? (
                    <Loader2 size={12} className="animate-spin text-emerald-400" />
                  ) : (
                    <Download size={12} />
                  )}
                  <span className="text-[10px] font-mono">PNG</span>
                </button>
                <button
                  onClick={() => {
                    setFocusedScreen(screen);
                    setCleanScreenshotMode(false);
                  }}
                  title="Fullscreen Clean View"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/5 transition-all text-xs flex items-center gap-1"
                >
                  <Maximize2 size={12} />
                  <span className="text-[10px] font-mono">View</span>
                </button>
              </div>
            </div>

            {/* Screen Container Thumbnail */}
            <div
              onClick={() => {
                setFocusedScreen(screen);
                setCleanScreenshotMode(false);
              }}
              className={`relative cursor-pointer rounded-xl overflow-hidden border border-white/5 group-hover:shadow-[0_0_25px_rgba(230,92,142,0.2)] transition-all ${
                screen.aspect === '16:9' ? 'aspect-video w-full' : 'aspect-[9/16] w-48 mx-auto'
              }`}
            >
              <div className="w-full h-full pointer-events-none transform scale-[0.98] group-hover:scale-100 transition-all origin-center">
                {screen.renderContent(false)}
              </div>
            </div>

            {/* Bottom Card Info */}
            <div className="mt-2.5 pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono text-[#ECA9B7] block">{screen.fcpScene}</span>
              <h3 className="text-xs font-bold text-white truncate mt-0.5">{screen.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Clean Screenshot / Focus Modal ─── */}
      <AnimatePresence>
        {focusedScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Top Bar for Modal */}
            {!cleanScreenshotMode && (
              <div className="w-full max-w-5xl flex items-center justify-between mb-4 z-20">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#ECA9B7] bg-[#E65C8E]/10 px-2.5 py-1 rounded border border-[#E65C8E]/30 text-xs">
                      {focusedScreen.dropZone}
                    </span>
                    <span className="text-white/60 text-xs font-semibold">
                      {focusedScreen.fcpScene}
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-sm md:text-base mt-1">
                    {focusedScreen.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDownload(focusedScreen)}
                    disabled={downloadingId === focusedScreen.id}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 hover:brightness-110 transition-all"
                  >
                    {downloadingId === focusedScreen.id ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Saving PNG...
                      </>
                    ) : (
                      <>
                        <Download size={14} /> Download PNG
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setCleanScreenshotMode(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D94676] to-[#A6365C] text-white text-xs font-bold shadow-lg flex items-center gap-1.5 hover:brightness-110 transition-all"
                  >
                    <Camera size={14} /> Clean View
                  </button>
                  <button
                    onClick={() => setFocusedScreen(null)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* In Clean Mode, Floating Exit Button */}
            {cleanScreenshotMode && (
              <div className="fixed top-4 right-4 z-50">
                <button
                  onClick={() => setCleanScreenshotMode(false)}
                  className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 text-xs text-white/70 hover:text-white backdrop-blur-md flex items-center gap-1.5 shadow-2xl"
                >
                  <X size={14} /> Exit Clean Mode (Press Esc or Click)
                </button>
              </div>
            )}

            {/* Screen Canvas Container (id matches for direct WYSIWYG capture!) */}
            <div
              id={`modal-canvas-${focusedScreen.id}`}
              className={`relative shadow-[0_0_80px_rgba(230,92,142,0.25)] rounded-2xl overflow-hidden ${
                focusedScreen.aspect === '16:9'
                  ? 'w-full max-w-5xl aspect-video'
                  : 'h-[88vh] aspect-[9/16]'
              }`}
            >
              {focusedScreen.renderContent(false)}
            </div>

            {!cleanScreenshotMode && (
              <p className="text-[11px] text-white/40 mt-4 text-center">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Shift + Cmd + 4</kbd> on macOS to capture this screen, or click Download PNG for 1080p master export.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
