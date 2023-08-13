import axios, { AxiosRequestConfig } from "axios";
import { GET_TODOS } from "../../../api/urls/apiUrls";
import { TodoType } from "./../../types/todoType";

export async function getTodos(
  options: AxiosRequestConfig
): Promise<TodoType[]> {
  const res = await axios.get(GET_TODOS, options);
  return res.data;
}
