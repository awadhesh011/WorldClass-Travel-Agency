
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import { NavLink } from '../../types';

interface HeaderProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleDarkMode, isDarkMode }) => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const headerLinks: NavLink[] = siteContent?.headerLinks || [];

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative z-40 bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-400)] transition-colors">
          WorldClass
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {headerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-gray-700 dark:text-gray-300 hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-accent-400)] font-medium transition-colors duration-200
                ${location.pathname === link.path ? `border-b-2 border-[var(--color-primary-600)] dark:border-[var(--color-accent-400)]` : ''}`}
            >
              {link.name}
            </Link>
          ))}
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={onToggleDarkMode}
            className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
            {isOpen ? (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 pb-4 shadow-lg absolute w-full left-0 right-0">
          <div className="flex flex-col items-center space-y-4">
            {headerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 dark:text-gray-300 hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-accent-400)] text-lg font-medium transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;