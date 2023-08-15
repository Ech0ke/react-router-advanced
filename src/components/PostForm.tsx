import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import { UserType } from "../types/userType";
import { FormErrorsType } from "../types/formErrorsType";
import { PostType } from "../types/postType";

function PostForm() {
  const errorMessages = useActionData() as FormErrorsType;
  const { postId } = useParams();
  const { users, post } = useLoaderData() as {
    users: UserType[];
    post?: PostType;
  };
  const { state } = useNavigation();

  const isSubmitting = state === "loading" || state === "submitting";
  return (
    <Form method={post ? "PUT" : "POST"} className="form">
      <div className="form-row">
        <div className={`form-group ${errorMessages?.title && "error"}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post ? post.title : undefined}
          />
          {errorMessages?.title && (
            <div className="error-message">{errorMessages?.title}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={post?.userId}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className={`form-group ${errorMessages?.body && "error"}`}>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            defaultValue={post ? post.body : undefined}
          ></textarea>
          {errorMessages?.body && (
            <div className="error-message">{errorMessages?.body}</div>
          )}
        </div>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button disabled={isSubmitting} className="btn">
          {isSubmitting ? "Loading" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default PostForm;
