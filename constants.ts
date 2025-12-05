
// Default image placeholders
export const DEFAULT_HERO_BG = 'https://picsum.photos/1920/1080?random=1';
export const DEFAULT_DESTINATION_IMAGE = 'https://picsum.photos/800/600?random=2';
export const DEFAULT_AVATAR = 'https://picsum.photos/100/100?random=3';
export const DEFAULT_TEAM_IMAGE = 'https://picsum.photos/300/300?random=4';
export const DEFAULT_BLOG_IMAGE = 'https://picsum.photos/1200/800?random=5';
export const DEFAULT_SERVICE_IMAGE = 'https://picsum.photos/600/400?random=6';
export const DEFAULT_CTA_BG = 'https://picsum.photos/1920/600?random=7';

// Local storage keys
export const LOCAL_STORAGE_SITE_CONTENT_KEY = 'worldclass_site_content';
export const LOCAL_STORAGE_ADMIN_SETTINGS_KEY = 'worldclass_admin_settings';

// Tailwind color palette for dynamic theme generation
export const TAILWIND_COLOR_PALETTE = {
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
    500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
  },
  indigo: {
    50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
    500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81',
  },
  purple: {
    50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
    500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95',
  },
  pink: {
    50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6',
    500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843',
  },
  red: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171',
    500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d',
  },
  orange: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c',
    500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12',
  },
  yellow: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
    500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f',
  },
  green: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efad', 400: '#4ade80',
    500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d',
  },
  teal: {
    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
    500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a',
  },
  cyan: {
    50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee',
    500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63',
  },
  gray: {
    50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
    500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827',
  },
};

