import React from 'react';
import { Task } from '../types/Task';
import { TaskTimer } from './TaskTimer';

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onStartTimer: (taskId: string) => void;
  onPauseTimer: (taskId: string) => void;
  onResumeTimer: (taskId: string) => void;
  onStopTimer: (taskId: string) => void;
}

const formatTimeSpent = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onStopTimer,
}) => {
  const handleStatusChange = (newStatus: Task['status']) => {
    onStatusChange(task.id, newStatus);
    if (task.startedAt && (newStatus === 'Paused' || newStatus === 'Blocked')) {
      onPauseTimer(task.id);
    }
  };

  const renderTimerControls = () => {
    if (!task.startedAt) {
      return (
        <button
          onClick={() => onStartTimer(task.id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Start Timer
        </button>
      );
    }

    return (
      <>
        <TaskTimer 
          startTime={task.startedAt} 
          previousTime={task.timeSpent || 0}
          isPaused={task.status === 'Paused' || task.status === 'Blocked'}
        />
        {task.status === 'In Progress' ? (
          <div className="flex gap-2">
            <button
              onClick={() => onPauseTimer(task.id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Pause
            </button>
            <button
              onClick={() => onStopTimer(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Complete
            </button>
          </div>
        ) : (
          <button
            onClick={() => onResumeTimer(task.id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Resume
          </button>
        )}
      </>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          task.classification === 'Leverage' ? 'bg-green-100 text-green-800' :
          task.classification === 'Overhead' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {task.classification}
        </span>
      </div>
      
      <div className="mt-2 flex items-center gap-4">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
          className="border rounded px-2 py-1"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Paused">Paused</option>
          <option value="Blocked">Blocked</option>
          <option value="Completed">Completed</option>
        </select>

        {task.status !== 'Completed' && renderTimerControls()}
      </div>

      {task.timeSpent !== undefined && !task.startedAt && (
        <div className="mt-2 text-sm text-gray-600">
          Time spent: {formatTimeSpent(task.timeSpent)}
        </div>
      )}
      
      {task.category && (
        <div className="mt-1 text-sm text-gray-500">
          Category: {task.category}
        </div>
      )}
    </div>
  );
}; 