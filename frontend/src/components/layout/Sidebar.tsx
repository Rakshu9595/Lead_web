import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Smart Leads</h1>
        <p className="text-sm text-gray-400">Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg mb-2 transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          Dashboard
        </NavLink>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;