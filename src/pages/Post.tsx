import { useLoaderData, LoaderFunctionArgs } from "react-router";
import { getPost } from "../helpers/api/getPost";
import { PostType } from "../types/postType";
import { getPostComments } from "../helpers/api/getPostComments";
import { CommentType } from "../types/commentType";
import { getUser } from "../helpers/api/getUser";
import { UserType } from "../types/userType";
import { Link } from "react-router-dom";

async function loader(args: LoaderFunctionArgs) {
  const { signal } = args.request;
  const params = args.params as { postId: string };
  const comments = getPostComments(params.postId, {
    signal,
  });
  const post: PostType = await getPost(params.postId, { signal });

  const user = getUser(post.userId.toString(), { signal });

  return { post, comments: await comments, user: await user };
}

function Post() {
  const { post, comments, user } = useLoaderData() as {
    post: PostType;
    comments: CommentType[];
    user: UserType;
  };
  return (
    <>
      <h1 className="page-title">
        {post.title}{" "}
        <div className="title-btns">
          <Link className="btn btn-outline" to="edit">
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${user.id}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => (
          <div className="card" key={comment.id}>
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const postRoute = {
  loader,
  element: <Post />,
};
