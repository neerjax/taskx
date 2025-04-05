import React from 'react';
import { Dashboard } from '../components/Dashboard';
import { Task } from '../types/Task';

interface DashboardPageProps {
  tasks: Task[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ tasks }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Dashboard tasks={tasks} />
    </div>
  );
}; 