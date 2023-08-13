import { TodoType } from "../types/todoType";

function TodoItem({ completed, title }: TodoType) {
  return <li className={completed ? "strike-through" : undefined}>{title}</li>;
}

export default TodoItem;
