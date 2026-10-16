import React from 'react';
import { StartupStage } from '../types';
import { Sparkles, Hammer, Beaker, Rocket, TrendingUp } from 'lucide-react';

interface StageBadgeProps {
  stage: StartupStage;
  size?: 'sm' | 'md';
}

const stageConfig: Record<StartupStage, { label: string; icon: any; color: string; border: string }> = {
  idea: {
    label: 'Idea Stage',
    icon: Sparkles,
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/20',
  },
  building: {
    label: 'Building',
    icon: Hammer,
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/20',
  },
  beta: {
    label: 'Private Beta',
    icon: Beaker,
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-500/20',
  },
  launched: {
    label: 'Live / Launched',
    icon: Rocket,
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20',
  },
  scaling: {
    label: 'Scaling',
    icon: TrendingUp,
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/20',
  },
};

export const StageBadge: React.FC<StageBadgeProps> = ({ stage, size = 'sm' }) => {
  const config = stageConfig[stage] || stageConfig.idea;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full border ${config.color} ${config.border} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'
      }`}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
};
