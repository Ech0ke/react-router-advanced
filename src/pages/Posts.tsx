import { Link, useLoaderData } from "react-router-dom";
import { PostType } from "../types/postType";
import { getPosts } from "../helpers/api/getPosts";
import PostCard from "../components/PostCard";
import PostsFilter from "../components/PostsFilter";
import { UserType } from "../types/userType";
import { getUsers } from "../helpers/api/getUsers";

async function loader({
  request: { signal, url },
}: {
  request: { signal: AbortSignal; url: string };
}) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  const userId = searchParams.get("userId") || "";
  const filterParams: { q: string; userId?: string } = { q: query };
  if (userId !== "") filterParams.userId = userId;

  const posts = getPosts({ signal, params: filterParams });
  const users = getUsers({ signal });
  return {
    posts: await posts,
    searchParams: { query, userId },
    users: await users,
  };
}

function Posts() {
  const { posts, users, searchParams } = useLoaderData() as {
    posts: PostType[];
    users: UserType[];
    searchParams: { query: string; userId: string };
  };
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
      <PostsFilter users={users} searchParams={searchParams} />
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
