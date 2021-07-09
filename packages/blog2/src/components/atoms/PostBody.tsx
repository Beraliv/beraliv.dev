import { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import { PostPropsType } from "../pages/Post";

export interface PostBodyPropsType {
  content: PostPropsType["content"];
}

const components = {};

export const PostBody: FC<PostBodyPropsType> = ({ content }) => (
  <MDXRemote {...content} components={components} />
);
