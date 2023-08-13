import { useLoaderData } from "react-router-dom";
import { PostType } from "../types/postType";
import { getPosts } from "../helpers/api/getPosts";
import PostCard from "../components/PostCard";

async function loader({
  request: { signal },
}: {
  request: { signal: AbortSignal };
}) {
  return getPosts({ signal });
}

function Posts() {
  const posts = useLoaderData() as PostType[];
  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}

export const postsRoute = {
  loader,
  element: <Posts />,
};
