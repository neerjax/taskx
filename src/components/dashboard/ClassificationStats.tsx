import React from 'react';
import { Task } from '../../types/Task';
import { StatsRow } from './StatsRow';

interface ClassificationStatsProps {
  tasks: Task[];
  totalTasks: number;
}

export const ClassificationStats: React.FC<ClassificationStatsProps> = ({ tasks, totalTasks }) => {
  const stats = tasks.reduce((acc, task) => {
    const classification = task.classification;
    if (!acc[classification]) {
      acc[classification] = { count: 0, timeSpent: 0 };
    }
    acc[classification].count += 1;
    acc[classification].timeSpent += task.timeSpent || 0;
    return acc;
  }, {} as Record<string, { count: number; timeSpent: number }>);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Classification Distribution</h3>
      <div className="space-y-3">
        {Object.entries(stats).map(([classification, data]) => (
          <StatsRow
            key={classification}
            label={classification}
            count={data.count}
            timeSpent={data.timeSpent}
            total={totalTasks}
            colorClass={
              classification === 'Leverage' ? 'bg-green-100 text-green-800' :
              classification === 'Overhead' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }
          />
        ))}
      </div>
    </div>
  );
}; 