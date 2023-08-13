import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { getUsers } from "../helpers/api/getUsers";
import { UserType } from "../types/userType";
import { createPost } from "../helpers/api/createPost";

async function loader({
  request: { signal },
}: {
  request: { signal: AbortSignal };
}) {
  return getUsers({ signal });
}

async function action(args: ActionFunctionArgs) {
  const { signal } = args.request;
  const formData = await args.request.formData();

  // Convert formData entries to an object
  const dataToPost = Object.fromEntries(formData.entries());
  console.log(dataToPost);
  await createPost(dataToPost, { signal });
  return redirect("/posts");
}

function NewPost() {
  const users = useLoaderData() as UserType[];
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="POST" action="/posts/new" className="form">
        <div className="form-row">
          <div className={`form-group ${/* error */ null}`}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            {/* <div className="error-message">Required</div> */}
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
              {/* <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option> */}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="/posts">
            Cancel
          </Link>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  );
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
};
