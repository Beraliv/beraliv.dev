import { getAllPosts } from "../functions/getAllPosts";
import { validateConvertKitParameters } from "../validators/validateConvertKitParameters";
import { validatePost } from "../validators/validatePost";

export const getHomeStaticProps = async () => {
  const posts = getAllPosts()
    .map(({ data, name }) => ({
      ...data,
      slug: name,
    }))
    .sort((a, b) => {
      if (!a.date) return -1;
      if (!b.date) return 1;
      return -a.date.localeCompare(b.date);
    })
    .map(validatePost);

  const featuredPosts = posts.filter((post) => post.featured);

  const mostRecent10Posts = posts.filter((post) => !post.featured).slice(0, 11);

  const { apiKey, formId } = validateConvertKitParameters();

  return {
    props: {
      apiKey,
      formId,
      featuredPosts,
      mostRecent10Posts,
    },
  };
};
