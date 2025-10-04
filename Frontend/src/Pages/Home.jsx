// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Container from '../Components/Container/Container';
import PostCard from '../Components/PostCard';
import { getAllArticles } from '../api/api';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const fetcharticle=async()=>{
    try{
      setLoading(true);
      const res=await getAllArticles();   
      setPosts(res.data);

      if(!res){
        setError('No articles found');
      }
    }catch(error){
      console.error("Error fetching articles:", error);
      setError('Failed to fetch articles');
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcharticle();
  }, []);

  if (loading) {
    return (
      <div className="py-8"><Container>
        <h1 className="text-center text-2xl font-bold">Loading…</h1>
      </Container></div>
    );
  }

  if (error) {
    return (
      <div className="py-8"><Container>
        <h1 className="text-center text-2xl font-bold text-red-600">
          {error}
        </h1>
      </Container></div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-8"><Container>
        <h1 className="text-center text-2xl font-bold">
          No posts yet – create one!
        </h1>
      </Container></div>
    );
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post._id || post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
