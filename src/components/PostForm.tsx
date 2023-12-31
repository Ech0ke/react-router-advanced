import { Form, Link, useNavigation } from "react-router-dom";
import { UserType } from "../types/userType";
import { FormErrorsType } from "../types/formErrorsType";
import { PostType } from "../types/postType";

type PostFormProps = {
  users: UserType[];
  post?: PostType;
  errorMessages?: FormErrorsType;
};

function PostForm({ users, post, errorMessages }: PostFormProps) {
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";
  return (
    <Form method={post ? "PUT" : "POST"} className="form">
      <div className="form-row">
        <div className={`form-group ${errorMessages?.title && "error"}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title}
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
          <textarea name="body" id="body" defaultValue={post?.body}></textarea>
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
          {isSubmitting ? "Saving" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default PostForm;
