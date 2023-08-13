import axios, { AxiosRequestConfig } from "axios";
import { API_POSTS } from "../../../api/urls/apiUrls";
import { PostType } from "../../types/postType";

export async function getPostsByUserId(
  userId: string,
  options: AxiosRequestConfig
): Promise<PostType[]> {
  const res = await axios.get(`${API_POSTS}?userId=${userId}`, options);
  return res.data;
}
