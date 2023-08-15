import { useEffect, useRef } from "react";
import { Form, useNavigation } from "react-router-dom";
import { UserType } from "../types/userType";

type PostsFilterProps = {
  users: UserType[];
  searchParams: { query: string; userId: string };
};

function PostsFilter({
  users,
  searchParams: { query, userId },
}: PostsFilterProps) {
  const { state } = useNavigation();
  const isLoading = state === "loading";

  const queryRef = useRef<HTMLInputElement>(null!);
  const userIdRef = useRef<HTMLSelectElement>(null!);

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  useEffect(() => {
    userIdRef.current.value = userId;
  }, [userId]);

  return (
    <Form className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input type="search" name="query" id="query" ref={queryRef} />
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" ref={userIdRef}>
            <option value="">Any</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button disabled={isLoading} className="btn">
          {isLoading ? "Filtering" : "Filter"}
        </button>
      </div>
    </Form>
  );
}

export default PostsFilter;
