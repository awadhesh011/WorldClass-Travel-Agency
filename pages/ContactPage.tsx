
import React, { useState, useContext } from 'react';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { SiteContentContext, AdminSettingsContext } from '../App';
import { ContactInfo } from '../types';
import { HeadProvider} from 'react-head';
import { DEFAULT_SITE_CONTENT } from '../constants'; // Import DEFAULT_SITE_CONTENT

const ContactPage: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  // Fix: Provide a default value from DEFAULT_SITE_CONTENT to ensure contactInfo is always of type ContactInfo
  const contactInfo: ContactInfo = siteContent?.contact || DEFAULT_SITE_CONTENT.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', phone: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HeadProvider>
      <HeadProvider>
        <title>Contact Us | WorldClass Travel Agency</title>
        <meta name="description" content="Get in touch with WorldClass Travel Agency. Send us a message, find our office address, phone number, and email. We're here to help plan your perfect trip." />
        <link rel="canonical" href={`${window.location.origin}/#/contact`} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/#/contact`} />
        <meta property="og:title" content="Contact Us | WorldClass Travel Agency" />
        <meta property="og:description" content="Get in touch with WorldClass Travel Agency. Send us a message, find our office address, phone number, and email. We're here to help plan your perfect trip." />
        <meta property="og:image" content="https://picsum.photos/1200/630?random=contact" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${window.location.origin}/#/contact`} />
        <meta property="twitter:title" content="Contact Us | WorldClass Travel Agency" />
        <meta property="twitter:description" content="Get in touch with WorldClass Travel Agency. Send us a message, find our office address, phone number, and email. We're here to help plan your perfect trip." />
        <meta property="twitter:image" content="https://picsum.photos/1200/630?random=contact" />
      </HeadProvider>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-12">
          Contact <span className="primary-text">Us</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <Input
                id="name"
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                required
              />
              <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                required
              />
              <Input
                id="phone"
                label="Phone (Optional)"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={formErrors.phone}
              />
              <Textarea
                id="message"
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={formErrors.message}
                rows={5}
                required
              />
              <Button type="submit" loading={isSubmitting} className="w-full primary-bg primary-hover-bg mt-4">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              {submitSuccess && (
                <p className="mt-4 text-center text-green-600 dark:text-green-400">
                  Your message has been sent successfully! We'll get back to you soon.
                </p>
              )}
              {submitError && (
                <p className="mt-4 text-center text-red-600 dark:text-red-400">
                  There was an error sending your message. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Contact Info and Map */}
          <div className="flex flex-col gap-8">
            {/* Office Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-3xl font-semibold mb-6">Our Information</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="flex items-center text-lg">
                  <svg className="w-6 h-6 mr-3 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m10.606-10.607l-4.243-4.243m0 0a1.997 1.997 0 012.828 0l4.243 4.243m-4.243 4.243l-4.243-4.243m4.243 4.243z" />
                  </svg>
                  {contactInfo.address}
                </p>
                <p className="flex items-center text-lg">
                  <svg className="w-6 h-6 mr-3 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${contactInfo.phone}`} className="hover:underline">{contactInfo.phone}</a>
                </p>
                <p className="flex items-center text-lg">
                  <svg className="w-6 h-6 mr-3 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 13H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v13a2 2 0 01-2 2z" />
                  </svg>
                  <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <h2 className="text-3xl font-semibold p-6 md:p-8 pb-0">Find Us on the Map</h2>
              {contactInfo.mapEmbedUrl ? (
                <iframe
                  src={contactInfo.mapEmbedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                  className="mt-4"
                ></iframe>
              ) : (
                <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Map Placeholder
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HeadProvider>
  );
};

export default ContactPage;