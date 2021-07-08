import { getAllPosts } from "../functions/getAllPosts";

export const getHomeStaticProps = () => {
  const posts = getAllPosts(["description", "slug", "title"]);

  return {
    props: {
      posts: posts.filter((post): post is Required<typeof post> => {
        const isDescription = typeof post.description === "string";
        const isTitle = typeof post.title === "string";
        const isSlug = typeof post.slug === "string";

        return isDescription && isTitle && isSlug;
      }),
    },
  };
};
