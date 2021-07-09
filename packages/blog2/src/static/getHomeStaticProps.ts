import { getAllPosts } from "../functions/getAllPosts";

export const getHomeStaticProps = () => {
  const posts = getAllPosts();

  return {
    props: {
      posts: posts.map(({ data, name }) => ({
        ...data,
        slug: name,
      })),
    },
  };
};
