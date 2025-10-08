import { Link } from 'react-router-dom';

function PostCard({ _id, slug, title, content, image, createdAt, ownerId, author, tags, readTime }) {
  const linkPath = slug ? `/article/${slug}` : `/article/${_id}`;
  
  const truncatedContent = content 
    ? content.replace(/<[^>]*>/g, '')
    : 'No content available';

  // Calculate reading time if not provided
  const estimatedReadTime = readTime || Math.ceil(content?.replace(/<[^>]*>/g, '').split(' ').length / 200) || 5;

  return (
    <Link to={linkPath} className="block group">
      <article className="h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col">
        {/* Image Section with Gradient Overlay */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0">
          {image ? (
            <>
              <img 
                src={image} 
                alt={title || 'Article image'} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            // Fallback gradient background with icon
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
          
          {/* Hover Gradient Line Effect */}
          <div className="absolute -top-[2px] left-[65%] h-[2px] w-[200px] bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover:left-[30%] group-hover:opacity-100 transition-all duration-500"></div>
          
          {/* Reading Time Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1 shadow-lg">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {estimatedReadTime} min
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4 flex flex-col flex-1">
          {/* Wrap the variable content in a flex-1 container so all cards align */}
          <div className="flex-1">
            {/* Meta Information */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              {/* Author Info */}
              {author && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {author.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{author}</span>
                </div>
              )}
              
              {/* Publication Date */}
              {createdAt && (
                <div className="flex items-center gap-1 text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200 mt-3">
              {title || 'Untitled Article'}
            </h2>

            {/* Content Preview */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mt-3">
              {truncatedContent}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Read More Button & Bookmark - keep fixed at bottom */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
              Read Article
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            
            
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </article>
    </Link>
  );
}

export default PostCard;
