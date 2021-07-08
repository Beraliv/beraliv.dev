import { GetStaticPaths } from "next";
import { getAllPosts } from "../functions/getAllPosts";

export interface PostPropsParamsType {
  slug: string;
  [key: string]: string;
}

export const getPostStaticPaths: GetStaticPaths<PostPropsParamsType> = () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts
      .filter((post): post is PostPropsParamsType => {
        if (typeof post.slug !== "string") {
          console.error(`Cannot find slug for post ${JSON.stringify(post)}`);
          return false;
        }

        return true;
      })
      .map((posts) => ({
        params: {
          slug: posts.slug,
        },
      })),
    fallback: false,
  };
};
