import { getAllValidatedPostsByCreatedDesc } from "../functions/getAllValidatedPostsByCreatedDesc";

export const getSearchStaticProps = async () => {
  const posts = getAllValidatedPostsByCreatedDesc();

  return {
    props: {
      posts,
    },
  };
};
