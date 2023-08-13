import axios, { AxiosRequestConfig } from "axios";
import { API_TODOS } from "../../../api/urls/apiUrls";
import { TodoType } from "./../../types/todoType";

export async function getTodos(
  options: AxiosRequestConfig
): Promise<TodoType[]> {
  const res = await axios.get(API_TODOS, options);
  return res.data;
}
