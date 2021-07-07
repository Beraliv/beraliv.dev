import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { PostBody } from "../components/PostBody";
import { getAllPosts } from "../functions/getAllPosts";
import { getPostBySlug } from "../functions/getPostBySlug";
import { mdToHtml } from "../functions/mdToHtml";
import { PostType } from "../types/PostType";

interface PostPropsParamsType {
  slug: string;
  [key: string]: string;
}

interface PostPropsType {
  post: Omit<PostType, "content"> & Required<Pick<PostType, "content">>;
}

const Post: FC<PostPropsType> = ({ post }) => {
  return <PostBody content={post.content} />;
};

export default Post;

export const getStaticProps: GetStaticProps<
  PostPropsType,
  PostPropsParamsType
> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error(`Cannot find slug for post ${location.href}`);
  }

  const { content: mdContent, ...post } = getPostBySlug(params.slug, [
    "categories",
    "content",
    "date",
    "description",
    "featured",
    "keywords",
    "labels",
    "slug",
    "title",
  ]);

  if (!mdContent) {
    throw new Error(
      `Cannot find content for post ${JSON.stringify({
        content: mdContent,
        ...post,
      })}`
    );
  }

  const htmlContent = await mdToHtml(mdContent);

  return {
    props: {
      post: {
        ...post,
        content: htmlContent,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostPropsParamsType> = () => {
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