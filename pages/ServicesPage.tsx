
import React, { useContext, useEffect, useState } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../App';
import { Service as ServiceType } from '../types';
import { HeadProvider } from 'react-head';
import SkeletonCard from '../components/ui/SkeletonCard';

const ServicesPage: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const services: ServiceType[] = siteContent?.services || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate loading data
    return () => clearTimeout(timer);
  }, []);

  return (
    <HeadProvider>
      <HeadProvider>
        <title>Our Services | WorldClass Travel Agency</title>
        <meta name="description" content="Discover the comprehensive travel services offered by WorldClass, including flight and hotel bookings, holiday packages, travel insurance, and custom trip planning." />
        <link rel="canonical" href={`${window.location.origin}/#/services`} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/#/services`} />
        <meta property="og:title" content="Our Services | WorldClass Travel Agency" />
        <meta property="og:description" content="Discover the comprehensive travel services offered by WorldClass, including flight and hotel bookings, holiday packages, travel insurance, and custom trip planning." />
        <meta property="og:image" content="https://picsum.photos/1200/630?random=services" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${window.location.origin}/#/services`} />
        <meta property="twitter:title" content="Our Services | WorldClass Travel Agency" />
        <meta property="twitter:description" content="Discover the comprehensive travel services offered by WorldClass, including flight and hotel bookings, holiday packages, travel insurance, and custom trip planning." />
        <meta property="twitter:image" content="https://picsum.photos/1200/630?random=services" />
      </HeadProvider>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-12">
          Our <span className="primary-text">Services</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <SkeletonCard count={5} />
          ) : (
            services.map((service) => (
              <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </HeadProvider>
  );
};

export default ServicesPage;