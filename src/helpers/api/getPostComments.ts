import axios, { AxiosRequestConfig } from "axios";
import { API_POSTS } from "../../../api/urls/apiUrls";
import { CommentType } from "../../types/commentType";

export async function getPostComments(
  postId: string,
  options: AxiosRequestConfig
): Promise<CommentType[]> {
  const res = await axios.get(`${API_POSTS}/${postId}/comments`, options);
  return res.data;
}
