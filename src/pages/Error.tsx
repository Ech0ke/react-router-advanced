import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error: unknown = useRouteError();
  if (import.meta.env.MODE === "production") {
    return (
      <>
        <div className="not-found-message">
          <h1>Error, something went wrong.</h1>
          <Link to="/" relative="path">
            Go home
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Error, something went wrong.</h1>
        <pre>{(error as Error)?.message}</pre>
        <pre>{(error as Error).stack}</pre>
      </>
    );
  }
}

export default Error;
