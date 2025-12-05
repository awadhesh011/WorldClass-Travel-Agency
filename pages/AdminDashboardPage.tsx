
import React, { useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminLayout from '../components/AdminDashboard/AdminLayout';
import ContentEditor from '../components/AdminDashboard/ContentEditor';
import DestinationManager from '../components/AdminDashboard/DestinationManager';
import BlogManager from '../components/AdminDashboard/BlogManager';
import Settings from '../components/AdminDashboard/Settings';
import AnalyticsSection from '../components/AdminDashboard/AnalyticsSection';
import { SiteContentContext, AdminSettingsContext } from '../App';
import { SiteContent, AdminSettings } from '../types';
import { HeadProvider } from 'react-head';

interface AdminDashboardPageProps {
  onSaveSiteContent: (content: SiteContent) => void;
  onSaveAdminSettings: (settings: AdminSettings) => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onSaveSiteContent,
  onSaveAdminSettings,
  onToggleDarkMode,
  isDarkMode,
}) => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const location = useLocation();

  const AdminOverview: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <HeadProvider>
        <HeadProvider>
          <title>Admin Dashboard | WorldClass</title>
          <meta name="description" content="Manage your WorldClass travel agency website content, destinations, blog posts, and settings from the admin dashboard." />
          <link rel="canonical" href={`${window.location.origin}/#/admin`} />
        </HeadProvider>
      </HeadProvider>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-4">Content Overview</h3>
        <p className="text-gray-700 dark:text-gray-300">Quickly edit your site's static text, images, and navigation.</p>
        <Link to="/admin/content" className="mt-4 inline-block primary-text hover:underline">
          Go to Content Editor &rarr;
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-4">Manage Destinations</h3>
        <p className="text-gray-700 dark:text-gray-300">Add, edit, or delete travel destinations, with AI assist.</p>
        <Link to="/admin/destinations" className="mt-4 inline-block primary-text hover:underline">
          Manage Destinations &rarr;
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-4">Manage Blog Posts</h3>
        <p className="text-gray-700 dark:text-gray-300">Create, edit, and publish blog posts, with AI writing tools.</p>
        <Link to="/admin/blog" className="mt-4 inline-block primary-text hover:underline">
          Manage Blog Posts &rarr;
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-4">Website Settings</h3>
        <p className="text-gray-700 dark:text-gray-300">Customize theme, colors, fonts, and dark mode.</p>
        <Link to="/admin/settings" className="mt-4 inline-block primary-text hover:underline">
          Adjust Settings &rarr;
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-4">View Analytics</h3>
        <p className="text-gray-700 dark:text-gray-300">See basic website performance metrics.</p>
        <Link to="/admin/analytics" className="mt-4 inline-block primary-text hover:underline">
          View Analytics &rarr;
        </Link>
      </div>
    </div>
  );

  return (
    <AdminLayout onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode}>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/content" element={<ContentEditor onSave={onSaveSiteContent} />} />
        <Route path="/destinations" element={<DestinationManager onSave={onSaveSiteContent} />} />
        <Route path="/blog" element={<BlogManager onSave={onSaveSiteContent} />} />
        <Route path="/settings" element={<Settings onSave={onSaveAdminSettings} onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/analytics" element={<AnalyticsSection />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboardPage;