import React from 'react';
import { Task } from '../../types/Task';

interface StatCardProps {
  title: string;
  tasks: Task[];
  statusOrder: string[];
  tasksByStatus: Record<string, number>;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  tasks, 
  statusOrder, 
  tasksByStatus 
}) => {
  const totalTasks = tasks.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>
        </div>

        <div className="grid gap-2">
          {statusOrder.map(status => (
            <StatusRow 
              key={status} 
              status={status} 
              count={tasksByStatus[status] || 0} 
              total={totalTasks} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusRow: React.FC<{ status: string; count: number; total: number }> = ({ 
  status, 
  count, 
  total 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm px-2 py-1 rounded ${getStatusColor(status)}`}>
        {status}
      </span>
      <div className="flex items-center">
        <span className="text-sm font-semibold">{count}</span>
        <span className="text-xs text-gray-500 ml-1">
          ({total > 0 ? Math.round((count / total) * 100) : 0}%)
        </span>
      </div>
    </div>
  );
}; 