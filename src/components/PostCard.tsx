import React from "react";
import { Link } from "react-router-dom";
import { PostType } from "../types/postType";

function PostCard({ id, title, body }: PostType) {
  return (
    <div className="card" key={id}>
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="card-preview-text">{body}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`/posts/${id}`}>
          View
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
