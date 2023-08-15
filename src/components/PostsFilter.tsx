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
  const userRef = useRef<HTMLSelectElement>(null!);

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  useEffect(() => {
    userRef.current.value = userId;
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
          {/* TODO: Users retreived from db */}
          <select name="userId" id="userId" ref={userRef}>
            <option value="">Any</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Clementina DuBuque</option>
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