// Default values for editable content
export const DEFAULT_SITE_CONTENT = {
  headerLinks: [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' },
  ],
  footerLinks: [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  hero: {
    title: 'Your Journey Begins Here',
    subtitle: 'Explore the world with WorldClass – crafting unforgettable travel experiences tailored just for you.',
    backgroundImage: DEFAULT_HERO_BG,
    searchPlaceholder: 'Search for destinations, trips...',
  },
  featuredDestinations: [
    { id: 'fd-1', name: 'Paris', location: 'France', image: 'https://picsum.photos/800/600?random=10', description: 'The city of love, art, and exquisite cuisine.', price: '$1200' },
    { id: 'fd-2', name: 'Tokyo', location: 'Japan', image: 'https://picsum.photos/800/600?random=11', description: 'A bustling metropolis blending tradition and modernity.', price: '$1800' },
    { id: 'fd-3', name: 'Santorini', location: 'Greece', image: 'https://picsum.photos/800/600?random=12', description: 'Iconic white-washed villages and breathtaking sunsets.', price: '$1500' },
  ],
  whyChooseUs: [
    { icon: '✈️', title: 'Expert Guidance', description: 'Our seasoned travel experts craft personalized itineraries.' },
    { icon: '🏨', title: 'Premium Services', description: 'Access to exclusive deals on flights, hotels, and tours.' },
    { icon: '🌍', title: 'Global Network', description: 'Extensive connections ensures seamless travel worldwide.' },
    { icon: '📞', title: '24/7 Support', description: 'Dedicated support before, during, and after your trip.' },
  ],
  testimonials: [
    { id: 't-1', quote: 'WorldClass made our dream honeymoon to the Maldives a reality. Every detail was perfect!', author: 'Jane & John Doe', location: 'USA', avatar: 'https://picsum.photos/100/100?random=20' },
    { id: 't-2', quote: 'Professional, responsive, and truly understanding of our travel needs. Highly recommend!', author: 'Maria Rodriguez', location: 'Spain', avatar: 'https://picsum.photos/100/100?random=21' },
    { id: 't-3', quote: 'The personalized trip planning exceeded all our expectations. An unforgettable adventure!', author: 'Kenji Tanaka', location: 'Japan', avatar: 'https://picsum.photos/100/100?random=22' },
  ],
  cta: {
    title: 'Ready to Explore?',
    subtitle: 'Unlock exclusive offers and start planning your next adventure today!',
    buttonText: 'Plan My Trip',
    buttonLink: '/contact',
    backgroundImage: DEFAULT_CTA_BG,
  },
  about: {
    companyHistory: 'Founded in 2005, WorldClass started with a simple vision: to make international travel accessible and enjoyable for everyone. Over the years, we\'ve grown into a leading agency, known for our meticulous planning and exceptional customer service.',
    mission: 'Our mission is to inspire and enable memorable global journeys through expert guidance, personalized services, and sustainable travel practices.',
    vision: 'To be the most trusted and innovative international travel agency, recognized for creating unparalleled experiences that connect travelers with the world.',
    teamMembers: [
      { id: 'tm-1', name: 'Alice Johnson', role: 'CEO & Founder', image: 'https://picsum.photos/300/300?random=30', bio: 'Alice founded WorldClass with a passion for exploration and a commitment to service excellence.' },
      { id: 'tm-2', name: 'Bob Williams', role: 'Head of Operations', image: 'https://picsum.photos/300/300?random=31', bio: 'Bob ensures every trip runs smoothly, leveraging years of logistical expertise.' },
      { id: 'tm-3', name: 'Charlie Green', role: 'Lead Travel Consultant', image: 'https://picsum.photos/300/300?random=32', bio: 'Charlie is renowned for crafting unique itineraries and discovering hidden gems.' },
    ],
  },
  destinations: [
    { id: 'd-1', country: 'France', city: 'Paris', image: 'https://picsum.photos/800/600?random=40', description: 'Experience the romance and history of Paris, from the Eiffel Tower to the Louvre.', price: '$1200', category: 'Europe' },
    { id: 'd-2', country: 'Japan', city: 'Tokyo', image: 'https://picsum.photos/800/600?random=41', description: 'Dive into the vibrant culture of Tokyo, a city where ancient traditions meet futuristic innovations.', price: '$1800', category: 'Asia' },
    { id: 'd-3', country: 'Greece', city: 'Santorini', image: 'https://picsum.photos/800/600?random=42', description: 'Witness the iconic sunsets and charming white-washed villages of Santorini.', price: '$1500', category: 'Europe' },
    { id: 'd-4', country: 'Thailand', city: 'Bangkok', image: 'https://picsum.photos/800/600?random=43', description: 'Explore the bustling street markets, magnificent temples, and vibrant nightlife of Bangkok.', price: '$900', category: 'Asia' },
    { id: 'd-5', country: 'Italy', city: 'Rome', image: 'https://picsum.photos/800/600?random=44', description: 'Step back in time in Rome, home to ancient ruins, impressive art, and delicious food.', price: '$1300', category: 'Europe' },
  ],
  services: [
    { id: 's-1', title: 'Flight Bookings', description: 'Seamlessly book flights to any destination worldwide with competitive prices.', image: 'https://picsum.photos/600/400?random=50' },
    { id: 's-2', title: 'Hotel Reservations', description: 'Secure the best accommodations, from budget-friendly stays to luxury resorts.', image: 'https://picsum.photos/600/400?random=51' },
    { id: 's-3', title: 'Holiday Packages', description: 'All-inclusive packages designed for convenience and maximum enjoyment.', image: 'https://picsum.photos/600/400?random=52' },
    { id: 's-4', title: 'Travel Insurance', description: 'Comprehensive travel insurance for peace of mind during your journey.', image: 'https://picsum.photos/600/400?random=53' },
    { id: 's-5', title: 'Custom Trip Planning', description: 'Tailored itineraries to match your unique interests, budget, and travel style.', image: 'https://picsum.photos/600/400?random=54' },
  ],
  blogPosts: [
    {
      id: 'bp-1', slug: 'exploring-the-amazon', title: 'Exploring the Wonders of the Amazon Rainforest', author: 'Travel Guide', date: '2023-04-15', tags: ['Nature', 'Adventure'],
      image: 'https://picsum.photos/1200/800?random=60',
      excerpt: 'Discover the unparalleled biodiversity and breathtaking landscapes of the Amazon rainforest.',
      content: '<p>The Amazon Rainforest, spanning several South American countries, is the largest tropical rainforest in the world and home to an incredible array of wildlife and plant species. A journey here promises adventure, discovery, and an intimate connection with nature.</p><p>From thrilling river cruises to guided jungle treks, visitors can explore diverse ecosystems and spot exotic creatures like jaguars, monkeys, and vibrant macaws. Engaging with indigenous communities also offers a unique insight into their rich cultural heritage and sustainable living practices. It\'s an experience that truly redefines "wildlife."</p>'
    },
    {
      id: 'bp-2', slug: 'culinary-journey-italy', title: 'A Culinary Journey Through Italy: A Food Lover\'s Guide', author: 'Foodie Nomad', date: '2023-03-20', tags: ['Food', 'Culture'],
      image: 'https://picsum.photos/1200/800?random=61',
      excerpt: 'Savor the flavors of Italy with our ultimate guide to its diverse culinary traditions, from pasta to gelato.',
      content: '<p>Italy is a paradise for food lovers, offering a culinary landscape as diverse as its regions. From the rich pasta dishes of Rome to the seafood specialties of Sicily, every corner of the country boasts unique flavors and traditions.</p><p>Indulge in freshly made pasta, authentic Neapolitan pizza, and exquisite wines. Don\'t forget to try regional cheeses, cured meats, and, of course, a scoop (or two!) of artisanal gelato. A food tour through Italy is not just about eating; it\'s about experiencing the heart and soul of its culture.</p>'
    },
    {
      id: 'bp-3', slug: 'hidden-gems-southeast-asia', title: 'Discovering Hidden Gems in Southeast Asia', author: 'Adventure Seeker', date: '2023-02-10', tags: ['Asia', 'Travel Tips'],
      image: 'https://picsum.photos/1200/800?random=62',
      excerpt: 'Beyond the tourist hotspots, Southeast Asia offers serene beaches, ancient temples, and vibrant local life.',
      content: '<p>While popular destinations in Southeast Asia like Bali and Phuket attract millions, there are countless hidden gems waiting to be discovered. Venture off the beaten path to find tranquil islands, untouched beaches, and ancient ruins far from the crowds.</p><p>Explore the lesser-known islands of the Philippines, hike through the pristine jungles of Laos, or immerse yourself in the local life of rural Vietnam. These experiences offer a deeper, more authentic understanding of the region\'s rich history and diverse cultures. Prepare for an adventure of a lifetime!</p>'
    },
  ],
  contact: {
    address: '123 Travel Lane, Wanderlust City, Global',
    phone: '+1 (555) 123-4567',
    email: 'info@worldclass.com',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.253639457884!2d144.963057615317!3d-37.81729097975196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b5a1b3c9b1%3A0x6a090a2a4b8b6a1e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1677636009890!5m2!1sen!2sau', // Example Federation Square
  },
  footerDescription: 'WorldClass is your trusted partner for unforgettable international travel experiences. We meticulously plan every detail so you can focus on making memories.',
  socialMedia: {
    facebook: 'https://www.facebook.com/worldclass-travel',
    instagram: 'https://www.instagram.com/worldclass-travel',
    twitter: 'https://www.twitter.com/worldclass-travel',
    youtube: 'https://www.youtube.com/worldclass-travel',
  },
};

export const DEFAULT_ADMIN_SETTINGS = {
  theme: {
    primaryColor: 'blue',
    accentColor: 'teal',
    textColor: 'gray-900', // This will be dynamic based on dark mode, but we keep it for consistency
    backgroundColor: 'gray-50', // This will be dynamic based on dark mode, but we keep it for consistency
    fontFamilyHeading: "'Playfair Display', serif",
    fontFamilyBody: "'Roboto', sans-serif",
    darkModeEnabled: false,
  },
  analytics: {
    pageViews: {
      '/': 1200,
      '/destinations': 850,
      '/services': 600,
      '/blog': 400,
      '/about': 300,
      '/contact': 250,
    },
    bookings: 75,
    newsletterSignups: 120,
  },
};
