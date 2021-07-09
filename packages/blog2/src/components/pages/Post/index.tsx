import React, { FC } from "react";
import { PostType } from "../../../types/PostType";
import { PostBody } from "../../atoms/PostBody";
import type { serialize } from "next-mdx-remote/serialize";
import { Awaited } from "../../../types/Awaited";

export interface PostPropsType {
  post: PostType;
  content: Awaited<ReturnType<typeof serialize>>;
}

export const Post: FC<PostPropsType> = ({ content }) => {
  return <PostBody content={content} />;
};
