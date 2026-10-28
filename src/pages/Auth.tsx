import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TrackaaLogo } from '../components/TrackaaLogo';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  X,
  Check,
  User,
  ArrowLeft,
} from 'lucide-react';

export const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password states
  const [forgotStep, setForgotStep] = useState<'request' | 'reset' | 'success'>('request');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Google OAuth popup modal simulation
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  const { login, resetAdminPassword } = useApp();
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = email.trim() || 'Trylonofficial@gmail.com';
    const finalName = fullName.trim() || finalEmail.split('@')[0];
    login(finalEmail, finalName);
    navigate('/dashboard');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please verify.');
      return;
    }
    const finalEmail = email.trim() || 'founder@trackaa.com';
    const finalName = fullName.trim() || 'Founder';
    login(finalEmail, finalName);
    navigate('/dashboard');
  };

  const handleGoogleSelect = (userEmail: string, userName: string) => {
    login(userEmail, userName);
    setIsGoogleModalOpen(false);
    navigate('/dashboard');
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    const name = customGoogleEmail.split('@')[0];
    login(customGoogleEmail.trim(), name);
    setIsGoogleModalOpen(false);
    navigate('/dashboard');
  };

  const handleForgotRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setForgotError('Please enter your registered email address.');
      return;
    }
    setForgotError('');
    setForgotStep('reset');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setForgotError('Password must be at least 6 characters.');
      return;
    }
    resetAdminPassword(newPassword);
    setForgotStep('success');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A111E] flex flex-col justify-center items-center p-4 relative selection:bg-trackaa-green/30">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#047857]/10 via-[#0F1E36]/10 to-transparent blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-7">
          <Link to="/" className="inline-block hover:scale-105 transition-transform">
            <TrackaaLogo size="lg" />
          </Link>
          <p className="mt-2 text-xs text-slate-500">
            {mode === 'signin'
              ? 'Welcome back to your Founder OS'
              : mode === 'signup'
              ? 'Create your all-in-one startup operating center'
              : 'Recover your founder credentials'}
          </p>
        </div>

        {/* Main Auth Glass Card */}
        <div className="rounded-3xl glass-dropdown p-7 sm:p-8 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
          {/* Sign In & Sign Up Modes */}
          {mode !== 'forgot' && (
            <>
              {/* Mode Switcher Tabs */}
              <div className="flex p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mode === 'signup'
                      ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Social Auth: Google Workspace */}
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(true)}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl bg-white dark:bg-white/10 text-slate-800 dark:text-white text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/15 transition-all border border-black/10 dark:border-white/15 shadow-sm active:scale-[0.98] mb-5"
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
                <span className="bg-white dark:bg-[#152033] px-3 text-[11px] text-slate-400 absolute">
                  or use founder email
                </span>
              </div>

              {/* Form: Sign In */}
              {mode === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Work Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Trylonofficial@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setForgotStep('request');
                        }}
                        className="text-[11px] font-semibold text-trackaa-green hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
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
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] transition-all shadow-glow-emerald active:scale-[0.98]"
                  >
                    <span>Sign In to Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Form: Sign Up */}
              {mode === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Founder Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Triumph Ugoji"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Startup Work Email *
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

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Min 6 chars"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Confirm
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] transition-all shadow-glow-emerald active:scale-[0.98]"
                  >
                    <span>Launch Free Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </>
          )}

          {/* Mode: Forgot Password */}
          {mode === 'forgot' && (
            <div className="space-y-4 animate-fade-in">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>

              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Reset Password</h3>
                  <p className="text-[11px] text-slate-400">Regain access to your Trackaa OS account</p>
                </div>
              </div>

              {forgotStep === 'request' && (
                <form onSubmit={handleForgotRequest} className="space-y-3.5">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Enter the email associated with your startup workspace. We'll send you an instant reset token.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Account Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Trylonofficial@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  {forgotError && (
                    <p className="text-[11px] text-rose-500 font-semibold">{forgotError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
                  >
                    Send Reset Verification
                  </button>
                </form>
              )}

              {forgotStep === 'reset' && (
                <form onSubmit={handleForgotSubmit} className="space-y-3.5 animate-slide-up">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                    Verification code auto-verified for <strong>{email || 'Trylonofficial@gmail.com'}</strong>.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Minimum 6 characters"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                    />
                  </div>

                  {forgotError && (
                    <p className="text-[11px] text-rose-500 font-semibold">{forgotError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
                  >
                    Update Password & Proceed
                  </button>
                </form>
              )}

              {forgotStep === 'success' && (
                <div className="text-center py-4 space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Password Reset Successfully!
                  </h4>
                  <p className="text-xs text-slate-400">
                    Your password has been updated across Trackaa OS. You can now sign in with your new credentials.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setForgotStep('request');
                    }}
                    className="w-full py-2.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
                  >
                    Proceed to Sign In
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Demo Access at Bottom */}
          <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/10 text-center">
            <button
              type="button"
              onClick={() => {
                login('founder@trackaa.com', 'Triumph Ugoji');
                navigate('/dashboard');
              }}
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

      {/* Google OAuth Simulation Modal */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm glass-dropdown rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-2">
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
                <span className="text-xs font-bold text-slate-900 dark:text-white">Choose a Google Account</span>
              </div>
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => handleGoogleSelect('Trylonofficial@gmail.com', 'Triumph Ugoji')}
                className="w-full flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-trackaa-green/15 transition-all text-left group"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
                  alt="Triumph"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-trackaa-green"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-trackaa-green truncate">
                    Triumph Ugoji
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">Trylonofficial@gmail.com</div>
                </div>
                <span className="text-[10px] font-semibold text-trackaa-green bg-trackaa-green/10 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleGoogleSelect('founder@trackaa.com', 'Founder Lead')}
                className="w-full flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-trackaa-green/15 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-full bg-trackaa-navy text-trackaa-green font-bold text-sm flex items-center justify-center">
                  FL
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-trackaa-green truncate">
                    Founder Lead
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">founder@trackaa.com</div>
                </div>
              </button>
            </div>

            {/* Custom Google account */}
            <form onSubmit={handleCustomGoogleSubmit} className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 space-y-2">
              <label className="text-[11px] font-semibold text-slate-500 block">
                Or sign in with another Google email:
              </label>
              <input
                type="email"
                placeholder="your.name@gmail.com"
                value={customGoogleEmail}
                onChange={e => setCustomGoogleEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
