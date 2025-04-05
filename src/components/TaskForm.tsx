import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Task } from '../types/Task';
import { CategorySelect } from './CategorySelect';

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [classification, setClassification] = useState<Task['classification']>('Neutral');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Creating new task:', { title, category, classification });
      const newTask: Omit<Task, 'id'> = {
        title,
        category,
        classification,
        status: 'Not Started',
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      console.log('Task created with ID:', docRef.id);
      
      // Reset form
      setTitle('');
      setCategory('');
      setClassification('Neutral');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <CategorySelect
            value={category}
            onChange={setCategory}
          />
        </div>

        <div>
          <label htmlFor="classification" className="block text-sm font-medium text-gray-700">
            Classification
          </label>
          <select
            id="classification"
            value={classification}
            onChange={(e) => setClassification(e.target.value as Task['classification'])}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Leverage">Leverage</option>
            <option value="Neutral">Neutral</option>
            <option value="Overhead">Overhead</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}; 