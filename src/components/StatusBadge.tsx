import React, { useState, useRef, useEffect } from 'react';
import { StatusLadderRung, StartupStatus } from '../types';
import { useApp } from '../context/AppContext';
import { ChevronDown, TrendingUp, AlertTriangle, CheckCircle2, Zap, Flame, ShieldAlert, Sparkles } from 'lucide-react';

interface StatusBadgeProps {
  startupId: string;
  status: StartupStatus;
  size?: 'sm' | 'md';
  interactive?: boolean;
}

// Gradient Ladder Rungs: from Struggling to Exceeding Expectations
export const statusLadderConfig: Record<
  StatusLadderRung,
  {
    rung: number;
    label: string;
    description: string;
    gradientBg: string;
    glowColor: string;
    icon: any;
  }
> = {
  behind: {
    rung: 1,
    label: 'Struggling / Behind Schedule',
    description: 'Impediments blocking momentum',
    gradientBg: 'bg-gradient-to-r from-rose-700 via-rose-600 to-red-600',
    glowColor: 'shadow-[0_0_15px_-3px_rgba(225,29,72,0.4)]',
    icon: ShieldAlert,
  },
  friction: {
    rung: 2,
    label: 'Needs Attention / Friction',
    description: 'Bottlenecks identified; resolving',
    gradientBg: 'bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600',
    glowColor: 'shadow-[0_0_15px_-3px_rgba(217,119,6,0.4)]',
    icon: AlertTriangle,
  },
  on_track: {
    rung: 3,
    label: 'On Track / Steady',
    description: 'Meeting weekly targets consistently',
    gradientBg: 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600',
    glowColor: 'shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]',
    icon: CheckCircle2,
  },
  velocity: {
    rung: 4,
    label: 'Gaining Velocity',
    description: 'High throughput across sprints',
    gradientBg: 'bg-gradient-to-r from-teal-700 via-emerald-600 to-trackaa-green',
    glowColor: 'shadow-[0_0_15px_-3px_rgba(5,150,105,0.4)]',
    icon: Zap,
  },
  exceeding: {
    rung: 5,
    label: 'Exceeding Expectations',
    description: 'Surpassing KPIs and roadmap gates',
    gradientBg: 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500',
    glowColor: 'shadow-[0_0_18px_-3px_rgba(16,185,129,0.5)]',
    icon: Flame,
  },
};

// Normalize legacy statuses to ladder
const normalizeStatus = (status: StartupStatus): StatusLadderRung => {
  if (status in statusLadderConfig) return status as StatusLadderRung;
  if (status === 'blocked') return 'behind';
  if (status === 'not-started') return 'friction';
  if (status === 'in-progress') return 'on_track';
  if (status === 'complete') return 'exceeding';
  return 'velocity';
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  startupId,
  status,
  size = 'md',
  interactive = true,
}) => {
  const { quickUpdateStatus } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const rungKey = normalizeStatus(status);
  const current = statusLadderConfig[rungKey];
  const Icon = current.icon;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (newRung: StatusLadderRung, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    quickUpdateStatus(startupId, newRung);
    setIsOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Design Rule: Pill text is always WHITE (text-white) */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={!interactive}
        title={interactive ? 'Click to climb or adjust status ladder' : undefined}
        className={`inline-flex items-center gap-1.5 font-medium rounded-full border border-white/20 text-white shadow-sm transition-all duration-200 ${
          current.gradientBg
        } ${current.glowColor} ${
          size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3.5 py-1 text-xs'
        } ${interactive ? 'hover:scale-[1.03] active:scale-[0.98] cursor-pointer hover:border-white/40' : 'cursor-default'}`}
      >
        <Icon className={`w-3 h-3 text-white fill-white/20`} />
        {/* Crisp white text */}
        <span className="text-white font-semibold drop-shadow-sm">{current.label}</span>
        {interactive && (
          <ChevronDown
            className={`w-3 h-3 ml-0.5 text-white/80 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      {/* Floating Apple-Glass Status Ladder Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 glass-dropdown rounded-2xl p-2 z-50 animate-slide-up shadow-2xl border border-white/15">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-black/5 dark:border-white/10 mb-1 flex items-center justify-between">
            <span>Momentum Ladder</span>
            <span className="text-[10px] text-trackaa-green font-normal">Admin Adjustable</span>
          </div>

          <div className="space-y-1">
            {(Object.keys(statusLadderConfig) as StatusLadderRung[]).map(key => {
              const rungItem = statusLadderConfig[key];
              const RungIcon = rungItem.icon;
              const isSelected = key === rungKey;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={e => handleSelect(key, e)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                    isSelected
                      ? `${rungItem.gradientBg} text-white shadow-md font-semibold ring-1 ring-white/30`
                      : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-slate-400'
                    }`}
                  >
                    <RungIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-200'}>
                      {rungItem.label}
                    </div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {rungItem.description}
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                    Rung {rungItem.rung}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
