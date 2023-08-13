import { createBrowserRouter, Navigate } from "react-router-dom";
import { postsRoute } from "./pages/Posts";
import { usersRoute } from "./pages/Users";
import { todosRoute } from "./pages/Todos";
import { postRoute } from "./pages/Post";
import { RootLayout } from "./layouts/rootLayout";
import { userRoute } from "./pages/User";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import { newPostRoute } from "./pages/NewPost";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { path: "*", element: <NotFound /> },
          { path: "/", element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              {
                index: true,
                ...postsRoute,
              },
              { path: ":postId", ...postRoute },
              { path: "new", ...newPostRoute },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...usersRoute },
              { path: ":userId", ...userRoute },
            ],
          },
          {
            path: "todos",
            ...todosRoute,
          },
        ],
      },
    ],
  },
]);
