import { Link, useLoaderData } from "react-router-dom";
import { PostType } from "../types/postType";
import { getPosts } from "../helpers/api/getPosts";
import PostCard from "../components/PostCard";
import PostsFilter from "../components/PostsFilter";

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
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <PostsFilter />
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
