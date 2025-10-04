import React, { useState, useEffect } from 'react'
import{getAllArticles} from '../api/api'
import  Container  from '../Components/Container/Container'
import  PostCard  from '../Components/PostCard';

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
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full text-center">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Loading posts...
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
    }
    if (error) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full text-center">
              <h1 className="text-2xl font-bold text-red-600">
                {error}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
    }
    // If no posts are found, display a message
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-700"> 
                                No posts available yet.
                            </h1>
                            <p className="text-lg text-gray-500 mt-2">
                                Check back later or create a new post!
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // If posts are available, display them
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

export default Allpost;