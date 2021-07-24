import { getAllPosts } from "../functions/getAllPosts";
import { getViews } from "../functions/getViews";
import { validateEnvParameters } from "../validators/validateEnvParameters";
import { validatePost } from "../validators/validatePost";

export const getHomeStaticProps = async () => {
  const posts = getAllPosts();
  const { apiKey, formId } = validateEnvParameters();

  const featuredPosts = posts
    .filter((post) => post.data.featured)
    .map(({ data, name }) =>
      validatePost({
        ...data,
        slug: name,
      })
    );

  const latestPosts = posts
    .map(({ data, name }) =>
      validatePost({
        ...data,
        slug: name,
      })
    )
    .sort((a, b) => {
      if (!a.date) return -1;
      if (!b.date) return 1;
      return -a.date.localeCompare(b.date);
    })
    .slice(0, 6);

  const readablePosts = await Promise.all(
    posts.map(async ({ data, name }) => {
      const slug = name;
      const { views } = await getViews({ slug });

      return {
        ...data,
        slug,
        views,
      };
    })
  );

  const mostViewedPosts = readablePosts
    .sort((a, b) => {
      if (!a.views) return -1;
      if (!b.views) return 1;
      return b.views - a.views;
    })
    .slice(0, 6)
    .map(({ views, ...uncheckedPost }) => validatePost(uncheckedPost));

  return {
    props: {
      apiKey,
      formId,
      featuredPosts,
      latestPosts,
      mostViewedPosts,
    },
  };
};
