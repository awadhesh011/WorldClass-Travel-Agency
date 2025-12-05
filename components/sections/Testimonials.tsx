
import React, { useContext } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import { Testimonial as TestimonialType } from '../../types';

const Testimonials: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const testimonials: TestimonialType[] = siteContent?.testimonials || [];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our <span className="primary-text">Clients Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-[var(--color-primary-400)] dark:ring-[var(--color-primary-600)]"
              />
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.quote}"
              </p>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {testimonial.author}
              </h4>
              <p className="primary-text text-sm">
                {testimonial.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;