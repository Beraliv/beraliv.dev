import { ValidatedPostType } from "../../../types/ValidatedPostType";
import { Article } from "../Article";

export const PostPreview = (post: ValidatedPostType) => (
  <Article href={post.slug} text={post.title} time={post.created} />
);
