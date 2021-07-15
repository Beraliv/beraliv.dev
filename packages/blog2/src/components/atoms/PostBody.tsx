import { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import { PostPropsType } from "../pages/Post";
import { mdxComponents } from "../mdx";

export interface PostBodyPropsType {
  content: PostPropsType["content"];
}

export const PostBody: FC<PostBodyPropsType> = ({ content }) => (
  <MDXRemote {...content} components={mdxComponents} />
);
