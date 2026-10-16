import React, { useState, useRef, useEffect } from 'react';
import { StartupStatus } from '../types';
import { useApp } from '../context/AppContext';
import { ChevronDown, CheckCircle2, Clock, AlertOctagon, CircleDot } from 'lucide-react';

interface StatusBadgeProps {
  startupId: string;
  status: StartupStatus;
  size?: 'sm' | 'md';
  interactive?: boolean;
}

const statusConfig: Record<StartupStatus, { label: string; dotColor: string; pillColor: string; icon: any }> = {
  'not-started': {
    label: 'Not Started',
    dotColor: 'bg-slate-400',
    pillColor: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    icon: CircleDot,
  },
  'in-progress': {
    label: 'In Progress',
    dotColor: 'bg-blue-500',
    pillColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    icon: Clock,
  },
  'blocked': {
    label: 'Blocked',
    dotColor: 'bg-rose-500 animate-pulse',
    pillColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
    icon: AlertOctagon,
  },
  'complete': {
    label: 'Completed',
    dotColor: 'bg-trackaa-green',
    pillColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    icon: CheckCircle2,
  },
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

  const current = statusConfig[status] || statusConfig['not-started'];

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

  const handleSelect = (newStatus: StartupStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    quickUpdateStatus(startupId, newStatus);
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
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={!interactive}
        title={interactive ? "Click to change status" : undefined}
        className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-all duration-200 ${current.pillColor} ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'
        } ${interactive ? 'hover:scale-[1.03] active:scale-[0.98] cursor-pointer hover:border-slate-400/40 dark:hover:border-white/30' : 'cursor-default'}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor}`} />
        <span>{current.label}</span>
        {interactive && (
          <ChevronDown className={`w-3 h-3 ml-0.5 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Floating Apple-glass dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-40 glass-dropdown rounded-xl p-1 z-50 animate-slide-up shadow-xl border">
          {(Object.keys(statusConfig) as StartupStatus[]).map(key => {
            const item = statusConfig[key];
            const Icon = item.icon;
            const isSelected = key === status;
            return (
              <button
                key={key}
                type="button"
                onClick={(e) => handleSelect(key, e)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                <span className="flex-1">{item.label}</span>
                {isSelected && <span className="w-1.5 h-1.5 bg-trackaa-green rounded-full" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
