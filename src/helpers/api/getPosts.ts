import axios, { AxiosRequestConfig } from "axios";
import { GET_POSTS } from "../../../api/urls/apiUrls";
import { PostType } from "../../types/postType";

export async function getPosts(
  options: AxiosRequestConfig
): Promise<PostType[]> {
  const res = await axios.get(GET_POSTS, options);
  return res.data;
}
