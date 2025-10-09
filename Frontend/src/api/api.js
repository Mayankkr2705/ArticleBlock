const BACKEND_URL=import.meta.env.VITE_API_BASE_URL
import axios from 'axios'


const api = axios.create({
  baseURL: BACKEND_URL
});

// Add JWT token to EVERY request automatically  
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Add to header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//auth

export const login=async(data)=>{
    return api.post(`/api/auth/login`, data);
}
export const logout=async()=>{
    return api.post(`/api/auth/logout`);
}
export const signup=async(data)=>{
    return api.post(`/api/auth/register`, data);
}

export const getUser=async(id)=>{
    return api.get(`/api/auth/${id}`);
}
export const updateUser=async(id,data)=>{
    return api.put(`/api/auth/${id}`,data);
}

//comments
export const createComment=async(data)=>{
    return api.post(`/api/comments/create`,data);
}
export const getArticleComments=async(articleId)=>{
    return api.get(`/api/comments/article/${articleId}`);
}
export const getCommentReplies=async(id)=>{
    return api.get(`/api/comments/${id}/replies`);
}
export const updateComment=async(id,data)=>{
    return api.put(`/api/comments/${id}`,data);
}
export const deleteComment=async(id)=>{
    return api.delete(`/api/comments/${id}`);
}

//articles

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }

    const uploadData = await uploadResponse.json();
    return uploadData.secure_url;
}

export const createArticle=async(data)=>{
    return api.post(`/api/articles/create`,data);
}
export const getArticleBySlug=async(slug)=>{
    return api.get(`/api/articles/${slug}`);
}
export const updateArticle=async(slug,data)=>{
    return api.put(`/api/articles/${slug}`,data);
}
export const deleteArticle=async(slug)=>{
    return api.delete(`/api/articles/${slug}`);
}
export const getAllArticles=async()=>{
    return api.get(`/api/articles/`);
}
