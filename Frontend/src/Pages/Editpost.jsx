import React,{useEffect,useState} from 'react'
import Container  from '../Components/Container/Container' 
import Postform  from '../Components/Postform'   
import service from '../api/posts'
import { useNavigate,useParams } from 'react-router-dom'
function Editpost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()


    useEffect(()=>{
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        }else {
            navigate('/')
        }
    },[slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <Postform post={post} />
        </Container>
    </div>
  ) : null
}

export default Editpost