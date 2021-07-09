import { GetStaticPaths } from "next";
import { getAllPosts } from "../functions/getAllPosts";

export interface PostPropsParamsType {
  slug: string;
  [key: string]: string;
}

export const getPostStaticPaths: GetStaticPaths<PostPropsParamsType> = () => {
  const posts = getAllPosts();

  return {
    paths: posts.map(({ name }) => ({
      params: {
        slug: name,
      },
    })),
    fallback: false,
  };
};
