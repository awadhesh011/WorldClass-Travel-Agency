
import React, { useState, useEffect, useContext } from 'react';
import { AdminSettingsContext } from '../../App';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { AdminSettings, ThemeSettings } from '../../types';

interface SettingsProps {
  onSave: (settings: AdminSettings) => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Settings: React.FC<SettingsProps> = ({ onSave, onToggleDarkMode, isDarkMode }) => {
  const { adminSettings } = useContext(AdminSettingsContext);
  const [editableTheme, setEditableTheme] = useState<ThemeSettings>(adminSettings.theme);

  useEffect(() => {
    setEditableTheme(adminSettings.theme);
  }, [adminSettings.theme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setEditableTheme((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...adminSettings, theme: editableTheme });
    alert('Theme settings saved! Please note some changes might require a full refresh to apply completely.');
  };

  const colorOptions = [
    'blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan',
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6">Website Settings</h3>
      <form onSubmit={handleSubmit}>
        <section className="mb-8 border-b pb-6 border-gray-200 dark:border-gray-700">
          <h4 className="text-xl font-semibold mb-4">Theme & Appearance</h4>

          {/* Primary Color */}
          <div className="mb-4">
            <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Primary Color
            </label>
            <select
              id="primaryColor"
              name="primaryColor"
              value={editableTheme.primaryColor}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100"
            >
              {colorOptions.map((color) => (
                <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Accent Color */}
          <div className="mb-4">
            <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Accent Color
            </label>
            <select
              id="accentColor"
              name="accentColor"
              value={editableTheme.accentColor}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100"
            >
              {colorOptions.map((color) => (
                <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
              ))}
            </select>
          </div>

          <Input
            id="fontFamilyHeading"
            label="Heading Font Family (CSS value)"
            name="fontFamilyHeading"
            value={editableTheme.fontFamilyHeading}
            onChange={handleChange}
            placeholder="'Playfair Display', serif"
          />
          <Input
            id="fontFamilyBody"
            label="Body Font Family (CSS value)"
            name="fontFamilyBody"
            value={editableTheme.fontFamilyBody}
            onChange={handleChange}
            placeholder="'Roboto', sans-serif"
          />

          {/* Dark Mode Toggle */}
          <div className="flex items-center mt-6">
            <input
              id="darkModeEnabled"
              name="darkModeEnabled"
              type="checkbox"
              checked={editableTheme.darkModeEnabled}
              onChange={(e) => {
                handleChange(e);
                onToggleDarkMode(); // Also trigger actual dark mode switch
              }}
              className="h-4 w-4 primary-text-checkbox border-gray-300 rounded focus:ring-[var(--color-primary-500)]"
            />
            <label htmlFor="darkModeEnabled" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enable Dark Mode
            </label>
          </div>
        </section>

        <Button type="submit" className="primary-bg primary-hover-bg">
          Save Theme Settings
        </Button>
      </form>
    </div>
  );
};

export default Settings;