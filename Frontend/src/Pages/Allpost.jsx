import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../api/api';
import Container from '../Components/Container/Container';
import PostCard from '../Components/PostCard';

function Allpost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllArticles();
      if (response && response.data) {
        setPosts(response.data);
      } else {
        setError('No posts found');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 animate-pulse">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-700">Loading Articles…</h1>
          <p className="text-gray-500">Please wait while we fetch the latest articles.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <Container>
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center border border-red-200">
            <h2 className="text-2xl font-bold mb-3 text-red-700">Oops!</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Link
              to="/"
              className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition"
            >
              Go Home
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50 border border-gray-200">
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
              to="/add-article"
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
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 ">
      <Container>
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">All Posts</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Browse through the latest articles from our community.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id || post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Allpost;
