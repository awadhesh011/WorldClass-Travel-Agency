import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import FeaturedDestinations from '../components/sections/FeaturedDestinations';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import { HeadProvider } from 'react-head';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // Navigate to destinations page with search query
    navigate(`/destinations?search=${encodeURIComponent(query)}`);
  };

  return (
    <HeadProvider>
      <HeadProvider>
        <title>WorldClass - International Travel Agency | Your Journey Begins Here</title>
        <meta name="description" content="Explore the world with WorldClass, your premier international travel agency. Discover featured destinations, personalized services, and unforgettable travel experiences." />
        <link rel="canonical" href={window.location.origin} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:title" content="WorldClass - International Travel Agency | Your Journey Begins Here" />
        <meta property="og:description" content="Explore the world with WorldClass, your premier international travel agency. Discover featured destinations, personalized services, and unforgettable travel experiences." />
        <meta property="og:image" content="https://picsum.photos/1200/630?random=hero" /> {/* Placeholder image */}
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.origin} />
        <meta property="twitter:title" content="WorldClass - International Travel Agency | Your Journey Begins Here" />
        <meta property="twitter:description" content="Explore the world with WorldClass, your premier international travel agency. Discover featured destinations, personalized services, and unforgettable travel experiences." />
        <meta property="twitter:image" content="https://picsum.photos/1200/630?random=hero" /> {/* Placeholder image */}

        {/* Schema Markup (Example for Organization) */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "WorldClass - International Travel Agency",
            "url": "${window.location.origin}",
            "logo": "https://picsum.photos/200/200?random=logo",
            "description": "A premier international travel agency offering bespoke flight bookings, luxury hotels, comprehensive holiday packages, and personalized trip planning services.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Travel Lane",
              "addressLocality": "Wanderlust City",
              "addressCountry": "Global"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-123-4567",
              "contactType": "Customer Service"
            }
          }
        `}</script>
      </HeadProvider>

      <Hero onSearch={handleSearch} />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </HeadProvider>
  );
};

export default HomePage;
