// src/api/posts.js
import api from "./client";

export class PostsService {
  async createPost({ title, slug, content, featuredImage, status, userId, image }) {
    let featuredImageId = featuredImage || null;

    if (image) {
      const form = new FormData();
      form.append("file", image);
      const { data } = await api.post("/files", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      featuredImageId = data.fileId;
    }

    const { data } = await api.post("/posts", {
      title,
      slug,
      content,
      status,
      userId,
      featuredImage: featuredImageId,
    });
    return data.post;
  }

  async updatePost(idOrSlug, { title, content, featuredImage, status, image }) {
    let featuredImageId = featuredImage ?? null;

    if (image) {
      const form = new FormData();
      form.append("file", image);
      const { data } = await api.post("/files", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      featuredImageId = data.fileId;
    }

    const { data } = await api.put(`/posts/${idOrSlug}`, {
      title,
      content,
      status,
      featuredImage: featuredImageId,
    });
    return data.post;
  }

  async deletePost(idOrSlug) {
    await api.delete(`/posts/${idOrSlug}`);
    return true;
  }

  async getPost(idOrSlug) {
    const { data } = await api.get(`/posts/${idOrSlug}`);
    return data.post;
  }

  async getPosts(query = {}) {
    // Accepts optional query params like {status:"active"}
    const { data } = await api.get("/posts", { params: query });
    // Normalize to {documents: [...] } shape used by existing components
    return { documents: data.posts || [] };
  }

  getFilePreview(fileId) {
    // Return a CDN/serve URL for <img src=...>
    return `${api.defaults.baseURL}/files/${fileId}`;
  }

  async deleteFile(fileId) {
    await api.delete(`/files/${fileId}`);
    return true;
  }

  async uploadFile(file) {
    const form = new FormData();
    form.append("file", file);
    const { data } = await api.post("/files", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Keep $id compatibility
    return { $id: data.fileId };
  }
}

const service = new PostsService();
export default service;
