import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TrackaaLogo } from './TrackaaLogo';
import {
  Plus,
  Sun,
  Moon,
  ChevronDown,
  Layers,
  MessageSquare,
  Settings as SettingsIcon,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenNewStartup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNewStartup }) => {
  const {
    startups,
    currentStartupId,
    setCurrentStartupId,
    currentStartup,
    theme,
    toggleTheme,
    isAuthenticated,
    currentUser,
    profiles,
    logout,
  } = useApp();

  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const switcherRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Total unread messages across all team members
  const totalUnread = profiles.reduce((sum, p) => sum + (p.unread_count || 0), 0);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const isCurrent = (path: string) => {
    if (path === '/dashboard' && (location.pathname === '/dashboard' || location.pathname === '/')) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/75 dark:bg-[#111827]/85 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Venture Switcher */}
        <div className="flex items-center gap-5">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center group">
            <TrackaaLogo size="sm" />
          </Link>

          {isAuthenticated && startups.length > 0 && (
            <div className="relative" ref={switcherRef}>
              <button
                type="button"
                onClick={() => setSwitcherOpen(prev => !prev)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill hover:bg-black/5 dark:hover:bg-white/10 transition-all text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                {currentStartup?.logo_url ? (
                  <img
                    src={currentStartup.logo_url}
                    alt={currentStartup.name}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-trackaa-green text-white flex items-center justify-center font-bold text-[9px]">
                    {currentStartup?.name.charAt(0)}
                  </span>
                )}
                <span className="max-w-[130px] truncate">{currentStartup?.name || 'Select Startup'}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform ${switcherOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Startup switcher dropdown */}
              {switcherOpen && (
                <div className="absolute left-0 mt-2 w-64 glass-dropdown rounded-2xl p-2 z-50 animate-slide-up">
                  <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Your Startups
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {startups.map(s => {
                      const isActive = s.id === currentStartupId;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setCurrentStartupId(s.id);
                            setSwitcherOpen(false);
                            navigate(`/startups/${s.id}`);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-trackaa-green text-white font-semibold shadow-sm'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                          }`}
                        >
                          {s.logo_url ? (
                            <img src={s.logo_url} alt={s.name} className="w-6 h-6 rounded-lg object-cover" />
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs font-bold">
                              {s.name.charAt(0)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="truncate">{s.name}</div>
                            <div className={`text-[10px] capitalize ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                              {s.stage.replace('_', ' ')}
                            </div>
                          </div>
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="pt-2 mt-2 border-t border-black/5 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setSwitcherOpen(false);
                        onOpenNewStartup?.();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-trackaa-green hover:bg-trackaa-green/10 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Launch New Startup</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center: Primary Navigation */}
        {isAuthenticated ? (
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isCurrent('/dashboard')
                  ? 'bg-trackaa-green text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Startups</span>
            </Link>

            {/* Changed from Teams to Comms with unread notification badge */}
            <Link
              to="/comms"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all relative ${
                isCurrent('/comms')
                  ? 'bg-trackaa-green text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Comms</span>
              {totalUnread > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-extrabold text-[9px] flex items-center justify-center">
                  {totalUnread}
                </span>
              )}
            </Link>

            <Link
              to="/settings"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isCurrent('/settings')
                  ? 'bg-trackaa-green text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Settings</span>
            </Link>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-trackaa-green transition-colors">Features</a>
            <a href="#pricing" className="hover:text-trackaa-green transition-colors">Founder Pricing</a>
            <a href="#vault" className="hover:text-trackaa-green transition-colors">Asset Vault</a>
            <a href="#testimonials" className="hover:text-trackaa-green transition-colors">Testimonials</a>
          </div>
        )}

        {/* Right: Actions, Theme, & User Profile */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 transition-transform active:scale-90"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {isAuthenticated ? (
            <>
              {/* + New Startup Button */}
              {onOpenNewStartup && (
                <button
                  type="button"
                  onClick={onOpenNewStartup}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-trackaa-green text-white font-semibold text-xs hover:bg-[#059669] transition-all shadow-glow-emerald active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>New Startup</span>
                </button>
              )}

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(prev => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full glass-pill hover:ring-2 hover:ring-trackaa-green/40 transition-all"
                >
                  <img
                    src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                    alt={currentUser.full_name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-dropdown rounded-2xl p-2 z-50 animate-slide-up">
                    <div className="px-3 py-2 border-b border-black/5 dark:border-white/10 mb-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {currentUser.full_name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                    </div>

                    <Link
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <SettingsIcon className="w-3.5 h-3.5" />
                      <span>Preferences</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth?mode=signup"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-trackaa-green text-white font-semibold text-xs hover:bg-[#059669] transition-all shadow-glow-emerald active:scale-95"
              >
                <span>Get Started Free</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
