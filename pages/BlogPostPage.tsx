
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiteContentContext, AdminSettingsContext } from '../App';
import { BlogPost } from '../types';
import { HeadProvider } from 'react-head';
import SkeletonCard from '../components/ui/SkeletonCard';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundPost = siteContent.blogPosts.find((p) => p.slug === slug);
    const timer = setTimeout(() => {
      setPost(foundPost);
      setLoading(false);
    }, 500); // Simulate loading
    return () => clearTimeout(timer);
  }, [slug, siteContent.blogPosts]);

  return (
    <HeadProvider>
      <HeadProvider>
        <title>{post?.title} | WorldClass Blog</title>
        <meta name="description" content={post?.excerpt} />
        <link rel="canonical" href={`${window.location.origin}/#/blog/${post?.slug}`} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${window.location.origin}/#/blog/${post?.slug}`} />
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.excerpt} />
        <meta property="og:image" content={post?.image} />
        <meta property="article:author" content={post?.author} />
        <meta property="article:published_time" content={new Date(post?.date || '').toISOString()} />
        {post?.tags.map(tag => <meta property="article:tag" content={tag} key={tag} />)}
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${window.location.origin}/#/blog/${post?.slug}`} />
        <meta property="twitter:title" content={post?.title} />
        <meta property="twitter:description" content={post?.excerpt} />
        <meta property="twitter:image" content={post?.image} />

        {/* Schema Markup for Article */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post?.title?.replace(/"/g, '\\"') || ''}",
            "image": "${post?.image || ''}",
            "datePublished": "${post?.date || ''}",
            "author": {
              "@type": "Person",
              "name": "${post?.author?.replace(/"/g, '\\"') || ''}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "WorldClass Travel Agency",
              "logo": {
                "@type": "ImageObject",
                "url": "https://picsum.photos/200/200?random=logo"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${window.location.origin}/#/blog/${post?.slug || ''}"
            },
            "description": "${post?.excerpt?.replace(/"/g, '\\"') || ''}"
          }
        `}</script>
      </HeadProvider>

      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-lg mb-8"
            loading="lazy"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex items-center space-x-4">
            <span>By <span className="font-medium">{post.author}</span></span>
            <span>&bull;</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-900)] text-[var(--color-primary-800)] dark:text-[var(--color-primary-200)] text-xs rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div
            className="prose dark:prose-invert max-w-none prose-lg text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <Link to="/blog" className="inline-flex items-center primary-text hover:underline font-medium text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all blog posts
            </Link>
          </div>
        </article>
      </div>
    </HeadProvider>
  );
};

export default BlogPostPage;