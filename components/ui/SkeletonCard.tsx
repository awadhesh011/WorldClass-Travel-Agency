import React from 'react';

interface SkeletonCardProps {
  count?: number; // Number of skeleton cards to render
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1, className }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`animate-pulse rounded-lg shadow-md overflow-hidden bg-gray-200 dark:bg-gray-700 ${className}`}>
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-600"></div> {/* Image placeholder */}
          <div className="p-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div> {/* Title placeholder */}
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div> {/* Subtitle placeholder */}
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div> {/* Text line 1 */}
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div> {/* Text line 2 */}
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
