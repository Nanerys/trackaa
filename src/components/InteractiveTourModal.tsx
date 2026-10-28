import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  CheckSquare,
  StickyNote,
  MessageSquare,
  TrendingUp,
  FolderLock,
  Flag,
  DollarSign,
  Flame,
  Users,
  Paperclip,
  Check,
  Send,
  Plus,
  Play,
  Heart,
  Smile,
} from 'lucide-react';

interface InteractiveTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTourModal: React.FC<InteractiveTourModalProps> = ({ isOpen, onClose }) => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Interactive states for slide widgets
  // Slide 1: Ladder
  const [statusLadderRung, setStatusLadderRung] = useState<'behind' | 'friction' | 'on_track' | 'velocity' | 'exceeding'>('velocity');
  const [mockStage, setMockStage] = useState('Seed Round');

  // Slide 2: Tasks
  const [mockTasks, setMockTasks] = useState([
    { id: 1, title: 'Send revised SAFE note to lead angel', done: true, priority: 'critical', milestone: 'Pre-Seed Close' },
    { id: 2, title: 'Review 5 customer discovery session transcripts', done: false, priority: 'high', milestone: 'Beta Feedback' },
    { id: 3, title: 'Deploy Stripe billing testbed to staging', done: false, priority: 'medium', milestone: 'v2.0 Release' },
  ]);

  // Slide 3: Post-it notes
  const [postIts, setPostIts] = useState([
    { id: 1, text: 'Investor call tomorrow at 10 AM with Bluecrest lead. Deck is ready!', color: 'amber', author: 'Triumph (Founder)', time: '10m ago', likes: 3 },
    { id: 2, text: 'Pushed v2.1 commit to staging — zero build errors! 🚀', color: 'emerald', author: 'Marcus (Tech)', time: '35m ago', likes: 5 },
    { id: 3, text: 'Mirabel completed 4 customer interviews. Notes logged in Comms.', color: 'blue', author: 'Amara (Product)', time: '1h ago', likes: 2 },
  ]);

  // Slide 4: Comms message input
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Mirabel Kalu', role: 'PM2', text: 'Hey team! Attached our latest SAFE pitch deck from the Asset Vault for quick review.', attachment: 'Trackaa Pre-Seed Pitch Deck v2.4 (PDF)' },
    { id: 2, sender: 'Triumph Ugoji', role: 'Founder', text: 'Looks crisp. Runway is locked at 18 months, let’s close this round before Friday.', attachment: null },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Slide 5: Runway calculator
  const [mockBurn, setMockBurn] = useState(8500);
  const mockCash = 157000;
  const calculatedRunway = (mockCash / mockBurn).toFixed(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  if (!isOpen) return null;

  const slides = [
    {
      id: 'venture-ladder',
      tabTitle: 'Venture Velocity',
      icon: Rocket,
      badge: 'Step 1 of 6 • Momentum Tracking',
      title: 'See your startup velocity at a single glance',
      description:
        'Say goodbye to vague status tags. Trackaa uses an Apple-inspired dynamic ladder so founders and team members know whether you are behind schedule, finding your footing, or exceeding expectations.',
      takeaway: '💡 "Clarity builds speed. You always know where your startup stands."',
    },
    {
      id: 'tasks-milestones',
      tabTitle: 'Tasks & Milestones',
      icon: CheckSquare,
      badge: 'Step 2 of 6 • Daily Execution',
      title: 'Tasks connected directly to your milestone gates',
      description:
        'Every task is grouped into Today, Overdue, and Upcoming. Better yet: tasks link directly to strategic roadmap gates and condition checklists so daily hustle actually moves the needle.',
      takeaway: '🎯 "No disconnected to-do lists. Every checkbox unlocks a milestone."',
    },
    {
      id: 'post-it-bulletin',
      tabTitle: 'Status Bulletin',
      icon: StickyNote,
      badge: 'Step 3 of 6 • Sticky Notes',
      title: 'Tack on critical memos — post-it style',
      description:
        'Got an urgent angel pitch tomorrow? Pushed a late-night commit? Tack on high-priority memos to your startup overview so nobody has to scroll through 400 Slack messages to know what matters today.',
      takeaway: '📌 "The virtual corkboard your team actually reads."',
    },
    {
      id: 'comms-hub',
      tabTitle: 'Comms & Town Hall',
      icon: MessageSquare,
      badge: 'Step 4 of 6 • Unified Comms',
      title: 'Comms built like Apple: calm, contextual, and clear',
      description:
        'Each startup has its own isolated Common Room and sub-groups. Tag tasks, receipts, blockers, or pitch decks directly into the conversation with live presence lights and head counters.',
      takeaway: '💬 "Zero noisy channels. Just clean communication with embedded proof."',
    },
    {
      id: 'runway-ledger',
      tabTitle: 'Runway & Burn',
      icon: TrendingUp,
      badge: 'Step 5 of 6 • Real Finances',
      title: 'Know your exact runway without touching Excel',
      description:
        'Log angel wires, SaaS tooling, and stipends. Trackaa calculates your net cash balance and real runway in months dynamically so you never wake up surprised by your bank account.',
      takeaway: '💸 "Know your runway down to the decimal. Sleep better at night."',
    },
    {
      id: 'asset-vault',
      tabTitle: 'Founder Asset Vault',
      icon: FolderLock,
      badge: 'Step 6 of 6 • Investor Ready',
      title: 'A central vault for your pitch decks and SAFE notes',
      description:
        'Store your Delaware certificate, IRS EIN, cap table links, and latest Figma files. Instantly grab links during investor due diligence without digging through Google Drive folders.',
      takeaway: '🗄️ "Every legal document and investor deck, organized in one safe home."',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleLaunchWorkspace();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleLaunchWorkspace = () => {
    login('founder@trackaa.com', 'Triumph Ugoji');
    onClose();
    navigate('/dashboard');
  };

  const toggleMockTask = (id: number) => {
    setMockTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleSendMockChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You (Founder)',
        role: 'CEO',
        text: chatInput.trim(),
        attachment: null,
      },
    ]);
    setChatInput('');
  };

  const handleLikePostIt = (id: number) => {
    setPostIts(prev =>
      prev.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const activeSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl glass-dropdown rounded-[2.5rem] p-6 sm:p-9 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up my-auto max-h-[94vh] flex flex-col justify-between overflow-hidden">
        {/* Top Header & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Trackaa Interactive Tour
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-trackaa-green text-white">
                  Live Clickable Walkthrough
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Explore every workflow inside your startup operating system
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Clickable Step Pills Bar */}
        <div className="py-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-black/5 dark:border-white/10">
          {slides.map((s, idx) => {
            const Icon = s.icon;
            const isActive = currentSlide === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-trackaa-green text-white shadow-sm scale-105'
                    : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                <span>{s.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Slide Body: 2 Columns */}
        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1 min-h-[360px]">
          {/* Left Column: Narrative & Gen-Z Founder Relatable Takeaway */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-trackaa-navy/10 dark:bg-white/10 text-trackaa-green uppercase tracking-wider">
              {activeSlideData.badge}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {activeSlideData.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeSlideData.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-200">
              {activeSlideData.takeaway}
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-trackaa-green" />
              <span>Interactive preview on the right — click and test it!</span>
            </div>
          </div>

          {/* Right Column: Interactive Mock Widget for the Current Slide */}
          <div className="lg:col-span-7 p-4 sm:p-5 rounded-3xl bg-white/70 dark:bg-black/40 border border-black/10 dark:border-white/15 shadow-lg min-h-[320px] flex flex-col justify-center">
            {/* Widget 1: Velocity Ladder */}
            {currentSlide === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-trackaa-green/20 to-trackaa-navy flex items-center justify-center font-extrabold text-trackaa-green">
                      T
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Trackaa 2.0</div>
                      <div className="text-[11px] text-slate-400">Pre-Seed Venture • 3 Founders</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-500 font-bold">
                    84% On Track
                  </span>
                </div>

                {/* Clickable ladder rungs */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Click to Change Momentum Rung:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'behind', label: '1. Struggling', color: 'bg-rose-500' },
                      { id: 'friction', label: '2. Friction', color: 'bg-amber-500' },
                      { id: 'on_track', label: '3. On Track', color: 'bg-emerald-600' },
                      { id: 'velocity', label: '4. Velocity', color: 'bg-cyan-600' },
                      { id: 'exceeding', label: '5. Exceeding', color: 'bg-purple-600' },
                    ].map(rung => (
                      <button
                        key={rung.id}
                        type="button"
                        onClick={() => setStatusLadderRung(rung.id as any)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-between ${rung.color} ${
                          statusLadderRung === rung.id ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white scale-105' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <span>{rung.label}</span>
                        {statusLadderRung === rung.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lifecycle Stage dropdown */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Stage:</span>
                  <div className="flex gap-1.5">
                    {['Idea', 'Private Beta', 'Seed Round', 'Series A'].map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setMockStage(st)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          mockStage === st
                            ? 'bg-trackaa-green text-white'
                            : 'bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Widget 2: Tasks & Milestones */}
            {currentSlide === 1 && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-trackaa-green" />
                    <span>Today's Execution Checklist</span>
                  </span>
                  <span className="text-[11px] text-trackaa-green font-semibold">Click to tick</span>
                </div>

                <div className="space-y-2">
                  {mockTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => toggleMockTask(task.id)}
                      className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-trackaa-green/40 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                            task.done
                              ? 'bg-trackaa-green border-trackaa-green text-white'
                              : 'border-slate-400 group-hover:border-trackaa-green'
                          }`}
                        >
                          {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span
                            className={`text-xs font-semibold block ${
                              task.done ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="text-[10px] text-trackaa-green flex items-center gap-1 mt-0.5 font-medium">
                            <Flag className="w-2.5 h-2.5" />
                            <span>Linked Gate: {task.milestone}</span>
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase ${
                          task.priority === 'critical' ? 'bg-rose-600' : task.priority === 'high' ? 'bg-amber-600' : 'bg-slate-600'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center justify-between">
                  <span>Milestone Readiness Gate: 75%</span>
                  <span className="font-bold">Target: 3 Days Left</span>
                </div>
              </div>
            )}

            {/* Widget 3: Status Bulletin Post-its */}
            {currentSlide === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <StickyNote className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pinned Memos (Click heart to react)</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Virtual Standup Corkboard</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {postIts.map((p, i) => (
                    <div
                      key={p.id}
                      className={`p-3 rounded-2xl border shadow-sm transition-transform hover:-translate-y-1 relative flex flex-col justify-between text-xs ${
                        i === 0 ? '-rotate-1' : i === 1 ? 'rotate-1' : '-rotate-0.5'
                      } ${
                        p.color === 'emerald'
                          ? 'bg-emerald-100/90 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                          : p.color === 'blue'
                          ? 'bg-sky-100/90 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-950 dark:text-sky-100'
                          : 'bg-amber-100/90 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100'
                      }`}
                    >
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rose-500" />
                      <p className="mt-1 font-medium leading-snug">{p.text}</p>

                      <div className="mt-3 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] opacity-75">
                        <span className="font-semibold">{p.author}</span>
                        <button
                          type="button"
                          onClick={() => handleLikePostIt(p.id)}
                          className="flex items-center gap-1 hover:scale-110 transition-transform font-bold"
                        >
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          <span>{p.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-center text-slate-400 pt-1">
                  Team members tack on updates without waiting for scheduled Zoom syncs.
                </div>
              </div>
            )}

            {/* Widget 4: Comms & Town Hall */}
            {currentSlide === 3 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-trackaa-green" />
                    <span className="font-bold text-slate-900 dark:text-white">Common Room (Town Hall)</span>
                    <span className="w-2 h-2 rounded-full bg-trackaa-green" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Isolated Startup Comms</span>
                </div>

                <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{msg.sender}</span>
                          <span className="text-[10px] text-trackaa-green font-normal">({msg.role})</span>
                        </span>
                        <span className="text-[10px] text-slate-400">Just now</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{msg.text}</p>
                      {msg.attachment && (
                        <div className="mt-2 p-2 rounded-xl bg-trackaa-green/10 border border-trackaa-green/30 flex items-center gap-2 text-trackaa-green font-semibold text-[11px]">
                          <Paperclip className="w-3 h-3" />
                          <span>{msg.attachment}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMockChat} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Type a message or press enter..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-trackaa-green text-white hover:bg-[#059669] transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* Widget 5: Cash Runway & Real Burn */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Live Runway Forecast
                    </span>
                    <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
                      {calculatedRunway} <span className="text-sm font-sans font-normal text-slate-400">Months Safe</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                    <Flame className="w-6 h-6 animate-pulse" />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Bank Cash Balance:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      ${mockCash.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500">Monthly Burn Rate:</span>
                      <span className="font-mono font-bold text-rose-500">
                        ${mockBurn.toLocaleString()} / mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4000"
                      max="20000"
                      step="500"
                      value={mockBurn}
                      onChange={e => setMockBurn(parseInt(e.target.value))}
                      className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-trackaa-green"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                      <span>$4,000/mo</span>
                      <span>Adjust slider to test burn</span>
                      <span>$20,000/mo</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Pre-Seed SAFE: +$150,000</span>
                  <span className="text-emerald-500 font-semibold">Zero surprise burn</span>
                </div>
              </div>
            )}

            {/* Widget 6: Founder Asset Vault */}
            {currentSlide === 5 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Founder Asset Vault</span>
                  </span>
                  <span className="text-[10px] text-cyan-400 font-semibold">One-Click Investor Access</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { title: 'Trackaa Pre-Seed Pitch Deck v2.4', ext: 'PDF', size: '4.2 MB', tag: '#Investors' },
                    { title: 'Delaware C-Corp Certificate & EIN', ext: 'PDF', size: '1.2 MB', tag: '#Legal' },
                    { title: 'SAFE Investment Agreement (YC Standard)', ext: 'DOCX', size: '320 KB', tag: '#SAFE' },
                    { title: 'Figma Brand Guidelines & Vector Marks', ext: 'LINK', size: 'Live Cloud', tag: '#Design' },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1 text-[10px]">
                          <span className="font-mono text-cyan-400 font-bold">{doc.ext}</span>
                          <span className="text-slate-400">{doc.tag}</span>
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white truncate">
                          {doc.title}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{doc.size}</span>
                        <span className="text-trackaa-green font-bold">Ready to share</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 text-center">
                  Instant asset retrieval for angel investor due diligence.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Controls Bar */}
        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'w-6 bg-trackaa-green'
                    : 'w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
            <span className="text-xs text-slate-400 ml-2 font-mono">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border border-black/10 dark:border-white/10 flex items-center gap-1.5 transition-all ${
                currentSlide === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentSlide < slides.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] transition-all shadow-glow-emerald flex items-center gap-1.5"
              >
                <span>Next Feature</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLaunchWorkspace}
                className="px-6 py-2.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] transition-all shadow-glow-emerald flex items-center gap-1.5 animate-pulse"
              >
                <span>Launch My Free Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
