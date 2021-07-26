/* eslint-disable react/display-name */
import { MdxImage } from "./MdxImage";
import { MdxHeader } from "./MdxHeader";
import { FC } from "react";

const H2: FC = ({ children }) => <MdxHeader type="h2">{children}</MdxHeader>;
const H3: FC = ({ children }) => <MdxHeader type="h3">{children}</MdxHeader>;
const H4: FC = ({ children }) => <MdxHeader type="h4">{children}</MdxHeader>;
const H5: FC = ({ children }) => <MdxHeader type="h5">{children}</MdxHeader>;
const H6: FC = ({ children }) => <MdxHeader type="h6">{children}</MdxHeader>;

export const mdxComponents = {
  img: MdxImage,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};
