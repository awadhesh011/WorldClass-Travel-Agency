
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminSettingsContext } from '../../App';

const adminNavLinks = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Site Content', path: '/admin/content' },
  { name: 'Destinations', path: '/admin/destinations' },
  { name: 'Blog Posts', path: '/admin/blog' },
  { name: 'Settings', path: '/admin/settings' },
  { name: 'Analytics', path: '/admin/analytics' },
  { name: 'Back to Site', path: '/' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { adminSettings } = useContext(AdminSettingsContext);

  const activeLinkClass = `primary-bg text-white`;
  const defaultLinkClass = `text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700`;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col h-screen sticky top-0 overflow-y-auto hidden md:block">
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Admin
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {adminNavLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`flex items-center p-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  location.pathname === link.path ? activeLinkClass : defaultLinkClass
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;