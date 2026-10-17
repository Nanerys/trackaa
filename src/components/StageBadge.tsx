import React, { useState, useRef, useEffect } from 'react';
import { StartupStage } from '../types';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Beaker,
  Hammer,
  Rocket,
  TrendingUp,
  Award,
  ChevronDown,
  Layers,
  Coins,
  Building,
} from 'lucide-react';

interface StageBadgeProps {
  startupId?: string;
  stage: StartupStage;
  size?: 'sm' | 'md';
  interactive?: boolean;
}

export const stageConfig: Record<
  StartupStage,
  {
    label: string;
    icon: any;
    bgClass: string;
    borderClass: string;
  }
> = {
  idea: {
    label: 'Idea Stage',
    icon: Sparkles,
    bgClass: 'bg-gradient-to-r from-purple-800 to-indigo-900',
    borderClass: 'border-purple-400/40',
  },
  validation: {
    label: 'Problem Validation',
    icon: Layers,
    bgClass: 'bg-gradient-to-r from-violet-800 to-purple-900',
    borderClass: 'border-violet-400/40',
  },
  building: {
    label: 'Building MVP',
    icon: Hammer,
    bgClass: 'bg-gradient-to-r from-cyan-800 to-blue-900',
    borderClass: 'border-cyan-400/40',
  },
  beta: {
    label: 'Private Beta',
    icon: Beaker,
    bgClass: 'bg-gradient-to-r from-indigo-800 to-blue-900',
    borderClass: 'border-indigo-400/40',
  },
  public_beta: {
    label: 'Public Beta',
    icon: Beaker,
    bgClass: 'bg-gradient-to-r from-blue-800 to-teal-900',
    borderClass: 'border-blue-400/40',
  },
  launched: {
    label: 'Launched & Live',
    icon: Rocket,
    bgClass: 'bg-gradient-to-r from-emerald-800 to-teal-900',
    borderClass: 'border-emerald-400/40',
  },
  seed: {
    label: 'Seed Stage',
    icon: Coins,
    bgClass: 'bg-gradient-to-r from-amber-800 to-orange-900',
    borderClass: 'border-amber-400/40',
  },
  series_a: {
    label: 'Series A',
    icon: TrendingUp,
    bgClass: 'bg-gradient-to-r from-emerald-800 to-trackaa-green',
    borderClass: 'border-emerald-400/40',
  },
  series_b: {
    label: 'Series B',
    icon: Award,
    bgClass: 'bg-gradient-to-r from-blue-900 to-indigo-900',
    borderClass: 'border-blue-400/40',
  },
  series_c: {
    label: 'Series C',
    icon: Building,
    bgClass: 'bg-gradient-to-r from-slate-800 to-slate-900',
    borderClass: 'border-slate-400/40',
  },
  series_d: {
    label: 'Series D+',
    icon: Building,
    bgClass: 'bg-gradient-to-r from-slate-900 to-black',
    borderClass: 'border-slate-300/40',
  },
};

export const StageBadge: React.FC<StageBadgeProps> = ({
  startupId,
  stage,
  size = 'sm',
  interactive = true,
}) => {
  const { updateStartupStage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const config = stageConfig[stage] || stageConfig.idea;
  const Icon = config.icon;

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

  const handleSelect = (newStage: StartupStage, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (startupId) {
      updateStartupStage(startupId, newStage);
    }
    setIsOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    if (!interactive || !startupId) return;
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Design Rule: Pill text is always crisp WHITE */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={!interactive || !startupId}
        title={interactive && startupId ? 'Click to change venture stage' : undefined}
        className={`inline-flex items-center gap-1.5 font-medium rounded-full border shadow-sm transition-all duration-200 text-white ${
          config.bgClass
        } ${config.borderClass} ${
          size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3.5 py-1 text-xs'
        } ${
          interactive && startupId
            ? 'hover:scale-[1.03] active:scale-[0.98] cursor-pointer hover:border-white/50'
            : 'cursor-default'
        }`}
      >
        <Icon className="w-3 h-3 text-white fill-white/20" />
        <span className="text-white font-semibold drop-shadow-sm">{config.label}</span>
        {interactive && startupId && (
          <ChevronDown
            className={`w-3 h-3 ml-0.5 text-white/80 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      {/* Floating Apple-Glass Stage Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 glass-dropdown rounded-2xl p-2 z-50 animate-slide-up shadow-2xl border border-white/15 max-h-72 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-black/5 dark:border-white/10 mb-1">
            Startup Lifecycle Stage
          </div>

          <div className="space-y-1">
            {(Object.keys(stageConfig) as StartupStage[]).map(key => {
              const item = stageConfig[key];
              const ItemIcon = item.icon;
              const isSelected = key === stage;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={e => handleSelect(key, e)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-left text-xs font-medium transition-all ${
                    isSelected
                      ? `${item.bgClass} text-white shadow-md font-semibold ring-1 ring-white/30`
                      : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  <ItemIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className={`flex-1 ${isSelected ? 'text-white' : ''}`}>{item.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
