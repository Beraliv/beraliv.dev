import { PostPropsType } from "../components/pages/Post";
import { PostType } from "../types/PostType";

export const validatePost = ({
  slug,
  title,
  date,
  ...rest
}: Partial<PostType> & Pick<PostType, "slug">): PostPropsType["post"] => {
  if (!title) {
    throw new Error(`Cannot find title for post ${slug}`);
  }

  if (!date) {
    throw new Error(`Cannot find date for post ${slug}`);
  }

  return {
    slug,
    title,
    date,
    ...rest,
  };
};
