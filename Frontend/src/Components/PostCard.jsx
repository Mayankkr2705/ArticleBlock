// src/Components/PostCard.jsx
import service from "../api/posts";
import { Link } from "react-router-dom";

function PostCard({ _id, slug, title, featuredImage }) {
  const idOrSlug = slug || _id;
  const imgSrc = featuredImage ? service.getFilePreview(featuredImage) : undefined;

  return (
    <Link to={`/post/${idOrSlug}`} className="block border rounded overflow-hidden">
      {imgSrc && <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
      </div>
    </Link>
  );
}

export default PostCard;
