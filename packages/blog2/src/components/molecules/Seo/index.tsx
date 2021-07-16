import NextHead from "next/head";
import { FC } from "react";
import { classNames } from "../../../functions/classNames";

interface TwitterSeoPropsType {
  description: string;
  image: string;
  title: string;
}

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

interface SeoPropsType {
  description: string;
  image: string;
  keywords: string[];
  title: string;
}

export const Seo: FC<SeoPropsType> = ({
  description,
  image,
  keywords,
  title,
}) => {
  return (
    <NextHead>
      <title>{title} | beraliv</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="keywords" content={classNames(...keywords)} />
      <TwitterSeo description={description} image={image} title={title} />
    </NextHead>
  );
};
