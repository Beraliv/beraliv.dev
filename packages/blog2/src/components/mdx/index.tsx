/* eslint-disable react/display-name */
import { MdxImage } from "./MdxImage";
import { MdxHeader } from "./MdxHeader";
import { FC, PropsWithChildren } from "react";
import { MdxLink } from "./MdxLink";
import { MdxPre } from "./MdxPre";
import { MdxVideo } from "./MdxVideo";
import { MDXRemoteProps } from "next-mdx-remote";
import { MdxYouTube } from "./MdxYouTube";

const H2: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <MdxHeader type="h2">{children}</MdxHeader>
);
const H3: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <MdxHeader type="h3">{children}</MdxHeader>
);
const H4: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <MdxHeader type="h4">{children}</MdxHeader>
);
const H5: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <MdxHeader type="h5">{children}</MdxHeader>
);
const H6: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <MdxHeader type="h6">{children}</MdxHeader>
);

export const mdxComponents: MDXRemoteProps["components"] = {
  a: MdxLink,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: MdxImage,
  pre: MdxPre,
  video: MdxVideo,
  YouTube: MdxYouTube,
} as MDXRemoteProps["components"];
