import { fetchJson } from "../functions/fetchJson";
import { getAllPosts } from "../functions/getAllPosts";
import { ViewsApi } from "../types/ViewsApi";
import { validateEnvParameters } from "../validators/validateEnvParameters";

export const getHomeStaticProps = async () => {
  const posts = getAllPosts();
  const { apiKey, formId } = validateEnvParameters();

  const featuredPosts = posts
    .filter((post) => post.data.featured)
    .map(({ data, name }) => ({
      ...data,
      slug: name,
    }));

  const latestPosts = posts
    .map(({ data, name }) => ({
      ...data,
      slug: name,
    }))
    .sort((a, b) => {
      if (!a.date) return -1;
      if (!b.date) return 1;
      return -a.date.localeCompare(b.date);
    })
    .slice(0, 6);

  const readablePosts = await Promise.all(
    posts.map(async ({ data, name }) => {
      const slug = name;
      const { views }: ViewsApi = await fetchJson(
        `http://localhost:3000/api/views?slug=${slug}`
      );

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
    .slice(0, 6);

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
