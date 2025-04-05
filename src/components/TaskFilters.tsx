import React from 'react';
import { Task } from '../types/Task';

interface TaskFiltersProps {
  onFilterChange: (filters: TaskFilters) => void;
  onSortChange: (sort: SortOption) => void;
}

export interface TaskFilters {
  status?: Task['status'];
  classification?: Task['classification'];
}

export type SortOption = 'createdAt' | 'timeSpent' | 'title';

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            onChange={(e) => onFilterChange({ status: e.target.value as Task['status'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        <div>
          <label htmlFor="classification" className="block text-sm font-medium text-gray-700">
            Classification
          </label>
          <select
            id="classification"
            onChange={(e) => onFilterChange({ classification: e.target.value as Task['classification'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="Leverage">Leverage</option>
            <option value="Neutral">Neutral</option>
            <option value="Overhead">Overhead</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            id="sort"
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="createdAt">Date Created</option>
            <option value="timeSpent">Time Spent</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
}; 