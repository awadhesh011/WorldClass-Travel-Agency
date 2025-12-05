import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'; // Import Outlet

interface LayoutProps {
  // Fix: Remove children prop as it's implicitly handled by Outlet for nested routes
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

// Fix: Remove children from destructuring
const Layout: React.FC<LayoutProps> = ({ onToggleDarkMode, isDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode} />
      <main className="flex-grow">
        {/* Fix: Render Outlet to display the matched child route component */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;