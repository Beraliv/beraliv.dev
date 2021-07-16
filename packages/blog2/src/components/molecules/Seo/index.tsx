import NextHead from "next/head";
import { FC } from "react";
import { classNames } from "../../../functions/classNames";

type TwitterSeoPropsType = Pick<
  SeoPropsType,
  "description" | "imageUrl" | "title"
>;

const TwitterSeo: FC<TwitterSeoPropsType> = ({
  description,
  imageUrl,
  title,
}) => (
  <>
    <meta name="twitter:creator" content="@beraliv" />
    <meta name="twitter:site" content="@beraliv" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content={imageUrl}></meta>
  </>
);

type OpenGraphSeoPropsType = Pick<
  SeoPropsType,
  "description" | "imageUrl" | "imageHeight" | "imageWidth" | "path" | "title"
>;

const OpenGraphSeo: FC<OpenGraphSeoPropsType> = ({
  description,
  imageUrl,
  imageHeight,
  imageWidth,
  path,
  title,
}) => (
  <>
    <meta property="og:site_name" content="beraliv" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={path} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:height" content={`${imageHeight}`} />
    <meta property="og:image:width" content={`${imageWidth}`} />
  </>
);

interface SeoPropsType {
  description: string;
  imageUrl: string;
  imageHeight: number;
  imageWidth: number;
  keywords: string[];
  path: string;
  title: string;
}

export const Seo: FC<SeoPropsType> = ({
  description,
  imageUrl,
  imageHeight,
  imageWidth,
  keywords,
  path,
  title,
}) => {
  return (
    <NextHead>
      <title>{title} | beraliv</title>
      <meta name="description" content={description} />
      <meta name="image" content={imageUrl} />
      <meta name="keywords" content={classNames(...keywords)} />
      <link rel="canonical" href={path} />
      <OpenGraphSeo
        description={description}
        imageUrl={imageUrl}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        path={path}
        title={title}
      />
      <TwitterSeo description={description} imageUrl={imageUrl} title={title} />
    </NextHead>
  );
};
