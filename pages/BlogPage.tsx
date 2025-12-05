
import React, { useState, useEffect, useContext } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../App';
import BlogCard from '../components/BlogCard';
import Input from '../components/ui/Input';
import { BlogPost } from '../types';
import { HeadProvider } from 'react-head';
import SkeletonCard from '../components/ui/SkeletonCard';

const BlogPage: React.FC = () => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const allBlogPosts: BlogPost[] = siteContent?.blogPosts || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate loading data
    return () => clearTimeout(timer);
  }, []);

  const uniqueTags = ['All', ...new Set(allBlogPosts.flatMap((post) => post.tags))];

  const filteredPosts = allBlogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <HeadProvider>
      <HeadProvider>
        <title>Blog | WorldClass Travel Agency</title>
        <meta name="description" content="Stay informed and inspired with the latest travel guides, tips, and stories from WorldClass Travel Agency's blog." />
        <link rel="canonical" href={`${window.location.origin}/#/blog`} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/#/blog`} />
        <meta property="og:title" content="Blog | WorldClass Travel Agency" />
        <meta property="og:description" content="Stay informed and inspired with the latest travel guides, tips, and stories from WorldClass Travel Agency's blog." />
        <meta property="og:image" content="https://picsum.photos/1200/630?random=blog" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${window.location.origin}/#/blog`} />
        <meta property="twitter:title" content="Blog | WorldClass Travel Agency" />
        <meta property="twitter:description" content="Stay informed and inspired with the latest travel guides, tips, and stories from WorldClass Travel Agency's blog." />
        <meta property="twitter:image" content="https://picsum.photos/1200/630?random=blog" />
      </HeadProvider>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-12">
          Our Travel <span className="primary-text">Blog</span>
        </h1>

        {/* Filter and Search */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Input
            id="blog-search"
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3"
          />
          <div className="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-2/3">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${selectedTag === tag
                    ? 'primary-bg text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <SkeletonCard count={3} />
          ) : (
            filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <p className="col-span-full text-center text-xl text-gray-600 dark:text-gray-400">
                No blog posts found matching your criteria.
              </p>
            )
          )}
        </div>
      </div>
    </HeadProvider>
  );
};

export default BlogPage;