import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { CategoryManagement } from './components/CategoryManagement';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './services/firebase';
import { Task } from './types/Task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
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
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <nav className="space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900"
              >
                Tasks
              </Link>
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-600 hover:text-gray-900"
              >
                Categories
              </Link>
            </nav>
          </div>

          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/dashboard" element={<DashboardPage tasks={tasks} />} />
            <Route path="/categories" element={<CategoryManagement />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 