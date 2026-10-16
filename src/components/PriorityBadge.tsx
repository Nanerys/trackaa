import React from 'react';
import { PriorityLevel } from '../types';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'sm' | 'md';
}

const priorityConfig: Record<PriorityLevel, { label: string; text: string; bg: string; border: string }> = {
  low: {
    label: 'Low',
    text: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
  },
  medium: {
    label: 'Medium',
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  high: {
    label: 'High',
    text: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  critical: {
    label: 'Critical',
    text: 'text-rose-600 dark:text-rose-400 font-semibold',
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/30',
  },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'sm' }) => {
  const config = priorityConfig[priority] || priorityConfig.medium;
  return (
    <span
      className={`inline-flex items-center rounded-full border uppercase tracking-wider font-medium ${config.bg} ${config.text} ${config.border} ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {config.label}
    </span>
  );
};
