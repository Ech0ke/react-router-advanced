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

function PostForm() {
  const errorMessages = useActionData() as FormErrorsType;
  const { postId } = useParams();
  const { users, postData } = useLoaderData() as {
    users: UserType[];
    postData?: { title: string; body: string };
  };
  const { state } = useNavigation();

  const isSubmitting = state === "loading" || state === "submitting";
  return (
    <Form
      method={postData ? "PUT" : "POST"}
      action={postData ? `/posts/${postId}/edit` : "/posts/new"}
      className="form"
    >
      <div className="form-row">
        <div className={`form-group ${errorMessages?.title && "error"}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={postData ? postData.title : undefined}
          />
          {errorMessages?.title && (
            <div className="error-message">{errorMessages?.title}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId">
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
            defaultValue={postData ? postData.body : undefined}
          ></textarea>
          {errorMessages?.body && (
            <div className="error-message">{errorMessages?.body}</div>
          )}
        </div>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="/posts">
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
