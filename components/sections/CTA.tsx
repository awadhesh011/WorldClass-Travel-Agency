
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import { CTA as CTAType } from '../../types';
import { DEFAULT_SITE_CONTENT } from '../../constants'; // Import DEFAULT_SITE_CONTENT

const CTA: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  // Fix: Provide a default value from DEFAULT_SITE_CONTENT to ensure ctaContent is always of type CTAType
  const ctaContent: CTAType = siteContent?.cta || DEFAULT_SITE_CONTENT.cta;

  const ctaStyles = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${ctaContent.backgroundImage})`,
  };

  return (
    <section
      className="relative py-20 bg-cover bg-center text-white flex items-center justify-center text-center"
      style={ctaStyles}
      aria-label="Call to action section"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          {ctaContent.title}
        </h2>
        <p className="text-lg md:text-xl mb-8">
          {ctaContent.subtitle}
        </p>
        <Link to={ctaContent.buttonLink}>
          <Button variant="primary" size="lg" className="primary-bg primary-hover-bg">
            {ctaContent.buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;