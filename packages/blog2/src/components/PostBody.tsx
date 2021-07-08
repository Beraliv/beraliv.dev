import { FC } from "react";

export interface PostBodyPropsType {
  content: string;
}

export const PostBody: FC<PostBodyPropsType> = ({ content }) => (
  <section
    dangerouslySetInnerHTML={{ __html: content }}
    itemProp="articleBody"
  />
);
