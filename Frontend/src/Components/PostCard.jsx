
import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ _id, slug, title, content, image, createdAt, ownerId }) {

  const linkPath = slug ? `/post/${slug}` : `/post/${_id}`;
  
  const truncatedContent = content 
    ? content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
    : 'No content available';

  return (
    <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow">
    
      {image && (
        <div className="w-full justify-center mb-4">
          <img 
            src={image} 
            alt={title || 'Article image'} 
            className="rounded-xl w-full h-48 object-cover"
            onError={(e) => {
              // ✅ ADDED: Handle image loading errors
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
          {title || 'Untitled'}
        </h2>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {truncatedContent}
        </p>
        
        {/* ✅ ADDED: Show publication date */}
        {createdAt && (
          <p className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        )}
        
        {/* ✅ FIXED: Proper navigation link */}
        <Link
          to={linkPath}
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
