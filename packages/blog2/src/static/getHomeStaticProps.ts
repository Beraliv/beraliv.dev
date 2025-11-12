import { getAllValidatedPostsByCreatedDesc } from "../functions/getAllValidatedPostsByCreatedDesc";

export const getHomeStaticProps = async () => {
  const posts = getAllValidatedPostsByCreatedDesc();

  const featuredPosts = posts.filter((post) => post.featured);

  const mostRecent10Posts = posts.filter((post) => !post.featured).slice(0, 11);

  return {
    props: {
      featuredPosts,
      mostRecent10Posts,
    },
  };
};
