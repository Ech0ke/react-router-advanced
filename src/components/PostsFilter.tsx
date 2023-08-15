import { useEffect, useRef } from "react";
import { Form, useLoaderData, useNavigation } from "react-router-dom";

function PostsFilter() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  const { searchParams } = useLoaderData() as {
    searchParams: string;
  };

  const queryRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    queryRef.current.value = searchParams;
  }, [searchParams]);

  return (
    <Form method="get" action="/posts" className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input type="search" name="query" id="query" ref={queryRef} />
        </div>
        {/* <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId">
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
          </div> */}
        <button disabled={isLoading} className="btn">
          {isLoading ? "Filtering" : "Filter"}
        </button>
      </div>
    </Form>
  );
}

export default PostsFilter;
