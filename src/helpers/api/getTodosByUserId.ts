import axios, { AxiosRequestConfig } from "axios";
import { API_TODOS } from "../../../api/urls/apiUrls";
import { TodoType } from "./../../types/todoType";

export async function getTodosByUserId(
  userId: string,
  options: AxiosRequestConfig
): Promise<TodoType[]> {
  const res = await axios.get(`${API_TODOS}?userId=${userId}`, options);
  return res.data;
}
