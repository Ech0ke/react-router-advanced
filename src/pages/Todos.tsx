import { useLoaderData } from "react-router-dom";
import { TodoType } from "../types/todoType";
import { getTodos } from "../helpers/api/getTodos";
import TodoItem from "../components/TodoItem";

async function loader({
  request: { signal },
}: {
  request: { signal: AbortSignal };
}) {
  return getTodos({ signal });
}

function Todos() {
  const todos = useLoaderData() as TodoType[];
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

export const todosRoute = {
  loader,
  element: <Todos />,
};
