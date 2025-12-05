
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { AdminSettingsContext } from '../App';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { adminSettings } = useContext(AdminSettingsContext);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-400)] transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          By <span className="font-medium primary-text">{post.author}</span> on {new Date(post.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-block primary-text hover:underline font-medium"
        >
          Read More &rarr;
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;