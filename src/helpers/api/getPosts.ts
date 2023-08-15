import axios, { AxiosRequestConfig } from "axios";
import { API_POSTS } from "../../../api/urls/apiUrls";
import { PostType } from "../../types/postType";

export async function getPosts(
  options: AxiosRequestConfig,
  query?: string,
  userId?: string
): Promise<PostType[]> {
  let queryParam = "?q=",
    userIdParam = "";
  if (query && query.length > 0) {
    queryParam = `?q=${query}`;
  }
  if (userId && userId.length > 0) {
    userIdParam = `&userId=${userId}`;
  }
  const res = await axios.get(
    `${API_POSTS}${queryParam}${userIdParam}`,
    options
  );
  return res.data;
}
