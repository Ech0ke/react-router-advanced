import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import { getUsers } from "../helpers/api/getUsers";
import { NewPostType } from "../types/newPostType";
import { FormErrorsType } from "../types/formErrorsType";
import PostForm from "../components/PostForm";
import { getPost } from "../helpers/api/getPost";
import { editPost } from "../helpers/api/editPost";

async function loader(args: LoaderFunctionArgs) {
  const { signal } = args.request;
  const params = args.params as { postId: string };
  const users = getUsers({ signal });
  const { title, body } = await getPost(params.postId, { signal });
  return { users: await users, postData: { title, body } };
}

async function action(args: ActionFunctionArgs) {
  const { signal } = args.request;
  const params = args.params as { postId: string };
  const formData = await args.request.formData();

  const formErrors: FormErrorsType = {};

  // Destructure values from formEntries
  const { userId, title, body } = Object.fromEntries(formData.entries());

  if (userId === "") {
    formErrors.userId = "Required";
  }
  if (title === "") {
    formErrors.title = "Required";
  }
  if (body === "") {
    formErrors.body = "Required";
  }

  if (Object.keys(formErrors).length) {
    return formErrors;
  }
  const dataToPost: NewPostType = {
    userId: Number(userId),
    title: title as string,
    body: body as string,
  };
  await editPost(dataToPost, Number(params.postId), { signal });
  return redirect("/posts");
}

function EditPost() {
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm />
    </>
  );
}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
};
