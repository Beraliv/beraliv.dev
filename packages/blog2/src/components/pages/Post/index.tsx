import React, { FC } from "react";
import { PostType } from "../../../types/PostType";
import { PostBody } from "../../atoms/PostBody";

export interface PostPropsType {
  post: Omit<PostType, "content"> & Required<Pick<PostType, "content">>;
}

export const Post: FC<PostPropsType> = ({ post }) => {
  return <PostBody content={post.content} />;
};
