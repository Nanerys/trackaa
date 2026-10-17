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
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login, startups, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  // Interactive demo task states for live preview on the hero
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, text: 'File Delaware C-Corp 83(b) tax elections', done: true },
    { id: 2, text: 'Finalize SAFE investment memo for Pre-Seed lead', done: false },
    { id: 3, text: 'Review 5 customer discovery transcripts in Comms', done: false },
  ]);

  // Interactive pricing slider state
  const [teamSize, setTeamSize] = useState<number>(1);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Dynamic pricing calculations
  const calculatePrice = (size: number) => {
    if (size === 1) return { price: 3, label: 'Solo Founder', shawarma: '1 Shawarma / Month 🌯' };
    if (size <= 4) return { price: 7, label: 'Early Core Co-Founders', shawarma: '2 Shawarmas / Month 🌯' };
    if (size <= 9) return { price: 14, label: 'Growing Venture Squad', shawarma: 'Small team lunch 🍕' };
    if (size <= 19) return { price: 20, label: 'Full Product & Dev Team', shawarma: 'Team coffee run ☕' };
    return { price: 49, label: 'Venture Studio & Incubator', shawarma: 'Unlimited ventures & teams' };
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
    <div className="min-h-screen text-slate-900 dark:text-slate-100 selection:bg-trackaa-green/30 selection:text-white transition-colors duration-200">
      {/* Ambient background glow accents with rich navy blue and darkened emerald green */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#047857]/15 via-[#0F1E36]/10 to-transparent blur-[140px] rounded-full dark:from-[#047857]/20 dark:via-[#1E3A8A]/15" />
        <div className="absolute top-[800px] -right-40 w-[600px] h-[600px] bg-gradient-to-b from-[#1E3A8A]/10 to-transparent blur-[150px] rounded-full" />
      </div>

      {/* Floating Glass Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/75 dark:bg-[#111827]/85 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <TrackaaLogo size="sm" />
          </Link>

          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#vision" className="hover:text-trackaa-green transition-colors">The Vision</a>
            <a href="#features" className="hover:text-trackaa-green transition-colors">Workflows</a>
            <a href="#pricing" className="hover:text-trackaa-green transition-colors">Founder Pricing</a>
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] transition-all shadow-glow-emerald active:scale-95"
            >
              <span>Launch Free Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Subtle pill badge with pure white text */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-trackaa-navy via-slate-800 to-trackaa-green text-white text-xs font-medium mb-8 border border-white/20 shadow-sm animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-semibold">Trackaa 2.0</span>
          <span className="text-white/60">•</span>
          <span className="text-white">Built for first-time founders turning dreams into reality</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto leading-[1.14]">
          Where First-Time Founders{' '}
          <span className="bg-gradient-to-r from-trackaa-green via-[#059669] to-[#1E3A8A] bg-clip-text text-transparent">
            Build Real Momentum.
          </span>
        </h1>

        {/* Subtitle - Authentic, natural founder voice */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Starting a company is hard enough without juggling ten disconnected tabs. Trackaa keeps your daily execution, blocker resolutions, SAFE pitch decks, and net runway in one clear, calm home.
        </p>

        {/* Dual CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleInstantDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-trackaa-green text-white font-bold text-sm hover:bg-[#059669] transition-all shadow-glow-emerald hover:scale-[1.02] active:scale-[0.98]"
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
            <span>Interactive Live Tour</span>
          </button>
        </div>

        {/* Social trust badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-trackaa-green" />
          <span>No credit card required • Instant guest founder sandbox • Zero clutter</span>
        </div>

        {/* Hero Interactive App Preview */}
        <div className="mt-16 sm:mt-20 relative mx-auto max-w-5xl rounded-3xl glass-panel p-4 sm:p-7 shadow-2xl border border-black/10 dark:border-white/15">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Trackaa OS — Founder Command Center
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-trackaa-green text-white uppercase tracking-wider">
                Interactive Preview
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Widget 1: Execution List */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/25 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Daily Focus
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
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        t.done
                          ? 'bg-trackaa-green border-trackaa-green text-white'
                          : 'border-slate-400 dark:border-slate-600 group-hover:border-trackaa-green'
                      }`}
                    >
                      {t.done && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span
                      className={`text-xs transition-all ${
                        t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {t.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 2: Cash & Runway Meter */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/25 border border-black/5 dark:border-white/10 flex flex-col justify-between">
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
                  <span className="text-slate-400">Burn: $8,500/mo</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Angel SAFE: $175,000</span>
                <span className="text-emerald-500 font-semibold">+ Cloud Grants</span>
              </div>
            </div>

            {/* Widget 3: Blocker Audit Trail */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/25 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Blocker Resolution
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <div className="font-semibold text-trackaa-green flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Stripe Atlas Banking Delay</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  Resolution documented: Secondary utility verification uploaded; cleared in 6 hours.
                </p>
              </div>
              <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Active Roadblocks: 1</span>
                <span className="text-trackaa-green font-semibold">Zero critical</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Section */}
      <section id="vision" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-xs font-bold tracking-widest uppercase text-trackaa-green mb-3">
          Why Trackaa Exists
        </h2>
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          You don't need enterprise bloat. You need momentum.
        </p>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Most project management tools were built for Fortune 500 managers with 50 meetings a week. Trackaa is designed for the 2-person team staying up until 2 AM trying to ship their first version, close their first angel investor, and listen to early customer feedback.
        </p>
      </section>

      {/* Dynamic Interactive Pricing Slider Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-trackaa-green text-white text-xs font-bold uppercase tracking-wider">
            Founder-Friendly Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Honest pricing that scales with your team
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Starts at $3/month for solo founders — less than one shawarma a month. Adjust the slider to see your exact rate.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-trackaa-green text-white shadow-sm'
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-trackaa-green text-white shadow-sm'
                  : 'text-slate-500 hover:text-white'
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/5 dark:border-white/10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Team Size</div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                <span>{teamSize === 20 ? '20+ Team Members' : `${teamSize} ${teamSize === 1 ? 'Founder' : 'Team Members'}`}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-trackaa-green text-white font-semibold">
                  {currentPlan.label}
                </span>
              </div>
              <div className="text-xs text-trackaa-green font-medium mt-1">
                Equivalent: {currentPlan.shawarma}
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono">
                ${displayPrice}
                <span className="text-xs text-slate-400 font-sans font-normal"> / month</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {billingCycle === 'yearly' ? 'Billed annually' : 'Cancel anytime, zero lock-in'}
              </div>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>Solo Founder (1)</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 pt-4 border-t border-black/5 dark:border-white/10">
            {[
              'Unlimited Tasks & Intelligent Date Grouping',
              'Founder Asset Vault (SAFE Notes, Pitch Decks, Links)',
              'Finance & Cash Runway Hub with Burn Rate Gauge',
              'Comms Hub with Common Room & Sub-Groups',
              'Contextual Tagging of Tasks & Receipts in Chat',
              'Role-Based Access Control (RBAC) with Temp Passwords',
              'Customer Discovery Logger with 5-File Evidence',
              'Active Presence Status Lights & Unread Counters',
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

      {/* Feature Bento Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-trackaa-green">
            The Complete Founder Stack
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything your startup needs to survive and scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-2xl bg-trackaa-green/20 text-trackaa-green flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Execution & Momentum
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Date-grouped task boards (Today, Overdue, Upcoming) with blocker resolutions and institutional audit trails.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-2xl bg-trackaa-navy text-cyan-400 flex items-center justify-center mb-4">
              <FolderLock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Dedicated Asset Vault
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Permanent home for SAFE notes, investor decks, PRDs, and Figma links. Searchable and always accessible.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-2xl bg-trackaa-green/20 text-emerald-400 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Cash & Runway Ledger
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Log angel wires, payroll stipends, and SaaS costs with dynamic 30-day runway projections and receipt attachments.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Comms & Common Room
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tag startup tasks, blockers, and receipts directly into team conversations with presence lights and unread counters.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-black/10 dark:border-white/15 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-trackaa-green text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Founder Validation
            </span>
            <blockquote className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white leading-relaxed">
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

      {/* Footer */}
      <footer className="py-12 border-t border-black/5 dark:border-white/10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrackaaLogo size="sm" />
          <span>© 2026 Trackaa Technologies Inc. Built for first-time founders.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white">Pricing</a>
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
