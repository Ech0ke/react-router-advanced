import {
  ActionFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { getUsers } from "../helpers/api/getUsers";
import { createPost } from "../helpers/api/createPost";
import { NewPostType } from "../types/newPostType";
import { FormErrorsType } from "../types/formErrorsType";
import PostForm from "../components/PostForm";
import { PostType } from "../types/postType";
import { UserType } from "../types/userType";
import postFormValidator from "../helpers/validation/postFormValidator";

async function loader({
  request: { signal },
}: {
  request: { signal: AbortSignal };
}) {
  const users = getUsers({ signal });
  return { users: await users };
}

async function action(args: ActionFunctionArgs) {
  const { signal } = args.request;
  const formData = await args.request.formData();

  const userId = formData.get("userId") as string;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  const formErrors = postFormValidator({ userId, title, body });

  // if any of error fields are not epty, return all errors
  if (Object.keys(formErrors).length) {
    return formErrors;
  }
  const dataToPost: NewPostType = {
    userId: Number(userId),
    title: title,
    body: body,
  };
  const post: PostType = await createPost(dataToPost, { signal });
  return redirect(`/posts/${post.id}`);
}

function NewPost() {
  const { users } = useLoaderData() as {
    users: UserType[];
  };
  const errorMessages = useActionData() as FormErrorsType;
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} errorMessages={errorMessages} />
    </>
  );
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
};
