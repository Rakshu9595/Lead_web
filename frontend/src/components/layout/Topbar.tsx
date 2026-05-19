import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Moon, Sun } from 'lucide-react';

const Topbar: React.FC = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center transition-colors duration-200">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Lead Management</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
        </div>
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Topbar;