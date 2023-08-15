import axios, { AxiosRequestConfig } from "axios";
import { API_POSTS } from "../../../api/urls/apiUrls";
import { PostType } from "../../types/postType";

export async function getPosts(
  options: AxiosRequestConfig,
  query?: string
): Promise<PostType[]> {
  const res = await axios.get(`${API_POSTS}?q=${query}`, options);
  return res.data;
}
