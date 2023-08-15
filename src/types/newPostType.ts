import { PostType } from "./postType";

export type NewPostType = Omit<PostType, "id">;
