export interface NavLink {
  name: string;
  path: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  backgroundImage: string;
  searchPlaceholder: string;
}

export interface FeaturedDestination {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  price: string;
}

export interface WhyChooseUsItem {
  icon: string; // Placeholder for an icon class or URL
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  avatar: string;
}

export interface CTA {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

export interface AboutContent {
  companyHistory: string;
  mission: string;
  vision: string;
  teamMembers: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Destination {
  id: string;
  country: string;
  city: string;
  image: string;
  description: string;
  price: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string; // URL-friendly string for the post
  author: string;
  date: string; // e.g., "YYYY-MM-DD"
  tags: string[];
  image: string;
  excerpt: string;
  content: string; // Full HTML or Markdown content
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string; // URL for an embedded map
}

export interface SiteContent {
  headerLinks: NavLink[];
  footerLinks: NavLink[];
  hero: HeroSection;
  featuredDestinations: FeaturedDestination[];
  whyChooseUs: WhyChooseUsItem[];
  testimonials: Testimonial[];
  cta: CTA;
  about: AboutContent;
  destinations: Destination[];
  services: Service[];
  blogPosts: BlogPost[];
  contact: ContactInfo;
  footerDescription: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

export interface ThemeSettings {
  primaryColor: string; // Tailwind color class, e.g., 'blue-500'
  accentColor: string; // Tailwind color class
  textColor: string; // Tailwind color class
  backgroundColor: string; // Tailwind color class
  fontFamilyHeading: string; // CSS font-family string
  fontFamilyBody: string; // CSS font-family string
  darkModeEnabled: boolean;
}

export interface AnalyticsData {
  pageViews: { [key: string]: number };
  bookings: number;
  newsletterSignups: number;
}

export interface AdminSettings {
  theme: ThemeSettings;
  analytics: AnalyticsData;
}

// For Gemini API integration
export interface GenerateContentPayload {
  prompt: string;
  model: string;
  maxOutputTokens?: number;
}
