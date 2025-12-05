
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Footer: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = siteContent?.footerLinks || [];
  // Fix: Initialize socialMedia with default values to prevent TypeScript errors
  const socialMedia = siteContent?.socialMedia || {
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
  };
  const footerDescription = siteContent?.footerDescription || '';

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      // In a real app, this would send data to a backend
    }
  };

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 dark:text-gray-400 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: About Us */}
        <div>
          <h3 className="text-xl font-bold text-white dark:text-gray-100 mb-4">WorldClass</h3>
          <p className="text-sm leading-relaxed">
            {footerDescription}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-accent-400)] transition-colors text-sm">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socialMedia.facebook && (
              <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-accent-400)] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.27 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            )}
            {socialMedia.instagram && (
              <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-accent-400)] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.716 0 3.058.01 4.122.06c1.066.05 1.791.217 2.427.465.66.254 1.217.65 1.77 1.203s.949 1.11 1.203 1.77c.248.636.415 1.361.465 2.427.05 1.064.06 1.407.06 4.122s-.01 3.058-.06 4.122c-.05 1.066-.217 1.791-.465 2.427-.254.66-.65 1.217-1.203 1.77s-1.11.949-1.77 1.203c-.636.248-1.361.415-2.427.465-1.064.05-1.407.06-4.122.06s-3.058-.01-4.122-.06c-1.066-.05-1.791-.217-2.427-.465-.66-.254-1.217-.65-1.77-1.203s-.949-1.11-1.203-1.77c-.248-.636-.415-1.361-.465-2.427-.05-1.064-.06-1.407-.06-4.122s.01-3.058.06-4.122c.05-1.066.217-1.791.465-2.427.254-.66.65-1.217 1.203-1.77s1.11-.949 1.77-1.203c.636-.248 1.361-.415 2.427-.465C8.942 2.01 9.284 2 12 2zm0-2c-2.784 0-3.139.011-4.232.06c-1.1.049-1.839.222-2.488.472-.659.257-1.213.665-1.767 1.218s-.96 1.108-1.218 1.767c-.25.649-.423 1.388-.472 2.488C.011 8.861 0 9.216 0 12s.011 3.139.06 4.232c.049 1.1.222 1.839.472 2.488.257.659.665 1.213 1.218 1.767s1.108.96 1.767 1.218c.649.25 1.388.423 2.488.472C8.861 23.989 9.216 24 12 24s3.139-.011 4.232-.06c1.1-.049 1.839-.222 2.488-.472.659-.257 1.213-.665 1.767-1.218s.96-1.108 1.218-1.767c.25-.649.423-1.388.472-2.488C23.989 15.139 24 14.784 24 12s-.011-3.139-.06-4.232c-.049-1.1-.222-1.839-.472-2.488-.257-.659-.665-1.213-1.218-1.767S20.887.66 20.228.403C19.579.153 18.84.06 17.748.011 16.656 0 16.301 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 2c3.088 0 4.155 1.272 4.155 4.155s-1.067 4.155-4.155 4.155-4.155-1.272-4.155-4.155 1.067-4.155 4.155-4.155zm6.816-.948a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                </svg>
              </a>
            )}
            {socialMedia.twitter && (
              <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-accent-400)] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.593 0-6.492 2.901-6.492 6.492 0 .509.058 1.007.161 1.485-5.392-.27-10.197-2.868-13.407-6.791-.555.952-.876 2.066-.876 3.242 0 2.247 1.139 4.225 2.873 5.391-.27.008-.528-.083-.796-.205v.08c0 3.154 2.238 5.767 5.196 6.368-.52.135-1.062.204-1.62.204-.397 0-.786-.039-1.166-.113.83 2.572 3.223 4.437 6.077 4.48-.119.094-.224.192-.33.297-2.91 2.91-5.786 3.39-8.494 3.39-.464 0-.915-.027-1.346-.079C.115 22.812 3.12 24 6.425 24c7.696 0 11.91-6.375 11.91-11.91v-.53c.822-.596 1.543-1.336 2.112-2.176z" />
                </svg>
              </a>
            )}
            {socialMedia.youtube && (
              <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-accent-400)] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.273 17.514c-.114.39-.41.657-.757.772-2.114.735-4.228.735-6.342.735-2.114 0-4.228 0-6.342-.735-.347-.114-.643-.382-.757-.772-.456-1.577-.456-3.155-.456-4.733s0-3.155.456-4.733c.114-.39.41-.657.757-.772 2.114-.735 4.228-.735 6.342-.735 2.114 0 4.228 0 6.342.735.347.114.643.382.757.772.456 1.577.456 3.155.456 4.733s0 3.155-.456 4.733zM10.156 8.324l3.87 2.128-3.87 2.128v-4.256z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Newsletter</h3>
          <p className="text-sm mb-4">Stay updated with our latest offers and travel tips!</p>
          {!subscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button type="submit" className="w-full primary-bg primary-hover-bg">
                Subscribe
              </Button>
            </form>
          ) : (
            <p className="text-sm text-green-400">Thank you for subscribing!</p>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 dark:border-gray-700 mt-8 pt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} WorldClass. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;