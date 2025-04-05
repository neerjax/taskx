import React from 'react';
import { Task } from '../types/Task';
import { StatCard } from './dashboard/StatCard';
import { ClassificationStats } from './dashboard/ClassificationStats';
import { CategoryStats } from './dashboard/CategoryStats';

interface DashboardProps {
  tasks: Task[];
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const statusOrder = ['Not Started', 'In Progress', 'Paused', 'Blocked', 'Completed'];
  const tasksByStatus = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Overview Card */}
      <StatCard 
        title="Overview" 
        tasks={tasks} 
        statusOrder={statusOrder}
        tasksByStatus={tasksByStatus}
      />

      {/* Classification Stats */}
      <ClassificationStats tasks={tasks} totalTasks={totalTasks} />

      {/* Category Stats */}
      <CategoryStats tasks={tasks} totalTasks={totalTasks} />
    </div>
  );
}; 