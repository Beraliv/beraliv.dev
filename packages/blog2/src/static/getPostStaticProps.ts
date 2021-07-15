import { GetStaticProps } from "next";
import { PostPropsType } from "../components/pages/Post";
import { getPostBySlug } from "../functions/getPostBySlug";
import { PostPropsParamsType } from "./getPostStaticPaths";
import { serialize } from "next-mdx-remote/serialize";
import { imageMetadata } from "../plugins/imageMetadata";
import { validatePost } from "../validators/validatePost";

export const getPostStaticProps: GetStaticProps<
  PostPropsType,
  PostPropsParamsType
> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error(`Cannot find slug for post ${location.href}`);
  }

  const { content, data } = getPostBySlug(params.slug);
  const uncheckedPost = { ...data, slug: params.slug };
  const checkedPost = validatePost(uncheckedPost);

  const mdxContent = await serialize(content, {
    scope: data as Record<string, unknown>,
    mdxOptions: {
      rehypePlugins: [imageMetadata],
    },
  });

  return {
    props: {
      post: checkedPost,
      content: mdxContent,
    },
  };
};
