import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onToggleDarkMode, isDarkMode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNavbar onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
