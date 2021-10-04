import { GetStaticProps } from "next";
import { PostPropsType } from "../components/pages/Post";
import { getPostBySlug } from "../functions/getPostBySlug";
import { PostPropsParamsType } from "./getPostStaticPaths";
import { serialize } from "next-mdx-remote/serialize";
import { imageMetadata } from "../plugins/imageMetadata";
import { validatePost } from "../validators/validatePost";
import { validateEnvParameters } from "../validators/validateEnvParameters";
import { imageLoader } from "../functions/imageLoader";
import { ImageType } from "../types/ImageType";
import cache from "../cache/imageMetadata.json";

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
  const { apiKey, formId } = validateEnvParameters();

  const mdxContent = await serialize(content, {
    scope: data as Record<string, unknown>,
    mdxOptions: {
      rehypePlugins: [imageMetadata],
    },
  });

  const normalisedWidth = 1280;
  const imageUrl = imageLoader({
    src: checkedPost.image,
    width: normalisedWidth,
  });
  const { width, height } = cache[checkedPost.image as keyof typeof cache];
  const image: ImageType = {
    url: imageUrl,
    width: normalisedWidth,
    height: Math.round((height * normalisedWidth) / width),
  };

  return {
    props: {
      apiKey,
      content: mdxContent,
      formId,
      image,
      post: checkedPost,
    },
  };
};
