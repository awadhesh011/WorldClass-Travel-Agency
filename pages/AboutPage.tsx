
import React, { useContext } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../App';
import { AboutContent as AboutContentType, TeamMember } from '../types';
import { HeadProvider } from 'react-head';
import { DEFAULT_SITE_CONTENT } from '../constants'; // Import DEFAULT_SITE_CONTENT

const AboutPage: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  // Fix: Provide a default value from DEFAULT_SITE_CONTENT to ensure aboutContent is always of type AboutContentType
  const aboutContent: AboutContentType = siteContent?.about || DEFAULT_SITE_CONTENT.about;

  return (
    <HeadProvider>
      <HeadProvider>
        <title>About Us | WorldClass Travel Agency</title>
        <meta name="description" content="Learn about WorldClass Travel Agency's history, mission, vision, and meet our dedicated team. We are committed to crafting unforgettable travel experiences." />
        <link rel="canonical" href={`${window.location.origin}/#/about`} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/#/about`} />
        <meta property="og:title" content="About Us | WorldClass Travel Agency" />
        <meta property="og:description" content="Learn about WorldClass Travel Agency's history, mission, vision, and meet our dedicated team. We are committed to crafting unforgettable travel experiences." />
        <meta property="og:image" content="https://picsum.photos/1200/630?random=about" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${window.location.origin}/#/about`} />
        <meta property="twitter:title" content="About Us | WorldClass Travel Agency" />
        <meta property="twitter:description" content="Learn about WorldClass Travel Agency's history, mission, vision, and meet our dedicated team. We are committed to crafting unforgettable travel experiences." />
        <meta property="twitter:image" content="https://picsum.photos/1200/630?random=about" />
      </HeadProvider>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-12">
          About <span className="primary-text">WorldClass</span>
        </h1>

        {/* Company History */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6 text-center">Our Story</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center text-gray-700 dark:text-gray-300">
            {aboutContent.companyHistory}
          </p>
        </section>

        {/* Mission and Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold mb-4 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]">Our Mission</h3>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {aboutContent.mission}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold mb-4 text-[var(--color-accent-600)] dark:text-[var(--color-accent-400)]">Our Vision</h3>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {aboutContent.vision}
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-4xl font-semibold mb-12 text-center">Meet Our <span className="primary-text">Team</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutContent.teamMembers.map((member: TeamMember) => (
              <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 ring-2 ring-[var(--color-primary-400)] dark:ring-[var(--color-primary-600)]"
                  loading="lazy"
                />
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </HeadProvider>
  );
};

export default AboutPage;