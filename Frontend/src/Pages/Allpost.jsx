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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-purple-100">
        <Container>
          <div className="max-w-xl mx-auto bg-white p-12 rounded-3xl shadow-xl text-center">
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">
              No posts available yet.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Check back later or be the first to create a Article!
            </p>
            <Link
              to="/add-article"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              Create Post
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
