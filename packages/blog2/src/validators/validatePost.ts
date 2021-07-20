import { PostPropsType } from "../components/pages/Post";
import { PostType } from "../types/PostType";

export const validatePost = ({
  date,
  description,
  image,
  keywords,
  labels,
  slug,
  title,
  ...rest
}: Partial<PostType> & Pick<PostType, "slug">): PostPropsType["post"] => {
  if (!title) {
    throw new Error(`Cannot find title for post ${slug}`);
  }

  if (!description) {
    throw new Error(`Cannot find description for post ${slug}`);
  }

  if (!keywords) {
    throw new Error(`Cannot find keywords for post ${slug}`);
  }

  if (!Array.isArray(keywords)) {
    throw new Error(
      `Cannot use keywords: expected to have array but got ${typeof keywords}`
    );
  }

  if (!date) {
    throw new Error(`Cannot find date for post ${slug}`);
  }

  if (!labels) {
    throw new Error(`Cannot find labels for post ${slug}`);
  }

  if (!image) {
    throw new Error(`Cannot find image for post ${slug}`);
  }

  return {
    date,
    description,
    image,
    keywords,
    labels,
    slug,
    title,
    ...rest,
  };
};
