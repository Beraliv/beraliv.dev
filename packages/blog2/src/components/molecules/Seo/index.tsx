import NextHead from "next/head";
import { FC } from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { classNames } from "../../../functions/classNames";
import { ImageType } from "../../../types/ImageType";
import { PostType } from "../../../types/PostType";
import { SanitisedString } from "../../../types/SanitisedString";

const {
  title: metaTitle,
  social: { twitter },
} = BLOG_META_INFO;

type SeoPropsType = Pick<PostType, "description" | "keywords"> & {
  image: ImageType;
  path: string;
  title: SanitisedString;
};

export const Seo: FC<SeoPropsType> = ({
  description,
  image,
  keywords,
  path,
  title,
}) => (
  <NextHead>
    {/* general */}
    <title>
      {title} | {metaTitle}
    </title>
    <meta name="description" content={description} />
    <link rel="icon" href="/profile.jpg" />
    <meta name="image" content={image.url} />
    <meta name="keywords" content={classNames(...keywords)} />
    <link rel="canonical" href={path} />
    {/* open graph */}
    <meta property="og:site_name" content={metaTitle} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={path} />
    <meta property="og:image" content={image.url} />
    <meta property="og:image:height" content={`${image.height}`} />
    <meta property="og:image:width" content={`${image.width}`} />
    {/* twitter */}
    <meta name="twitter:creator" content={`@${twitter}`} />
    <meta name="twitter:site" content={`@${twitter}`} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content={image.url}></meta>
  </NextHead>
);
