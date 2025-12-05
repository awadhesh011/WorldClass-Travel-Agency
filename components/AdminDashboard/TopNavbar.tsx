import React from 'react';

interface TopNavbarProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleDarkMode, isDarkMode }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-30">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
      <button
        onClick={onToggleDarkMode}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.325 5.5l-.707-.707M6.381 6.381l-.707-.707M16.95 7.05l-.707.707M7.05 16.95l-.707-.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default TopNavbar;
