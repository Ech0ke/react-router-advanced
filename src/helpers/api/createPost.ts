import axios, { AxiosRequestConfig } from "axios";
import { API_POSTS } from "../../../api/urls/apiUrls";
import { NewPostType } from "../../types/newPostType";
import { PostType } from "../../types/postType";

export async function createPost(
  formData: NewPostType,
  options: AxiosRequestConfig
): Promise<PostType> {
  const res = await axios.post(API_POSTS, formData, options);
  return res.data;
}
