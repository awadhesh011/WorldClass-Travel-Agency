
import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DestinationsPage from './pages/DestinationsPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { SiteContent, AdminSettings } from './types';
import { DEFAULT_SITE_CONTENT, DEFAULT_ADMIN_SETTINGS, LOCAL_STORAGE_SITE_CONTENT_KEY, LOCAL_STORAGE_ADMIN_SETTINGS_KEY, TAILWIND_COLOR_PALETTE } from './constants';
import { HeadProvider } from 'react-head';

// Context for site content
export const SiteContentContext = createContext<{
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
}>({
  siteContent: DEFAULT_SITE_CONTENT,
  setSiteContent: () => {},
});

// Context for admin settings (theme, etc.)
export const AdminSettingsContext = createContext<{
  adminSettings: AdminSettings;
  setAdminSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
}>({
  adminSettings: DEFAULT_ADMIN_SETTINGS,
  setAdminSettings: () => {},
});

const App: React.FC = () => {
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_SITE_CONTENT_KEY);
    return savedContent ? JSON.parse(savedContent) : DEFAULT_SITE_CONTENT;
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    const savedSettings = localStorage.getItem(LOCAL_STORAGE_ADMIN_SETTINGS_KEY);
    const initialSettings = savedSettings ? JSON.parse(savedSettings) : DEFAULT_ADMIN_SETTINGS;
    // Ensure darkModeEnabled is boolean
    if (typeof initialSettings.theme.darkModeEnabled !== 'boolean') {
      initialSettings.theme.darkModeEnabled = DEFAULT_ADMIN_SETTINGS.theme.darkModeEnabled;
    }
    return initialSettings;
  });

  const [isDarkMode, setIsDarkMode] = useState(adminSettings.theme.darkModeEnabled);

  // Helper function to get Tailwind hex color
  const getTailwindHex = (colorName: string, shade: number): string => {
    // Fallback to a default color if not found
    return (TAILWIND_COLOR_PALETTE as any)[colorName]?.[shade] || '#000000';
  };

  // Effect to sync siteContent to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SITE_CONTENT_KEY, JSON.stringify(siteContent));
  }, [siteContent]);

  // Effect to sync adminSettings to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ADMIN_SETTINGS_KEY, JSON.stringify(adminSettings));
    setIsDarkMode(adminSettings.theme.darkModeEnabled); // Update dark mode state from settings
  }, [adminSettings]);

  // Effect to apply dark mode class to HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Function to save site content from admin dashboard
  const handleSaveSiteContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
    alert('Site content updated successfully!');
  };

  // Function to save admin settings from admin dashboard
  const handleSaveAdminSettings = (newSettings: AdminSettings) => {
    setAdminSettings(newSettings);
  };

  // Function to toggle dark mode
  const handleToggleDarkMode = () => {
    setAdminSettings((prevSettings) => {
      const updatedTheme = { ...prevSettings.theme, darkModeEnabled: !prevSettings.theme.darkModeEnabled };
      return { ...prevSettings, theme: updatedTheme };
    });
  };

  const primaryColor = adminSettings.theme.primaryColor;
  const accentColor = adminSettings.theme.accentColor;

  return (
    <HeadProvider>
      <SiteContentContext.Provider value={{ siteContent, setSiteContent }}>
        <AdminSettingsContext.Provider value={{ adminSettings, setAdminSettings }}>
          <style>
            {`
            :root {
              /* Dynamic Primary Colors */
              --color-primary-50: ${getTailwindHex(primaryColor, 50)};
              --color-primary-100: ${getTailwindHex(primaryColor, 100)};
              --color-primary-200: ${getTailwindHex(primaryColor, 200)};
              --color-primary-300: ${getTailwindHex(primaryColor, 300)};
              --color-primary-400: ${getTailwindHex(primaryColor, 400)};
              --color-primary-500: ${getTailwindHex(primaryColor, 500)};
              --color-primary-600: ${getTailwindHex(primaryColor, 600)};
              --color-primary-700: ${getTailwindHex(primaryColor, 700)};
              --color-primary-800: ${getTailwindHex(primaryColor, 800)};
              --color-primary-900: ${getTailwindHex(primaryColor, 900)};

              /* Dynamic Accent Colors */
              --color-accent-50: ${getTailwindHex(accentColor, 50)};
              --color-accent-100: ${getTailwindHex(accentColor, 100)};
              --color-accent-200: ${getTailwindHex(accentColor, 200)};
              --color-accent-300: ${getTailwindHex(accentColor, 300)};
              --color-accent-400: ${getTailwindHex(accentColor, 400)};
              --color-accent-500: ${getTailwindHex(accentColor, 500)};
              --color-accent-600: ${getTailwindHex(accentColor, 600)};
              --color-accent-700: ${getTailwindHex(accentColor, 700)};
              --color-accent-800: ${getTailwindHex(accentColor, 800)};
              --color-accent-900: ${getTailwindHex(accentColor, 900)};

              /* Default Gray/White Colors (for universal elements) */
              --color-gray-50: ${getTailwindHex('gray', 50)};
              --color-gray-100: ${getTailwindHex('gray', 100)};
              --color-gray-200: ${getTailwindHex('gray', 200)};
              --color-gray-300: ${getTailwindHex('gray', 300)};
              --color-gray-400: ${getTailwindHex('gray', 400)};
              --color-gray-500: ${getTailwindHex('gray', 500)};
              --color-gray-600: ${getTailwindHex('gray', 600)};
              --color-gray-700: ${getTailwindHex('gray', 700)};
              --color-gray-800: ${getTailwindHex('gray', 800)};
              --color-gray-900: ${getTailwindHex('gray', 900)};
              --color-white: #ffffff;
              --color-black: #000000;

              /* Red for delete actions/errors */
              --color-red-50: ${getTailwindHex('red', 50)};
              --color-red-400: ${getTailwindHex('red', 400)};
              --color-red-500: ${getTailwindHex('red', 500)};
              --color-red-600: ${getTailwindHex('red', 600)};

              /* Green for success messages */
              --color-green-400: ${getTailwindHex('green', 400)};
              --color-green-600: ${getTailwindHex('green', 600)};

              /* Global Text and Background defaults */
              --color-text-default: var(--color-gray-900);
              --color-bg-default: var(--color-gray-50);
            }

            .dark {
              --color-text-default: var(--color-gray-100);
              --color-bg-default: var(--color-gray-900);
            }

            /* Font Families */
            body {
              font-family: ${adminSettings.theme.fontFamilyBody};
              background-color: var(--color-bg-default);
              color: var(--color-text-default);
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: ${adminSettings.theme.fontFamilyHeading};
            }

            /* Custom Utility Classes using CSS Variables */
            .primary-bg { background-color: var(--color-primary-600); }
            .primary-hover-bg:hover { background-color: var(--color-primary-700); }
            .primary-text { color: var(--color-primary-600); }
            .primary-border { border-color: var(--color-primary-600); }
            .primary-text-checkbox:checked { color: var(--color-primary-600); } /* for admin settings checkbox */
            .primary-text-dark { color: var(--color-primary-400); } /* used for dark mode primary text */
            .primary-border-dark { border-color: var(--color-primary-400); } /* used for dark mode primary border */

            .accent-bg { background-color: var(--color-accent-600); }
            .accent-hover-bg:hover { background-color: var(--color-accent-700); }
            .accent-text { color: var(--color-accent-600); }
            .accent-text-dark { color: var(--color-accent-400); } /* used for dark mode accent text */

            /* Specific classes for delete buttons */
            .red-border { border-color: var(--color-red-500); }
            .red-text { color: var(--color-red-500); }
            .dark .red-border-dark { border-color: var(--color-red-400); }
            .dark .red-text-dark { color: var(--color-red-400); }
            `}
          </style>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout onToggleDarkMode={handleToggleDarkMode} isDarkMode={isDarkMode} />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="destinations" element={<DestinationsPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>
              <Route path="/admin/*" element={
                <AdminDashboardPage
                  onSaveSiteContent={handleSaveSiteContent}
                  onSaveAdminSettings={handleSaveAdminSettings}
                  onToggleDarkMode={handleToggleDarkMode}
                  isDarkMode={isDarkMode}
                />
              } />
            </Routes>
          </HashRouter>
        </AdminSettingsContext.Provider>
      </SiteContentContext.Provider>
    </HeadProvider>
  );
};

export default App;