import { useLoaderData, LoaderFunctionArgs } from "react-router";
import { getUser } from "../helpers/api/getUser";
import { UserType } from "../types/userType";
import { getPostsByUserId } from "../helpers/api/getPostsByUserId";
import { getTodosByUserId } from "../helpers/api/getTodosByUserId";
import { PostType } from "../types/postType";
import { TodoType } from "../types/todoType";
import TodoItem from "../components/TodoItem";
import PostCard from "../components/PostCard";

async function loader(args: LoaderFunctionArgs) {
  const { signal } = args.request;
  const params = args.params as { userId: string };
  const [user, posts, todos] = await Promise.all([
    getUser(params.userId, { signal }),
    getPostsByUserId(params.userId, { signal }),
    getTodosByUserId(params.userId, { signal }),
  ]);
  return { user, posts, todos };
}

function User() {
  const { user, posts, todos } = useLoaderData() as {
    user: UserType;
    posts: PostType[];
    todos: TodoType[];
  };
  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b>{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${user.website}`}
        >
          {user.website}
        </a>
      </div>
      <div>
        <b>Address:</b>
        {` ${user.address.street}, ${user.address.suite}, ${user.address.city}, 
        ${user.address.zipcode}`}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

export const userRoute = {
  loader,
  element: <User />,
};
