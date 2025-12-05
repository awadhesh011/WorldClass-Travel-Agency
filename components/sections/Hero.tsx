
import React, { useContext } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import { HeroSection as HeroSectionType } from '../../types';
import { DEFAULT_SITE_CONTENT } from '../../constants'; // Import DEFAULT_SITE_CONTENT

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  // Fix: Provide a default value from DEFAULT_SITE_CONTENT to ensure heroContent is always of type HeroSectionType
  const heroContent: HeroSectionType = siteContent?.hero || DEFAULT_SITE_CONTENT.hero;

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <section
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroContent.backgroundImage})`,
      }}
      aria-label="Hero section with travel background"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
          {heroContent.title}
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up delay-200">
          {heroContent.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
          <Input
            id="hero-search"
            type="text"
            placeholder={heroContent.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            className="w-full sm:w-80 lg:w-96 p-3 text-lg bg-white bg-opacity-90 border border-gray-300 rounded-md text-gray-800 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
          />
          <Button onClick={handleSearch} className="w-full sm:w-auto primary-bg primary-hover-bg px-6 py-3 text-lg">
            Search Trips
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;