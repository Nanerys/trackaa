import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TrackaaLogo } from '../components/TrackaaLogo';
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  FolderLock,
  MessageSquare,
  ShieldCheck,
  Zap,
  Play,
  Flame,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login, startups, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  // Interactive demo task states for live preview on the hero
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, text: 'File Delaware C-Corp 83(b) tax elections', done: true },
    { id: 2, text: 'Finalize SAFE investment memo for Pre-Seed lead', done: false },
    { id: 3, text: 'Review 5 customer discovery transcripts', done: false },
  ]);

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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A111E] text-slate-900 dark:text-slate-100 selection:bg-trackaa-green/30 selection:text-white transition-colors duration-200">
      {/* Ambient background glow accents (Apple style) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#00C389]/10 to-transparent blur-[120px] rounded-full dark:from-[#00C389]/15" />
        <div className="absolute top-[600px] -right-40 w-[600px] h-[600px] bg-gradient-to-b from-blue-500/5 to-transparent blur-[140px] rounded-full" />
      </div>

      {/* Floating Glass Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-[#0A111E]/75 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <TrackaaLogo size="sm" />
          </Link>

          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-trackaa-green transition-colors">OS Features</a>
            <a href="#vault" className="hover:text-trackaa-green transition-colors">Asset Vault</a>
            <a href="#finances" className="hover:text-trackaa-green transition-colors">Runway Hub</a>
            <a href="#testimonials" className="hover:text-trackaa-green transition-colors">Founders</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5"
            >
              Sign In
            </Link>
            <button
              type="button"
              onClick={handleInstantDemo}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-trackaa-green text-slate-950 font-bold text-xs hover:bg-[#00DDA0] transition-all shadow-glow-emerald active:scale-95"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Apple-style pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-slate-700 dark:text-slate-300 mb-8 border border-black/5 dark:border-white/10 shadow-sm animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-trackaa-green animate-pulse" />
          <span>Trackaa v2.0 is live</span>
          <span className="text-slate-400 dark:text-slate-500">•</span>
          <span className="text-trackaa-green font-semibold">Engineered for Pre-Seed to Series A</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          The Operating System for{' '}
          <span className="bg-gradient-to-r from-trackaa-green via-[#10B981] to-[#34D399] bg-clip-text text-transparent">
            Early-Stage Founders
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Stop scattering your venture across ten fragmented tools. Track daily execution, store critical SAFE decks, document blocker resolutions, and watch your net runway in one glassy workspace.
        </p>

        {/* Dual CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleInstantDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-trackaa-green text-slate-950 font-bold text-sm hover:bg-[#00DDA0] transition-all shadow-glow-emerald hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Your Startup Workspace</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleInstantDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl glass-panel text-slate-800 dark:text-white font-semibold text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/15"
          >
            <Play className="w-3.5 h-3.5 fill-current text-trackaa-green" />
            <span>Explore Interactive Demo</span>
          </button>
        </div>

        {/* Social trust badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-trackaa-green" />
          <span>No credit card required • Instant guest founder mode • Isolated workspace</span>
        </div>

        {/* Hero Interactive App Preview (Glass floating card) */}
        <div className="mt-16 sm:mt-20 relative mx-auto max-w-5xl rounded-3xl glass-panel p-3 sm:p-6 shadow-2xl border border-black/10 dark:border-white/15">
          {/* Mock Window Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Trackaa OS — Venture Command Center
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-trackaa-green/15 text-trackaa-green uppercase tracking-wider">
                Live Interactive Preview
              </span>
            </div>
          </div>

          {/* Interactive Hero Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Widget 1: Interactive Execution List */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Today's Execution
                </span>
                <span className="text-[10px] font-semibold text-trackaa-green bg-trackaa-green/10 px-2 py-0.5 rounded-full">
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
                    <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      t.done
                        ? 'bg-trackaa-green border-trackaa-green text-slate-950'
                        : 'border-slate-400 dark:border-slate-600 group-hover:border-trackaa-green'
                    }`}>
                      {t.done && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs transition-all ${
                      t.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {t.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 2: Cash & Runway Meter */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Net Cash Runway
                  </span>
                  <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  $157,000 <span className="text-xs text-slate-400 font-sans font-normal">Cash in bank</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-semibold font-mono">
                    18.4 Months
                  </span>
                  <span className="text-slate-400">Average burn: $8,500/mo</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>SAFE Capital: $175,000</span>
                <span className="text-emerald-400 font-semibold">+ AWS Grant</span>
              </div>
            </div>

            {/* Widget 3: Blocker Resolution Audit */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Blocker Audit Trail
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Stripe Atlas Banking Delay</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  Resolution documented: Utility bill re-verified; cleared in 6 hours.
                </p>
              </div>
              <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Active impediments: 1</span>
                <span className="text-trackaa-green font-semibold">Zero critical</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-trackaa-green">
            The Complete Founder Stack
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything your startup needs to survive and scale
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Engineered with Apple-grade clarity so founders spend time building instead of updating spreadsheets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Execution Engine */}
          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Execution Engine
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Intelligent date-grouped task boards with inline ticks, team collaborator allocation, and blocker resolution narratives.
            </p>
            <div className="text-xs font-semibold text-trackaa-green flex items-center gap-1">
              <span>Today • Overdue • Upcoming</span>
            </div>
          </div>

          {/* Card 2: Founder Asset Vault */}
          <div id="vault" className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-4">
              <FolderLock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Dedicated Asset Vault
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Permanent home for SAFE notes, pitch decks, Figma links, and incorporation documents. Tagged, searchable, and secure.
            </p>
            <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
              <span>PDFs • Brand Kits • Live URLs</span>
            </div>
          </div>

          {/* Card 3: Cash & Runway Ledger */}
          <div id="finances" className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Runway & Cash Ledger
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Lightweight accounting without enterprise bloat. Log angel wires, payroll stipends, and SaaS costs with dynamic runway calculations.
            </p>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <span>Live 30-Day Burn Prediction</span>
            </div>
          </div>

          {/* Card 4: Customer Discovery */}
          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Customer Discovery
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Capture user interviews, stakeholder roles, direct quotes, and multi-file attachments (up to 5 documents per session).
            </p>
            <div className="text-xs font-semibold text-purple-400 flex items-center gap-1">
              <span>Founder Notes & Media Uploads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Testimonials / Social Proof */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-black/10 dark:border-white/15 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trackaa-green/10 text-trackaa-green text-xs font-bold uppercase tracking-wider mb-4">
              Founder Validation
            </div>
            <blockquote className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white leading-relaxed">
              "We used to spend Monday mornings hopping between Google Sheets, Notion, and Slack to see who was blocked. Trackaa gives our venture studio total operational visibility in 30 seconds."
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

      {/* Footer */}
      <footer className="py-12 border-t border-black/5 dark:border-white/10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrackaaLogo size="sm" />
          <span>© 2026 Trackaa Technologies Inc. Built for founders.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white">Features</a>
          <a href="#vault" className="hover:text-slate-900 dark:hover:text-white">Asset Vault</a>
          <Link to="/auth" className="hover:text-slate-900 dark:hover:text-white">Founder Login</Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </footer>
    </div>
  );
};
