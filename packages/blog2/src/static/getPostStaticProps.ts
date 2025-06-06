import { GetStaticProps } from "next";
import { PostPropsType } from "../components/pages/Post";
import { getPostBySlug } from "../functions/getPostBySlug";
import { PostPropsParamsType } from "./getPostStaticPaths";
import { serialize } from "next-mdx-remote/serialize";
import { imageMetadata } from "../plugins/imageMetadata";
import { validatePost } from "../validators/validatePost";
import { imageLoader } from "../functions/imageLoader";
import { ImageType } from "../types/ImageType";
import cache from "../cache/imageMetadata.json";
import remarkUnwrapImages from "remark-unwrap-images";
import { extractMetadata } from "../functions/extractMetadata";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import remarkGfm from "remark-gfm";

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

  const mdxContent = await serialize(content, {
    scope: data as Record<string, unknown>,
    mdxOptions: {
      // to handle types correctly here, you need remark
      remarkPlugins: [remarkUnwrapImages, remarkMdxCodeMeta, remarkGfm],
      rehypePlugins: [imageMetadata],
      development: false,
    },
  });

  if (!(imageUrl in cache)) {
    await extractMetadata(imageUrl);
  }
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
      content: mdxContent,
      image,
      post: checkedPost,
    },
  };
};
