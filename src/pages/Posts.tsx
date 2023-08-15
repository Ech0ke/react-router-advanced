import { Link, useLoaderData } from "react-router-dom";
import { PostType } from "../types/postType";
import { getPosts } from "../helpers/api/getPosts";
import PostCard from "../components/PostCard";
import PostsFilter from "../components/PostsFilter";

async function loader({
  request: { signal, url },
}: {
  request: { signal: AbortSignal; url: string };
}) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  const userId = searchParams.get("userId") || "";
  return {
    searchParams: { query, userId },
    posts: await getPosts({ signal }, query, userId),
  };
}

function Posts() {
  const { posts } = useLoaderData() as { posts: PostType[] };
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
