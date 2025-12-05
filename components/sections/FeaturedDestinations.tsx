
import React, { useContext } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import { FeaturedDestination as FeaturedDestinationType } from '../../types';
import { Link } from 'react-router-dom';

const FeaturedDestinations: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const featuredDestinations: FeaturedDestinationType[] = siteContent?.featuredDestinations || [];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured <span className="primary-text">Destinations</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{destination.location}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {destination.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold primary-text">
                    {destination.price}
                  </span>
                  <Link
                    to={`/destinations#${destination.id}`}
                    className="inline-block accent-bg accent-hover-bg text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;