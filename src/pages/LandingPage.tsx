import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TrackaaLogo } from '../components/TrackaaLogo';
import { InteractiveTourModal } from '../components/InteractiveTourModal';
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  FolderLock,
  MessageSquare,
  ShieldCheck,
  Play,
  Flame,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Users,
  Compass,
  Rocket,
  Layers,
  Check,
  Flag,
  Heart,
  StickyNote,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  // Interactive Tour Modal state
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Interactive demo task states for live preview on the hero
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, text: 'File Delaware 83(b) tax elections', done: true, tag: 'Legal' },
    { id: 2, text: 'Send revised SAFE memo to lead angel', done: false, tag: 'Pre-Seed' },
    { id: 3, text: 'Ship beta build & review 5 customer clips', done: false, tag: 'Product' },
  ]);

  // Interactive pricing slider state
  const [teamSize, setTeamSize] = useState<number>(1);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Dynamic pricing calculations (Shawarma founder scale)
  const calculatePrice = (size: number) => {
    if (size === 1) return { price: 3, label: 'Solo Founder', shawarma: '1 Shawarma / Month 🌯' };
    if (size <= 4) return { price: 7, label: 'Core Co-Founders', shawarma: '2 Shawarmas / Month 🌯' };
    if (size <= 9) return { price: 14, label: 'Early Venture Squad', shawarma: 'Small team pizza night 🍕' };
    if (size <= 19) return { price: 20, label: 'Full Product Squad', shawarma: 'Team coffee run ☕' };
    return { price: 49, label: 'Venture Studio & Incubator', shawarma: 'Unlimited ventures & teams 🚀' };
  };

  const currentPlan = calculatePrice(teamSize);
  const displayPrice = billingCycle === 'yearly' ? Math.round(currentPlan.price * 0.8) : currentPlan.price;

  const toggleDemoTask = (id: number) => {
    setDemoTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleInstantDemo = () => {
    login('founder@trackaa.com', 'Triumph Ugoji');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 selection:bg-trackaa-green/30 selection:text-white transition-colors duration-200 relative overflow-hidden">
      {/* Subtle ambient lighting with perfect light-mode white balance */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-slate-500/5 to-transparent blur-[140px] rounded-full dark:from-emerald-500/20 dark:via-blue-900/15" />
        <div className="absolute top-[800px] -right-32 w-[550px] h-[550px] bg-gradient-to-b from-sky-500/10 to-transparent blur-[150px] rounded-full dark:from-blue-600/10" />
      </div>

      {/* Floating Glass Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-2xl bg-white/80 dark:bg-[#0A111E]/85 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <TrackaaLogo size="sm" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600 dark:text-slate-300">
            <button
              type="button"
              onClick={() => setIsTourOpen(true)}
              className="hover:text-trackaa-green transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-trackaa-green" />
              <span>Interactive Tour</span>
            </button>
            <a href="#how-it-works" className="hover:text-trackaa-green transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-trackaa-green transition-colors">
              Founder Pricing
            </a>
            <a href="#vision" className="hover:text-trackaa-green transition-colors">
              The Vision
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <Link
              to="/auth"
              className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>

            <button
              type="button"
              onClick={handleInstantDemo}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] transition-all shadow-glow-emerald active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-14 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Playful Floating Gen-Z Stickers */}
        <div className="hidden lg:block absolute top-12 left-8 animate-float pointer-events-none select-none">
          <div className="px-3 py-1.5 rounded-2xl glass-pill shadow-lg border border-black/10 dark:border-white/15 text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>🌯</span>
            <span>Powered by Shawarma & 2 AM code</span>
          </div>
        </div>

        <div className="hidden lg:block absolute top-24 right-8 animate-float-delayed pointer-events-none select-none">
          <div className="px-3.5 py-1.5 rounded-2xl glass-pill shadow-lg border border-black/10 dark:border-white/15 text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>🚀</span>
            <span>Next Target: First $10k MRR</span>
          </div>
        </div>

        <div className="hidden xl:block absolute bottom-12 left-12 animate-float-delayed pointer-events-none select-none">
          <div className="px-3.5 py-1.5 rounded-2xl glass-pill shadow-lg border border-black/10 dark:border-white/15 text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>📈</span>
            <span>Runway: 18.4 Months Safe</span>
          </div>
        </div>

        <div className="hidden xl:block absolute bottom-16 right-16 animate-float pointer-events-none select-none">
          <div className="px-3.5 py-1.5 rounded-2xl glass-pill shadow-lg border border-black/10 dark:border-white/15 text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>💅</span>
            <span>Zero enterprise bloat. Just speed.</span>
          </div>
        </div>

        {/* Clean Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white/10 text-white text-xs font-semibold mb-6 shadow-sm animate-fade-in border border-black/10 dark:border-white/20">
          <span className="w-2 h-2 rounded-full bg-trackaa-green animate-pulse" />
          <span>Trackaa OS 2.0</span>
          <span className="opacity-40">•</span>
          <span>The Calm Workspace for First-Time Founders</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          Build your first startup{' '}
          <span className="bg-gradient-to-r from-trackaa-green via-[#059669] to-[#1E3A8A] bg-clip-text text-transparent">
            without the chaos.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          No more 14 open tabs, buried pitch deck drafts, or messy Slack threads. Trackaa brings your tasks, blocker audits, investor vault, and real cash runway into one calm home.
        </p>

        {/* Dual Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={handleInstantDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-trackaa-green text-white font-bold text-sm hover:bg-[#059669] transition-all shadow-glow-emerald hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Free Workspace</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Interactive Slideshow Tour Trigger */}
          <button
            type="button"
            onClick={() => setIsTourOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl glass-panel text-slate-800 dark:text-white font-bold text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/15 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <Play className="w-3.5 h-3.5 fill-trackaa-green text-trackaa-green group-hover:scale-110 transition-transform" />
            <span>Interactive Live Tour (6 Steps)</span>
          </button>
        </div>

        {/* Micro reassurance */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-trackaa-green" />
          <span>Zero credit card required • Instant guest founder sandbox • Ready in 5 seconds</span>
        </div>

        {/* Hero Interactive App Preview */}
        <div className="mt-12 sm:mt-16 relative mx-auto max-w-5xl rounded-3xl glass-panel p-4 sm:p-7 shadow-2xl border border-black/10 dark:border-white/15">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                Trackaa OS — Live Interactive Sandbox
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsTourOpen(true)}
              className="text-xs font-bold text-trackaa-green hover:underline flex items-center gap-1"
            >
              <span>Open Guided Walkthrough</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Widget 1: Execution Focus */}
            <div className="p-4 rounded-2xl bg-white dark:bg-black/30 border border-black/5 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Today's Execution
                </span>
                <span className="text-[10px] font-bold text-trackaa-green bg-trackaa-green/10 px-2 py-0.5 rounded-full">
                  Click to tick
                </span>
              </div>
              <div className="space-y-2">
                {demoTasks.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleDemoTask(t.id)}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        t.done
                          ? 'bg-trackaa-green border-trackaa-green text-white'
                          : 'border-slate-400 dark:border-slate-600 group-hover:border-trackaa-green'
                      }`}
                    >
                      {t.done && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <span
                        className={`text-xs block font-medium transition-all ${
                          t.done ? 'line-through text-slate-400' : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {t.text}
                      </span>
                      <span className="text-[10px] text-trackaa-green font-semibold">
                        Tag: {t.tag}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 2: Cash & Runway Meter */}
            <div className="p-4 rounded-2xl bg-white dark:bg-black/30 border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Net Cash Runway
                  </span>
                  <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  $157,000 <span className="text-xs text-slate-400 font-sans font-normal">in bank</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-trackaa-green font-bold font-mono">
                    18.4 Months
                  </span>
                  <span className="text-slate-500 font-medium">Burn: $8,500/mo</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500">
                <span>Pre-Seed SAFE: $150k</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Zero Spreadsheet Chaos</span>
              </div>
            </div>

            {/* Widget 3: Pinned Memo Bulletin */}
            <div className="p-4 rounded-2xl bg-white dark:bg-black/30 border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Pinned Status Bulletin
                  </span>
                  <StickyNote className="w-4 h-4 text-amber-500" />
                </div>

                <div className="p-3 rounded-2xl bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-xs text-amber-950 dark:text-amber-100 shadow-sm -rotate-1">
                  <p className="font-semibold leading-snug">
                    "Meeting tomorrow at 10 AM with Bluecrest angel syndicate lead to review final SAFE terms."
                  </p>
                  <div className="mt-2 text-[10px] opacity-75 flex justify-between font-medium">
                    <span>Triumph (Founder)</span>
                    <span>Today at 10:15 AM</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10">
                <span>Active Roadblocks: 1</span>
                <span className="text-trackaa-green font-bold">Zero critical blockers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: What Building Your First Startup Feels Like */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-trackaa-green text-white text-xs font-bold uppercase tracking-wider">
            Clarity Over Clutter
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            What building your startup feels like with Trackaa
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Compare the daily headache of fragmented tools with one calm founder home.
          </p>
        </div>

        {/* Before / After Apple-style side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without Trackaa */}
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20 text-left space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-sm">
                ✕
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Without Trackaa: Tab Overload
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>14 open browser tabs (Notion, Google Drive, Excel, Trello, Slack).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>Wondering which version of the investor pitch deck is actually current.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>Guessing your cash burn rate until you open your bank account in panic.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>Customer discovery interviews scattered across voice notes and lost docs.</span>
              </li>
            </ul>
          </div>

          {/* With Trackaa */}
          <div className="p-6 sm:p-8 rounded-3xl bg-trackaa-green/10 border border-trackaa-green/30 text-left space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-trackaa-green text-white flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                With Trackaa: Calm Founder Momentum
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-start gap-2.5">
                <span className="text-trackaa-green font-bold">•</span>
                <span>One single operating system. Everything you need to ship is visible.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-trackaa-green font-bold">•</span>
                <span>Founder Asset Vault houses your pitch decks and SAFE notes in 1 click.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-trackaa-green font-bold">•</span>
                <span>Real-time runway calculation: you always know how many months you have.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-trackaa-green font-bold">•</span>
                <span>Unified Comms where you tag tasks, blockers, and receipts right into chat.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold tracking-widest uppercase text-trackaa-green">
            The Complete OS Stack
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Built for velocity, not enterprise meetings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all text-left">
            <div className="w-10 h-10 rounded-2xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Execution & Milestones
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Date-grouped tasks linked to strategic milestone gates. Check off tasks to move the needle.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all text-left">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center mb-4">
              <FolderLock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Founder Asset Vault
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Permanent central home for SAFE agreements, pitch decks, Delaware incorporation, and Figma files.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all text-left">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Cash Runway & Burn
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Log investments and monthly stipends. Dynamic runway in months without wrestling with spreadsheets.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all text-left">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-500 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Comms & Town Hall
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Isolated Common Room per startup. Tag tasks, blockers, and receipts into conversation with unread head counters.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Interactive Pricing Slider Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-trackaa-green text-white text-xs font-bold uppercase tracking-wider">
            Honest Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Pricing scaled for early-stage founders
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Starts at $3/month for solo founders — less than one shawarma a month. Adjust the slider to see your exact rate.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-trackaa-green text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-trackaa-green text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* The Slider Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-black/10 dark:border-white/15 max-w-3xl mx-auto shadow-xl">
          {/* Slider Header & Live Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/5 dark:border-white/10 text-left">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Team Size</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2 flex-wrap">
                <span>{teamSize === 20 ? '20+ Team Members' : `${teamSize} ${teamSize === 1 ? 'Solo Founder' : 'Team Members'}`}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-trackaa-green text-white font-bold">
                  {currentPlan.label}
                </span>
              </div>
              <div className="text-xs text-trackaa-green font-semibold mt-1">
                Equivalent: {currentPlan.shawarma}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono">
                ${displayPrice}
                <span className="text-xs text-slate-400 font-sans font-normal"> / month</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {billingCycle === 'yearly' ? 'Billed annually • Cancel anytime' : 'Zero lock-in • Monthly'}
              </div>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Solo (1)</span>
              <span>5 Members</span>
              <span>10 Members</span>
              <span>20+ / Studio</span>
            </div>

            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={teamSize}
              onChange={e => setTeamSize(parseInt(e.target.value))}
              className="w-full h-3 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-trackaa-green focus:outline-none"
            />
          </div>

          {/* Feature Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 pt-4 border-t border-black/5 dark:border-white/10 text-left">
            {[
              'Unlimited Tasks & Milestone Condition Gates',
              'Founder Asset Vault (SAFE Notes, Pitch Decks, PRDs)',
              'Finance & Cash Runway Hub with Burn Rate Gauge',
              'Comms Hub with Isolated Common Room & Sub-Groups',
              'Contextual Tagging of Tasks & Receipts in Chat',
              'Role-Based Access Control (RBAC) with Temp Passwords',
              'Customer Discovery Logger with 5-File Evidence',
              'Active Presence Status Lights & Unread Head Counters',
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-4 h-4 rounded-full bg-trackaa-green text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleInstantDemo}
            className="w-full py-3.5 rounded-2xl bg-trackaa-green text-white font-bold text-sm hover:bg-[#059669] shadow-glow-emerald transition-all active:scale-[0.98]"
          >
            Launch Your Workspace at ${displayPrice}/mo
          </button>
        </div>
      </section>

      {/* The Vision Section */}
      <section id="vision" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-xs font-bold tracking-widest uppercase text-trackaa-green mb-3">
          Our Promise to Founders
        </h2>
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          You don't need another enterprise tool with 200 knobs. You need momentum.
        </p>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Trackaa was created because first-time founders deserve software that gets out of the way. Software that keeps you focused on shipping, unblocking your team, closing your next investor, and listening to users.
        </p>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-black/10 dark:border-white/15 relative overflow-hidden text-left">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-trackaa-green text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Founder Story
            </span>
            <blockquote className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white leading-relaxed">
              "Trackaa eliminated the 4 hours I used to waste every Monday reconciling Slack updates and Notion tables. My co-founder and I can see our cash runway, active blockers, and customer feedback in 30 seconds."
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
                alt="Founder Avatar"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-trackaa-green"
              />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Triumph Ugoji</div>
                <div className="text-xs text-slate-500">Managing Founder, Trackaa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Typographic Footer Statement: Huge Grayed-out "TRACKAA" */}
      <div className="w-full overflow-hidden select-none pointer-events-none pt-12 sm:pt-20 pb-4 text-center">
        <span className="text-[13vw] font-black tracking-tighter uppercase text-slate-300/40 dark:text-slate-800/30 leading-none block font-sans">
          TRACKAA
        </span>
      </div>

      {/* Footer Navigation */}
      <footer className="py-10 border-t border-black/5 dark:border-white/10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrackaaLogo size="sm" />
          <span>© 2026 Trackaa Technologies Inc. Built for first-time founders.</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setIsTourOpen(true)}
            className="hover:text-slate-900 dark:hover:text-white"
          >
            Interactive Tour
          </button>
          <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white">
            Pricing
          </a>
          <Link to="/auth" className="hover:text-slate-900 dark:hover:text-white font-semibold">
            Founder Login
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </footer>

      {/* Clickable Slideshow Interactive Tour Modal */}
      <InteractiveTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
    </div>
  );
};
