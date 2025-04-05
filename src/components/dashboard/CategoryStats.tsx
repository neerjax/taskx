import React from 'react';
import { Task } from '../../types/Task';
import { StatsRow } from './StatsRow';

interface CategoryStatsProps {
  tasks: Task[];
  totalTasks: number;
}

export const CategoryStats: React.FC<CategoryStatsProps> = ({ tasks, totalTasks }) => {
  const stats = tasks.reduce((acc, task) => {
    const category = task.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = { count: 0, timeSpent: 0 };
    }
    acc[category].count += 1;
    acc[category].timeSpent += task.timeSpent || 0;
    return acc;
  }, {} as Record<string, { count: number; timeSpent: number }>);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Category Statistics</h3>
      <div className="space-y-3">
        {Object.entries(stats)
          .sort(([,a], [,b]) => b.timeSpent - a.timeSpent)
          .map(([category, data]) => (
            <StatsRow
              key={category}
              label={category}
              count={data.count}
              timeSpent={data.timeSpent}
              total={totalTasks}
              colorClass="bg-blue-50 text-blue-800"
            />
          ))}
      </div>
    </div>
  );
}; 