import axios, { AxiosRequestConfig } from "axios";
import { API_POSTS } from "../../../api/urls/apiUrls";
import { NewPostType } from "../../types/newPostType";
import { PostType } from "../../types/postType";

export async function editPost(
  formData: NewPostType,
  postId: number,
  options: AxiosRequestConfig
): Promise<PostType> {
  const res = await axios.put(`${API_POSTS}/${postId}`, formData, options);
  return res.data;
}
