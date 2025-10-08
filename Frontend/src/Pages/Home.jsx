import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Components/Container/Container';
import PostCard from '../Components/PostCard';
import { getAllArticles } from '../api/api';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredPost, setFeaturedPost] = useState(null);

  const fetcharticle = async () => {
    try {
      setLoading(true);
      const res = await getAllArticles();
      setPosts(res.data);

      // Set the most recent post as featured
      if (res.data && res.data.length > 0) {
        setFeaturedPost(res.data[0]);
      }

      if (!res) {
        setError('No articles found');
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError('SignUp to view articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcharticle();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Loading Articles...</h1>
          <p className="text-gray-600">Fetching the latest content for you</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-50">
        <Container>
          <div className="max-w-lg mx-auto text-center bg-white rounded-3xl shadow-xl p-12 border border-red-100">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{error}</h1>
            <p className="text-gray-600 mb-8">Create an account to explore our collection of articles and start reading.</p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/signup"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Log In
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <Container>
          <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl shadow-xl p-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">No Articles Yet</h1>
            <p className="text-xl text-gray-600 mb-8">Be the first to share your thoughts and create an article!</p>
            <Link
              to="/add-post"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Article
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <Container>
          <div className="relative py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wide">
                  Welcome to Our Blog
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Discover Amazing
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Stories & Ideas
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Explore our curated collection of articles, insights, and perspectives from writers around the world.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link
                  to="/add-article"
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Write an Article
                </Link>
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
                >
                  Explore Articles
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Container>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)" />
          </svg>
        </div>
      </div>

      {/* Featured Article Section */}
      {featuredPost && (
        <Container>
          <div className="py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Article</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>
            </div>

            <Link to={`/article/${featuredPost.slug || featuredPost._id}`} className="block group">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    {featuredPost.image ? (
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full text-sm shadow-lg">
                        ⭐ Featured
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                      {featuredPost.author && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {featuredPost.author.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{featuredPost.author}</span>
                        </div>
                      )}
                      {featuredPost.createdAt && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span>{new Date(featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h3>

                    <p className="text-lg text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {featuredPost.content
                        ? featuredPost.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
                        : 'No content available'}
                    </p>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      Read Full Article
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      )}

      {/* Latest Articles Section */}
      <div className="bg-white py-16">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-gray-600">
              <span className="font-medium">{posts.length} articles</span>
            </div>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.slice(featuredPost ? 1 : 0).map((post) => (
              <PostCard key={post._id || post.$id} {...post} />
            ))}
          </div>

          {/* Load More Section */}
          {posts.length > 12 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2">
                Load More Articles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </Container>
      </div>

      
    </div>
  );
}

export default Home;
