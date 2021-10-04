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

const NORMALISED_WIDTH = 1280;

export const getPostStaticProps: GetStaticProps<
  PostPropsType,
  PostPropsParamsType
> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error(`Cannot find slug for post ${location.href}`);
  }

  const { content, data } = getPostBySlug(params.slug);
  const uncheckedPost = { ...data, slug: params.slug };
  const { image: imageUrl, ...checkedPost } = validatePost(uncheckedPost);
  const { apiKey, formId } = validateEnvParameters();

  const mdxContent = await serialize(content, {
    scope: data as Record<string, unknown>,
    mdxOptions: {
      rehypePlugins: [imageMetadata],
    },
  });

  if (!(imageUrl in cache)) {
    throw new Error(`Cannot find cache for image ${imageUrl}`);
  }
  const { width, height } = cache[imageUrl as keyof typeof cache];
  const image: ImageType = {
    url: imageLoader({
      src: imageUrl,
      width: NORMALISED_WIDTH,
    }),
    width: NORMALISED_WIDTH,
    height: (height * NORMALISED_WIDTH) / width,
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
