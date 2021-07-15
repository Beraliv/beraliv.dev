import React, { FC } from "react";
import { PostType } from "../../../types/PostType";
import { PostBody } from "../../atoms/PostBody";
import type { serialize } from "next-mdx-remote/serialize";
import { Awaited } from "../../../types/Awaited";
import { ViewCounter } from "../../molecules/ViewCounter";
import { PickRequired } from "../../../types/PickRequired";

export interface PostPropsType {
  post: PickRequired<Partial<PostType>, "title" | "date" | "slug">;
  content: Awaited<ReturnType<typeof serialize>>;
}

export const Post: FC<PostPropsType> = ({ content, post }) => {
  return (
    <>
      <header>
        <h1>{post.title}</h1>
        <div>
          <small>{post.date}</small>
          <small>
            <ViewCounter slug={post.slug} />
          </small>
        </div>
      </header>
      <main>
        <PostBody content={content} />
      </main>
    </>
  );
};
