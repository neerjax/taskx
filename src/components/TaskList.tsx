import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Task } from '../types/Task';
import { TaskItem } from './TaskItem';
import { TaskFilters, TaskFilters as TaskFiltersType, SortOption } from './TaskFilters';

interface TaskListProps {
  status: Task['status'];
  title: string;
  filters: TaskFiltersType;
  sortBy: SortOption;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  status, 
  title, 
  filters,
  sortBy 
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    console.log('Fetching tasks...');
    const q = query(collection(db, 'tasks'), orderBy(sortBy));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Got snapshot:', snapshot.docs.length, 'documents');
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        startedAt: doc.data().startedAt?.toDate(),
        completedAt: doc.data().completedAt?.toDate(),
      })) as Task[];
      
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [sortBy]);

  const filteredTasks = tasks.filter(task => {
    if (task.status !== status) return false;
    if (filters.classification && task.classification !== filters.classification) return false;
    return true;
  });

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { status: newStatus });
  };

  const handleStartTimer = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      startedAt: new Date(),
      status: 'In Progress'
    });
  };

  const handlePauseTimer = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task?.startedAt) {
      const timeSpent = (task.timeSpent || 0) + (new Date().getTime() - task.startedAt.getTime());
      await updateDoc(taskRef, {
        timeSpent,
        startedAt: null,
        status: 'Paused'
      });
    }
  };

  const handleResumeTimer = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      startedAt: new Date(),
      status: 'In Progress'
    });
  };

  const handleStopTimer = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task?.startedAt) {
      const timeSpent = (task.timeSpent || 0) + (new Date().getTime() - task.startedAt.getTime());
      await updateDoc(taskRef, {
        timeSpent,
        startedAt: null,
        status: 'Completed',
        completedAt: new Date()
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onStartTimer={handleStartTimer}
              onPauseTimer={handlePauseTimer}
              onResumeTimer={handleResumeTimer}
              onStopTimer={handleStopTimer}
            />
          ))}
          
          {filteredTasks.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No tasks {status.toLowerCase()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 