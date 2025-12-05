
import React, { useContext } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import { WhyChooseUsItem as WhyChooseUsItemType } from '../../types';

const WhyChooseUs: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const whyChooseUsItems: WhyChooseUsItemType[] = siteContent?.whyChooseUs || [];

  return (
    <section className="py-16 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why <span className="primary-text">Choose Us?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUsItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-50 dark:bg-gray-700"
            >
              <div className="text-5xl mb-4 primary-text">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;