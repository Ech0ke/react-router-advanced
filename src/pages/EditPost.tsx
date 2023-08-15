import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { getUsers } from "../helpers/api/getUsers";
import { NewPostType } from "../types/newPostType";
import { FormErrorsType } from "../types/formErrorsType";
import PostForm from "../components/PostForm";
import { getPost } from "../helpers/api/getPost";
import { editPost } from "../helpers/api/editPost";
import { UserType } from "../types/userType";
import { PostType } from "../types/postType";
import postFormValidator from "../helpers/validation/postFormValidator";

async function loader(args: LoaderFunctionArgs) {
  const { signal } = args.request;
  const params = args.params as { postId: string };
  const users = getUsers({ signal });
  const post = getPost(params.postId, { signal });
  return { users: await users, post: await post };
}

async function action(args: ActionFunctionArgs) {
  const { signal } = args.request;
  const params = args.params as { postId: string };
  const formData = await args.request.formData();

  const userId = formData.get("userId") as string;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  const formErrors = postFormValidator({ userId, title, body });

  if (Object.keys(formErrors).length) {
    return formErrors;
  }
  const dataToPost: NewPostType = {
    userId: Number(userId),
    title: title,
    body: body,
  };
  await editPost(dataToPost, Number(params.postId), { signal });
  return redirect(`/posts/${params.postId}`);
}

function EditPost() {
  const { users, post } = useLoaderData() as {
    users: UserType[];
    post?: PostType;
  };
  const errorMessages = useActionData() as FormErrorsType;
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm users={users} post={post} errorMessages={errorMessages} />
    </>
  );
}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
};
