import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

interface Category {
  id: string;
  name: string;
  taskCount?: number;
}

export const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mergeTarget, setMergeTarget] = useState<string>('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categoriesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];

    // Get task counts for each category
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    const taskCounts = tasksSnapshot.docs.reduce((acc, doc) => {
      const category = doc.data().category;
      if (category) {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const categoriesWithCounts = categoriesData.map(cat => ({
      ...cat,
      taskCount: taskCounts[cat.name] || 0
    }));

    setCategories(categoriesWithCounts);
  };

  const handleMergeCategories = async () => {
    if (!mergeTarget || selectedCategories.length < 2) return;

    // Update all tasks with selected categories to use the merge target
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    const updatePromises = tasksSnapshot.docs.map(async taskDoc => {
      const taskData = taskDoc.data();
      if (selectedCategories.includes(taskData.category)) {
        await updateDoc(doc(db, 'tasks', taskDoc.id), {
          category: mergeTarget
        });
      }
    });

    await Promise.all(updatePromises);

    // Delete merged categories
    const deletePromises = selectedCategories
      .filter(cat => cat !== mergeTarget)
      .map(async categoryName => {
        const categoryDoc = categories.find(c => c.name === categoryName);
        if (categoryDoc) {
          await deleteDoc(doc(db, 'categories', categoryDoc.id));
        }
      });

    await Promise.all(deletePromises);

    // Reset states and refresh
    setSelectedCategories([]);
    setMergeTarget('');
    fetchCategories();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Category Management</h2>

      {/* Add New Category */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter category name"
          />
          <button
            onClick={async () => {
              if (newCategory.trim()) {
                await addDoc(collection(db, 'categories'), {
                  name: newCategory.trim(),
                  createdAt: new Date()
                });
                setNewCategory('');
                fetchCategories();
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Merge Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Merge Categories</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select categories to merge
            </label>
            <div className="mt-2 space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories(prev => [...prev, category.name]);
                      } else {
                        setSelectedCategories(prev => 
                          prev.filter(cat => cat !== category.name)
                        );
                      }
                    }}
                    className="mr-2"
                  />
                  <span>{category.name} ({category.taskCount} tasks)</span>
                </div>
              ))}
            </div>
          </div>

          {selectedCategories.length >= 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Merge into
              </label>
              <select
                value={mergeTarget}
                onChange={(e) => setMergeTarget(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select target category</option>
                {selectedCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={handleMergeCategories}
                disabled={!mergeTarget}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-300"
              >
                Merge Categories
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 