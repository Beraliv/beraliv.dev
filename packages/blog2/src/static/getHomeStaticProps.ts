import { getAllPosts } from "../functions/getAllPosts";
import { validateEnvParameters } from "../validators/validateEnvParameters";

export const getHomeStaticProps = () => {
  const posts = getAllPosts();
  const { apiKey, formId } = validateEnvParameters();

  return {
    props: {
      apiKey,
      formId,
      posts: posts.map(({ data, name }) => ({
        ...data,
        slug: name,
      })),
    },
  };
};
