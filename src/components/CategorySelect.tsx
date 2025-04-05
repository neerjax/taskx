import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const q = query(collection(db, 'categories'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const categoryList = querySnapshot.docs.map(doc => doc.data().name);
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMessage({ text: 'Failed to load categories', type: 'error' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddNewCategory = async () => {
    if (!newCategory.trim()) return;

    setIsLoading(true);
    try {
      // Check if category already exists
      if (categories.includes(newCategory.trim())) {
        setMessage({ text: 'Category already exists', type: 'error' });
        return;
      }

      // Add to Firestore
      await addDoc(collection(db, 'categories'), {
        name: newCategory.trim(),
        createdAt: new Date()
      });

      // Update local state
      await fetchCategories(); // Refresh the list
      onChange(newCategory.trim());
      setNewCategory('');
      setIsAddingNew(false);
      setMessage({ text: 'Category added successfully', type: 'success' });
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage({ text: 'Failed to add category', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="relative space-y-2">
      {!isAddingNew ? (
        <div className="flex gap-2">
          <select
            value={value}
            onChange={(e) => {
              if (e.target.value === 'add_new') {
                setIsAddingNew(true);
              } else {
                onChange(e.target.value);
              }
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="add_new">+ Add New Category</option>
          </select>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddNewCategory();
              }
            }}
          />
          <button
            onClick={handleAddNewCategory}
            disabled={isLoading}
            className={`mt-1 px-3 py-1 rounded text-white ${
              isLoading 
                ? 'bg-gray-400' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
          <button
            onClick={() => {
              setIsAddingNew(false);
              setNewCategory('');
              setMessage(null);
            }}
            className="mt-1 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Message display */}
      {message && (
        <div className={`text-sm px-2 py-1 rounded ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}; 