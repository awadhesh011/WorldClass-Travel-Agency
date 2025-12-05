
import React, { useContext } from 'react';
import { AdminSettingsContext } from '../../App';
import { AnalyticsData } from '../../types';

const AnalyticsSection: React.FC = () => {
  const { adminSettings } = useContext(AdminSettingsContext);
  const analytics: AnalyticsData = adminSettings.analytics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-3">Total Page Views</h3>
        <p className="text-5xl font-bold primary-text">
          {Object.values(analytics.pageViews).reduce((sum, current) => sum + current, 0).toLocaleString()}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-3">Total Bookings</h3>
        <p className="text-5xl font-bold primary-text">
          {analytics.bookings.toLocaleString()}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-3">Newsletter Signups</h3>
        <p className="text-5xl font-bold primary-text">
          {analytics.newsletterSignups.toLocaleString()}
        </p>
      </div>

      <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Page Views by Path</h3>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Page Path
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Views
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(analytics.pageViews).map(([path, views]) => (
              <tr key={path}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {path}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {views.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsSection;