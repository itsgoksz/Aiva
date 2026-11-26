import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  PhoneCall,
  PhoneIncoming,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface Scenario {
  id: string;
  business: string;
  location: string;
  callerName: string;
  callerPhone: string;
  service: string;
  fee: string;
  dialogue: { speaker: 'caller' | 'aiva'; text: string }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'dental',
    business: 'Dr. Malik Dental & Smile Studio',
    location: '100ft Road, Indiranagar, Bangalore',
    callerName: 'Rohan Govind',
    callerPhone: '+91 98452 11094',
    service: 'Root Canal & Crown Consultation',
    fee: '₹1,800',
    dialogue: [
      { speaker: 'caller', text: 'Hi! I have severe tooth sensitivity since yesterday. Does Dr. Malik have any consultation slots open this Friday morning?' },
      { speaker: 'aiva', text: 'Hello Rohan! I can help you with that right away. Dr. Malik has emergency consultation slots this Friday at 10:15 AM or 11:45 AM. Would 10:15 AM work for you?' },
      { speaker: 'caller', text: '10:15 AM is perfect. Please book that.' },
      { speaker: 'aiva', text: 'You are all set for Friday at 10:15 AM with Dr. Malik. I have sent the clinic location map and appointment token directly to your WhatsApp at +91 98452 11094.' }
    ]
  },
  {
    id: 'salon',
    business: 'Aura Boutique Salon & Spa',
    location: '5th Block, Koramangala, Bangalore',
    callerName: 'Rahul Nair',
    callerPhone: '+91 99001 84521',
    service: 'HydraFacial + Hair Styling with Marcus',
    fee: '₹3,400',
    dialogue: [
      { speaker: 'caller', text: 'Hey there, looking to book a HydraFacial and hair styling session with Marcus this Saturday afternoon.' },
      { speaker: 'aiva', text: 'Hey Rahul! Marcus has availability this Saturday at 2:30 PM or 4:45 PM. Which time suits your schedule best?' },
      { speaker: 'caller', text: '2:30 PM works great.' },
      { speaker: 'aiva', text: 'Confirmed for Saturday, 2:30 PM with Marcus. Your booking confirmation and stylist note are on their way to your WhatsApp!' }
    ]
  },
  {
    id: 'auto',
    business: 'Bavaria Independent Specialist',
    location: 'Lavelle Road, Bangalore',
    callerName: 'Vikram Joshi',
    callerPhone: '+91 98860 32190',
    service: 'Brake Pad Replacement & Inspection',
    fee: '₹8,500',
    dialogue: [
      { speaker: 'caller', text: 'Hello, need to drop my BMW 330i for front brake pad inspection and synthetic oil replacement tomorrow.' },
      { speaker: 'aiva', text: 'Good afternoon Vikram! Our master technician has service intake slots tomorrow at 9:30 AM or 11:00 AM. Which one should I lock in?' },
      { speaker: 'caller', text: 'Let\'s do 9:30 AM morning drop-off.' },
      { speaker: 'aiva', text: 'Locked in for tomorrow, 9:30 AM at our Lavelle Road facility. Express intake pass sent to your WhatsApp.' }
    ]
  }
];

