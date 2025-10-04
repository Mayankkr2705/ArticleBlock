import React,{useEffect,useState} from 'react'
import Container  from '../Components/Container/Container' 
import Postform  from '../Components/Postform'   

import { getArticleBySlug } from '../api/api'
import { useNavigate,useParams } from 'react-router-dom'
function Editpost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);    
    const [error, setError] = useState(null); 

    const fetchPost = async () => {
      if (slug) {
        try {
          setLoading(true);
          const response = await getArticleBySlug(slug);  
          
          if (response && response.data) {
            setPost(response.data);  
          } else {
            setError('Article not found');
            setTimeout(() => navigate('/'), 2000);
          }
        } catch (err) {
          console.error('Error fetching post for editing:', err);
          setError('Failed to load post for editing');
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/');
      }
    };

   
    useEffect(() => {

        fetchPost();

    }, [slug, navigate]);

    if (loading) {
    return (
      <div className="py-8">
        <Container>
          <div className="w-full text-center">
            <h1 className="text-2xl font-bold">Loading post for editing...</h1>
          </div>
        </Container>
      </div>
    );
    }

 
    if (error) {
    return (
      <div className="py-8">
        <Container>
          <div className="w-full text-center">
            <h1 className="text-2xl font-bold text-red-600">{error}</h1>
            <p className="text-gray-600 mt-2">Redirecting to home...</p>
          </div>
        </Container>
      </div>
    );
    }


    return post ? (
        <div className="py-8">
            <Container>
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6">Edit Aricle</h1>
          <Postform post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="py-8">
      <Container>
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Go Home
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Editpost;