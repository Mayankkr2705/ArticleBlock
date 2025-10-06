import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import{deleteArticle,getArticleBySlug} from '../api/api'
import  Container from '../Components/Container/Container'
import  Button  from '../Components/Button'; 
import parse from "html-react-parser";


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
    const navigate = useNavigate();
   
    const userData=JSON.parse(localStorage.getItem("user"));
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

    useEffect(() => {
        fetchPost();
    }, [slug, navigate]);


    const deletePost = async () => {
        if (!post || !window.confirm('Are you sure you want to delete this post?')) {
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
      <div className="py-8">
        <Container>
          <div className="w-full text-center">
            <h1 className="text-2xl font-bold">Loading...</h1>
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
            <Button onClick={() => navigate("/")} className="mt-4">
              Go Home
            </Button>
          </div>
        </Container>
      </div>
    );
    }
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {/* <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    /> */}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}