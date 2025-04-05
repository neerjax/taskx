import React from 'react';

interface StatsRowProps {
  label: string;
  count: number;
  timeSpent: number;
  total: number;
  colorClass: string;
}

export const StatsRow: React.FC<StatsRowProps> = ({
  label,
  count,
  timeSpent,
  total,
  colorClass
}) => (
  <div className="border-b border-gray-100 pb-3 last:border-0">
    <div className="flex items-center mb-2">
      <span className={`text-sm px-2 py-1 rounded flex-shrink-0 ${colorClass}`}>
        {label}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Tasks</span>
        <div className="flex items-center">
          <span className="font-semibold">{count}</span>
          <span className="text-xs text-gray-500 ml-1">
            ({total > 0 ? Math.round((count / total) * 100) : 0}%)
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Time</span>
        <div className="flex items-center">
          <span className="font-semibold">{Math.round(timeSpent / 60000)}</span>
          <span className="text-xs text-gray-500 ml-1">min</span>
        </div>
      </div>
    </div>
  </div>
); 