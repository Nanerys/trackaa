import React from 'react';
import { PriorityLevel } from '../types';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'sm' | 'md';
}

const priorityConfig: Record<PriorityLevel, { label: string; bgClass: string; borderClass: string }> = {
  low: {
    label: 'Low',
    bgClass: 'bg-slate-700 dark:bg-slate-800',
    borderClass: 'border-slate-500/30',
  },
  medium: {
    label: 'Medium',
    bgClass: 'bg-amber-600 dark:bg-amber-700',
    borderClass: 'border-amber-400/30',
  },
  high: {
    label: 'High',
    bgClass: 'bg-orange-600 dark:bg-orange-700',
    borderClass: 'border-orange-400/30',
  },
  critical: {
    label: 'Critical',
    bgClass: 'bg-rose-700 dark:bg-rose-800',
    borderClass: 'border-rose-400/40',
  },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'sm' }) => {
  const config = priorityConfig[priority] || priorityConfig.medium;
  return (
    <span
      className={`inline-flex items-center rounded-full border uppercase tracking-wider font-semibold text-white shadow-sm ${
        config.bgClass
      } ${config.borderClass} ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {config.label}
    </span>
  );
};
