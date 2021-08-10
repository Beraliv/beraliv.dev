import { getAllPosts } from "../functions/getAllPosts";
import { validateEnvParameters } from "../validators/validateEnvParameters";
import { validatePost } from "../validators/validatePost";

export const getSearchStaticProps = async () => {
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

  const { apiKey, formId } = validateEnvParameters();

  return {
    props: {
      apiKey,
      formId,
      posts,
    },
  };
};
