import NextHead from "next/head";
import { FC } from "react";
import { classNames } from "../../../functions/classNames";

type TwitterSeoPropsType = Pick<
  SeoPropsType,
  "description" | "image" | "title"
>;

const TwitterSeo: FC<TwitterSeoPropsType> = ({ description, image, title }) => (
  <>
    <meta name="twitter:creator" content="@beraliv" />
    <meta name="twitter:site" content="@beraliv" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content={image}></meta>
  </>
);

type OpenGraphSeoPropsType = Pick<
  SeoPropsType,
  "description" | "image" | "imageHeight" | "imageWidth" | "path" | "title"
>;

const OpenGraphSeo: FC<OpenGraphSeoPropsType> = ({
  description,
  image,
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
    <meta property="og:image" content={image} />
    <meta property="og:image:height" content={`${imageHeight}`} />
    <meta property="og:image:width" content={`${imageWidth}`} />
  </>
);

interface SeoPropsType {
  description: string;
  image: string;
  imageHeight: number;
  imageWidth: number;
  keywords: string[];
  path: string;
  title: string;
}

export const Seo: FC<SeoPropsType> = ({
  description,
  image,
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
      <meta name="image" content={image} />
      <meta name="keywords" content={classNames(...keywords)} />
      <OpenGraphSeo
        description={description}
        image={image}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        path={path}
        title={title}
      />
      <TwitterSeo description={description} image={image} title={title} />
    </NextHead>
  );
};
