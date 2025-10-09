import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteArticle, getArticleBySlug, createComment, getArticleComments } from '../api/api';
import Container from '../Components/Container/Container';
import Button from '../Components/Button';
import parse from "html-react-parser";

export default function Post() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("user"));
    const isAuthor = post && userData && post.ownerId === userData._id;

    const fetchPost = async () => {
        if (slug) {
            try {
                setLoading(true);
                const response = await getArticleBySlug(slug);

                if (response && response.data) {
                    setPost(response.data);
                } else {
                    navigate("/");
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post');
            } finally {
                setLoading(false);
            }
        } else {
            navigate("/");
        }
    };

    // Fetch comments for this article (simple list of top-level comments)
    const fetchComments = async (articleId) => {
      if (!articleId) return;
      try {
        const res = await getArticleComments(articleId);
        // API may return { items, total } or an array; handle both
        if (res?.data?.items) setComments(res.data.items);
        else if (Array.isArray(res?.data)) setComments(res.data);
        else setComments([]);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    useEffect(() => {
        fetchPost();
    }, [slug, navigate]);

    useEffect(() => {
  if (post?._id) fetchComments(post._id);
    }, [post]);

    const handleAddComment = async () => {
  if (!commentText.trim()) return;
  if (!userData || !userData._id) {
    alert('Please sign in to add a comment.');
    return;
  }
  try {
    await createComment({
      articleId: post._id,
      content: commentText.trim(),
      authorId: userData._id
    });
    setCommentText('');
    fetchComments(post._id);
  } catch (err) {
    console.error('Error creating comment:', err);
    alert('Failed to add comment. Please try again.');
  }
    };
    const deletePost = async () => {
        if (!post || !window.confirm('Are you sure you want to delete this article?')) {
            return;
        }

        try {
            const response = await deleteArticle(post.slug);

            if (response) {
                navigate("/");
            }
        } catch (err) {
            console.error('Error deleting article:', err);
            alert('Failed to delete article. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <h1 className="text-xl font-semibold text-gray-700">Loading article...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
                <Container>
                    <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{error}</h1>
                        <p className="text-gray-600 mb-6">The article you're looking for could not be loaded.</p>
                        <Button onClick={() => navigate("/")} className="w-full">
                            Return to Home
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
            <Container>
                {/* Article Header Section */}
                <div className="max-w-4xl mx-auto">
                    {/* Action Buttons for Author */}
                    {isAuthor && (
                        <div className="flex justify-end gap-3 mb-6">
                            <Link to={`/edit-post/${post.slug}`}>
                                <Button 
                                    bgColor="bg-gradient-to-r from-green-500 to-green-600" 
                                    className="px-6 py-2.5 hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-gradient-to-r from-red-500 to-red-600" 
                                onClick={deletePost}
                                className="px-6 py-2.5 hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </Button>
                        </div>
                    )}

                    {/* Article Card */}
                    <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Featured Image Section */}
                        {post.image && (
                            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                        )}

                        {/* Article Content */}
                        <div className="px-8 md:px-12 py-10">
                            {/* Article Meta Information */}
                            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                                {post.author && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {post.author.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium">{post.author}</span>
                                    </div>
                                )}
                                {post.createdAt && (
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                )}
                                {post.readTime && (
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{post.readTime} min read</span>
                                    </div>
                                )}
                            </div>

                            {/* Article Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                {post.title}
                            </h1>

                            {/* Article Description/Excerpt */}
                            {post.description && (
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-500 pl-6 italic">
                                    {post.description}
                                </p>
                            )}

                            {/* Divider */}
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-10"></div>

                            {/* Article Content */}
                            <div className="prose prose-lg prose-gray max-w-none
                                prose-headings:font-bold prose-headings:text-gray-900
                                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-gray-900 prose-strong:font-semibold
                                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                                prose-li:text-gray-700 prose-li:my-2
                                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                                prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
                                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 
                                prose-code:rounded prose-code:text-sm prose-code:text-blue-600
                                prose-pre:bg-gray-900 prose-pre:text-gray-100
                                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8">
                                {parse(post.content)}
                            </div>
                        </div>

                        {/* Article Footer */}
                        <div className="px-8 md:px-12 py-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, index) => (
                                            <span 
                                                key={index}
                                                className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Share Buttons */}
                                {/* <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600 font-medium">Share:</span>
                                    <button className="p-2 bg-white rounded-full shadow hover:shadow-md transition-all duration-200 hover:scale-110">
                                        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </button>
                                    <button className="p-2 bg-white rounded-full shadow hover:shadow-md transition-all duration-200 hover:scale-110">
                                        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </button>
                                    <button className="p-2 bg-white rounded-full shadow hover:shadow-md transition-all duration-200 hover:scale-110">
                                        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </article>

                    {/* Comments Section */}
                    <div className="mt-8 bg-white rounded-2xl shadow p-6 max-w-4xl mx-auto">
                      <h3 className="text-lg font-semibold mb-4">Comments</h3>

                      {/* Comment form: shown to logged-in users who are NOT the owner */}
                      {userData && post && post.ownerId !== userData._id ? (
                        <div className="mb-4">
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                            rows={3}
                            placeholder="Write a comment..."
                          />
                          <div className="flex justify-end mt-2">
                            <Button onClick={handleAddComment} className="px-4 py-2">
                              Add Comment
                            </Button>
                          </div>
                        </div>
                      ) : userData ? (
                        <p className="text-sm text-gray-600 mb-4">You are the author of this article. Comments by others are shown below.</p>
                      ) : (
                        <p className="text-sm text-gray-600 mb-4">Please <Link to="/login" className="text-blue-600 underline">sign in</Link> to add a comment.</p>
                      )}

                      {/* Comments list */}
                      {comments.length === 0 ? (
                        <p className="text-sm text-gray-500">No comments yet. Be the first to comment.</p>
                      ) : (
                        <ul className="space-y-4">
                          {comments.map((c) => (
                            <li key={c._id || c.id} className="border rounded-md p-3 bg-gray-50">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                                    { (c.authorId?.username ? c.authorId.username.charAt(0) : 'U').toUpperCase() }
                                  </div>
                                  <div className="text-sm font-medium text-gray-700">
                                    {c.authorId?.username || 'User'}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(c.createdAt).toLocaleString()}
                                </div>
                              </div>
                              <div className="text-gray-700 text-sm">{c.content}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-center">
                        <Button 
                            onClick={() => navigate("/")} 
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Articles
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}