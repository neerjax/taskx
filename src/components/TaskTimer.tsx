import React, { useState, useEffect } from 'react';

interface TaskTimerProps {
  startTime: Date;
  previousTime?: number;
  isPaused?: boolean;
}

export const TaskTimer: React.FC<TaskTimerProps> = ({ 
  startTime, 
  previousTime = 0,
  isPaused = false 
}) => {
  const [elapsedTime, setElapsedTime] = useState(previousTime);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = now.getTime() - startTime.getTime();
      setElapsedTime(previousTime + timeDiff);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, previousTime, isPaused]);

  const formatTime = (ms: number) => {
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

  return (
    <div className={`text-sm font-mono px-2 py-1 rounded ${
      isPaused ? 'bg-yellow-100' : 'bg-gray-100'
    }`}>
      {formatTime(elapsedTime)}
    </div>
  );
}; 