interface AivaDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AivaDemoModal({ isOpen, onClose }: AivaDemoModalProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const startCall = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCallState('calling');
    setDialogueIndex(0);

    setTimeout(() => {
      setCallState('connected');
      // Step through dialogue
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        setDialogueIndex(idx);
        if (idx >= scenario.dialogue.length) {
          clearInterval(interval);
          setCallState('completed');
        }
      }, 1800);
    }, 1000);
  };

  const handleReset = () => {
    setCallState('idle');
    setDialogueIndex(0);
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
      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#0D070B] border border-[#A66B8E]/30 p-4 sm:p-7 shadow-2xl z-10 text-white max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-[#ECA9B7] border border-[#E65C8E]/30 bg-[#E65C8E]/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E65C8E] animate-pulse" />
            INTERACTIVE TRIAL // LIVE TEST CALL SIMULATOR
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A66B8E]/20 border border-[#A66B8E]/40 flex items-center justify-center text-[#EC89B5] shrink-0">
              <PhoneCall size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white">
                Trial Test Call Simulator
              </h3>
              <p className="text-xs text-white/60">
                Experience how Aiva answers inbound calls in &lt;1s, verifies slots, and logs confirmed bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Switchers */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-5 sm:mb-6">
          {SCENARIOS.map((sc) => {
            const isSelected = selectedScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => startCall(sc)}
                className={`p-2 sm:p-3 rounded-xl text-left border transition-all cursor-pointer ${isSelected
                  ? 'bg-[#A66B8E]/25 border-[#A66B8E]/60 text-white shadow-md'
                  : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                  }`}
              >
                <div className="text-[11px] sm:text-xs font-semibold truncate">{sc.business.split('&')[0]}</div>
                <div className="text-[9px] sm:text-[10px] font-mono text-[#EC89B5] mt-0.5 truncate">{sc.fee} service</div>
              </button>
            );
          })}
        </div>

        {/* Interactive Call Display Screen */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/[0.08] mb-5 relative overflow-hidden">
          {callState === 'idle' && (
            <div className="py-6 sm:py-8 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#A66B8E]/15 border border-[#A66B8E]/30 flex items-center justify-center text-[#EC89B5] mx-auto mb-3 animate-pulse">
                <PhoneIncoming size={22} />
              </div>
              <div className="text-sm font-semibold text-white mb-1">
                Simulate Incoming Call: {selectedScenario.callerName} ({selectedScenario.callerPhone})
              </div>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
                Calling into {selectedScenario.business} ({selectedScenario.location})
              </p>
              <button
                onClick={() => startCall(selectedScenario)}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all flex items-center gap-2 mx-auto cursor-pointer hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
                style={{
                  background: "linear-gradient(180deg, #E65C8E 0%, #C44574 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px rgba(230, 92, 142, 0.35)",
                }}
              >
                <PhoneCall size={14} />
                <span>Answer Call with Aiva</span>
              </button>
            </div>
          )}

          {callState === 'calling' && (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 mx-auto mb-3 animate-ping">
                <PhoneIncoming size={20} />
              </div>
              <div className="text-sm font-mono text-emerald-400 font-semibold">
                Incoming Call: {selectedScenario.callerPhone}
              </div>
              <div className="text-xs text-neutral-400 mt-1">Connecting to Aiva Voice Agent (&lt;200ms latency)...</div>
            </div>
          )}

          {(callState === 'connected' || callState === 'completed') && (
            <div>
              {/* Call Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE CALL • {selectedScenario.callerPhone}</span>
                </div>
                <div className="text-neutral-400 flex items-center gap-1">
                  <Clock size={12} />
                  <span>{callState === 'completed' ? '1m 12s' : 'In Progress'}</span>
                </div>
              </div>

              {/* Dialogue Transcript Stream */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {selectedScenario.dialogue.slice(0, dialogueIndex).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${line.speaker === 'caller' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed ${line.speaker === 'caller'
                      ? 'bg-white/10 text-neutral-200 rounded-tr-xs'
                      : 'bg-[#A66B8E]/25 border border-[#A66B8E]/40 text-white rounded-tl-xs'
                      }`}>
                      <div className="text-[10px] font-mono text-neutral-400 mb-1">
                        {line.speaker === 'caller' ? selectedScenario.callerName : 'Aiva (Voice AI)'}
                      </div>
                      {line.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live CRM Generated Ticket */}
        {callState === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span>Appointment Confirmed</span>
                  <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                    WhatsApp Sent
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  {selectedScenario.service} • {selectedScenario.callerName}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-neutral-400">Recovered Value</div>
              <div className="text-sm font-bold font-mono text-emerald-400 flex items-center justify-end">
                <span>{selectedScenario.fee}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer Actions */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
          <span>Synced with Google Calendar & WhatsApp Business API</span>
          <button
            onClick={() => startCall(selectedScenario)}
            className="text-[#EC89B5] hover:underline font-medium cursor-pointer"
          >
            Restart Simulation
          </button>
        </div>
      </motion.div>
    </div>
  );
}
