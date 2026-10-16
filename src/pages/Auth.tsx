import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TrackaaLogo } from '../components/TrackaaLogo';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'founder@trackaa.com', fullName || 'Triumph Ugoji');
    navigate('/dashboard');
  };

  const handleGoogleAuth = () => {
    login('founder.google@trackaa.com', 'Triumph Ugoji');
    navigate('/dashboard');
  };

  const handleInstantDemo = () => {
    login('demo.founder@trackaa.com', 'Triumph Ugoji');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A111E] flex flex-col justify-center items-center p-4 relative selection:bg-trackaa-green/30">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-trackaa-green/10 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block hover:scale-105 transition-transform">
            <TrackaaLogo size="lg" />
          </Link>
          <p className="mt-2 text-xs text-slate-500">
            {mode === 'signin' ? 'Welcome back to your Founder OS' : 'Create your startup operating center'}
          </p>
        </div>

        {/* Auth Glass Card */}
        <div className="rounded-3xl glass-dropdown p-8 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
          {/* Mode Switcher */}
          <div className="flex p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                mode === 'signin'
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Social Auth (Google) */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl glass-panel text-slate-800 dark:text-white text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/15 shadow-sm active:scale-[0.98] mb-5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google Workspace</span>
          </button>

          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-black/10 dark:border-white/10 w-full" />
            <span className="bg-white dark:bg-[#111A2B] px-3 text-[11px] text-slate-400 absolute">
              or use founder email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Founder Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Triumph Ugoji"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="founder@yourstartup.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-trackaa-green text-slate-950 font-bold text-xs hover:bg-[#00DDA0] transition-all shadow-glow-emerald active:scale-[0.98]"
            >
              <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Launch Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Instant Demo Access Button */}
          <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={handleInstantDemo}
              className="w-full py-2.5 px-3 rounded-xl bg-trackaa-green/10 text-trackaa-green font-semibold text-xs hover:bg-trackaa-green/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Guest Mode (One-Click Tour)</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          By signing in, you agree to Trackaa's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
