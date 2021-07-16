import React, { FC } from "react";
import { PostType } from "../../../types/PostType";
import { PostBody } from "../../atoms/PostBody";
import type { serialize } from "next-mdx-remote/serialize";
import { Awaited } from "../../../types/Awaited";
import { ViewCounter } from "../../molecules/ViewCounter";
import { PickRequired } from "../../../types/PickRequired";
import { Label } from "../../atoms/Label";
import { Bio } from "../../molecules/Bio";
import Head from "next/head";
import { Footer } from "../../atoms/Footer";
import styles from "./index.module.css";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";

export interface PostPropsType {
  post: PickRequired<
    Partial<PostType>,
    | "date"
    | "description"
    | "featured"
    | "keywords"
    | "labels"
    | "slug"
    | "title"
  >;
  content: Awaited<ReturnType<typeof serialize>>;
}

export const Post: FC<PostPropsType> = ({ content, post }) => {
  const { url } = BLOG_META_INFO;

  return (
    <div className={styles.container}>
      {/* @ts-expect-error add imageHeight and imageWidth */}
      <Seo
        description={post.description}
        imageUrl={post.featured}
        // imageHeight={0}
        // imageWidth={0}
        keywords={post.keywords}
        path={`${url}${post.slug}`}
        title={post.title}
      />

      <Header title="beraliv" path="post" />

      <main className={styles.main}>
        <article>
          <header>
            <h1>{post.title}</h1>
            <div className={styles.headerMetadata}>
              <small>{post.date}</small>
              <small>
                <ViewCounter slug={post.slug} />
              </small>
            </div>
          </header>
          <main>
            <PostBody content={content} />
            {post.labels.map(
              (label) => label && <Label key={label} title={label} />
            )}
          </main>
          <footer>
            <Bio />
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
};
