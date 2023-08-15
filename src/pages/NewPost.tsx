import { ActionFunctionArgs, redirect } from "react-router-dom";
import { getUsers } from "../helpers/api/getUsers";
import { createPost } from "../helpers/api/createPost";
import { NewPostType } from "../types/newPostType";
import { FormErrorsType } from "../types/formErrorsType";
import PostForm from "../components/PostForm";

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

  // if any of error fields are not epty, return all errors
  if (Object.keys(formErrors).length) {
    return formErrors;
  }
  const dataToPost: NewPostType = {
    userId: Number(userId),
    title: title as string,
    body: body as string,
  };
  await createPost(dataToPost, { signal });
  return redirect("/posts");
}

function NewPost() {
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm />
    </>
  );
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
};
