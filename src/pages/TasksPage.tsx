import React, { useState } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskFilters, TaskFilters as TaskFiltersType, SortOption } from '../components/TaskFilters';

export const TasksPage: React.FC = () => {
  const [filters, setFilters] = useState<TaskFiltersType>({});
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Tasks</h1>
      
      {/* Task Form */}
      <div className="max-w-2xl">
        <TaskForm />
      </div>

      {/* Global Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <TaskFilters 
          onFilterChange={setFilters}
          onSortChange={setSortBy}
        />
      </div>

      {/* Not Started & In Progress Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskList 
          status="Not Started" 
          title="Not Started" 
          filters={filters}
          sortBy={sortBy}
        />
        <TaskList 
          status="In Progress" 
          title="In Progress"
          filters={filters}
          sortBy={sortBy}
        />
      </div>

      {/* Paused & Blocked Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskList 
          status="Paused" 
          title="Paused"
          filters={filters}
          sortBy={sortBy}
        />
        <TaskList 
          status="Blocked" 
          title="Blocked"
          filters={filters}
          sortBy={sortBy}
        />
      </div>

      {/* Completed Tasks - Full Width */}
      <div className="w-full">
        <TaskList 
          status="Completed" 
          title="Completed"
          filters={filters}
          sortBy={sortBy}
        />
      </div>
    </div>
  );
}; 