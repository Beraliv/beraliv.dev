import { GetStaticProps } from "next";
import { PostPropsType } from "../components/pages/Post";
import { getPostBySlug } from "../functions/getPostBySlug";
import { mdToHtml } from "../functions/mdToHtml";
import { PostPropsParamsType } from "./getPostStaticPaths";

export const getPostStaticProps: GetStaticProps<
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
