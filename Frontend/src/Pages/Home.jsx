import React, { useEffect, useState } from 'react'
import service from "../api/posts";
import  Container from '../Components/Container/Container'
import  PostCard  from '../Components/PostCard';  
import { useSelector } from 'react-redux'; // Import useSelector to check auth status

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status); // Get auth status from Redux store

    useEffect(() => {
        // Fetch all posts without any query filter
        service.getPosts({ status: "active" }).then((posts) => {
            console.log("Fetched posts (no filter):", posts); // Debug line
            if (posts && posts.documents) {
                setPosts(posts.documents);
            } else {
                console.log("No posts found or error fetching posts.");
            }
        });
    }, []);

    // If no posts are available, display the introductory message
    if (posts.length === 0) {
        return (
            <div className="w-full py-10 bg-gray-400 min-h-[500px] flex items-center justify-center"> {/* Added bg-gray-100 for a distinct background, min-h and flex for centering */}
                <Container>
                    <div className="flex flex-wrap -mx-4"> {/* Added -mx-4 for consistent spacing */}
                        <div className="w-full px-4">
                            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 leading-tight"> {/* Enhanced heading */}
                                Welcome to Article Block!
                            </h1>
                            <p className="text-lg text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                                **Share Your Thoughts, Publish Boldly.**
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center mt-12"> {/* Responsive grid for features */}
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Seamless Article Uploads</h3>
                                    <p className="text-gray-600">Easily upload your articles with accompanying images and detailed information.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Powerful Rich Text Editor</h3>
                                    <p className="text-gray-600">Craft your content with our integrated **TinyMCE editor**, offering a rich and intuitive writing experience.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure User Authentication</h3>
                                    <p className="text-gray-600">Your content is safe with our robust authentication system. Share your thinking securely.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Exclusive Editing Privileges</h3>
                                    <p className="text-gray-600">Only the original author can edit their published articles, ensuring content integrity.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Community for Ideas</h3>
                                    <p className="text-gray-600">A platform where people can share their unique perspectives and articles with others.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Empower Your Voice</h3>
                                    <p className="text-gray-600">Join our community and start publishing your thoughts today! Your ideas matter.</p>
                                </div>
                            </div>
                            {!authStatus && ( // Only show login/signup prompt if not authenticated
                                <div className="text-center mt-12">
                                    <h2 className="text-3xl font-bold text-gray-700 mb-4">Ready to start sharing?</h2>
                                    <p className="text-lg text-gray-600 mb-6">
                                        <a href="/signup" className="text-blue-600 hover:underline font-semibold">Sign up</a> or <a href="/login" className="text-blue-600 hover:underline font-semibold">Login</a> to join the community!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // If posts are available, display them as before
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap -mx-2'> {/* Added -mx-2 for consistent spacing */}
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'> {/* Added responsive widths */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;