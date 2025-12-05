
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SiteContentContext, AdminSettingsContext } from '../App';
import DestinationCard from '../components/DestinationCard';
import { Destination } from '../types';
import Input from '../components/ui/Input';
import { HeadProvider } from 'react-head';
import SkeletonCard from '../components/ui/SkeletonCard';

const DestinationsPage: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const allDestinations: Destination[] = siteContent?.destinations || [];
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Small delay to show skeleton loader
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initialSearch = searchParams.get('search');
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [searchParams]);

  const categories = ['All', ...new Set(allDestinations.map((d) => d.category))];

  const filteredDestinations = allDestinations.filter((destination) => {
    const matchesSearch = destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <HeadProvider>
      <HeadProvider>
        <title>Destinations | WorldClass Travel Agency</title>
        <meta name="description" content="Explore a world of breathtaking destinations with WorldClass. Find your next adventure from our curated list of cities and countries." />
        <link rel="canonical" href={`${window.location.origin}/#/destinations`} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/#/destinations`} />
        <meta property="og:title" content="Destinations | WorldClass Travel Agency" />
        <meta property="og:description" content="Explore a world of breathtaking destinations with WorldClass. Find your next adventure from our curated list of cities and countries." />
        <meta property="og:image" content="https://picsum.photos/1200/630?random=destinations" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${window.location.origin}/#/destinations`} />
        <meta property="twitter:title" content="Destinations | WorldClass Travel Agency" />
        <meta property="twitter:description" content="Explore a world of breathtaking destinations with WorldClass. Find your next adventure from our curated list of cities and countries." />
        <meta property="twitter:image" content="https://picsum.photos/1200/630?random=destinations" />
      </HeadProvider>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-12">
          Explore Our <span className="primary-text">Destinations</span>
        </h1>

        {/* Filter and Search */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Input
            id="destination-search"
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3"
          />
          <div className="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-2/3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${selectedCategory === category
                    ? 'primary-bg text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <SkeletonCard count={6} />
          ) : (
            filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))
            ) : (
              <p className="col-span-full text-center text-xl text-gray-600 dark:text-gray-400">
                No destinations found matching your criteria.
              </p>
            )
          )}
        </div>
      </div>
    </HeadProvider>
  );
};

export default DestinationsPage;