/**
 * Aiva — Calls Experience
 * Matte Black OS aesthetic.
 * Conversation Intelligence console.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  PhoneIncoming,
  PhoneForwarded,
  PhoneMissed,
  Bot,
  Clock,
  Volume2,
  Play,
  Pause,
  AlertTriangle,
  Sparkles,
  User,
  Scissors,
  CalendarDays,
  IndianRupee,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { callsAPI } from '../../lib/api';
import type { Call } from '../../types';

const outcomeConfig: Record<
  string,
  { label: string; icon: React.ElementType; bg: string; text: string; border: string }
> = {
  BOOKED: { label: 'Booked', icon: Phone, bg: 'bg-[#A66B8E]/10', text: 'text-[#A66B8E]', border: 'border-[#A66B8E]/20' },
  RESCHEDULED: { label: 'Rescheduled', icon: PhoneIncoming, bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  CANCELLED: { label: 'Cancelled', icon: Phone, bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  PRICE_INQUIRY: { label: 'Price Inquiry', icon: IndianRupee, bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  SERVICE_INQUIRY: { label: 'Service Inquiry', icon: Scissors, bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  TRANSFERRED: { label: 'Transferred', icon: PhoneForwarded, bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  VOICEMAIL: { label: 'Voicemail', icon: Bot, bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
  NO_ACTION: { label: 'No Action', icon: AlertTriangle, bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
  FOLLOW_UP_REQUIRED: { label: 'Follow Up', icon: PhoneIncoming, bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  UNKNOWN: { label: 'Unknown', icon: Phone, bg: 'bg-white/5', text: 'text-white/40', border: 'border-white/10' },
};

// Fallback for legacy outcomes
const legacyOutcomeMap: Record<string, string> = {
  booked: 'BOOKED',
  rescheduled: 'RESCHEDULED',
  cancelled: 'CANCELLED',
  faq: 'SERVICE_INQUIRY',
  transferred: 'TRANSFERRED',
  missed: 'VOICEMAIL',
  unknown: 'UNKNOWN'
};

const confidenceColors = {
  HIGH: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  MEDIUM: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  LOW: 'text-rose-400 bg-rose-400/10 border-rose-400/20'
};

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [filter, setFilter] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    loadCalls();
  }, [filter]);

  const loadCalls = async () => {
    setLoading(true);
    try {
      const data = await callsAPI.list({ outcome: filter || undefined, page: 1, page_size: 50 });
      setCalls(data.items || []);
      if (data.items && data.items.length > 0) {
        setSelectedCall(data.items[0]);
      }
    } catch {
      // Provide mock data if API fails
      const mockCalls: Call[] = [
        {
          id: 1, business_id: 1, customer_id: 1,
          call_start: new Date().toISOString(), call_end: new Date().toISOString(),
          duration_seconds: 210, outcome: 'booked',
          call_outcome: 'BOOKED', confidence: 'HIGH',
          customer_name: 'Rahul Sharma', phone_number: '+919876543210',
          service_requested: 'Haircut & Styling', staff_assigned: 'Priya',
          appointment_datetime: new Date(Date.now() + 86400000).toISOString(),
          price: 1500,
          summary: 'Rahul booked a Haircut & Styling appointment with Priya for tomorrow.',
          timeline_events: JSON.stringify([
            { timestamp: new Date(Date.now() - 210000).toISOString(), event: 'incoming_call', data: {} },
            { timestamp: new Date(Date.now() - 190000).toISOString(), event: 'tool_call_check_availability', data: { service: 'Haircut', date: 'tomorrow' } },
            { timestamp: new Date(Date.now() - 180000).toISOString(), event: 'tool_result_check_availability', data: { success: true, slots: ['2:00 PM', '4:30 PM'] } },
            { timestamp: new Date(Date.now() - 60000).toISOString(), event: 'tool_call_book_appointment', data: { service: 'Haircut', date: 'tomorrow', time: '2:00 PM' } },
            { timestamp: new Date(Date.now() - 50000).toISOString(), event: 'tool_result_book_appointment', data: { success: true, appointment_id: 101 } },
            { timestamp: new Date(Date.now() - 10000).toISOString(), event: 'sms_sent', data: { status: 'delivered' } },
          ]),
          transcript: 'Customer: Hi I\'d like a haircut tomorrow.\n\nAI: Checking availability... I have 2 PM and 4:30 PM with Priya.\n\nCustomer: 2 PM works.',
          recording_url: 'dummy_url', transfer_reason: null, voice_provider: 'elevenlabs', provider_call_id: '123',
          created_at: new Date().toISOString()
        }
      ];
      setCalls(mockCalls as any);
      setSelectedCall(mockCalls[0] as any);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '—';
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const getNormalizedOutcome = (call: Call) => {
    const raw = call.call_outcome || legacyOutcomeMap[call.outcome] || 'UNKNOWN';
    return outcomeConfig[raw] || outcomeConfig.UNKNOWN;
  };

  const renderTimelineEvent = (event: any, index: number) => {
    const isToolCall = event.event.startsWith('tool_call_');
    const isToolResult = event.event.startsWith('tool_result_');
    
    let icon = <CheckCircle2 size={12} />;
    let label = event.event;
    let color = 'text-white/40';
    
    if (event.event === 'incoming_call') {
      icon = <PhoneIncoming size={12} />;
      label = 'Incoming Call';
      color = 'text-blue-400';
    } else if (event.event === 'tool_result_book_appointment') {
      icon = <CheckCircle2 size={12} />;
      label = 'Appointment Booked';
      color = 'text-[#A66B8E]';
    } else if (event.event === 'tool_call_check_availability') {
      icon = <CalendarDays size={12} />;
      label = 'Availability Checked';
      color = 'text-emerald-400';
    } else if (event.event === 'sms_sent') {
      icon = <Bot size={12} />;
      label = 'SMS Confirmation Sent';
      color = 'text-purple-400';
    } else if (isToolCall) {
      icon = <Bot size={12} />;
      label = `AI Action: ${event.event.replace('tool_call_', '').replace(/_/g, ' ')}`;
    } else if (isToolResult) {
      icon = <CheckCircle2 size={12} />;
      label = `Action Completed: ${event.event.replace('tool_result_', '').replace(/_/g, ' ')}`;
    }

    return (
      <div key={index} className="flex gap-4 relative">
        <div className="flex flex-col items-center">
          <div className={`w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center z-10 ${color}`}>
            {icon}
          </div>
          {/* Vertical line connector */}
          <div className="w-[1px] h-full bg-white/[0.05] absolute top-6 bottom-[-16px]" />
        </div>
        <div className="pb-6 pt-1">
          <p className="text-[11px] font-bold text-white tracking-wide capitalize">{label}</p>
          <span className="text-[9px] text-white/30 font-medium">{new Date(event.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 pb-12 min-h-[calc(100vh-8rem)]">
      <div>
        <h1 className="text-[24px] font-black text-white tracking-tight">AI Calls</h1>
        <p className="text-[13px] mt-1 text-white/40 font-medium">Review deterministic business outcomes, summaries, and event timelines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 items-stretch">
        
        {/* Left Side: Calls List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex flex-wrap gap-1.5 bg-white/[0.03] backdrop-blur-2xl p-2 border border-white/[0.08] rounded-xl">
            {['', 'BOOKED', 'SERVICE_INQUIRY', 'PRICE_INQUIRY', 'VOICEMAIL'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-[#A66B8E] text-gray-900'
                    : 'text-white/40 hover:bg-white/5'
                }`}
              >
                {f === '' ? 'All' : outcomeConfig[f]?.label || f}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1 custom-scrollbar">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-lg animate-pulse" />
              ))
            ) : calls.length === 0 ? (
              <div className="text-center py-12 bg-white/[0.03] backdrop-blur-2xl rounded-xl border border-white/[0.08]">
                <p className="font-semibold text-white/40 text-xs">No calls recorded</p>
              </div>
            ) : (
              calls.map((call) => {
                const config = getNormalizedOutcome(call);
                const isSelected = selectedCall?.id === call.id;

                return (
                  <div
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className={`p-3.5 border rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-white/[0.05] backdrop-blur-2xl border-[#A66B8E]/30'
                        : 'bg-white/[0.02] backdrop-blur-2xl border-white/[0.08] hover:border-white/15'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${config.bg} ${config.text} ${config.border} flex-shrink-0`}>
                      <config.icon size={16} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-[14px] text-white truncate">
                          {call.customer_name || call.phone_number || 'Unknown Caller'}
                        </h4>
                        <span className="text-[10px] text-white/40 font-semibold">
                          {new Date(call.call_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${config.bg} ${config.text} ${config.border}`}>
                          {config.label}
                        </span>
                        {call.confidence && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${confidenceColors[call.confidence as keyof typeof confidenceColors]}`}>
                            {call.confidence} CONFIDENCE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Business Summary & Timeline */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {selectedCall ? (
              <motion.div
                key={selectedCall.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#0A0A0A] rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col h-full min-h-[520px]"
              >
                {/* Header */}
                <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
                  <div>
                    <h3 className="font-bold text-[18px] text-white flex items-center gap-2">
                      {selectedCall.customer_name || 'Unknown Caller'}
                      {selectedCall.phone_number && <span className="text-white/30 text-sm font-medium">({selectedCall.phone_number})</span>}
                    </h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1 flex items-center gap-2">
                      <span>Call #{selectedCall.id}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {formatDuration(selectedCall.duration_seconds)}
                      </span>
                      <span>·</span>
                      <span>{new Date(selectedCall.call_start).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                    getNormalizedOutcome(selectedCall).bg
                  } ${getNormalizedOutcome(selectedCall).text} ${getNormalizedOutcome(selectedCall).border}`}>
                    {getNormalizedOutcome(selectedCall).label}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  
                  {/* Business Summary Card */}
                  <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={12} className="text-[#A66B8E]" /> Deterministic Outcome Summary
                      </h4>
                      {selectedCall.confidence && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${confidenceColors[selectedCall.confidence as keyof typeof confidenceColors]}`}>
                          {selectedCall.confidence} CONFIDENCE
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[15px] font-medium text-white leading-relaxed">
                      {selectedCall.summary || 'Call ended before any structured outcome was determined.'}
                    </p>

                    {/* Structured Data Grid */}
                    {(selectedCall.service_requested || selectedCall.appointment_datetime) && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08]">
                        {selectedCall.service_requested && (
                          <div>
                            <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest flex items-center gap-1"><Scissors size={10}/> Service</span>
                            <span className="text-xs text-white font-semibold mt-1 block">{selectedCall.service_requested}</span>
                          </div>
                        )}
                        {selectedCall.staff_assigned && (
                          <div>
                            <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest flex items-center gap-1"><User size={10}/> Staff</span>
                            <span className="text-xs text-white font-semibold mt-1 block">{selectedCall.staff_assigned}</span>
                          </div>
                        )}
                        {selectedCall.appointment_datetime && (
                          <div>
                            <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest flex items-center gap-1"><CalendarDays size={10}/> Time</span>
                            <span className="text-xs text-white font-semibold mt-1 block">{new Date(selectedCall.appointment_datetime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                          </div>
                        )}
                        {selectedCall.price && (
                          <div>
                            <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest flex items-center gap-1"><IndianRupee size={10}/> Price</span>
                            <span className="text-xs text-emerald-400 font-semibold mt-1 block">₹{selectedCall.price}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Event Timeline */}
                  <div>
                    <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-6 px-1">
                      Call Event Timeline
                    </h4>
                    <div className="px-3">
                      {selectedCall.timeline_events ? (
                        (() => {
                          try {
                            const events = JSON.parse(selectedCall.timeline_events);
                            return events.map((event: any, i: number) => renderTimelineEvent(event, i));
                          } catch {
                            return <p className="text-xs text-white/30">Failed to parse timeline events.</p>;
                          }
                        })()
                      ) : (
                        <p className="text-xs text-white/30 italic">No timeline events recorded.</p>
                      )}
                    </div>
                  </div>

                  {/* Transcript Toggle */}
                  {selectedCall.transcript && (
                    <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.02]">
                      <button 
                        onClick={() => setShowTranscript(!showTranscript)}
                        className="w-full p-4 flex items-center justify-between text-[11px] font-bold text-white/50 uppercase tracking-widest hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="flex items-center gap-2"><Bot size={12}/> Raw Audit Transcript</span>
                        {showTranscript ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      
                      <AnimatePresence>
                        {showTranscript && (
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 pt-0 text-[12px] text-white/60 leading-relaxed font-mono border-t border-white/[0.05] max-h-[300px] overflow-y-auto whitespace-pre-wrap">
                              {selectedCall.transcript}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                </div>
              </motion.div>
            ) : (
              <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-8 h-full flex items-center justify-center text-center text-white/30 text-xs font-semibold">
                Select a call to view deterministic outcomes and timeline.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
