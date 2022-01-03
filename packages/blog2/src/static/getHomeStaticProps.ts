import { getAllPosts } from "../functions/getAllPosts";
import { getViews } from "../functions/getViews";
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

  const latestPosts = posts.filter((post) => !post.featured).slice(0, 6);

  const postsWithViews = await Promise.all(
    posts.map(async ({ slug, ...post }) => {
      const { views } = await getViews({ slug });

      return {
        ...post,
        slug,
        views,
      };
    })
  );

  const mostViewedPosts = postsWithViews
    .sort((a, b) => {
      if (!a.views) return -1;
      if (!b.views) return 1;
      return b.views - a.views;
    })
    .slice(0, 6)
    .map(({ views, ...uncheckedPost }) => uncheckedPost);

  const { apiKey, formId } = validateConvertKitParameters();

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
